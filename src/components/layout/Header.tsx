import { Button } from "@/components/ui/button";
import { Bot, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthDialog } from "@/components/auth/AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<'signin' | 'signup'>('signin');
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error('Error signing out: ' + error.message);
      } else {
        toast.success('Signed out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Unexpected error during sign out');
      console.error('Sign out error:', error);
    }
  };

  const openSignIn = () => {
    setAuthDialogTab('signin');
    setIsAuthModalOpen(true);
  };

  const openSignUp = () => {
    setAuthDialogTab('signup');
    setIsAuthModalOpen(true);
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ContentAI Pro
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                About
              </a>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex flex-col space-y-1 p-2">
                        <p className="text-sm font-medium">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={openSignIn}
                  >
                    Login
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={openSignUp}
                  >
                    Start Free Trial
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                  Pricing
                </a>
                <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                  About
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                  {user ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/dashboard')}
                      >
                        Dashboard
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={openSignIn}
                      >
                        Login
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        onClick={openSignUp}
                      >
                        Start Free Trial
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <AuthDialog 
        open={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen}
        defaultTab={authDialogTab}
      />
    </>
  );
};

export default Header;
