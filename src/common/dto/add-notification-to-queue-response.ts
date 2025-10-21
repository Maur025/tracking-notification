import z, { number, object, string } from 'zod';

export const AddNotificationToQueueResponse = object({
	id: string(),
	queueName: string(),
	timestamp: number().nonnegative(),
});

export type AddNotificationToQueueResponse = z.infer<
	typeof AddNotificationToQueueResponse
>;
