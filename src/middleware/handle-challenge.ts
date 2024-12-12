import { createMiddleware } from 'hono/factory'

/**
 * Handle the initial challenge request
 * @see https://dev.frontapp.com/docs/application-webhooks#responding-to-the-validation-request
 */
export const handleChallenge = createMiddleware(async (c, next) => {
  const challenge = c.req.header('x-front-challenge')

  if (challenge) {
    return c.json({ challenge })
  }

  await next()
})
