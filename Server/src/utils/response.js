'use strict';

class ApiError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', details) {
    return new ApiError(400, message, details);
  }
  static unauthorized(message = 'Unauthorized', details) {
    return new ApiError(401, message, details);
  }
  static forbidden(message = 'Forbidden', details) {
    return new ApiError(403, message, details);
  }
  static notFound(message = 'Not Found', details) {
    return new ApiError(404, message, details);
  }
  static conflict(message = 'Conflict', details) {
    return new ApiError(409, message, details);
  }
  static unprocessable(message = 'Unprocessable Entity', details) {
    return new ApiError(422, message, details);
  }
  static internal(message = 'Internal Server Error', details) {
    return new ApiError(500, message, details);
  }
}

function ok(res, data = null, message = 'OK', statusCode = 200, meta = undefined) {
  const body = { success: true, message, data };
  if (meta !== undefined) body.meta = meta;
  return res.status(statusCode).json(body);
}

function created(res, data = null, message = 'Created', meta = undefined) {
  return ok(res, data, message, 201, meta);
}

function noContent(res) {
  return res.status(204).send();
}

function fail(res, statusCode = 500, message = 'Error', details = undefined) {
  const body = { success: false, message };
  if (details !== undefined) body.details = details;
  return res.status(statusCode).json(body);
}

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { ApiError, ok, created, noContent, fail, asyncHandler };
