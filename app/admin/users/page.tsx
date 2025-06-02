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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Shield,
  Activity,
  AlertTriangle,
  TrendingUp,
  Clock,
  Building,
  Mail,
  Settings,
  Lock,
  Unlock,
  FileText,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock data for demonstration
const mockUsers = [
  {
    id: "usr_001",
    name: "Sarah Johnson",
    email: "sarah.johnson@acmebank.com",
    role: "Senior Analyst",
    organization: "ACME Bank",
    status: "active",
    lastLogin: "2024-01-25T10:30:00Z",
    location: "New York, US",
    device: "Chrome on Windows",
    riskScore: 15,
    engagementScore: 92,
    organizations: ["ACME Bank", "ACME Securities"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "usr_002",
    name: "Michael Chen",
    email: "m.chen@globalfinance.com",
    role: "Compliance Manager",
    organization: "Global Finance Corp",
    status: "active",
    lastLogin: "2024-01-25T09:15:00Z",
    location: "Singapore, SG",
    device: "Safari on macOS",
    riskScore: 8,
    engagementScore: 87,
    organizations: ["Global Finance Corp"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "usr_003",
    name: "Emma Rodriguez",
    email: "e.rodriguez@eurobank.eu",
    role: "Risk Analyst",
    organization: "EuroBank",
    status: "suspended",
    lastLogin: "2024-01-24T16:45:00Z",
    location: "Madrid, ES",
    device: "Firefox on Linux",
    riskScore: 45,
    engagementScore: 34,
    organizations: ["EuroBank"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "usr_004",
    name: "David Kim",
    email: "d.kim@asiafintech.com",
    role: "Relationship Manager",
    organization: "Asia FinTech",
    status: "inactive",
    lastLogin: "2024-01-20T14:20:00Z",
    location: "Seoul, KR",
    device: "Chrome on Android",
    riskScore: 22,
    engagementScore: 78,
    organizations: ["Asia FinTech", "Korea Investment"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const mockActivityData = [
  { date: "2024-01-20", logins: 1250, activeUsers: 980, newUsers: 45 },
  { date: "2024-01-21", logins: 1180, activeUsers: 920, newUsers: 38 },
  { date: "2024-01-22", logins: 1320, activeUsers: 1050, newUsers: 52 },
  { date: "2024-01-23", logins: 1280, activeUsers: 1020, newUsers: 41 },
  { date: "2024-01-24", logins: 1450, activeUsers: 1150, newUsers: 67 },
  { date: "2024-01-25", logins: 1380, activeUsers: 1100, newUsers: 55 },
]

const mockEngagementData = [
  { feature: "KYC Reviews", usage: 85, trend: "+12%" },
  { feature: "Risk Assessment", usage: 78, trend: "+8%" },
  { feature: "Document Upload", usage: 92, trend: "+15%" },
  { feature: "Compliance Reports", usage: 67, trend: "-3%" },
  { feature: "Client Communications", usage: 74, trend: "+5%" },
]

const mockGeographicData = [
  { region: "North America", users: 450, percentage: 35 },
  { region: "Europe", users: 380, percentage: 29 },
  { region: "Asia Pacific", users: 320, percentage: 25 },
  { region: "Latin America", users: 90, percentage: 7 },
  { region: "Middle East & Africa", users: 50, percentage: 4 },
]

const mockRiskAlerts = [
  {
    id: "alert_001",
    user: "Emma Rodriguez",
    type: "Suspicious Login",
    severity: "high",
    description: "Multiple failed login attempts from unusual location",
    timestamp: "2024-01-25T08:30:00Z",
  },
  {
    id: "alert_002",
    user: "John Smith",
    type: "Privilege Escalation",
    severity: "medium",
    description: "User requested admin access outside normal hours",
    timestamp: "2024-01-25T07:15:00Z",
  },
  {
    id: "alert_003",
    user: "Lisa Wang",
    type: "Data Access Anomaly",
    severity: "low",
    description: "Unusual pattern in document access behavior",
    timestamp: "2024-01-25T06:45:00Z",
  },
]

export default function GlobalUsersPage() {
  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/superadmin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">User & Organization Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Global User Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-slate-800">Global User Management</h1>
            <p className="text-slate-600 font-light">Comprehensive user administration across all organizations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Users
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Users
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+3</span> new today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84.2%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.3%</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Administration</TabsTrigger>
            <TabsTrigger value="monitoring">User Monitoring</TabsTrigger>
            <TabsTrigger value="analytics">User Analytics</TabsTrigger>
            <TabsTrigger value="cross-org">Cross-Organization</TabsTrigger>
          </TabsList>

          {/* User Administration Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Account Management
                </CardTitle>
                <CardDescription>
                  Comprehensive user administration with bulk operations and advanced filtering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search users by name, email, or organization..." className="pl-10" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="reviewer">Reviewer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="rm">Relationship Manager</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                {/* Bulk Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Checkbox />
                    <span className="text-sm text-muted-foreground">Select all users</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      <Lock className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      <Unlock className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                  </div>
                </div>

                {/* Users Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Engagement</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              {user.organization}
                              {user.organizations.length > 1 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{user.organizations.length - 1}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "suspended"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="text-sm">{new Date(user.lastLogin).toLocaleDateString()}</div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(user.lastLogin).toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  user.riskScore < 20
                                    ? "bg-green-500"
                                    : user.riskScore < 40
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                              {user.riskScore}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={user.engagementScore} className="w-16" />
                              <span className="text-sm">{user.engagementScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Reset Password
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Activity className="h-4 w-4 mr-2" />
                                  View Activity
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="h-4 w-4 mr-2" />
                                  Manage Access
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Showing 1-4 of 12,847 users</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Operations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Bulk User Import
                  </CardTitle>
                  <CardDescription>Import multiple users from CSV or Excel files</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                    <Button size="sm" className="flex-1">
                      Import Users
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Quick User Creation
                  </CardTitle>
                  <CardDescription>Create individual users with role assignment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@company.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acme">ACME Bank</SelectItem>
                          <SelectItem value="global">Global Finance Corp</SelectItem>
                          <SelectItem value="euro">EuroBank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analyst">Analyst</SelectItem>
                          <SelectItem value="reviewer">Reviewer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="rm">Relationship Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create User
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Real-time Activity Tracking
                  </CardTitle>
                  <CardDescription>Monitor user login patterns and system usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      logins: {
                        label: "Logins",
                        color: "hsl(var(--chart-1))",
                      },
                      activeUsers: {
                        label: "Active Users",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="logins"
                          stackId="1"
                          stroke="var(--color-logins)"
                          fill="var(--color-logins)"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="activeUsers"
                          stackId="1"
                          stroke="var(--color-activeUsers)"
                          fill="var(--color-activeUsers)"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Geographic Access Distribution
                  </CardTitle>
                  <CardDescription>User access patterns by geographic region</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockGeographicData.map((region) => (
                    <div key={region.region} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{region.region}</span>
                        <span className="text-sm text-muted-foreground">
                          {region.users} users ({region.percentage}%)
                        </span>
                      </div>
                      <Progress value={region.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Security Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Security & Risk Alerts
                </CardTitle>
                <CardDescription>Real-time monitoring of suspicious activities and security events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRiskAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            alert.severity === "high"
                              ? "bg-red-500"
                              : alert.severity === "medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{alert.user}</div>
                          <div className="text-sm text-muted-foreground">{alert.type}</div>
                          <div className="text-xs text-muted-foreground">{alert.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            alert.severity === "high"
                              ? "destructive"
                              : alert.severity === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {alert.severity}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device & Session Monitoring */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Device Fingerprinting
                  </CardTitle>
                  <CardDescription>Monitor and analyze user device patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Chrome on Windows</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Safari on macOS</span>
                      <span className="text-sm text-muted-foreground">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Firefox on Linux</span>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mobile Devices</span>
                      <span className="text-sm text-muted-foreground">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Session Analytics
                  </CardTitle>
                  <CardDescription>Active sessions and timeout monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">1,247</div>
                      <div className="text-sm text-muted-foreground">Active Sessions</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">23m</div>
                      <div className="text-sm text-muted-foreground">Avg Session</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">156</div>
                      <div className="text-sm text-muted-foreground">Idle Sessions</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-red-600">12</div>
                      <div className="text-sm text-muted-foreground">Expired Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Feature Utilization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Feature Utilization Analytics
                </CardTitle>
                <CardDescription>Track feature adoption and usage patterns across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockEngagementData.map((feature) => (
                    <div key={feature.feature} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{feature.feature}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{feature.usage}%</span>
                          <Badge variant={feature.trend.startsWith("+") ? "default" : "destructive"}>
                            {feature.trend}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={feature.usage} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Engagement Scoring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    User Engagement Scoring
                  </CardTitle>
                  <CardDescription>AI-powered engagement analysis and scoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-4xl font-bold text-green-600 mb-2">84.2</div>
                    <div className="text-sm text-muted-foreground">Average Engagement Score</div>
                    <div className="text-xs text-green-600 mt-1">+2.3% from last week</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High Engagement (80-100)</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medium Engagement (50-79)</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Low Engagement (0-49)</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Churn Prediction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Churn Prediction Analytics
                  </CardTitle>
                  <CardDescription>ML-powered user retention and churn analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 border rounded-lg">
                      <div className="text-lg font-bold text-red-600">23</div>
                      <div className="text-xs text-muted-foreground">High Risk</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">156</div>
                      <div className="text-xs text-muted-foreground">Medium Risk</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-lg font-bold text-green-600">1,847</div>
                      <div className="text-xs text-muted-foreground">Low Risk</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Risk Factors</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Decreased Login Frequency</span>
                        <span className="text-red-600">High Impact</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Low Feature Adoption</span>
                        <span className="text-yellow-600">Medium Impact</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support Ticket Volume</span>
                        <span className="text-yellow-600">Medium Impact</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Session Duration Drop</span>
                        <span className="text-blue-600">Low Impact</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Retention Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Support Ticket Correlation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Support Ticket Correlation
                </CardTitle>
                <CardDescription>Analyze user satisfaction and support patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Ticket Volume by User Segment</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">New Users (0-30 days)</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Regular Users (30-365 days)</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Power Users (365+ days)</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Common Issues</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Login/Authentication</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Document Upload</span>
                        <span className="font-medium">22%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Report Generation</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Integration Issues</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Performance</span>
                        <span className="font-medium">17%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Satisfaction Metrics</h4>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">4.2</div>
                      <div className="text-sm text-muted-foreground">Avg Satisfaction</div>
                      <div className="text-xs text-green-600 mt-1">+0.3 from last month</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-sm">
                      <div className="p-2 border rounded">
                        <div className="font-bold">2.1h</div>
                        <div className="text-muted-foreground">Avg Response</div>
                      </div>
                      <div className="p-2 border rounded">
                        <div className="font-bold">94%</div>
                        <div className="text-muted-foreground">Resolution Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Adoption Rate Tracking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Feature Adoption Trends
                  </CardTitle>
                  <CardDescription>Track new feature adoption over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      adoption: {
                        label: "Adoption Rate",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { week: "Week 1", adoption: 12 },
                          { week: "Week 2", adoption: 28 },
                          { week: "Week 3", adoption: 45 },
                          { week: "Week 4", adoption: 67 },
                          { week: "Week 5", adoption: 78 },
                          { week: "Week 6", adoption: 84 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="adoption"
                          stroke="var(--color-adoption)"
                          fill="var(--color-adoption)"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Cohort Analysis
                  </CardTitle>
                  <CardDescription>Analyze user behavior by registration cohorts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-xs font-medium text-center">
                    <div>Cohort</div>
                    <div>Week 1</div>
                    <div>Week 4</div>
                    <div>Week 12</div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-sm text-center">
                    <div className="font-medium">Jan 2024</div>
                    <div className="bg-green-100 p-1 rounded">95%</div>
                    <div className="bg-green-100 p-1 rounded">87%</div>
                    <div className="bg-yellow-100 p-1 rounded">78%</div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-sm text-center">
                    <div className="font-medium">Dec 2023</div>
                    <div className="bg-green-100 p-1 rounded">92%</div>
                    <div className="bg-green-100 p-1 rounded">84%</div>
                    <div className="bg-yellow-100 p-1 rounded">75%</div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-sm text-center">
                    <div className="font-medium">Nov 2023</div>
                    <div className="bg-green-100 p-1 rounded">89%</div>
                    <div className="bg-yellow-100 p-1 rounded">79%</div>
                    <div className="bg-yellow-100 p-1 rounded">71%</div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-sm text-center">
                    <div className="font-medium">Oct 2023</div>
                    <div className="bg-green-100 p-1 rounded">91%</div>
                    <div className="bg-yellow-100 p-1 rounded">81%</div>
                    <div className="bg-red-100 p-1 rounded">68%</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cross-Organization Tab */}
          <TabsContent value="cross-org" className="space-y-6">
            {/* Multi-Tenant User Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Multi-Tenant User Access Management
                </CardTitle>
                <CardDescription>Manage users with access to multiple organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Input placeholder="Search multi-tenant users..." className="w-80" />
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by access level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Access Levels</SelectItem>
                          <SelectItem value="read">Read Only</SelectItem>
                          <SelectItem value="write">Read/Write</SelectItem>
                          <SelectItem value="admin">Admin Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Grant Cross-Org Access
                    </Button>
                  </div>

                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Primary Organization</TableHead>
                          <TableHead>Additional Access</TableHead>
                          <TableHead>Access Level</TableHead>
                          <TableHead>Last Switch</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUsers
                          .filter((user) => user.organizations.length > 1)
                          .map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4 text-muted-foreground" />
                                  {user.organization}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {user.organizations.slice(1).map((org) => (
                                    <Badge key={org} variant="secondary" className="text-xs">
                                      {org}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">Admin</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">2 hours ago</div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Access Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Modify Access
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Activity className="h-4 w-4 mr-2" />
                                      View Switch History
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Revoke Access
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Organization Switching Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Organization Switching Analytics
                  </CardTitle>
                  <CardDescription>Monitor cross-organization access patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-sm text-muted-foreground">Total Switches Today</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">342</div>
                      <div className="text-sm text-muted-foreground">Unique Users</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Most Active Switch Patterns</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>ACME Bank → ACME Securities</span>
                        <span className="font-medium">156 switches</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Global Finance → Regional Branch</span>
                        <span className="font-medium">89 switches</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>EuroBank → EuroBank UK</span>
                        <span className="font-medium">67 switches</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Switch Report
                  </Button>
                </CardContent>
              </Card>

              {/* User Migration Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Migration Management
                  </CardTitle>
                  <CardDescription>Migrate users between organizations with data preservation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sourceOrg">Source Organization</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source organization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acme">ACME Bank</SelectItem>
                          <SelectItem value="global">Global Finance Corp</SelectItem>
                          <SelectItem value="euro">EuroBank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="targetOrg">Target Organization</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target organization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acme-sec">ACME Securities</SelectItem>
                          <SelectItem value="global-asia">Global Finance Asia</SelectItem>
                          <SelectItem value="euro-uk">EuroBank UK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="users">Select Users to Migrate</Label>
                      <Input placeholder="Search and select users..." />
                    </div>

                    <div className="space-y-2">
                      <Label>Migration Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="preserve-data" defaultChecked />
                          <Label htmlFor="preserve-data" className="text-sm">
                            Preserve user data and history
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="maintain-access" />
                          <Label htmlFor="maintain-access" className="text-sm">
                            Maintain access to source organization
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-users" defaultChecked />
                          <Label htmlFor="notify-users" className="text-sm">
                            Notify users of migration
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Start Migration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Global User Directory */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Global User Directory
                </CardTitle>
                <CardDescription>Unified search and management across all organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search across all organizations..." className="pl-10" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Organizations</SelectItem>
                      <SelectItem value="acme">ACME Bank</SelectItem>
                      <SelectItem value="global">Global Finance Corp</SelectItem>
                      <SelectItem value="euro">EuroBank</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Directory
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockUsers.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.role}</div>
                        </div>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          {user.organization}
                        </div>
                        {user.organizations.length > 1 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {user.organizations.slice(1).map((org) => (
                              <Badge key={org} variant="outline" className="text-xs">
                                {org}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Consolidated Reporting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Consolidated User Reporting
                </CardTitle>
                <CardDescription>Generate comprehensive reports across all organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">12,847</div>
                      <div className="text-sm text-muted-foreground">Total Users</div>
                      <div className="text-xs text-green-600 mt-1">+8.2% growth</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">9,234</div>
                      <div className="text-sm text-muted-foreground">Active Users</div>
                      <div className="text-xs text-green-600 mt-1">72% of total</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">1,456</div>
                      <div className="text-sm text-muted-foreground">Multi-Tenant Users</div>
                      <div className="text-xs text-blue-600 mt-1">11% of total</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">156</div>
                      <div className="text-sm text-muted-foreground">Organizations</div>
                      <div className="text-xs text-green-600 mt-1">+12 this month</div>
                    </div>
                  </Card>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    User Activity Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Access Audit Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Engagement Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Report
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
