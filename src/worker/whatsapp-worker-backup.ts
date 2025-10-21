import { loggerDebug, loggerError } from '@maur025/core-logger';
import { sendNotificationToWhatsapp } from '@module/notification/service/whatsapp/send-notification-to-whatsapp.js';
import { workerTopics } from '@src/worker-topic.js';
import { Worker } from 'bullmq';
import { Redis } from 'ioredis';

let whatsappWorkerBackup: Worker;

export const runWhatsappWorkerBackup = (connection: Redis): Worker => {
	whatsappWorkerBackup = new Worker(
		workerTopics.WHATSAPP,
		async job => {
			loggerDebug(`[WORKER-WHATSAPP-BACKUP] Processing whatsapp job ${job.id}`);
			console.log(job.data);

			await sendNotificationToWhatsapp(job.data);
		},
		{ connection },
	);

	whatsappWorkerBackup.on('completed', job => {
		loggerDebug(`Whatsapp Job ${job.id} has completed`);
	});

	whatsappWorkerBackup.on('failed', (job, error) => {
		loggerError(`Whatsapp Job ${job?.id} has failed with ${error.message}`);
	});

	return whatsappWorkerBackup;
};
