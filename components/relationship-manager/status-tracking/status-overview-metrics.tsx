"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, CheckCircle, AlertTriangle, Shield } from "lucide-react"

export function StatusOverviewMetrics() {
  const metrics = [
    {
      title: "Active Onboardings",
      value: "24",
      change: "+3 from last week",
      icon: Users,
      color: "blue",
    },
    {
      title: "Pending KYC Reviews",
      value: "8",
      change: "-2 from yesterday",
      icon: Shield,
      color: "orange",
    },
    {
      title: "Completed This Month",
      value: "47",
      change: "+12% vs last month",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Overdue Items",
      value: "3",
      change: "Requires attention",
      icon: AlertTriangle,
      color: "red",
    },
  ]

  const completionRates = [
    { stage: "Initial Data Collection", rate: 92 },
    { stage: "Document Verification", rate: 78 },
    { stage: "KYC Review", rate: 85 },
    { stage: "Compliance Approval", rate: 71 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stage Completion Rates</CardTitle>
          <CardDescription>Average completion rates across onboarding stages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {completionRates.map((stage, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{stage.stage}</span>
                <span>{stage.rate}%</span>
              </div>
              <Progress value={stage.rate} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
