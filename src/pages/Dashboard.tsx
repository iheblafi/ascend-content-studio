import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import DashboardActionCards from '@/components/dashboard/DashboardActionCards';
import RecentContentCard from '@/components/dashboard/RecentContentCard';
import PlanUsageCard from '@/components/dashboard/PlanUsageCard';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
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

  const plan = profile?.subscription_plan || 'free';
  const userName = profile?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}        
        <WelcomeHeader userName={userName} />

        {/* Stats Overview */}
        <DashboardStats subscription={{ plan: plan }} />

        {/* Main Action Cards */}
        <DashboardActionCards />

        {/* Content Overview & Usage */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentContentCard plan={plan} />
          <PlanUsageCard plan={plan} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
