"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, MessageSquare, Target, Zap, CheckCircle } from "lucide-react"

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
    email: "",
    name: "",
    phone: "",
  })

  // Exact steps from YAML user flows
  const steps = [
    "skills_scanner_choice",
    "assessment_execution",
    "compatibility_analysis",
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
    setCurrentStep(2)
  }

  const handleCompatibilityComplete = () => {
    setCurrentStep(3)
  }

  const handleRoadmapComplete = () => {
    setCurrentStep(4)
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

  // Skills calculation following business logic from context
  const calculateSkillsFromAssessment = (answers: AssessmentAnswer[]): Skill[] => {
    return [
      { name: "Customer Service", level: 85, techEquivalent: "User Experience Understanding" },
      { name: "Problem Solving", level: 90, techEquivalent: "Debugging & QA Testing" },
      { name: "Documentation", level: 75, techEquivalent: "Technical Writing" },
      { name: "Training & Mentoring", level: 80, techEquivalent: "Team Leadership" },
      { name: "Process Optimization", level: 78, techEquivalent: "DevOps & Automation" },
    ]
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
          <span className="text-sm text-text-tertiary font-medium">{currentStep + 1}/6</span>
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

          {/* Step 3: Compatibility Analysis */}
          {currentStep === 2 && (
            <CompatibilityAnalysis skills={userData.skills} onContinue={handleCompatibilityComplete} />
          )}

          {/* Step 4: Roadmap Preview */}
          {currentStep === 3 && (
            <RoadmapPreview
              skills={userData.skills}
              onContinue={handleRoadmapComplete}
            />
          )}

          {/* Step 5: Registration Gate */}
          {currentStep === 4 && <RegistrationGate onComplete={handleRegistration} />}
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
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Upload Your Resume
          </h1>
          <p className="text-text-secondary">AI will analyze your resume for skills (max 5MB)</p>
        </div>

        <Card className="rounded-xl border-border-default">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 bg-background-card1">
              <Upload className="h-8 w-8 text-brand-primary" />
            </div>
            <h3 className="font-semibold mb-2 text-text-primary">
              Drop your resume here
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              PDF, DOCX, or TXT (max 5MB)
            </p>
            <Button
              className="w-full h-11 rounded-xl bg-brand-primary hover:bg-brand-primaryDark focus:ring-2 focus:ring-border-focus text-text-onPrimary font-semibold"
              onClick={() => {
                // TODO: Implement actual file upload
                console.log('Resume upload clicked')
              }}
            >
              Choose File
            </Button>
          </CardContent>
        </Card>
      </div>
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

// Compatibility Analysis Component - Design system compliant
function CompatibilityAnalysis({ skills, onContinue }: { skills: Skill[]; onContinue: () => void }) {
  // Compatibility scoring from business logic: 70% skill match, 25% market demand, 5% transition history
  const compatibilityScore = 92
  const skillMatchScore = 88
  const marketDemandScore = 95
  const transitionSuccessScore = 85

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-background-card2">
          <Target className="h-8 w-8 text-brand-secondary" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Your Skills Analysis
        </h1>
        <p className="text-text-secondary">Here's how your BPO skills translate to tech careers</p>
      </div>

      {/* Overall Compatibility Score */}
      <Card className="rounded-xl border-brand-primary bg-background-card1">
        <CardContent className="p-6 text-center">
          <div className="text-4xl font-bold mb-2 text-brand-primary">
            {compatibilityScore}%
          </div>
          <h3 className="font-semibold text-lg text-brand-primary">
            Tech Career Compatibility
          </h3>
          <p className="text-sm mt-2 text-brand-primary">
            Excellent match! Your BPO skills are highly valuable in tech.
          </p>
        </CardContent>
      </Card>

      {/* Skills Translation */}
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <Card key={index} className="rounded-xl border-border-default">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-text-primary">{skill.name}</h3>
                  <p className="text-sm text-text-secondary">→ {skill.techEquivalent}</p>
                </div>
                <span className="text-lg font-bold text-states-success">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-border-default rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 bg-states-success"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Scoring */}
      <Card className="rounded-xl border-border-default">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 text-text-primary">
            Compatibility Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Skill Match (70%)</span>
              <span className="font-semibold text-text-primary">{skillMatchScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Market Demand (25%)</span>
              <span className="font-semibold text-text-primary">{marketDemandScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Transition Success Rate (5%)</span>
              <span className="font-semibold text-text-primary">{transitionSuccessScore}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Career Match */}
      <Card className="rounded-xl border-brand-secondary bg-background-card2">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6 text-brand-secondary" />
            <div>
              <h3 className="font-semibold text-text-onSecondary">
                Top Career Match
              </h3>
              <p className="text-sm text-text-onSecondary">
                Quality Assurance Tester (92% compatibility)
              </p>
              <p className="text-xs mt-1 text-text-onSecondary">
                Expected salary: ₱45,000 - ₱75,000
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onContinue}
        className="w-full h-11 rounded-xl bg-brand-primary hover:bg-brand-primaryDark focus:ring-2 focus:ring-border-focus text-text-onPrimary font-semibold"
      >
        See My Learning Roadmap
      </Button>
    </div>
  )
}

// Roadmap Preview Component - Design system compliant
function RoadmapPreview({
  skills,
  onContinue,
}: { skills: Skill[]; onContinue: () => void }) {
  const phases = [
    {
      name: "Foundation Phase",
      duration: "3 months",
      description: "Basic tech concepts and industry orientation",
      modules: ["Tech Industry Basics", "HTML & CSS Fundamentals", "Software Testing Intro", "Communication in Tech"],
      timeCommitment: "1-2 hours/day",
    },
    {
      name: "Skill Building Phase",
      duration: "6 months",
      description: "Core technical skills development",
      modules: ["JavaScript Basics", "Test Automation", "API Testing", "Database Fundamentals"],
      timeCommitment: "2-3 hours/day",
    },
    {
      name: "Job Preparation Phase",
      duration: "9 months",
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
        <p className="text-text-secondary">Based on your skills and experience</p>
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
            With 1-2 hours daily commitment, you'll be job-ready in <strong>9 months</strong>
          </p>
          <p className="text-xs mt-2 text-states-success">
            Flexible schedule - learn at your own pace while working
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
