"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, AlertTriangle, Info, Clock, Settings, Trash2, Calendar } from "lucide-react"
import { useState } from "react"

const notifications = [
  {
    id: "1",
    type: "success",
    title: "Document Verified",
    message: "Your passport document has been successfully verified.",
    timestamp: "2024-01-29T10:30:00Z",
    read: false,
    category: "verification",
  },
  {
    id: "2",
    type: "warning",
    title: "Document Expiring Soon",
    message: "Your utility bill will expire in 7 days. Please upload a new one.",
    timestamp: "2024-01-29T09:15:00Z",
    read: false,
    category: "document",
  },
  {
    id: "3",
    type: "info",
    title: "Application Status Update",
    message: "Your application has moved to the final review stage.",
    timestamp: "2024-01-28T16:45:00Z",
    read: true,
    category: "application",
  },
  {
    id: "4",
    type: "error",
    title: "Action Required",
    message: "Additional information needed for your KYC verification.",
    timestamp: "2024-01-28T14:20:00Z",
    read: false,
    category: "action",
  },
  {
    id: "5",
    type: "info",
    title: "Welcome to RegSecured",
    message: "Thank you for choosing RegSecured. Your onboarding journey has begun.",
    timestamp: "2024-01-25T12:00:00Z",
    read: true,
    category: "system",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    case "error":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "info":
    default:
      return <Info className="h-5 w-5 text-blue-500" />
  }
}

const getNotificationBadge = (type: string) => {
  switch (type) {
    case "success":
      return <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
    case "warning":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
    case "error":
      return <Badge className="bg-red-100 text-red-800 border-red-200">Action Required</Badge>
    case "info":
    default:
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>
  }
}

export default function NotificationsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    documentUpdates: true,
    applicationUpdates: true,
    securityAlerts: true,
    marketingUpdates: false,
  })

  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredNotifications = notifications.filter(
    (notification) => selectedCategory === "all" || notification.category === selectedCategory,
  )

  const unreadCount = notifications.filter((n) => !n.read).length
  const notificationStats = {
    total: notifications.length,
    unread: unreadCount,
    today: notifications.filter((n) => {
      const today = new Date().toDateString()
      return new Date(n.timestamp).toDateString() === today
    }).length,
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const markAsRead = (id: string) => {
    // Mark notification as read logic
  }

  const markAllAsRead = () => {
    // Mark all notifications as read logic
  }

  const deleteNotification = (id: string) => {
    // Delete notification logic
  }

  return (
    <DashboardLayout userRole="client">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/client">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Communications</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Notifications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-slate-800 mb-2">Notifications</h1>
              <p className="text-slate-600 font-light">View system notifications and updates</p>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Notification Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Notifications</p>
                  <p className="text-2xl font-semibold">{notificationStats.total}</p>
                </div>
                <Bell className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Unread</p>
                  <p className="text-2xl font-semibold text-blue-600">{notificationStats.unread}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Today</p>
                  <p className="text-2xl font-semibold text-green-600">{notificationStats.today}</p>
                </div>
                <Clock className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            {/* Category Filter */}
            <Card>
              <CardContent className="p-4">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                    <TabsTrigger value="document">Documents</TabsTrigger>
                    <TabsTrigger value="application">Application</TabsTrigger>
                    <TabsTrigger value="action">Action Required</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className={`${!notification.read ? "border-blue-200 bg-blue-50" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${!notification.read ? "text-slate-900" : "text-slate-700"}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            {getNotificationBadge(notification.type)}
                          </div>
                          <p className="text-slate-600 text-sm mb-2">{notification.message}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Calendar className="h-3 w-3" />
                            {formatTimestamp(notification.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredNotifications.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No notifications found for this category</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Customize how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Methods</h4>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-slate-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-slate-500">Receive browser push notifications</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-slate-500">Receive urgent alerts via SMS</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="documentUpdates">Document Updates</Label>
                      <p className="text-sm text-slate-500">Verification status and document expiry alerts</p>
                    </div>
                    <Switch
                      id="documentUpdates"
                      checked={notificationSettings.documentUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, documentUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="applicationUpdates">Application Updates</Label>
                      <p className="text-sm text-slate-500">Status changes in your onboarding process</p>
                    </div>
                    <Switch
                      id="applicationUpdates"
                      checked={notificationSettings.applicationUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, applicationUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="securityAlerts">Security Alerts</Label>
                      <p className="text-sm text-slate-500">Important security notifications (recommended)</p>
                    </div>
                    <Switch
                      id="securityAlerts"
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, securityAlerts: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingUpdates">Marketing Updates</Label>
                      <p className="text-sm text-slate-500">Product updates and promotional content</p>
                    </div>
                    <Switch
                      id="marketingUpdates"
                      checked={notificationSettings.marketingUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, marketingUpdates: checked })
                      }
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
