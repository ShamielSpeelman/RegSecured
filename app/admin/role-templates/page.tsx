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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Edit,
  Copy,
  Users,
  Shield,
  Clock,
  GitBranch,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Eye,
  Database,
  FileText,
  BarChart3,
  Globe,
  Zap,
  Search,
  RefreshCw,
  ArrowRight,
} from "lucide-react"

// Mock data for role templates
const prebuiltTemplates = [
  {
    id: "analyst",
    name: "Compliance Analyst",
    description: "Standard analyst role with case management and screening capabilities",
    users: 45,
    permissions: 28,
    status: "active",
    version: "2.1",
    lastUpdated: "2024-01-15",
    category: "operational",
  },
  {
    id: "reviewer",
    name: "Senior Reviewer",
    description: "Review and approval authority for high-risk cases",
    users: 12,
    permissions: 35,
    status: "active",
    version: "1.8",
    lastUpdated: "2024-01-10",
    category: "supervisory",
  },
  {
    id: "admin",
    name: "System Administrator",
    description: "Full system administration with user management",
    users: 3,
    permissions: 67,
    status: "active",
    version: "3.0",
    lastUpdated: "2024-01-20",
    category: "administrative",
  },
  {
    id: "relationship-manager",
    name: "Relationship Manager",
    description: "Client relationship management and onboarding",
    users: 28,
    permissions: 22,
    status: "active",
    version: "1.5",
    lastUpdated: "2024-01-12",
    category: "client-facing",
  },
  {
    id: "client",
    name: "Client Portal User",
    description: "Limited access for client self-service",
    users: 156,
    permissions: 8,
    status: "active",
    version: "1.2",
    lastUpdated: "2024-01-08",
    category: "external",
  },
]

const permissionModules = [
  {
    name: "Case Management",
    permissions: [
      { id: "case_view", name: "View Cases", level: "read" },
      { id: "case_create", name: "Create Cases", level: "write" },
      { id: "case_edit", name: "Edit Cases", level: "write" },
      { id: "case_delete", name: "Delete Cases", level: "admin" },
      { id: "case_assign", name: "Assign Cases", level: "manage" },
      { id: "case_approve", name: "Approve Cases", level: "approve" },
    ],
  },
  {
    name: "Client Management",
    permissions: [
      { id: "client_view", name: "View Clients", level: "read" },
      { id: "client_create", name: "Create Clients", level: "write" },
      { id: "client_edit", name: "Edit Clients", level: "write" },
      { id: "client_delete", name: "Delete Clients", level: "admin" },
      { id: "client_onboard", name: "Onboard Clients", level: "manage" },
    ],
  },
  {
    name: "Screening & Monitoring",
    permissions: [
      { id: "screening_run", name: "Run Screenings", level: "write" },
      { id: "screening_review", name: "Review Results", level: "read" },
      { id: "screening_approve", name: "Approve Screenings", level: "approve" },
      { id: "monitoring_configure", name: "Configure Monitoring", level: "admin" },
    ],
  },
  {
    name: "Reports & Analytics",
    permissions: [
      { id: "reports_view", name: "View Reports", level: "read" },
      { id: "reports_create", name: "Create Reports", level: "write" },
      { id: "reports_export", name: "Export Reports", level: "write" },
      { id: "analytics_access", name: "Access Analytics", level: "read" },
    ],
  },
  {
    name: "System Administration",
    permissions: [
      { id: "user_manage", name: "Manage Users", level: "admin" },
      { id: "role_manage", name: "Manage Roles", level: "admin" },
      { id: "system_config", name: "System Configuration", level: "admin" },
      { id: "audit_access", name: "Audit Access", level: "admin" },
    ],
  },
]

