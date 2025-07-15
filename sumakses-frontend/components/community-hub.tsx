"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Users,
  Star,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Calendar,
  MapPin,
  Clock,
  TrendingUp,
  Target,
  Search,
  Filter,
  Plus,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Trophy,
  MessageCircle,
  UserPlus,
  Eye,
  Play,
} from "lucide-react"



interface Mentor {
  id: string
  name: string
  avatar: string
  title: string
  company: string
  location: string
  experience: string
  specializations: string[]
  rating: number
  reviews: number
  hourlyRate: string
  availability: string[]
  languages: string[]
  bio: string
  successStories: number
  menteesCount: number
  responseTime: string
  verified: boolean
  featured: boolean
}

interface LearningCircle {
  id: string
  name: string
  description: string
  members: number
  maxMembers: number
  phase: string
  meetingSchedule: string
  nextMeeting: string
  topics: string[]
  progress: number
  isMember: boolean
  isLeader: boolean
  avatar: string
}

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    title: string
    verified: boolean
  }
  category: string
  tags: string[]
  likes: number
  replies: number
  views: number
  createdAt: string
  isLiked: boolean
  isBookmarked: boolean
  isAnswered: boolean
}

interface SuccessStory {
  id: string
  title: string
  author: {
    name: string
    avatar: string
    location: string
    previousRole: string
    currentRole: string
    company: string
  }
  content: string
  videoUrl?: string
  imageUrl?: string
  salaryIncrease: string
  timeframe: string
  skills: string[]
  likes: number
  shares: number
  comments: number
  isLiked: boolean
  isBookmarked: boolean
  featured: boolean
}

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState("mentors")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data following SUMAKSES context
  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Maria Santos",
      avatar: "/placeholder-user.jpg",
      title: "Senior QA Engineer",
      company: "TechCorp Philippines",
      location: "Quezon City",
      experience: "8 years in tech",
      specializations: ["QA Testing", "Test Automation", "Team Leadership"],
      rating: 4.9,
      reviews: 127,
      hourlyRate: "₱1,500",
      availability: ["Weekdays 6PM-9PM", "Weekends 10AM-2PM"],
      languages: ["English", "Filipino", "Taglish"],
      bio: "Former BPO professional who transitioned to tech. Helped 50+ professionals make the switch.",
      successStories: 23,
      menteesCount: 45,
      responseTime: "< 2 hours",
      verified: true,
      featured: true
    },
    {
      id: "2",
      name: "Jose Mendoza",
      avatar: "/placeholder-user.jpg",
      title: "Product Manager",
      company: "Fintech Startup",
      location: "Cebu City",
      experience: "10 years in tech",
      specializations: ["Product Management", "Agile", "Team Leadership"],
      rating: 4.8,
      reviews: 89,
      hourlyRate: "₱2,000",
      availability: ["Weekdays 7PM-10PM", "Saturdays 2PM-6PM"],
      languages: ["English", "Filipino"],
      bio: "Ex-BPO team leader turned product manager. Passionate about helping others grow.",
      successStories: 18,
      menteesCount: 32,
      responseTime: "< 4 hours",
      verified: true,
      featured: false
    },
    {
      id: "3",
      name: "Ana Reyes",
      avatar: "/placeholder-user.jpg",
      title: "DevOps Engineer",
      company: "Cloud Services Co",
      location: "Davao City",
      experience: "6 years in tech",
      specializations: ["DevOps", "Cloud Computing", "Automation"],
      rating: 4.7,
      reviews: 56,
      hourlyRate: "₱1,800",
      availability: ["Weekends 9AM-5PM"],
      languages: ["English", "Filipino"],
      bio: "Technical support specialist who became a DevOps engineer. Loves automation!",
      successStories: 15,
      menteesCount: 28,
      responseTime: "< 6 hours",
      verified: true,
      featured: false
    }
  ]

  const learningCircles: LearningCircle[] = [
    {
      id: "1",
      name: "QA Testing Beginners",
      description: "Group for those starting their QA journey",
      members: 8,
      maxMembers: 8,
      phase: "Foundation",
      meetingSchedule: "Every Tuesday 7PM",
      nextMeeting: "Tomorrow",
      topics: ["Manual Testing", "Test Cases", "Bug Reporting"],
      progress: 75,
      isMember: true,
      isLeader: false,
      avatar: "🔍"
    },
    {
      id: "2",
      name: "Product Management Aspirants",
      description: "For BPO leaders transitioning to product management",
      members: 6,
      maxMembers: 8,
      phase: "Skill Building",
      meetingSchedule: "Every Thursday 8PM",
      nextMeeting: "This Thursday",
      topics: ["Product Strategy", "User Research", "Agile"],
      progress: 45,
      isMember: false,
      isLeader: false,
      avatar: "📊"
    },
    {
      id: "3",
      name: "DevOps Journey",
      description: "Technical support to DevOps transition",
      members: 5,
      maxMembers: 6,
      phase: "Foundation",
      meetingSchedule: "Every Saturday 10AM",
      nextMeeting: "This Saturday",
      topics: ["Linux Basics", "Docker", "CI/CD"],
      progress: 30,
      isMember: true,
      isLeader: true,
      avatar: "⚙️"
    }
  ]

  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "How to prepare for QA interview?",
      content: "I have my first QA interview next week. Any tips from those who made the transition?",
      author: {
        name: "Carla Santos",
        avatar: "/placeholder-user.jpg",
        title: "BPO Agent",
        verified: true
      },
      category: "Career Advice",
      tags: ["interview", "qa", "career-transition"],
      likes: 24,
      replies: 8,
      views: 156,
      createdAt: "2 hours ago",
      isLiked: false,
      isBookmarked: false,
      isAnswered: true
    },
    {
      id: "2",
      title: "Best resources for learning JavaScript?",
      content: "Looking for Filipino-friendly JavaScript tutorials. Any recommendations?",
      author: {
        name: "Miguel Cruz",
        avatar: "/placeholder-user.jpg",
        title: "Customer Service Rep",
        verified: false
      },
      category: "Learning Resources",
      tags: ["javascript", "learning", "resources"],
      likes: 18,
      replies: 12,
      views: 89,
      createdAt: "1 day ago",
      isLiked: true,
      isBookmarked: true,
      isAnswered: false
    },
    {
      id: "3",
      title: "Salary negotiation tips for tech roles",
      content: "What's a reasonable salary to ask for as a junior QA tester in Manila?",
      author: {
        name: "Sarah Lim",
        avatar: "/placeholder-user.jpg",
        title: "BPO Supervisor",
        verified: true
      },
      category: "Career Advice",
      tags: ["salary", "negotiation", "qa"],
      likes: 31,
      replies: 15,
      views: 234,
      createdAt: "3 days ago",
      isLiked: false,
      isBookmarked: false,
      isAnswered: true
    }
  ]

  const successStories: SuccessStory[] = [
    {
      id: "1",
      title: "From Call Center to QA Engineer in 8 Months",
      author: {
        name: "Maria Santos",
        avatar: "/placeholder-user.jpg",
        location: "Quezon City",
        previousRole: "Customer Service Representative",
        currentRole: "QA Engineer",
        company: "TechCorp Philippines"
      },
              content: "Hindi ko inakala na ang customer service skills ko ay magiging foundation ng tech career ko! Ang problem-solving at attention to detail na natuto ko sa BPO, perfect match sa software testing.",
      videoUrl: "/placeholder-video.mp4",
      imageUrl: "/placeholder.jpg",
      salaryIncrease: "+195%",
      timeframe: "8 months",
      skills: ["Problem Solving", "Attention to Detail", "Documentation"],
      likes: 156,
      shares: 23,
      comments: 18,
      isLiked: true,
      isBookmarked: false,
      featured: true
    },
    {
      id: "2",
      title: "Team Leader to Product Manager Success Story",
      author: {
        name: "Jose Mendoza",
        avatar: "/placeholder-user.jpg",
        location: "Cebu City",
        previousRole: "BPO Team Leader",
        currentRole: "Product Manager",
        company: "Fintech Startup"
      },
      content: "My leadership experience in BPO was exactly what tech companies needed. Ang ability ko na mag-manage ng team at processes, naging competitive advantage ko sa product management.",
      salaryIncrease: "+171%",
      timeframe: "6 months",
      skills: ["Team Leadership", "Project Management", "Process Optimization"],
      likes: 89,
      shares: 12,
      comments: 7,
      isLiked: false,
      isBookmarked: true,
      featured: false
    }
  ]

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Community Hub</h1>
        <p className="text-text-secondary">Connect, learn, and grow with fellow career changers</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="rounded-xl border-border-default bg-background-card1">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-brand-primary mb-1">2,450+</div>
            <p className="text-sm text-text-secondary">Active Learners</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border-default bg-background-card2">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-brand-secondary mb-1">150+</div>
            <p className="text-sm text-text-secondary">Success Stories</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <Input
            placeholder="Search mentors, topics, or discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-border-default focus:border-border-focus"
          />
        </div>
        <Button variant="outline" className="rounded-xl border-border-default">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-between bg-background-surface rounded-2xl shadow-sm">
          <TabsTrigger value="mentors" className="flex-1 rounded-xl data-[state=active]:bg-brand-primary data-[state=active]:text-text-onPrimary">
            <Users className="h-4 w-4 mr-2" />
            Mentors
          </TabsTrigger>
          <TabsTrigger value="circles" className="flex-1 rounded-xl data-[state=active]:bg-brand-primary data-[state=active]:text-text-onPrimary">
            <MessageCircle className="h-4 w-4 mr-2" />
            Learning Circles
          </TabsTrigger>
          <TabsTrigger value="forum" className="flex-1 rounded-xl data-[state=active]:bg-brand-primary data-[state=active]:text-text-onPrimary">
            <MessageSquare className="h-4 w-4 mr-2" />
            Forum
          </TabsTrigger>
          <TabsTrigger value="stories" className="flex-1 rounded-xl data-[state=active]:bg-brand-primary data-[state=active]:text-text-onPrimary">
            <Trophy className="h-4 w-4 mr-2" />
            Success Stories
          </TabsTrigger>
        </TabsList>

        {/* Mentors Tab */}
        <TabsContent value="mentors" className="space-y-6">
          <MentorsTab mentors={mentors} />
        </TabsContent>

        {/* Learning Circles Tab */}
        <TabsContent value="circles" className="space-y-6">
          <LearningCirclesTab circles={learningCircles} />
        </TabsContent>

        {/* Forum Tab */}
        <TabsContent value="forum" className="space-y-6">
          <ForumTab posts={forumPosts} />
        </TabsContent>

        {/* Success Stories Tab */}
        <TabsContent value="stories" className="space-y-6">
          <SuccessStoriesTab stories={successStories} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mentors Tab Component
