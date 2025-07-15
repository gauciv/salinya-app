"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Lock, Clock, Target } from "lucide-react"

interface RoadmapVisualizationProps {
  userProgress?: number
  currentPhase?: string
}

export default function RoadmapVisualization({
  userProgress = 32,
  currentPhase = "foundation",
}: RoadmapVisualizationProps) {
  const phases = [
    {
      id: "foundation",
      name: "Foundation Phase",
      duration: "3 months",
      description: "Basic tech concepts and industry orientation",
      status: "current",
      progress: 65,
      modules: [
        { name: "Tech Industry Basics", completed: true },
        { name: "HTML & CSS Fundamentals", completed: true },
        { name: "Software Testing Intro", completed: false, current: true },
        { name: "Communication in Tech", completed: false },
      ],
    },
    {
      id: "skill-building",
      name: "Skill Building Phase",
      duration: "6 months",
      description: "Core technical skills development",
      status: "locked",
      progress: 0,
      modules: [
        { name: "JavaScript Basics", completed: false },
        { name: "Test Automation", completed: false },
        { name: "API Testing", completed: false },
        { name: "Database Fundamentals", completed: false },
      ],
    },
    {
      id: "job-prep",
      name: "Job Preparation Phase",
      duration: "9 months",
      description: "Portfolio building and interview preparation",
      status: "locked",
      progress: 0,
      modules: [
        { name: "Portfolio Development", completed: false },
        { name: "Interview Preparation", completed: false },
        { name: "Salary Negotiation", completed: false },
        { name: "Job Application Strategy", completed: false },
      ],
    },
  ]

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case "current":
        return <Circle className="h-6 w-6 text-blue-600" />
      default:
        return <Lock className="h-6 w-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "current":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Simple Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Tech Journey</span>
            <Badge variant="secondary">Week 3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{userProgress}%</span>
              </div>
              <Progress value={userProgress} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-xs text-gray-600">Modules Completed</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">45h</div>
                <div className="text-xs text-gray-600">Time Invested</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Visualization */}
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <Card key={phase.id} className={`${phase.status === "current" ? "ring-2 ring-blue-200" : ""}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getPhaseIcon(phase.status)}
                  <div>
                    <CardTitle className="text-lg">{phase.name}</CardTitle>
                    <p className="text-sm text-gray-600">{phase.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(phase.status)}>
                    {phase.status === "current" ? "Active" : phase.status === "completed" ? "Done" : "Locked"}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{phase.duration}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {phase.status !== "locked" && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Phase Progress</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    {phase.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          {module.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : module.current ? (
                            <Clock className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-400" />
                          )}
                          <span
                            className={`text-sm ${module.completed ? "text-green-700" : module.current ? "text-blue-700" : "text-gray-600"}`}
                          >
                            {module.name}
                          </span>
                        </div>
                        {module.current && (
                          <Badge variant="secondary" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>

                  {phase.status === "current" && <Button className="w-full mt-3">Continue Learning</Button>}
                </div>
              )}

              {phase.status === "locked" && (
                <div className="text-center py-4">
                  <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Complete previous phase to unlock</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simple Career Readiness Indicator */}
      <Card className="bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Job Readiness Score</h3>
              <p className="text-sm text-gray-600">Based on your progress and skills</p>
              <div className="flex items-center space-x-2 mt-2">
                <Progress value={68} className="flex-1 h-2" />
                <span className="text-lg font-bold text-blue-600">68%</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Magaling!</strong> You're making excellent progress. Complete 2 more modules to reach job-ready
              status.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
