"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Brain, Zap, TrendingUp, TrendingDown, Target, CheckCircle, Clock } from "lucide-react"

const optimizationRecommendations = [
  {
    id: 1,
    category: "Database",
    title: "Query Optimization",
    description: "Optimize slow-running queries affecting 23% of database operations",
    impact: "high",
    effort: "medium",
    estimatedImprovement: "34% faster response times",
    confidence: 92,
    status: "pending",
    details: "Add composite indexes on user_id + created_at columns",
  },
  {
    id: 2,
    category: "Cache",
    title: "Cache Strategy Enhancement",
    description: "Implement intelligent cache warming for frequently accessed data",
    impact: "high",
    effort: "low",
    estimatedImprovement: "45% reduction in API latency",
    confidence: 87,
    status: "in_progress",
    details: "Pre-load user profiles and compliance templates during off-peak hours",
  },
  {
    id: 3,
    category: "API",
    title: "Connection Pool Optimization",
    description: "Adjust database connection pool size based on usage patterns",
    impact: "medium",
    effort: "low",
    estimatedImprovement: "18% better resource utilization",
    confidence: 95,
    status: "completed",
    details: "Increased pool size from 20 to 35 connections during peak hours",
  },
  {
    id: 4,
    category: "Infrastructure",
    title: "Load Balancer Configuration",
    description: "Optimize load balancing algorithm for better traffic distribution",
    impact: "medium",
    effort: "medium",
    estimatedImprovement: "22% more even load distribution",
    confidence: 78,
    status: "pending",
    details: "Switch from round-robin to least-connections algorithm",
  },
]

const performanceMetrics = [
  { metric: "API Response Time", current: 245, target: 150, improvement: 38, trend: "improving" },
  { metric: "Database Query Time", current: 89, target: 50, improvement: 44, trend: "improving" },
  { metric: "Cache Hit Rate", current: 78, target: 90, improvement: 15, trend: "stable" },
  { metric: "Error Rate", current: 0.12, target: 0.05, improvement: 58, trend: "improving" },
  { metric: "Throughput (req/sec)", current: 1250, target: 1500, improvement: 20, trend: "improving" },
  { metric: "Memory Utilization", current: 68, target: 75, improvement: 10, trend: "stable" },
]

const optimizationHistory = [
  { date: "Jan 1", response_time: 320, throughput: 980, error_rate: 0.28 },
  { date: "Jan 8", response_time: 298, throughput: 1050, error_rate: 0.24 },
  { date: "Jan 15", response_time: 275, throughput: 1120, error_rate: 0.19 },
  { date: "Jan 22", response_time: 260, throughput: 1180, error_rate: 0.16 },
  { date: "Jan 29", response_time: 245, throughput: 1250, error_rate: 0.12 },
]

const aiOptimizations = [
  {
    id: 1,
    type: "auto_applied",
    title: "Dynamic Resource Allocation",
    description: "AI automatically adjusted CPU allocation based on predicted load",
    impact: "12% performance improvement",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "scheduled",
    title: "Cache Preloading",
    description: "Scheduled cache warming for peak hours based on usage patterns",
    impact: "Expected 25% latency reduction",
    timestamp: "Tomorrow 6:00 AM",
  },
  {
    id: 3,
    type: "recommendation",
    title: "Database Index Suggestion",
    description: "AI identified opportunity for new composite index",
    impact: "Potential 40% query speedup",
    timestamp: "30 minutes ago",
  },
]

export function PerformanceOptimizer() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Impact</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Impact</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Impact</Badge>
      default:
        return <Badge variant="secondary">{impact}</Badge>
    }
  }

  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case "high":
        return <Badge variant="destructive">High Effort</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Effort</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Effort</Badge>
      default:
        return <Badge variant="outline">{effort}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Target className="h-4 w-4 text-blue-500" />
    }
  }

  const getOptimizationIcon = (type: string) => {
    switch (type) {
      case "auto_applied":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Brain className="h-4 w-4 text-purple-500" />
    }
  }

  const filteredRecommendations =
    selectedCategory === "all"
      ? optimizationRecommendations
      : optimizationRecommendations.filter((rec) => rec.category.toLowerCase() === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Active Optimizations</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">8</div>
              <div className="text-xs text-gray-500">Running automatically</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Performance Gain</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">+34%</div>
              <div className="text-xs text-gray-500">Since last month</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">AI Recommendations</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">12</div>
              <div className="text-xs text-gray-500">Pending review</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Efficiency Score</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">87.5</div>
              <div className="text-xs text-gray-500">+12.3 this week</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="history">Optimization History</TabsTrigger>
          <TabsTrigger value="automation">AI Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium">Filter by category:</span>
            {["all", "database", "cache", "api", "infrastructure"].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="h-7 px-3 text-xs capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredRecommendations.map((recommendation) => (
              <Card key={recommendation.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base font-medium">{recommendation.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {recommendation.confidence}% confidence
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    {getImpactBadge(recommendation.impact)}
                    {getEffortBadge(recommendation.effort)}
                    {getStatusBadge(recommendation.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-green-600">
                      Expected: {recommendation.estimatedImprovement}
                    </div>
                    <div className="text-xs text-gray-600">{recommendation.details}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Apply Optimization
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(metric.trend)}
                        <span className="text-sm font-medium">{metric.metric}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {metric.current}
                          {metric.metric.includes("Rate")
                            ? "%"
                            : metric.metric.includes("Time")
                              ? "ms"
                              : metric.metric.includes("req/sec")
                                ? ""
                                : "%"}
                        </div>
                        <div className="text-xs text-gray-500">
                          Target: {metric.target}
                          {metric.metric.includes("Rate")
                            ? "%"
                            : metric.metric.includes("Time")
                              ? "ms"
                              : metric.metric.includes("req/sec")
                                ? ""
                                : "%"}
                        </div>
                      </div>
                    </div>
                    <Progress value={metric.improvement} className="h-2" />
                    <div className="text-xs text-gray-500">{metric.improvement}% improvement towards target</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    response_time: { label: "Response Time (ms)", color: "#3b82f6" },
                    throughput: { label: "Throughput", color: "#10b981" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={optimizationHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="response_time"
                        stroke="var(--color-response_time)"
                        strokeWidth={2}
                      />
                      <Line type="monotone" dataKey="throughput" stroke="var(--color-throughput)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Optimization History</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  response_time: { label: "Response Time (ms)", color: "#ef4444" },
                  throughput: { label: "Throughput (req/sec)", color: "#10b981" },
                  error_rate: { label: "Error Rate (%)", color: "#f59e0b" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={optimizationHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="response_time" fill="var(--color-response_time)" />
                    <Bar dataKey="throughput" fill="var(--color-throughput)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Optimizations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiOptimizations.map((optimization) => (
                <div key={optimization.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getOptimizationIcon(optimization.type)}
                      <div>
                        <div className="font-medium text-sm">{optimization.title}</div>
                        <div className="text-xs text-gray-600">{optimization.description}</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{optimization.timestamp}</span>
                  </div>
                  <div className="text-sm font-medium text-green-600">{optimization.impact}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
