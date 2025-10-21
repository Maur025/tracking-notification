import { AddNotificationToQueueResponse } from '@common/dto/add-notification-to-queue-response.js';
import { loggerDebug } from '@maur025/core-logger';
import { workerJobNames } from '@src/worker-job-names.js';
import { whatsappQueue } from './whatsapp.queue.js';

export const addWhatsappNotificationToQueue =
	async (): Promise<AddNotificationToQueueResponse> => {
		const response = await whatsappQueue.add(
			workerJobNames.WHATSAPP_SEND_NOTIFICATION,
			{
				number: '69775083',
				message: 'Hola, este es un mensaje de prueba desde la cola de WhatsApp',
			},
		);

		loggerDebug(`Added WhatsApp notification to queue: ${response.id}`);

		return {
			id: response.id ?? 'No ID',
			queueName: response.queueQualifiedName,
			timestamp: response.timestamp,
		};
	};
