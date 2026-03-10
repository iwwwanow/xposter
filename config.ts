import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  BOT_TOKEN: z.string().min(1),
  DATABASE_PATH: z.string().default('data/xposter.db'),
  ENCRYPTION_KEY: z.string().length(32),
})

export const config = schema.parse(process.env)
