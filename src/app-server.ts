import compression from 'compression';
import { ServerBuilder } from './server/server-builder.js';
import express from 'express';
import cors from 'cors';
import { env } from '@config/env.js';
import { apiReference } from '@scalar/express-api-reference';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { outTsoaRoutes } from './routes/out.tsoa.routes.js';

const { PORT, HOST } = env;

const DocReferenceFile = JSON.parse(
	readFileSync(join(process.cwd(), 'src/docs/swagger.json'), 'utf-8'),
);

const appServer = ServerBuilder.builder()
	.withMiddleware(compression())
	.withMiddleware(express.json({ limit: '25mb' }))
	.withMiddleware(express.text({ limit: '25mb' }))
	.withMiddleware(
		express.urlencoded({
			extended: true,
			limit: '50mb',
			parameterLimit: 100000,
		}),
	)
	.withMiddleware(
		cors({
			origin: '*',
			optionsSuccessStatus: 200,
		}),
	)
	.withRoute(['/reference', apiReference({ content: DocReferenceFile })])
	.withRoute(['/api/notifications', outTsoaRoutes])
	.withHost(HOST)
	.withPort(PORT)
	.build();

export { appServer };
