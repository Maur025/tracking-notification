import { AddNotificationToQueueResponse } from '@common/dto/add-notification-to-queue-response.js';
import { loggerDebug } from '@maur025/core-logger';
import { workerJobNames } from '@src/worker-job-names.js';
import { whatsappQueue } from './whatsapp.queue.js';
import { NotifyToWhatsappSchema } from '@module/notification/schema/notify-to-whatsapp.schema.js';

export const addWhatsappNotificationToQueue = async (
	request: NotifyToWhatsappSchema,
): Promise<AddNotificationToQueueResponse> => {
	const response = await whatsappQueue.add(
		workerJobNames.WHATSAPP_SEND_NOTIFICATION,
		request,
		{ attempts: 5, backoff: { type: 'exponential', delay: 8000 } },
	);

	loggerDebug(`Added WhatsApp notification to queue: ${response.id}`);

	return {
		id: response.id ?? 'No ID',
		queueName: response.queueQualifiedName,
		timestamp: response.timestamp,
	};
};
