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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  GitBranch,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Settings,
  Users,
  Calendar,
  FileText,
  Database,
  ArrowUpCircle,
  Play,
  RotateCcw,
  Shield,
  Zap,
  Activity,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function VersionsPage() {
  const [selectedVersion, setSelectedVersion] = useState("v2.4.1")
  const [deploymentMode, setDeploymentMode] = useState("gradual")

  const versions = [
    {
      version: "v2.4.1",
      status: "current",
      releaseDate: "2024-01-15",
      type: "patch",
      tenants: 245,
      features: ["Bug fixes", "Performance improvements"],
      breaking: false,
    },
    {
      version: "v2.4.0",
      status: "stable",
      releaseDate: "2024-01-01",
      type: "minor",
      tenants: 189,
      features: ["New compliance dashboard", "Enhanced reporting"],
      breaking: false,
    },
    {
      version: "v2.3.2",
      status: "deprecated",
      releaseDate: "2023-12-15",
      type: "patch",
      tenants: 56,
      features: ["Security patches"],
      breaking: false,
    },
    {
      version: "v2.5.0-beta",
      status: "beta",
      releaseDate: "2024-01-20",
      type: "minor",
      tenants: 12,
      features: ["AI-powered risk assessment", "New API endpoints"],
      breaking: true,
    },
  ]

  const tenantVersions = [
    {
      organization: "Global Bank Corp",
      currentVersion: "v2.4.1",
      targetVersion: "v2.5.0-beta",
      status: "scheduled",
      deploymentDate: "2024-02-01",
      compatibility: "compatible",
      customizations: 3,
    },
    {
      organization: "FinTech Solutions",
      currentVersion: "v2.4.0",
      targetVersion: "v2.4.1",
      status: "in-progress",
      deploymentDate: "2024-01-25",
      compatibility: "compatible",
      customizations: 1,
    },
    {
      organization: "Regional Credit Union",
      currentVersion: "v2.3.2",
      targetVersion: "v2.4.1",
      status: "pending",
      deploymentDate: "2024-02-15",
      compatibility: "requires-migration",
      customizations: 5,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-500"
      case "stable":
        return "bg-blue-500"
      case "beta":
        return "bg-yellow-500"
      case "deprecated":
        return "bg-red-500"
      case "in-progress":
        return "bg-orange-500"
      case "scheduled":
        return "bg-purple-500"
      case "pending":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case "compatible":
        return "text-green-600"
      case "requires-migration":
        return "text-yellow-600"
      case "incompatible":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

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
              <BreadcrumbLink href="#">Platform Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Version Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Version Management</h1>
          <p className="text-slate-600 font-light">Manage platform versions, deployments, and tenant upgrades</p>
        </div>

        <Tabs defaultValue="versions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="versions">Version Control</TabsTrigger>
            <TabsTrigger value="tenants">Tenant Versions</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="migrations">Migrations</TabsTrigger>
          </TabsList>

          <TabsContent value="versions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="h-5 w-5" />
                      Release Versions
                    </CardTitle>
                    <CardDescription>Track and manage platform release versions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {versions.map((version) => (
                        <div key={version.version} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(version.status)}`} />
                              <span className="font-medium">{version.version}</span>
                              <Badge
                                variant={
                                  version.type === "major"
                                    ? "destructive"
                                    : version.type === "minor"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {version.type}
                              </Badge>
                              {version.breaking && <Badge variant="destructive">Breaking</Badge>}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>{version.releaseDate}</span>
                            <span>{version.tenants} tenants</span>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Changelog & Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">v2.4.1 Release Notes</h4>
                          <Badge>Latest</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600">
                          <div>• Fixed issue with compliance report generation</div>
                          <div>• Improved performance for large datasets</div>
                          <div>• Updated security protocols</div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">v2.4.0 Release Notes</h4>
                          <Badge variant="secondary">Stable</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600">
                          <div>• New compliance dashboard with real-time monitoring</div>
                          <div>• Enhanced reporting capabilities</div>
                          <div>• API rate limiting improvements</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Create New Release
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Package
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Rollback Version
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Migration Scripts
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Version Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Version Adoption</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Beta Participation</span>
                        <span>12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Legacy Versions</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tenants" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Tenant Version Status
                    </CardTitle>
                    <CardDescription>Monitor and manage version deployments across organizations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tenantVersions.map((tenant, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{tenant.organization}</h4>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <span>{tenant.currentVersion}</span>
                                <ArrowUpCircle className="h-4 w-4" />
                                <span>{tenant.targetVersion}</span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(tenant.status)}>{tenant.status}</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-slate-500">Deployment Date:</span>
                              <div>{tenant.deploymentDate}</div>
                            </div>
                            <div>
                              <span className="text-slate-500">Compatibility:</span>
                              <div className={getCompatibilityColor(tenant.compatibility)}>{tenant.compatibility}</div>
                            </div>
                            <div>
                              <span className="text-slate-500">Customizations:</span>
                              <div>{tenant.customizations} modules</div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4 mr-1" />
                              Deploy
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="h-4 w-4 mr-1" />
                              Schedule
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4 mr-1" />
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Bulk Operations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Target Version</Label>
                      <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v2.4.1">v2.4.1 (Current)</SelectItem>
                          <SelectItem value="v2.5.0-beta">v2.5.0-beta</SelectItem>
                          <SelectItem value="v2.4.0">v2.4.0 (Stable)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Deployment Mode</Label>
                      <Select value={deploymentMode} onValueChange={setDeploymentMode}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gradual">Gradual Rollout</SelectItem>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Deploy to Selected Tenants</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Compatibility Check
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Compatibility</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Schema</span>
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Custom Modules</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Third-party Integrations</span>
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deployments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Active Deployments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">v2.4.1 → FinTech Solutions</span>
                        <Badge className="bg-orange-500">In Progress</Badge>
                      </div>
                      <Progress value={65} className="mb-2" />
                      <div className="text-sm text-slate-600">Step 3 of 5: Database migration in progress</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">v2.5.0-beta → Global Bank Corp</span>
                        <Badge className="bg-purple-500">Scheduled</Badge>
                      </div>
                      <div className="text-sm text-slate-600">Scheduled for Feb 1, 2024 at 2:00 AM UTC</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Deployment Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Maintenance Window</Label>
                    <Input type="time" defaultValue="02:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Rollback Threshold</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1% error rate</SelectItem>
                        <SelectItem value="5">5% error rate</SelectItem>
                        <SelectItem value="10">10% error rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-rollback" />
                    <Label htmlFor="auto-rollback">Enable auto-rollback</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="health-checks" defaultChecked />
                    <Label htmlFor="health-checks">Pre-deployment health checks</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="migrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Migration Scripts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">v2.3.x → v2.4.0</span>
                        <Badge variant="secondary">Available</Badge>
                      </div>
                      <div className="text-sm text-slate-600 mb-2">
                        Database schema updates for new compliance features
                      </div>
                      <Button size="sm" variant="outline">
                        View Script
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">v2.4.x → v2.5.0</span>
                        <Badge className="bg-yellow-500">Beta</Badge>
                      </div>
                      <div className="text-sm text-slate-600 mb-2">Major schema changes for AI features</div>
                      <Button size="sm" variant="outline">
                        View Script
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RotateCcw className="h-5 w-5" />
                    Rollback Procedures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Emergency Rollback</span>
                        <Button size="sm" variant="destructive">
                          Execute
                        </Button>
                      </div>
                      <div className="text-sm text-slate-600">Immediate rollback to last stable version</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Scheduled Rollback</span>
                        <Button size="sm" variant="outline">
                          Schedule
                        </Button>
                      </div>
                      <div className="text-sm text-slate-600">Plan rollback during maintenance window</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Rollback Notes</Label>
                      <Textarea placeholder="Document reason for rollback..." />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
