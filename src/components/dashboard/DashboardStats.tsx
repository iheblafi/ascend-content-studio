
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, FileText, TrendingUp, Users, Zap, Crown } from 'lucide-react';

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
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'pro':
        return <Zap className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  const getPlanColor = () => {
    switch (plan) {
      case 'enterprise':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'pro':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Plan Status Card */}
      <Card className="relative overflow-hidden">
        <div className={`absolute inset-0 ${getPlanColor()} opacity-5`} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Current Plan</CardTitle>
          {getPlanIcon()}
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant={plan === 'free' ? 'secondary' : 'default'} className={plan !== 'free' ? getPlanColor() + ' text-white' : ''}>
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </Badge>
            {plan === 'free' && (
              <span className="text-sm text-slate-600">• Upgrade for more features</span>
            )}
          </div>
          <div className="mt-2">
            <p className="text-xs text-slate-600">
              Features: {stats.features.join(', ')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contentCount}</div>
            <p className="text-xs text-slate-600">
              {plan === 'free' ? 'Limit: 10 pieces' : 'Unlimited'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.optimizationScore}%</div>
            <p className="text-xs text-slate-600">
              Average optimization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyViews.toLocaleString()}</div>
            <p className="text-xs text-slate-600">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teamMembers}</div>
            <p className="text-xs text-slate-600">
              {plan === 'free' ? 'Solo plan' : 'Collaborative team'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
