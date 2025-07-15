"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FallbackDisplay, { LoadingFallback, ErrorFallback, EmptyStateFallback } from "./fallback-display"
import { useFallback, useDataFetch } from "@/hooks/use-fallback"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { 
  Users, 
  BookOpen, 
  Trophy, 
  Star,
  MessageSquare,
  RefreshCw,
  Wifi,
  WifiOff
} from "lucide-react"

// Example of enhanced dashboard component with fallback responses
export default function EnhancedDashboardExample() {
  // User context for personalized fallbacks
  const userContext = {
    isNewUser: false,
    hasCompletedModules: true,
    streakDays: 7,
    isFromBPO: true
  }

  // Example data fetching with fallbacks
  const mentorsData = useDataFetch(
    async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate different scenarios
      const scenarios = ['success', 'error', 'empty']
      const scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
      
      if (scenario === 'error') {
        throw new Error('Failed to load mentors')
      }
      
      if (scenario === 'empty') {
        return []
      }
      
      return [
        {
          id: '1',
          name: 'Maria Santos',
          title: 'Senior QA Engineer',
          company: 'TechCorp',
          rating: 4.9,
          specializations: ['QA Testing', 'Automation']
        },
        {
          id: '2', 
          name: 'Jose Mendoza',
          title: 'Product Manager',
          company: 'Startup Inc',
          rating: 4.8,
          specializations: ['Product Strategy', 'Leadership']
        }
      ]
    },
    'mentors',
    [],
    { userContext }
  )

  const learningPathsData = useDataFetch(
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate network error occasionally
      if (Math.random() < 0.3) {
        throw new Error('Network error')
      }
      
      return [
        {
          id: '1',
          title: 'QA Testing Fundamentals',
          progress: 75,
          difficulty: 'Beginner'
        },
        {
          id: '2',
          title: 'Test Automation',
          progress: 30,
          difficulty: 'Intermediate'
        }
      ]
    },
    'learningPaths',
    [],
    { userContext }
  )

  const achievementsData = useDataFetch(
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (userContext.isNewUser) {
        return [] // New users have no achievements
      }
      
      return [
        {
          id: '1',
          title: 'First Module Complete',
          icon: '🎯',
          unlockedAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Week Warrior',
          icon: '🔥',
          unlockedAt: '2024-01-22'
        }
      ]
    },
    'achievements',
    [],
    { userContext }
  )

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Enhanced Dashboard with Fallbacks
        </h1>
        <p className="text-gray-600">
          Example showing how fallback responses work across different features
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mentors Section */}
        <Card className="rounded-3xl shadow-lg border border-gray-100">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Find Your Mentor
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mentorsData.isLoading && (
              <LoadingFallback message="Finding amazing mentors for you..." />
            )}
            
            {mentorsData.isError && (
              <FallbackDisplay
                feature="mentors"
                state="error"
                onAction={mentorsData.refetch}
                userContext={userContext}
                showMotivation={true}
              />
            )}
            
            {mentorsData.isEmpty && (
              <FallbackDisplay
                feature="mentors"
                state="empty"
                onAction={() => console.log('Navigate to community')}
                userContext={userContext}
                showMotivation={true}
              />
            )}
            
            {mentorsData.isOffline && (
              <FallbackDisplay
                feature="mentors"
                state="offline"
                onAction={mentorsData.refetch}
                userContext={userContext}
              />
            )}
            
            {mentorsData.isSuccess && mentorsData.data && (
              <div className="space-y-4">
                {mentorsData.data.map((mentor: any) => (
                  <div key={mentor.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.title} at {mentor.company}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Paths Section */}
        <Card className="rounded-3xl shadow-lg border border-gray-100">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Learning Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            {learningPathsData.isLoading && (
              <LoadingFallback message="Loading your personalized learning paths..." />
            )}
            
            {learningPathsData.isError && (
              <ErrorFallback
                message="Learning paths temporarily unavailable. Your progress is safe!"
                onRetry={learningPathsData.refetch}
              />
            )}
            
            {learningPathsData.isEmpty && (
              <EmptyStateFallback
                title="No Learning Paths Yet"
                message="New learning paths are being prepared for you!"
                action="Explore Community"
                onAction={() => console.log('Navigate to community')}
                icon="📚"
              />
            )}
            
            {learningPathsData.isSuccess && learningPathsData.data && (
              <div className="space-y-4">
                {learningPathsData.data.map((path: any) => (
                  <div key={path.id} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{path.title}</h3>
                      <Badge variant="secondary" className="capitalize">
                        {path.difficulty}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{path.progress}% complete</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card className="rounded-3xl shadow-lg border border-gray-100">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {achievementsData.isLoading && (
              <div className="flex items-center justify-center p-6">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            )}
            
            {achievementsData.isError && (
              <FallbackDisplay
                feature="achievements"
                state="error"
                onAction={achievementsData.refetch}
                userContext={userContext}
                compact={true}
              />
            )}
            
            {achievementsData.isEmpty && (
              <FallbackDisplay
                feature="achievements"
                state="empty"
                onAction={() => console.log('Start learning')}
                userContext={userContext}
                showMotivation={true}
              />
            )}
            
            {achievementsData.isSuccess && achievementsData.data && (
              <div className="space-y-3">
                {achievementsData.data.map((achievement: any) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Network Status Indicator */}
        <Card className="rounded-3xl shadow-lg border border-gray-100">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NetworkStatusIndicator />
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => {
            mentorsData.refetch()
            learningPathsData.refetch()
            achievementsData.refetch()
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All Data
        </Button>
        
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="rounded-xl px-6 py-3"
        >
          Reload Page
        </Button>
      </div>
    </div>
  )
}

// Network status component
function NetworkStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [connectionSpeed, setConnectionSpeed] = useState<'fast' | 'slow' | 'offline'>('fast')

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    
    // Simulate connection speed detection
    const detectSpeed = () => {
      if (!navigator.onLine) {
        setConnectionSpeed('offline')
        return
      }
      
      // Simple speed test simulation
      const start = Date.now()
      fetch('/api/ping', { method: 'HEAD' })
        .then(() => {
          const duration = Date.now() - start
          setConnectionSpeed(duration > 1000 ? 'slow' : 'fast')
        })
        .catch(() => setConnectionSpeed('slow'))
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    
    // Check speed every 30 seconds
    const speedInterval = setInterval(detectSpeed, 30000)
    detectSpeed() // Initial check

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      clearInterval(speedInterval)
    }
  }, [])

  const getStatusInfo = () => {
    if (!isOnline) {
      return {
        icon: <WifiOff className="h-5 w-5 text-red-500" />,
        text: "You're offline",
        description: "Some features may not work until you're back online.",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      }
    }
    
    if (connectionSpeed === 'slow') {
      return {
        icon: <Wifi className="h-5 w-5 text-orange-500" />,
        text: "Slow connection",
        description: "Content may take longer to load.",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
      }
    }
    
    return {
      icon: <Wifi className="h-5 w-5 text-green-500" />,
      text: "Connected",
      description: "All systems running smoothly!",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  }

  const status = getStatusInfo()

  return (
    <div className={`p-4 rounded-xl border ${status.bgColor} ${status.borderColor}`}>
      <div className="flex items-center space-x-3">
        {status.icon}
        <div>
          <h3 className="font-semibold text-gray-900">{status.text}</h3>
          <p className="text-sm text-gray-600">{status.description}</p>
        </div>
      </div>
    </div>
  )
}