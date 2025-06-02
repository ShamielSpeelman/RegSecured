import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, CheckCircle, Bell } from "lucide-react"

export function OnboardingAlerts() {
  const alerts = [
    {
      id: 1,
      type: "overdue",
      title: "Overdue Review",
      client: "Michael Chen",
      message: "KYC review is 3 days overdue",
      time: "3 days ago",
      priority: "high",
    },
    {
      id: 2,
      type: "deadline",
      title: "Approaching Deadline",
      client: "Sarah Johnson",
      message: "Final approval due in 2 days",
      time: "Today",
      priority: "medium",
    },
    {
      id: 3,
      type: "completed",
      title: "Onboarding Complete",
      client: "Global Finance Ltd",
      message: "Successfully completed onboarding",
      time: "2 hours ago",
      priority: "low",
    },
    {
      id: 4,
      type: "action",
      title: "Action Required",
      client: "TechCorp Industries",
      message: "Additional documents requested",
      time: "4 hours ago",
      priority: "medium",
    },
    {
      id: 5,
      type: "reminder",
      title: "Follow-up Reminder",
      client: "Emma Rodriguez",
      message: "Schedule client check-in call",
      time: "6 hours ago",
      priority: "low",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "deadline":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "action":
        return <Bell className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">{getIcon(alert.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-slate-900">{alert.title}</h4>
                <Badge className={`text-xs ${getPriorityColor(alert.priority)}`}>{alert.priority}</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-1">{alert.client}</p>
              <p className="text-sm text-slate-700 mb-2">{alert.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{alert.time}</span>
                <Button variant="ghost" size="sm" className="text-xs">
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
