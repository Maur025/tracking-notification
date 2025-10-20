import { Application } from 'express';
import { Server } from 'http';
import z, { any, object } from 'zod';

export const ServerBuilderSchema = object({
	getApplication: any(),
	startServer: any(),
});

export type ServerBuilderSchema = Omit<
	z.infer<typeof ServerBuilderSchema>,
	'getApplication' | 'startServer'
> & {
	getApplication: () => Application;
	startServer: () => Server;
};
