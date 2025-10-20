import { BaseData } from '@maur025/core-model-data';
import { CProtocolName } from './c-protocol-name';
import z, { string } from 'zod';

export const CProtocol = BaseData.extend({
	name: CProtocolName,
	script: string().optional(),
});

export type CProtocol = z.infer<typeof CProtocol>;
