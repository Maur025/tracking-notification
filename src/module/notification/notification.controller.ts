import { emailQueue } from '@module/email/email.queue.js';
import { whatsappQueue } from '@module/whatsapp/whatsapp.queue.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'tsyringe';

@injectable()
export class NotificationController {
	public async getEmailQueueStatus(req: Request, res: Response): Promise<void> {
		try {
			const metrics = await emailQueue.exportPrometheusMetrics();
			res.status(200).set('Content-Type', 'text/plain').send(metrics);
		} catch (error) {
			res
				.status(500)
				.send(
					(error as { message: string })?.message ?? 'Internal Server Error',
				);
		}
	}

	public async getWhatsappQueueStatus(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const metrics = await whatsappQueue.exportPrometheusMetrics();
			res
				.status(StatusCodes.OK)
				.set('Content-Type', 'text/plain')
				.send(metrics);
		} catch (error) {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(
					(error as { message: string })?.message ?? 'Internal Server Error',
				);
		}
	}
}
