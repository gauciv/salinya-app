"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User } from "lucide-react"

interface LoginPageProps {
  onLoginSuccess: (userData: any) => void
  onBack: () => void
}

// Hardcoded user data for demo
const DEMO_USERS = [
  {
    id: "user_001",
    name: "Maria Santos",
    title: "QA Engineer",
    location: "Quezon City",
    email: "maria@example.com",
    password: "password123",
    xpPoints: 1250,
    achievements: ["First Steps", "Week Warrior", "Assessment Master"],
    currentPhase: "Skill Building",
    completedModules: 12,
    totalModules: 20,
    streakDays: 15,
    overallProgress: 75
  },
  {
    id: "user_002", 
    name: "Jose Mendoza",
    title: "Product Manager",
    location: "Cebu City",
    email: "jose@example.com",
    password: "password123",
    xpPoints: 2100,
    achievements: ["First Steps", "Week Warrior", "Assessment Master", "Community Helper", "Learning Champion"],
    currentPhase: "Specialization",
    completedModules: 18,
    totalModules: 20,
    streakDays: 28,
    overallProgress: 90
  },
  {
    id: "user_003",
    name: "Ana Reyes",
    title: "DevOps Engineer", 
    location: "Davao City",
    email: "ana@example.com",
    password: "password123",
    xpPoints: 1800,
    achievements: ["First Steps", "Week Warrior", "Assessment Master", "Technical Expert"],
    currentPhase: "Advanced Skills",
    completedModules: 15,
    totalModules: 20,
    streakDays: 22,
    overallProgress: 82
  }
]

export default function LoginPage({ onLoginSuccess, onBack }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if user exists
    const user = DEMO_USERS.find(u => u.email === email && u.password === password)

    if (user) {
      // Success - redirect to dashboard
      onLoginSuccess(user)
    } else {
      setError("Invalid email or password. Try: maria@example.com / password123")
    }

    setIsLoading(false)
  }

  const handleDemoLogin = (userIndex: number) => {
    const user = DEMO_USERS[userIndex]
    setEmail(user.email)
    setPassword(user.password)
    onLoginSuccess(user)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome Back!
            </CardTitle>
            <p className="text-gray-600">
              Continue your tech journey with SUMAKSES
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Demo Login Buttons */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center">Quick Demo Login:</p>
              <div className="grid grid-cols-1 gap-2">
                {DEMO_USERS.map((user, index) => (
                  <Button
                    key={user.id}
                    variant="outline"
                    onClick={() => handleDemoLogin(index)}
                    className="justify-start h-12 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                  >
                    <User className="h-4 w-4 mr-3 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.title}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or login manually</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Help Text */}
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                Demo accounts use password: <code className="bg-gray-100 px-1 rounded">password123</code>
              </p>
              <p className="text-xs text-gray-500">
                Don't have an account?{" "}
                <button
                  onClick={onBack}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Start your journey
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 