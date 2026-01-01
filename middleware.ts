import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { ROLE_ROUTE_ACCESS, type UserRole } from "@/lib/auth/auth-types"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth", "/api"]
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // Refresh session
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // If no user, redirect to auth
  if (!user || error) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // Fetch user profile to check role and tenant
  const { data: profile } = await supabase
    .from("regsec_user_profiles")
    .select("role, is_active, tenant_id, tenant:regsec_tenants(is_active)")
    .eq("auth_user_id", user.id)
    .single()

  if (!profile || !profile.is_active || !profile.tenant.is_active) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth"
    url.searchParams.set("error", "Account inactive")
    return NextResponse.redirect(url)
  }

  // Check role-based route access
  const userRole = profile.role as UserRole
  const allowedPrefixes = ROLE_ROUTE_ACCESS[userRole]
  const hasAccess = allowedPrefixes.some((prefix) => pathname.startsWith(prefix))

  if (!hasAccess) {
    // Redirect to user's dashboard if trying to access unauthorized route
    const dashboardPath = allowedPrefixes[0] // First allowed route is dashboard
    const url = request.nextUrl.clone()
    url.pathname = dashboardPath
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
