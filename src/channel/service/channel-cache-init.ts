import z, { array, object } from 'zod';
import { ChannelResponse } from '../dto/response/channel-response';
import { loggerError } from '@maur025/core-logger';
import { container } from 'tsyringe';
import ChannelCache from '@channel/cache/channel-cache';
import { Channel } from '@channel/schema/channel';
import { CProtocolResponse } from '@channel/dto/response/c-protocol-response';
import { CProtocol } from '@channel/schema/c-protocol';
import { CProtocolName } from '@channel/schema/c-protocol-name';
import { ChannelData } from '@channel/schema/channel-data';
import { ChannelDataParams } from '@channel/schema/channel-data-params';
import { ChannelDataUserParams } from '@channel/schema/channel-data-user-params';
import { fixCommasInJsonString } from '@util/fix-commas-in-json-string';
import { getObjectOfString } from '@util/get-object-of-string';

const ChannelCacheInitRequest = object({
	channelResponseList: array(ChannelResponse).default([]),
});

type ChannelCacheInitRequest = z.infer<typeof ChannelCacheInitRequest>;

export const channelCacheInit = async (
	request: ChannelCacheInitRequest,
): Promise<void> => {
	const { channelResponseList } = ChannelCacheInitRequest.parse(request);

	if (!channelResponseList?.length) {
		loggerError(
			`[CHANNEL] (channelCacheInit) channel response undefined or empty]`,
		);

		return;
	}

	const channelCache = container.resolve(ChannelCache);

	const channelList: Channel[] = channelResponseList.map(
		({ id, name, data, cprotocol_id, cprotocol }) => ({
			id,
			name,
			data: getChannelData(data),
			cProtocolId: cprotocol_id,
			cProtocol: getCProtocolData(cprotocol),
		}),
	);

	for (const channel of channelList) {
		if (!channel.id) {
			continue;
		}

		channelCache.setChannel(channel.id, channel);
	}
};

const getCProtocolData = ({
	id,
	name,
	script,
}: CProtocolResponse): CProtocol => ({
	id,
	name: CProtocolName.parse(name),
	script,
});

const getChannelData = (
	channelDataResponse: string,
): ChannelData | undefined => {
	const channelDataStringFixed: string =
		fixCommasInJsonString(channelDataResponse);

	const channelData:
		| {
				params: ChannelDataParams[];
				userparams: ChannelDataUserParams[];
		  }
		| undefined = getObjectOfString(channelDataStringFixed);

	if (!channelData) {
		return undefined;
	}

	return {
		params: channelData?.params?.map(param => ({ ...param })),
		userParams: channelData?.userparams
			? channelData?.userparams?.map(userParam => ({ ...userParam }))
			: [],
	};
};
