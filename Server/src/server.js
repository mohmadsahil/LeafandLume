'use strict';

const http = require('http');

const env = require('./config/env');
const logger = require('./utils/logger');
const app = require('./app');
const { connectDatabase, disconnectDatabase } = require('./config/database');

const server = http.createServer(app);

async function start() {
  try {
    await connectDatabase();
    server.listen(env.PORT, () => {
      logger.info(`Server listening on http://localhost:${env.PORT}${env.API_PREFIX} [${env.NODE_ENV}]`);
    });
  } catch (err) {
    logger.error(`Failed to start server: ${err.stack || err.message}`);
    process.exit(1);
  }
}

async function shutdown(signal) {
  logger.info(`${signal} received. Shutting down gracefully...`);
  const forceExit = setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000).unref();

  server.close(async (err) => {
    if (err) logger.error(`Error closing HTTP server: ${err.message}`);
    try {
      await disconnectDatabase();
    } catch (e) {
      logger.error(`Error closing DB: ${e.message}`);
    }
    clearTimeout(forceExit);
    process.exit(err ? 1 : 0);
  });
}

['SIGINT', 'SIGTERM'].forEach((sig) => process.on(sig, () => shutdown(sig)));

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason instanceof Error ? reason.stack : reason}`);
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.stack || err.message}`);
  shutdown('uncaughtException');
});

start();
