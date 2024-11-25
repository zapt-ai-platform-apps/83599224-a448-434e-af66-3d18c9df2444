import { authenticateUser } from "./_apiUtils.js";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { posts } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  try {
    if (req.method !== 'DELETE') {
      res.setHeader('Allow', ['DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const user = await authenticateUser(req);
    if (user.email !== 'daoudi.abdennour@gmail.com') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    await db.delete(posts).where(eq(posts.id, id));

    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Error deleting post' });
  }
}