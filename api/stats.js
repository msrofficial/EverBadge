import clientPromise from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { password } = req.body;
  if (password !== process.env.ADMIN_PASS) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("releasedownload_tracker"); // Generic database name
    const repos = await db.collection("repos").find({}).sort({ totalDownloads: -1 }).toArray();
    
    res.status(200).json({ success: true, data: repos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
}
