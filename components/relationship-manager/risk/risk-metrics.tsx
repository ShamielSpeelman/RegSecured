"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingDown, Shield } from "lucide-react"

export function RiskMetrics() {
  const metrics = [
    {
      title: "High Risk Clients",
      value: 8,
      change: "+1",
      changeType: "negative",
      description: "From last quarter",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Medium Risk Clients",
      value: 24,
      change: "-3",
      changeType: "positive",
      description: "From last quarter",
      icon: Shield,
      color: "text-amber-600",
    },
    {
      title: "Low Risk Clients",
      value: 42,
      change: "+5",
      changeType: "positive",
      description: "From last quarter",
      icon: Shield,
      color: "text-green-600",
    },
    {
      title: "Average Risk Score",
      value: "65/100",
      change: "-3",
      changeType: "positive",
      description: "From last quarter",
      icon: TrendingDown,
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
