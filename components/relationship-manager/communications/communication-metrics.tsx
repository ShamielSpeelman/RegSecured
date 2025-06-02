import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Clock, TrendingUp } from "lucide-react"

export function CommunicationMetrics() {
  const metrics = [
    {
      title: "Messages Sent",
      value: "156",
      change: "+23",
      changeType: "positive",
      icon: Send,
      color: "bg-blue-500",
      period: "This Month",
    },
    {
      title: "Response Rate",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: TrendingUp,
      color: "bg-green-500",
      period: "Average",
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-0.3h",
      changeType: "positive",
      icon: Clock,
      color: "bg-orange-500",
      period: "This Week",
    },
    {
      title: "Active Conversations",
      value: "34",
      change: "+8",
      changeType: "positive",
      icon: MessageSquare,
      color: "bg-purple-500",
      period: "Current",
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
                <Badge variant={metric.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
                <p className="text-sm text-slate-600">{metric.title}</p>
                <p className="text-xs text-slate-500">{metric.period}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
