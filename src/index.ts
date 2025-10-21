import 'dotenv/config';
import 'reflect-metadata';
import { loggerDebug } from '@maur025/core-logger';
import { initializeWorkers } from '@worker/initialize-workers.js';
import { appServer } from './app-server.js';
import { RegisterRoutes } from './routes/routes.js';

const { startServer, getApplication } = appServer;

loggerDebug('TRACKING NOTIFICATION SERVER running...');

RegisterRoutes(getApplication());

startServer();

initializeWorkers();

// const myQueue = new Queue('foo');

// const addJobs = async () => {
// 	await myQueue.add('myJobName', { foo: 'bar' });
// 	await myQueue.add('myJobName', { qux: 'baz' });
// };

// await addJobs();
