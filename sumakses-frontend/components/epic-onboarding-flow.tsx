"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Upload,
  MessageSquare,
  Target,
  Zap,
  CheckCircle,
  Play,
  Pause,
  Clock,
  MapPin,
  Star,
  Sparkles,
  Trophy,
  Heart,
  ThumbsUp,
  Rocket,
  Crown,
  FlameIcon as Fire,
  PartyPopper,
  Shield,
  ChevronRight,
  User,
  Mail,
  Phone,
} from "lucide-react"

interface EpicOnboardingFlowProps {
  onComplete: (userData: any) => void
  onBack: () => void
}

export default function EpicOnboardingFlow({ onComplete, onBack }: EpicOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [xpPoints, setXpPoints] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  // Fix userData state initialization with proper types
  const [userData, setUserData] = useState({
    assessmentType: "",
    assessmentAnswers: [] as any[],
    skillsProfile: {} as Record<string, any>,
    compatibilityScore: 0,
    topCareerMatch: "",
    personalizedRoadmap: {} as Record<string, any>,
    email: "",
    name: "",
    phone: "",
    currentTitle: "",
    currentCompany: "",
    location: "",
    experience: "",
  })

  // Updated onboarding flow according to new requirements
  const onboardingSteps = [
    { name: "assessment_type_selection", title: "Ready to Discover Your Tech Path?", subtitle: "Let's find the best fit for you.", xp: 50 },
    { name: "assessment_execution", title: "Skills Analysis", subtitle: "We're analyzing your background", xp: 200 },
    { name: "processing_analysis", title: "Processing", subtitle: "Analyzing your profile...", xp: 0 },
  ]
  
  // Ensure currentStep is within bounds
  const safeCurrentStep = Math.min(currentStep, onboardingSteps.length - 1)

  const progress = onboardingSteps.length > 0 ? ((currentStep + 1) / onboardingSteps.length) * 100 : 0

  const addXP = (points: number) => {
    setXpPoints((prev) => prev + points)
  }

  const unlockAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      console.log(`Unlocking achievement: ${achievement}`)
      setAchievements((prev) => [...prev, achievement])
    }
  }

  const triggerCelebration = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  // In handleStepComplete, ensure currentStep increments by 1 and does not skip any step
  const handleStepComplete = (stepData: any) => {
    const currentStepData = onboardingSteps[currentStep]
    console.log(`Completing step ${currentStep}: ${currentStepData?.name}`, stepData)
    
    if (currentStepData) {
    addXP(currentStepData.xp)
    }

    // Unlock achievements
    if (currentStep === 0) {
      unlockAchievement("Assessment Type Selected")
      console.log("Unlocked: Assessment Type Selected")
    }
    if (currentStep === 1) {
      unlockAchievement("Assessment Complete")
      console.log("Unlocked: Assessment Complete")
    }
    if (currentStep === 2) {
      unlockAchievement("Analysis Complete")
      console.log("Unlocked: Analysis Complete")
    }

    setUserData((prev) => ({ ...prev, ...stepData }))
    
    // Store data in sessionStorage for enhanced analysis
    const updatedData = { ...userData, ...stepData }
    sessionStorage.setItem('onboardingData', JSON.stringify(updatedData))

    if (currentStep < onboardingSteps.length - 1) {
      console.log(`Advancing from step ${currentStep} to ${currentStep + 1}`)
      setCurrentStep((prev) => prev + 1)
    } else {
      console.log("Assessment complete! Showing results page...")
      // Instead of completing onboarding, show results page
      onComplete({ ...userData, ...stepData, xpPoints, achievements, showResults: true })
    }
  }

  // Fix achievement notification auto-dismiss so each notification disappears 5 seconds after it appears
  useEffect(() => {
    if (achievements.length > 0) {
      const timer = setTimeout(() => {
        setAchievements((prev) => prev.slice(1)) // Remove the oldest notification
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [achievements])

  // Implement handleStepAction and getStepButtonLabel in EpicOnboardingFlow
  // handleStepAction should call the correct onComplete for the current step
  // getStepButtonLabel returns the correct label for each step
  const handleStepAction = () => {
    const currentStepData = onboardingSteps[currentStep]
    if (currentStepData) {
      if (currentStepData.name === "assessment_type_selection") {
        handleStepComplete({ assessmentType: userData.assessmentType })
      } else if (currentStepData.name === "assessment_execution") {
        handleStepComplete({ assessmentAnswers: userData.assessmentAnswers })
      } else if (currentStepData.name === "processing_analysis") {
        // Auto-advance after processing
        return
      }
    }
  }

  const getStepButtonLabel = (stepIndex: number) => {
    const currentStepData = onboardingSteps[stepIndex]
    if (currentStepData) {
      if (currentStepData.name === "assessment_type_selection") {
        return "Continue"
      } else if (currentStepData.name === "assessment_execution") {
        if (userData.assessmentType === "resume_upload") {
          return "Upload Resume"
        } else {
          return "Start Assessment"
        }
      } else if (currentStepData.name === "processing_analysis") {
        return "Processing..."
      }
    }
    return "Continue"
  }

  // In EpicOnboardingFlow, add logic to disable the fixed bottom button if required fields are not filled for the current step
  const isStepActionDisabled = () => {
    const currentStepData = onboardingSteps[currentStep]
    if (currentStepData) {
      if (currentStepData.name === "assessment_type_selection") {
        return !userData.assessmentType
      } else if (currentStepData.name === "assessment_execution") {
        return !userData.assessmentAnswers || userData.assessmentAnswers.length < 3
      } else if (currentStepData.name === "processing_analysis") {
        return true // Always disabled during processing
      }
    }
    return false
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* iOS-style Status Bar */}
      <div className="h-11 bg-white flex items-center justify-between px-6 text-sm font-medium">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-6 h-3 border border-black rounded-sm flex items-center justify-center">
            <div className="w-4 h-1.5 bg-black rounded-sm"></div>
          </div>
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <div className="w-1 h-1 bg-black rounded-full"></div>
        </div>
      </div>

      {/* Replace the iOS-style Navigation Header with a modern, mobile-friendly card header */}
      <header className="px-0 pt-0 pb-2 bg-white rounded-b-3xl shadow-md">
        <div className="flex items-center mb-2 px-4 pt-4">
          <button
            className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            aria-label="Back"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-900">{onboardingSteps[safeCurrentStep]?.title || "Loading..."}</h1>
            <p className="text-sm text-gray-500 mt-1">{onboardingSteps[safeCurrentStep]?.subtitle || "Please wait..."}</p>
          </div>
          <div className="w-10" /> {/* Spacer for symmetry */}
        </div>
        <div className="flex items-center justify-center mb-2 px-6 mt-1.5">
          <span className="flex items-center text-xs font-semibold text-yellow-500">
            <Sparkles className="h-4 w-4 mr-1" />
            {onboardingSteps[safeCurrentStep]?.xp || 0} XP
          </span>
        </div>
      </header>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: "2s",
              }}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"][
                    Math.floor(Math.random() * 5)
                  ]
                }`}
              ></div>
            </div>
          ))}
        </div>
      )}

      {/* Scrollable Main Content */}
      {/* Update scrollable main content area padding to pb-[160px] */}
      <div className="flex-1 overflow-y-auto pb-[160px]">
        <main className="flex-1 px-6 py-6">
          <div className="max-w-md mx-auto animate-fade-in-up">
            {/* Step Content (all steps) */}
            {currentStep === 0 && <EpicSkillsScanner onComplete={(type) => handleStepComplete({ assessmentType: type })} onDataChange={(type) => setUserData(prev => ({ ...prev, assessmentType: type }))} />}
            {currentStep === 1 && <EpicAssessment type={userData.assessmentType} onComplete={(answers) => handleStepComplete({ assessmentAnswers: answers })} onDataChange={(answers) => setUserData(prev => ({ ...prev, assessmentAnswers: answers }))} />}
            {currentStep === 2 && <ProcessingAnalysis onComplete={(analysis) => handleStepComplete(analysis)} onDataChange={(analysis) => setUserData(prev => ({ ...prev, ...analysis }))} />}
          </div>
        </main>
      </div>

      {/* Enhanced fixed bottom bar with better visibility */}
      {/* Fixed Navigation/Action Buttons at Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-[0_-2px_16px_0_rgba(16,30,54,0.08)] px-4 py-4 z-[9999] border-t border-gray-100">
        <div className="max-w-md mx-auto flex flex-col gap-3 items-center w-full">
          {/* Back button if not on first step */}
          {currentStep > 0 && (
          <Button
              variant="outline"
            onClick={() => setCurrentStep(prev => prev - 1)}
              className="w-full border-blue-600 text-black hover:bg-blue-50 hover:text-blue-600 font-semibold relative z-[10000]"
              style={{ minHeight: "44px" }}
          >
              Back
          </Button>
          )}
          {/* Main action button for the step */}
          <Button
            onClick={handleStepAction}
            className="w-full py-3 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 relative z-[10000]"
            style={{ minHeight: "44px" }}
            disabled={isStepActionDisabled()}
          >
            {getStepButtonLabel(currentStep)}
          </Button>
            </div>
          </div>

      {/* Achievement Notifications */}
      <div className="fixed top-24 right-4 z-40 space-y-2">
        {achievements.slice(-3).map((achievement, index) => (
          <div
            key={achievement}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 max-w-xs animate-slide-in-right"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
          </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Achievement Unlocked!</p>
                <p className="text-xs text-gray-600">{achievement}</p>
      </div>
        </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Enhanced Processing Analysis Component
function ProcessingAnalysis({ onComplete, onDataChange }: { onComplete: (analysis: any) => void; onDataChange: (analysis: any) => void }) {
  const [analysisStep, setAnalysisStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [insights, setInsights] = useState<string[]>([])

  const analysisSteps = [
    {
      text: "Analyzing your BPO experience...",
      insight: "Your customer service skills are highly transferable to tech!"
    },
    {
      text: "Mapping your transferable skills...",
      insight: "Found 8 key skills that tech companies value!"
    },
    {
      text: "Matching optimal career paths...",
      insight: "Identified 3 perfect career matches for your profile!"
    },
    {
      text: "Calculating salary potential...",
      insight: "Your earning potential could increase by 120-180%!"
    },
    {
      text: "Creating personalized roadmap...",
      insight: "Building your step-by-step success plan!"
    }
  ]

  useEffect(() => {
    const runAnalysis = async () => {
      for (let i = 0; i < analysisSteps.length; i++) {
        setAnalysisStep(i)
        setProgress((i + 1) / analysisSteps.length * 100)
        
        // Add insight after a short delay
        setTimeout(() => {
          setInsights(prev => [...prev, analysisSteps[i].insight])
        }, 800)
        
        await new Promise(resolve => setTimeout(resolve, 2000))
      }

      // Generate realistic results based on user data
      const userData = JSON.parse(sessionStorage.getItem('onboardingData') || '{}')
      const results = generateRealisticResults(userData)
      
      onDataChange(results)
      setTimeout(() => onComplete(results), 1500)
    }

    runAnalysis()
  }, [])

  const generateRealisticResults = (userData: any) => {
    const answers = userData.assessmentAnswers || []
    
    // Calculate compatibility based on answers
    let baseScore = 75
    if (answers.length > 0) {
      const experienceScore = answers[0]?.value * 5 || 0
      const techComfortScore = answers[2]?.value * 8 || 0
      baseScore = Math.min(95, baseScore + experienceScore + techComfortScore)
    }
    
    // Determine career match based on assessment answers and experience
    let careerMatch = "Quality Assurance Tester"
    let salaryRange = "₱35,000 - ₱60,000"
    
    // Base career matching on technical comfort and experience level
    if (answers[2]?.value >= 3) {
      careerMatch = "Web Developer"
      salaryRange = "₱45,000 - ₱85,000"
    } else if (answers[0]?.value >= 3) {
      careerMatch = "Data Analyst"
      salaryRange = "₱40,000 - ₱75,000"
    } else if (answers[3]?.value === "hands-on") {
      careerMatch = "UX Designer"
      salaryRange = "₱35,000 - ₱70,000"
    }
    
    return {
      compatibilityScore: baseScore,
      topCareerMatch: careerMatch,
      salaryRange,
      skillsProfile: {
        "Communication": Math.min(95, 85 + (answers[0]?.value * 2 || 0)),
        "Problem Solving": Math.min(95, 80 + (answers[2]?.value * 3 || 0)),
        "Technical Aptitude": Math.min(90, 60 + (answers[2]?.value * 7 || 0)),
        "Adaptability": Math.min(95, 85 + (answers[3]?.value === "hands-on" ? 5 : 0))
      },
      learningPath: {
        duration: answers[4]?.value === "15+" ? "3-6 months" : answers[4]?.value === "8-15" ? "4-8 months" : "6-12 months",
        intensity: answers[4]?.value || "4-7"
      },
      nextSteps: [
        "Complete foundational courses",
        "Build portfolio projects",
        "Connect with mentors",
        "Apply for entry-level positions"
      ]
    }
  }

  return (
    <div className="space-y-6 text-center">
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Floating particles around spinner */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        </div>
        <div className="absolute top-6 right-6">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="absolute bottom-6 left-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔍 Analyzing Your Profile</h2>
        <p className="text-gray-600 mb-4 font-medium">{analysisSteps[analysisStep]?.text}</p>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-lg font-bold text-blue-600">{Math.round(progress)}% complete</p>
      </div>

      {/* Live Insights */}
      {insights.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">💡 Live Insights</h3>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div 
                key={index} 
                className="bg-green-50 border border-green-200 rounded-2xl p-3 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <p className="text-sm text-green-800 font-medium">✓ {insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Encouraging message */}
      <div className="bg-blue-50 rounded-2xl p-4">
        <p className="text-blue-800 font-medium">
          🚀 Your BPO experience is a huge advantage in tech! We're finding the perfect matches for you.
        </p>
      </div>
    </div>
  )
}

// Results Preview Component
function ResultsPreview({ userData, onComplete, onDataChange }: { userData: any; onComplete: () => void; onDataChange: () => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Great News!</h2>
        <p className="text-gray-600">We found your perfect tech career match</p>
      </div>

      {/* Compatibility Score */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white text-center">
        <p className="text-sm opacity-90 mb-2">Compatibility Score</p>
        <p className="text-4xl font-bold">{userData.compatibilityScore || 87}%</p>
        <p className="text-sm opacity-90 mt-2">Excellent match!</p>
      </div>

      {/* Career Match */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3">Top Career Match</h3>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{userData.topCareerMatch || "Quality Assurance Tester"}</p>
            <p className="text-sm text-gray-600">Perfect for your BPO skills</p>
          </div>
        </div>
      </div>

      {/* Registration Prompt */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-yellow-600" />
          <div>
            <p className="font-semibold text-yellow-800">Register to unlock your full results</p>
            <p className="text-sm text-yellow-700">See your detailed roadmap, salary expectations, and more!</p>
          </div>
        </div>
      </div>
    </div>
  )
}



// iOS-style Skills Scanner Component
function EpicSkillsScanner({ onComplete, onDataChange }: { onComplete: (type: string) => void; onDataChange: (type: string) => void }) {
  const [selectedType, setSelectedType] = useState("")

  const assessmentTypes = [
    {
      id: "resume_upload",
      title: "Upload Resume",
      subtitle: "AI analyzes your resume for skills",
      icon: Upload,
      time: "2 minutes"
    },
    {
      id: "smart_assessment",
      title: "Smart Assessment",
      subtitle: "Interactive questions about your experience",
      icon: Target,
      time: "5 minutes",
      accuracy: "95%"
    }
  ]

  const handleSelect = (typeId: string) => {
    setSelectedType(typeId)
    onDataChange(typeId) // Update parent state
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How would you like to get started?</h2>
        <p className="text-gray-600">Choose your preferred method to analyze your skills</p>
      </div>

      <div className="space-y-3">
        {assessmentTypes.map((type) => {
          const IconComponent = type.icon
          return (
            <div
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                selectedType === type.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{type.title}</h3>
                  <p className="text-sm text-gray-600">{type.subtitle}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">⏱️ {type.time}</span>
                      </div>
                      </div>
                {selectedType === type.id && (
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                  )}
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Enhanced Assessment Component with Real Results
function EpicAssessment({ type, onComplete, onDataChange }: { type: string; onComplete: (answers: any[]) => void; onDataChange: (answers: any[]) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [showInsight, setShowInsight] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log('File selected:', file.name, file.size)
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      // Mock successful upload and analysis
      setUploadComplete(true)
      setIsUploading(false)
      
      // Simulate AI analysis results
      const mockAnswers = [
        { id: 1, value: 3, insight: "Your resume shows strong customer service experience!" },
        { id: 2, value: "technical", insight: "Technical support background is perfect for QA roles!" },
        { id: 3, value: 2, insight: "Good foundation for learning new technologies!" }
      ]
      
      onDataChange(mockAnswers)
      
      // Auto-complete after successful upload
      setTimeout(() => {
        onComplete(mockAnswers)
      }, 2000)
      
    } catch (error) {
      console.error('Upload failed:', error)
      setIsUploading(false)
    }
  }

  // Show resume upload GUI for resume_upload type
  if (type === "resume_upload") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-3">📄</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
          <p className="text-gray-600">AI will analyze your resume to identify your transferable skills</p>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center hover:border-blue-400 transition-colors">
          {!isUploading && !uploadComplete && (
            <>
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop your resume here</h3>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-colors cursor-pointer inline-block"
              >
                Choose File
              </label>
              <p className="text-sm text-gray-500 mt-3">PDF, DOC, DOCX • Max 5MB</p>
            </>
          )}
          
          {isUploading && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Analyzing your resume...</h3>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
            </div>
          )}
          
          {uploadComplete && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800">Analysis Complete!</h3>
              <p className="text-sm text-green-700">We've identified your transferable skills and career matches.</p>
            </div>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                Your resume is processed securely and deleted after analysis. 
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">AI identifies your transferable BPO skills</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">Matches you with relevant tech career paths</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">Creates personalized learning roadmap</p>
          </div>
        </div>
      </div>
    )
  }

  // Smart assessment questions
  const questions = [
    {
      id: 1,
      question: "How many years of BPO/customer service experience do you have?",
      subtitle: "Your experience level helps us match you with the right opportunities",
      icon: "⏰",
      options: [
        { 
          id: "0-1", 
          text: "0-1 years", 
          value: 1,
          insight: "Perfect timing to start! Your fresh perspective is valuable in tech."
        },
        { 
          id: "1-3", 
          text: "1-3 years", 
          value: 2,
          insight: "Great foundation! You have solid customer service skills to build on."
        },
        { 
          id: "3-5", 
          text: "3-5 years", 
          value: 3,
          insight: "Excellent experience! You understand complex customer needs."
        },
        { 
          id: "5+", 
          text: "5+ years", 
          value: 4,
          insight: "Amazing expertise! Your deep experience is highly valued in tech."
        }
      ]
    },
    {
      id: 2,
      question: "What type of work did you primarily handle?",
      subtitle: "This helps us identify your strongest transferable skills",
      icon: "💼",
      options: [
        { 
          id: "technical", 
          text: "Technical Support", 
          value: "technical",
          insight: "Perfect! Your troubleshooting skills translate directly to QA and DevOps roles."
        },
        { 
          id: "general", 
          text: "General Customer Service", 
          value: "general",
          insight: "Great! Your communication skills are perfect for Product Management and UX roles."
        },
        { 
          id: "sales", 
          text: "Sales Support", 
          value: "sales",
          insight: "Excellent! Your persuasion skills are ideal for Product Marketing and Business Analysis."
        },
        { 
          id: "billing", 
          text: "Billing & Collections", 
          value: "billing",
          insight: "Perfect! Your attention to detail is exactly what Data Analysis and Finance Tech roles need."
        }
      ]
    },
    {
      id: 3,
      question: "How comfortable are you with learning new technology?",
      subtitle: "Honesty helps us create the perfect learning path for you",
      icon: "🚀",
      options: [
        { 
          id: "beginner", 
          text: "Beginner - I can use basic software", 
          value: 1,
          insight: "No problem! We'll start with fundamentals and build your confidence step by step."
        },
        { 
          id: "intermediate", 
          text: "Intermediate - I can troubleshoot basic issues", 
          value: 2,
          insight: "Great starting point! You already have problem-solving skills that tech companies love."
        },
        { 
          id: "advanced", 
          text: "Advanced - I learn new software quickly", 
          value: 3,
          insight: "Excellent! Your adaptability will help you excel in fast-paced tech environments."
        },
        { 
          id: "expert", 
          text: "Expert - I love exploring new technologies", 
          value: 4,
          insight: "Amazing! Your curiosity and tech enthusiasm make you perfect for cutting-edge roles."
        }
      ]
    },
    {
      id: 4,
      question: "What's your preferred learning style?",
      subtitle: "We'll customize your learning experience to match your style",
      icon: "📚",
      options: [
        { 
          id: "visual", 
          text: "Visual - I learn best with videos and diagrams", 
          value: "visual",
          insight: "Perfect! Our visual learning modules will help you grasp concepts quickly."
        },
        { 
          id: "hands-on", 
          text: "Hands-on - I learn by doing and practicing", 
          value: "hands-on",
          insight: "Great! Our project-based approach will give you real experience to build your portfolio."
        },
        { 
          id: "reading", 
          text: "Reading - I prefer detailed written materials", 
          value: "reading",
          insight: "Excellent! Our comprehensive guides and documentation will be perfect for you."
        },
        { 
          id: "social", 
          text: "Social - I learn best in groups and discussions", 
          value: "social",
          insight: "Amazing! Our community learning circles and mentorship programs are ideal for you."
        }
      ]
    },
    {
      id: 5,
      question: "How many hours per week can you dedicate to learning?",
      subtitle: "This helps us create a realistic timeline for your career transition",
      icon: "⏱️",
      options: [
        { 
          id: "1-3", 
          text: "1-3 hours (Slow & steady)", 
          value: "1-3",
          insight: "Perfect pace! Consistency matters more than speed. You'll reach your goals in 12-18 months."
        },
        { 
          id: "4-7", 
          text: "4-7 hours (Balanced approach)", 
          value: "4-7",
          insight: "Great balance! This pace typically leads to career transition in 8-12 months."
        },
        { 
          id: "8-15", 
          text: "8-15 hours (Accelerated path)", 
          value: "8-15",
          insight: "Ambitious! With this dedication, you could transition in 4-8 months."
        },
        { 
          id: "15+", 
          text: "15+ hours (Full commitment)", 
          value: "15+",
          insight: "Incredible dedication! You could potentially transition in 3-6 months with this intensity."
        }
      ]
    }
  ]

  const handleAnswer = (answer: any) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
    onDataChange(newAnswers)
    
    // Show insight for the selected answer
    setShowInsight(true)
    
    // Auto-advance after showing insight
    setTimeout(() => {
      setShowInsight(false)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, 2500)
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const selectedAnswer = answers[currentQuestion]

  return (
    <div className="space-y-6">
      {/* Enhanced Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{question.icon}</span>
            <span className="text-sm font-medium text-gray-700">Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{question.question}</h2>
          <p className="text-sm text-gray-600">{question.subtitle}</p>
        </div>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <div
              key={option.id}
              onClick={() => !selectedAnswer && handleAnswer(option)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                selectedAnswer?.id === option.id
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : selectedAnswer
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900 text-left flex-1">{option.text}</p>
                {selectedAnswer?.id === option.id && (
                  <CheckCircle className="h-6 w-6 text-blue-500 ml-3" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight Display */}
      {showInsight && selectedAnswer && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-200 animate-fade-in">
          <div className="text-center">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Great choice!</h3>
            <p className="text-green-800 font-medium">{selectedAnswer.insight}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// iOS-style Compatibility Analysis Component
function EpicCompatibilityAnalysis({ answers, onComplete, onDataChange }: { answers: any[]; onComplete: (analysis: any) => void; onDataChange: (analysis: any) => void }) {
  const [analysisStep, setAnalysisStep] = useState(0)
  const [analysisData, setAnalysisData] = useState<{
    compatibilityScore: number;
    topCareerMatch: string;
    skillsProfile: Record<string, number>;
    recommendations: string[];
  }>({
    compatibilityScore: 0,
    topCareerMatch: "",
    skillsProfile: {},
    recommendations: []
  })

  const analysisSteps = [
    "Analyzing your customer service experience...",
    "Mapping transferable skills...",
    "Finding career matches...",
    "Generating personalized recommendations..."
  ]

  useEffect(() => {
    const runAnalysis = async () => {
      for (let i = 0; i < analysisSteps.length; i++) {
        setAnalysisStep(i)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Mock analysis results
      const mockResults = {
        compatibilityScore: 87,
        topCareerMatch: "Customer Success Manager",
        skillsProfile: {
          "Communication": 95,
          "Problem Solving": 88,
          "Technical Aptitude": 72,
          "Leadership": 85
        },
        recommendations: [
          "Start with customer success fundamentals",
          "Learn CRM tools like Salesforce",
          "Develop technical troubleshooting skills",
          "Practice data analysis and reporting"
        ]
      }

      setAnalysisData(mockResults)
      onDataChange(mockResults) // Update parent state
      // Remove auto-advancement: setTimeout(() => onComplete(mockResults), 1000)
    }

    runAnalysis()
  }, [analysisSteps.length, onDataChange])

    return (
      <div className="space-y-6">
      {analysisStep < analysisSteps.length ? (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing your profile</h2>
            <p className="text-gray-600">{analysisSteps[analysisStep]}</p>
        </div>
                  </div>
      ) : (
    <div className="space-y-6">
      <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analysis Complete!</h2>
            <p className="text-gray-600">We found the perfect career match for you</p>
      </div>

          {/* Compatibility Score */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white text-center">
            <p className="text-sm opacity-90 mb-2">Compatibility Score</p>
            <p className="text-4xl font-bold">{analysisData.compatibilityScore}%</p>
            <p className="text-sm opacity-90 mt-2">Excellent match!</p>
              </div>

          {/* Career Match */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Top Career Match</h3>
              <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
                </div>
              <div>
                <p className="font-semibold text-gray-900">{analysisData.topCareerMatch}</p>
                <p className="text-sm text-gray-600">Perfect for your skills</p>
              </div>
                </div>
              </div>

          {/* Skills Profile */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Your Skills Profile</h3>
            <div className="space-y-3">
              {Object.entries(analysisData.skillsProfile).map(([skill, score]) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{skill}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${score}%` }}
                      ></div>
                </div>
                    <span className="text-sm font-medium text-gray-900">{score}%</span>
              </div>
            </div>
              ))}
      </div>
            </div>
            </div>
      )}
    </div>
  )
}

