
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, BarChart3 } from 'lucide-react';

const DashboardActionCards = () => {
  return (
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
  );
};

export default DashboardActionCards;
