import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Upload, FileText, BarChart3, Users, Bot, Shield, Zap, Star, TrendingUp, Target, Settings, Eye } from "lucide-react";
import { CheckCircle, ArrowRight, Upload, FileText, BarChart3, Users, Bot, Shield, Zap, Star, TrendingUp, Target, Settings, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import LearnMoreCard from "@/components/LearnMoreCard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("resume");
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);

  const features = [
    {
      icon: Bot,
      title: "AI Content Analysis",
      description: "Get instant feedback on your content's effectiveness and optimization potential."
    },
    {
      icon: BarChart3,
      title: "Performance Scoring",
      description: "Receive detailed scores for SEO, readability, and engagement metrics."
    },
    {
      icon: TrendingUp,
      title: "Optimization Suggestions",
      description: "Get actionable recommendations to improve your content performance."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your content is protected with bank-level security and encryption."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Manager",
      company: "TechCorp",
      content: "ContentAI Pro helped us increase our content engagement by 340% in just 3 months.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "GrowthLab",
      content: "The AI suggestions are incredibly accurate and have saved us hours of optimization work.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "SEO Specialist",
      company: "Digital Solutions",
      content: "Our content now ranks consistently higher thanks to the AI-powered optimization.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section - Jobscan Style */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Optimize Your Content with AI
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Upload your content and get instant AI-powered analysis, optimization suggestions, and performance insights to maximize your reach and engagement.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Free to use
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Instant results
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                No signup required
              </div>
            </div>
          </div>

          {/* Numbered Steps - Jobscan Style */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    1
                  </div>
                  <span className="text-gray-700 font-medium">Upload Content</span>
                </div>
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    2
                  </div>
                  <span className="text-gray-500 font-medium">Add Target</span>
                </div>
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    3
                  </div>
                  <span className="text-gray-500 font-medium">View Results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Numbered Steps - Jobscan Style */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    1
                  </div>
                  <span className="text-gray-700 font-medium">Upload Content</span>
                </div>
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    2
                  </div>
                  <span className="text-gray-500 font-medium">Add Target</span>
                </div>
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    3
                  </div>
                  <span className="text-gray-500 font-medium">View Results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tool Interface - Jobscan Style */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-900">Content Optimizer</CardTitle>
                    <CardDescription className="text-gray-600">
                      Upload your content and get AI-powered optimization insights
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    AI Powered
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("resume")}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 ${
                      activeTab === "resume"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FileText className="h-4 w-4 inline mr-2" />
                    Content Analysis
                  </button>
                  <button
                    onClick={() => setActiveTab("job")}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 ${
                      activeTab === "job"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 inline mr-2" />
                    Performance Metrics
                  </button>
                </div>

                {/* Upload Areas */}
                <div className="p-8">
  {activeTab === "resume" && (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Upload Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Upload Your Content
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drop your file here or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports: PDF, DOC, DOCX, TXT (Max 5MB)
          </p>
          <Button 
            className="mt-4 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/analyze')}
          >
            Choose File
          </Button>
        </div>
      </div>

      {/* Target Area */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Target Keywords/Topic
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Enter your target keywords or topic focus
          </p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={4}
            placeholder="Enter target keywords, topic, or paste content guidelines here..."
          />
        </div>
      </div>
    </div>
  )}

  {activeTab === "job" && (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Performance Metrics Summary
      </h3>
      <ul className="space-y-4">
        <li className="flex justify-between items-center">
          <span className="text-gray-700">Readability Score</span>
          <div className="w-2/3 bg-gray-100 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full w-[80%]"></div>
          </div>
          <span className="ml-2 text-blue-600 font-medium">80%</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-gray-700">SEO Optimization</span>
          <div className="w-2/3 bg-gray-100 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full w-[92%]"></div>
          </div>
          <span className="ml-2 text-green-600 font-medium">92%</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-gray-700">Tone Appropriateness</span>
          <div className="w-2/3 bg-gray-100 rounded-full h-3">
            <div className="bg-purple-500 h-3 rounded-full w-[70%]"></div>
          </div>
          <span className="ml-2 text-purple-600 font-medium">70%</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-gray-700">Engagement Score</span>
          <div className="w-2/3 bg-gray-100 rounded-full h-3">
            <div className="bg-yellow-500 h-3 rounded-full w-[65%]"></div>
          </div>
          <span className="ml-2 text-yellow-600 font-medium">65%</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-gray-700">Keyword Density</span>
          <div className="w-2/3 bg-gray-100 rounded-full h-3">
            <div className="bg-red-500 h-3 rounded-full w-[78%]"></div>
          </div>
          <span className="ml-2 text-red-600 font-medium">78%</span>
        </li>
      </ul>
    </div>
  )}

  {/* Common Analyze Button */}
  <div className="mt-8 text-center">
    <Button 
      size="lg" 
      className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg rounded-lg shadow-lg"
      onClick={() => navigate('/analyze')}
    >
      Analyze Content
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  </div>
</div>

              </CardContent>
            </Card>
          </div>

          {/* Quick Stats - Jobscan Style */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.5M+</div>
              <div className="text-gray-600">Content Pieces Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
              <div className="text-gray-600">Average Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15hrs</div>
              <div className="text-gray-600">Average Time Saved Weekly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Interface Section - Jobscan Style */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">SCORE</Badge>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke="#10b981" 
                        strokeWidth="8" 
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">87%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-8 w-20 h-20 bg-orange-200 rounded-full opacity-80 hidden lg:block"></div>
            </div>

            <div>
              <div className="mb-4">
                <Badge className="bg-blue-100 text-blue-800 mb-4">CONTENT OPTIMIZATION</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Show that you're the perfect match
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed "  style={{ textAlign: 'justify' }}>
                Is your content a good match for what your audience is looking for? If it's not, you 
                might miss out on engagement for topics you feel qualified to cover. ContentAI Pro's 
                proprietary AI analyzes your content and compares it to your target audience using AI 
                technology. Use your match rate report to see how to optimize your content to 
                get more engagement.
              </p>

              <div className="flex items-center space-x-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/analyze')}
                >
                  Try It Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setShowLearnMore(!showLearnMore)}
                >
                  {showLearnMore ? 'Less' : 'Learn More'}
                </Button>
              </div>
            </div>
          </div>

          {showLearnMore && (
            <section className="py-16 px-8 sm:px-16 lg:px-16 ">
              <LearnMoreCard />
            </section>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How ContentAI Pro Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get AI-powered content optimization in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Upload Content</h3>
              <p className="text-gray-600">
                Upload your content in any format - documents, text, or web pages
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your content for SEO, readability, and engagement
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Get Results</h3>
              <p className="text-gray-600">
                Receive detailed scores and actionable optimization recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Content Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create content that performs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Content Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what our users say about their results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Optimize Your Content?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of content creators who use ContentAI Pro to boost their results
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={() => navigate('/analyze')}
            >
              Start Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ContentAI Pro</span>
              </div>
              <p className="text-gray-400">
                AI-powered content optimization for better results.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ContentAI Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
