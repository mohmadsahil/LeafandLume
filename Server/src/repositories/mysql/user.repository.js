'use strict';

const { Op } = require('sequelize');
const UserRepositoryInterface = require('../interfaces/user.repository.interface');
const User = require('../../models/user.model');

class MySqlUserRepository extends UserRepositoryInterface {
  async findById(id) {
    const row = await User.findByPk(id);
    return row ? row.toJSON() : null;
  }

  async findByEmail(email) {
    const row = await User.findOne({ where: { email } });
    return row ? row.toJSON() : null;
  }

  async findAll({ page = 1, limit = 20, search } = {}) {
    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }
    const offset = (Math.max(1, page) - 1) * limit;
    const { rows, count } = await User.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    return { rows: rows.map((r) => r.toJSON()), total: count };
  }

  async create(data) {
    const row = await User.create(data);
    return row.toJSON();
  }

  async update(id, data) {
    const row = await User.findByPk(id);
    if (!row) return null;
    await row.update(data);
    return row.toJSON();
  }

  async delete(id) {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }
}

module.exports = MySqlUserRepository;
