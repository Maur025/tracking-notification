import { workerTopics } from '@src/worker-topic.js';
import { Queue } from 'bullmq';

export const whatsappQueue = new Queue(workerTopics.WHATSAPP);
