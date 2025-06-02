"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Cpu,
  Database,
  HardDrive,
  MemoryStick,
  Bell,
  Settings,
} from "lucide-react"

const healthData = [
  { time: "00:00", cpu: 45, memory: 62, storage: 78, network: 23 },
  { time: "04:00", cpu: 52, memory: 68, storage: 79, network: 31 },
  { time: "08:00", cpu: 78, memory: 85, storage: 80, network: 67 },
  { time: "12:00", cpu: 89, memory: 92, storage: 82, network: 89 },
  { time: "16:00", cpu: 76, memory: 88, storage: 83, network: 76 },
  { time: "20:00", cpu: 65, memory: 75, storage: 84, network: 54 },
  { time: "24:00", cpu: 48, memory: 65, storage: 85, network: 28 },
]

const tenantHealth = [
  {
    id: 1,
    name: "Acme Financial",
    status: "healthy",
    uptime: 99.8,
    responseTime: 145,
    errorRate: 0.02,
    lastCheck: "2 minutes ago",
    alerts: 0,
    cpu: 68,
    memory: 72,
    storage: 45,
  },
  {
    id: 2,
    name: "Global Bank Ltd",
    status: "warning",
    uptime: 99.2,
    responseTime: 289,
    errorRate: 0.15,
    lastCheck: "1 minute ago",
    alerts: 2,
    cpu: 89,
    memory: 94,
    storage: 67,
  },
  {
    id: 3,
    name: "FinTech Innovations",
    status: "critical",
    uptime: 97.8,
    responseTime: 456,
    errorRate: 0.28,
    lastCheck: "30 seconds ago",
    alerts: 5,
    cpu: 95,
    memory: 98,
    storage: 89,
  },
  {
    id: 4,
    name: "Crypto Exchange Pro",
    status: "healthy",
    uptime: 99.9,
    responseTime: 123,
    errorRate: 0.01,
    lastCheck: "1 minute ago",
    alerts: 0,
    cpu: 54,
    memory: 61,
    storage: 38,
  },
]

const alerts = [
  {
    id: 1,
    tenant: "FinTech Innovations",
    type: "critical",
    message: "CPU usage exceeded 95% threshold",
    time: "2 minutes ago",
    acknowledged: false,
  },
  {
    id: 2,
    tenant: "Global Bank Ltd",
    type: "warning",
    message: "Memory usage approaching limit (94%)",
    time: "5 minutes ago",
    acknowledged: false,
  },
  {
    id: 3,
    tenant: "FinTech Innovations",
    type: "critical",
    message: "Response time degraded (456ms avg)",
    time: "8 minutes ago",
    acknowledged: true,
  },
  {
    id: 4,
    tenant: "Global Bank Ltd",
    type: "warning",
    message: "Error rate increased to 0.15%",
    time: "12 minutes ago",
    acknowledged: false,
  },
  {
    id: 5,
    tenant: "FinTech Innovations",
    type: "info",
    message: "Scheduled maintenance completed",
    time: "1 hour ago",
    acknowledged: true,
  },
]

const alertRules = [
  { id: 1, metric: "CPU Usage", threshold: "85%", enabled: true, severity: "warning" },
  { id: 2, metric: "CPU Usage", threshold: "95%", enabled: true, severity: "critical" },
  { id: 3, metric: "Memory Usage", threshold: "90%", enabled: true, severity: "warning" },
  { id: 4, metric: "Memory Usage", threshold: "98%", enabled: true, severity: "critical" },
  { id: 5, metric: "Response Time", threshold: "300ms", enabled: true, severity: "warning" },
  { id: 6, metric: "Error Rate", threshold: "0.1%", enabled: true, severity: "warning" },
  { id: 7, metric: "Uptime", threshold: "99%", enabled: true, severity: "critical" },
]

export function TenantHealthMonitoring() {
  const [selectedTenant, setSelectedTenant] = useState(tenantHealth[0])

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

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "info":
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
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

  return (
    <div className="space-y-6">
      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Healthy Tenants</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">2</div>
              <div className="text-xs text-gray-500">of 4 total</div>
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
              <div className="text-2xl font-light">1</div>
              <div className="text-xs text-gray-500">Needs attention</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Critical Issues</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">1</div>
              <div className="text-xs text-gray-500">Immediate action</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Active Alerts</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">7</div>
              <div className="text-xs text-gray-500">Total unresolved</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Health Overview</TabsTrigger>
          <TabsTrigger value="alerts">Alert Management</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tenant Health List */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Tenant Health Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenantHealth.map((tenant) => (
                  <div
                    key={tenant.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTenant.id === tenant.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTenant(tenant)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(tenant.status)}
                        <span className="font-medium text-sm">{tenant.name}</span>
                      </div>
                      {getStatusBadge(tenant.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <div>Uptime: {tenant.uptime}%</div>
                      <div>Alerts: {tenant.alerts}</div>
                      <div>Response: {tenant.responseTime}ms</div>
                      <div>Errors: {tenant.errorRate}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Detailed Health Metrics */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium">{selectedTenant.name} - Health Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Resource Usage */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Cpu className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">CPU Usage</span>
                      </div>
                      <Progress value={selectedTenant.cpu} className="mb-1" />
                      <div className="text-xs text-gray-500">{selectedTenant.cpu}%</div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <MemoryStick className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Memory</span>
                      </div>
                      <Progress value={selectedTenant.memory} className="mb-1" />
                      <div className="text-xs text-gray-500">{selectedTenant.memory}%</div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <HardDrive className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Storage</span>
                      </div>
                      <Progress value={selectedTenant.storage} className="mb-1" />
                      <div className="text-xs text-gray-500">{selectedTenant.storage}%</div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Uptime</span>
                          <span className="font-medium">{selectedTenant.uptime}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Avg Response Time</span>
                          <span className="font-medium">{selectedTenant.responseTime}ms</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Error Rate</span>
                          <span className="font-medium">{selectedTenant.errorRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Last Health Check</span>
                          <span className="font-medium">{selectedTenant.lastCheck}</span>
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
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.tenant}</TableCell>
                      <TableCell>{getAlertBadge(alert.type)}</TableCell>
                      <TableCell>{alert.message}</TableCell>
                      <TableCell className="text-sm text-gray-500">{alert.time}</TableCell>
                      <TableCell>
                        {alert.acknowledged ? (
                          <Badge className="bg-gray-100 text-gray-800">Acknowledged</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800">New</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {!alert.acknowledged && (
                            <Button variant="outline" size="sm">
                              Acknowledge
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Resolve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Real-time Resource Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  cpu: { label: "CPU Usage", color: "#3b82f6" },
                  memory: { label: "Memory Usage", color: "#10b981" },
                  storage: { label: "Storage Usage", color: "#f59e0b" },
                  network: { label: "Network Usage", color: "#ef4444" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="cpu"
                      stackId="1"
                      stroke="var(--color-cpu)"
                      fill="var(--color-cpu)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="memory"
                      stackId="2"
                      stroke="var(--color-memory)"
                      fill="var(--color-memory)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="storage"
                      stackId="3"
                      stroke="var(--color-storage)"
                      fill="var(--color-storage)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="network"
                      stackId="4"
                      stroke="var(--color-network)"
                      fill="var(--color-network)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Alert Rules Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Enabled</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.metric}</TableCell>
                      <TableCell>{rule.threshold}</TableCell>
                      <TableCell>{getSeverityBadge(rule.severity)}</TableCell>
                      <TableCell>
                        <Switch checked={rule.enabled} />
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
