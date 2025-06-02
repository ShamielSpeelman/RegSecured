"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertTriangle, Calendar } from "lucide-react"

export function ComplianceMetrics() {
  const metrics = [
    {
      title: "Compliant Clients",
      value: "85%",
      change: "+3%",
      changeType: "positive",
      description: "From last quarter",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pending Reviews",
      value: 14,
      change: "-2",
      changeType: "positive",
      description: "From last month",
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Compliance Issues",
      value: 7,
      change: "+2",
      changeType: "negative",
      description: "From last month",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Upcoming Deadlines",
      value: 9,
      change: "+3",
      changeType: "neutral",
      description: "Next 30 days",
      icon: Calendar,
      color: "text-blue-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  metric.changeType === "positive"
                    ? "text-green-600"
                    : metric.changeType === "negative"
                      ? "text-red-600"
                      : ""
                }
              >
                {metric.change}
              </span>{" "}
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
