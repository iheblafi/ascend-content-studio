import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  MessageSquare, 
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'
import { AnalysisResult } from '@/lib/supabase'

interface AnalysisResultsProps {
  result: Partial<AnalysisResult>
  contentTitle?: string
}

export function AnalysisResults({ result, contentTitle }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getSentimentColor = (label: string) => {
    switch (label) {
      case 'positive': return 'bg-green-100 text-green-800'
      case 'negative': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSuggestionIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'medium': return <Info className="h-4 w-4 text-yellow-500" />
      default: return <Lightbulb className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analysis Results
            {contentTitle && <span className="text-muted-foreground">- {contentTitle}</span>}
          </CardTitle>
          <CardDescription>
            AI-powered content analysis and optimization recommendations
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${getScoreColor(result.overall_score || 0)}`}>
              {result.overall_score || 0}%
            </div>
            <div className="flex-1">
              <Progress 
                value={result.overall_score || 0} 
                className="h-3"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {result.overall_score && result.overall_score >= 80 
                  ? 'Excellent content optimization!'
                  : result.overall_score && result.overall_score >= 60
                  ? 'Good content with room for improvement'
                  : 'Content needs optimization'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${getScoreColor(result.seo_score || 0)}`}>
                {result.seo_score || 0}%
              </div>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <Progress value={result.seo_score || 0} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Readability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${getScoreColor(result.readability_score || 0)}`}>
                {result.readability_score || 0}%
              </div>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
            <Progress value={result.readability_score || 0} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${getScoreColor(result.engagement_score || 0)}`}>
                {result.engagement_score || 0}%
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <Progress value={result.engagement_score || 0} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="keywords" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="tone">Tone</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Keyword Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.extracted_keywords && result.extracted_keywords.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Extracted Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.extracted_keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {result.keyword_density && Object.keys(result.keyword_density).length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Keyword Density</h4>
                  <div className="space-y-2">
                    {Object.entries(result.keyword_density).map(([keyword, density]) => (
                      <div key={keyword} className="flex items-center justify-between">
                        <span className="text-sm">{keyword}</span>
                        <span className="text-sm text-muted-foreground">
                          {((density as number) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge className={getSentimentColor(result.sentiment_label || 'neutral')}>
                  {result.sentiment_label || 'neutral'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Score: {result.sentiment_score || 0}
                </span>
              </div>
              
              {result.semantic_topics && result.semantic_topics.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Semantic Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.semantic_topics.map((topic, index) => (
                      <Badge key={index} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tone" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tone Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {result.tone_analysis && (
                <div className="space-y-3">
                  {Object.entries(result.tone_analysis).map(([tone, score]) => (
                    <div key={tone} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{tone}</span>
                        <span>{((score as number) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(score as number) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <div className="space-y-3">
            {result.suggestions && Array.isArray(result.suggestions) && result.suggestions.length > 0 ? (
              result.suggestions.map((suggestion: any, index: number) => (
                <Alert key={index}>
                  <div className="flex items-start gap-2">
                    {getSuggestionIcon(suggestion.priority)}
                    <div className="flex-1">
                      <AlertDescription>
                        <div className="font-medium">{suggestion.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {suggestion.description}
                        </div>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))
            ) : (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Great job! Your content is well-optimized. No major improvements needed.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

