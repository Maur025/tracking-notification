import { inject, singleton } from 'tsyringe';
import ChannelCache from './cache/channel-cache.js';

@singleton()
export default class ChannelInitialize {
	constructor(
		@inject(ChannelCache) private readonly channelCache: ChannelCache,
	) {}

	public async initCache() {
		this.channelCache.clear();

		await fetch(`${process.env.TRACKING_DB_URL}/trackingdb/channels`);
	}
}
