'use strict';

const { Router } = require('express');
const userRoutes = require('./user.routes');

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, status: 'ok', uptime: process.uptime() });
});

router.use('/users', userRoutes);

module.exports = router;
