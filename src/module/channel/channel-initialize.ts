import { inject, singleton } from 'tsyringe';
import ChannelCache from './cache/channel-cache.js';
import { ChannelResponse } from './dto/response/channel-response.js';
import { channelCacheInit } from './service/channel-cache-init.js';
import { loggerError } from '@maur025/core-logger';

@singleton()
export default class ChannelInitialize {
	constructor(
		@inject(ChannelCache) private readonly channelCache: ChannelCache,
	) {}

	public async initCache() {
		this.channelCache.clear();

		const response = await fetch(
			`${process.env.TRACKING_DB_URL}/trackingdb/channels`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			loggerError(
				`[CHANNEL] (initCache) Error fetching channels: ${response.status} ${response.statusText}`,
			);
			throw new Error(
				`Error fetching channels: ${response.status} ${response.statusText}`,
			);
		}

		const responseApi = (await response.json()) as unknown as {
			content: ChannelResponse[];
		};

		channelCacheInit({
			channelResponseList: responseApi.content,
		});
	}
}
