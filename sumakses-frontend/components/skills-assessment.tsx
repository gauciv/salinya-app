"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  TrendingUp,
  CheckCircle,
  MessageSquare,
  Upload,
  Zap,
  ArrowRight,
  Play,
  RotateCcw,
  Download,
} from "lucide-react"

interface SkillsAssessmentProps {
  onComplete: (assessmentData: any) => void
  type: "resume_upload" | "interactive_assessment"
}

interface Skill {
  name: string
  level: number
  techEquivalent: string
  category: string
}

interface CareerMatch {
  title: string
  compatibilityScore: number
  salaryRange: string
  jobExamples: string[]
  description: string
  icon: string
}

export default function SkillsAssessment({ onComplete, type }: SkillsAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [assessmentData, setAssessmentData] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)

  // Assessment steps following SALINYA context
  const assessmentSteps = [
    { name: "Analyzing your skills...", icon: "🔍", duration: 2000 },
    { name: "Checking market demand...", icon: "📈", duration: 1500 },
    { name: "Calculating compatibility...", icon: "🎯", duration: 1000 },
    { name: "Finding your perfect match...", icon: "✨", duration: 1500 },
  ]

  // Skills categories from SALINYA context
  const skillsCategories = [
    "communication",
    "problem_solving", 
    "technical_aptitude",
    "process_optimization",
    "customer_service",
    "documentation",
    "training_mentoring"
  ]

  // Career matches from SALINYA context
  const careerMatches: CareerMatch[] = [
    {
      title: "Quality Assurance Tester",
      compatibilityScore: 92,
      salaryRange: "₱45,000 - ₱75,000",
      jobExamples: ["Software Testing", "Test Automation", "Quality Control"],
      description: "Perfect for your attention to detail and process optimization skills",
      icon: "🔍"
    },
    {
      title: "Technical Writer",
      compatibilityScore: 88,
      salaryRange: "₱40,000 - ₱65,000",
      jobExamples: ["Documentation", "User Guides", "API Documentation"],
      description: "Great match for your documentation and communication skills",
      icon: "📝"
    },
    {
      title: "Customer Success Manager",
      compatibilityScore: 85,
      salaryRange: "₱50,000 - ₱80,000",
      jobExamples: ["Customer Support", "Account Management", "Product Training"],
      description: "Excellent fit for your customer service and training experience",
      icon: "💬"
    },
    {
      title: "Product Manager",
      compatibilityScore: 82,
      salaryRange: "₱60,000 - ₱100,000",
      jobExamples: ["Product Strategy", "Team Leadership", "Process Management"],
      description: "Strong match for your leadership and process optimization skills",
      icon: "📊"
    },
    {
      title: "UX/UI Designer",
      compatibilityScore: 78,
      salaryRange: "₱45,000 - ₱70,000",
      jobExamples: ["User Research", "Interface Design", "User Experience"],
      description: "Good fit for your customer empathy and problem-solving skills",
      icon: "🎨"
    },
    {
      title: "Software Developer",
      compatibilityScore: 75,
      salaryRange: "₱50,000 - ₱90,000",
      jobExamples: ["Web Development", "Mobile Apps", "Backend Systems"],
      description: "Solid foundation with room for technical skill development",
      icon: "💻"
    },
    {
      title: "Data Analyst",
      compatibilityScore: 72,
      salaryRange: "₱40,000 - ₱65,000",
      jobExamples: ["Data Processing", "Reporting", "Business Intelligence"],
      description: "Good match for your analytical and documentation skills",
      icon: "📊"
    },
    {
      title: "DevOps Engineer",
      compatibilityScore: 70,
      salaryRange: "₱55,000 - ₱95,000",
      jobExamples: ["System Administration", "Automation", "Infrastructure"],
      description: "Strong potential with technical troubleshooting background",
      icon: "⚙️"
    }
  ]

  // Mock skills data based on BPO experience
  const mockSkills: Skill[] = [
    { name: "Customer Service", level: 85, techEquivalent: "User Experience Understanding", category: "customer_service" },
    { name: "Problem Solving", level: 90, techEquivalent: "Debugging & QA Testing", category: "problem_solving" },
    { name: "Documentation", level: 75, techEquivalent: "Technical Writing", category: "documentation" },
    { name: "Training & Mentoring", level: 80, techEquivalent: "Team Leadership", category: "training_mentoring" },
    { name: "Process Optimization", level: 78, techEquivalent: "DevOps & Automation", category: "process_optimization" },
    { name: "Communication", level: 88, techEquivalent: "Stakeholder Management", category: "communication" },
    { name: "Technical Troubleshooting", level: 72, techEquivalent: "System Analysis", category: "technical_aptitude" },
  ]

  useEffect(() => {
    if (type === "resume_upload") {
      handleResumeUpload()
    }
  }, [type])

  const handleResumeUpload = () => {
    setIsProcessing(true)
    setCurrentStep(0)
    
    // Simulate AI processing steps
    const runAssessment = async () => {
      for (let i = 0; i < 6; i++) {
        setCurrentStep(i)
        await new Promise((resolve) => setTimeout(resolve, assessmentSteps[i].duration))
      }
      
      // Generate assessment results
      const results = {
        skills: mockSkills,
        careerMatches: careerMatches.slice(0, 3), // Top 3 matches
        compatibilityScore: 92,
        skillMatchScore: 88,
        marketDemandScore: 95,
        transitionSuccessScore: 85,
        assessmentType: type,
        timestamp: new Date().toISOString()
      }
      
      setAssessmentData(results)
      setIsProcessing(false)
      setShowResults(true)
    }

    runAssessment()
  }

  const handleInteractiveAssessment = () => {
    // This would launch the interactive questionnaire
    onComplete({ type: "interactive_assessment", nextStep: "questionnaire" })
  }

  if (isProcessing) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
            <Target className="h-12 w-12 text-text-onPrimary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            🤖 AI Analysis in Progress
          </h1>
          <p className="text-xl text-text-secondary animate-pulse">
            {assessmentSteps[currentStep].icon} {assessmentSteps[currentStep].name}
          </p>
        </div>

        <Card className="rounded-xl border-border-default">
          <CardContent className="p-6">
            <div className="space-y-4">
              {assessmentSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < currentStep
                        ? "bg-states-success"
                        : index === currentStep
                          ? "bg-brand-primary animate-pulse"
                          : "bg-border-default"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-5 w-5 text-text-onPrimary" />
                    ) : (
                      <span className="text-text-onPrimary text-sm">{index + 1}</span>
                    )}
                  </div>
                  <span className={`${index <= currentStep ? "text-text-primary" : "text-text-tertiary"}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults && assessmentData) {
    return (
      <SkillsAssessmentResults 
        data={assessmentData} 
        onComplete={onComplete}
        onRetake={() => {
          setShowResults(false)
          setIsProcessing(false)
          setCurrentStep(0)
        }}
      />
    )
  }

  if (type === "resume_upload") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            🚀 AI Resume Scanner
          </h1>
          <p className="text-text-secondary">Drop your resume and watch the magic happen!</p>
        </div>

        <Card className="rounded-xl border-2 border-dashed border-border-default hover:border-border-active transition-all duration-300">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Upload className="h-12 w-12 text-text-onPrimary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Drop your resume here</h3>
            <p className="text-text-secondary mb-6">PDF, DOCX, or TXT (max 5MB)</p>
            <Button
              className="h-12 px-8 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary font-semibold"
              onClick={handleResumeUpload}
            >
              <Upload className="h-5 w-5 mr-2" />
              Choose File
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border-default bg-background-card1">
          <CardContent className="p-6">
            <h3 className="font-semibold text-text-primary mb-3">What we'll analyze:</h3>
            <div className="space-y-2">
              {skillsCategories.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-states-success" />
                  <span className="text-sm text-text-secondary capitalize">
                    {category.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          🧠 Smart Assessment
        </h1>
        <p className="text-text-secondary">Answer 15 questions about your experience</p>
      </div>

      <Card className="rounded-xl border-border-default">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-brand-secondary to-brand-accent rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="h-8 w-8 text-text-onPrimary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Interactive Assessment</h3>
              <p className="text-sm text-text-secondary mb-4">
                Answer questions about your BPO experience to get personalized career recommendations
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-background-card2 p-3 rounded-lg">
                <div className="text-lg font-bold text-brand-secondary">15</div>
                <div className="text-xs text-text-secondary">Questions</div>
              </div>
              <div className="bg-background-card3 p-3 rounded-lg">
                <div className="text-lg font-bold text-brand-accent">5 min</div>
                <div className="text-xs text-text-secondary">Estimated Time</div>
              </div>
            </div>

            <Button
              className="w-full h-12 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary font-semibold"
              onClick={handleInteractiveAssessment}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Skills Assessment Results Component
function SkillsAssessmentResults({ 
  data, 
  onComplete, 
  onRetake 
}: { 
  data: any
  onComplete: (data: any) => void
  onRetake: () => void
}) {
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-states-success to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="h-12 w-12 text-text-onPrimary" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          🎉 Analysis Complete!
        </h1>
        <p className="text-text-secondary">Here's your personalized compatibility report</p>
      </div>

      {/* Overall Score */}
      <Card className="rounded-xl border-brand-primary bg-background-card1">
        <CardContent className="p-8 text-center">
          <div className="text-6xl font-bold mb-2 text-brand-primary animate-pulse">
            {data.compatibilityScore}%
          </div>
          <h3 className="text-2xl font-bold mb-2 text-brand-primary">
            Tech Career Compatibility
          </h3>
          <p className="text-sm text-brand-primary">
            🚀 Excellent match! You're destined for tech success!
          </p>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="rounded-xl border-border-default">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-text-primary">🎯 Skill Match</span>
                <span className="text-sm text-text-tertiary ml-2">(70% weight)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-border-default rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-2000 bg-brand-primary"
                    style={{ width: `${data.skillMatchScore}%` }}
                  />
                </div>
                <span className="font-semibold text-brand-primary">{data.skillMatchScore}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border-default">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-text-primary">📈 Market Demand</span>
                <span className="text-sm text-text-tertiary ml-2">(25% weight)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-border-default rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-2000 bg-brand-secondary"
                    style={{ width: `${data.marketDemandScore}%` }}
                  />
                </div>
                <span className="font-semibold text-brand-secondary">{data.marketDemandScore}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border-default">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-text-primary">🎪 Transition Success</span>
                <span className="text-sm text-text-tertiary ml-2">(5% weight)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-border-default rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-2000 bg-brand-accent"
                    style={{ width: `${data.transitionSuccessScore}%` }}
                  />
                </div>
                <span className="font-semibold text-brand-accent">{data.transitionSuccessScore}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Translation */}
      <Card className="rounded-xl border-border-default">
        <CardHeader>
          <CardTitle className="text-lg text-text-primary">Your Skills Translation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.skills.map((skill: Skill, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background-surfaceAlt">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-background-card1 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{skill.name}</h3>
                    <p className="text-sm text-text-secondary">→ {skill.techEquivalent}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-states-success">{skill.level}%</span>
                  <div className="w-20 bg-border-default rounded-full h-2 mt-1">
                    <div
                      className="h-2 rounded-full bg-states-success transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card className="rounded-xl border-border-default">
        <CardHeader>
          <CardTitle className="text-lg text-text-primary">Top Career Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.careerMatches.map((career: CareerMatch, index: number) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedCareer?.title === career.title 
                    ? "border-brand-primary bg-background-card1" 
                    : "border-border-default hover:border-border-active"
                }`}
                onClick={() => setSelectedCareer(career)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{career.icon}</div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{career.title}</h3>
                      <p className="text-sm text-text-secondary">{career.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-brand-primary">{career.compatibilityScore}%</div>
                    <div className="text-sm text-text-secondary">{career.salaryRange}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-brand-secondary" />
                    <span className="text-sm text-text-secondary">Salary Range: {career.salaryRange}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {career.jobExamples.map((example, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => onComplete(data)}
          className="w-full h-12 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary font-semibold"
          disabled={!selectedCareer}
        >
          <ArrowRight className="h-5 w-5 mr-2" />
          Continue with {selectedCareer?.title || "Career Path"}
        </Button>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onRetake}
            className="flex-1 h-12 rounded-xl border-border-default hover:bg-background-surfaceAlt text-text-primary"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Retake
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl border-border-default hover:bg-background-surfaceAlt text-text-primary"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  )
} 