
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  Bell,
  Search,
  Plus,
  Menu,
  Star
} from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: FileText, label: "Content", count: 12 },
    { icon: Bot, label: "AI Optimizer" },
    { icon: Users, label: "Team", count: 5 },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - Jobscan Style */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              ContentAI Pro
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Content
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Jobscan Style */}
        <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out lg:block z-30 w-64 h-screen bg-white border-r border-gray-200`}>
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start text-left ${
                    item.active 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                  {item.count && (
                    <Badge variant="secondary" className="ml-auto bg-gray-100 text-gray-700">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </nav>
          </div>
          
          {/* Upgrade Card - Jobscan Style */}
          <div className="absolute bottom-6 left-6 right-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-900 flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-blue-700 mb-3">
                  Unlock advanced AI features and unlimited content analysis.
                </p>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
