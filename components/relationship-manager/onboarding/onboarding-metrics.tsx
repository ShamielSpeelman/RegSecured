"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownRight, Clock, AlertCircle } from "lucide-react"

export function OnboardingMetrics() {
  const [timeframe, setTimeframe] = useState("month")

  // Sample metrics data - in a real app, this would come from an API
  const metrics = {
    week: {
      initiated: 8,
      completed: 5,
      avgTime: "2.3 days",
      pendingReview: 3,
      initiatedChange: 14,
      completedChange: -5,
      avgTimeChange: -10,
    },
    month: {
      initiated: 24,
      completed: 19,
      avgTime: "2.8 days",
      pendingReview: 7,
      initiatedChange: 20,
      completedChange: 15,
      avgTimeChange: -15,
    },
    quarter: {
      initiated: 68,
      completed: 62,
      avgTime: "3.2 days",
      pendingReview: 12,
      initiatedChange: 8,
      completedChange: 12,
      avgTimeChange: -22,
    },
  }

  const currentMetrics = metrics[timeframe as keyof typeof metrics]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500">Initiated</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-semibold">{currentMetrics.initiated}</span>
                <div
                  className={`flex items-center text-xs ${currentMetrics.initiatedChange >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {currentMetrics.initiatedChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(currentMetrics.initiatedChange)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500">Completed</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-semibold">{currentMetrics.completed}</span>
                <div
                  className={`flex items-center text-xs ${currentMetrics.completedChange >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {currentMetrics.completedChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(currentMetrics.completedChange)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col">
            <span className="text-sm text-slate-500">Average Onboarding Time</span>
            <div className="flex items-baseline justify-between mt-1">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-2xl font-semibold">{currentMetrics.avgTime}</span>
              </div>
              <div
                className={`flex items-center text-xs ${currentMetrics.avgTimeChange <= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {currentMetrics.avgTimeChange <= 0 ? (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(currentMetrics.avgTimeChange)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
          <div>
            <div className="text-sm font-medium">Pending Review</div>
            <div className="text-xl font-semibold">{currentMetrics.pendingReview}</div>
          </div>
        </div>
        <Button size="sm" variant="outline">
          View All
        </Button>
      </div>
    </div>
  )
}
