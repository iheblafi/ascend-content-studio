import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

const AuthCallback = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    // Handle the auth callback
    const handleAuthCallback = async () => {
      try {
        // The auth state change will be handled by the AuthContext
        // Just wait a moment and then redirect
        setTimeout(() => {
          if (user) {
            toast.success('Successfully signed in!')
            navigate('/dashboard')
          } else {
            toast.error('Authentication failed')
            navigate('/')
          }
        }, 1000)
      } catch (error) {
        console.error('Auth callback error:', error)
        toast.error('Authentication failed')
        navigate('/')
      }
    }

    handleAuthCallback()
  }, [user, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  )
}

export default AuthCallback

