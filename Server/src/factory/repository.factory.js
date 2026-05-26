'use strict';

const env = require('../config/env');

/**
 * RepositoryFactory returns the active implementation of each repository
 * based on env.DB_TYPE. Add new repositories here as the domain grows.
 *
 * Modules are required lazily so that switching DB_TYPE doesn't drag
 * unrelated drivers into the process.
 */
class RepositoryFactory {
  static getUserRepository() {
    switch (env.DB_TYPE) {
      case 'mysql': {
        const Repo = require('../repositories/mysql/user.repository');
        return new Repo();
      }
      case 'postgres': {
        const Repo = require('../repositories/postgres/user.repository');
        return new Repo();
      }
      case 'mongodb': {
        const Repo = require('../repositories/mongodb/user.repository');
        return new Repo();
      }
      default:
        throw new Error(`Unsupported DB_TYPE: ${env.DB_TYPE}`);
    }
  }
}

module.exports = RepositoryFactory;
