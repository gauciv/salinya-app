/**
 * Fallback responses for dashboard features when data loading fails
 * Provides graceful degradation and helpful error messages
 */

export interface FallbackResponse {
  message: string
  action?: string
  icon?: string
  type: 'error' | 'loading' | 'empty' | 'offline'
}

export const dashboardFallbacks = {
  // Home Tab Fallbacks
  userProgress: {
    error: {
      message: "Unable to load your progress right now. Your learning data is safe!",
      action: "Try refreshing the page",
      icon: "📊",
      type: 'error' as const
    },
    loading: {
      message: "Loading your learning progress...",
      icon: "⏳",
      type: 'loading' as const
    },
    empty: {
      message: "Start your learning journey today! Complete your first module to see progress.",
      action: "Browse Learning Modules",
      icon: "🚀",
      type: 'empty' as const
    }
  },

  careerMatch: {
    error: {
      message: "Career recommendations temporarily unavailable. Your BPO skills are still valuable!",
      action: "Try again later",
      icon: "🎯",
      type: 'error' as const
    },
    loading: {
      message: "Finding your perfect tech career match...",
      icon: "🔍",
      type: 'loading' as const
    },
    empty: {
      message: "Complete the skills assessment to get personalized career recommendations.",
      action: "Take Assessment",
      icon: "📝",
      type: 'empty' as const
    }
  },

  learningPaths: {
    error: {
      message: "Learning paths temporarily unavailable. Don't worry, your progress is saved!",
      action: "Refresh page",
      icon: "📚",
      type: 'error' as const
    },
    loading: {
      message: "Loading your personalized learning paths...",
      icon: "📖",
      type: 'loading' as const
    },
    empty: {
      message: "No learning paths available yet. Check back soon for new content!",
      action: "Explore Community",
      icon: "🌟",
      type: 'empty' as const
    }
  },

  notifications: {
    error: {
      message: "Notifications temporarily unavailable.",
      action: "Check back later",
      icon: "🔔",
      type: 'error' as const
    },
    loading: {
      message: "Loading notifications...",
      icon: "⏳",
      type: 'loading' as const
    },
    empty: {
      message: "No new notifications. You're all caught up!",
      icon: "✅",
      type: 'empty' as const
    }
  },

  // Learn Tab Fallbacks
  modules: {
    error: {
      message: "Learning modules temporarily unavailable. Your progress is safe!",
      action: "Try refreshing",
      icon: "📚",
      type: 'error' as const
    },
    loading: {
      message: "Loading learning modules...",
      icon: "📖",
      type: 'loading' as const
    },
    empty: {
      message: "New modules coming soon! Join the community while you wait.",
      action: "Visit Community",
      icon: "🚀",
      type: 'empty' as const
    }
  },

  // Community Tab Fallbacks
  mentors: {
    error: {
      message: "Mentor directory temporarily unavailable. Our mentors are still here to help!",
      action: "Try again later",
      icon: "👥",
      type: 'error' as const
    },
    loading: {
      message: "Finding amazing mentors for you...",
      icon: "🔍",
      type: 'loading' as const
    },
    empty: {
      message: "No mentors available right now. Check back soon for new mentors!",
      action: "Join Forum",
      icon: "💬",
      type: 'empty' as const
    },
    offline: {
      message: "You're offline. Mentor profiles will load when you're back online.",
      icon: "📶",
      type: 'offline' as const
    }
  },

  learningCircles: {
    error: {
      message: "Learning circles temporarily unavailable. Your study groups are still active!",
      action: "Refresh page",
      icon: "🔗",
      type: 'error' as const
    },
    loading: {
      message: "Loading learning circles...",
      icon: "⏳",
      type: 'loading' as const
    },
    empty: {
      message: "No learning circles yet. Be the first to create one!",
      action: "Create Circle",
      icon: "➕",
      type: 'empty' as const
    }
  },

  forumPosts: {
    error: {
      message: "Forum posts temporarily unavailable. The community is still here!",
      action: "Try again",
      icon: "💬",
      type: 'error' as const
    },
    loading: {
      message: "Loading community discussions...",
      icon: "💭",
      type: 'loading' as const
    },
    empty: {
      message: "No posts yet. Start the conversation!",
      action: "Create Post",
      icon: "✍️",
      type: 'empty' as const
    }
  },

  successStories: {
    error: {
      message: "Success stories temporarily unavailable. Your journey is still inspiring!",
      action: "Try later",
      icon: "🌟",
      type: 'error' as const
    },
    loading: {
      message: "Loading inspiring success stories...",
      icon: "✨",
      type: 'loading' as const
    },
    empty: {
      message: "Be the first to share your success story!",
      action: "Share Story",
      icon: "📝",
      type: 'empty' as const
    }
  },

  // Marketplace Tab Fallbacks
  marketplaceItems: {
    error: {
      message: "Marketplace temporarily unavailable. Your SAKSES points are safe!",
      action: "Refresh page",
      icon: "🏪",
      type: 'error' as const
    },
    loading: {
      message: "Loading marketplace items...",
      icon: "🛍️",
      type: 'loading' as const
    },
    empty: {
      message: "New items coming soon! Keep earning SAKSES points.",
      action: "Continue Learning",
      icon: "⭐",
      type: 'empty' as const
    }
  },

  purchaseHistory: {
    error: {
      message: "Purchase history temporarily unavailable.",
      action: "Try again later",
      icon: "📋",
      type: 'error' as const
    },
    loading: {
      message: "Loading your purchases...",
      icon: "⏳",
      type: 'loading' as const
    },
    empty: {
      message: "No purchases yet. Browse the marketplace to get started!",
      action: "Browse Marketplace",
      icon: "🛒",
      type: 'empty' as const
    }
  },

  // Profile Tab Fallbacks
  achievements: {
    error: {
      message: "Achievements temporarily unavailable. Your accomplishments are still recorded!",
      action: "Refresh page",
      icon: "🏆",
      type: 'error' as const
    },
    loading: {
      message: "Loading your achievements...",
      icon: "🏅",
      type: 'loading' as const
    },
    empty: {
      message: "Start learning to unlock your first achievement!",
      action: "Begin Learning",
      icon: "🎯",
      type: 'empty' as const
    }
  },

  timeline: {
    error: {
      message: "Timeline temporarily unavailable. Your journey continues!",
      action: "Try again",
      icon: "📅",
      type: 'error' as const
    },
    loading: {
      message: "Loading your learning timeline...",
      icon: "⏰",
      type: 'loading' as const
    },
    empty: {
      message: "Your learning journey starts now!",
      action: "Take First Module",
      icon: "🚀",
      type: 'empty' as const
    }
  },

  // Learning Module Fallbacks
  moduleContent: {
    error: {
      message: "Module content temporarily unavailable. Your progress is saved!",
      action: "Try refreshing",
      icon: "📖",
      type: 'error' as const
    },
    loading: {
      message: "Loading module content...",
      icon: "📚",
      type: 'loading' as const
    },
    empty: {
      message: "Module content coming soon!",
      action: "Browse Other Modules",
      icon: "📝",
      type: 'empty' as const
    }
  },

  videoContent: {
    error: {
      message: "Video temporarily unavailable. Try the reading materials instead!",
      action: "Switch to Reading",
      icon: "🎥",
      type: 'error' as const
    },
    loading: {
      message: "Loading video content...",
      icon: "⏳",
      type: 'loading' as const
    }
  },

  quizContent: {
    error: {
      message: "Quiz temporarily unavailable. Your learning progress is still tracked!",
      action: "Continue to Next Section",
      icon: "❓",
      type: 'error' as const
    },
    loading: {
      message: "Loading quiz questions...",
      icon: "🧠",
      type: 'loading' as const
    }
  },

  // AI Chat Fallbacks
  aiChat: {
    error: {
      message: "AI tutor temporarily unavailable. Try asking the community for help!",
      action: "Visit Forum",
      icon: "🤖",
      type: 'error' as const
    },
    loading: {
      message: "AI tutor is thinking...",
      icon: "💭",
      type: 'loading' as const
    },
    offline: {
      message: "AI tutor needs internet connection. Check your connection and try again.",
      icon: "📶",
      type: 'offline' as const
    }
  },

  // General System Fallbacks
  system: {
    maintenance: {
      message: "SUMAKSES is undergoing maintenance. We'll be back soon!",
      action: "Check Status Page",
      icon: "🔧",
      type: 'error' as const
    },
    offline: {
      message: "You're offline. Some features may not work until you're back online.",
      icon: "📶",
      type: 'offline' as const
    },
    slowConnection: {
      message: "Slow connection detected. Content may take longer to load.",
      icon: "🐌",
      type: 'loading' as const
    }
  }
}

