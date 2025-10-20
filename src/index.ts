import 'dotenv/config';
import 'reflect-metadata';
import './worker';
import { loggerDebug } from '@maur025/core-logger';
import { Queue } from 'bullmq';

loggerDebug('WELCOME TO TRACKING NOTIFICATION SERVER');

const myQueue = new Queue('foo');

const addJobs = async () => {
	await myQueue.add('myJobName', { foo: 'bar' });
	await myQueue.add('myJobName', { qux: 'baz' });
};

await addJobs();
