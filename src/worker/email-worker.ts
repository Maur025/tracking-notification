import { loggerDebug, loggerError } from '@maur025/core-logger';
import { NotifyToEmailSchema } from '@module/notification/schema/notify-to-email.schema.js';
import { sendNotificationToMail } from '@module/notification/service/email/send-notification-to-mail.js';
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

			const { senderList, subject, htmlMessage } = NotifyToEmailSchema.parse(
				job.data,
			);

			await sendNotificationToMail({
				to: senderList,
				subject,
				text: htmlMessage,
				html: htmlMessage,
			});

			loggerDebug(`Email job processed successfully`);
		},
		{ connection, concurrency: 15 },
	);

	emailWorker.on('completed', job => {
		loggerDebug(`Email Job ${job.id} has completed`);
	});

	emailWorker.on('failed', (job, error) => {
		loggerError(`Email Job ${job?.id} has failed with ${error.message}`);
	});

	return emailWorker;
};