// Helper function to get fallback response
export function getFallbackResponse(
  feature: keyof typeof dashboardFallbacks,
  state: 'error' | 'loading' | 'empty' | 'offline'
): FallbackResponse {
  const fallback = dashboardFallbacks[feature]
  
  if (typeof fallback === 'object' && state in fallback) {
    return (fallback as any)[state]
  }
  
  // Default fallback
  return {
    message: "Something went wrong. Please try again.",
    action: "Refresh page",
    icon: "⚠️",
    type: 'error'
  }
}

// Motivational messages for Filipino users
export const motivationalFallbacks = {
  bpo_encouragement: [
    "Your BPO experience is your superpower! 💪",
    "Every expert was once a beginner. Keep going! 🌟",
    "Ang galing mo sa customer service, perfect yan sa tech! 🇵🇭",
    "Your problem-solving skills from BPO are exactly what tech needs! 🎯",
    "Hindi ka nag-iisa sa journey na ito! 🤝"
  ],
  
  learning_motivation: [
    "Small progress is still progress! 📈",
    "Consistency beats perfection. Keep learning! 📚",
    "Your future tech career starts with today's effort! 🚀",
    "Every module completed is a step closer to your goal! ✅",
    "Kaya mo yan! One lesson at a time. 💪"
  ],
  
  community_support: [
    "The SUMAKSES community has your back! 🤝",
    "Connect with fellow career changers for support! 👥",
    "Share your struggles - others have been there too! 💬",
    "Your questions help others learn too! ❓",
    "Together, we're stronger! 🌟"
  ]
}

// Get random motivational message
export function getMotivationalMessage(category: keyof typeof motivationalFallbacks): string {
  const messages = motivationalFallbacks[category]
  return messages[Math.floor(Math.random() * messages.length)]
}

// Context-aware fallback messages
export function getContextualFallback(
  feature: string,
  userContext?: {
    isNewUser?: boolean
    hasCompletedModules?: boolean
    streakDays?: number
    isFromBPO?: boolean
  }
): FallbackResponse {
  const isNewUser = userContext?.isNewUser ?? false
  const isFromBPO = userContext?.isFromBPO ?? true
  
  if (isNewUser && feature === 'learningPaths') {
    return {
      message: "Welcome to SUMAKSES! Let's start your tech journey with a skills assessment.",
      action: "Take Skills Assessment",
      icon: "🎉",
      type: 'empty'
    }
  }
  
  if (isFromBPO && feature === 'careerMatch') {
    return {
      message: "Your BPO skills are valuable! Let's find the perfect tech role for you.",
      action: "Complete Assessment",
      icon: "🎯",
      type: 'empty'
    }
  }
  
  // Default to standard fallback
  return getFallbackResponse(feature as keyof typeof dashboardFallbacks, 'empty')
}