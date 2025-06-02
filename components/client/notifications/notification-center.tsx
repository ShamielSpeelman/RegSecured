"use client"

import { useState } from "react"
import { Bell, CheckCircle, AlertCircle, Clock, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type NotificationType = "info" | "success" | "warning" | "error" | "reminder"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  link?: string
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onDismiss: (id: string) => void
  className?: string
}

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  className,
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead
    return true
  })

  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "reminder":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <FileText className="h-5 w-5 text-slate-500" />
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString()
  }

  return (
    <Card className={cn("border-stone-200/70", className)}>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg font-medium">Notifications</CardTitle>
          {unreadCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn("text-xs h-8", filter === "all" && "bg-slate-100")}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("text-xs h-8", filter === "unread" && "bg-slate-100")}
            onClick={() => setFilter("unread")}
          >
            Unread
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8 text-blue-600 hover:text-blue-700"
              onClick={onMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0 max-h-[400px] overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="py-8 text-center">
            <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">
              {filter === "all" ? "No notifications to display" : "No unread notifications"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 hover:bg-slate-50 transition-colors relative",
                  !notification.isRead && "bg-blue-50/30",
                )}
                onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
              >
                <div className="flex">
                  <div className="mr-3 mt-0.5">{getNotificationIcon(notification.type)}</div>

                  <div className="flex-1 pr-8">
                    <h4 className="text-sm font-medium text-slate-800">{notification.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{notification.message}</p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">{formatTimestamp(notification.timestamp)}</span>

                      {notification.action && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-xs text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            notification.action?.onClick()
                          }}
                        >
                          {notification.action.label}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDismiss(notification.id)
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
