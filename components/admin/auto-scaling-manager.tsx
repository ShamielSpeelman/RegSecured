"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Zap, Server, Activity, Settings, CheckCircle, Clock } from "lucide-react"

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
  {
    id: 3,
    name: "Request Rate Scaling",
    metric: "Requests per Second",
    scaleUpThreshold: 1000,
    scaleDownThreshold: 200,
    enabled: true,
    cooldown: 180,
    minInstances: 3,
    maxInstances: 25,
    lastTriggered: "1 hour ago",
  },
  {
    id: 4,
    name: "Response Time Scaling",
    metric: "Response Time",
    scaleUpThreshold: 500,
    scaleDownThreshold: 100,
    enabled: false,
    cooldown: 240,
    minInstances: 2,
    maxInstances: 12,
    lastTriggered: "Never",
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
  {
    name: "Database Replicas",
    currentInstances: 3,
    targetInstances: 2,
    status: "scaling_down",
    cpu: 45,
    memory: 58,
    cost: 156.89,
  },
  {
    name: "Cache Servers",
    currentInstances: 2,
    targetInstances: 2,
    status: "stable",
    cpu: 34,
    memory: 42,
    cost: 98.45,
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
  {
    id: 2,
    type: "scale_down",
    resource: "Database Replicas",
    from: 4,
    to: 3,
    reason: "Low utilization for 30 minutes",
    timestamp: "4 hours ago",
    duration: "30 seconds",
  },
  {
    id: 3,
    type: "scale_up",
    resource: "API Servers",
    from: 3,
    to: 4,
    reason: "Request rate exceeded threshold",
    timestamp: "6 hours ago",
    duration: "60 seconds",
  },
]

export function AutoScalingManager() {
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

  const getEventIcon = (type: string) => {
    switch (type) {
      case "scale_up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "scale_down":
        return <TrendingDown className="h-4 w-4 text-blue-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Scaling Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Active Instances</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">15</div>
              <div className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +3 from baseline
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Scaling Events</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">23</div>
              <div className="text-xs text-gray-500">Last 24 hours</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Cost Optimization</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">$127</div>
              <div className="text-xs text-gray-500">Saved this month</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Efficiency Score</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">92.3%</div>
              <div className="text-xs text-gray-500">Resource utilization</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scaling Activity Chart */}
        <div className="lg:col-span-2">
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

        {/* Resource Pools Status */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Server className="h-5 w-5" />
              Resource Pools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resourcePools.map((pool, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(pool.status)}
                    <span className="font-medium text-sm">{pool.name}</span>
                  </div>
                  {getStatusBadge(pool.status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Current: {pool.currentInstances}</div>
                  <div>Target: {pool.targetInstances}</div>
                  <div>CPU: {pool.cpu}%</div>
                  <div>Memory: {pool.memory}%</div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Monthly Cost</span>
                  <span className="text-sm font-medium">${pool.cost}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Scaling Rules Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Scaling Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scalingRules.map((rule) => (
              <div
                key={rule.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedRule.id === rule.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedRule(rule)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{rule.name}</span>
                  <Switch checked={rule.enabled} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>
                    Scale Up: {rule.scaleUpThreshold}
                    {rule.metric.includes("Time")
                      ? "ms"
                      : rule.metric.includes("CPU") || rule.metric.includes("Memory")
                        ? "%"
                        : ""}
                  </div>
                  <div>
                    Scale Down: {rule.scaleDownThreshold}
                    {rule.metric.includes("Time")
                      ? "ms"
                      : rule.metric.includes("CPU") || rule.metric.includes("Memory")
                        ? "%"
                        : ""}
                  </div>
                  <div>Min: {rule.minInstances}</div>
                  <div>Max: {rule.maxInstances}</div>
                </div>
                <div className="text-xs text-gray-500 mt-2">Last triggered: {rule.lastTriggered}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Rule Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium">{selectedRule.name}</Label>
              <p className="text-xs text-gray-600 mt-1">Metric: {selectedRule.metric}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs font-medium">Scale Up Threshold</Label>
                <div className="mt-2">
                  <Slider value={[selectedRule.scaleUpThreshold]} max={100} step={5} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>
                      {selectedRule.scaleUpThreshold}
                      {selectedRule.metric.includes("CPU") || selectedRule.metric.includes("Memory") ? "%" : ""}
                    </span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium">Scale Down Threshold</Label>
                <div className="mt-2">
                  <Slider value={[selectedRule.scaleDownThreshold]} max={100} step={5} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>
                      {selectedRule.scaleDownThreshold}
                      {selectedRule.metric.includes("CPU") || selectedRule.metric.includes("Memory") ? "%" : ""}
                    </span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium">Min Instances</Label>
                  <div className="mt-2">
                    <Slider value={[selectedRule.minInstances]} max={10} step={1} className="w-full" />
                    <div className="text-center text-xs text-gray-500 mt-1">{selectedRule.minInstances}</div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium">Max Instances</Label>
                  <div className="mt-2">
                    <Slider value={[selectedRule.maxInstances]} max={50} step={1} className="w-full" />
                    <div className="text-center text-xs text-gray-500 mt-1">{selectedRule.maxInstances}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" size="sm">
                  Test Rule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scaling Events */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Scaling Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentScalingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getEventIcon(event.type)}
                  <div>
                    <div className="font-medium text-sm">
                      {event.resource}: {event.from} → {event.to} instances
                    </div>
                    <div className="text-xs text-gray-600">{event.reason}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{event.timestamp}</div>
                  <div className="text-xs text-gray-500">Duration: {event.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
