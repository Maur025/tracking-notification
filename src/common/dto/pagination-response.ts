import z, { number, object } from 'zod';

export const PaginationResponse = object({
	pages: number().nonnegative(),
	count: number().nonnegative(),
});

export type PaginationResponse = z.infer<typeof PaginationResponse>;
