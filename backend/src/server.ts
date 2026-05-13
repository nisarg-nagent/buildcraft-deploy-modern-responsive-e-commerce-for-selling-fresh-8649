/**
 * Application entry — wires config, database, security plugins, and all API routes.
 */
import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { registerRoutes } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

async function buildServer() {
  const app = Fastify({ logger });

  const corsOrigin = env.CORS_ORIGIN
    ? env.CORS_ORIGIN.split(',').map((s) => s.trim()).filter(Boolean)
    : env.FRONTEND_URL;

  await app.register(cors, {
    origin: corsOrigin,
    credentials: true,
  });
  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(jwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: env.JWT_EXPIRY },
  });

  app.setErrorHandler(errorHandler);

  await connectDatabase();
  await registerRoutes(app);

  return app;
}

async function shutdown(app: Awaited<ReturnType<typeof buildServer>>) {
  await app.close();
  await disconnectDatabase();
}

async function main() {
  const app = await buildServer();

  const stop = async (signal: string) => {
    logger.info({ signal }, 'Shutting down');
    try {
      await shutdown(app);
      process.exit(0);
    } catch (e) {
      logger.error(e);
      process.exit(1);
    }
  };
  process.once('SIGTERM', () => void stop('SIGTERM'));
  process.once('SIGINT', () => void stop('SIGINT'));

  const host = '0.0.0.0';
  await app.listen({ port: env.PORT, host });
  logger.info(`Listening on http://${host}:${env.PORT}`);
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
