import compression from 'compression';
import { ServerBuilder } from './server/server-builder';
import express from 'express';
import cors from 'cors';
import { env } from '@config/env';
import { apiReference } from '@scalar/express-api-reference';
import DocReferenceFile from './docs/swagger.json';

const { PORT, HOST } = env;

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
	.withRoute([
		'/reference',
		apiReference({ spec: { content: DocReferenceFile } }),
	])
	.withHost(HOST)
	.withPort(PORT)
	.build();

export default appServer;
