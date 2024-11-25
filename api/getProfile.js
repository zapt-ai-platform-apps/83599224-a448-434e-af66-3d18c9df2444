import { authenticateUser } from "./_apiUtils.js";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const user = await authenticateUser(req);

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const result = await db.select()
      .from(users)
      .where(eq(users.id, user.id));

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
}