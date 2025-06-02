import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, Circle } from "lucide-react"

export function OnboardingTimelineView() {
  const timelineData = [
    {
      id: "ONB-001",
      client: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      stages: [
        { name: "Initial Contact", status: "completed", date: "Jan 15" },
        { name: "Document Collection", status: "completed", date: "Jan 18" },
        { name: "KYC Review", status: "in-progress", date: "Jan 22" },
        { name: "Risk Assessment", status: "pending", date: "Jan 28" },
        { name: "Final Approval", status: "pending", date: "Feb 02" },
      ],
      progress: 75,
      priority: "High",
    },
    {
      id: "ONB-002",
      client: "TechCorp Industries",
      avatar: "/placeholder.svg?height=32&width=32",
      stages: [
        { name: "Initial Contact", status: "completed", date: "Jan 10" },
        { name: "Document Collection", status: "completed", date: "Jan 12" },
        { name: "KYC Review", status: "completed", date: "Jan 16" },
        { name: "Risk Assessment", status: "completed", date: "Jan 20" },
        { name: "Final Approval", status: "in-progress", date: "Jan 25" },
      ],
      progress: 90,
      priority: "Medium",
    },
    {
      id: "ONB-003",
      client: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      stages: [
        { name: "Initial Contact", status: "completed", date: "Jan 20" },
        { name: "Document Collection", status: "on-hold", date: "Jan 23" },
        { name: "KYC Review", status: "pending", date: "Jan 30" },
        { name: "Risk Assessment", status: "pending", date: "Feb 05" },
        { name: "Final Approval", status: "pending", date: "Feb 10" },
      ],
      progress: 45,
      priority: "High",
    },
  ]

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "on-hold":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {timelineData.map((item) => (
        <div key={item.id} className="border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.client} />
                <AvatarFallback>
                  {item.client
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-slate-900">{item.client}</h3>
                <p className="text-sm text-slate-600">{item.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
              <div className="text-right">
                <div className="text-sm font-medium">{item.progress}% Complete</div>
                <Progress value={item.progress} className="h-2 w-24" />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            <div className="space-y-4">
              {item.stages.map((stage, index) => (
                <div key={index} className="relative flex items-center space-x-4">
                  <div className="relative z-10 bg-white border-2 border-slate-200 rounded-full p-1">
                    {getStageIcon(stage.status)}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{stage.name}</p>
                      <p className="text-sm text-slate-600">{stage.date}</p>
                    </div>
                    <Badge variant={stage.status === "completed" ? "default" : "secondary"} className="capitalize">
                      {stage.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
