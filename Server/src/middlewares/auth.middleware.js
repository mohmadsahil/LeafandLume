'use strict';

const { ApiError } = require('../utils/response');
const { verifyAccessToken } = require('../utils/jwt');

function authenticate(req, _res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return next(ApiError.unauthorized('Missing or malformed Authorization header'));
  }
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    return next();
  } catch (err) {
    const msg = err.name === 'TokenExpiredError' ? 'Access token expired' : 'Invalid access token';
    return next(ApiError.unauthorized(msg));
  }
}

function authorize(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(ApiError.unauthorized());
    if (roles.length && !roles.includes(req.user.role)) {
      return next(ApiError.forbidden('Insufficient permissions'));
    }
    return next();
  };
}

module.exports = { authenticate, authorize };