function MentorsTab({ mentors }: { mentors: Mentor[] }) {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">Find Your Mentor</h2>
        <Button className="rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary">
          <UserPlus className="h-4 w-4 mr-2" />
          Become a Mentor
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="rounded-xl border-border-default hover:border-border-active transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback className="text-lg font-semibold text-text-onPrimary">
                    {mentor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-text-primary">{mentor.name}</h3>
                        {mentor.verified && (
                          <Badge className="bg-states-success text-text-onPrimary text-xs">
                            Verified
                          </Badge>
                        )}
                        {mentor.featured && (
                          <Badge className="bg-brand-accent text-text-onPrimary text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">{mentor.title} at {mentor.company}</p>
                      <div className="flex items-center space-x-4 text-xs text-text-tertiary mt-1">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {mentor.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-brand-accent" />
                          {mentor.rating} ({mentor.reviews} reviews)
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-brand-primary">{mentor.hourlyRate}</div>
                      <div className="text-xs text-text-tertiary">per hour</div>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary mb-3">{mentor.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {mentor.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-text-tertiary">
                      <div className="flex items-center">
                        <Trophy className="h-3 w-3 mr-1" />
                        {mentor.successStories} success stories
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {mentor.menteesCount} mentees
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {mentor.responseTime}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMentor(mentor)}
                        className="rounded-lg border-border-default hover:bg-background-surfaceAlt"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-lg bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary"
                      >
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Learning Circles Tab Component
function LearningCirclesTab({ circles }: { circles: LearningCircle[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">Learning Circles</h2>
        <Button className="rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary">
          <Plus className="h-4 w-4 mr-2" />
          Create Circle
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {circles.map((circle) => (
          <Card key={circle.id} className="rounded-xl border-border-default hover:border-border-active transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-background-card1 flex items-center justify-center text-2xl">
                  {circle.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-text-primary">{circle.name}</h3>
                      <p className="text-sm text-text-secondary">{circle.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-text-tertiary mt-1">
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {circle.members}/{circle.maxMembers} members
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {circle.meetingSchedule}
                        </div>
                        <div className="flex items-center">
                          <Target className="h-3 w-3 mr-1" />
                          {circle.phase} Phase
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-brand-primary">{circle.progress}%</div>
                      <Progress value={circle.progress} className="w-20 h-2 mt-1" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {circle.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-tertiary">
                      Next meeting: {circle.nextMeeting}
                    </div>

                    <div className="flex items-center space-x-2">
                      {circle.isLeader && (
                        <Badge className="bg-brand-accent text-text-onPrimary text-xs">
                          Leader
                        </Badge>
                      )}
                      {circle.isMember ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg border-border-default hover:bg-background-surfaceAlt"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          View Circle
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="rounded-lg bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary"
                        >
                          Join Circle
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Forum Tab Component
function ForumTab({ posts }: { posts: ForumPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Posts", count: posts.length },
    { id: "career-advice", name: "Career Advice", count: 2 },
    { id: "learning-resources", name: "Learning Resources", count: 1 },
    { id: "technical-questions", name: "Technical Questions", count: 0 },
    { id: "success-stories", name: "Success Stories", count: 0 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">Community Forum</h2>
        <Button className="rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-lg whitespace-nowrap"
          >
            {category.name}
            <Badge variant="secondary" className="ml-2 text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="rounded-xl border-border-default hover:border-border-active transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="text-sm font-semibold text-text-onPrimary">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-text-primary">{post.title}</h3>
                        {post.isAnswered && (
                          <Badge className="bg-states-success text-text-onPrimary text-xs">
                            Answered
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-text-tertiary">
                        <span>{post.author.name}</span>
                        <span>{post.author.title}</span>
                        <span>{post.createdAt}</span>
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-text-secondary mb-3">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 px-3 rounded-lg ${post.isLiked ? 'text-states-error' : 'text-text-tertiary'}`}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-text-tertiary">
                        <Reply className="h-4 w-4 mr-1" />
                        {post.replies}
                      </Button>
                      <div className="flex items-center text-xs text-text-tertiary">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 rounded-lg ${post.isBookmarked ? 'text-brand-accent' : 'text-text-tertiary'}`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-text-tertiary">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Success Stories Tab Component
function SuccessStoriesTab({ stories }: { stories: SuccessStory[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">Success Stories</h2>
        <Button className="rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary">
          <Plus className="h-4 w-4 mr-2" />
          Share Your Story
        </Button>
      </div>

      <div className="space-y-6">
        {stories.map((story) => (
          <Card key={story.id} className="rounded-xl border-border-default hover:border-border-active transition-all duration-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Story Header */}
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={story.author.avatar} alt={story.author.name} />
                    <AvatarFallback className="text-sm font-semibold text-text-onPrimary">
                      {story.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-text-primary">{story.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span>{story.author.name}</span>
                          <span>•</span>
                          <span>{story.author.location}</span>
                          <span>•</span>
                          <span>{story.timeframe}</span>
                        </div>
                      </div>
                      {story.featured && (
                        <Badge className="bg-brand-accent text-text-onPrimary">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-text-tertiary">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-brand-secondary" />
                        {story.salaryIncrease} salary increase
                      </div>
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-1 text-brand-primary" />
                        {story.author.previousRole} → {story.author.currentRole}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="bg-background-surfaceAlt p-4 rounded-lg">
                  <p className="text-sm text-text-secondary italic">"{story.content}"</p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {story.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Video/Image Preview */}
                {story.videoUrl && (
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-sm">Watch Success Story</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Engagement */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-3 rounded-lg ${story.isLiked ? 'text-states-error' : 'text-text-tertiary'}`}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {story.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-text-tertiary">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {story.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-text-tertiary">
                      <Share2 className="h-4 w-4 mr-1" />
                      {story.shares}
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 rounded-lg ${story.isBookmarked ? 'text-brand-accent' : 'text-text-tertiary'}`}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-lg bg-brand-primary hover:bg-brand-primaryDark text-text-onPrimary"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 