"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle, Target, Shield } from "lucide-react"
import LandingPage from "@/components/landing-page"
import EpicOnboardingFlow, { PersonalInfoForm, WorkDetailsForm, ResumeUploadForm, SetupLoading } from "@/components/epic-onboarding-flow"
import MainApp from "@/components/main-app"
import LoginPage from "@/components/login-page"
import EnhancedResumeUpload from "@/components/enhanced-resume-upload"

interface UserData {
  id: string
  name: string
  title: string
  location: string
  email?: string
  phone?: string
  assessmentType?: string
  assessmentAnswers?: any[]
  skillsProfile?: any
  compatibilityScore?: number
  topCareerMatch?: string
  personalizedRoadmap?: any
  xpPoints?: number
  achievements?: string[]
}

// Splash Screen Component
function SplashScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: "Loading SUMAKSES..." },
      { progress: 40, text: "Preparing your journey..." },
      { progress: 60, text: "Setting up learning paths..." },
      { progress: 80, text: "Connecting to community..." },
      { progress: 100, text: "Ready to transform!" }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingProgress(step.progress)
        setLoadingText(step.text)
        currentStep++
      } else {
        clearInterval(interval)
        // Start fade out after a brief pause
        setTimeout(() => {
          setIsFadingOut(true)
        }, 500)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 animate-gradient-shift flex items-center justify-center relative overflow-hidden transition-all duration-1000 ease-in-out ${
      isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-blue-300/30 rounded-full animate-sparkle"></div>
        <div className="absolute top-1/3 right-1/6 w-6 h-6 bg-blue-200/30 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-blue-100/30 rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center space-y-8 transition-all duration-1000 ease-in-out ${
        isFadingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* App Logo/Icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent relative z-10">
                S
              </span>
              {/* Shimmer effect on logo */}
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          </div>
          
          {/* Floating particles around logo */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-blue-300 rounded-full animate-ping animate-sparkle"></div>
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-200 rounded-full animate-ping animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping animate-sparkle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-100 rounded-full animate-ping animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Additional decorative elements */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-transparent to-white/30 animate-pulse"></div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            SUMAKSES
          </h1>
          <p className="text-white/80 text-lg font-medium">
            Your Tech Journey Starts Here
          </p>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4 max-w-sm mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 relative overflow-hidden">
            {/* Shimmer effect on progress container */}
            <div className="absolute inset-0 animate-shimmer opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/90 text-sm font-medium">{loadingText}</span>
                <span className="text-white font-semibold">{loadingProgress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-500 ease-out relative"
                  style={{ width: `${loadingProgress}%` }}
                >
                  {/* Shimmer effect on progress bar */}
                  <div className="absolute inset-0 animate-shimmer opacity-50"></div>
                </div>
                
                {/* Progress bar glow effect */}
                <div 
                  className="absolute top-0 h-full bg-white/40 rounded-full blur-sm transition-all duration-500 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 text-white/60 text-sm">
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
          <span>Empowering Filipino BPO Professionals</span>
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "loginLoading" | "onboarding" | "results" | "registration" | "resumeUpload" | "app">("landing")
  const [user, setUser] = useState<UserData | null>(null)
  const [assessmentResults, setAssessmentResults] = useState<any>(null)

  const handleStartJourney = () => {
    setCurrentView("onboarding")
  }

  const handleLoginClick = () => {
    setCurrentView("login")
  }

  const handleLoginSuccess = (userData: UserData) => {
    setUser(userData)
    setCurrentView("loginLoading")
    
    // Show loading screen then go to app
    setTimeout(() => {
      setCurrentView("app")
    }, 4000)
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
  }

  const handleOnboardingComplete = (onboardingData: any) => {
    if (onboardingData.showResults) {
      // Show results page after assessment
      setAssessmentResults(onboardingData)
      setCurrentView("results")
    } else {
      // Complete registration and go to app
      const userData: UserData = {
        id: `user_${Date.now()}`,
        name: onboardingData.name || "Learner",
        title: onboardingData.currentTitle || onboardingData.topCareerMatch || "Tech Professional",
        location: onboardingData.location || "Philippines",
        email: onboardingData.email,
        phone: onboardingData.phone,
        assessmentType: onboardingData.assessmentType,
        assessmentAnswers: onboardingData.assessmentAnswers,
        skillsProfile: onboardingData.skillsProfile,
        compatibilityScore: onboardingData.compatibilityScore,
        topCareerMatch: onboardingData.topCareerMatch,
        personalizedRoadmap: onboardingData.personalizedRoadmap,
        xpPoints: onboardingData.xpPoints,
        achievements: onboardingData.achievements,
      }
      
      setUser(userData)
      setCurrentView("app")
    }
  }

  const handleRegisterClick = () => {
    setCurrentView("registration")
  }

  const handleRegistrationComplete = (registrationData: any) => {
    // Create user data from assessment results
    const userData: UserData = {
      id: `user_${Date.now()}`,
      name: registrationData.name || assessmentResults?.name || "Learner",
      title: assessmentResults?.topCareerMatch || "Tech Professional",
      location: "Philippines",
      email: registrationData.email,
      phone: registrationData.phone,
      assessmentType: assessmentResults?.assessmentType,
      assessmentAnswers: assessmentResults?.assessmentAnswers,
      skillsProfile: assessmentResults?.skillsProfile,
      compatibilityScore: assessmentResults?.compatibilityScore,
      topCareerMatch: assessmentResults?.topCareerMatch,
      personalizedRoadmap: assessmentResults?.personalizedRoadmap,
      xpPoints: assessmentResults?.xpPoints || 0,
      achievements: assessmentResults?.achievements || [],
    }
    
    setUser(userData)
    setCurrentView("resumeUpload")
  }

  const handleResumeUploadComplete = (resumeData: any) => {
    // Update user data with resume information if provided
    if (user && resumeData.resumeUploaded) {
      setUser(prev => prev ? { ...prev, resumeData } : prev)
    }
    
    setCurrentView("loginLoading")
    
    // Show loading screen then go to app
    setTimeout(() => {
      setCurrentView("app")
    }, 4000)
  }

  const handleResumeUploadSkip = () => {
    setCurrentView("loginLoading")
    
    // Show loading screen then go to app
    setTimeout(() => {
      setCurrentView("app")
    }, 4000)
  }

  if (currentView === "landing") {
    return (
      <div className="animate-fade-in-up">
        <LandingPage onStartJourney={handleStartJourney} onLoginClick={handleLoginClick} />
      </div>
    )
  }

  if (currentView === "login") {
    return (
      <div className="animate-fade-in-up">
        <LoginPage onLoginSuccess={handleLoginSuccess} onBack={handleBackToLanding} />
      </div>
    )
  }

  if (currentView === "onboarding") {
    return <EpicOnboardingFlow onComplete={handleOnboardingComplete} onBack={handleBackToLanding} />
  }

  if (currentView === "results") {
    return (
      <div className="animate-fade-in-up">
        <ResultsPage 
          assessmentResults={assessmentResults} 
          onRegister={handleRegisterClick}
          onBack={handleBackToLanding}
        />
      </div>
    )
  }

  if (currentView === "registration") {
    return (
      <div className="animate-fade-in-up">
        <RegistrationFlow 
          onComplete={handleRegistrationComplete}
          onBack={() => setCurrentView("results")}
          assessmentResults={assessmentResults}
        />
      </div>
    )
  }



  if (currentView === "resumeUpload") {
    return (
      <div className="animate-fade-in-up">
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Header */}
          <header className="px-4 pt-4 pb-2 bg-white rounded-b-3xl shadow-md">
            <div className="flex items-center mb-2">
              <button
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => setCurrentView("registration")}
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex-1 text-center">
                <h1 className="text-xl font-bold text-gray-900">Enhance Your Profile</h1>
                <p className="text-sm text-gray-500">Optional step to boost your career matching</p>
              </div>
              <div className="w-10" />
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 px-4 py-6" style={{ paddingBottom: '120px' }}>
            <div className="max-w-md mx-auto">
              <EnhancedResumeUpload 
                onComplete={handleResumeUploadComplete}
                onSkip={handleResumeUploadSkip}
                userEmail={user?.email}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "loginLoading") {
    return (
      <LoginLoadingScreen 
        userData={user}
        onComplete={() => setCurrentView("app")}
      />
    )
  }

  return <MainApp userData={user || undefined} />
}

// Results Page Component
function ResultsPage({ assessmentResults, onRegister, onBack }: { assessmentResults: any; onRegister: () => void; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="px-4 pt-4 pb-2 bg-white rounded-b-3xl shadow-md">
        <div className="flex items-center mb-2">
          <button
            className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-900">Your Results Are Ready!</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 py-6" style={{ paddingBottom: '120px' }}>
        <div className="max-w-md mx-auto space-y-6">
          {/* Success Message */}
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete!</h2>
            <p className="text-gray-600">We found your perfect tech career match</p>
          </div>

          {/* Preview Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white text-center">
            <p className="text-sm opacity-90 mb-2">Compatibility Score</p>
            <p className="text-4xl font-bold">{assessmentResults?.compatibilityScore || 87}%</p>
            <p className="text-sm opacity-90 mt-2">Excellent match!</p>
          </div>

          {/* Career Match Preview */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Top Career Match</h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{assessmentResults?.topCareerMatch || "Quality Assurance Tester"}</p>
                <p className="text-sm text-gray-600">Perfect for your BPO skills</p>
              </div>
            </div>
          </div>

          {/* Locked Content */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold text-yellow-800 mb-2">Unlock Your Full Results</h3>
              <p className="text-sm text-yellow-700 mb-4">
                Register now to see your detailed roadmap, salary expectations, learning path, and connect with our community!
              </p>
              <ul className="text-left text-sm text-yellow-700 space-y-1">
                <li>✓ Detailed skills breakdown</li>
                <li>✓ Personalized learning roadmap</li>
                <li>✓ Salary expectations & negotiation tips</li>
                <li>✓ Access to mentors & community</li>
                <li>✓ Job application guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Register Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_16px_0_rgba(16,30,54,0.08)] px-4 py-4 z-50">
        <div className="max-w-md mx-auto">
          <button
            onClick={onRegister}
            className="w-full py-3 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-2xl"
            style={{ minHeight: "44px" }}
          >
            Register to View Full Results
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Free to join • No credit card required
          </p>
        </div>
      </div>
    </div>
  )
}

// Registration Flow Component
function RegistrationFlow({ onComplete, onBack, assessmentResults }: { onComplete: (data: any) => void; onBack: () => void; assessmentResults: any }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-4 pt-4 pb-2 bg-white rounded-b-3xl shadow-md">
        <div className="flex items-center mb-2">
          <button
            className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-900">Create Account</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>
      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Login Loading Screen Component
function LoginLoadingScreen({ userData, onComplete }: { userData: any; onComplete: () => void }) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Welcome!")

  useEffect(() => {
    // Check if this is a new user (has assessment data) or returning user
    const isNewUser = userData?.assessmentAnswers || userData?.compatibilityScore
    
    const loadingSteps = isNewUser ? [
      { progress: 25, text: "Setting up your profile..." },
      { progress: 50, text: "Creating your learning path..." },
      { progress: 75, text: "Preparing your dashboard..." },
      { progress: 100, text: "Welcome to SUMAKSES!" }
    ] : [
      { progress: 25, text: "Welcome back!" },
      { progress: 50, text: "Loading your progress..." },
      { progress: 75, text: "Preparing your dashboard..." },
      { progress: 100, text: "Ready to continue!" }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingProgress(step.progress)
        setLoadingText(step.text)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 text-white">
        {/* App Logo/Icon */}
        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              S
            </span>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            {userData?.assessmentAnswers || userData?.compatibilityScore 
              ? `Welcome, ${userData?.name || "Learner"}!` 
              : `Welcome back, ${userData?.name || "Learner"}!`}
          </h1>
          <p className="text-white/80 text-lg">
            {userData?.assessmentAnswers || userData?.compatibilityScore 
              ? "Your tech journey is about to begin" 
              : "Let's continue your tech journey"}
          </p>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4 max-w-sm mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/90 text-sm font-medium">{loadingText}</span>
              <span className="text-white font-semibold">{loadingProgress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