// iOS-style Roadmap Preview Component
function EpicRoadmapPreview({ onComplete, onDataChange }: { onComplete: (roadmap: any) => void; onDataChange: (roadmap: any) => void }) {
  const roadmap = {
    phases: [
      {
        title: "Foundation",
        duration: "4 weeks",
        skills: ["Customer Success Fundamentals", "CRM Basics", "Communication Skills"],
        status: "upcoming"
      },
      {
        title: "Technical Skills",
        duration: "6 weeks",
        skills: ["Data Analysis", "Technical Troubleshooting", "Product Knowledge"],
        status: "upcoming"
      },
      {
        title: "Advanced Skills",
        duration: "8 weeks",
        skills: ["Team Leadership", "Process Optimization", "Strategic Thinking"],
        status: "upcoming"
      }
    ]
  }

  // Remove the problematic useEffect that was causing infinite loop
  // useEffect(() => {
  //   onDataChange(roadmap)
  // }, [onDataChange])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Learning Roadmap</h2>
        <p className="text-gray-600">A personalized path to your tech career</p>
      </div>

      <div className="space-y-4">
        {roadmap.phases.map((phase, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">{index + 1}</span>
            </div>
            <div>
                  <h3 className="font-semibold text-gray-900">{phase.title}</h3>
                  <p className="text-sm text-gray-500">{phase.duration}</p>
            </div>
          </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                {phase.status}
              </Badge>
              </div>

            <div className="space-y-2">
              {phase.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{skill}</span>
                    </div>
              ))}
                    </div>
                  </div>
        ))}
                  </div>
                </div>
  )
}

