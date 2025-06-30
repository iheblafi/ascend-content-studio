// backend/analysis.js
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY

// Mock AI analysis functions - in production, these would call actual AI services
// async function analyzeContent(content, targetKeywords) {
//   await new Promise(resolve => setTimeout(resolve, 2000));

//   const wordCount = content.split(/\s+/).length;
//   const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
//   const avgWordsPerSentence = wordCount / sentences.length;

//   // Mock keyword extraction
//   const words = content.toLowerCase().match(/\b\w+\b/g) || [];
//   const wordFreq = {};
//   words.forEach(word => {
//     if (word.length > 3) {
//       wordFreq[word] = (wordFreq[word] || 0) + 1;
//     }
//   });

//   const extractedKeywords = Object.entries(wordFreq)
//     .sort(([,a], [,b]) => b - a)
//     .slice(0, 10)
//     .map(([word]) => word);

//   // Mock sentiment analysis
//   const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'perfect', 'awesome'];
//   const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointing', 'poor', 'failed', 'wrong'];

//   const positiveCount = positiveWords.reduce((count, word) =>
//     count + (content.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0);
//   const negativeCount = negativeWords.reduce((count, word) =>
//     count + (content.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0);

//   const sentimentScore = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1);
//   const sentimentLabel = sentimentScore > 0.1 ? 'positive' : sentimentScore < -0.1 ? 'negative' : 'neutral';

//   // Mock scoring
//   const readabilityScore = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 2));
//   const seoScore = targetKeywords ?
//     Math.min(100, (targetKeywords.split(',').filter(keyword =>
//       content.toLowerCase().includes(keyword.trim().toLowerCase())).length / targetKeywords.split(',').length) * 100) :
//     Math.random() * 40 + 40;

//   const engagementScore = Math.min(100, Math.max(0,
//     (wordCount > 300 ? 80 : wordCount / 300 * 80) +
//     (sentences.length > 5 ? 20 : sentences.length / 5 * 20)));

//   const overallScore = Math.round((readabilityScore + seoScore + engagementScore) / 3);

//   // Mock suggestions
//   const suggestions = [];
//   if (readabilityScore < 70) {
//     suggestions.push({
//       type: 'readability',
//       title: 'Improve Readability',
//       description: 'Consider shorter sentences and simpler words to improve readability.',
//       priority: 'high'
//     });
//   }
//   if (seoScore < 60) {
//     suggestions.push({
//       type: 'seo',
//       title: 'Optimize for SEO',
//       description: 'Include more target keywords naturally throughout your content.',
//       priority: 'medium'
//     });
//   }
//   if (wordCount < 300) {
//     suggestions.push({
//       type: 'length',
//       title: 'Expand Content',
//       description: 'Consider adding more detailed information to reach optimal content length.',
//       priority: 'low'
//     });
//   }

//   return {
//     overall_score: overallScore,
//     seo_score: Math.round(seoScore),
//     readability_score: Math.round(readabilityScore),
//     engagement_score: Math.round(engagementScore),
//     keyword_density: Object.fromEntries(
//       Object.entries(wordFreq).slice(0, 5).map(([word, count]) => [word, count / wordCount])
//     ),
//     extracted_keywords: extractedKeywords,
//     sentiment_score: Number(sentimentScore.toFixed(2)),
//     sentiment_label: sentimentLabel,
//     tone_analysis: {
//       formal: Math.random() * 0.5 + 0.3,
//       casual: Math.random() * 0.4 + 0.1,
//       professional: Math.random() * 0.6 + 0.2,
//       friendly: Math.random() * 0.5 + 0.2
//     },
//     semantic_topics: extractedKeywords.slice(0, 5),
//     content_categories: ['general', 'informational'],
//     suggestions
//   };
// }

async function analyzeContent(content, targetKeywords = '') {
  const prompt = `
You are an expert content analyst.

Analyze the following content:
-------------------------------
${content}
-------------------------------

Respond ONLY with strict, valid JSON. Do not include any explanations, markdown, or extra text.

The JSON should include:
- overall_score (0-100)
- seo_score (0-100) based on presence of these keywords: ${targetKeywords}
- readability_score (0-100)
- engagement_score (0-100)
- sentiment_label ("positive", "negative", "neutral")
- sentiment_score (between -1 and 1)
- tone_analysis (formal, casual, professional, friendly percentages)
- extracted_keywords (top 5 keywords)
- semantic_topics (related topics)
- content_categories (categories like tech, health, etc.)
- suggestions (array of { type, title, description, priority })

Respond with JSON only.
`;

try {
  const response = await axios.post(
    'https://api.together.xyz/v1/chat/completions',
    {
      model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
      messages: [{ role: 'user', content: prompt }],
      //temperature: 0.7
    },
    {
      headers: {
        'Authorization': `Bearer ${TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const text = response.data.choices[0].message.content
  console.log("🔍 Together AI raw response:", text)

const cleanedText = text.replace(/```json|```/g, '').trim();

try {
  const json = JSON.parse(cleanedText);
  return json;
} catch (parseError) {
  console.error('❌ Failed to parse cleaned response:', cleanedText);
  throw new Error('Cleaned response is still not valid JSON');
}
} catch (err) {
  console.error('🔥 Error in analyzeContent:', err.response?.data || err.message)
  throw new Error('Failed to get a valid JSON response from Together AI.')
}
}


async function extractKeywords(content) {
  const words = content.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq = {};
  words.forEach(word => {
    if (word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  return Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
}

async function analyzeSentiment(content) {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'perfect', 'awesome'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointing', 'poor', 'failed', 'wrong'];

  const positiveCount = positiveWords.reduce((count, word) =>
    count + (content.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0);
  const negativeCount = negativeWords.reduce((count, word) =>
    count + (content.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0);

  const score = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1);
  const label = score > 0.1 ? 'positive' : score < -0.1 ? 'negative' : 'neutral';

  return { score: Number(score.toFixed(2)), label };
}

async function analyzeTone(content) {
  return {
    formal: Math.random() * 0.5 + 0.3,
    casual: Math.random() * 0.4 + 0.1,
    professional: Math.random() * 0.6 + 0.2,
    friendly: Math.random() * 0.5 + 0.2
  };
}

async function analyzeSemantics(content) {
  const keywords = await extractKeywords(content);
  return {
    topics: keywords.slice(0, 5),
    categories: ['general', 'informational']
  };
}

export {
  analyzeContent,
  extractKeywords,
  analyzeSentiment,
  analyzeTone,
  analyzeSemantics
};