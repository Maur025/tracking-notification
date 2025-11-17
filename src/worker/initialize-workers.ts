import { env } from '@config/env.js';
import { Redis } from 'ioredis';
import { runEmailWorker } from './email-worker.js';
import { runWhatsappWorker } from './whatsapp-worker.js';
import { runSmsWorker } from './sms-worker.js';

const { REDIS_HOST, REDIS_PORT } = env;

const redisConnection = new Redis({
	host: REDIS_HOST,
	port: REDIS_PORT,
	maxRetriesPerRequest: null,
});

export const initializeWorkers = (): void => {
	runEmailWorker(redisConnection);

	runWhatsappWorker(redisConnection);

	runSmsWorker(redisConnection);
};
