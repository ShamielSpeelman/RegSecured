"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Settings, Activity, Shield, Database } from "lucide-react"

const integrations = [
  {
    id: 1,
    name: "Sanctions Screening API",
    provider: "WorldCheck",
    status: "healthy",
    uptime: 99.8,
    responseTime: 145,
    errorRate: 0.02,
    lastCheck: "30 seconds ago",
    autoHealing: true,
    requests24h: 12450,
    successRate: 99.98,
  },
  {
    id: 2,
    name: "KYC Document Verification",
    provider: "Jumio",
    status: "warning",
    uptime: 98.5,
    responseTime: 2340,
    errorRate: 1.2,
    lastCheck: "1 minute ago",
    autoHealing: true,
    requests24h: 3420,
    successRate: 98.8,
  },
  {
    id: 3,
    name: "Credit Bureau API",
    provider: "Experian",
    status: "critical",
    uptime: 95.2,
    responseTime: 5670,
    errorRate: 4.8,
    lastCheck: "2 minutes ago",
    autoHealing: false,
    requests24h: 890,
    successRate: 95.2,
  },
  {
    id: 4,
    name: "Payment Processing",
    provider: "Stripe",
    status: "healthy",
    uptime: 99.9,
    responseTime: 89,
    errorRate: 0.01,
    lastCheck: "15 seconds ago",
    autoHealing: true,
    requests24h: 8760,
    successRate: 99.99,
  },
  {
    id: 5,
    name: "Risk Scoring Engine",
    provider: "FICO",
    status: "healthy",
    uptime: 99.7,
    responseTime: 234,
    errorRate: 0.05,
    lastCheck: "45 seconds ago",
    autoHealing: true,
    requests24h: 5670,
    successRate: 99.95,
  },
  {
    id: 6,
    name: "Regulatory Reporting",
    provider: "Thomson Reuters",
    status: "maintenance",
    uptime: 0,
    responseTime: 0,
    errorRate: 0,
    lastCheck: "Scheduled maintenance",
    autoHealing: false,
    requests24h: 0,
    successRate: 0,
  },
]

const healthMetrics = [
  { time: "00:00", uptime: 99.2, response_time: 145, error_rate: 0.8 },
  { time: "04:00", uptime: 99.5, response_time: 132, error_rate: 0.5 },
  { time: "08:00", uptime: 98.8, response_time: 189, error_rate: 1.2 },
  { time: "12:00", uptime: 97.5, response_time: 267, error_rate: 2.5 },
  { time: "16:00", uptime: 98.9, response_time: 198, error_rate: 1.1 },
  { time: "20:00", uptime: 99.3, response_time: 156, error_rate: 0.7 },
  { time: "24:00", uptime: 99.1, response_time: 143, error_rate: 0.9 },
]

const healingActions = [
  {
    id: 1,
    integration: "KYC Document Verification",
    action: "Circuit Breaker Activated",
    reason: "High error rate detected (>1%)",
    timestamp: "5 minutes ago",
    status: "completed",
    result: "Error rate reduced to 0.3%",
  },
  {
    id: 2,
    integration: "Credit Bureau API",
    action: "Failover to Backup Endpoint",
    reason: "Primary endpoint timeout",
    timestamp: "15 minutes ago",
    status: "in_progress",
    result: "Switching traffic to backup",
  },
  {
    id: 3,
    integration: "Sanctions Screening API",
    action: "Rate Limit Adjustment",
    reason: "429 errors detected",
    timestamp: "1 hour ago",
    status: "completed",
    result: "Rate limit reduced by 20%",
  },
  {
    id: 4,
    integration: "Payment Processing",
    action: "Connection Pool Reset",
    reason: "Connection pool exhaustion",
    timestamp: "2 hours ago",
    status: "completed",
    result: "Pool size increased to 50",
  },
]

