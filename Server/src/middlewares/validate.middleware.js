'use strict';

const { ApiError } = require('../utils/response');

/**
 * Validates req.body/params/query against a Zod schema shaped like:
 *   z.object({ body: ..., params: ..., query: ... })
 * Mutates the request with the parsed (and coerced) data.
 */
function validate(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (!result.success) {
      const details = result.error.flatten();
      return next(ApiError.badRequest('Validation failed', details));
    }
    if (result.data.body) req.body = result.data.body;
    if (result.data.params) req.params = result.data.params;
    if (result.data.query) req.query = result.data.query;
    return next();
  };
}

module.exports = validate;
