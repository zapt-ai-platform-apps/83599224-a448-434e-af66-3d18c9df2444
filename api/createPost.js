import { authenticateUser } from "./_apiUtils.js";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { posts } from '../drizzle/schema.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const user = await authenticateUser(req);
    if (user.email !== 'daoudi.abdennour@gmail.com') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const result = await db.insert(posts).values({
      title,
      content,
      authorId: user.id
    }).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
}