'use strict';

const env = require('../config/env');
const logger = require('../utils/logger');
const { ApiError, fail } = require('../utils/response');

function notFoundHandler(req, _res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let details = err.details;

  // Sequelize unique violations
  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    message = 'Resource already exists';
    details = err.errors?.map((e) => ({ field: e.path, message: e.message }));
  } else if (err.name === 'SequelizeValidationError') {
    statusCode = 422;
    message = 'Validation failed';
    details = err.errors?.map((e) => ({ field: e.path, message: e.message }));
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  if (statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} -> ${statusCode}: ${err.stack || err.message}`);
  } else {
    logger.warn(`${req.method} ${req.originalUrl} -> ${statusCode}: ${message}`);
  }

  const payload = { message, details };
  if (env.NODE_ENV !== 'production' && statusCode >= 500) {
    payload.stack = err.stack;
  }
  return fail(res, statusCode, payload.message, payload.details);
}

module.exports = { notFoundHandler, errorHandler };
