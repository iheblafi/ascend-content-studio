
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface WelcomeHeaderProps {
  userName: string;
}

const WelcomeHeader = ({ userName }: WelcomeHeaderProps) => {
  return (
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
  );
};

export default WelcomeHeader;
