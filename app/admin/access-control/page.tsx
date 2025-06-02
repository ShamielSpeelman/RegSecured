"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Users,
  AlertTriangle,
  Clock,
  Globe,
  Activity,
  CheckCircle,
  XCircle,
  Search,
  Download,
  MapPin,
  Zap,
  Target,
  Plus,
  Edit,
  Copy,
  MoreHorizontal,
  FileText,
  BarChart3,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LineChart,
} from "recharts"

// Mock data for demonstrations
const accessAttempts = [
  { time: "00:00", successful: 45, failed: 3, blocked: 1 },
  { time: "04:00", successful: 23, failed: 1, blocked: 0 },
  { time: "08:00", successful: 156, failed: 8, blocked: 2 },
  { time: "12:00", successful: 234, failed: 12, blocked: 4 },
  { time: "16:00", successful: 189, failed: 6, blocked: 1 },
  { time: "20:00", successful: 98, failed: 4, blocked: 2 },
]

const riskDistribution = [
  { name: "Low Risk", value: 65, color: "#10b981" },
  { name: "Medium Risk", value: 25, color: "#f59e0b" },
  { name: "High Risk", value: 8, color: "#ef4444" },
  { name: "Critical Risk", value: 2, color: "#dc2626" },
]

const geographicAccess = [
  { country: "United States", sessions: 1245, risk: "Low" },
  { country: "United Kingdom", sessions: 456, risk: "Low" },
  { country: "Germany", sessions: 234, risk: "Low" },
  { country: "Singapore", sessions: 123, risk: "Medium" },
  { country: "Unknown", sessions: 12, risk: "High" },
]

const roleHierarchy = [
  {
    id: "superadmin",
    name: "Super Administrator",
    level: 0,
    permissions: 156,
    users: 3,
    inherits: [],
    children: ["admin", "security-admin"],
  },
  {
    id: "admin",
    name: "Administrator",
    level: 1,
    permissions: 98,
    users: 12,
    inherits: ["superadmin"],
    children: ["manager", "analyst"],
  },
  {
    id: "security-admin",
    name: "Security Administrator",
    level: 1,
    permissions: 67,
    users: 5,
    inherits: ["superadmin"],
    children: ["security-analyst"],
  },
  {
    id: "manager",
    name: "Manager",
    level: 2,
    permissions: 45,
    users: 23,
    inherits: ["admin"],
    children: ["senior-analyst"],
  },
  {
    id: "analyst",
    name: "Analyst",
    level: 2,
    permissions: 34,
    users: 67,
    inherits: ["admin"],
    children: [],
  },
]

const accessPolicies = [
  {
    id: "policy-001",
    name: "Geographic Restriction Policy",
    type: "ABAC",
    status: "Active",
    priority: "High",
    conditions: "Location NOT IN [Restricted Countries]",
    actions: "DENY",
    lastModified: "2024-01-15",
    violations: 23,
  },
  {
    id: "policy-002",
    name: "Time-Based Access Control",
    type: "ABAC",
    status: "Active",
    priority: "Medium",
    conditions: "Time BETWEEN 09:00-17:00 AND Weekday",
    actions: "ALLOW",
    lastModified: "2024-01-14",
    violations: 5,
  },
  {
    id: "policy-003",
    name: "Risk-Based Authentication",
    type: "ABAC",
    status: "Active",
    priority: "Critical",
    conditions: "Risk Score > 75",
    actions: "REQUIRE_MFA",
    lastModified: "2024-01-13",
    violations: 12,
  },
]

const emergencyAccess = [
  {
    id: "emergency-001",
    user: "john.doe@company.com",
    role: "Emergency Admin",
    reason: "Critical system outage",
    requestedBy: "jane.smith@company.com",
    approvedBy: "admin@company.com",
    startTime: "2024-01-15 14:30",
    endTime: "2024-01-15 18:30",
    status: "Active",
    riskLevel: "High",
  },
  {
    id: "emergency-002",
    user: "mike.wilson@company.com",
    role: "Emergency Reviewer",
    reason: "Urgent compliance review",
    requestedBy: "sarah.jones@company.com",
    approvedBy: "admin@company.com",
    startTime: "2024-01-14 09:00",
    endTime: "2024-01-14 17:00",
    status: "Completed",
    riskLevel: "Medium",
  },
]

const accessReviews = [
  {
    id: "review-001",
    name: "Q1 2024 Access Certification",
    type: "Periodic",
    status: "In Progress",
    progress: 65,
    totalUsers: 1234,
    reviewedUsers: 802,
    pendingUsers: 432,
    startDate: "2024-01-01",
    dueDate: "2024-01-31",
    reviewer: "compliance@company.com",
  },
  {
    id: "review-002",
    name: "High-Risk User Review",
    type: "Risk-Based",
    status: "Completed",
    progress: 100,
    totalUsers: 45,
    reviewedUsers: 45,
    pendingUsers: 0,
    startDate: "2024-01-10",
    dueDate: "2024-01-15",
    reviewer: "security@company.com",
  },
]

