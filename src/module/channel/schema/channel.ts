import { BaseData } from '@maur025/core-model-data';
import z, { string } from 'zod';
import { CProtocol } from './c-protocol.js';
import { ChannelData } from './channel-data.js';

export const Channel = BaseData.extend({
	name: string().nonempty(),
	data: ChannelData.optional(),
	cProtocolId: string().nonempty(),
	cProtocol: CProtocol,
});

export type Channel = z.infer<typeof Channel>;
