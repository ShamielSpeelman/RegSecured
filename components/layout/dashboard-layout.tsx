"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdaptiveSidebar } from "@/components/navigation/adaptive-sidebar"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: string
  className?: string
}

export function DashboardLayout({ children, userRole, className }: DashboardLayoutProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-50">
        <div className="w-64 bg-white border-r border-stone-200 animate-pulse" />
        <div className="flex-1 bg-slate-50 animate-pulse" />
      </div>
    )
  }

  return (
    <div className={cn("flex h-screen bg-slate-50", className)}>
      <AdaptiveSidebar userRole={userRole} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
