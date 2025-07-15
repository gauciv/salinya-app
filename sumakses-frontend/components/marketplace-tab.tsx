"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Trophy,
  Star,
  Zap,
  Clock,
  Users,
  CheckCircle,
  Lock,
  Gift,
  Target,
  BookOpen,
  Award,
  DollarSign,
  Calendar,
  TrendingUp,
  Shield,
  Crown,
  Sparkles,
  Rocket,
  Heart,
  Bookmark,
} from "lucide-react"

interface UserProgress {
  xpPoints: number
  overallProgress: number
  streakDays: number
  completedModules: number
  achievements: any[]
}

interface MarketplaceItem {
  id: string
  type: "certification" | "task" | "mentorship" | "resource" | "badge" | "premium"
  title: string
  description: string
  price: number
  originalPrice?: number
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  rewards: {
    xpPoints: number
    badges?: string[]
    certificates?: string[]
    unlocks?: string[]
  }
  requirements?: {
    level: number
    modulesCompleted: number
    streakDays: number
  }
  features: string[]
  instructor?: {
    name: string
    avatar: string
    title: string
    company: string
  }
  popularity: number
  rating: number
  reviews: number
  isLimited: boolean
  expiresAt?: string
  isPurchased: boolean
  isRecommended: boolean
  icon: string
  color: string
}

interface MarketplaceTabProps {
  userProgress: UserProgress
}

