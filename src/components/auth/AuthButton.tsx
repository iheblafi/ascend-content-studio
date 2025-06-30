import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { AuthDialog } from './AuthDialog'
import { User, Settings, LogOut, CreditCard } from 'lucide-react'
import { toast } from 'sonner'

export function AuthButton() {
  const { user, profile, signOut, loading } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authDialogTab, setAuthDialogTab] = useState<'signin' | 'signup'>('signin')

  const handleSignOut = async () => {
    try {
      const { error } = await signOut()
      if (error) {
        toast.error('Error signing out: ' + error.message)
      } else {
        toast.success('Signed out successfully')
        // Optionally navigate to home page
        window.location.href = '/'
      }
    } catch (error) {
      toast.error('Unexpected error during sign out')
      console.error('Sign out error:', error)
    }
  }

  const openSignIn = () => {
    setAuthDialogTab('signin')
    setAuthDialogOpen(true)
  }

  const openSignUp = () => {
    setAuthDialogTab('signup')
    setAuthDialogOpen(true)
  }

  if (loading) {
    return <Button disabled>Loading...</Button>
  }

  if (!user) {
    return (
      <>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={openSignIn}>
            Login
          </Button>
          <Button onClick={openSignUp}>
            Start Free Trial
          </Button>
        </div>
        <AuthDialog
          open={authDialogOpen}
          onOpenChange={setAuthDialogOpen}
          defaultTab={authDialogTab}
        />
      </>
    )
  }

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.email?.[0]?.toUpperCase() || 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.full_name || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {profile?.subscription_plan === 'pro' ? 'Pro' : 'Free'}
              </span>
              <span className="text-xs text-muted-foreground">
                {profile?.usage_count || 0}/{profile?.usage_limit || 5} used
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

