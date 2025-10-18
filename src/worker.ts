import { env } from '@config/env';
import { loggerDebug } from '@maur025/core-logger';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const { REDIS_HOST, REDIS_PORT } = env;

const connection = new IORedis({
	host: REDIS_HOST,
	port: REDIS_PORT,
	maxRetriesPerRequest: null,
});

const worker = new Worker(
	'foo',
	async job => {
		loggerDebug(`Processing job`);
		console.log(job.data);
	},
	{ connection },
);

worker.on('completed', job => {
	console.log(`Job ${job.id} has completed`);
});

worker.on('failed', (job, error) => {
	console.log(`Job ${job?.id} has failed with ${error.message}`);
});
