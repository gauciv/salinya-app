"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ChevronLeft, ChevronRight, Star, Users, TrendingUp, Pause } from "lucide-react"

interface LandingPageProps {
  onStartJourney: () => void
  onLoginClick: () => void
}

export default function LandingPage({ onStartJourney, onLoginClick }: LandingPageProps) {
  const [currentStory, setCurrentStory] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Exact success stories from context - 3 videos, 30 seconds each
  const successStories = [
    {
      id: 1,
      name: "France Stantos",
      role: "Customer Service → Web Developer",
      company: "Healthcare BPO → Tech Startup",
      salary: "₱22K → ₱65K",
      duration: "8 months",
      location: "Quezon City",
      image: "/France.png?height=200&width=300",
      videoLength: 30,
      quote: "Hindi ko inakala na ang customer service skills ko ay magiging foundation ng tech career ko!",
      story:
        "From handling insurance claims to building websites - Maria's attention to detail and problem-solving skills from BPO became her superpower in web development.",
    },
    {
      id: 2,
      name: "Jose Mendoza",
      role: "Team Leader → Product Manager",
      company: "Telecom BPO → Fintech",
      salary: "₱35K → ₱95K",
      duration: "6 months",
      location: "Cebu City",
      image: "/Jose.png?height=200&width=300",
      videoLength: 30,
      quote: "My leadership experience in BPO was exactly what tech companies needed.",
      story:
        "Jose's 8 years of team management and process optimization in BPO translated perfectly to product management in the fintech industry.",
    },
    {
      id: 3,
      name: "Yurii Yankin",
      role: "Technical Support → QA Engineer",
      company: "Software Support BPO → Cloud Company",
      salary: "₱28K → ₱70K",
      duration: "7 months",
      location: "Davao City",
      image: "/Yuri.png?height=200&width=300",
      videoLength: 30,
      quote: "Troubleshooting customer issues prepared me perfectly for software testing!",
      story:
        "Ana's technical troubleshooting skills and systematic approach to problem-solving made her transition to QA engineering seamless.",
    },
  ]

  // Auto-play functionality for 30-second videos
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 100 / 30 // 30 seconds total
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
    setIsPlaying(false)
    setProgress(0)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
    setIsPlaying(false)
    setProgress(0)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setProgress(0)
    }
  }

  const handleLogin = () => {
    onLoginClick()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '120px' }}>
        {/* Hero Section */}
        <section className="px-4 py-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Pressure to grow, no room to breathe? <span className="text-blue-600">Not anymore.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Work and life relentless? Learning feels impossible? You have hidden skills. Find a path that fits your life.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Kumusta!</strong> Your BPO skills are perfect for tech careers. Let us show you how! 🇵🇭
              </p>
            </div>
          </div>
        </section>

        {/* Simple Success Stories */}
        <section className="px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Success Stories</h2>
              <p className="text-gray-600">Real stories from Filipino BPO professionals</p>
            </div>

            <div className="relative">
              <Card className="overflow-hidden" style={{ borderRadius: "12px" }}>
                <div className="relative">
                  <img
                    src={successStories[currentStory].image || "/placeholder.svg"}
                    alt={successStories[currentStory].name}
                    className="w-full h-48 object-fill"
                  />

                  {/* Video Progress Bar */}
                  {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                      <div
                        className="h-full transition-all duration-1000"
                        style={{ backgroundColor: "#EA580C", width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Simple Play/Pause Button */}
                  <Button
                    size="icon"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 text-blue-600" />
                    ) : (
                      <Play className="h-6 w-6 text-blue-600" />
                    )}
                  </Button>

                  {/* Video Duration */}
                  <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {successStories[currentStory].videoLength}s
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{successStories[currentStory].name}</h3>
                      <p className="text-sm text-gray-600">{successStories[currentStory].role}</p>
                      <p className="text-xs text-gray-500">{successStories[currentStory].location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        {successStories[currentStory].salary}
                      </p>
                      <p className="text-xs text-gray-500">{successStories[currentStory].duration}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 italic mb-3">"{successStories[currentStory].quote}"</p>
                  <p className="text-xs text-gray-600">{successStories[currentStory].story}</p>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-4" style={{ marginTop: "16px" }}>
                <Button variant="outline" size="icon" onClick={prevStory} className="rounded-full bg-transparent">
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex space-x-2" style={{ gap: "8px" }}>
                  {successStories.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentStory ? "bg-blue-600" : "bg-gray-300"}`}
                      style={{ backgroundColor: index === currentStory ? "#1E40AF" : "#D1D5DB" }}
                    />
                  ))}
                </div>

                <Button variant="outline" size="icon" onClick={nextStory} className="rounded-full bg-transparent">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Social Proof */}
        <section className="px-4 py-6 mb-6">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 mr-1 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">2K+</span>
                </div>
                <p className="text-sm text-gray-600">Career Changers</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 mr-1 text-green-600" />
                  <span className="text-2xl font-bold text-gray-900">150%</span>
                </div>
                <p className="text-sm text-gray-600">Avg Salary Increase</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 mr-1 text-orange-500" />
                  <span className="text-2xl font-bold text-gray-900">4.8</span>
                </div>
                <p className="text-sm text-gray-600">User Rating</p>
              </div>
            </div>
          </div>
        </section>
        {/* Simple Footer */}
      </div>
      {/* Fixed CTA Buttons at Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_16px_0_rgba(16,30,54,0.08)] px-4 py-4 z-50">
        <div className="max-w-md mx-auto flex flex-col gap-3 items-center w-full">
          <Button
            variant="outline"
            onClick={handleLogin}
            className="w-full border-blue-600 text-black hover:bg-blue-50 hover:text-blue-600 font-semibold"
            style={{ minHeight: "44px" }}
          >
            Already have an account?
          </Button>
          <Button
            onClick={onStartJourney}
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            style={{ minHeight: "44px" }}
          >
            🚀 Start My Journey - Get Instant Results!
          </Button>
        </div>
      </div>
    </div>
  )
}
