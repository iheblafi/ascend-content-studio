// /pages/api/semantics.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { analyzeSemantics } from '@/lib/analysis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  try {
    const result = await analyzeSemantics(content);
    res.status(200).json(result);
  } catch (err) {
    console.error('Semantics Error:', err);
    res.status(500).json({ error: 'Semantic analysis failed' });
  }
}
