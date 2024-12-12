import { type RedisOptions } from 'bullmq';

import { env } from '../env';

// Configures Redis connection for BullMQ
export const connection: RedisOptions = {
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  username: env.REDIS_USER,
  password: env.REDIS_PASSWORD,
};
