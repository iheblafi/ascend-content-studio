import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface ContentUploaderProps {
  onAnalysisStart: (content: string, fileName?: string, targetKeywords?: string) => void
  loading: boolean
}

export function ContentUploader({ onAnalysisStart, loading }: ContentUploaderProps) {
  const { user, profile } = useAuth()
  const [textContent, setTextContent] = useState('')
  const [targetKeywords, setTargetKeywords] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [activeTab, setActiveTab] = useState('text')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    // Check file type
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, DOC, DOCX, and TXT files are supported')
      return
    }

    setUploadedFile(file)
    
    try {
      let content = ''
      
      if (file.type === 'text/plain') {
        content = await file.text()
      } else if (file.type === 'application/pdf') {
        // For PDF files, we'll need to extract text
        // This is a placeholder - in production, you'd use a PDF parsing library
        content = `[PDF Content from ${file.name}] - PDF text extraction would be implemented here`
      } else if (file.type.includes('word')) {
        // For Word documents, we'll need to extract text
        // This is a placeholder - in production, you'd use a Word parsing library
        content = `[Word Document Content from ${file.name}] - Word document text extraction would be implemented here`
      }
      
      setFileContent(content)
      toast.success('File uploaded successfully')
    } catch (error) {
      console.error('Error reading file:', error)
      toast.error('Error reading file content')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    multiple: false
  })

  const handleAnalyze = async () => {
    if (!user) {
      toast.error('Please sign in to analyze content')
      return
    }

    // Check usage limits
    if (profile && profile.usage_count >= profile.usage_limit) {
      toast.error('You have reached your usage limit. Please upgrade your plan.')
      return
    }

    const content = activeTab === 'text' ? textContent : fileContent
    
    if (!content.trim()) {
      toast.error('Please provide content to analyze')
      return
    }

    const fileName = activeTab === 'file' ? uploadedFile?.name : undefined
    onAnalysisStart(content, fileName, targetKeywords)
  }

  const canAnalyze = () => {
    if (activeTab === 'text') {
      return textContent.trim().length > 0
    } else {
      return fileContent.trim().length > 0
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Content Analyzer
        </CardTitle>
        <CardDescription>
          Upload your content and get AI-powered optimization insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Text Input</TabsTrigger>
            <TabsTrigger value="file">File Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Paste your content here..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={10}
                className="resize-none"
              />
              <p className="text-sm text-muted-foreground">
                {textContent.length} characters
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="file" className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              {isDragActive ? (
                <p className="text-lg">Drop your file here...</p>
              ) : (
                <div>
                  <p className="text-lg mb-2">
                    Drop your file here or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports: PDF, DOC, DOCX, TXT (Max 5MB)
                  </p>
                </div>
              )}
            </div>
            
            {uploadedFile && (
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  {fileContent && (
                    <div className="mt-2 text-sm">
                      Content preview: {fileContent.substring(0, 100)}...
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <Label htmlFor="keywords">Target Keywords/Topic (Optional)</Label>
          <Input
            id="keywords"
            placeholder="Enter target keywords or topic focus"
            value={targetKeywords}
            onChange={(e) => setTargetKeywords(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Help the AI understand your content goals
          </p>
        </div>

        {profile && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Usage: {profile.usage_count}/{profile.usage_limit} analyses used this month
              {profile.subscription_plan === 'free' && (
                <span className="block mt-1 text-sm">
                  Upgrade to Pro for unlimited analyses
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleAnalyze}
          disabled={!canAnalyze() || loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Content...
            </>
          ) : (
            'Analyze Content'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

