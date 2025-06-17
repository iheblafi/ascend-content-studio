
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, FileText, TrendingUp, Users, Zap, Crown, Star } from 'lucide-react';

interface DashboardStatsProps {
  subscription: any;
}

const DashboardStats = ({ subscription }: DashboardStatsProps) => {
  const plan = subscription?.plan || 'free';
  
  const getStatsForPlan = () => {
    switch (plan) {
      case 'pro':
        return {
          contentCount: 47,
          optimizationScore: 94,
          monthlyViews: 12500,
          teamMembers: 5,
          features: ['Advanced AI', 'Team Collaboration', 'Priority Support']
        };
      case 'enterprise':
        return {
          contentCount: 156,
          optimizationScore: 98,
          monthlyViews: 45000,
          teamMembers: 15,
          features: ['Custom AI Models', 'API Access', 'Dedicated Support']
        };
      default:
        return {
          contentCount: 5,
          optimizationScore: 76,
          monthlyViews: 1200,
          teamMembers: 1,
          features: ['Basic AI', 'Standard Templates']
        };
    }
  };

  const stats = getStatsForPlan();

  const getPlanIcon = () => {
    switch (plan) {
      case 'enterprise':
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'pro':
        return <Star className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPlanBadgeStyle = () => {
    switch (plan) {
      case 'enterprise':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pro':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Plan Status Card - Jobscan Style */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-900">Current Plan</CardTitle>
          {getPlanIcon()}
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center space-x-3 mb-3">
            <Badge className={`${getPlanBadgeStyle()} border`}>
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </Badge>
            {plan === 'free' && (
              <span className="text-sm text-gray-600">• Upgrade for more features</span>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600">
              <strong>Features:</strong> {stats.features.join(', ')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid - Jobscan Style */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Content</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.contentCount}</div>
            <p className="text-xs text-gray-600 mt-1">
              {plan === 'free' ? 'Limit: 10 pieces' : 'Unlimited'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">AI Score</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.optimizationScore}%</div>
            <p className="text-xs text-gray-600 mt-1">
              Average optimization
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Monthly Views</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.monthlyViews.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Team Members</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.teamMembers}</div>
            <p className="text-xs text-gray-600 mt-1">
              {plan === 'free' ? 'Solo plan' : 'Collaborative team'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
