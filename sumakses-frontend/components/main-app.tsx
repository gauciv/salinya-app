"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  BookOpen,
  MessageCircle,
  Users,
  User,
  Target,
  Clock,
  Trophy,
  Award,
  Zap,
  CheckCircle,
  Play,
  Plus,
  ArrowLeft,
  Bell,
  Settings,
  Send,
} from "lucide-react"

// Import new components
import SkillsAssessment from "./skills-assessment"
import LearningModule from "./learning-module"
import CommunityHub from "./community-hub"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import MarketplaceTab from "./marketplace-tab"

interface MainAppProps {
  userData?: {
    id: string;
    name: string;
    title: string;
    location: string;
  }
}

interface UserProgress {
  overallProgress: number
  currentPhase: string
  completedModules: number
  totalModules: number
  streakDays: number
  totalStudyTime: number
  achievements: Achievement[]
  nextMilestone: string
  xpPoints: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  category: string
}

interface LearningPath {
  id: string
  title: string
  description: string
  phase: string
  progress: number
  estimatedTime: number
  difficulty: string
  isActive: boolean
  nextSession?: string
}

interface Notification {
  id: string
  type: "achievement" | "reminder" | "community" | "mentor"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

export default function MainApp({ userData }: MainAppProps) {
  const [activeTab, setActiveTab] = useState("home")

  const [userProgress, setUserProgress] = useState<UserProgress>({
    overallProgress: 65,
    currentPhase: "Foundation Phase",
    completedModules: 8,
    totalModules: 12,
    streakDays: 7,
    totalStudyTime: 24, // hours
    achievements: [
      {
        id: "1",
        title: "First Steps",
        description: "Completed your first module",
        icon: "🎯",
        unlockedAt: "2024-01-15",
        category: "learning"
      },
      {
        id: "2",
        title: "Week Warrior",
        description: "7-day learning streak",
        icon: "🔥",
        unlockedAt: "2024-01-20",
        category: "consistency"
      },
      {
        id: "3",
        title: "Community Helper",
        description: "Helped 5 other learners",
        icon: "🤝",
        unlockedAt: "2024-01-18",
        category: "community"
      }
    ],
    nextMilestone: "Complete Foundation Phase",
    xpPoints: 1250,
  })

  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: "1",
      title: "Software Testing Fundamentals",
      description: "Learn the basics of QA testing",
      phase: "Foundation",
      progress: 75,
      estimatedTime: 120,
      difficulty: "Beginner",
      isActive: true,
      nextSession: "Today 7PM"
    },
    {
      id: "2",
      title: "Test Automation Basics",
      description: "Introduction to automated testing",
      phase: "Skill Building",
      progress: 0,
      estimatedTime: 180,
      difficulty: "Intermediate",
      isActive: false
    },
    {
      id: "3",
      title: "Advanced QA Practices",
      description: "Master advanced testing techniques",
      phase: "Specialization",
      progress: 0,
      estimatedTime: 240,
      difficulty: "Advanced",
      isActive: false
    }
  ])

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "New Achievement Unlocked!",
      message: "You've earned the 'Week Warrior' badge for your 7-day streak!",
      timestamp: "2 hours ago",
      isRead: false,
      actionUrl: "/achievements"
    },
    {
      id: "2",
      type: "reminder",
      title: "Learning Session Reminder",
      message: "Your next session 'Software Testing Fundamentals' starts in 30 minutes",
      timestamp: "1 hour ago",
      isRead: false,
      actionUrl: "/learning"
    },
    {
      id: "3",
      type: "community",
      title: "New Mentor Available",
      message: "Maria Santos is now available for mentorship sessions",
      timestamp: "3 hours ago",
      isRead: true,
      actionUrl: "/community/mentors"
    }
  ])

  const [showAssessment, setShowAssessment] = useState(false)
  const [showLearningModule, setShowLearningModule] = useState(false)
  const [currentModuleId, setCurrentModuleId] = useState("")
  const [showChatModal, setShowChatModal] = useState(false);

  // Handle component navigation
  const handleAssessmentComplete = (assessmentData: any) => {
    setShowAssessment(false)
    // Update user progress based on assessment
    setUserProgress(prev => ({
      ...prev,
      overallProgress: Math.min(prev.overallProgress + 10, 100)
    }))
  }

  const handleModuleComplete = (moduleData: any) => {
    setShowLearningModule(false)
    // Update learning paths progress
    setLearningPaths(prev => prev.map(path => 
      path.id === moduleData.moduleId 
        ? { ...path, progress: 100, isActive: false }
        : path
    ))
    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      completedModules: prev.completedModules + 1,
      overallProgress: Math.min(prev.overallProgress + 8, 100)
    }))
  }

  const handleModuleProgress = (progress: number) => {
    // Update current module progress
    setLearningPaths(prev => prev.map(path => 
      path.isActive ? { ...path, progress } : path
    ))
  }

  // Render different views based on currentView state
  if (showAssessment) {
  return (
      <div className="min-h-screen bg-background-app p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setShowAssessment(false)}
              className="text-text-secondary hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <SkillsAssessment
            onComplete={handleAssessmentComplete}
            type="resume_upload"
          />
        </div>
      </div>
    )
  }

  if (showLearningModule) {
    return (
      <div className="min-h-screen bg-background-app p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setShowLearningModule(false)}
              className="text-text-secondary hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <LearningModule
            moduleId={currentModuleId}
            onComplete={handleModuleComplete}
            onProgress={handleModuleProgress}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-app">
      {/* Header */}
      <header className="bg-background-surface border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Search Bar */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search modules, mentors, or topics..."
                className="rounded-xl border-border-default focus:border-border-focus text-sm px-3 py-2 w-full"
                aria-label="Search"
              />
            </div>
            {/* Notification and Profile */}
            <div className="flex items-center space-x-2 ml-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-states-error text-text-onPrimary text-xs">
                    {notifications.filter(n => !n.isRead).length}
                  </Badge>
                )}
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="text-sm font-semibold text-text-onPrimary">
                  {userData?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-between bg-background-surface rounded-2xl shadow-sm mb-6">
            <TabsTrigger value="home" className="flex-1 rounded-xl data-[state=active]:bg-brand-primary data-[state=active]:text-text-onPrimary">
              <Home className="h-4 w-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex-1 rounded-xl data-[state=active]:bg-brand-primary data-[state=active]:text-text-onPrimary">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="community" className="flex-1 rounded-xl data-[state=active]:bg-brand-primary data-[state=active]:text-text-onPrimary">
              <Users className="h-4 w-4 mr-2" />
              Network
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex-1 rounded-xl data-[state=active]:bg-brand-primary data-[state=active]:text-text-onPrimary">
              <Trophy className="h-4 w-4 mr-2" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex-1 rounded-xl data-[state=active]:bg-brand-primary data-[state=active]:text-text-onPrimary flex items-center justify-center gap-2 relative">
              {/* User Avatar */}
              <span className="relative flex items-center">
                <Avatar className="h-6 w-6 border-2 border-white shadow-sm">
                  <AvatarImage src="/placeholder-user.jpg" alt={userData?.name || "User"} />
                  <AvatarFallback className="text-xs font-semibold bg-blue-600 text-white">
                    {userData?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                {/* SAKSES Points Badge */}
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full px-2 py-0.5 shadow border border-white">
                  {userProgress?.xpPoints || 0}
                </span>
              </span>
              {/* Greeting or Name (only when active) */}
              <span className="hidden sm:inline font-medium">
                {activeTab === "profile" ? `Hi, ${userData?.name?.split(' ')[0] || 'User'}!` : 'Profile'}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            <HomeTab
              userProgress={userProgress}
              learningPaths={learningPaths}
              notifications={notifications}
              userData={userData}
              onStartAssessment={() => setShowAssessment(true)}
              onStartModule={(moduleId) => {
                setCurrentModuleId(moduleId)
                setShowLearningModule(true)
              }}
              onShowChatModal={() => setShowChatModal(true)}
              onNavigateCommunity={() => setActiveTab('community')}
            />
          </TabsContent>

          {/* Learn Tab */}
          <TabsContent value="learn" className="space-y-6">
            <LearnTab
              learningPaths={learningPaths}
              onStartModule={(moduleId) => {
                setCurrentModuleId(moduleId)
                setShowLearningModule(true)
              }}
            />
          </TabsContent>

          {/* Network Tab */}
          <TabsContent value="community" className="space-y-6">
            <CommunityTab />
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <MarketplaceTab userProgress={userProgress} />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <ProfileTab userData={userData} userProgress={userProgress} />
          </TabsContent>
        </Tabs>
      </main>
      {showChatModal && (
        <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
          <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 sm:w-[95vw] sm:h-[90vh] sm:max-w-4xl sm:m-4 sm:rounded-lg">
            <AITutorTab onClose={() => setShowChatModal(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Home Tab Component
function HomeTab({ 
  userProgress, 
  learningPaths, 
  notifications, 
  userData,
  onStartAssessment, 
  onStartModule,
  onShowChatModal,
  onNavigateCommunity
}: {
  userProgress: UserProgress
  learningPaths: LearningPath[]
  notifications: Notification[]
  userData?: {
    id: string;
    name: string;
    title: string;
    location: string;
  }
  onStartAssessment: () => void
  onStartModule: (moduleId: string) => void
  onShowChatModal: () => void
  onNavigateCommunity: () => void
}) {
  const activePath = learningPaths.find(path => path.isActive)

  // Enhanced career match data
  const topCareerMatch = {
    title: "Quality Assurance Tester",
    compatibility: 87,
    salaryRange: "₱35,000 - ₱60,000/mo",
    description: "Perfect for BPO pros with strong problem-solving and documentation skills.",
    icon: "🧪",
    nextSteps: ["Complete QA Fundamentals", "Practice Manual Testing", "Build Portfolio"]
  }

  // Enhanced roadmap phases with better context
  const roadmapPhases = [
    { 
      name: "Foundation", 
      duration: "3 months", 
      status: "completed",
      description: "Basic tech concepts & transferable skills",
      progress: 100,
      modules: ["Customer Success Fundamentals", "Communication Skills", "Problem Solving"]
    },
    { 
      name: "Skill Building", 
      duration: "6 months", 
      status: "active",
      description: "Technical skills & industry knowledge",
      progress: 65,
      modules: ["Software Testing", "Test Automation", "Quality Assurance"]
    },
    { 
      name: "Job Prep", 
      duration: "9 months", 
      status: "upcoming",
      description: "Portfolio building & job applications",
      progress: 0,
      modules: ["Resume Building", "Interview Prep", "Networking"]
    }
  ]

  // Enhanced stats for better engagement
  const userStats = {
    daysStreak: userProgress.streakDays,
    totalStudyTime: userProgress.totalStudyTime,
    modulesCompleted: userProgress.completedModules,
    achievementsUnlocked: userProgress.achievements.length,
    nextMilestone: "Complete 5 modules this week",
    xpToNextLevel: 150
  }

  return (
    <div className="space-y-6">
      {/* Hero Section - Clear Next Steps */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Kumusta, {userData?.name || "Learner"}! 🇵🇭
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to continue your tech journey?
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userProgress.xpPoints}</div>
              <div className="text-blue-100 text-sm">SAKSES Points</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={() => onStartModule(activePath?.id || "1")}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left hover:bg-white/30 transition-all"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold">Continue Learning</div>
              <div className="text-blue-100 text-sm">Pick up where you left off</div>
            </button>
            
            <button
              onClick={onShowChatModal}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left hover:bg-white/30 transition-all"
            >
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-semibold">Ask AI Tutor</div>
              <div className="text-blue-100 text-sm">Get help anytime</div>
            </button>
          </div>
        </div>
      </div>

      {/* Career Match Card - More Prominent */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your Perfect Tech Career</h2>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{topCareerMatch.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{topCareerMatch.title}</h3>
                <p className="text-green-600 font-semibold">{topCareerMatch.salaryRange}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{topCareerMatch.compatibility}%</div>
            <div className="text-sm text-gray-600">Match</div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{topCareerMatch.description}</p>
        
        <div className="bg-blue-50 rounded-2xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Next Steps:</h4>
          <div className="space-y-2">
            {topCareerMatch.nextSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Overview - More Visual */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Journey Progress</h2>
        
        {/* Roadmap Visualization */}
        <div className="space-y-4 mb-6">
          {roadmapPhases.map((phase, index) => (
            <div key={index} className="relative">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold ${
                  phase.status === 'completed' ? 'bg-green-500' :
                  phase.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  {phase.status === 'completed' ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{phase.name}</h3>
                    <span className="text-sm text-gray-600">{phase.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Active phase indicator */}
              {phase.status === 'active' && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{userStats.daysStreak}</div>
            <div className="text-sm text-green-700">Day Streak 🔥</div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{userStats.modulesCompleted}</div>
            <div className="text-sm text-blue-700">Modules Done ✅</div>
          </div>
        </div>
      </div>

      {/* Action Cards - Clear Next Steps */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">What would you like to do next?</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Continue Current Module */}
          {activePath && (
            <button
              onClick={() => onStartModule(activePath.id)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 text-left hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="text-lg font-semibold mb-1">Continue Current Module</h3>
                  <p className="text-blue-100 text-sm mb-2">{activePath.title}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-20 bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full" 
                        style={{ width: `${activePath.progress}%` }}
                      ></div>
                    </div>
                    <span>{activePath.progress}% complete</span>
                  </div>
                </div>
                <div className="text-3xl">→</div>
              </div>
            </button>
          )}

          {/* Take Assessment */}
          <button
            onClick={onStartAssessment}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 text-left hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl mb-2">📊</div>
                <h3 className="text-lg font-semibold mb-1">Take Skills Assessment</h3>
                <p className="text-green-100 text-sm">Discover your tech career potential</p>
              </div>
              <div className="text-3xl">→</div>
            </div>
          </button>

          {/* Join Community */}
          <button
            onClick={onNavigateCommunity}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 text-left hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl mb-2">👥</div>
                <h3 className="text-lg font-semibold mb-1">Connect with Community</h3>
                <p className="text-orange-100 text-sm">Learn from fellow BPO professionals</p>
              </div>
              <div className="text-3xl">→</div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Achievements */}
      {userProgress.achievements.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
          <div className="space-y-3">
            {userProgress.achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-2xl">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivation Card */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl p-6">
        <div className="text-center">
          <div className="text-3xl mb-3">💪</div>
          <h3 className="text-lg font-semibold mb-2">You're doing great!</h3>
          <p className="text-purple-100 mb-4">
            Every step you take brings you closer to your tech career. Keep pushing forward!
          </p>
          <div className="text-sm text-purple-200">
            Next milestone: {userStats.nextMilestone}
          </div>
        </div>
      </div>
    </div>
  )
}

// Learn Tab Component
function LearnTab({ 
  learningPaths, 
  onStartModule 
}: {
  learningPaths: LearningPath[]
  onStartModule: (moduleId: string) => void
}) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Learning Journey</h2>
            <p className="text-gray-600">Master the skills that will transform your career from BPO to tech</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-6 py-3 shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Start New Path
          </Button>
        </div>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {learningPaths.map((path) => (
          <div 
            key={path.id} 
            className={`relative group rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              path.isActive 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                : 'bg-white border border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Background Pattern for Active Path */}
            {path.isActive && (
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full"></div>
              </div>
            )}

            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className={`text-xl font-bold ${path.isActive ? 'text-white' : 'text-gray-900'}`}>
                      {path.title}
                    </h3>
                    {path.isActive && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Active</span>
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-4 ${path.isActive ? 'text-blue-100' : 'text-gray-600'}`}>
                    {path.description}
                  </p>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${path.isActive ? 'text-blue-100' : 'text-gray-700'}`}>
                      Progress
                    </span>
                    <span className={`text-sm font-bold ${path.isActive ? 'text-white' : 'text-blue-600'}`}>
                      {path.progress}%
                    </span>
                  </div>
                  <div className={`w-full h-3 rounded-full overflow-hidden ${
                    path.isActive ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        path.isActive 
                          ? 'bg-white' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className={`text-center p-3 rounded-2xl ${
                    path.isActive ? 'bg-white/10' : 'bg-gray-50'
                  }`}>
                    <div className={`text-lg font-bold mb-1 ${
                      path.isActive ? 'text-white' : 'text-gray-900'
                    }`}>
                      {path.phase}
                    </div>
                    <div className={`text-xs ${
                      path.isActive ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      Phase
                    </div>
                  </div>
                  
                  <div className={`text-center p-3 rounded-2xl ${
                    path.isActive ? 'bg-white/10' : 'bg-gray-50'
                  }`}>
                    <div className={`text-lg font-bold mb-1 ${
                      path.isActive ? 'text-white' : 'text-gray-900'
                    }`}>
                      {path.estimatedTime}
                    </div>
                    <div className={`text-xs ${
                      path.isActive ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      Minutes
                    </div>
                  </div>
                  
                  <div className={`text-center p-3 rounded-2xl ${
                    path.isActive ? 'bg-white/10' : 'bg-gray-50'
                  }`}>
                    <div className={`text-lg font-bold mb-1 ${
                      path.isActive ? 'text-white' : 'text-gray-900'
                    }`}>
                      {path.difficulty}
                    </div>
                    <div className={`text-xs ${
                      path.isActive ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      Level
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {path.isActive ? (
                    <button
                      onClick={() => onStartModule(path.id)}
                      className="w-full bg-white text-blue-600 hover:bg-gray-50 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-center justify-center">
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => onStartModule(path.id)}
                      className={`w-full font-semibold py-3 px-6 rounded-2xl transition-all duration-200 ${
                        path.isActive 
                          ? 'bg-white text-blue-600 hover:bg-gray-50' 
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      } shadow-lg hover:shadow-xl`}
                    >
                      <div className="flex items-center justify-center">
                        <Play className="h-4 w-4 mr-2" />
                        Start Learning
                      </div>
                    </button>
                  )}
                </div>

                {/* Next Session Info for Active Path */}
                {path.isActive && path.nextSession && (
                  <div className="mt-4 p-3 bg-white/10 rounded-2xl">
                    <div className="flex items-center justify-center text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Next session: {path.nextSession}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Corner */}
            <div className={`absolute top-0 right-0 w-20 h-20 ${
              path.isActive ? 'bg-white/10' : 'bg-blue-50'
            } rounded-bl-full`}></div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 text-left">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-semibold text-gray-900 mb-1">Browse Courses</h4>
            <p className="text-sm text-gray-600">Explore new learning paths</p>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 text-left">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold text-gray-900 mb-1">Set Goals</h4>
            <p className="text-sm text-gray-600">Define your learning targets</p>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-left">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold text-gray-900 mb-1">View Analytics</h4>
            <p className="text-sm text-gray-600">Track your progress</p>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl hover:from-orange-100 hover:to-red-100 transition-all duration-200 text-left">
            <div className="text-2xl mb-2">🏆</div>
            <h4 className="font-semibold text-gray-900 mb-1">Achievements</h4>
            <p className="text-sm text-gray-600">See your milestones</p>
          </button>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-6">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Learning Tip</h3>
            <p className="text-gray-700 mb-3">
              Consistency is key! Try to study for at least 30 minutes every day. 
              Your BPO experience gives you a strong foundation - you're not starting from zero!
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              Recommended: 30 minutes daily
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// AI Tutor Tab Component
function AITutorTab({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "ai",
      content: "Kumusta! I'm your personal AI career coach. I'm here to help you transition from BPO to tech. How can I assist you today? 🇵🇭",
      timestamp: new Date().toISOString(),
      avatar: "🤖",
      name: "SUMAKSES AI"
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Enhanced preset prompts with categories
  const quickActionCategories = [
    {
      title: "Career Transition",
      prompts: [
        "How do my BPO skills translate to tech?",
        "What tech roles match my experience?",
        "How long does career transition take?"
      ]
    },
    {
      title: "Learning & Skills",
      prompts: [
        "Create a study schedule for night shift workers",
        "What programming language should I learn first?",
        "How to build a tech portfolio?"
      ]
    },
    {
      title: "Job Search",
      prompts: [
        "Salary expectations for Filipino tech pros",
        "How to write a tech resume?",
        "Interview tips for career changers"
      ]
    },
    {
      title: "Motivation & Support",
      prompts: [
        "I'm feeling overwhelmed, any advice?",
        "How to stay motivated during transition?",
        "Success stories from BPO to tech?"
      ]
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      avatar: "👤",
      name: "You"
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage("")
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage }),
      })

      const data = await response.json()
      
      if (response.ok) {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          type: "ai" as const,
          content: data.response,
          timestamp: new Date().toISOString(),
          avatar: "🤖",
          name: "SUMAKSES AI"
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai" as const,
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toISOString(),
        avatar: "🤖",
        name: "SUMAKSES AI"
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (prompt: string) => {
    setInputMessage(prompt)
  }

  const generateContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("salary") || lowerMessage.includes("pay")) {
      return `Based on your BPO experience, here's what you can expect in tech roles in the Philippines:

💰 **Salary Ranges (Monthly):**
• QA Tester: ₱35,000 - ₱60,000
• Customer Success: ₱40,000 - ₱70,000  
• Product Support: ₱45,000 - ₱75,000
• Technical Writer: ₱30,000 - ₱55,000

💡 **Tips for negotiation:**
• Highlight your problem-solving skills from BPO
• Emphasize your customer service experience
• Research local tech company salaries
• Don't undervalue your transferable skills

Remember: Your BPO experience is valuable! Many companies appreciate the work ethic and communication skills of Filipino professionals. 🇵🇭`
    }
    
    if (lowerMessage.includes("schedule") || lowerMessage.includes("time") || lowerMessage.includes("study")) {
      return `Perfect! Here's a study schedule designed for BPO professionals:

📅 **Night Shift Worker Schedule:**
• **6:00 AM - 8:00 AM**: Study session (after shift)
• **2:00 PM - 4:00 PM**: Practice exercises
• **Weekends**: 2-3 hour focused sessions

📚 **Recommended Learning Path:**
1. **Week 1-2**: Basic tech concepts (2 hours/day)
2. **Week 3-4**: Hands-on practice (3 hours/day)
3. **Week 5-6**: Project building (4 hours/day)

💡 **Pro Tips:**
• Use your rest days effectively
• Join study groups with similar schedules
• Take advantage of mobile learning apps
• Don't forget to rest - quality over quantity!

Would you like me to create a personalized schedule based on your specific shift?`
    }
    
    if (lowerMessage.includes("interview") || lowerMessage.includes("prepare")) {
      return `Great question! Here's how to prepare for tech interviews as a BPO professional:

🎯 **Interview Preparation Checklist:**

**Before the Interview:**
• Research the company and role thoroughly
• Practice common behavioral questions
• Prepare examples from your BPO experience
• Review basic tech concepts

**During the Interview:**
• Emphasize transferable skills (problem-solving, communication)
• Share specific BPO scenarios that demonstrate tech-relevant skills
• Show enthusiasm for learning new technologies
• Ask thoughtful questions about the role

**Common Questions to Prepare:**
• "How did you handle difficult customers?" → Problem-solving skills
• "Describe a process you improved" → Process optimization
• "How do you work under pressure?" → Stress management

💪 **Remember**: Your BPO experience is your strength, not a weakness! Many tech companies value customer service experience.`
    }
    
    if (lowerMessage.includes("motivation") || lowerMessage.includes("overwhelmed")) {
      return `I understand how you feel! Many BPO professionals go through this. Here's some encouragement:

🌟 **You're Not Alone:**
• Thousands of Filipinos have made this transition
• Your BPO skills are highly valuable in tech
• The learning curve is normal and temporary

💪 **Stay Motivated:**
• Focus on small wins and daily progress
• Connect with others on the same journey
• Remember your "why" - better opportunities for your family
• Celebrate every milestone, no matter how small

🎯 **Practical Tips:**
• Set realistic daily goals (30 minutes is better than nothing)
• Join SUMAKSES community for support
• Track your progress to see how far you've come
• Take breaks when needed - this is a marathon, not a sprint

Remember: Every expert was once a beginner. Your determination to improve your life is already a huge step forward! 🇵🇭`
    }
    
    // Default response
    return `Thank you for your question! As your AI career coach, I'm here to help you transition from BPO to tech.

Here are some areas I can help with:
• Career guidance and skill translation
• Learning strategies and study schedules
• Job search and interview preparation
• Motivation and community support

What specific aspect of your tech journey would you like to explore? I'm here to support you every step of the way! 💪🇵🇭`
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Enhanced Chat Header - Mobile Responsive */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl sm:text-2xl">🤖</span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold truncate">SUMAKSES AI Coach</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm text-blue-100 truncate">Online • Filipino & English</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="bg-white/20 hover:bg-white/30 rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-all hidden sm:block"
            >
              {showQuickActions ? 'Hide' : 'Show'} Quick Actions
            </button>
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all sm:hidden"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Mobile Responsive */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Quick Actions Sidebar - Mobile: Overlay, Desktop: Sidebar */}
        {showQuickActions && (
          <>
            {/* Mobile Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 z-10 sm:hidden" 
              onClick={() => setShowQuickActions(false)}
            />
            
            {/* Sidebar */}
            <div className={`
              ${showQuickActions ? 'translate-x-0' : '-translate-x-full'}
              fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-20 transition-transform duration-300 ease-in-out
              sm:relative sm:translate-x-0 sm:w-80 sm:max-w-none sm:z-auto
              border-r border-gray-200 overflow-y-auto
            `}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4 sm:block">
                  <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                  <button
                    onClick={() => setShowQuickActions(false)}
                    className="sm:hidden p-1 hover:bg-gray-100 rounded"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  {quickActionCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-1">
                        {category.title}
                      </h4>
                      <div className="space-y-1">
                        {category.prompts.map((prompt, promptIndex) => (
                          <button
                            key={promptIndex}
                            onClick={() => {
                              handleQuickAction(prompt)
                              setShowQuickActions(false)
                            }}
                            className="w-full text-left text-sm bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg px-3 py-2 text-gray-700 hover:text-blue-700 transition-all"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Chat Area - Mobile Responsive */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-white">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] sm:max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div className={`p-3 sm:p-4 rounded-2xl shadow-sm ${
                    message.type === "user" 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" 
                      : "bg-gray-50 border border-gray-200"
                  }`}>
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <span className="text-lg sm:text-xl flex-shrink-0">{message.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-medium mb-1 sm:mb-2 ${
                          message.type === "user" ? "text-blue-100" : "text-gray-600"
                        }`}>
                          {message.name}
                        </div>
                        <p className="text-sm whitespace-pre-wrap leading-relaxed break-words">{message.content}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 sm:mt-2 ${message.type === "user" ? "text-right" : "text-left"}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-lg sm:text-xl">🤖</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed at bottom - Mobile Responsive */}
          <div className="border-t bg-white p-3 sm:p-4">
            <div className="flex items-end space-x-2 sm:space-x-3">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Type your message in English or Filipino..."
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  rows={window.innerWidth < 640 ? 1 : 2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 sm:p-3 rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex-shrink-0"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2 sm:mt-3">
              <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
              <span className="sm:hidden">Tap to send</span>
              <div className="flex items-center space-x-1">
                <span className="hidden sm:inline">Powered by</span>
                <span className="font-semibold text-blue-600">Amazon Bedrock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Profile Tab Component
function ProfileTab({ userData, userProgress }: { userData: any; userProgress: UserProgress }) {
  // Helper for progress ring
  function ProgressRing({ percent }: { percent: number }) {
    const radius = 40
    const stroke = 6
    const normalizedRadius = radius - stroke / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (percent / 100) * circumference
    return (
      <svg height={radius * 2} width={radius * 2} className="block mx-auto">
        <circle
          stroke="#E2E8F0"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#profile-progress-gradient)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <defs>
          <linearGradient id="profile-progress-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#A21CAF" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  // Timeline milestones (hardcoded for demo)
  const timeline = [
    { label: "Joined", date: "2024-01-10", icon: "🎉" },
    { label: "First Module", date: "2024-01-15", icon: "📚" },
    { label: "First Achievement", date: "2024-01-20", icon: "🏅" },
    { label: "7-Day Streak", date: "2024-01-22", icon: "🔥" },
    { label: "Community Helper", date: "2024-01-25", icon: "🤝" },
  ]

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 rounded-3xl shadow-xl px-6 py-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-10 mb-8">
        {/* Progress Ring + Avatar */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <ProgressRing percent={userProgress.overallProgress} />
          </div>
          <div className="relative z-10 w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
            <img
              src="/placeholder-user.jpg"
              alt={userData?.name || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Level badge */}
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-3 py-1 shadow text-xs font-bold text-blue-700 border border-blue-200">
            Lv. {Math.floor(userProgress.xpPoints / 100) + 1}
          </div>
        </div>
        {/* Info & Stats */}
        <div className="flex-1 w-full text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow mb-1 flex items-center justify-center sm:justify-start gap-2">
                {userData?.name || "Learner"}
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90 text-sm font-medium">
                <svg className="h-4 w-4 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                {userData?.title || "Tech Professional"}
                <span className="mx-2">•</span>
                <svg className="h-4 w-4 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                {userData?.location || "Philippines"}
              </div>
            </div>
            <button className="mt-2 sm:mt-0 bg-white/90 hover:bg-white text-blue-700 font-semibold px-4 py-2 rounded-xl shadow transition-all border border-blue-200 text-sm">
              Edit Profile
            </button>
          </div>
          {/* SAKSES Points & Progress */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
            <div className="flex items-center justify-center sm:justify-start gap-2 bg-white/20 rounded-xl px-4 py-2 text-white font-semibold text-lg shadow">
              <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" /></svg>
              {userProgress.xpPoints} SAKSES Points
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 bg-white/20 rounded-xl px-4 py-2 text-white font-semibold text-lg shadow">
              <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13h-2v6h6v-2h-4V5z" /></svg>
              {userProgress.overallProgress}% Progress
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 flex flex-col items-center shadow border border-gray-100">
          <Trophy className="h-7 w-7 text-yellow-500 mb-2" />
          <div className="text-xl font-bold text-gray-900">{userProgress.overallProgress}%</div>
          <div className="text-xs text-gray-500">Overall Progress</div>
        </div>
        <div className="bg-white rounded-2xl p-5 flex flex-col items-center shadow border border-gray-100">
          <Zap className="h-7 w-7 text-green-500 mb-2" />
          <div className="text-xl font-bold text-gray-900">{userProgress.streakDays}</div>
          <div className="text-xs text-gray-500">Day Streak</div>
        </div>
        <div className="bg-white rounded-2xl p-5 flex flex-col items-center shadow border border-gray-100">
          <BookOpen className="h-7 w-7 text-blue-600 mb-2" />
          <div className="text-xl font-bold text-gray-900">{userProgress.completedModules}</div>
          <div className="text-xs text-gray-500">Modules Done</div>
        </div>
        <div className="bg-white rounded-2xl p-5 flex flex-col items-center shadow border border-gray-100">
          <Award className="h-7 w-7 text-purple-600 mb-2" />
          <div className="text-xl font-bold text-gray-900">{userProgress.achievements.length}</div>
          <div className="text-xs text-gray-500">Achievements</div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Journey Timeline</h3>
        <div className="relative pl-6">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex items-center mb-6 last:mb-0">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-100 rounded-full" style={{ height: idx === timeline.length - 1 ? 16 : 56, top: 0 }}></div>
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold mr-4 z-10">
                {item.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Gallery */}
      <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userProgress.achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 shadow hover:shadow-lg transition-all">
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{achievement.title}</div>
                <div className="text-xs text-gray-600 mb-1">{achievement.description}</div>
                <div className="text-xs text-gray-500">Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</div>
              </div>
              <Badge variant="secondary" className="text-xs capitalize">{achievement.category}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Community Tab Component
function CommunityTab() {
  const [activeTab, setActiveTab] = useState("mentors")

  // Enhanced community data
  const mentors = [
    {
      id: "1",
      name: "Maria Santos",
      avatar: "/placeholder-user.jpg",
      title: "Senior QA Engineer",
      company: "Accenture",
      location: "Manila",
      experience: "5 years",
      specializations: ["Manual Testing", "Automation", "Agile"],
      rating: 4.9,
      reviews: 127,
      hourlyRate: "₱800",
      availability: ["Mon", "Wed", "Fri"],
      languages: ["English", "Tagalog"],
      bio: "Former BPO agent who transitioned to QA. Passionate about helping others make the same journey.",
      successStories: 23,
      menteesCount: 45,
      responseTime: "< 2 hours",
      verified: true,
      featured: true
    },
    {
      id: "2",
      name: "Jose Mendoza",
      avatar: "/placeholder-user.jpg",
      title: "Product Manager",
      company: "Globe Telecom",
      location: "Cebu",
      experience: "8 years",
      specializations: ["Product Strategy", "User Research", "Leadership"],
      rating: 4.8,
      reviews: 89,
      hourlyRate: "₱1,200",
      availability: ["Tue", "Thu", "Sat"],
      languages: ["English", "Bisaya"],
      bio: "Ex-BPO supervisor who climbed the tech ladder. Now leading product teams.",
      successStories: 18,
      menteesCount: 32,
      responseTime: "< 4 hours",
      verified: true,
      featured: false
    }
  ]

  const learningCircles = [
    {
      id: "1",
      name: "QA Testing Squad",
      description: "Group focused on software testing fundamentals and automation",
      members: 8,
      maxMembers: 10,
      phase: "Foundation",
      meetingSchedule: "Every Tuesday 7PM",
      nextMeeting: "Tomorrow 7PM",
      topics: ["Manual Testing", "Test Cases", "Bug Reporting"],
      progress: 75,
      isMember: true,
      isLeader: false,
      avatar: "🧪"
    },
    {
      id: "2",
      name: "Tech Career Changers",
      description: "Support group for BPO professionals transitioning to tech",
      members: 12,
      maxMembers: 15,
      phase: "Skill Building",
      meetingSchedule: "Every Saturday 2PM",
      nextMeeting: "This Saturday 2PM",
      topics: ["Career Planning", "Interview Prep", "Portfolio Building"],
      progress: 60,
      isMember: false,
      isLeader: false,
      avatar: "🚀"
    }
  ]

  const forumPosts = [
    {
      id: "1",
      title: "How to prepare for QA interview?",
      content: "I have my first QA interview next week. Any tips from those who've been through it?",
      author: {
        name: "Ana Reyes",
        avatar: "/placeholder-user.jpg",
        title: "BPO Agent",
        verified: true
      },
      category: "Career Advice",
      tags: ["interview", "qa", "first-time"],
      likes: 24,
      replies: 8,
      views: 156,
      createdAt: "2 hours ago",
      isLiked: false,
      isBookmarked: false,
      isAnswered: true
    },
    {
      id: "2",
      title: "Best resources for learning automation?",
      content: "Looking for recommendations on courses and tools for test automation.",
      author: {
        name: "Roberto Cruz",
        avatar: "/placeholder-user.jpg",
        title: "Customer Service Rep",
        verified: false
      },
      category: "Learning Resources",
      tags: ["automation", "selenium", "courses"],
      likes: 18,
      replies: 12,
      views: 203,
      createdAt: "1 day ago",
      isLiked: true,
      isBookmarked: true,
      isAnswered: false
    }
  ]

  const successStories = [
    {
      id: "1",
      title: "From Call Center to Senior QA Engineer",
      author: {
        name: "Maria Santos",
        avatar: "/placeholder-user.jpg",
        location: "Manila",
        previousRole: "Customer Service Rep",
        currentRole: "Senior QA Engineer",
        company: "Accenture"
      },
      content: "After 3 years in BPO, I decided to transition to tech. SUMAKSES helped me understand how my customer service skills translate to QA testing. Now I'm leading a team of 5 testers!",
      videoUrl: "https://example.com/video1",
      imageUrl: "/placeholder.jpg",
      salaryIncrease: "150%",
      timeframe: "18 months",
      skills: ["Manual Testing", "Automation", "Leadership"],
      likes: 89,
      shares: 23,
      comments: 15,
      isLiked: true,
      isBookmarked: false,
      featured: true
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Hub</h2>
            <p className="text-gray-600">Connect, learn, and grow with fellow BPO professionals on their tech journey</p>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl px-6 py-3 shadow-lg">
            <Users className="h-4 w-4 mr-2" />
            Join Community
          </Button>
        </div>
      </div>

      {/* Community Navigation Tabs */}
      <div className="bg-white rounded-3xl p-2 shadow-lg border border-gray-100">
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: "mentors", label: "Mentors", icon: "👥", count: mentors.length },
            { id: "circles", label: "Circles", icon: "🔗", count: learningCircles.length },
            { id: "forum", label: "Forum", icon: "💬", count: forumPosts.length },
            { id: "stories", label: "Stories", icon: "🌟", count: successStories.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl transition-all duration-200 text-center ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="text-2xl mb-2">{tab.icon}</div>
              <div className="font-semibold text-sm mb-1">{tab.label}</div>
              <div className={`text-xs ${activeTab === tab.id ? 'text-green-100' : 'text-gray-500'}`}>
                {tab.count} available
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      {activeTab === "mentors" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Find Your Mentor</h3>
            <Button variant="outline" className="rounded-2xl">
              <Settings className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mentor.avatar} alt={mentor.name} />
                      <AvatarFallback className="text-lg font-semibold">
                        {mentor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {mentor.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900">{mentor.name}</h4>
                      {mentor.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{mentor.title} at {mentor.company}</p>
                    <p className="text-gray-500 text-sm mb-2">{mentor.location} • {mentor.experience} experience</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 font-semibold">{mentor.rating}</span>
                        <span className="text-gray-500 ml-1">({mentor.reviews})</span>
                      </div>
                      <div className="text-green-600 font-semibold">{mentor.hourlyRate}/hr</div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{mentor.bio}</p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {mentor.specializations.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Success Stories:</span>
                      <span className="font-semibold ml-1">{mentor.successStories}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Response Time:</span>
                      <span className="font-semibold ml-1">{mentor.responseTime}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl">
                    Request Mentorship
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "circles" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Learning Circles</h3>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl">
              <Plus className="h-4 w-4 mr-2" />
              Create Circle
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningCircles.map((circle) => (
              <div key={circle.id} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-4xl">{circle.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900">{circle.name}</h4>
                      {circle.isMember && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Member</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{circle.description}</p>
                    <p className="text-gray-500 text-sm">{circle.phase} Phase</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Members</span>
                    <span className="font-semibold">{circle.members}/{circle.maxMembers}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${circle.progress}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Next Meeting:</span>
                      <p className="font-semibold">{circle.nextMeeting}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Progress:</span>
                      <p className="font-semibold">{circle.progress}%</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {circle.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className={`w-full rounded-2xl ${
                      circle.isMember 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                  >
                    {circle.isMember ? 'View Circle' : 'Join Circle'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "forum" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Community Forum</h3>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-2xl">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
          
          <div className="space-y-4">
            {forumPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="text-sm font-semibold">
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-bold text-gray-900">{post.title}</h4>
                      {post.isAnswered && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Answered</Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{post.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="font-semibold text-gray-900">{post.author.name}</span>
                          {post.author.verified && (
                            <CheckCircle className="h-3 w-3 ml-1 text-blue-500" />
                          )}
                        </div>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                          <span>👍</span>
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                          <span>💬</span>
                          <span className="text-sm">{post.replies}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600">
                          <span>👁️</span>
                          <span className="text-sm">{post.views}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "stories" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Success Stories</h3>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl">
              <Plus className="h-4 w-4 mr-2" />
              Share Story
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {successStories.map((story) => (
              <div key={story.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                {story.imageUrl && (
                  <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl font-bold">{story.salaryIncrease} Salary Increase</div>
                      <div className="text-sm opacity-90">in {story.timeframe}</div>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={story.author.avatar} alt={story.author.name} />
                      <AvatarFallback className="text-sm font-semibold">
                        {story.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{story.title}</h4>
                      <p className="text-gray-600 text-sm mb-1">
                        {story.author.previousRole} → {story.author.currentRole}
                      </p>
                      <p className="text-gray-500 text-sm">{story.author.company} • {story.author.location}</p>
                    </div>
                    
                    {story.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{story.content}</p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {story.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-red-600">
                          <span>❤️</span>
                          <span>{story.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-600">
                          <span>📤</span>
                          <span>{story.shares}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-600">
                          <span>💬</span>
                          <span>{story.comments}</span>
                        </button>
                      </div>
                      
                      <Button variant="outline" className="rounded-2xl text-xs">
                        Read Full Story
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Community Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">1,247</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">89</div>
            <div className="text-sm text-gray-600">Success Stories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">156</div>
            <div className="text-sm text-gray-600">Learning Circles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">2.3k</div>
            <div className="text-sm text-gray-600">Forum Posts</div>
          </div>
        </div>
      </div>
    </div>
  )
}
