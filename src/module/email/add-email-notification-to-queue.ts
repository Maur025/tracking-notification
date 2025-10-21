import { loggerDebug } from '@maur025/core-logger';
import { workerJobNames } from '@src/worker-job-names.js';
import { emailQueue } from './email.queue.js';
import { AddNotificationToQueueResponse } from '@common/dto/add-notification-to-queue-response.js';

export const addEmailNotificationToQueue =
	async (): Promise<AddNotificationToQueueResponse> => {
		const response = await emailQueue.add(
			workerJobNames.EMAIL_SEND_NOTIFICATION,
			{
				subject: 'Test Email',
			},
		);

		loggerDebug(`Added Email notification to queue: ${response.id}`);

		return {
			id: response.id ?? 'No ID',
			queueName: response.queueQualifiedName,
			timestamp: response.timestamp,
		};
	};
