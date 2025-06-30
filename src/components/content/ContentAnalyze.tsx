import { useState } from 'react'
import { ContentUploader } from '@/components/content/ContentUploader'
import { AnalysisResults } from '@/components/content/AnalysisResults'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, ContentEntry, AnalysisResult } from '@/lib/supabase'
import { toast } from 'sonner'

const API_BASE = 'http://localhost:5001/api';

export function ContentAnalyzer() {
  const { user, profile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<Partial<AnalysisResult> | null>(null)
  const [contentTitle, setContentTitle] = useState<string>()

  const handleAnalysisStart = async (
    content: string, 
    fileName?: string, 
    targetKeywords?: string
  ) => {
    if (!user) {
      toast.error('Please sign in to analyze content')
      return
    }

    setLoading(true)
    setAnalysisResult(null)

    try {
      // Call each API endpoint separately
      const [analyzeRes, sentimentRes, toneRes, semanticsRes, keywordsRes] = await Promise.all([
        fetch(`${API_BASE}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, targetKeywords })
        }).then(r => r.json()),
        fetch(`${API_BASE}/sentiments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content })
        }).then(r => r.json()),
        fetch(`${API_BASE}/tone`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content })
        }).then(r => r.json()),
        fetch(`${API_BASE}/semantics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content })
        }).then(r => r.json()),
        fetch(`${API_BASE}/keywords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content })
        }).then(r => r.json()),
      ])

      // Combine results
      const analysis: Partial<AnalysisResult> = {
        ...analyzeRes,
        sentiment_score: sentimentRes.score,
        sentiment_label: sentimentRes.label,
        tone_analysis: toneRes,
        semantic_topics: semanticsRes.topics,
        content_categories: semanticsRes.categories,
        extracted_keywords: keywordsRes.keywords,
      }

      // Store content entry in database with analysis results
      const { data: contentEntry, error: contentError } = await supabase
        .from('content')
        .insert({
          user_id: user.id,
          title: fileName || `Analysis ${new Date().toLocaleDateString()}`,
          content_type: 'analysis',
          content: content,
          ai_optimization_score: analysis.overall_score || 0,
          status: 'completed'
        })
        .select()
        .single()

      if (contentError) {
        console.error('Error storing content:', contentError)
        toast.error('Error storing content')
        return
      }

      // Store analysis results in analytics table
      if (analysis.overall_score) {
        await supabase
          .from('analytics')
          .insert({
            user_id: user.id,
            content_id: contentEntry.id,
            metric_type: 'ai_optimization_score',
            metric_value: analysis.overall_score
          })
      }

      setAnalysisResult(analysis)
      setContentTitle(contentEntry.title || undefined)
      toast.success('Content analysis completed!')

    } catch (error) {
      console.error('Analysis error:', error)
      toast.error('Error analyzing content')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <ContentUploader 
        onAnalysisStart={handleAnalysisStart}
        loading={loading}
      />
      
      {analysisResult && (
        <AnalysisResults 
          result={analysisResult}
          contentTitle={contentTitle}
        />
      )}
    </div>
  )
}

