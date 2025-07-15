"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, MessageSquare, Target, Zap, CheckCircle } from "lucide-react"
import EnhancedResumeUpload from "./enhanced-resume-upload"

interface OnboardingFlowProps {
  onComplete: (userData: any) => void
  onBack: () => void
}

interface Skill {
  name: string
  level: number
  techEquivalent: string
}

interface AssessmentAnswer {
  questionId: number
  answer: any
  category: string
}

interface UserData {
  assessmentType: string
  assessmentAnswers: AssessmentAnswer[]
  skills: Skill[]
  analysisResults?: any
  email: string
  name: string
  phone: string
}

export default function OnboardingFlow({ onComplete, onBack }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<UserData>({
    assessmentType: "",
    assessmentAnswers: [],
    skills: [],
    analysisResults: null,
    email: "",
    name: "",
    phone: "",
  })

  // Exact steps from YAML user flows
  const steps = [
    "skills_scanner_choice",
    "assessment_execution",
    "roadmap_preview",
    "registration_gate",
  ]
  const progress = ((currentStep + 1) / steps.length) * 100



  // Exact 15 assessment questions from context - 5 categories
  const assessmentQuestions = [
    // Experience Category (3 questions)
    {
      id: 1,
      category: "experience",
      question: "Gaano ka katagal sa BPO industry?",
      type: "multiple_choice",
      options: ["Less than 1 year", "1-2 years", "3-5 years", "5+ years"],
    },
    {
      id: 2,
      category: "experience",
      question: "Anong type ng customer issues ang madalas mong handle?",
      type: "multiple_choice",
      options: ["Technical troubleshooting", "Billing inquiries", "Product information", "Complaints resolution"],
    },
    {
      id: 3,
      category: "experience",
      question: "Have you ever trained new team members?",
      type: "yes_no",
    },

    // Skills Category (3 questions)
    {
      id: 4,
      category: "skills",
      question: "How comfortable are you with learning new software?",
      type: "rating",
      scale: 5,
    },
    {
      id: 5,
      category: "skills",
      question: "Do you document processes or create guides?",
      type: "yes_no",
    },
    {
      id: 6,
      category: "skills",
      question: "Rate your problem-solving skills",
      type: "rating",
      scale: 5,
    },

    // Preferences Category (3 questions)
    {
      id: 7,
      category: "preferences",
      question: "What type of work environment do you prefer?",
      type: "multiple_choice",
      options: ["Individual work", "Team collaboration", "Mix of both", "Leadership role"],
    },
    {
      id: 8,
      category: "preferences",
      question: "How many hours per week can you dedicate to learning?",
      type: "multiple_choice",
      options: ["1-5 hours", "6-10 hours", "11-15 hours", "16+ hours"],
    },
    {
      id: 9,
      category: "preferences",
      question: "What's your preferred learning style?",
      type: "multiple_choice",
      options: ["Video tutorials", "Reading materials", "Hands-on practice", "Interactive courses"],
    },

    // Technical Aptitude Category (3 questions)
    {
      id: 10,
      category: "technical_aptitude",
      question: "Have you used any CRM or ticketing systems?",
      type: "yes_no",
    },
    {
      id: 11,
      category: "technical_aptitude",
      question: "Rate your comfort level with computers",
      type: "rating",
      scale: 5,
    },
    {
      id: 12,
      category: "technical_aptitude",
      question: "Have you ever created reports or analyzed data?",
      type: "yes_no",
    },

    // Communication Category (3 questions)
    {
      id: 13,
      category: "communication",
      question: "Rate your English communication skills",
      type: "rating",
      scale: 5,
    },
    {
      id: 14,
      category: "communication",
      question: "Have you handled escalated customer issues?",
      type: "yes_no",
    },
    {
      id: 15,
      category: "communication",
      question: "Do you feel comfortable explaining technical concepts?",
      type: "rating",
      scale: 5,
    },
  ]



  const handleAssessmentChoice = (type: string) => {
    setUserData((prev) => ({ ...prev, assessmentType: type }))
    setCurrentStep(1)
  }

  const handleAssessmentComplete = (answers: AssessmentAnswer[]) => {
    // Calculate skills based on answers - following business logic from context
    const calculatedSkills = calculateSkillsFromAssessment(answers)
    setUserData((prev) => ({ ...prev, assessmentAnswers: answers, skills: calculatedSkills }))
    setCurrentStep(2) // Skip compatibility analysis, go directly to roadmap
  }

  const handleRoadmapComplete = () => {
    setCurrentStep(3)
  }

  const handleRegistration = (formData: any) => {
    const completeUserData = { ...userData, ...formData }
    onComplete(completeUserData)
  }

  const goBack = () => {
    if (currentStep === 0) {
      onBack()
    } else {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Skills calculation from real assessment answers
  const calculateSkillsFromAssessment = (answers: AssessmentAnswer[]): Skill[] => {
    const skillMap: { [key: string]: { level: number; techEquivalent: string } } = {}
    
    answers.forEach(answer => {
      switch (answer.category) {
        case "experience":
          if (answer.questionId === 1) {
            const experienceLevel = typeof answer.answer === 'string' && answer.answer.includes('5+') ? 90 : 
                                   typeof answer.answer === 'string' && answer.answer.includes('3-5') ? 80 : 
                                   typeof answer.answer === 'string' && answer.answer.includes('1-2') ? 70 : 60
            skillMap["Customer Service"] = { level: experienceLevel, techEquivalent: "User Experience Understanding" }
          }
          break
        case "skills":
          if (answer.questionId === 4 && typeof answer.answer === 'number') {
            skillMap["Problem Solving"] = { level: answer.answer * 20, techEquivalent: "Debugging & QA Testing" }
          }
          if (answer.questionId === 6 && typeof answer.answer === 'number') {
            skillMap["Documentation"] = { level: answer.answer * 18, techEquivalent: "Technical Writing" }
          }
          break
        case "technical_aptitude":
          if (answer.questionId === 10) {
            const hasExperience = answer.answer === "yes" ? 85 : 60
            skillMap["Technical Systems"] = { level: hasExperience, techEquivalent: "System Administration" }
          }
          break
        case "communication":
          if (answer.questionId === 13 && typeof answer.answer === 'number') {
            skillMap["Communication"] = { level: answer.answer * 19, techEquivalent: "Technical Communication" }
          }
          break
      }
    })
    
    // Convert to array format
    return Object.entries(skillMap).map(([name, data]) => ({
      name,
      level: data.level,
      techEquivalent: data.techEquivalent
    }))
  }

  return (
    <div className="min-h-screen bg-background-app">
      {/* Header with design system spacing and styling */}
      <header className="px-4 py-4 bg-background-surface shadow-sm border-b border-border-default">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button 
            variant="ghost" 
            onClick={goBack}
            className="h-11 w-11 rounded-xl hover:bg-background-surfaceAlt focus:ring-2 focus:ring-border-focus p-0"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-text-secondary" />
          </Button>
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-2 rounded-full" />
          </div>
          <span className="text-sm text-text-tertiary font-medium">{currentStep + 1}/{steps.length}</span>
        </div>
      </header>

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Step 1: Skills Scanner Choice - Design system compliant */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  How would you like to get started?
                </h1>
                <p className="text-text-secondary">Choose your preferred method to analyze your skills</p>
              </div>

              <div className="space-y-4">
                <Card
                  className="cursor-pointer transition-all duration-200 hover:shadow-md active:shadow-sm focus:ring-2 focus:ring-border-focus rounded-xl border-border-default hover:border-border-active"
                  onClick={() => handleAssessmentChoice("resume_upload")}
                  onKeyDown={(e) => e.key === 'Enter' && handleAssessmentChoice("resume_upload")}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload resume for skills assessment"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-background-card1">
                        <Upload className="h-6 w-6 text-brand-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary">Upload Resume</h3>
                        <p className="text-sm text-text-secondary mt-1">
                          AI analyzes your resume for skills (2 minutes)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer transition-all duration-200 hover:shadow-md active:shadow-sm focus:ring-2 focus:ring-border-focus rounded-xl border-border-default hover:border-border-active"
                  onClick={() => handleAssessmentChoice("smart_assessment")}
                  onKeyDown={(e) => e.key === 'Enter' && handleAssessmentChoice("smart_assessment")}
                  tabIndex={0}
                  role="button"
                  aria-label="Take smart assessment"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-background-card2">
                        <Target className="h-6 w-6 text-brand-secondary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary">Smart Assessment</h3>
                        <p className="text-sm text-text-secondary mt-1">
                          Interactive questions about your experience (5 minutes)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: Assessment Execution */}
          {currentStep === 1 && (
            <AssessmentComponent
              type={userData.assessmentType}
              questions={assessmentQuestions}
              onComplete={handleAssessmentComplete}
            />
          )}

          {/* Step 3: Roadmap Preview */}
          {currentStep === 2 && (
            <RoadmapPreview
              skills={userData.skills}
              userData={userData}
              onContinue={handleRoadmapComplete}
            />
          )}

          {/* Step 4: Registration Gate */}
          {currentStep === 3 && <RegistrationGate onComplete={handleRegistration} />}
        </div>
      </div>
    </div>
  )
}

// Assessment Component - Design system compliant
function AssessmentComponent({
  type,
  questions,
  onComplete,
}: {
  type: string
  questions: any[]
  onComplete: (answers: AssessmentAnswer[]) => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([])

  const handleAnswer = (answer: any) => {
    const newAnswers = [
      ...answers,
      { questionId: questions[currentQuestion].id, answer, category: questions[currentQuestion].category },
    ]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  if (type === "resume_upload") {
    return (
      <EnhancedResumeUpload
        onComplete={(resumeData) => {
          // Convert resume analysis to assessment format and store real data
          const analysisResults = resumeData.analysisResults
          if (analysisResults && analysisResults.compatibility_score) {
            // Store real AI analysis results
            setUserData(prev => ({ 
              ...prev, 
              analysisResults,
              skills: analysisResults.top_technical_skills_found?.map((skill: string, index: number) => ({
                name: skill,
                level: Math.max(60, analysisResults.compatibility_score - (index * 5)),
                techEquivalent: `Tech ${skill}`
              })) || []
            }))
            // Create minimal assessment answers to maintain flow
            const answers: AssessmentAnswer[] = [
              { questionId: 1, answer: analysisResults.compatibility_score > 80 ? "5+ years" : "3-5 years", category: "experience" },
            ]
            onComplete(answers)
          } else {
            onComplete([])
          }
        }}
        onSkip={() => {
          // Skip to manual assessment
          onComplete([])
        }}
      />
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Smart Assessment
        </h1>
        <p className="text-text-secondary">
          Question {currentQuestion + 1} of {questions.length} • {question.category}
        </p>
        <div className="mt-4">
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2 rounded-full" />
        </div>
      </div>

      <Card className="rounded-xl border-border-default">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-text-primary">
            {question.question}
          </h3>

          {question.type === "multiple_choice" && (
            <div className="space-y-2">
              {question.options?.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start bg-background-surface hover:bg-background-surfaceAlt focus:ring-2 focus:ring-border-focus rounded-xl h-11 text-text-primary border-border-default hover:border-border-active"
                  onClick={() => handleAnswer(option)}
                  aria-label={`Select option: ${option}`}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {question.type === "yes_no" && (
            <div className="flex space-x-4">
              <Button
                className="flex-1 h-11 rounded-xl bg-brand-primary hover:bg-brand-primaryDark focus:ring-2 focus:ring-border-focus text-text-onPrimary font-semibold"
                onClick={() => handleAnswer("yes")}
                aria-label="Answer yes"
              >
                Yes
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-xl bg-background-surface hover:bg-background-surfaceAlt focus:ring-2 focus:ring-border-focus text-text-primary border-border-default hover:border-border-active"
                onClick={() => handleAnswer("no")}
                aria-label="Answer no"
              >
                No
              </Button>
            </div>
          )}

          {question.type === "rating" && (
            <div className="flex justify-between space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="outline"
                  className="w-12 h-12 rounded-xl bg-background-surface hover:bg-background-surfaceAlt focus:ring-2 focus:ring-border-focus text-text-primary border-border-default hover:border-border-active p-0"
                  onClick={() => handleAnswer(rating)}
                  aria-label={`Rate ${rating} out of 5`}
                >
                  {rating}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}



// Roadmap Preview Component - Design system compliant
function RoadmapPreview({
  skills,
  userData,
  onContinue,
}: { skills: Skill[]; userData: UserData; onContinue: () => void }) {
  // Use real AI analysis data when available
  const analysisResults = userData.analysisResults
  const compatibilityScore = analysisResults?.compatibility_score || 0
  const avgSkillLevel = skills.length > 0 ? skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length : compatibilityScore || 50
  const hasHighTechSkills = analysisResults?.top_technical_skills_found?.length > 3 || skills.some(skill => skill.name.toLowerCase().includes('technical') && skill.level > 75)
  
  const phases = [
    {
      name: "Foundation Phase",
      duration: hasHighTechSkills ? "2 months" : "3 months",
      description: avgSkillLevel > 75 ? "Advanced tech concepts and specialization" : "Basic tech concepts and industry orientation",
      modules: hasHighTechSkills ? 
        ["Advanced Programming Concepts", "System Design Basics", "DevOps Fundamentals", "Tech Leadership"] :
        ["Tech Industry Basics", "HTML & CSS Fundamentals", "Software Testing Intro", "Communication in Tech"],
      timeCommitment: "1-2 hours/day",
    },
    {
      name: "Skill Building Phase",
      duration: hasHighTechSkills ? "4 months" : "6 months",
      description: "Core technical skills development",
      modules: hasHighTechSkills ?
        ["Advanced JavaScript", "Cloud Technologies", "Database Design", "API Development"] :
        ["JavaScript Basics", "Test Automation", "API Testing", "Database Fundamentals"],
      timeCommitment: "2-3 hours/day",
    },
    {
      name: "Job Preparation Phase",
      duration: hasHighTechSkills ? "6 months" : "9 months",
      description: "Portfolio building and interview preparation",
      modules: ["Portfolio Development", "Interview Preparation", "Salary Negotiation", "Job Application Strategy"],
      timeCommitment: "1-2 hours/day",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Your Personalized Roadmap
        </h1>
        <p className="text-text-secondary">
          {analysisResults ? 'Based on AI analysis of your resume' : 'Based on your skills and experience'}
        </p>
        {analysisResults && (
          <div className="mt-4 p-4 bg-background-card1 rounded-xl">
            <div className="text-3xl font-bold text-brand-primary mb-1">
              {compatibilityScore}%
            </div>
            <p className="text-sm text-brand-primary">Tech Career Compatibility</p>
          </div>
        )}
      </div>

      {/* Timeline Visualization */}
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <Card key={index} className="rounded-xl border-border-default">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-brand-primary text-text-onPrimary">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-text-primary">{phase.name}</h3>
                      <p className="text-sm text-text-secondary">{phase.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-text-primary">{phase.duration}</p>
                      <p className="text-xs text-text-tertiary">{phase.timeCommitment}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {phase.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="text-xs text-text-secondary flex items-center">
                        <div className="w-1 h-1 bg-text-tertiary rounded-full mr-2"></div>
                        {module}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Time Commitment Calculator */}
      <Card className="rounded-xl border-states-success bg-background-card3">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 text-states-success">
            Estimated Timeline
          </h3>
          <p className="text-sm text-states-success">
            With 1-2 hours daily commitment, you'll be job-ready in <strong>{hasHighTechSkills ? '6' : avgSkillLevel > 70 ? '7-8' : '9'} months</strong>
          </p>
          <p className="text-xs mt-2 text-states-success">
            {hasHighTechSkills ? 'Fast-track available due to your technical background' : 'Flexible schedule - learn at your own pace while working'}
          </p>
        </CardContent>
      </Card>

      <Button
        onClick={onContinue}
        className="w-full h-11 rounded-xl bg-brand-primary hover:bg-brand-primaryDark focus:ring-2 focus:ring-border-focus text-text-onPrimary font-semibold"
      >
        Create My Account
      </Button>
    </div>
  )
}

// Registration Gate Component - Design system compliant
function RegistrationGate({ onComplete }: { onComplete: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-background-card2">
          <CheckCircle className="h-8 w-8 text-brand-secondary" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Create Your Account
        </h1>
        <p className="text-text-secondary">Join thousands of professionals making the switch</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-text-primary font-medium">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
            className="mt-2 h-11 rounded-xl border-border-default focus:border-border-focus focus:ring-2 focus:ring-border-focus bg-background-surface text-text-primary placeholder:text-text-tertiary"
            placeholder="Enter your full name"
            aria-describedby="name-help"
          />
          <p id="name-help" className="sr-only">Enter your full name as it appears on official documents</p>
        </div>

        <div>
          <Label htmlFor="email" className="text-text-primary font-medium">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="mt-2 h-11 rounded-xl border-border-default focus:border-border-focus focus:ring-2 focus:ring-border-focus bg-background-surface text-text-primary placeholder:text-text-tertiary"
            placeholder="your.email@example.com"
            aria-describedby="email-help"
          />
          <p id="email-help" className="sr-only">We'll send your personalized roadmap to this email</p>
        </div>

        <div>
          <Label htmlFor="phone" className="text-text-primary font-medium">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            required
            className="mt-2 h-11 rounded-xl border-border-default focus:border-border-focus focus:ring-2 focus:ring-border-focus bg-background-surface text-text-primary placeholder:text-text-tertiary"
            placeholder="+63 9XX XXX XXXX"
            aria-describedby="phone-help"
          />
          <p id="phone-help" className="sr-only">We'll send SMS updates about your learning progress</p>
        </div>

        <Button
          type="submit"
          className="w-full h-11 rounded-xl bg-brand-primary hover:bg-brand-primaryDark focus:ring-2 focus:ring-border-focus text-text-onPrimary font-semibold"
        >
          Start My Tech Journey!
        </Button>
      </form>

      <p className="text-xs text-text-tertiary text-center">
        By creating an account, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  )
}
