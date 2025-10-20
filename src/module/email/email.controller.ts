import { Controller, Route, Post } from 'tsoa/dist/index.js';
@Route('emails')
export class EmailController extends Controller {
	@Post('queue')
	public addQueueEmail(): { message: string } {
		return { message: 'Email queued successfully' };
	}
}
