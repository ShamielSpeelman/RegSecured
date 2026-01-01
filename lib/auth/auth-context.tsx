"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { authService } from "./auth-service"
import type { AuthUser, UserRole } from "./auth-types"
import { ROLE_DASHBOARDS } from "./auth-types"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (
    email: string,
    password: string,
    tenantId: string,
    role: UserRole,
    firstName?: string,
    lastName?: string,
  ) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      console.log("[v0] Initializing auth state")
      const { user: currentUser } = await authService.getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    initAuth()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] Auth state changed:", event)

      if (event === "SIGNED_IN" && session) {
        const { user: currentUser } = await authService.getCurrentUser()
        setUser(currentUser)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      } else if (event === "TOKEN_REFRESHED") {
        const { user: currentUser } = await authService.getCurrentUser()
        setUser(currentUser)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const { user: authUser, error } = await authService.signIn(email, password)

    if (authUser && !error) {
      setUser(authUser)
      // Redirect to role-specific dashboard
      const dashboardPath = ROLE_DASHBOARDS[authUser.profile.role]
      router.push(dashboardPath)
    }

    setLoading(false)
    return { error }
  }

  const signUp = async (
    email: string,
    password: string,
    tenantId: string,
    role: UserRole,
    firstName?: string,
    lastName?: string,
  ) => {
    setLoading(true)
    const { user: authUser, error } = await authService.signUp(email, password, tenantId, role, firstName, lastName)

    if (authUser && !error) {
      setUser(authUser)
      // Redirect to role-specific dashboard
      const dashboardPath = ROLE_DASHBOARDS[authUser.profile.role]
      router.push(dashboardPath)
    }

    setLoading(false)
    return { error }
  }

  const signOut = async () => {
    setLoading(true)
    await authService.signOut()
    setUser(null)
    setLoading(false)
    router.push("/auth")
  }

  const refreshUser = async () => {
    const { user: currentUser } = await authService.getCurrentUser()
    setUser(currentUser)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
