import { z } from 'zod';

/**
 * Simple Zod schema for the payload received from Front
 * Extend this as needed to fit your needs
 */
export const frontPayloadSchema = z.object({
  authorization: z.object({
    id: z.string(),
  }),
  type: z.string(),
  // The payload is a JSON object with string keys and any values - you can
  // add more specific validation here if needed
  payload: z.record(z.string(), z.any()),
})