export default function RoleTemplatesPage() {
  const [activeTab, setActiveTab] = useState("templates")
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isPermissionBuilderOpen, setIsPermissionBuilderOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredTemplates = prebuiltTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || template.category === filterCategory
    return matchesSearch && matchesCategory
  })

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
              <BreadcrumbLink href="#">User & Organization Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Role Templates</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-light text-slate-800 mb-2">Role Templates</h1>
            <p className="text-slate-600 font-light">Manage role templates, permissions, and access controls</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Templates
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Templates
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Role Template</DialogTitle>
                  <DialogDescription>
                    Create a custom role template with specific permissions and access controls.
                  </DialogDescription>
                </DialogHeader>
                <CreateTemplateForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Role Templates</CardTitle>
                    <CardDescription>Manage pre-built and custom role templates</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search templates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="operational">Operational</SelectItem>
                        <SelectItem value="supervisory">Supervisory</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                        <SelectItem value="client-facing">Client-Facing</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {template.category}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Users:</span>
                            <span className="font-medium">{template.users}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Permissions:</span>
                            <span className="font-medium">{template.permissions}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Version:</span>
                            <span className="font-medium">v{template.version}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant={template.status === "active" ? "default" : "secondary"}>
                              {template.status}
                            </Badge>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Users className="h-4 w-4 mr-2" />
                            Assign
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Permission Matrix Builder</CardTitle>
                <CardDescription>Configure granular permissions for role templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {permissionModules.map((module) => (
                    <div key={module.name} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{module.name}</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Select All
                          </Button>
                          <Button variant="outline" size="sm">
                            Clear All
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {module.permissions.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <Checkbox id={permission.id} />
                            <div className="flex-1">
                              <Label htmlFor={permission.id} className="text-sm font-medium">
                                {permission.name}
                              </Label>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {permission.level}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conditional Permissions</CardTitle>
                  <CardDescription>Set up context-based access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Condition Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time">Time-based</SelectItem>
                        <SelectItem value="location">Location-based</SelectItem>
                        <SelectItem value="risk">Risk Level</SelectItem>
                        <SelectItem value="amount">Transaction Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Condition Value</Label>
                    <Input placeholder="Enter condition value" />
                  </div>
                  <div className="space-y-2">
                    <Label>Action</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="allow">Allow</SelectItem>
                        <SelectItem value="deny">Deny</SelectItem>
                        <SelectItem value="require_approval">Require Approval</SelectItem>
                        <SelectItem value="escalate">Escalate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Condition
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time-based Access</CardTitle>
                  <CardDescription>Configure temporal access restrictions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="time-restrictions" />
                    <Label htmlFor="time-restrictions">Enable time restrictions</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Days of Week</Label>
                    <div className="flex gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <Button key={day} variant="outline" size="sm" className="w-12">
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Session Duration (hours)</Label>
                    <Input type="number" placeholder="8" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Template Versioning</CardTitle>
                  <CardDescription>Manage template versions and deployments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Version 3.0</div>
                        <div className="text-sm text-muted-foreground">Current Production</div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Version 3.1</div>
                        <div className="text-sm text-muted-foreground">Staging</div>
                      </div>
                      <Badge variant="secondary">Testing</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Version 2.8</div>
                        <div className="text-sm text-muted-foreground">Previous Version</div>
                      </div>
                      <Badge variant="outline">Archived</Badge>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <GitBranch className="h-4 w-4 mr-2" />
                      Create Branch
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Rollback
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deployment Pipeline</CardTitle>
                  <CardDescription>Automated deployment and testing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div className="flex-1">
                        <div className="font-medium">Development</div>
                        <div className="text-sm text-muted-foreground">All tests passed</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <div className="flex-1">
                        <div className="font-medium">Staging</div>
                        <div className="text-sm text-muted-foreground">In progress</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <div className="font-medium">Production</div>
                        <div className="text-sm text-muted-foreground">Pending approval</div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Deploy to Production
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Impact Analysis</CardTitle>
                <CardDescription>Analyze the impact of role template changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-muted-foreground">Users Affected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-muted-foreground">Permissions Added</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">5</div>
                    <div className="text-sm text-muted-foreground">Permissions Removed</div>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h4 className="font-medium">Affected Systems</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Case Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Document Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Analytics Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">API Gateway</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Templates</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="mt-4">
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">85% utilization</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="mt-4">
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">+12% this month</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Permission Violations</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="mt-4">
                    <Progress value={15} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">-67% this week</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Deployments</p>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    <GitBranch className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="mt-4">
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">This quarter</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Role Usage Analytics</CardTitle>
                  <CardDescription>Most and least used role templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prebuiltTemplates.map((template, index) => (
                      <div key={template.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-muted-foreground">{template.users} users</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{Math.round(template.users / 2.5)}%</div>
                          <div className="text-sm text-muted-foreground">usage</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Permission Trends</CardTitle>
                  <CardDescription>Permission usage over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Case Management</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Client Management</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-20 h-2" />
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Screening</span>
                      <div className="flex items-center gap-2">
                        <Progress value={68} className="w-20 h-2" />
                        <span className="text-sm font-medium">68%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reports</span>
                      <div className="flex items-center gap-2">
                        <Progress value={91} className="w-20 h-2" />
                        <span className="text-sm font-medium">91%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Administration</span>
                      <div className="flex items-center gap-2">
                        <Progress value={34} className="w-20 h-2" />
                        <span className="text-sm font-medium">34%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>Complete history of role template changes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Changes</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2024-01-20 14:30</TableCell>
                      <TableCell>admin@regsecured.com</TableCell>
                      <TableCell>Updated</TableCell>
                      <TableCell>System Administrator</TableCell>
                      <TableCell>Added audit permissions</TableCell>
                      <TableCell>
                        <Badge>Success</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-01-19 09:15</TableCell>
                      <TableCell>manager@regsecured.com</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Custom Analyst</TableCell>
                      <TableCell>New template created</TableCell>
                      <TableCell>
                        <Badge>Success</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-01-18 16:45</TableCell>
                      <TableCell>admin@regsecured.com</TableCell>
                      <TableCell>Deployed</TableCell>
                      <TableCell>Reviewer v1.8</TableCell>
                      <TableCell>Production deployment</TableCell>
                      <TableCell>
                        <Badge>Success</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-01-17 11:20</TableCell>
                      <TableCell>security@regsecured.com</TableCell>
                      <TableCell>Revoked</TableCell>
                      <TableCell>Analyst</TableCell>
                      <TableCell>Removed admin access</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Critical</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Create Template Form Component
function CreateTemplateForm() {
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")
  const [templateCategory, setTemplateCategory] = useState("")
  const [inheritFrom, setInheritFrom] = useState("")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="template-name">Template Name</Label>
          <Input
            id="template-name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter template name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="template-category">Category</Label>
          <Select value={templateCategory} onValueChange={setTemplateCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="supervisory">Supervisory</SelectItem>
              <SelectItem value="administrative">Administrative</SelectItem>
              <SelectItem value="client-facing">Client-Facing</SelectItem>
              <SelectItem value="external">External</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="template-description">Description</Label>
        <Textarea
          id="template-description"
          value={templateDescription}
          onChange={(e) => setTemplateDescription(e.target.value)}
          placeholder="Describe the role template and its purpose"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inherit-from">Inherit From (Optional)</Label>
        <Select value={inheritFrom} onValueChange={setInheritFrom}>
          <SelectTrigger>
            <SelectValue placeholder="Select base template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="analyst">Compliance Analyst</SelectItem>
            <SelectItem value="reviewer">Senior Reviewer</SelectItem>
            <SelectItem value="admin">System Administrator</SelectItem>
            <SelectItem value="relationship-manager">Relationship Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Advanced Options</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="require-approval" />
            <Label htmlFor="require-approval">Require approval for role assignment</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="time-based" />
            <Label htmlFor="time-based">Enable time-based access controls</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="conditional" />
            <Label htmlFor="conditional">Enable conditional permissions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="audit-trail" />
            <Label htmlFor="audit-trail">Enhanced audit trail</Label>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>
          <ArrowRight className="h-4 w-4 mr-2" />
          Continue to Permissions
        </Button>
      </DialogFooter>
    </div>
  )
}
