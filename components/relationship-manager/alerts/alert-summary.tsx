"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Clock, Shield, User, FileText } from "lucide-react"

export function AlertSummary() {
  const alertCategories = [
    {
      name: "KYC Alerts",
      count: 5,
      total: 12,
      percentage: 42,
      icon: User,
      color: "text-blue-600",
    },
    {
      name: "Document Alerts",
      count: 8,
      total: 15,
      percentage: 53,
      icon: FileText,
      color: "text-amber-600",
    },
    {
      name: "Compliance Alerts",
      count: 3,
      total: 10,
      percentage: 30,
      icon: Shield,
      color: "text-purple-600",
    },
    {
      name: "Risk Alerts",
      count: 4,
      total: 8,
      percentage: 50,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      name: "Deadline Alerts",
      count: 7,
      total: 14,
      percentage: 50,
      icon: Clock,
      color: "text-red-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Alert Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alertCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <category.icon className={`h-4 w-4 mr-2 ${category.color}`} />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {category.count} of {category.total}
                </span>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
