"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  DollarSign,
  Activity,
  Bell,
  Settings,
  Eye,
  Zap,
  Globe,
  Server,
  Brain,
  Target,
  ArrowRight,
  MoreHorizontal,
  Lightbulb,
  FileText,
  Calendar,
  Workflow,
} from "lucide-react"

// Mock data for the comprehensive dashboard
const platformHealth = {
  overall: 94.2,
  uptime: 99.97,
  performance: 87.5,
  security: 96.8,
  compliance: 91.3,
}

const criticalAlerts = [
  {
    id: 1,
    type: "security",
    severity: "critical",
    title: "Unusual API access pattern detected",
    tenant: "FinBank Corp",
    time: "5 minutes ago",
    status: "investigating",
  },
  {
    id: 2,
    type: "compliance",
    severity: "high",
    title: "DORA compliance deadline approaching",
    tenant: "All Tenants",
    time: "2 hours ago",
    status: "action_required",
  },
  {
    id: 3,
    type: "performance",
    severity: "medium",
    title: "Database query performance degraded",
    tenant: "CryptoTech Ltd",
    time: "1 hour ago",
    status: "monitoring",
  },
]

const tenantOverview = [
  {
    name: "FinBank Corp",
    tier: "Enterprise",
    users: 1250,
    health: 92,
    revenue: 12500,
    compliance: 94,
    riskScore: 68,
    lastActivity: "2 minutes ago",
    alerts: 2,
    growth: 15.2,
  },
  {
    name: "CryptoTech Ltd",
    tier: "Professional",
    users: 890,
    health: 88,
    revenue: 8900,
    compliance: 91,
    riskScore: 72,
    lastActivity: "5 minutes ago",
    alerts: 1,
    growth: 8.7,
  },
  {
    name: "RegSecure Inc",
    tier: "Professional",
    users: 650,
    health: 95,
    revenue: 6500,
    compliance: 96,
    riskScore: 58,
    lastActivity: "1 minute ago",
    alerts: 0,
    growth: 12.3,
  },
  {
    name: "ComplianceFirst",
    tier: "Standard",
    users: 420,
    health: 90,
    revenue: 4200,
    compliance: 89,
    riskScore: 65,
    lastActivity: "8 minutes ago",
    alerts: 1,
    growth: 6.8,
  },
]

const revenueData = [
  { month: "Jan", revenue: 45000, forecast: 42000, growth: 8.2 },
  { month: "Feb", revenue: 48000, forecast: 46000, growth: 6.7 },
  { month: "Mar", revenue: 52000, forecast: 50000, growth: 8.3 },
  { month: "Apr", revenue: 55000, forecast: 54000, growth: 5.8 },
  { month: "May", revenue: 58000, forecast: 57000, growth: 5.5 },
  { month: "Jun", revenue: 62000, forecast: 61000, growth: 6.9 },
]

const systemMetrics = [
  { time: "00:00", cpu: 45, memory: 62, api: 234 },
  { time: "04:00", cpu: 52, memory: 68, api: 289 },
  { time: "08:00", cpu: 78, memory: 85, api: 567 },
  { time: "12:00", cpu: 89, memory: 92, api: 892 },
  { time: "16:00", cpu: 76, memory: 88, api: 678 },
  { time: "20:00", cpu: 65, memory: 75, api: 445 },
]

const aiInsights = [
  {
    type: "optimization",
    title: "Resource Optimization Opportunity",
    description: "FinBank Corp could reduce costs by 15% with auto-scaling configuration",
    impact: "High",
    savings: "$1,875/month",
    action: "Configure Auto-scaling",
  },
  {
    type: "security",
    title: "Anomalous Login Pattern",
    description: "Detected unusual login times for CryptoTech Ltd users",
    impact: "Medium",
    recommendation: "Enable additional MFA verification",
    action: "Review Security Settings",
  },
  {
    type: "compliance",
    title: "Regulatory Update Impact",
    description: "New EU regulations will affect 3 tenants starting Q2",
    impact: "High",
    deadline: "March 15, 2024",
    action: "Schedule Impact Assessment",
  },
]

