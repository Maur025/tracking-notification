import {
	Body,
	Controller,
	Post,
	Response,
	Route,
	SuccessResponse,
} from 'tsoa/dist/index.js';
import { StatusCodes } from 'http-status-codes';
import { addEmailNotificationToQueue } from './add-email-notification-to-queue.js';
interface EmailResponseModel {
	code?: number;
	message?: string;
	data?: { id: string; queueName: string; timestamp: number };
}

export interface INotifyToEmailSchema {
	senderList: string[];
	subject: string;
	htmlMessage: string;
}

@Route('emails')
export class EmailController extends Controller {
	@SuccessResponse(StatusCodes.OK, 'Success')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', {
		code: 500,
		message: 'Internal Server Error',
	})
	@Post('queue')
	public async addQueueEmail(
		@Body() requestBody: INotifyToEmailSchema,
	): Promise<EmailResponseModel> {
		try {
			const processResult = await addEmailNotificationToQueue(requestBody);

			this.setStatus(StatusCodes.OK);
			return {
				code: StatusCodes.OK,
				message: 'Email notification added to queue successfully',
				data: processResult,
			};
		} catch (error) {
			this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR);
			return {
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				message: `Failed to add email notification to queue: ${error}`,
			};
		}
	}
}
