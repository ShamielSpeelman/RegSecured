import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { AuthUser, UserProfile, TenantInfo, UserRole } from "./auth-types"

export class AuthService {
  private supabase = getSupabaseBrowserClient()

  /**
   * Sign in with email and password
   * Validates tenant access and fetches complete user profile
   */
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: Error | null }> {
    try {
      // Authenticate with Supabase
      const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        return { user: null, error: authError }
      }

      if (!authData.user) {
        return { user: null, error: new Error("Authentication failed") }
      }

      // Fetch user profile with tenant information
      const { data: profile, error: profileError } = await this.supabase
        .from("regsec_user_profiles")
        .select(`
          *,
          tenant:regsec_tenants(*)
        `)
        .eq("auth_user_id", authData.user.id)
        .single()

      if (profileError || !profile) {
        console.error("[v0] Profile fetch error:", profileError)
        await this.supabase.auth.signOut()
        return { user: null, error: new Error("User profile not found") }
      }

      // Check if user and tenant are active
      if (!profile.is_active) {
        await this.supabase.auth.signOut()
        return { user: null, error: new Error("User account is inactive") }
      }

      if (!profile.tenant.is_active) {
        await this.supabase.auth.signOut()
        return { user: null, error: new Error("Organization account is inactive") }
      }

      // Update last login timestamp
      await this.supabase
        .from("regsec_user_profiles")
        .update({ last_login_at: new Date().toISOString() })
        .eq("id", profile.id)

      const authUser: AuthUser = {
        id: authData.user.id,
        email: authData.user.email!,
        profile: profile as UserProfile,
        tenant: profile.tenant as TenantInfo,
      }

      console.log("[v0] Sign in successful:", { role: profile.role, tenant: profile.tenant.name })

      return { user: authUser, error: null }
    } catch (error) {
      console.error("[v0] Sign in error:", error)
      return { user: null, error: error as Error }
    }
  }

  /**
   * Sign up new user
   * Creates auth user and user profile in single transaction
   */
  async signUp(
    email: string,
    password: string,
    tenantId: string,
    role: UserRole,
    firstName?: string,
    lastName?: string,
  ): Promise<{ user: AuthUser | null; error: Error | null }> {
    try {
      // Create auth user
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
        },
      })

      if (authError) {
        return { user: null, error: authError }
      }

      if (!authData.user) {
        return { user: null, error: new Error("Sign up failed") }
      }

      // Create user profile
      const { data: profile, error: profileError } = await this.supabase
        .from("regsec_user_profiles")
        .insert({
          auth_user_id: authData.user.id,
          tenant_id: tenantId,
          email,
          first_name: firstName,
          last_name: lastName,
          role,
          is_active: true,
        })
        .select(`
          *,
          tenant:regsec_tenants(*)
        `)
        .single()

      if (profileError || !profile) {
        console.error("[v0] Profile creation error:", profileError)
        // Clean up auth user if profile creation fails
        await this.supabase.auth.admin.deleteUser(authData.user.id)
        return { user: null, error: new Error("Failed to create user profile") }
      }

      const authUser: AuthUser = {
        id: authData.user.id,
        email: authData.user.email!,
        profile: profile as UserProfile,
        tenant: profile.tenant as TenantInfo,
      }

      console.log("[v0] Sign up successful:", { role: profile.role, tenant: profile.tenant.name })

      return { user: authUser, error: null }
    } catch (error) {
      console.error("[v0] Sign up error:", error)
      return { user: null, error: error as Error }
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<{ error: Error | null }> {
    try {
      const { error } = await this.supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  /**
   * Get current authenticated user with profile
   */
  async getCurrentUser(): Promise<{ user: AuthUser | null; error: Error | null }> {
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !authUser) {
        return { user: null, error: authError }
      }

      // Fetch user profile with tenant
      const { data: profile, error: profileError } = await this.supabase
        .from("regsec_user_profiles")
        .select(`
          *,
          tenant:regsec_tenants(*)
        `)
        .eq("auth_user_id", authUser.id)
        .single()

      if (profileError || !profile) {
        return { user: null, error: new Error("User profile not found") }
      }

      const user: AuthUser = {
        id: authUser.id,
        email: authUser.email!,
        profile: profile as UserProfile,
        tenant: profile.tenant as TenantInfo,
      }

      return { user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  /**
   * Refresh session
   */
  async refreshSession() {
    const { data, error } = await this.supabase.auth.refreshSession()
    return { session: data.session, error }
  }
}

export const authService = new AuthService()
