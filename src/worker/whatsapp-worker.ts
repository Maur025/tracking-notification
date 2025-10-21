import { loggerDebug, loggerError } from '@maur025/core-logger';
import { workerTopics } from '@src/worker-topic.js';
import { Worker } from 'bullmq';
import { Redis } from 'ioredis';

let whatsappWorker: Worker;

export const runWhatsappWorker = (connection: Redis): Worker => {
	whatsappWorker = new Worker(
		workerTopics.WHATSAPP,
		async job => {
			loggerDebug(`Processing whatsapp job`);
			console.log(job.data);
		},
		{ connection },
	);

	whatsappWorker.on('completed', job => {
		loggerDebug(`Whatsapp Job ${job.id} has completed`);
	});

	whatsappWorker.on('failed', (job, error) => {
		loggerError(`Whatsapp Job ${job?.id} has failed with ${error.message}`);
	});

	return whatsappWorker;
};
