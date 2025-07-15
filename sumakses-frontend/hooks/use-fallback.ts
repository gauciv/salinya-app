"use client"

import { useState, useEffect, useCallback } from 'react'
import { getFallbackResponse, getContextualFallback } from '@/lib/fallback-responses'

export type FallbackState = 'loading' | 'error' | 'empty' | 'offline' | 'success'

interface UseFallbackOptions {
  feature: string
  initialState?: FallbackState
  userContext?: {
    isNewUser?: boolean
    hasCompletedModules?: boolean
    streakDays?: number
    isFromBPO?: boolean
  }
  retryAttempts?: number
  retryDelay?: number
}

interface FallbackHookReturn {
  state: FallbackState
  isLoading: boolean
  isError: boolean
  isEmpty: boolean
  isOffline: boolean
  isSuccess: boolean
  setState: (state: FallbackState) => void
  setLoading: () => void
  setError: (error?: Error) => void
  setEmpty: () => void
  setSuccess: () => void
  retry: () => void
  retryCount: number
  fallbackResponse: any
}

export function useFallback({
  feature,
  initialState = 'loading',
  userContext,
  retryAttempts = 3,
  retryDelay = 1000
}: UseFallbackOptions): FallbackHookReturn {
  const [state, setState] = useState<FallbackState>(initialState)
  const [retryCount, setRetryCount] = useState(0)
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true)

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      if (state === 'offline') {
        setState('loading')
      }
    }
    
    const handleOffline = () => {
      setIsOnline(false)
      setState('offline')
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)

      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }
  }, [state])

  // Auto-detect offline state
  useEffect(() => {
    if (!isOnline && state !== 'offline') {
      setState('offline')
    }
  }, [isOnline, state])

  // Get appropriate fallback response
  const fallbackResponse = userContext 
    ? getContextualFallback(feature, userContext)
    : getFallbackResponse(feature as any, state === 'success' ? 'empty' : state)

  // Retry function with exponential backoff
  const retry = useCallback(async () => {
    if (retryCount >= retryAttempts) {
      console.warn(`Max retry attempts (${retryAttempts}) reached for feature: ${feature}`)
      return
    }

    setState('loading')
    setRetryCount(prev => prev + 1)

    // Exponential backoff delay
    const delay = retryDelay * Math.pow(2, retryCount)
    
    setTimeout(() => {
      // This would typically trigger a data refetch
      // For now, we'll just reset to loading state
      console.log(`Retrying ${feature} (attempt ${retryCount + 1}/${retryAttempts})`)
    }, delay)
  }, [feature, retryCount, retryAttempts, retryDelay])

  // Helper functions for state management
  const setLoading = useCallback(() => setState('loading'), [])
  const setError = useCallback((error?: Error) => {
    console.error(`Error in ${feature}:`, error)
    setState('error')
  }, [feature])
  const setEmpty = useCallback(() => setState('empty'), [])
  const setSuccess = useCallback(() => {
    setState('success')
    setRetryCount(0) // Reset retry count on success
  }, [])

  // Computed state flags
  const isLoading = state === 'loading'
  const isError = state === 'error'
  const isEmpty = state === 'empty'
  const isOffline = state === 'offline'
  const isSuccess = state === 'success'

  return {
    state,
    isLoading,
    isError,
    isEmpty,
    isOffline,
    isSuccess,
    setState,
    setLoading,
    setError,
    setEmpty,
    setSuccess,
    retry,
    retryCount,
    fallbackResponse
  }
}

// Specialized hooks for common patterns

export function useDataFetch<T>(
  fetchFn: () => Promise<T>,
  feature: string,
  dependencies: any[] = [],
  options?: Omit<UseFallbackOptions, 'feature'>
) {
  const fallback = useFallback({ feature, ...options })
  const [data, setData] = useState<T | null>(null)

  const fetchData = useCallback(async () => {
    try {
      fallback.setLoading()
      const result = await fetchFn()
      
      if (!result || (Array.isArray(result) && result.length === 0)) {
        fallback.setEmpty()
        setData(null)
      } else {
        fallback.setSuccess()
        setData(result)
      }
    } catch (error) {
      fallback.setError(error as Error)
      setData(null)
    }
  }, [fetchFn, fallback])

  useEffect(() => {
    fetchData()
  }, dependencies)

  return {
    ...fallback,
    data,
    refetch: fetchData
  }
}

// Hook for handling async operations with fallbacks
export function useAsyncOperation<T>(
  operation: () => Promise<T>,
  feature: string,
  options?: Omit<UseFallbackOptions, 'feature'>
) {
  const fallback = useFallback({ feature, initialState: 'success', ...options })
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(async (...args: any[]) => {
    try {
      fallback.setLoading()
      const result = await operation()
      fallback.setSuccess()
      setData(result)
      return result
    } catch (error) {
      fallback.setError(error as Error)
      throw error
    }
  }, [operation, fallback])

  return {
    ...fallback,
    data,
    execute
  }
}

// Hook for paginated data with fallbacks
export function usePaginatedData<T>(
  fetchFn: (page: number, limit: number) => Promise<{ data: T[], total: number, hasMore: boolean }>,
  feature: string,
  initialLimit: number = 10,
  options?: Omit<UseFallbackOptions, 'feature'>
) {
  const fallback = useFallback({ feature, ...options })
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  const loadData = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    try {
      if (!append) fallback.setLoading()
      
      const result = await fetchFn(pageNum, initialLimit)
      
      if (!result.data || result.data.length === 0) {
        if (pageNum === 1) {
          fallback.setEmpty()
          setData([])
        }
      } else {
        fallback.setSuccess()
        setData(prev => append ? [...prev, ...result.data] : result.data)
        setHasMore(result.hasMore)
        setTotal(result.total)
        setPage(pageNum)
      }
    } catch (error) {
      fallback.setError(error as Error)
      if (!append) setData([])
    }
  }, [fetchFn, initialLimit, fallback])

  const loadMore = useCallback(() => {
    if (hasMore && !fallback.isLoading) {
      loadData(page + 1, true)
    }
  }, [hasMore, fallback.isLoading, page, loadData])

  const refresh = useCallback(() => {
    setPage(1)
    setHasMore(true)
    loadData(1, false)
  }, [loadData])

  useEffect(() => {
    loadData(1, false)
  }, [])

  return {
    ...fallback,
    data,
    page,
    hasMore,
    total,
    loadMore,
    refresh
  }
}

// Hook for real-time data with fallbacks
export function useRealtimeData<T>(
  initialFetch: () => Promise<T>,
  subscribe: (callback: (data: T) => void) => () => void,
  feature: string,
  options?: Omit<UseFallbackOptions, 'feature'>
) {
  const fallback = useFallback({ feature, ...options })
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    const initializeData = async () => {
      try {
        fallback.setLoading()
        const initialData = await initialFetch()
        
        if (!initialData) {
          fallback.setEmpty()
        } else {
          fallback.setSuccess()
          setData(initialData)
          
          // Set up real-time subscription
          unsubscribe = subscribe((newData) => {
            setData(newData)
            if (!newData) {
              fallback.setEmpty()
            } else if (fallback.state !== 'success') {
              fallback.setSuccess()
            }
          })
        }
      } catch (error) {
        fallback.setError(error as Error)
      }
    }

    initializeData()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return {
    ...fallback,
    data
  }
}