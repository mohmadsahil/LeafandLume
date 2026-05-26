'use strict';

const UserService = require('../services/user.service');
const { ok, created, noContent, asyncHandler } = require('../utils/response');

const service = new UserService();

const register = asyncHandler(async (req, res) => {
  const result = await service.register(req.body);
  return created(res, result, 'Registered');
});

const login = asyncHandler(async (req, res) => {
  const result = await service.login(req.body);
  return ok(res, result, 'Logged in');
});

const refresh = asyncHandler(async (req, res) => {
  const tokens = await service.refresh(req.body.refreshToken);
  return ok(res, tokens, 'Token refreshed');
});

const me = asyncHandler(async (req, res) => {
  const user = await service.getById(req.user.id);
  return ok(res, user);
});

const list = asyncHandler(async (req, res) => {
  const { rows, meta } = await service.list(req.query);
  return ok(res, rows, 'OK', 200, meta);
});

const getOne = asyncHandler(async (req, res) => {
  const user = await service.getById(req.params.id);
  return ok(res, user);
});

const update = asyncHandler(async (req, res) => {
  const user = await service.update(req.params.id, req.body);
  return ok(res, user, 'Updated');
});

const remove = asyncHandler(async (req, res) => {
  await service.remove(req.params.id);
  return noContent(res);
});

module.exports = { register, login, refresh, me, list, getOne, update, remove };
