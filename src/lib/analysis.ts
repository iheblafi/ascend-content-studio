import { ContentEntry, AnalysisResult } from '@/lib/supabase'

// Mock AI analysis functions - in production, these would call actual AI services
export async function analyzeContent(
  content: string,
  targetKeywords?: string
): Promise<Partial<AnalysisResult>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Mock analysis results
  const wordCount = content.split(/\s+/).length
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const avgWordsPerSentence = wordCount / sentences.length

  // Mock keyword extraction
  const words = content.toLowerCase().match(/\b\w+\b/g) || []
  const wordFreq: { [key: string]: number } = {}
  words.forEach(word => {
    if (word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    }
  })
  
  const extractedKeywords = Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word)

  // Mock sentiment analysis
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'perfect', 'awesome']
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointing', 'poor', 'failed', 'wrong']
  
  const positiveCount = positiveWords.reduce((count, word) => 
    count + (content.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0)
  const negativeCount = negativeWords.reduce((count, word) => 
    count + (content.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0)
  
  const sentimentScore = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1)
  const sentimentLabel = sentimentScore > 0.1 ? 'positive' : sentimentScore < -0.1 ? 'negative' : 'neutral'

  // Mock scoring
  const readabilityScore = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 2))
  const seoScore = targetKeywords ? 
    Math.min(100, (targetKeywords.split(',').filter(keyword => 
      content.toLowerCase().includes(keyword.trim().toLowerCase())).length / targetKeywords.split(',').length) * 100) : 
    Math.random() * 40 + 40

  const engagementScore = Math.min(100, Math.max(0, 
    (wordCount > 300 ? 80 : wordCount / 300 * 80) + 
    (sentences.length > 5 ? 20 : sentences.length / 5 * 20)))

  const overallScore = Math.round((readabilityScore + seoScore + engagementScore) / 3)

  // Mock suggestions
  const suggestions = []
  if (readabilityScore < 70) {
    suggestions.push({
      type: 'readability',
      title: 'Improve Readability',
      description: 'Consider shorter sentences and simpler words to improve readability.',
      priority: 'high'
    })
  }
  if (seoScore < 60) {
    suggestions.push({
      type: 'seo',
      title: 'Optimize for SEO',
      description: 'Include more target keywords naturally throughout your content.',
      priority: 'medium'
    })
  }
  if (wordCount < 300) {
    suggestions.push({
      type: 'length',
      title: 'Expand Content',
      description: 'Consider adding more detailed information to reach optimal content length.',
      priority: 'low'
    })
  }

  return {
    overall_score: overallScore,
    seo_score: Math.round(seoScore),
    readability_score: Math.round(readabilityScore),
    engagement_score: Math.round(engagementScore),
    keyword_density: Object.fromEntries(
      Object.entries(wordFreq).slice(0, 5).map(([word, count]) => [word, count / wordCount])
    ),
    extracted_keywords: extractedKeywords,
    sentiment_score: Number(sentimentScore.toFixed(2)),
    sentiment_label: sentimentLabel as 'positive' | 'negative' | 'neutral',
    tone_analysis: {
      formal: Math.random() * 0.5 + 0.3,
      casual: Math.random() * 0.4 + 0.1,
      professional: Math.random() * 0.6 + 0.2,
      friendly: Math.random() * 0.5 + 0.2
    },
    semantic_topics: extractedKeywords.slice(0, 5),
    content_categories: ['general', 'informational'],
    suggestions
  }
}

export async function extractKeywords(content: string): Promise<string[]> {
  // Simple keyword extraction
  const words = content.toLowerCase().match(/\b\w+\b/g) || []
  const wordFreq: { [key: string]: number } = {}
  
  words.forEach(word => {
    if (word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    }
  })
  
  return Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word)
}

export async function analyzeSentiment(content: string): Promise<{
  score: number
  label: 'positive' | 'negative' | 'neutral'
}> {
  // Simple sentiment analysis
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'perfect', 'awesome']
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointing', 'poor', 'failed', 'wrong']
  
  const positiveCount = positiveWords.reduce((count, word) => 
    count + (content.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0)
  const negativeCount = negativeWords.reduce((count, word) => 
    count + (content.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0)
  
  const score = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1)
  const label = score > 0.1 ? 'positive' : score < -0.1 ? 'negative' : 'neutral'
  
  return { score: Number(score.toFixed(2)), label }
}

export async function analyzeTone(content: string): Promise<{
  formal: number
  casual: number
  professional: number
  friendly: number
}> {
  // Mock tone analysis
  return {
    formal: Math.random() * 0.5 + 0.3,
    casual: Math.random() * 0.4 + 0.1,
    professional: Math.random() * 0.6 + 0.2,
    friendly: Math.random() * 0.5 + 0.2
  }
}

export async function analyzeSemantics(content: string): Promise<{
  topics: string[]
  categories: string[]
}> {
  // Simple semantic analysis
  const keywords = await extractKeywords(content)
  
  return {
    topics: keywords.slice(0, 5),
    categories: ['general', 'informational']
  }
}

