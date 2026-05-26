'use strict';

const env = require('./env');
const logger = require('../utils/logger');

let sequelizeInstance = null;
let mongooseInstance = null;

function buildSequelize(dialect) {
  const { Sequelize } = require('sequelize');
  return new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect,
    logging: env.NODE_ENV === 'development' ? (msg) => logger.debug(msg) : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true,
      timestamps: true,
    },
  });
}

function getSequelize() {
  if (sequelizeInstance) return sequelizeInstance;
  if (env.DB_TYPE === 'mysql') sequelizeInstance = buildSequelize('mysql');
  else if (env.DB_TYPE === 'postgres') sequelizeInstance = buildSequelize('postgres');
  else throw new Error(`getSequelize() called with DB_TYPE=${env.DB_TYPE}`);
  return sequelizeInstance;
}

async function connectSequelize() {
  const sequelize = getSequelize();
  await sequelize.authenticate();
  logger.info(`Sequelize connected (${env.DB_TYPE}) to ${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`);
  // sync models — in production prefer migrations
  if (env.NODE_ENV !== 'production') {
    await sequelize.sync({ alter: false });
  }
}

async function connectMongo() {
  const mongoose = require('mongoose');
  mongoose.set('strictQuery', true);
  mongooseInstance = await mongoose.connect(env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  logger.info(`MongoDB connected to ${env.MONGO_URI}`);
}

async function connectDatabase() {
  switch (env.DB_TYPE) {
    case 'mysql':
    case 'postgres':
      return connectSequelize();
    case 'mongodb':
      return connectMongo();
    default:
      throw new Error(`Unsupported DB_TYPE: ${env.DB_TYPE}`);
  }
}

async function disconnectDatabase() {
  if (sequelizeInstance) {
    await sequelizeInstance.close();
    sequelizeInstance = null;
  }
  if (mongooseInstance) {
    await mongooseInstance.disconnect();
    mongooseInstance = null;
  }
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
  getSequelize,
};
