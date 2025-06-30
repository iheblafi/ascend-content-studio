// /pages/api/analyze.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { analyzeContent } from '@/lib/analysis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { content, targetKeywords } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  try {
    const result = await analyzeContent(content, targetKeywords);
    res.status(200).json(result);
  } catch (err) {
    console.error('Analyze Error:', err);
    res.status(500).json({ error: 'Analysis failed' });
  }
}
