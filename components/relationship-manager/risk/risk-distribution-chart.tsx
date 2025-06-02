"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RiskDistributionChart() {
  // In a real application, this would be a chart component
  // For this example, we'll create a simple visual representation

  const riskDistribution = {
    high: 11,
    medium: 32,
    low: 57,
  }

  const totalClients = riskDistribution.high + riskDistribution.medium + riskDistribution.low

  const highPercentage = Math.round((riskDistribution.high / totalClients) * 100)
  const mediumPercentage = Math.round((riskDistribution.medium / totalClients) * 100)
  const lowPercentage = Math.round((riskDistribution.low / totalClients) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Risk Distribution</CardTitle>
        <CardDescription>Client portfolio risk breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex h-4 w-full overflow-hidden rounded-full">
            <div className="bg-red-500 transition-all" style={{ width: `${highPercentage}%` }} />
            <div className="bg-amber-500 transition-all" style={{ width: `${mediumPercentage}%` }} />
            <div className="bg-green-500 transition-all" style={{ width: `${lowPercentage}%` }} />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm font-medium">High Risk</span>
              </div>
              <div className="mt-1">
                <span className="text-2xl font-bold">{highPercentage}%</span>
                <div className="text-xs text-muted-foreground">{riskDistribution.high} clients</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-sm font-medium">Medium Risk</span>
              </div>
              <div className="mt-1">
                <span className="text-2xl font-bold">{mediumPercentage}%</span>
                <div className="text-xs text-muted-foreground">{riskDistribution.medium} clients</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Low Risk</span>
              </div>
              <div className="mt-1">
                <span className="text-2xl font-bold">{lowPercentage}%</span>
                <div className="text-xs text-muted-foreground">{riskDistribution.low} clients</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Clients:</span>
              <span className="font-medium">{totalClients}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
