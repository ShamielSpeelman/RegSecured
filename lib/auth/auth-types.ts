export type UserRole = "analyst" | "reviewer" | "relationship-manager" | "admin" | "superadmin" | "client"

export type TenantSubscriptionTier = "trial" | "starter" | "professional" | "enterprise"

export interface UserProfile {
  id: string
  auth_user_id: string
  tenant_id: string
  email: string
  first_name: string | null
  last_name: string | null
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
  last_login_at: string | null
  preferences: Record<string, any>
}

export interface TenantInfo {
  id: string
  name: string
  domain: string | null
  subscription_tier: TenantSubscriptionTier
  is_active: boolean
  settings: Record<string, any>
}

export interface AuthUser {
  id: string
  email: string
  profile: UserProfile
  tenant: TenantInfo
}

// Dashboard routes by role
export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  analyst: "/dashboard/analyst",
  reviewer: "/dashboard/reviewer",
  "relationship-manager": "/dashboard/relationship-manager",
  admin: "/dashboard/admin",
  superadmin: "/dashboard/superadmin",
  client: "/dashboard/client",
}

// Protected route prefixes by role
export const ROLE_ROUTE_ACCESS: Record<UserRole, string[]> = {
  analyst: [
    "/dashboard/analyst",
    "/cases",
    "/clients",
    "/screening",
    "/documents",
    "/reports/performance",
    "/reports/cases",
    "/reports/workload",
  ],
  reviewer: [
    "/dashboard/reviewer",
    "/review",
    "/risk",
    "/screening/disposition",
    "/screening/sanctions",
    "/screening/pep",
    "/compliance",
    "/reports/audit",
    "/reports/compliance",
    "/reports/regulatory",
    "/reports/risk",
  ],
  "relationship-manager": ["/dashboard/relationship-manager", "/relationship-manager"],
  admin: ["/dashboard/admin", "/config", "/monitoring", "/rules", "/users", "/reports/usage"],
  superadmin: ["/dashboard/superadmin", "/admin", "/config", "/monitoring", "/rules", "/users", "/reports"],
  client: ["/dashboard/client", "/client"],
}

// Check if user has access to a route
export function hasRouteAccess(role: UserRole, pathname: string): boolean {
  const allowedPrefixes = ROLE_ROUTE_ACCESS[role]
  return allowedPrefixes.some((prefix) => pathname.startsWith(prefix))
}