export default function AccessControlPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null)
  const [showPolicyBuilder, setShowPolicyBuilder] = useState(false)

  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6 space-y-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/superadmin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Security & Compliance</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Access Control</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-slate-800 mb-2">Access Control Management</h1>
            <p className="text-slate-600 font-light">
              Advanced RBAC & ABAC security framework with real-time monitoring
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Policy
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rbac">RBAC</TabsTrigger>
            <TabsTrigger value="abac">ABAC</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12%</span> from last hour
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Failed Attempts</CardTitle>
                  <XCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">+5</span> in last hour
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Policy Violations</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-orange-600">+2</span> new alerts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                  <Shield className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Low</div>
                  <p className="text-xs text-muted-foreground">
                    Average: <span className="text-green-600">23/100</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Access Attempts (24h)</CardTitle>
                  <CardDescription>Real-time access monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      successful: { label: "Successful", color: "#10b981" },
                      failed: { label: "Failed", color: "#ef4444" },
                      blocked: { label: "Blocked", color: "#f59e0b" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={accessAttempts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="successful"
                          stackId="1"
                          stroke="var(--color-successful)"
                          fill="var(--color-successful)"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="failed"
                          stackId="1"
                          stroke="var(--color-failed)"
                          fill="var(--color-failed)"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="blocked"
                          stackId="1"
                          stroke="var(--color-blocked)"
                          fill="var(--color-blocked)"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Current user risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      risk: { label: "Risk Level" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <RechartsPieChart data={riskDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Geographic Access */}
            <Card>
              <CardHeader>
                <CardTitle>Geographic Access Distribution</CardTitle>
                <CardDescription>Access patterns by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographicAccess.map((location) => (
                    <div key={location.country} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{location.country}</p>
                          <p className="text-sm text-muted-foreground">{location.sessions} sessions</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          location.risk === "Low" ? "default" : location.risk === "Medium" ? "secondary" : "destructive"
                        }
                      >
                        {location.risk} Risk
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RBAC Tab */}
          <TabsContent value="rbac" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Role Hierarchy */}
              <Card>
                <CardHeader>
                  <CardTitle>Role Hierarchy</CardTitle>
                  <CardDescription>Organizational role structure and inheritance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roleHierarchy.map((role) => (
                      <div
                        key={role.id}
                        className="border rounded-lg p-4"
                        style={{ marginLeft: `${role.level * 20}px` }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{role.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline">{role.permissions} permissions</Badge>
                            <Badge variant="secondary">{role.users} users</Badge>
                          </div>
                        </div>
                        {role.inherits.length > 0 && (
                          <p className="text-sm text-muted-foreground">Inherits from: {role.inherits.join(", ")}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Permission Matrix */}
              <Card>
                <CardHeader>
                  <CardTitle>Permission Matrix</CardTitle>
                  <CardDescription>Role-based permission assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-6 gap-2 text-xs font-medium text-muted-foreground">
                      <div>Module</div>
                      <div>Read</div>
                      <div>Write</div>
                      <div>Delete</div>
                      <div>Admin</div>
                      <div>Actions</div>
                    </div>
                    <Separator />
                    {[
                      { module: "Users", read: true, write: true, delete: false, admin: true },
                      { module: "Compliance", read: true, write: true, delete: true, admin: true },
                      { module: "Reports", read: true, write: false, delete: false, admin: false },
                      { module: "Settings", read: true, write: true, delete: true, admin: true },
                    ].map((perm, index) => (
                      <div key={index} className="grid grid-cols-6 gap-2 items-center py-2">
                        <div className="font-medium">{perm.module}</div>
                        <div>
                          {perm.read ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div>
                          {perm.write ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div>
                          {perm.delete ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div>
                          {perm.admin ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dynamic Role Assignment */}
            <Card>
              <CardHeader>
                <CardTitle>Dynamic Role Assignment</CardTitle>
                <CardDescription>Automated role assignment based on conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="assignment-rule">Assignment Rule</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignment rule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="department">Department-based</SelectItem>
                          <SelectItem value="location">Location-based</SelectItem>
                          <SelectItem value="seniority">Seniority-based</SelectItem>
                          <SelectItem value="custom">Custom Rule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="conditions">Conditions</Label>
                      <Textarea
                        id="conditions"
                        placeholder="IF department = 'Compliance' AND seniority > 5 THEN assign 'Senior Analyst'"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="target-role">Target Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analyst">Analyst</SelectItem>
                          <SelectItem value="senior-analyst">Senior Analyst</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-assign" />
                      <Label htmlFor="auto-assign">Enable automatic assignment</Label>
                    </div>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assignment Rule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABAC Tab */}
          <TabsContent value="abac" className="space-y-6">
            {/* Policy Engine */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Policy Rule Engine</CardTitle>
                  <CardDescription>Attribute-based access control policies</CardDescription>
                </div>
                <Button onClick={() => setShowPolicyBuilder(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Policy
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accessPolicies.map((policy) => (
                    <div key={policy.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-blue-500" />
                          <div>
                            <h4 className="font-medium">{policy.name}</h4>
                            <p className="text-sm text-muted-foreground">{policy.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={policy.status === "Active" ? "default" : "secondary"}>{policy.status}</Badge>
                          <Badge
                            variant={
                              policy.priority === "Critical"
                                ? "destructive"
                                : policy.priority === "High"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {policy.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">CONDITIONS</Label>
                          <p className="font-mono bg-muted p-2 rounded text-xs">{policy.conditions}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">ACTIONS</Label>
                          <p className="font-mono bg-muted p-2 rounded text-xs">{policy.actions}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Modified: {policy.lastModified}</span>
                          <span>Violations: {policy.violations}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contextual Access Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Time-Based Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Business Hours</Label>
                    <div className="flex gap-2">
                      <Input placeholder="09:00" className="w-20" />
                      <span className="self-center">to</span>
                      <Input placeholder="17:00" className="w-20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Allowed Days</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <Button key={day} variant="outline" size="sm" className="w-12">
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="emergency-override" />
                    <Label htmlFor="emergency-override">Emergency override</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Geographic Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Allowed Countries</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Blocked Regions</Label>
                    <Textarea placeholder="Enter blocked IP ranges or countries" className="min-h-[80px]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="vpn-detection" />
                    <Label htmlFor="vpn-detection">Block VPN/Proxy</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Risk-Based Auth
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risk Threshold</Label>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Low Risk (0-25)</span>
                        <span>Allow</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Medium Risk (26-50)</span>
                        <span>MFA Required</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>High Risk (51-75)</span>
                        <span>Additional Verification</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Critical Risk (76-100)</span>
                        <span>Block</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="adaptive-auth" defaultChecked />
                    <Label htmlFor="adaptive-auth">Adaptive authentication</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            {/* Real-time Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Access Attempts</CardTitle>
                  <CardDescription>Real-time monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { user: "john.doe@company.com", action: "Login Success", time: "2 seconds ago", risk: "Low" },
                      {
                        user: "jane.smith@company.com",
                        action: "Failed Login",
                        time: "15 seconds ago",
                        risk: "Medium",
                      },
                      {
                        user: "mike.wilson@company.com",
                        action: "Permission Denied",
                        time: "1 minute ago",
                        risk: "High",
                      },
                      { user: "sarah.jones@company.com", action: "Login Success", time: "2 minutes ago", risk: "Low" },
                    ].map((attempt, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              attempt.action.includes("Success")
                                ? "bg-green-500"
                                : attempt.action.includes("Failed")
                                  ? "bg-red-500"
                                  : "bg-orange-500"
                            }`}
                          />
                          <div>
                            <p className="text-sm font-medium">{attempt.user}</p>
                            <p className="text-xs text-muted-foreground">{attempt.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{attempt.time}</p>
                          <Badge
                            variant={
                              attempt.risk === "Low"
                                ? "default"
                                : attempt.risk === "Medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {attempt.risk}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privilege Escalation Alerts</CardTitle>
                  <CardDescription>Suspicious activity detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        user: "admin.temp@company.com",
                        alert: "Unusual admin access",
                        severity: "High",
                        time: "5 minutes ago",
                      },
                      {
                        user: "contractor@external.com",
                        alert: "Access outside hours",
                        severity: "Medium",
                        time: "1 hour ago",
                      },
                      {
                        user: "service.account@company.com",
                        alert: "Multiple failed attempts",
                        severity: "Critical",
                        time: "2 hours ago",
                      },
                    ].map((alert, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant={
                              alert.severity === "Critical"
                                ? "destructive"
                                : alert.severity === "High"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm font-medium">{alert.alert}</p>
                        <p className="text-xs text-muted-foreground">{alert.user}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Access Pattern Analysis</CardTitle>
                  <CardDescription>Behavioral analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Normal Patterns</span>
                        <span className="text-green-600">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Anomalous Behavior</span>
                        <span className="text-orange-600">8%</span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Suspicious Activity</span>
                        <span className="text-red-600">5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                    <Separator />
                    <div className="text-center">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Detailed Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Access Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Access Trends & Analytics</CardTitle>
                <CardDescription>Historical access patterns and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    successful: { label: "Successful", color: "#10b981" },
                    failed: { label: "Failed", color: "#ef4444" },
                    blocked: { label: "Blocked", color: "#f59e0b" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={accessAttempts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="successful" stroke="var(--color-successful)" strokeWidth={2} />
                      <Line type="monotone" dataKey="failed" stroke="var(--color-failed)" strokeWidth={2} />
                      <Line type="monotone" dataKey="blocked" stroke="var(--color-blocked)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            {/* Access Certification */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Access Certification Reviews</CardTitle>
                  <CardDescription>Periodic and risk-based access reviews</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Review
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {accessReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <p className="text-sm text-muted-foreground">{review.type} Review</p>
                        </div>
                        <Badge
                          variant={
                            review.status === "Completed"
                              ? "default"
                              : review.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {review.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{review.totalUsers}</div>
                          <div className="text-sm text-muted-foreground">Total Users</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{review.reviewedUsers}</div>
                          <div className="text-sm text-muted-foreground">Reviewed</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{review.pendingUsers}</div>
                          <div className="text-sm text-muted-foreground">Pending</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{review.progress}%</span>
                        </div>
                        <Progress value={review.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div>
                          <span>Start: {review.startDate}</span>
                          <span className="mx-2">•</span>
                          <span>Due: {review.dueDate}</span>
                        </div>
                        <div>Reviewer: {review.reviewer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Automated Review Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Automated Review Configuration</CardTitle>
                  <CardDescription>Set up automatic access reviews</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Review Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Review Scope</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="high-risk-users" defaultChecked />
                        <Label htmlFor="high-risk-users">High-risk users</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="privileged-accounts" defaultChecked />
                        <Label htmlFor="privileged-accounts">Privileged accounts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="inactive-users" />
                        <Label htmlFor="inactive-users">Inactive users</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="external-users" defaultChecked />
                        <Label htmlFor="external-users">External users</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Orphaned Account Detection</CardTitle>
                  <CardDescription>Identify and manage orphaned accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-red-600">23</div>
                      <div className="text-sm text-muted-foreground">Orphaned Accounts</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">45</div>
                      <div className="text-sm text-muted-foreground">Inactive 90+ Days</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Detection Criteria</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="inactive-days" className="text-sm">
                          Inactive for (days)
                        </Label>
                        <Input id="inactive-days" type="number" defaultValue="90" className="w-20" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="no-manager" defaultChecked />
                        <Label htmlFor="no-manager">No assigned manager</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="no-department" defaultChecked />
                        <Label htmlFor="no-department">No department assignment</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Run Detection
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-6">
            {/* Emergency Access Procedures */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Emergency Access Management
                  </CardTitle>
                  <CardDescription>Break-glass access for critical situations</CardDescription>
                </div>
                <Button variant="destructive">
                  <Zap className="h-4 w-4 mr-2" />
                  Request Emergency Access
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {emergencyAccess.map((access) => (
                    <div key={access.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${access.status === "Active" ? "bg-green-500" : "bg-gray-400"}`}
                          />
                          <div>
                            <h4 className="font-medium">{access.user}</h4>
                            <p className="text-sm text-muted-foreground">{access.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={access.status === "Active" ? "destructive" : "secondary"}>
                            {access.status}
                          </Badge>
                          <Badge variant={access.riskLevel === "High" ? "destructive" : "secondary"}>
                            {access.riskLevel} Risk
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">REASON</Label>
                          <p>{access.reason}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">REQUESTED BY</Label>
                          <p>{access.requestedBy}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">APPROVED BY</Label>
                          <p>{access.approvedBy}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">DURATION</Label>
                          <p>
                            {access.startTime} - {access.endTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                        {access.status === "Active" && (
                          <Button variant="destructive" size="sm">
                            <XCircle className="h-3 w-3 mr-1" />
                            Revoke Access
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <FileText className="h-3 w-3 mr-1" />
                          View Audit Log
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Access Request Form */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Access Request</CardTitle>
                <CardDescription>Request temporary elevated access for critical situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="emergency-user">User Email</Label>
                      <Input id="emergency-user" placeholder="user@company.com" />
                    </div>
                    <div>
                      <Label htmlFor="emergency-role">Emergency Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select emergency role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency-admin">Emergency Administrator</SelectItem>
                          <SelectItem value="emergency-reviewer">Emergency Reviewer</SelectItem>
                          <SelectItem value="emergency-analyst">Emergency Analyst</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="emergency-duration">Duration (hours)</Label>
                      <Input id="emergency-duration" type="number" placeholder="4" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="emergency-reason">Justification</Label>
                      <Textarea
                        id="emergency-reason"
                        placeholder="Describe the critical situation requiring emergency access..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency-approver">Approver</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select approver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin@company.com">System Administrator</SelectItem>
                          <SelectItem value="security@company.com">Security Officer</SelectItem>
                          <SelectItem value="compliance@company.com">Compliance Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Submit Emergency Request
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
