import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const jokes = pgTable('jokes', {
  id: serial('id').primaryKey(),
  setup: text('setup').notNull(),
  punchline: text('punchline').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: uuid('user_id').notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  username: text('username'),
  bio: text('bio'),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  authorId: uuid('author_id')
});