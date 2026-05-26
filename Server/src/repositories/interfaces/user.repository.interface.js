'use strict';

/**
 * UserRepository contract. All concrete implementations
 * (mysql, postgres, mongodb) must implement these methods.
 *
 * Concrete repos extend this class and override each method.
 * Calling a method on the base class throws — keeps the contract honest.
 */
class UserRepositoryInterface {
  /** @returns {Promise<object|null>} */
  async findById(_id) {
    throw new Error('findById() not implemented');
  }

  /** @returns {Promise<object|null>} */
  async findByEmail(_email) {
    throw new Error('findByEmail() not implemented');
  }

  /** @returns {Promise<{ rows: object[], total: number }>} */
  async findAll(_query = {}) {
    throw new Error('findAll() not implemented');
  }

  /** @returns {Promise<object>} */
  async create(_data) {
    throw new Error('create() not implemented');
  }

  /** @returns {Promise<object|null>} */
  async update(_id, _data) {
    throw new Error('update() not implemented');
  }

  /** @returns {Promise<boolean>} */
  async delete(_id) {
    throw new Error('delete() not implemented');
  }
}

module.exports = UserRepositoryInterface;
