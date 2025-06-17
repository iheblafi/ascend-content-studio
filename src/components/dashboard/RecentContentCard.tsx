
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Clock } from 'lucide-react';

interface RecentContentCardProps {
  plan: string;
}

const RecentContentCard = ({ plan }: RecentContentCardProps) => {
  return (
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
  );
};

export default RecentContentCard;
