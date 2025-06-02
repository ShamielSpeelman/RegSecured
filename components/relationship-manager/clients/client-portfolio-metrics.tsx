import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export function ClientPortfolioMetrics() {
  const metrics = [
    {
      title: "Total Clients",
      value: "247",
      change: "+12",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Clients",
      value: "198",
      change: "+8",
      changeType: "positive",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Onboarding",
      value: "23",
      change: "+5",
      changeType: "positive",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
    {
      title: "Requires Attention",
      value: "12",
      change: "-3",
      changeType: "negative",
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index} className="border border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
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
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
