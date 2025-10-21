import { StatusCodes } from 'http-status-codes';
import { Route, Controller, SuccessResponse, Get } from 'tsoa/dist/index.js';
import { container } from 'tsyringe';
import ChannelCache from './cache/channel-cache.js';

@Route('channels')
export class ChannelController extends Controller {
	@SuccessResponse(StatusCodes.OK, 'Success')
	@Get('')
	public async getChannels() {
		const channelCache = container.resolve(ChannelCache);
		return {
			code: StatusCodes.OK,
			data: channelCache.getAllChannels(),
		};
	}
}
