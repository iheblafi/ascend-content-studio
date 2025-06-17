
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, Sparkles, FileText, BarChart3, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user, profile, subscription, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const plan = subscription?.plan || 'free';
  const userName = profile?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header - Jobscan Style */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Welcome back, {userName}
              </h1>
              <p className="text-gray-600">
                Optimize your content and track your performance with AI-powered insights.
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <DashboardStats subscription={subscription} />

        {/* Main Action Cards - Jobscan Style */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Create Content</CardTitle>
                  <CardDescription className="text-gray-600">
                    Start a new AI-optimized content piece
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">AI Optimizer</CardTitle>
                  <CardDescription className="text-gray-600">
                    Enhance existing content with AI
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                Optimize Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Analytics</CardTitle>
                  <CardDescription className="text-gray-600">
                    View detailed performance insights
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Content Overview & Usage - Jobscan Style Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-white border border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center space-x-2 text-gray-900">
                <FileText className="h-5 w-5" />
                <span>Recent Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {plan === 'free' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
                  <p className="text-gray-600 mb-4">Create your first piece of content to get started!</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Content
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">AI Marketing Strategy Guide</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>Updated 2 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">94% Score</div>
                      <div className="text-xs text-gray-500">Excellent</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Product Launch Announcement</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>Updated 1 day ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-blue-600">87% Score</div>
                      <div className="text-xs text-gray-500">Good</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-gray-900">Plan Usage</CardTitle>
              <CardDescription className="text-gray-600">
                {plan === 'free' ? 'Free plan limits' : `${plan.charAt(0).toUpperCase() + plan.slice(1)} plan usage`}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Content pieces</span>
                  <span className="text-gray-600">{plan === 'free' ? '5/10' : 'Unlimited'}</span>
                </div>
                <Progress value={plan === 'free' ? 50 : 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">
                  {plan === 'free' ? '5 pieces remaining' : 'No limits'}
                </p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">AI optimizations</span>
                  <span className="text-gray-600">{plan === 'free' ? '3/5' : 'Unlimited'}</span>
                </div>
                <Progress value={plan === 'free' ? 60 : 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">
                  {plan === 'free' ? '2 optimizations remaining' : 'No limits'}
                </p>
              </div>
              {plan === 'free' && (
                <div className="pt-4 border-t border-gray-100">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
