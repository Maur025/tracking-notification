import { env } from '@config/env';
import IORedis from 'ioredis';
import { runEmailWorker } from './email-worker';

const { REDIS_HOST, REDIS_PORT } = env;

const redisConnection = new IORedis({
	host: REDIS_HOST,
	port: REDIS_PORT,
	maxRetriesPerRequest: null,
});

export const initializeWorkers = (): void => {
	runEmailWorker(redisConnection);
};
