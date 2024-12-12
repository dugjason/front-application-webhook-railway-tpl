import { createMiddleware } from 'hono/factory'
import crypto from 'node:crypto'

import { env } from '../env'

/**
 * Validate the integrity of the request
 * @see https://dev.frontapp.com/docs/application-webhooks#verifying-integrity
 */
export const validateIntegrity = createMiddleware(async (c, next) => {
  const signature = c.req.header('x-front-signature')
  const requestTimestamp = c.req.header('x-front-request-timestamp')

  if (!signature || !requestTimestamp) {
    console.error('Missing integrity headers', { signature, requestTimestamp })
    return c.json({ error: 'Missing integrity headers' }, 400)
  }

  c.req.bodyCache.json = await c.req.json()

  const baseString = Buffer.concat([
    Buffer.from(`${requestTimestamp}:`, "utf8"),
    Buffer.from(JSON.stringify(c.req.bodyCache.json)),
  ]).toString();

  const hmac = crypto
    .createHmac("sha256", env.FRONT_APP_SECRET)
    .update(baseString)
    .digest("base64");

  if (hmac !== signature) {
    console.error('Invalid integrity', { signature, requestTimestamp })
    return c.json({ error: 'Invalid integrity' }, 400)
  }

  await next()
})
