"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, FileText, AlertTriangle, CheckCircle } from "lucide-react"

export function UpcomingDeadlines() {
  const deadlines = [
    {
      id: "1",
      title: "KYC Documentation Due",
      client: "Sarah Johnson",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "Today",
      dueTime: "5:00 PM",
      priority: "high",
      type: "KYC",
      status: "pending",
    },
    {
      id: "2",
      title: "Onboarding Review Deadline",
      client: "TechCorp Ltd",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "Tomorrow",
      dueTime: "2:00 PM",
      priority: "medium",
      type: "Review",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Compliance Report Submission",
      client: "Global Investments",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "Dec 18",
      dueTime: "11:59 PM",
      priority: "high",
      type: "Compliance",
      status: "pending",
    },
    {
      id: "4",
      title: "Document Collection Follow-up",
      client: "Michael Chen",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "Dec 19",
      dueTime: "3:00 PM",
      priority: "low",
      type: "Documents",
      status: "scheduled",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-orange-600" />
    }
  }

  return (
    <Card className="border-stone-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stone-900">Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center space-x-4 p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <div className="flex-shrink-0">{getStatusIcon(deadline.status)}</div>

              <div className="flex-shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={deadline.clientAvatar || "/placeholder.svg"} alt={deadline.client} />
                  <AvatarFallback>
                    {deadline.client
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-stone-900 truncate">{deadline.title}</h4>
                  <Badge className={getPriorityColor(deadline.priority)}>{deadline.priority}</Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-stone-600">
                  <span>{deadline.client}</span>
                  <span>•</span>
                  <span>
                    {deadline.dueDate} at {deadline.dueTime}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center space-x-2">
                <Badge className={getStatusColor(deadline.status)}>{deadline.status}</Badge>
                <Button variant="outline" size="sm">
                  <FileText className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