export default function MarketplaceTab({ userProgress }: MarketplaceTabProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)

  // Marketplace items following SUMAKSES context
  const marketplaceItems: MarketplaceItem[] = [
    {
      id: "qa-certification",
      type: "certification",
      title: "QA Testing Professional Certification",
      description: "Official certification in software testing fundamentals and best practices",
      price: 500,
      originalPrice: 800,
      category: "certifications",
      difficulty: "intermediate",
      duration: "4-6 weeks",
      rewards: {
        xpPoints: 200,
        certificates: ["QA Testing Professional"],
        unlocks: ["Advanced QA courses", "Mentorship priority"]
      },
      requirements: {
        level: 5,
        modulesCompleted: 3,
        streakDays: 7
      },
      features: [
        "Industry-recognized certification",
        "Portfolio-ready projects",
        "Job placement assistance",
        "Lifetime access to materials"
      ],
      instructor: {
        name: "Maria Santos",
        avatar: "/placeholder-user.jpg",
        title: "Senior QA Engineer",
        company: "Accenture"
      },
      popularity: 95,
      rating: 4.9,
      reviews: 127,
      isLimited: false,
      isPurchased: false,
      isRecommended: true,
      icon: "🧪",
      color: "blue"
    },
    {
      id: "mentorship-session",
      type: "mentorship",
      title: "1-on-1 Career Coaching Session",
      description: "Personalized career guidance from successful BPO-to-tech professionals",
      price: 300,
      category: "mentorship",
      difficulty: "beginner",
      duration: "1 hour",
      rewards: {
        xpPoints: 100,
        unlocks: ["Personalized roadmap", "Resume review"]
      },
      features: [
        "Personalized career assessment",
        "Resume optimization",
        "Interview preparation",
        "Follow-up support"
      ],
      instructor: {
        name: "Jose Mendoza",
        avatar: "/placeholder-user.jpg",
        title: "Product Manager",
        company: "Globe Telecom"
      },
      popularity: 88,
      rating: 4.8,
      reviews: 89,
      isLimited: true,
      expiresAt: "2024-02-15",
      isPurchased: false,
      isRecommended: true,
      icon: "👥",
      color: "green"
    },
    {
      id: "automation-project",
      type: "task",
      title: "Test Automation Mini-Project",
      description: "Hands-on project to build a real automation framework",
      price: 250,
      category: "tasks",
      difficulty: "advanced",
      duration: "2-3 weeks",
      rewards: {
        xpPoints: 150,
        badges: ["Automation Expert"],
        unlocks: ["Advanced automation courses"]
      },
      requirements: {
        level: 8,
        modulesCompleted: 5,
        streakDays: 14
      },
      features: [
        "Real-world project experience",
        "Code review from experts",
        "Portfolio showcase",
        "GitHub integration"
      ],
      popularity: 72,
      rating: 4.7,
      reviews: 45,
      isLimited: false,
      isPurchased: false,
      isRecommended: false,
      icon: "🤖",
      color: "purple"
    },
    {
      id: "premium-resources",
      type: "resource",
      title: "Premium Learning Resources Bundle",
      description: "Exclusive access to advanced courses, tools, and industry insights",
      price: 400,
      originalPrice: 600,
      category: "resources",
      difficulty: "intermediate",
      duration: "Lifetime access",
      rewards: {
        xpPoints: 50,
        unlocks: ["Premium courses", "Exclusive tools", "Industry reports"]
      },
      features: [
        "Advanced course library",
        "Industry tools access",
        "Salary negotiation guide",
        "Company insights database"
      ],
      popularity: 85,
      rating: 4.6,
      reviews: 203,
      isLimited: false,
      isPurchased: false,
      isRecommended: false,
      icon: "📚",
      color: "orange"
    },
    {
      id: "expert-badge",
      type: "badge",
      title: "SUMAKSES Expert Badge",
      description: "Prestigious badge for top performers and community leaders",
      price: 1000,
      category: "badges",
      difficulty: "advanced",
      duration: "Permanent",
      rewards: {
        xpPoints: 500,
        badges: ["SUMAKSES Expert"],
        unlocks: ["Mentor opportunities", "Platform features"]
      },
      requirements: {
        level: 15,
        modulesCompleted: 10,
        streakDays: 30
      },
      features: [
        "Exclusive community access",
        "Mentor opportunities",
        "Platform features unlock",
        "Recognition in community"
      ],
      popularity: 65,
      rating: 5.0,
      reviews: 12,
      isLimited: true,
      isPurchased: false,
      isRecommended: false,
      icon: "👑",
      color: "yellow"
    },
    {
      id: "interview-prep",
      type: "task",
      title: "Mock Interview Package",
      description: "Practice interviews with real tech professionals",
      price: 200,
      category: "tasks",
      difficulty: "intermediate",
      duration: "1 week",
      rewards: {
        xpPoints: 120,
        unlocks: ["Interview feedback", "Improvement tips"]
      },
      features: [
        "3 mock interviews",
        "Detailed feedback",
        "Improvement tips",
        "Common questions guide"
      ],
      popularity: 92,
      rating: 4.8,
      reviews: 156,
      isLimited: false,
      isPurchased: false,
      isRecommended: true,
      icon: "🎯",
      color: "red"
    }
  ]

  const categories = [
    { id: "all", name: "All Items", icon: "🏪" },
    { id: "certifications", name: "Certifications", icon: "🏆" },
    { id: "tasks", name: "Projects & Tasks", icon: "📋" },
    { id: "mentorship", name: "Mentorship", icon: "👥" },
    { id: "resources", name: "Resources", icon: "📚" },
    { id: "badges", name: "Badges", icon: "🎖️" }
  ]

  const filteredItems = selectedCategory === "all" 
    ? marketplaceItems 
    : marketplaceItems.filter(item => item.category === selectedCategory)

  const canPurchase = (item: MarketplaceItem) => {
    if (item.isPurchased) return false
    if (userProgress.xpPoints < item.price) return false
    if (item.requirements) {
      const level = Math.floor(userProgress.xpPoints / 100) + 1
      if (level < item.requirements.level) return false
      if (userProgress.completedModules < item.requirements.modulesCompleted) return false
      if (userProgress.streakDays < item.requirements.streakDays) return false
    }
    return true
  }

  const handlePurchase = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setShowPurchaseDialog(true)
  }

  const confirmPurchase = () => {
    if (!selectedItem) return
    
    // Here you would integrate with your backend to process the purchase
    console.log(`Purchasing ${selectedItem.title} for ${selectedItem.price} SAKSES points`)
    
    // Update user progress (in real app, this would come from backend)
    // setUserProgress(prev => ({
    //   ...prev,
    //   xpPoints: prev.xpPoints - selectedItem.price
    // }))
    
    setShowPurchaseDialog(false)
    setSelectedItem(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800"
      case "intermediate": return "bg-yellow-100 text-yellow-800"
      case "advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getItemColor = (color: string) => {
    switch (color) {
      case "blue": return "from-blue-500 to-blue-600"
      case "green": return "from-green-500 to-green-600"
      case "purple": return "from-purple-500 to-purple-600"
      case "orange": return "from-orange-500 to-orange-600"
      case "yellow": return "from-yellow-500 to-yellow-600"
      case "red": return "from-red-500 to-red-600"
      default: return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">SAKSES Marketplace</h2>
            <p className="text-gray-600">Spend your SAKSES points on certifications, mentorship, and exclusive resources</p>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-bold text-lg text-gray-900">{userProgress.xpPoints}</span>
            </div>
            <div className="text-sm text-gray-600">SAKSES Points</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-3xl p-4 shadow-lg border border-gray-100">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-2xl transition-all duration-200 text-center ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="text-xl mb-1">{category.icon}</div>
              <div className="text-xs font-medium">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Marketplace Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="relative group hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Background Pattern */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getItemColor(item.color)} opacity-5`}></div>
            
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`text-3xl p-3 rounded-2xl bg-gradient-to-r ${getItemColor(item.color)} text-white`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-900 mb-1">{item.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </Badge>
                      {item.isRecommended && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                      {item.isLimited && (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Limited Time
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {item.isPurchased && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              {/* Price and Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-gray-900">{item.price}</span>
                  </div>
                  <span className="text-sm text-gray-600">SAKSES Points</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{item.rating}</span>
                  <span>({item.reviews})</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900">What you'll get:</h4>
                <div className="grid grid-cols-1 gap-1">
                  {item.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {item.features.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{item.features.length - 3} more features
                    </div>
                  )}
                </div>
              </div>

              {/* Requirements */}
              {item.requirements && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">Level {item.requirements.level}</div>
                      <div className="text-gray-600">Min Level</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{item.requirements.modulesCompleted}</div>
                      <div className="text-gray-600">Modules</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{item.requirements.streakDays}</div>
                      <div className="text-gray-600">Streak Days</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                {item.isPurchased ? (
                  <Button className="w-full bg-green-100 text-green-800 hover:bg-green-200 rounded-2xl">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Purchased
                  </Button>
                ) : !canPurchase(item) ? (
                  <Button className="w-full bg-gray-100 text-gray-600 rounded-2xl" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    {userProgress.xpPoints < item.price ? 'Not Enough Points' : 'Requirements Not Met'}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handlePurchase(item)}
                    className={`w-full bg-gradient-to-r ${getItemColor(item.color)} hover:from-opacity-90 hover:to-opacity-90 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Purchase for {item.price} Points
                  </Button>
                )}
              </div>

              {/* Popularity Indicator */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{item.popularity}% popular</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-yellow-500" />
              Confirm Purchase
            </DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-2xl p-2 rounded-xl bg-gradient-to-r ${getItemColor(selectedItem.color)} text-white`}>
                    {selectedItem.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedItem.title}</h3>
                    <p className="text-sm text-gray-600">{selectedItem.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-gray-900">{selectedItem.price} SAKSES Points</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Balance:</span>
                    <span className="font-bold text-gray-900">{userProgress.xpPoints} Points</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="text-green-600">{userProgress.xpPoints - selectedItem.price} Points</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">You'll receive:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{selectedItem.rewards.xpPoints} SAKSES Points</span>
                  </div>
                  {selectedItem.rewards.badges?.map((badge, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-purple-500" />
                      <span>{badge} Badge</span>
                    </div>
                  ))}
                  {selectedItem.rewards.certificates?.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span>{cert} Certificate</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPurchaseDialog(false)}
                  className="flex-1 rounded-2xl"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmPurchase}
                  className={`flex-1 bg-gradient-to-r ${getItemColor(selectedItem.color)} text-white rounded-2xl`}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Confirm Purchase
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 