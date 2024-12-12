import { Queue } from 'bullmq';

import { connection } from './connection';

// Configure queue for ingesting Front events
export const frontEventsQueue = new Queue('ingest-front-events', { connection });
