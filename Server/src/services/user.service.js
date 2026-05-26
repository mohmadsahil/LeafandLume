'use strict';

const bcrypt = require('bcryptjs');
const env = require('../config/env');
const { ApiError } = require('../utils/response');
const { issueTokenPair, verifyRefreshToken } = require('../utils/jwt');
const RepositoryFactory = require('../factory/repository.factory');

class UserService {
  constructor(userRepository = RepositoryFactory.getUserRepository()) {
    this.userRepo = userRepository;
  }

  _sanitize(user) {
    if (!user) return user;
    const { passwordHash, password_hash, ...safe } = user;
    return safe;
  }

  async register({ name, email, password }) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw ApiError.conflict('Email already in use');

    const passwordHash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
    const user = await this.userRepo.create({ name, email, passwordHash, role: 'user' });
    const tokens = issueTokenPair(user);
    return { user: this._sanitize(user), ...tokens };
  }

  async login({ email, password }) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw ApiError.unauthorized('Invalid credentials');

    const hash = user.passwordHash || user.password_hash;
    const ok = await bcrypt.compare(password, hash || '');
    if (!ok) throw ApiError.unauthorized('Invalid credentials');
    if (user.isActive === false) throw ApiError.forbidden('Account disabled');

    const tokens = issueTokenPair(user);
    return { user: this._sanitize(user), ...tokens };
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.unauthorized('Refresh token required');
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw ApiError.unauthorized('Invalid refresh token');
    }
    const user = await this.userRepo.findById(payload.sub);
    if (!user) throw ApiError.unauthorized('User no longer exists');
    return issueTokenPair(user);
  }

  async getById(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw ApiError.notFound('User not found');
    return this._sanitize(user);
  }

  async list({ page, limit, search }) {
    const { rows, total } = await this.userRepo.findAll({ page, limit, search });
    return {
      rows: rows.map((u) => this._sanitize(u)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
    };
  }

  async update(id, data) {
    if (data.password) {
      data.passwordHash = await bcrypt.hash(data.password, env.BCRYPT_SALT_ROUNDS);
      delete data.password;
    }
    const updated = await this.userRepo.update(id, data);
    if (!updated) throw ApiError.notFound('User not found');
    return this._sanitize(updated);
  }

  async remove(id) {
    const ok = await this.userRepo.delete(id);
    if (!ok) throw ApiError.notFound('User not found');
  }
}

module.exports = UserService;
