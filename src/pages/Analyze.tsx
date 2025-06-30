import { ContentAnalyzer } from '@/components/content/ContentAnalyze'
import Header from '@/components/layout/Header'

const AnalyzePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Content Analysis
            </h1>
            <p className="text-lg text-gray-600">
              Upload your content and get instant AI-powered analysis and optimization suggestions
            </p>
          </div>
          
          <ContentAnalyzer />
        </div>
      </main>
    </div>
  )
}

export default AnalyzePage

