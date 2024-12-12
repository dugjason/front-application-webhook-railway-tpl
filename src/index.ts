import { serve } from '@hono/node-server'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { env } from './env'
import { handleChallenge } from './middleware/handle-challenge'
import { validateIntegrity } from './middleware/validate-integrity'
import { frontEventsQueue } from './queue/queue'
import { initializeWorkers } from './queue/worker'
import { frontPayloadSchema } from './schema'

/**
 * Map of job priorities for the queue
 * @see https://docs.bullmq.io/guide/jobs/prioritized
 */
const Priority = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
}

const app = new Hono()

/**
 * Add Hono Middlewares
 */

// Add Hono Logger Middleware
// @see https://hono.dev/docs/middleware/builtin/logger
app.use(logger())

// Validate the integrity of the request
app.use('*', validateIntegrity)

// Handle the challenge request
app.use('*', handleChallenge)

/*
 * This route is used to ingest Front events
 * It validates the payload using Zod and adds the job to the queue
 */
app.post('/ingest', zValidator('json', frontPayloadSchema), async (c) => {
  const data = c.req.valid('json')
  const jobId = String(data.payload.id)

  // Write event to Queue for processing
  // Job name looks like ingest_front_event_<event_type> (e.g. ingest_front_event_tag_added)
  // Sets the jobId to the Front evt_... event id
  await frontEventsQueue.add(
    `ingest_front_event_${data.type}`,
    data,
    {
      // Set the jobId to the Front evt_... event id
      jobId,
      // Set the job priority - uses Medium priority by default, but you can set it 
      // to High or Low if you want to prioritize/deprioritize certain events
      priority: Priority.MEDIUM,

    }
  )

  // Return a success response to the Front webhook to confirm the event was received
  return c.json({ type: "success" })
})

/**
 * App initialization
 */

const port = env.PORT ? Number(env.PORT) : 3000;
console.log(`Server is running on port ${port}`)

// Ensure all BullMQ workers are initialized and running before starting the server
initializeWorkers()

serve({
  fetch: app.fetch,
  port
})