const upcomingTasks = [
  {
    id: 1,
    title: "DORA Compliance Review",
    type: "compliance",
    priority: "high",
    dueDate: "2024-01-20",
    assignee: "Compliance Team",
    progress: 65,
  },
  {
    id: 2,
    title: "Q1 Security Audit",
    type: "security",
    priority: "medium",
    dueDate: "2024-01-25",
    assignee: "Security Team",
    progress: 30,
  },
  {
    id: 3,
    title: "Performance Optimization",
    type: "technical",
    priority: "medium",
    dueDate: "2024-01-30",
    assignee: "DevOps Team",
    progress: 80,
  },
]

export default function SuperAdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="h-4 w-4" />
      case "compliance":
        return <FileText className="h-4 w-4" />
      case "performance":
        return <Activity className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-slate-800 mb-2">Platform Command Center</h1>
            <p className="text-slate-600 font-light">
              Global oversight and strategic management across all tenants and operations
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              <span>Last updated: {currentTime.toLocaleTimeString()}</span>
              <span>•</span>
              <span>Platform Health: {platformHealth.overall}%</span>
              <span>•</span>
              <span>Active Tenants: {tenantOverview.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts ({criticalAlerts.length})
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Platform Settings
            </Button>
            <Button size="sm">
              <Eye className="h-4 w-4 mr-2" />
              System Monitor
            </Button>
          </div>
        </div>

        {/* Critical Alerts Banner */}
        {criticalAlerts.filter((alert) => alert.severity === "critical").length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Critical Attention Required</AlertTitle>
            <AlertDescription className="text-red-700">
              {criticalAlerts.filter((alert) => alert.severity === "critical").length} critical alerts require immediate
              attention. Review security and compliance issues.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Strategic Overview</TabsTrigger>
            <TabsTrigger value="operations">Live Operations</TabsTrigger>
            <TabsTrigger value="intelligence">AI Intelligence</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>

          {/* Strategic Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Platform Health Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Overall Health</p>
                      <p className="text-2xl font-bold text-blue-900">{platformHealth.overall}%</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <Progress value={platformHealth.overall} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                      <p className="text-2xl font-bold text-green-600">{platformHealth.uptime}%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Performance</p>
                      <p className="text-2xl font-bold text-orange-600">{platformHealth.performance}%</p>
                    </div>
                    <Zap className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Security</p>
                      <p className="text-2xl font-bold text-purple-600">{platformHealth.security}%</p>
                    </div>
                    <Shield className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Compliance</p>
                      <p className="text-2xl font-bold text-indigo-600">{platformHealth.compliance}%</p>
                    </div>
                    <FileText className="h-8 w-8 text-indigo-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tenant Strategic Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Tenant Portfolio Health
                  </CardTitle>
                  <CardDescription>Strategic overview of all tenant operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tenantOverview.map((tenant, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {tenant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{tenant.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {tenant.tier}
                              </Badge>
                              {tenant.alerts > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {tenant.alerts}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{tenant.users} users</span>
                              <span>Health: {tenant.health}%</span>
                              <span className="text-green-600">+{tenant.growth}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${tenant.revenue.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Monthly</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Revenue Performance
                  </CardTitle>
                  <CardDescription>Financial health and growth trajectory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">$62K</p>
                        <p className="text-xs text-muted-foreground">This Month</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">$68K</p>
                        <p className="text-xs text-muted-foreground">Projected</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">+12.3%</p>
                        <p className="text-xs text-muted-foreground">Growth</p>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                        <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                        <Area
                          type="monotone"
                          dataKey="forecast"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          fillOpacity={0.2}
                          strokeDasharray="5 5"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strategic Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">3,210</p>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8.2% this month
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">API Calls</p>
                      <p className="text-2xl font-bold">2.4M</p>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +15.7% this week
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                      <p className="text-2xl font-bold">91.3%</p>
                      <p className="text-xs text-orange-600 flex items-center">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        -2.1% this quarter
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Risk Score</p>
                      <p className="text-2xl font-bold">68</p>
                      <p className="text-xs text-red-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +3 this month
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Live Operations */}
          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Critical Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-red-500" />
                    Critical Operations Center
                  </CardTitle>
                  <CardDescription>Real-time alerts requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {criticalAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-sm">{alert.title}</p>
                              <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                                {alert.severity}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{alert.tenant}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Investigate</DropdownMenuItem>
                            <DropdownMenuItem>Escalate</DropdownMenuItem>
                            <DropdownMenuItem>Mark Resolved</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Live System Performance
                  </CardTitle>
                  <CardDescription>Real-time infrastructure metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={systemMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cpu" stroke="#8884d8" strokeWidth={2} name="CPU %" />
                      <Line type="monotone" dataKey="memory" stroke="#82ca9d" strokeWidth={2} name="Memory %" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-600">89%</p>
                      <p className="text-xs text-muted-foreground">CPU Usage</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">92%</p>
                      <p className="text-xs text-muted-foreground">Memory</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">892</p>
                      <p className="text-xs text-muted-foreground">API/min</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Operational Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  Mission-Critical Tasks
                </CardTitle>
                <CardDescription>High-priority operational tasks and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            task.priority === "high"
                              ? "bg-red-500"
                              : task.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{task.assignee}</span>
                            <span>•</span>
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <Progress value={task.progress} className="w-20" />
                          <p className="text-xs text-muted-foreground mt-1">{task.progress}%</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Intelligence */}
          <TabsContent value="intelligence" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI-Powered Strategic Intelligence
                </CardTitle>
                <CardDescription className="text-purple-700">
                  Machine learning insights and predictive analytics for strategic decision making
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <p className="text-2xl font-bold text-purple-600">94.2%</p>
                    <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <p className="text-2xl font-bold text-indigo-600">$127K</p>
                    <p className="text-sm text-muted-foreground">Potential Savings</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <p className="text-2xl font-bold text-blue-600">23</p>
                    <p className="text-sm text-muted-foreground">Active Insights</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-white border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          <Badge variant="outline" className="text-xs">
                            {insight.type}
                          </Badge>
                        </div>
                        <Badge
                          variant={
                            insight.impact === "High"
                              ? "default"
                              : insight.impact === "Medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {insight.impact} Impact
                        </Badge>
                      </div>
                      <h3 className="font-medium mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          {insight.savings && <span className="text-green-600 font-medium">{insight.savings}</span>}
                          {insight.deadline && (
                            <span className="text-orange-600 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {insight.deadline}
                            </span>
                          )}
                        </div>
                        <Button size="sm" variant="outline">
                          {insight.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance */}
          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Compliance & Risk Governance
                  </CardTitle>
                  <CardDescription>Enterprise governance oversight and control</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">Regulatory Compliance</p>
                        <p className="text-sm text-green-600">All major frameworks covered</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-700">91.3%</p>
                        <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-orange-800">Risk Management</p>
                        <p className="text-sm text-orange-600">3 high-risk items identified</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-700">68</p>
                        <AlertTriangle className="h-5 w-5 text-orange-600 ml-auto" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-800">Security Posture</p>
                        <p className="text-sm text-blue-600">Advanced threat protection active</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-700">96.8%</p>
                        <Shield className="h-5 w-5 text-blue-600 ml-auto" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Global Operations Status
                  </CardTitle>
                  <CardDescription>Multi-region platform status and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-lg font-bold text-green-600">99.97%</p>
                        <p className="text-xs text-muted-foreground">Global Uptime</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-lg font-bold text-blue-600">145ms</p>
                        <p className="text-xs text-muted-foreground">Avg Response</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">North America</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Operational</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Europe</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Operational</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Asia Pacific</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">Maintenance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Strategic Command Actions</CardTitle>
                <CardDescription>Quick access to critical platform management functions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    <span className="text-xs">Tenant Management</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Shield className="h-6 w-6 mb-2" />
                    <span className="text-xs">Security Center</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-xs">Compliance Hub</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Activity className="h-6 w-6 mb-2" />
                    <span className="text-xs">System Monitor</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
