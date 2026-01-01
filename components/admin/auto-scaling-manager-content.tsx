"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Activity, CheckCircle } from "lucide-react"

const scalingEvents = [
  { time: "00:00", instances: 3, cpu: 45, memory: 62, load: 234 },
  { time: "04:00", instances: 3, cpu: 52, memory: 68, load: 289 },
  { time: "08:00", instances: 5, cpu: 78, memory: 85, load: 567 },
  { time: "12:00", instances: 8, cpu: 89, memory: 92, load: 892 },
  { time: "16:00", instances: 6, cpu: 76, memory: 88, load: 678 },
  { time: "20:00", instances: 4, cpu: 65, memory: 75, load: 445 },
  { time: "24:00", instances: 3, cpu: 48, memory: 65, load: 267 },
]

const scalingRules = [
  {
    id: 1,
    name: "CPU-based Scaling",
    metric: "CPU Usage",
    scaleUpThreshold: 80,
    scaleDownThreshold: 30,
    enabled: true,
    cooldown: 300,
    minInstances: 2,
    maxInstances: 20,
    lastTriggered: "2 hours ago",
  },
  {
    id: 2,
    name: "Memory-based Scaling",
    metric: "Memory Usage",
    scaleUpThreshold: 85,
    scaleDownThreshold: 40,
    enabled: true,
    cooldown: 300,
    minInstances: 2,
    maxInstances: 15,
    lastTriggered: "4 hours ago",
  },
]

const resourcePools = [
  {
    name: "Web Servers",
    currentInstances: 6,
    targetInstances: 8,
    status: "scaling_up",
    cpu: 78,
    memory: 82,
    cost: 245.67,
  },
  {
    name: "API Servers",
    currentInstances: 4,
    targetInstances: 4,
    status: "stable",
    cpu: 65,
    memory: 71,
    cost: 189.23,
  },
]

const recentScalingEvents = [
  {
    id: 1,
    type: "scale_up",
    resource: "Web Servers",
    from: 4,
    to: 6,
    reason: "CPU usage exceeded 80%",
    timestamp: "2 hours ago",
    duration: "45 seconds",
  },
]

export function AutoScalingManagerContent() {
  const [selectedRule, setSelectedRule] = useState(scalingRules[0])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scaling_up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "scaling_down":
        return <TrendingDown className="h-4 w-4 text-blue-500" />
      case "stable":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scaling_up":
        return <Badge className="bg-green-100 text-green-800">Scaling Up</Badge>
      case "scaling_down":
        return <Badge className="bg-blue-100 text-blue-800">Scaling Down</Badge>
      case "stable":
        return <Badge className="bg-gray-100 text-gray-800">Stable</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Auto-Scaling Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              instances: { label: "Instances", color: "#3b82f6" },
              cpu: { label: "CPU Usage", color: "#ef4444" },
              load: { label: "Load", color: "#10b981" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scalingEvents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="instances"
                  stroke="var(--color-instances)"
                  fill="var(--color-instances)"
                  fillOpacity={0.6}
                />
                <Line type="monotone" dataKey="cpu" stroke="var(--color-cpu)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
