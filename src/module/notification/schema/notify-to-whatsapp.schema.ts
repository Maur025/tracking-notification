import z, { object, string } from 'zod';

export const NotifyToWhatsappSchema = object({
	numberPhone: string(),
	message: string().nonempty(),
});

export type NotifyToWhatsappSchema = z.infer<typeof NotifyToWhatsappSchema>;
