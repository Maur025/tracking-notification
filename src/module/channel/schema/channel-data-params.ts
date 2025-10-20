import z, { object, string } from 'zod';

export const ChannelDataParams = object({
	field: string().nonempty(),
	type: string().nonempty(),
	value: string().nonempty(),
});

export type ChannelDataParams = z.infer<typeof ChannelDataParams>;
