'use strict';

const { Router } = require('express');
const controller = require('../controllers/user.controller');
const validate = require('../middlewares/validate.middleware');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateSchema,
  idParamSchema,
  listSchema,
} = require('../validators/user.validator');

const router = Router();

// Public
router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.post('/refresh', validate(refreshSchema), controller.refresh);

// Authenticated
router.get('/me', authenticate, controller.me);

// Admin
router.get('/', authenticate, authorize('admin'), validate(listSchema), controller.list);
router.get('/:id', authenticate, authorize('admin'), validate(idParamSchema), controller.getOne);
router.patch('/:id', authenticate, authorize('admin'), validate(updateSchema), controller.update);
router.delete('/:id', authenticate, authorize('admin'), validate(idParamSchema), controller.remove);

module.exports = router;