// iOS-style Profile Setup Component
function EpicProfileSetup({ onComplete, onDataChange }: { onComplete: (profile: any) => void; onDataChange: (profile: any) => void }) {
  const [formData, setFormData] = useState({
    currentTitle: "",
    currentCompany: "",
    location: "",
    experience: ""
  })

  const jobTitles = [
    "Customer Service Representative",
    "Team Leader",
    "Technical Support Specialist",
    "Quality Assurance Specialist",
    "Process Improvement Specialist",
    "Training Specialist",
    "Operations Manager",
    "Other"
  ]

  const locations = [
    "Metro Manila",
    "Cebu",
    "Davao",
    "Bacolod",
    "Iloilo",
    "Baguio",
    "Other"
  ]

  const experienceLevels = [
    "Less than 1 year",
    "1-2 years",
    "3-5 years",
    "5-10 years",
    "More than 10 years"
  ]

  const handleFormChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    onDataChange(newFormData) // Update parent state
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your current role</h2>
        <p className="text-gray-600">This helps us personalize your learning experience</p>
                        </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Current Job Title</Label>
          <Select value={formData.currentTitle} onValueChange={(value) => handleFormChange('currentTitle', value)}>
            <SelectTrigger className="h-12 rounded-2xl border-gray-200">
              <SelectValue placeholder="Select your current role" />
            </SelectTrigger>
            <SelectContent>
              {jobTitles.map((title) => (
                <SelectItem key={title} value={title}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
                    </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Company/Organization</Label>
          <Input
            value={formData.currentCompany}
            onChange={(e) => handleFormChange('currentCompany', e.target.value)}
            className="h-12 rounded-2xl border-gray-200"
            placeholder="Enter your company name"
          />
                  </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Location</Label>
          <Select value={formData.location} onValueChange={(value) => handleFormChange('location', value)}>
            <SelectTrigger className="h-12 rounded-2xl border-gray-200">
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Years of Experience</Label>
          <Select value={formData.experience} onValueChange={(value) => handleFormChange('experience', value)}>
            <SelectTrigger className="h-12 rounded-2xl border-gray-200">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>
      </div>
    </div>
  )
}

// Personal Info Form Component
export function PersonalInfoForm({ onComplete, onDataChange }: { onComplete: (info: any) => void; onDataChange: (info: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const handleFormChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    onDataChange(newFormData)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Let's get to know you better</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              className="pl-10 h-12 rounded-2xl border-gray-200"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              className="pl-10 h-12 rounded-2xl border-gray-200"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleFormChange('phone', e.target.value)}
              className="pl-10 h-12 rounded-2xl border-gray-200"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Work Details Form Component  
export function WorkDetailsForm({ onComplete, onDataChange }: { onComplete: (details: any) => void; onDataChange: (details: any) => void }) {
  const [formData, setFormData] = useState({
    currentTitle: "",
    currentCompany: "",
    location: "",
    experience: ""
  })

  const jobTitles = [
    "Customer Service Representative",
    "Team Leader",
    "Technical Support Specialist",
    "Quality Assurance Specialist",
    "Process Improvement Specialist",
    "Training Specialist",
    "Operations Manager",
    "Other"
  ]

  const locations = [
    "Metro Manila",
    "Cebu",
    "Davao",
    "Bacolod",
    "Iloilo",
    "Baguio",
    "Other"
  ]

  const experienceLevels = [
    "Less than 1 year",
    "1-2 years",
    "3-5 years",
    "5-10 years",
    "More than 10 years"
  ]

  const handleFormChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    onDataChange(newFormData)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Details</h2>
        <p className="text-gray-600">Tell us about your current role</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Current Job Title</Label>
          <Select value={formData.currentTitle} onValueChange={(value) => handleFormChange('currentTitle', value)}>
            <SelectTrigger className="h-12 rounded-2xl border-gray-200">
              <SelectValue placeholder="Select your current role" />
            </SelectTrigger>
            <SelectContent>
              {jobTitles.map((title) => (
                <SelectItem key={title} value={title}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Company/Organization</Label>
          <Input
            value={formData.currentCompany}
            onChange={(e) => handleFormChange('currentCompany', e.target.value)}
            className="h-12 rounded-2xl border-gray-200"
            placeholder="Enter your company name"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Location</Label>
          <Select value={formData.location} onValueChange={(value) => handleFormChange('location', value)}>
            <SelectTrigger className="h-12 rounded-2xl border-gray-200">
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Years of Experience</Label>
          <Select value={formData.experience} onValueChange={(value) => handleFormChange('experience', value)}>
            <SelectTrigger className="h-12 rounded-2xl border-gray-200">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

// Resume Upload Form Component
export function ResumeUploadForm({ onComplete, onDataChange }: { onComplete: (resume: any) => void; onDataChange: (resume: any) => void }) {
  const [resumeUploaded, setResumeUploaded] = useState(false)

  const handleSkip = () => {
    onDataChange({ resumeUploaded: false })
  }

  const handleUpload = () => {
    // Mock upload functionality
    setResumeUploaded(true)
    onDataChange({ resumeUploaded: true })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Resume</h2>
        <p className="text-gray-600">Optional - Enhance your profile with your resume</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload your resume</h3>
        <p className="text-gray-600 mb-4">PDF, DOC, or DOCX files up to 5MB</p>
        
        {!resumeUploaded ? (
          <div className="space-y-3">
            <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-3">
              Choose File
            </Button>
            <p className="text-sm text-gray-500">or drag and drop your file here</p>
          </div>
        ) : (
          <div className="text-green-600">
            <CheckCircle className="h-8 w-8 mx-auto mb-2" />
            <p className="font-semibold">Resume uploaded successfully!</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-2xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Don't have a resume ready?</strong> No worries! You can upload it later from your profile settings.
        </p>
      </div>
    </div>
  )
}

// Setup Loading Component
export function SetupLoading({ onComplete, userData, xpPoints, achievements }: { onComplete: () => void; userData: any; xpPoints: number; achievements: string[] }) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: "Setting up your profile..." },
      { progress: 40, text: "Creating your learning path..." },
      { progress: 60, text: "Connecting to community..." },
      { progress: 80, text: "Preparing your dashboard..." },
      { progress: 100, text: "Welcome to SUMAKSES!" }
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
            Welcome, {userData.name}!
          </h1>
          <p className="text-white/80 text-lg">
            Your tech journey is about to begin
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

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <div className="bg-white/10 rounded-2xl p-3 text-center">
            <div className="text-xl font-bold">{xpPoints}</div>
            <div className="text-xs text-white/80">XP Earned</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 text-center">
            <div className="text-xl font-bold">{achievements.length}</div>
            <div className="text-xs text-white/80">Achievements</div>
          </div>
        </div>
      </div>
    </div>
  )
}
