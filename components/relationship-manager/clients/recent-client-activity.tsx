import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, FileText, UserCheck, AlertTriangle } from "lucide-react"

export function RecentClientActivity() {
  const activities = [
    {
      id: 1,
      client: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "Document uploaded",
      type: "document",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      client: "TechCorp Industries",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "KYC review completed",
      type: "review",
      time: "4 hours ago",
      status: "success",
    },
    {
      id: 3,
      client: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "Message received",
      type: "message",
      time: "6 hours ago",
      status: "pending",
    },
    {
      id: 4,
      client: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "Risk assessment flagged",
      type: "alert",
      time: "1 day ago",
      status: "warning",
    },
    {
      id: 5,
      client: "Global Finance Ltd",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "Onboarding completed",
      type: "completion",
      time: "2 days ago",
      status: "success",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return MessageSquare
      case "document":
        return FileText
      case "review":
      case "completion":
        return UserCheck
      case "alert":
        return AlertTriangle
      default:
        return FileText
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = getIcon(activity.type)
        return (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.client} />
              <AvatarFallback>
                {activity.client
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900 truncate">{activity.client}</p>
                <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                  <Icon className="h-3 w-3 mr-1" />
                  {activity.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-600">{activity.action}</p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
