import { loggerDebug, loggerError } from '@maur025/core-logger';
import { workerTopics } from '@src/worker-topic.js';
import { Worker } from 'bullmq';
import { Redis } from 'ioredis';

let emailWorker: Worker;

export const runEmailWorker = (connection: Redis): Worker => {
	emailWorker = new Worker(
		workerTopics.EMAIL,
		async job => {
			loggerDebug(`Processing email job`);
			console.log(job.data);
		},
		{ connection },
	);

	emailWorker.on('completed', job => {
		loggerDebug(`Email Job ${job.id} has completed`);
	});

	emailWorker.on('failed', (job, error) => {
		loggerError(`Email Job ${job?.id} has failed with ${error.message}`);
	});

	return emailWorker;
};
