import { Controller, Route, Post, SuccessResponse } from 'tsoa/dist/index.js';
@Route('emails')
export class EmailController extends Controller {
	@SuccessResponse('200', 'Email added to queue')
	@Post('queue')
	public addQueueEmail(): { message: string } {
		return { message: 'Email queued successfully' };
	}
}
