import { NotificationController } from '@module/notification/notification.controller.js';
import { Router } from 'express';
import { container } from 'tsyringe';

const notificationController = container.resolve(NotificationController);

const outTsoaRoutes = Router();

outTsoaRoutes.get(
	'/emails/queue/status',
	notificationController.getEmailQueueStatus.bind(notificationController),
);

outTsoaRoutes.get(
	'/whatsapp/queue/status',
	notificationController.getWhatsappQueueStatus.bind(notificationController),
);

export { outTsoaRoutes };
