import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string(),
  REDIS_URL: z.string(),
  WEB_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
