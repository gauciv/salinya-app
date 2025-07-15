"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  getFallbackResponse, 
  getMotivationalMessage, 
  getContextualFallback,
  type FallbackResponse 
} from "@/lib/fallback-responses"
import { 
  RefreshCw, 
  Wifi, 
  AlertCircle, 
  Clock, 
  Heart,
  ArrowRight
} from "lucide-react"

interface FallbackDisplayProps {
  feature: string
  state: 'error' | 'loading' | 'empty' | 'offline'
  onAction?: () => void
  showMotivation?: boolean
  userContext?: {
    isNewUser?: boolean
    hasCompletedModules?: boolean
    streakDays?: number
    isFromBPO?: boolean
  }
  className?: string
  compact?: boolean
}

export default function FallbackDisplay({
  feature,
  state,
  onAction,
  showMotivation = true,
  userContext,
  className = "",
  compact = false
}: FallbackDisplayProps) {
  // Get the appropriate fallback response
  const fallback: FallbackResponse = userContext 
    ? getContextualFallback(feature, userContext)
    : getFallbackResponse(feature as any, state)

  // Get motivational message based on context
  const getMotivation = () => {
    if (!showMotivation) return null
    
    if (userContext?.isFromBPO && state === 'error') {
      return getMotivationalMessage('bpo_encouragement')
    }
    if (state === 'empty' || state === 'loading') {
      return getMotivationalMessage('learning_motivation')
    }
    return getMotivationalMessage('community_support')
  }

  const motivation = getMotivation()

  // Get appropriate icon component
  const getStateIcon = () => {
    switch (state) {
      case 'loading':
        return <Clock className="h-5 w-5 animate-pulse" />
      case 'offline':
        return <Wifi className="h-5 w-5" />
      case 'error':
        return <AlertCircle className="h-5 w-5" />
      default:
        return null
    }
  }

  // Get state-specific styling
  const getStateStyles = () => {
    switch (state) {
      case 'loading':
        return {
          cardClass: "border-blue-200 bg-blue-50",
          iconClass: "text-blue-600",
          badgeClass: "bg-blue-100 text-blue-800"
        }
      case 'offline':
        return {
          cardClass: "border-orange-200 bg-orange-50",
          iconClass: "text-orange-600",
          badgeClass: "bg-orange-100 text-orange-800"
        }
      case 'error':
        return {
          cardClass: "border-red-200 bg-red-50",
          iconClass: "text-red-600",
          badgeClass: "bg-red-100 text-red-800"
        }
      case 'empty':
        return {
          cardClass: "border-gray-200 bg-gray-50",
          iconClass: "text-gray-600",
          badgeClass: "bg-gray-100 text-gray-800"
        }
      default:
        return {
          cardClass: "border-gray-200 bg-gray-50",
          iconClass: "text-gray-600",
          badgeClass: "bg-gray-100 text-gray-800"
        }
    }
  }

  const styles = getStateStyles()

  if (compact) {
    return (
      <div className={`flex items-center justify-center p-4 rounded-xl ${styles.cardClass} ${className}`}>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            {fallback.icon && <span className="text-2xl mr-2">{fallback.icon}</span>}
            {getStateIcon() && <div className={styles.iconClass}>{getStateIcon()}</div>}
          </div>
          <p className="text-sm text-gray-700 mb-2">{fallback.message}</p>
          {fallback.action && onAction && (
            <Button
              size="sm"
              onClick={onAction}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {fallback.action}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className={`${styles.cardClass} border-2 ${className}`}>
      <CardContent className="p-6 text-center">
        {/* Status Badge */}
        <div className="flex justify-center mb-4">
          <Badge className={`${styles.badgeClass} capitalize px-3 py-1`}>
            {state === 'empty' ? 'No Data' : state}
          </Badge>
        </div>

        {/* Main Icon */}
        <div className="flex items-center justify-center mb-4">
          {fallback.icon && (
            <div className="text-4xl mb-2">{fallback.icon}</div>
          )}
          {getStateIcon() && (
            <div className={`${styles.iconClass} ml-2`}>
              {getStateIcon()}
            </div>
          )}
        </div>

        {/* Main Message */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {getStateTitle()}
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {fallback.message}
        </p>

        {/* Motivational Message */}
        {motivation && (
          <div className="bg-white/60 rounded-lg p-3 mb-4 border border-white/40">
            <div className="flex items-center justify-center mb-1">
              <Heart className="h-4 w-4 text-pink-500 mr-2" />
              <span className="text-sm font-medium text-gray-800">Motivation</span>
            </div>
            <p className="text-sm text-gray-700 italic">{motivation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Primary Action */}
          {fallback.action && onAction && (
            <Button
              onClick={onAction}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all"
            >
              {fallback.action}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}

          {/* Refresh Action for Errors */}
          {state === 'error' && (
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-gray-300 hover:bg-gray-50 rounded-xl px-6 py-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
          )}

          {/* Retry for Offline */}
          {state === 'offline' && (
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-orange-300 hover:bg-orange-50 rounded-xl px-6 py-2"
            >
              <Wifi className="h-4 w-4 mr-2" />
              Retry Connection
            </Button>
          )}
        </div>

        {/* Additional Context for New Users */}
        {userContext?.isNewUser && state === 'empty' && (
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">New to SUMAKSES?</span> Start with our skills assessment to get personalized recommendations!
            </p>
          </div>
        )}

        {/* BPO Context Message */}
        {userContext?.isFromBPO && (state === 'empty' || state === 'error') && (
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <span className="font-semibold">BPO Professional?</span> Your experience is valuable in tech! 
              We're here to help you make the transition. 🇵🇭
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  function getStateTitle(): string {
    switch (state) {
      case 'loading':
        return 'Loading...'
      case 'offline':
        return 'You\'re Offline'
      case 'error':
        return 'Something Went Wrong'
      case 'empty':
        return 'Nothing Here Yet'
      default:
        return 'Oops!'
    }
  }
}

// Specialized fallback components for common use cases

export function LoadingFallback({ 
  message = "Loading...", 
  className = "" 
}: { 
  message?: string
  className?: string 
}) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export function ErrorFallback({ 
  message = "Something went wrong", 
  onRetry,
  className = "" 
}: { 
  message?: string
  onRetry?: () => void
  className?: string 
}) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops!</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

export function EmptyStateFallback({ 
  title = "Nothing here yet",
  message = "Content will appear here when available",
  action,
  onAction,
  icon = "📭",
  className = "" 
}: { 
  title?: string
  message?: string
  action?: string
  onAction?: () => void
  icon?: string
  className?: string 
}) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center max-w-md">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {action && onAction && (
          <Button onClick={onAction} className="bg-blue-600 hover:bg-blue-700 text-white">
            {action}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}