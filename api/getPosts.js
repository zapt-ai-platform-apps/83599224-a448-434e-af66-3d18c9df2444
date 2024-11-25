import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { posts } from '../drizzle/schema.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const result = await db.select()
      .from(posts)
      .orderBy(posts.createdAt.desc());

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
}