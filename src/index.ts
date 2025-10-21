import 'reflect-metadata';
import 'dotenv/config';
import { container } from 'tsyringe';
import { RegisterRoutes } from './routes/routes.js';
import { measurePerformance } from '@util/measure-performance.js';
import { notificationChannelInit } from '@module/notification/notification-channel-init.js';
import ChannelInitialize from '@module/channel/channel-initialize.js';
import { appServer } from './app-server.js';
import { initializeWorkers } from '@worker/initialize-workers.js';

const { startServer, getApplication } = appServer;

RegisterRoutes(getApplication());

await measurePerformance(startServer, '[EXPRESS] Server started in:');

const channelInit = container.resolve(ChannelInitialize);

await measurePerformance(
	channelInit.initCache.bind(channelInit),
	'[CHANNEL] Channel cache initialized in:',
);

await measurePerformance(
	notificationChannelInit,
	'[NOTIFICATION] Channels initialized in:',
);

initializeWorkers();
