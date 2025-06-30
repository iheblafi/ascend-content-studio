import express from 'express';
import cors from 'cors';
import {
  analyzeContent,
  analyzeSentiment,
  analyzeTone,
  analyzeSemantics,
  extractKeywords
} from './analysis.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { content, targetKeywords } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });
  try {
    console.log("📨 Received /api/analyze request"); // 
    const result = await analyzeContent(content, targetKeywords);
    res.json(result);
  } catch (err) {
    console.error("🔥 Error in /api/analyze:", err);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

app.get('/api/ping', (req, res) => res.send('pong 🏓'));


app.post('/api/sentiments', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });
  try {
    const result = await analyzeSentiment(content);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Sentiment analysis failed' });
  }
});

app.post('/api/tone', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });
  try {
    const result = await analyzeTone(content);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Tone analysis failed' });
  }
});

app.post('/api/semantics', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });
  try {
    const result = await analyzeSemantics(content);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Semantic analysis failed' });
  }
});

app.post('/api/keywords', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });
  try {
    const result = await extractKeywords(content);
    res.json({ keywords: result });
  } catch (err) {
    res.status(500).json({ error: 'Keyword extraction failed' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`)); 