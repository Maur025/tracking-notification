import z, { number, object, string } from 'zod';

export const EnvironmentSchema = object({
	TRACKING_DB_URL: string().nonempty(),
	REDIS_HOST: string().nonempty(),
	REDIS_PORT: number().min(4).max(5),
	PORT: number().nonnegative(),
	HOST: string().optional(),
});

export type EnvironmentSchema = z.infer<typeof EnvironmentSchema>;
