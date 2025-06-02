"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Activity,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Zap,
  Server,
  Database,
  Shield,
} from "lucide-react"

const systemMetrics = [
  { time: "00:00", cpu: 45, memory: 62, network: 78, database: 23, predicted_cpu: 48, predicted_memory: 65 },
  { time: "04:00", cpu: 52, memory: 68, network: 79, database: 31, predicted_cpu: 55, predicted_memory: 71 },
  { time: "08:00", cpu: 78, memory: 85, network: 80, database: 67, predicted_cpu: 82, predicted_memory: 88 },
  { time: "12:00", cpu: 89, memory: 92, network: 82, database: 89, predicted_cpu: 93, predicted_memory: 95 },
  { time: "16:00", cpu: 76, memory: 88, network: 83, database: 76, predicted_cpu: 79, predicted_memory: 91 },
  { time: "20:00", cpu: 65, memory: 75, network: 84, database: 54, predicted_cpu: 68, predicted_memory: 78 },
  { time: "24:00", cpu: 48, memory: 65, network: 85, database: 28, predicted_cpu: 51, predicted_memory: 68 },
]

const aiInsights = [
  {
    id: 1,
    type: "prediction",
    severity: "warning",
    title: "CPU Spike Predicted",
    message: "AI models predict 95% CPU usage in next 2 hours during peak trading hours",
    confidence: 87,
    action: "Scale up 2 additional instances",
    time: "Next 2 hours",
  },
  {
    id: 2,
    type: "optimization",
    severity: "info",
    title: "Memory Optimization Opportunity",
    message: "Cache hit rate can be improved by 23% with configuration adjustments",
    confidence: 92,
    action: "Adjust cache settings",
    time: "Immediate",
  },
  {
    id: 3,
    type: "anomaly",
    severity: "critical",
    title: "Unusual Database Pattern",
    message: "Query response times 340% above baseline - potential security concern",
    confidence: 95,
    action: "Investigate immediately",
    time: "Now",
  },
  {
    id: 4,
    type: "trend",
    severity: "success",
    title: "Performance Improvement",
    message: "Response times improved 45% after recent optimizations",
    confidence: 98,
    action: "Monitor and maintain",
    time: "Last 24 hours",
  },
]

const systemComponents = [
  { name: "API Gateway", status: "healthy", load: 68, prediction: "stable", issues: 0 },
  { name: "Database Cluster", status: "warning", load: 89, prediction: "increasing", issues: 2 },
  { name: "Cache Layer", status: "healthy", load: 45, prediction: "stable", issues: 0 },
  { name: "Message Queue", status: "healthy", load: 34, prediction: "decreasing", issues: 0 },
  { name: "File Storage", status: "critical", load: 95, prediction: "critical", issues: 3 },
  { name: "Search Engine", status: "healthy", load: 56, prediction: "stable", issues: 0 },
]

export function SystemHealthDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Brain className="h-4 w-4 text-blue-500" />
    }
  }

  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">System Health</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">94.2%</div>
              <div className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +2.1% from yesterday
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Performance Score</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">87.5</div>
              <div className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                AI optimized +5.2
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">AI Predictions</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">12</div>
              <div className="text-xs text-gray-500">Active insights</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Anomalies Detected</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">3</div>
              <div className="text-xs text-gray-500">Requires attention</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Metrics with Predictions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Metrics & AI Predictions
                </CardTitle>
                <div className="flex gap-2">
                  {["1h", "6h", "24h", "7d"].map((timeframe) => (
                    <Button
                      key={timeframe}
                      variant={selectedTimeframe === timeframe ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className="h-7 px-3 text-xs"
                    >
                      {timeframe}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  cpu: { label: "CPU Usage", color: "#3b82f6" },
                  memory: { label: "Memory Usage", color: "#10b981" },
                  predicted_cpu: { label: "Predicted CPU", color: "#93c5fd" },
                  predicted_memory: { label: "Predicted Memory", color: "#86efac" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={systemMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="cpu" stroke="var(--color-cpu)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="memory" stroke="var(--color-memory)" strokeWidth={2} dot={false} />
                    <Line
                      type="monotone"
                      dataKey="predicted_cpu"
                      stroke="var(--color-predicted_cpu)"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted_memory"
                      stroke="var(--color-predicted_memory)"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Panel */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(insight.severity)}
                    <span className="font-medium text-sm">{insight.title}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{insight.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{insight.time}</span>
                  <Button variant="outline" size="sm" className="h-6 text-xs">
                    {insight.action}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Components Health */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Components Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemComponents.map((component, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(component.status)}
                    <span className="font-medium text-sm">{component.name}</span>
                  </div>
                  {getStatusBadge(component.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Current Load</span>
                    <span>{component.load}%</span>
                  </div>
                  <Progress value={component.load} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {getPredictionIcon(component.prediction)}
                    <span className="text-xs text-gray-600">Trend: {component.prediction}</span>
                  </div>
                  {component.issues > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {component.issues} issues
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
