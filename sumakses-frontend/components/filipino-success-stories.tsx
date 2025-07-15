"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ChevronLeft, ChevronRight, MapPin, Calendar, TrendingUp } from "lucide-react"

export default function FilipinoSuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)


  const successStories = [
    {
      id: 1,
      name: "Maria Santos",
      age: 26,
      location: "Quezon City",
      previousRole: "Customer Service Representative",
      currentRole: "QA Tester",
      previousCompany: "Healthcare BPO",
      currentCompany: "Tech Startup",
      previousSalary: "₱22,000",
      currentSalary: "₱65,000",
      timeframe: "8 months",
      image: "/placeholder.svg?height=300&width=400",
      quote:
        "Hindi ko inakala na ang customer service skills ko ay magiging foundation ng tech career ko! Ang problem-solving at attention to detail na natuto ko sa BPO, perfect match sa software testing.",
      story:
        "Si Maria ay nag-start sa healthcare BPO handling insurance claims. Through SUMAKSES, natutunan niya na ang skills niya sa troubleshooting at documentation ay highly valuable sa tech industry.",
      keySkills: ["Problem Solving", "Attention to Detail", "Documentation", "Customer Focus"],
      advice:
        "Wag kayong matakot mag-try! Ang skills natin sa BPO ay sobrang valuable sa tech. Just need lang natin ng proper guidance.",
      superpower: "Bug Detective 🕵️‍♀️",
      funFact: "Maria now leads a team of 5 QA testers and mentors new BPO graduates!",
    },
    {
      id: 2,
      name: "Jose Mendoza",
      age: 32,
      location: "Cebu City",
      previousRole: "Team Leader",
      currentRole: "Product Manager",
      previousCompany: "Telecom BPO",
      currentCompany: "Fintech Company",
      previousSalary: "₱35,000",
      currentSalary: "₱95,000",
      timeframe: "6 months",
      image: "/placeholder.svg?height=300&width=400",
      quote:
        "My leadership experience in BPO was exactly what tech companies needed. Ang ability ko na mag-manage ng team at processes, naging competitive advantage ko sa product management.",
      story:
        "Si Jose ay may 8 years experience sa BPO, 3 years as team leader. Narealize niya na ang project management at team leadership skills niya ay perfect fit sa product management role.",
      keySkills: ["Team Leadership", "Project Management", "Process Optimization", "Stakeholder Management"],
      advice:
        "Don't underestimate your leadership skills. Tech companies need people who can manage teams and deliver results.",
      superpower: "Vision Architect 🏗️",
      funFact: "Jose's product has over 1 million users across Southeast Asia!",
    },
    {
      id: 3,
      name: "Ana Reyes",
      age: 28,
      location: "Davao City",
      previousRole: "Technical Support",
      currentRole: "DevOps Engineer",
      previousCompany: "Software Support BPO",
      currentCompany: "Cloud Services Company",
      previousSalary: "₱28,000",
      currentSalary: "₱85,000",
      timeframe: "10 months",
      image: "/placeholder.svg?height=300&width=400",
      quote:
        "Ang technical troubleshooting experience ko sa BPO naging stepping stone ko sa DevOps. Pareho lang naman - solving problems and making sure systems work smoothly.",
      story:
        "Si Ana ay nag-handle ng technical support para sa software company. Ang experience niya sa system troubleshooting at customer communication ay naging foundation niya sa DevOps career.",
      keySkills: ["Technical Troubleshooting", "System Analysis", "Customer Communication", "Process Automation"],
      advice:
        "If you're in technical support, you're already halfway to a tech career. Just need to level up your technical skills.",
      superpower: "Automation Wizard 🧙‍♀️",
      funFact: "Ana automated processes that save her company 40 hours per week!",
    },
  ]

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
  }



  const story = successStories[currentStory]
  const salaryIncrease = Math.round(
    (Number.parseInt(story.currentSalary.replace(/[₱,]/g, "")) /
      Number.parseInt(story.previousSalary.replace(/[₱,]/g, "")) -
      1) *
      100,
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success Stories</h2>
        <p className="text-gray-600">Real stories from Filipino BPO professionals</p>
      </div>

      <Card className="overflow-hidden">
        {/* Simple Story Header */}
        <div className="relative">
          <img src={story.image || "/placeholder.svg"} alt={story.name} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold">{story.name}</h3>
            <p className="text-sm opacity-90">
              {story.previousRole} → {story.currentRole}
            </p>
          </div>
          
          <Button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
          >
            <Play className="h-6 w-6 text-blue-600" />
          </Button>
        </div>

        <CardContent className="p-6">
          {/* Simple Key Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-lg font-bold text-green-600">+{salaryIncrease}%</span>
              </div>
              <p className="text-xs text-gray-600">Salary Increase</p>
              <p className="text-xs text-gray-500">
                {story.previousSalary} → {story.currentSalary}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-lg font-bold text-blue-600">{story.timeframe}</span>
              </div>
              <p className="text-xs text-gray-600">Transition Time</p>
              <div className="flex items-center justify-center mt-1">
                <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">{story.location}</span>
              </div>
            </div>
          </div>

          {/* Simple Quote */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm italic text-blue-900">"{story.quote}"</p>
          </div>

          {/* Story */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Ang Kanyang Journey</h4>
            <p className="text-sm text-gray-700">{story.story}</p>
          </div>

          {/* Key Skills */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Key Skills na Na-transfer</h4>
            <div className="flex flex-wrap gap-2">
              {story.keySkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Advice */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Advice para sa mga BPO Professionals</h4>
            <p className="text-sm text-orange-800">"{story.advice}"</p>
          </div>
        </CardContent>
      </Card>

      {/* Simple Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={prevStory} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex space-x-2">
          {successStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStory(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentStory ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <Button variant="outline" onClick={nextStory} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Simple CTA */}
      <Card className="bg-blue-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Write Your Success Story?</h3>
          <p className="text-blue-100 mb-4">
            Join {story.name} and thousands of other Filipino professionals who made the switch
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Start Your Journey Today
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
