import { workerTopics } from '@src/worker-topic.js';
import { Queue } from 'bullmq';

export const emailQueue = new Queue(workerTopics.EMAIL);
