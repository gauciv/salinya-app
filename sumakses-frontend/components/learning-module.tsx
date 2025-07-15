"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Target,
  CheckCircle,
  Clock,
  Star,
  Users,
  MessageSquare,
  Download,
  Heart,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Bookmark,
  Eye,
  EyeOff,
} from "lucide-react"

interface LearningModuleProps {
  moduleId: string
  onComplete: (moduleData: any) => void
  onProgress: (progress: number) => void
}

interface LearningContent {
  id: string
  type: "video" | "reading" | "exercise" | "quiz" | "discussion"
  title: string
  description: string
  duration: number // in minutes
  content: any
  completed: boolean
  current: boolean
}

interface ModuleData {
  id: string
  title: string
  description: string
  phase: string
  totalDuration: number
  progress: number
  contents: LearningContent[]
  instructor: {
    name: string
    avatar: string
    title: string
    company: string
  }
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  prerequisites: string[]
  learningObjectives: string[]
  resources: {
    downloads: string[]
    externalLinks: string[]
    communityDiscussions: string[]
  }
}

export default function LearningModule({ moduleId, onComplete, onProgress }: LearningModuleProps) {
  const [currentContentIndex, setCurrentContentIndex] = useState(0)

  const [showNotes, setShowNotes] = useState(false)
  const [userNotes, setUserNotes] = useState("")
  const [bookmarked, setBookmarked] = useState(false)
  const [liked, setLiked] = useState(false)
  const [showDiscussion, setShowDiscussion] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)

  // Mock module data following SUMAKSES context
  const moduleData: ModuleData = {
    id: moduleId,
    title: "Software Testing Fundamentals",
    description: "Learn the basics of QA testing and quality assurance processes",
    phase: "Foundation Phase",
    totalDuration: 120, // 2 hours
    progress: 65,
    contents: [
      {
        id: "intro-video",
        type: "video",
        title: "Introduction to Software Testing",
        description: "Overview of testing principles and methodologies",
        duration: 15,
        content: {
          videoUrl: "/placeholder-video.mp4",
          transcript: "Welcome to software testing fundamentals...",
          subtitles: true,
          quality: "HD"
        },
        completed: true,
        current: false
      },
      {
        id: "testing-types",
        type: "reading",
        title: "Types of Software Testing",
        description: "Comprehensive guide to different testing approaches",
        duration: 20,
        content: {
          text: "Software testing can be categorized into several types...",
          images: ["/testing-types-diagram.png"],
          interactiveElements: ["glossary", "examples"]
        },
        completed: true,
        current: false
      },
      {
        id: "manual-testing",
        type: "exercise",
        title: "Manual Testing Practice",
        description: "Hands-on practice with manual testing techniques",
        duration: 30,
        content: {
          scenario: "Test a simple login form",
          steps: ["Identify test cases", "Execute tests", "Document results"],
          expectedOutcome: "Complete test report"
        },
        completed: false,
        current: true
      },
      {
        id: "testing-quiz",
        type: "quiz",
        title: "Testing Fundamentals Quiz",
        description: "Test your knowledge of software testing concepts",
        duration: 10,
        content: {
          questions: [
            {
              question: "What is the main purpose of software testing?",
              options: ["To find bugs", "To improve code quality", "To ensure software meets requirements", "All of the above"],
              correctAnswer: 3
            }
          ],
          passingScore: 80
        },
        completed: false,
        current: false
      },
      {
        id: "community-discussion",
        type: "discussion",
        title: "Testing Challenges Discussion",
        description: "Share experiences and learn from the community",
        duration: 15,
        content: {
          topic: "Common challenges in manual testing",
          participants: 45,
          recentPosts: 12
        },
        completed: false,
        current: false
      }
    ],
    instructor: {
      name: "Maria Santos",
      avatar: "/placeholder-user.jpg",
      title: "Senior QA Engineer",
      company: "TechCorp Philippines"
    },
    difficulty: "beginner",
    tags: ["QA Testing", "Manual Testing", "Quality Assurance", "Software Development"],
    prerequisites: ["Basic computer skills", "Attention to detail"],
    learningObjectives: [
      "Understand software testing principles",
      "Identify different types of testing",
      "Execute manual testing procedures",
      "Document test results effectively"
    ],
    resources: {
      downloads: ["Testing-Checklist.pdf", "Test-Case-Template.xlsx"],
      externalLinks: ["ISTQB Foundation Guide", "Testing Best Practices"],
      communityDiscussions: ["Manual Testing Tips", "Career Advice for QA"]
    }
  }

  const currentContent = moduleData.contents[currentContentIndex]
  const overallProgress = (moduleData.contents.filter(c => c.completed).length / moduleData.contents.length) * 100

  useEffect(() => {
    onProgress(overallProgress)
  }, [overallProgress, onProgress])

  const handleContentComplete = () => {
    const updatedContents = [...moduleData.contents]
    updatedContents[currentContentIndex].completed = true
    
    if (currentContentIndex < moduleData.contents.length - 1) {
      updatedContents[currentContentIndex + 1].current = true
      setCurrentContentIndex(currentContentIndex + 1)
    } else {
      // Module completed
      onComplete({
        moduleId,
        completedAt: new Date().toISOString(),
        finalProgress: 100,
        timeSpent: moduleData.totalDuration
      })
    }
  }

  const handleVideoProgress = (progress: number) => {
    setVideoProgress(progress)
    if (progress >= 90) { // Mark as completed when 90% watched
      handleContentComplete()
    }
  }

  const renderContent = () => {
    switch (currentContent.type) {
      case "video":
        return <VideoContent content={currentContent} onProgress={handleVideoProgress} />
      case "reading":
        return <ReadingContent content={currentContent} onComplete={handleContentComplete} />
      case "exercise":
        return <ExerciseContent content={currentContent} onComplete={handleContentComplete} />
      case "quiz":
        return <QuizContent content={currentContent} onComplete={handleContentComplete} />
      case "discussion":
        return <DiscussionContent content={currentContent} onComplete={handleContentComplete} />
      default:
        return <div>Content type not supported</div>
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full">
                {moduleData.phase}
              </Badge>
              <Badge variant="secondary" className="capitalize text-xs px-3 py-1 rounded-full">
                {moduleData.difficulty}
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
              {moduleData.title}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
              {moduleData.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {moduleData.totalDuration} min
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                2,450 learners
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                4.8/5
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBookmarked(!bookmarked)}
              className={`h-10 w-10 p-0 rounded-2xl ${bookmarked ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLiked(!liked)}
              className={`h-10 w-10 p-0 rounded-2xl ${liked ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Module Progress</span>
            <span className="font-bold text-gray-900">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Instructor Info */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
              <AvatarImage src={moduleData.instructor.avatar} alt={moduleData.instructor.name} />
              <AvatarFallback className="text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600">
                {moduleData.instructor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">{moduleData.instructor.name}</h3>
              <p className="text-sm text-gray-600">{moduleData.instructor.title}</p>
              <p className="text-xs text-gray-500">{moduleData.instructor.company}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-2xl px-4 py-2 self-start sm:self-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask Question
          </Button>
        </div>
      </div>

      {/* Content Navigation */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Module Contents</h3>
        <div className="space-y-2">
          {moduleData.contents.map((content, index) => (
            <div
              key={content.id}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                index === currentContentIndex
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : content.completed
                    ? "bg-green-50 border border-green-200"
                    : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setCurrentContentIndex(index)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  index === currentContentIndex
                    ? "bg-white/20"
                    : content.completed
                      ? "bg-green-100"
                      : "bg-gray-200"
                }`}>
                  {content.completed ? (
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  ) : content.current ? (
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  ) : (
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm sm:text-base font-medium truncate ${
                    index === currentContentIndex ? 'text-white' : 'text-gray-900'
                  }`}>
                    {content.title}
                  </p>
                  <p className={`text-xs sm:text-sm truncate ${
                    index === currentContentIndex ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    {content.duration} min • {content.type}
                  </p>
                </div>
              </div>
              {content.current && (
                <Badge className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                  Current
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Content */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{currentContent.title}</h2>
              <p className="text-sm text-gray-600">{currentContent.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotes(!showNotes)}
                className={`h-10 w-10 p-0 rounded-2xl ${showNotes ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {showNotes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDiscussion(!showDiscussion)}
                className={`h-10 w-10 p-0 rounded-2xl ${showDiscussion ? 'bg-purple-50 text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {renderContent()}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Notes Panel */}
              {showNotes && (
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">My Notes</h4>
                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Take notes here..."
                    className="w-full h-32 p-3 text-sm border border-blue-300 rounded-xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>
              )}

              {/* Learning Objectives */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-2 text-green-600" />
                  Learning Objectives
                </h4>
                <div className="space-y-2">
                  {moduleData.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-gray-700 leading-relaxed">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Resources</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-900 mb-2">Downloads</h5>
                    <div className="space-y-1">
                      {moduleData.resources.downloads.map((download, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-8 text-xs bg-white/50 hover:bg-white/80 rounded-xl"
                        >
                          <Download className="h-3 w-3 mr-2" />
                          {download}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-semibold text-gray-900 mb-2">External Links</h5>
                    <div className="space-y-1">
                      {moduleData.resources.externalLinks.map((link, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-8 text-xs bg-white/50 hover:bg-white/80 rounded-xl"
                        >
                          <ArrowRight className="h-3 w-3 mr-2" />
                          {link}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentContentIndex(Math.max(0, currentContentIndex - 1))}
          disabled={currentContentIndex === 0}
          className="w-full sm:w-auto rounded-2xl px-6 py-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => setCurrentContentIndex(0)}
            className="flex-1 sm:flex-none rounded-2xl px-4 py-3"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart
          </Button>
          
          <Button
            onClick={handleContentComplete}
            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-6 py-3 shadow-lg"
          >
            {currentContentIndex === moduleData.contents.length - 1 ? "Complete Module" : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Video Content Component
function VideoContent({ content, onProgress }: { content: LearningContent; onProgress: (progress: number) => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(content.duration * 60) // Convert to seconds

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-white" />
            </div>
            <p className="text-sm">Video Player Placeholder</p>
            <p className="text-xs text-white/60">{content.duration} minutes</p>
          </div>
        </div>
        
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <div className="flex-1">
              <Progress 
                value={(currentTime / duration) * 100} 
                className="h-1 bg-white/30" 
              />
            </div>
            
            <span className="text-white text-xs">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 
              {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-text-primary">{content.title}</h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-text-secondary">{content.description}</p>
        
        {content.content.subtitles && (
          <div className="flex items-center space-x-2 text-sm text-text-tertiary">
            <CheckCircle className="h-4 w-4" />
            <span>Subtitles available</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Reading Content Component
function ReadingContent({ content, onComplete }: { content: LearningContent; onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <div className="prose prose-sm max-w-none">
        <h3 className="text-lg font-semibold text-text-primary mb-4">{content.title}</h3>
        <div className="text-sm text-text-secondary leading-relaxed">
          <p>{content.content.text}</p>
          {/* More reading content would go here */}
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-border-default">
        <div className="flex items-center space-x-2 text-sm text-text-tertiary">
          <Clock className="h-4 w-4" />
          <span>Estimated reading time: {content.duration} minutes</span>
        </div>
        
        <Button
          onClick={onComplete}
          className="rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary"
        >
          Mark as Complete
          <CheckCircle className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

// Exercise Content Component
function ExerciseContent({ content, onComplete }: { content: LearningContent; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleStepComplete = (stepIndex: number) => {
    setCompletedSteps([...completedSteps, stepIndex])
    if (stepIndex === content.content.steps.length - 1) {
      onComplete()
    } else {
      setCurrentStep(stepIndex + 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-background-card2 p-4 rounded-xl">
        <h3 className="font-semibold text-text-primary mb-2">Exercise Scenario</h3>
        <p className="text-sm text-text-secondary">{content.content.scenario}</p>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-text-primary">Steps to Complete:</h4>
        {content.content.steps.map((step: string, index: number) => (
          <div
            key={index}
            className={`p-3 rounded-lg border-2 ${
              completedSteps.includes(index)
                ? "border-states-success bg-background-card3"
                : index === currentStep
                  ? "border-brand-primary bg-background-card1"
                  : "border-border-default bg-background-surface"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  completedSteps.includes(index)
                    ? "bg-states-success text-text-onPrimary"
                    : index === currentStep
                      ? "bg-brand-primary text-text-onPrimary"
                      : "bg-border-default text-text-tertiary"
                }`}>
                  {completedSteps.includes(index) ? <CheckCircle className="h-3 w-3" /> : index + 1}
                </div>
                <span className={`text-sm ${
                  completedSteps.includes(index)
                    ? "text-states-success font-semibold"
                    : index === currentStep
                      ? "text-brand-primary font-semibold"
                      : "text-text-secondary"
                }`}>
                  {step}
                </span>
              </div>
              
              {index === currentStep && (
                <Button
                  size="sm"
                  onClick={() => handleStepComplete(index)}
                  className="h-8 px-3 rounded-lg bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary"
                >
                  Complete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-background-card1 p-4 rounded-xl">
        <h4 className="font-semibold text-text-primary mb-2">Expected Outcome</h4>
        <p className="text-sm text-text-secondary">{content.content.expectedOutcome}</p>
      </div>
    </div>
  )
}

// Quiz Content Component
function QuizContent({ content, onComplete }: { content: LearningContent; onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    content.content.questions.forEach((question: any, index: number) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return (correct / content.content.questions.length) * 100
  }

  if (showResults) {
    const score = calculateScore()
    const passed = score >= content.content.passingScore

    return (
      <div className="space-y-4">
        <div className={`text-center p-6 rounded-xl ${
          passed ? "bg-background-card2" : "bg-background-card3"
        }`}>
          <div className={`text-4xl font-bold mb-2 ${
            passed ? "text-brand-secondary" : "text-states-error"
          }`}>
            {Math.round(score)}%
          </div>
          <h3 className="font-semibold text-text-primary mb-2">
            {passed ? "Congratulations! You passed!" : "Keep practicing!"}
          </h3>
          <p className="text-sm text-text-secondary">
            Passing score: {content.content.passingScore}%
          </p>
        </div>

        <Button
          onClick={onComplete}
          className="w-full rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary"
        >
          Continue
        </Button>
      </div>
    )
  }

  const currentQuestionData = content.content.questions[currentQuestion]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">Question {currentQuestion + 1} of {content.content.questions.length}</h3>
        <Progress value={((currentQuestion + 1) / content.content.questions.length) * 100} className="w-32 h-2" />
      </div>

      <div className="space-y-4">
        <div className="bg-background-surface p-4 rounded-xl">
          <p className="text-text-primary">{currentQuestionData.question}</p>
        </div>

        <div className="space-y-2">
          {currentQuestionData.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswers[currentQuestion] === index
                  ? "border-brand-primary bg-background-card1"
                  : "border-border-default hover:border-border-active"
              }`}
            >
              <span className="text-sm text-text-primary">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="rounded-xl"
        >
          Previous
        </Button>

        {currentQuestion === content.content.questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswers.length < content.content.questions.length}
            className="rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  )
}

// Discussion Content Component
function DiscussionContent({ content, onComplete }: { content: LearningContent; onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-background-card1 p-4 rounded-xl">
        <h3 className="font-semibold text-text-primary mb-2">Discussion Topic</h3>
        <p className="text-sm text-text-secondary">{content.content.topic}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-text-primary">Recent Posts</h4>
          <div className="flex items-center space-x-2 text-sm text-text-tertiary">
            <Users className="h-4 w-4" />
            <span>{content.content.participants} participants</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* Mock discussion posts */}
          {[1, 2, 3].map((post) => (
            <div key={post} className="bg-background-surface p-3 rounded-lg">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">U{post}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold text-text-primary">User {post}</span>
                    <span className="text-xs text-text-tertiary">2 hours ago</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    This is a sample discussion post about {content.content.topic.toLowerCase()}...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={onComplete}
        className="w-full rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary"
      >
        Join Discussion
      </Button>
    </div>
  )
} 