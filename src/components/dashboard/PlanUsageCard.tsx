
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

interface PlanUsageCardProps {
  plan: string;
}

const PlanUsageCard = ({ plan }: PlanUsageCardProps) => {
  return (
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
  );
};

export default PlanUsageCard;
