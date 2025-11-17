import { StatusCodes } from 'http-status-codes';
import {
	Controller,
	Post,
	Response,
	Route,
	SuccessResponse,
} from 'tsoa/dist/index.js';
import { addSmsNotificationToQueue } from './add-sms-notification-to-queue.js';

@Route('sms')
export class SmsController extends Controller {
	@SuccessResponse(StatusCodes.OK, 'Success')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', {
		code: StatusCodes.INTERNAL_SERVER_ERROR,
		message: 'Internal Server Error',
	})
	@Post('queue')
	public async addSmsToQueue() {
		try {
			await addSmsNotificationToQueue();

			this.setStatus(StatusCodes.OK);
			return {
				code: StatusCodes.OK,
				message: 'Whatsapp notification added to queue successfully',
			};
		} catch (error) {
			this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR);
			return {
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				message: `Failed to add Whatsapp notification to queue: ${error}`,
			};
		}
	}
}
