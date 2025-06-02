import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, AlertTriangle, Users } from "lucide-react"

export function OnboardingStatusMetrics() {
  const metrics = [
    {
      title: "Active Onboardings",
      value: "23",
      change: "+5",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500",
      progress: 75,
    },
    {
      title: "Completed This Month",
      value: "18",
      change: "+3",
      changeType: "positive",
      icon: CheckCircle,
      color: "bg-green-500",
      progress: 90,
    },
    {
      title: "Pending Review",
      value: "8",
      change: "+2",
      changeType: "neutral",
      icon: Clock,
      color: "bg-orange-500",
      progress: 60,
    },
    {
      title: "Overdue",
      value: "3",
      change: "-1",
      changeType: "negative",
      icon: AlertTriangle,
      color: "bg-red-500",
      progress: 25,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index} className="border border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <Badge
                  variant={
                    metric.changeType === "positive"
                      ? "default"
                      : metric.changeType === "negative"
                        ? "destructive"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
                <p className="text-sm text-slate-600">{metric.title}</p>
                <Progress value={metric.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
