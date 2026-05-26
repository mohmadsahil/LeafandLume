'use strict';

const UserRepositoryInterface = require('../interfaces/user.repository.interface');
const User = require('../../models/user.model');

class MongoUserRepository extends UserRepositoryInterface {
  async findById(id) {
    const doc = await User.findById(id);
    return doc ? doc.toJSON() : null;
  }

  async findByEmail(email) {
    const doc = await User.findOne({ email });
    return doc ? doc.toJSON() : null;
  }

  async findAll({ page = 1, limit = 20, search } = {}) {
    const filter = {};
    if (search) {
      const rx = new RegExp(search, 'i');
      filter.$or = [{ name: rx }, { email: rx }];
    }
    const skip = (Math.max(1, page) - 1) * limit;
    const [docs, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);
    return { rows: docs.map((d) => d.toJSON()), total };
  }

  async create(data) {
    const doc = await User.create(data);
    return doc.toJSON();
  }

  async update(id, data) {
    const doc = await User.findByIdAndUpdate(id, data, { new: true });
    return doc ? doc.toJSON() : null;
  }

  async delete(id) {
    const res = await User.findByIdAndDelete(id);
    return Boolean(res);
  }
}

module.exports = MongoUserRepository;
