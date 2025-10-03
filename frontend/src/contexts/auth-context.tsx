'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@/types'
import { authApi } from '@/lib/api'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  const refreshTokens = React.useCallback(async (): Promise<boolean> => {
    try {
      const refresh = localStorage.getItem('refresh_token')
      if (!refresh) return false

      const response = await authApi.refreshToken(refresh)
      const { access } = response

      localStorage.setItem('access_token', access)
      return true
    } catch (error) {
      return false
    }
  }, [])

  const logout = React.useCallback(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
    toast.success('Logged out successfully')
  }, [])

  const fetchUserProfile = React.useCallback(async () => {
    try {
      const response = await authApi.getProfile()
      setUser(response)
    } catch (error) {
      // Token might be expired, try to refresh
      const refreshSuccess = await refreshTokens()
      if (!refreshSuccess) {
        logout()
      }
    } finally {
      setIsLoading(false)
    }
  }, [refreshTokens, logout])

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')

    if (token && refreshToken) {
      // Verify token and get user data
      fetchUserProfile()
    } else {
      setIsLoading(false)
    }
  }, [fetchUserProfile])

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      const response = await authApi.login(credentials)
      const { user, access, refresh } = response

      // Store tokens
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)

      setUser(user)
      toast.success('Login successful!')
    } catch (error: any) {
      // Fixed: Since we're using fetch API, not axios
      const message = error.message || 'Login failed'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true)
      const response = await authApi.register(data)
      const { user, access, refresh } = response

      // Store tokens
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)

      setUser(user)
      toast.success('Registration successful!')
    } catch (error: any) {
      // Fixed: Since we're using fetch API, not axios
      const message = error.message || 'Registration failed'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken: refreshTokens, // Use the renamed function
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
