"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { getNavigationForRole, type NavigationItem } from "@/lib/navigation-config"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/lib/auth/auth-context"

interface AdaptiveSidebarProps {
  userRole: string
  className?: string
}

const getClientProfile = () => {
  if (typeof window === "undefined") return null

  const savedProfile = localStorage.getItem("clientProfile")
  if (savedProfile) {
    return JSON.parse(savedProfile)
  }
  return null
}

export function AdaptiveSidebar({ userRole, className }: AdaptiveSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [contextualItems, setContextualItems] = useState<NavigationItem[]>([])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [clientProfile, setClientProfile] = useState<any>(null)
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (userRole === "client") {
      const profile = getClientProfile()
      setClientProfile(profile)
    }
  }, [userRole])

  const navigation = getNavigationForRole(
    userRole,
    clientProfile?.entityType,
    clientProfile?.scenario,
    clientProfile?.role,
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSectionClick = (item: NavigationItem) => {
    if (item.children) {
      if (activeSection === item.id) {
        setActiveSection(null)
        setContextualItems([])
      } else {
        setActiveSection(item.id)
        setContextualItems(item.children)
      }
    } else if (item.href) {
      setActiveSection(null)
      setContextualItems([])
    }
  }

  const isActiveItem = (item: NavigationItem): boolean => {
    if (item.href && pathname === item.href) return true
    if (item.children) {
      return item.children.some((child) => child.href === pathname)
    }
    return false
  }

  const getUserDisplayName = () => {
    if (user) {
      const { first_name, last_name, role } = user.profile
      if (first_name && last_name) {
        return `${first_name} ${last_name}`
      }
      if (first_name) return first_name
      return role.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    }

    if (userRole === "client" && clientProfile) {
      return clientProfile.entityName || "Client"
    }
    return userRole.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const getUserInitials = () => {
    if (user?.profile.first_name && user?.profile.last_name) {
      return `${user.profile.first_name[0]}${user.profile.last_name[0]}`.toUpperCase()
    }
    if (user?.profile.first_name) {
      return user.profile.first_name.substring(0, 2).toUpperCase()
    }
    if (userRole === "client" && clientProfile) {
      return (
        clientProfile.entityName
          ?.split(" ")
          .map((n: string) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase() || "CL"
      )
    }
    return userRole.charAt(0).toUpperCase()
  }

  const getTenantInfo = () => {
    if (user?.tenant) {
      return `${user.tenant.name} • ${user.tenant.subscription_tier}`
    }
    return "Online"
  }

  return (
    <div className={cn("flex h-screen bg-stone-50 border-r border-stone-200", className)}>
      {/* Primary Sidebar */}
      <div
        className={cn(
          "flex flex-col bg-white border-r border-stone-200 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          {!isCollapsed && <span className="text-lg font-medium text-slate-800">RegSecured</span>}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-2 space-y-1">
          <TooltipProvider>
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = isActiveItem(item)
              const hasChildren = item.children && item.children.length > 0

              return (
                <div key={item.id}>
                  {item.href ? (
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-10",
                          isActive && "bg-slate-100 text-slate-900",
                          isCollapsed && "px-2",
                        )}
                      >
                        <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </Button>
                    </Link>
                  ) : (
                    <>
                      {isCollapsed && hasChildren ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start h-10 px-2",
                                (isActive || activeSection === item.id) && "bg-slate-100 text-slate-900",
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="p-0">
                            <div className="bg-white bg-opacity-40 border border-stone-200 rounded-md shadow-lg w-fit max-w-[250px]">
                              <div className="p-2 border-b border-stone-200">
                                <span className="text-xs font-medium text-slate-900">{item.label}</span>
                              </div>
                              <div className="p-1">
                                {item.children?.map((child) => {
                                  const ChildIcon = child.icon
                                  const isChildActive = pathname === child.href
                                  return (
                                    <Link key={child.id} href={child.href || "#"}>
                                      <Button
                                        variant="ghost"
                                        className={cn(
                                          "w-full justify-start h-9 text-xs",
                                          isChildActive && "bg-slate-100 text-slate-900",
                                        )}
                                      >
                                        <ChildIcon className="h-4 w-4 mr-3" />
                                        <span className="truncate">{child.label}</span>
                                      </Button>
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Button
                          variant="ghost"
                          onClick={() => handleSectionClick(item)}
                          className={cn(
                            "w-full justify-start h-10",
                            (isActive || activeSection === item.id) && "bg-slate-100 text-slate-900",
                            isCollapsed && "px-2",
                          )}
                        >
                          <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                          {!isCollapsed && (
                            <>
                              <span className="truncate flex-1 text-left">{item.label}</span>
                              {hasChildren && (
                                <ChevronRight
                                  className={cn(
                                    "h-4 w-4 transition-transform",
                                    activeSection === item.id && "rotate-90",
                                  )}
                                />
                              )}
                            </>
                          )}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </TooltipProvider>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-stone-200">
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
            <div className={cn("flex items-center", isCollapsed ? "" : "space-x-3")}>
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">{getUserInitials()}</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{getUserDisplayName()}</p>
                  <p className="text-xs text-slate-500 truncate">{getTenantInfo()}</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Contextual Panel */}
      {contextualItems.length > 0 && !isCollapsed && (
        <div className="w-64 bg-stone-50 border-r border-stone-200">
          <div className="p-4 border-b border-stone-200">
            <h3 className="text-sm font-medium text-slate-900">
              {navigation.find((item) => item.id === activeSection)?.label}
            </h3>
          </div>
          <nav className="p-2 space-y-1">
            {contextualItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.id} href={item.href || "#"}>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start h-9 text-sm", isActive && "bg-white text-slate-900 shadow-sm")}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    <span className="truncate">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}
