import { StatusCodes } from 'http-status-codes';
import {
	Body,
	Controller,
	Post,
	Response,
	Route,
	SuccessResponse,
} from 'tsoa/dist/index.js';
import { addWhatsappNotificationToQueue } from './add-whatsapp-notification-to-queue.js';

interface WhatsappResponseModel {
	code?: number;
	message?: string;
	data?: { id: string; queueName: string; timestamp: number };
}

interface INotifyToWhatsappSchema {
	numberPhone: string;
	message: string;
}
@Route('whatsapps')
export class WhatsappController extends Controller {
	@SuccessResponse(StatusCodes.OK, 'Success')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', {
		code: 500,
		message: 'Internal Server Error',
	})
	@Post('queue')
	public async addWhatsappToQueue(
		@Body() requestBody: INotifyToWhatsappSchema,
	): Promise<WhatsappResponseModel> {
		try {
			const processResult = await addWhatsappNotificationToQueue(requestBody);

			this.setStatus(StatusCodes.OK);
			return {
				code: StatusCodes.OK,
				message: 'Whatsapp notification added to queue successfully',
				data: processResult,
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
