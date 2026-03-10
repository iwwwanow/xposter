import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const publications = sqliteTable('publications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  contentType: text('content_type', { enum: ['text', 'image', 'audio', 'story'] }).notNull(),
  contentPath: text('content_path'),
  caption: text('caption'),
  platforms: text('platforms').notNull(), // JSON: Platform[]
  scheduledAt: integer('scheduled_at', { mode: 'timestamp' }),
  status: text('status', { enum: ['draft', 'scheduled', 'sent', 'failed'] })
    .notNull()
    .default('draft'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const accounts = sqliteTable('accounts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  platform: text('platform', { enum: ['telegram', 'instagram', 'twitter'] }).notNull(),
  credentials: text('credentials').notNull(), // encrypted JSON
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