const alertRules = [
  { metric: "Response Time", threshold: "2000ms", enabled: true, severity: "warning" },
  { metric: "Response Time", threshold: "5000ms", enabled: true, severity: "critical" },
  { metric: "Error Rate", threshold: "1%", enabled: true, severity: "warning" },
  { metric: "Error Rate", threshold: "5%", enabled: true, severity: "critical" },
  { metric: "Uptime", threshold: "99%", enabled: true, severity: "critical" },
  { metric: "Success Rate", threshold: "95%", enabled: true, severity: "warning" },
]

export function IntegrationHealthMonitor() {
  const [selectedIntegration, setSelectedIntegration] = useState(integrations[0])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "maintenance":
        return <Settings className="h-4 w-4 text-blue-500" />
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
      case "maintenance":
        return <Badge className="bg-blue-100 text-blue-800">Maintenance</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActionStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const healthyCount = integrations.filter((i) => i.status === "healthy").length
  const warningCount = integrations.filter((i) => i.status === "warning").length
  const criticalCount = integrations.filter((i) => i.status === "critical").length

  return (
    <div className="space-y-6">
      {/* Integration Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Healthy Integrations</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">{healthyCount}</div>
              <div className="text-xs text-gray-500">of {integrations.length} total</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Warnings</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">{warningCount}</div>
              <div className="text-xs text-gray-500">Need attention</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Critical Issues</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">{criticalCount}</div>
              <div className="text-xs text-gray-500">Immediate action</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Auto-Healing</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">4</div>
              <div className="text-xs text-gray-500">Actions today</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Integration List */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Integration Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedIntegration.id === integration.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedIntegration(integration)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(integration.status)}
                    <span className="font-medium text-sm">{integration.name}</span>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
                <div className="text-xs text-gray-600 mb-2">{integration.provider}</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>Uptime: {integration.uptime}%</div>
                  <div>Response: {integration.responseTime}ms</div>
                  <div>Errors: {integration.errorRate}%</div>
                  <div>Auto-heal: {integration.autoHealing ? "On" : "Off"}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detailed Integration Metrics */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">{selectedIntegration.name} - Health Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">Uptime</div>
                  <div className="text-2xl font-light">{selectedIntegration.uptime}%</div>
                  <Progress value={selectedIntegration.uptime} className="mt-2" />
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Response Time</div>
                  <div className="text-2xl font-light">{selectedIntegration.responseTime}ms</div>
                  <div className="text-xs text-gray-500 mt-2">Target: &lt;500ms</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Success Rate</div>
                  <div className="text-2xl font-light">{selectedIntegration.successRate}%</div>
                  <Progress value={selectedIntegration.successRate} className="mt-2" />
                </div>
              </div>

              {/* 24h Statistics */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">24h Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Requests</span>
                      <span className="font-medium">{selectedIntegration.requests24h.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Error Rate</span>
                      <span className="font-medium">{selectedIntegration.errorRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Health Check</span>
                      <span className="font-medium">{selectedIntegration.lastCheck}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Auto-Healing</span>
                      <Switch checked={selectedIntegration.autoHealing} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      Run Health Check
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Connection
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Alerts
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      View Logs
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Health Trends Chart */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Integration Health Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              uptime: { label: "Uptime (%)", color: "#10b981" },
              response_time: { label: "Response Time (ms)", color: "#3b82f6" },
              error_rate: { label: "Error Rate (%)", color: "#ef4444" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="uptime" stroke="var(--color-uptime)" strokeWidth={2} dot={false} />
                <Line
                  type="monotone"
                  dataKey="response_time"
                  stroke="var(--color-response_time)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="error_rate"
                  stroke="var(--color-error_rate)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Auto-Healing Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Recent Auto-Healing Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {healingActions.map((action) => (
              <div key={action.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-sm">{action.action}</div>
                    <div className="text-xs text-gray-600">{action.integration}</div>
                  </div>
                  {getActionStatusBadge(action.status)}
                </div>
                <div className="text-xs text-gray-600">{action.reason}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{action.timestamp}</span>
                  <span className="text-xs text-green-600">{action.result}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Alert Rules Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch checked={rule.enabled} />
                    <div>
                      <div className="text-sm font-medium">{rule.metric}</div>
                      <div className="text-xs text-gray-600">Threshold: {rule.threshold}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(rule.severity)}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
