import { type Job, Worker } from 'bullmq';

import { frontPayloadSchema } from '../schema';
import { connection } from './connection';

/**
 * Initialize BullMQ workers
 */
export async function initializeWorkers() {
  await worker.waitUntilReady();
}

/**
 * Worker for ingesting Front events
 */
const worker = new Worker(
  "ingest-front-events",
  processJob,
  { connection }
);

/**
 * Here's where you'll add your logic for processing the job
 */
async function processJob(job: Job) {
  console.log('Worker processing job ID:', job.id);
  // The job.data contains raw JSON payload received from Front. 
  // Let's parse it with a simple Zod schema to ensure it's valid
  const payload = frontPayloadSchema.safeParse(job.data)
  if (!payload.success) {
    console.error('Invalid payload:', payload.error);
    return;
  }

  // Now we can access the payload at payload.data
  console.log('===\n', JSON.stringify(payload.data, null, 2), '\n===');
}
