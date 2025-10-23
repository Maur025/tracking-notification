import z, { enum as enum_ } from 'zod';

export const CProtocolName = enum_([
	'mail_smtp',
	'sms_service',
	'whatsapp_service',
]);

export type CProtocolName = z.infer<typeof CProtocolName>;
