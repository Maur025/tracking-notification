import { singleton } from 'tsyringe';
import { Channel } from '../schema/channel.js';

@singleton()
export default class ChannelCache {
	private readonly channelCacheMap: Map<string, Channel> = new Map<
		string,
		Channel
	>();

	public getFullMap = (): Map<string, Channel> => {
		return this.channelCacheMap;
	};

	public getAllChannels = (): Channel[] => {
		return Array.from(this.channelCacheMap.values());
	};

	public getChannel(id: string): Channel | undefined {
		return this.channelCacheMap.get(id);
	}

	public setChannel(id: string, channel: Channel): void {
		this.channelCacheMap.set(id, channel);
	}

	public deleteChannel(id: string): boolean {
		return this.channelCacheMap.delete(id);
	}

	public clear(): void {
		this.channelCacheMap.clear();
	}
}
