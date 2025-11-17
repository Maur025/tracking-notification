import { loggerDebug, loggerError } from '@maur025/core-logger';
import { workerTopics } from '@src/worker-topic.js';
import { Worker } from 'bullmq';
import { Redis } from 'ioredis';

let smsWorker: Worker;

export const runSmsWorker = (connection: Redis) => {
	smsWorker = new Worker(
		workerTopics.SMS,
		async job => {
			loggerDebug(`[WORKER-SMS] Processing SMS job ${job.id}`);
			console.log(job.data);
		},
		{ connection },
	);

	smsWorker.on(`completed`, job => {
		loggerDebug(`SMS Job ${job.id} has completed`);
	});

	smsWorker.on(`failed`, (job, error) =>
		loggerError(`SMS Job ${job?.id} has failed with ${error.message}`),
	);

	return smsWorker;
};
