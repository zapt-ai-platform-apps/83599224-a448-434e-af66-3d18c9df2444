import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID
    }
  }
});

import { authenticateUser } from "./_apiUtils.js";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const user = await authenticateUser(req);
    const { username, bio } = req.body;

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    await db.update(users)
      .set({ username, bio })
      .where(eq(users.id, user.id));

    res.status(200).json({ message: 'Profile updated' });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error updating profile' });
  }
}