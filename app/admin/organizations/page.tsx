"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Plus,
  Settings,
  Users,
  Globe,
  Palette,
  Mail,
  Bell,
  MapPin,
  Briefcase,
  Database,
  Zap,
  CreditCard,
  Edit,
  Eye,
  Upload,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Target,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

interface Organization {
  id: string
  name: string
  status: "active" | "inactive" | "pending" | "suspended"
  jurisdiction: string
  framework: string
  users: number
  maxUsers: number
  storage: number
  maxStorage: number
  createdAt: string
  lastActive: string
  tier: string
  domain: string
}

const mockOrganizations: Organization[] = [
  {
    id: "org-001",
    name: "Global Financial Corp",
    status: "active",
    jurisdiction: "United States",
    framework: "US Banking Regulations",
    users: 245,
    maxUsers: 500,
    storage: 1.2,
    maxStorage: 5.0,
    createdAt: "2024-01-15",
    lastActive: "2024-01-25",
    tier: "Enterprise",
    domain: "globalfinancial.com",
  },
  {
    id: "org-002",
    name: "European Investment Bank",
    status: "active",
    jurisdiction: "European Union",
    framework: "MiFID II",
    users: 89,
    maxUsers: 200,
    storage: 0.8,
    maxStorage: 2.0,
    createdAt: "2024-01-10",
    lastActive: "2024-01-25",
    tier: "Professional",
    domain: "eib-compliance.eu",
  },
  {
    id: "org-003",
    name: "Asia Pacific Securities",
    status: "pending",
    jurisdiction: "Singapore",
    framework: "MAS Guidelines",
    users: 12,
    maxUsers: 100,
    storage: 0.1,
    maxStorage: 1.0,
    createdAt: "2024-01-20",
    lastActive: "2024-01-24",
    tier: "Standard",
    domain: "aps-sg.com",
  },
]

export default function OrganizationsPage() {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [showCreateWizard, setShowCreateWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrganizations = mockOrganizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.domain.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || org.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "inactive":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "suspended":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6">
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
              <BreadcrumbPage>Organization Setup</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-slate-800 mb-2">Organization Setup</h1>
              <p className="text-slate-600 font-light">
                Manage organization provisioning, configuration, and structure
              </p>
            </div>
            <Button onClick={() => setShowCreateWizard(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Organization
            </Button>
          </div>
        </div>

        {showCreateWizard ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                New Organization Creation Wizard
              </CardTitle>
              <CardDescription>Step {wizardStep} of 5</CardDescription>
              <Progress value={(wizardStep / 5) * 100} className="w-full" />
            </CardHeader>
            <CardContent>
              {wizardStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Organization Profile Setup</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input id="orgName" placeholder="Enter organization name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgDomain">Primary Domain</Label>
                      <Input id="orgDomain" placeholder="example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank</SelectItem>
                          <SelectItem value="investment">Investment Firm</SelectItem>
                          <SelectItem value="insurance">Insurance Company</SelectItem>
                          <SelectItem value="fintech">FinTech</SelectItem>
                          <SelectItem value="crypto">Crypto Exchange</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgSize">Organization Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (1-50 users)</SelectItem>
                          <SelectItem value="medium">Medium (51-200 users)</SelectItem>
                          <SelectItem value="large">Large (201-1000 users)</SelectItem>
                          <SelectItem value="enterprise">Enterprise (1000+ users)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgDescription">Description</Label>
                    <Textarea id="orgDescription" placeholder="Brief description of the organization" />
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Jurisdiction & Regulatory Framework</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jurisdiction">Primary Jurisdiction</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="eu">European Union</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                          <SelectItem value="hk">Hong Kong</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="framework">Regulatory Framework</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select framework" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us-banking">US Banking Regulations</SelectItem>
                          <SelectItem value="mifid2">MiFID II</SelectItem>
                          <SelectItem value="basel3">Basel III</SelectItem>
                          <SelectItem value="mas">MAS Guidelines</SelectItem>
                          <SelectItem value="fca">FCA Rules</SelectItem>
                          <SelectItem value="apra">APRA Standards</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Additional Compliance Requirements</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="gdpr" />
                        <Label htmlFor="gdpr">GDPR Compliance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="sox" />
                        <Label htmlFor="sox">SOX Compliance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="pci" />
                        <Label htmlFor="pci">PCI DSS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="iso27001" />
                        <Label htmlFor="iso27001">ISO 27001</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Initial User Provisioning</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Primary Admin Email</Label>
                      <Input id="adminEmail" type="email" placeholder="admin@organization.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminName">Admin Full Name</Label>
                      <Input id="adminName" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userSeats">Initial User Seats</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select seats" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 seats</SelectItem>
                          <SelectItem value="25">25 seats</SelectItem>
                          <SelectItem value="50">50 seats</SelectItem>
                          <SelectItem value="100">100 seats</SelectItem>
                          <SelectItem value="250">250 seats</SelectItem>
                          <SelectItem value="500">500 seats</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="defaultRole">Default User Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analyst">Analyst</SelectItem>
                          <SelectItem value="reviewer">Reviewer</SelectItem>
                          <SelectItem value="rm">Relationship Manager</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Resource Allocation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storageQuota">Storage Quota (GB)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100 GB</SelectItem>
                          <SelectItem value="500">500 GB</SelectItem>
                          <SelectItem value="1000">1 TB</SelectItem>
                          <SelectItem value="5000">5 TB</SelectItem>
                          <SelectItem value="10000">10 TB</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apiLimit">API Rate Limit (req/min)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1000">1,000</SelectItem>
                          <SelectItem value="5000">5,000</SelectItem>
                          <SelectItem value="10000">10,000</SelectItem>
                          <SelectItem value="50000">50,000</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingTier">Billing Tier</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="starter">Starter</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                          <SelectItem value="gmt">GMT</SelectItem>
                          <SelectItem value="cet">Central European Time</SelectItem>
                          <SelectItem value="jst">Japan Standard Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 5 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Review & Confirm</h3>
                  <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-slate-600">Organization Name</Label>
                        <p className="text-slate-900">Global Financial Corp</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600">Domain</Label>
                        <p className="text-slate-900">globalfinancial.com</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600">Jurisdiction</Label>
                        <p className="text-slate-900">United States</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600">Framework</Label>
                        <p className="text-slate-900">US Banking Regulations</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600">User Seats</Label>
                        <p className="text-slate-900">100 seats</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600">Storage Quota</Label>
                        <p className="text-slate-900">1 TB</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => (wizardStep > 1 ? setWizardStep(wizardStep - 1) : setShowCreateWizard(false))}
                >
                  {wizardStep === 1 ? "Cancel" : "Previous"}
                </Button>
                <Button
                  onClick={() => (wizardStep < 5 ? setWizardStep(wizardStep + 1) : setShowCreateWizard(false))}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {wizardStep === 5 ? "Create Organization" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      Organizations Overview
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                        <Input
                          placeholder="Search organizations..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredOrganizations.map((org) => (
                      <div key={org.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-slate-900">{org.name}</h3>
                              <p className="text-sm text-slate-600">{org.domain}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={getStatusColor(org.status)}>
                                  {getStatusIcon(org.status)}
                                  <span className="ml-1 capitalize">{org.status}</span>
                                </Badge>
                                <Badge variant="outline">{org.tier}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-slate-600">Users</p>
                                <p className="font-medium">
                                  {org.users}/{org.maxUsers}
                                </p>
                              </div>
                              <div>
                                <p className="text-slate-600">Storage</p>
                                <p className="font-medium">
                                  {org.storage}/{org.maxStorage} TB
                                </p>
                              </div>
                              <div>
                                <p className="text-slate-600">Jurisdiction</p>
                                <p className="font-medium">{org.jurisdiction}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <Button size="sm" variant="outline" onClick={() => setSelectedOrg(org)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="configuration" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-5 w-5 mr-2" />
                      Branding & White-labeling
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Organization Logo</Label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                        <p className="text-sm text-slate-600">Upload logo (PNG, JPG, SVG)</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                          <Input value="#3B82F6" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Secondary Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-slate-600 rounded border"></div>
                          <Input value="#64748B" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Custom CSS</Label>
                      <Textarea placeholder="Enter custom CSS rules..." rows={4} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Custom Domain Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Custom Domain</Label>
                      <Input placeholder="compliance.yourcompany.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>SSL Certificate</Label>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">Valid SSL certificate</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>DNS Configuration</Label>
                      <div className="bg-slate-50 p-3 rounded text-sm font-mono">
                        <p>CNAME: compliance.yourcompany.com</p>
                        <p>Target: app.regsecured.com</p>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Domain
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      Email Template Customization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email Templates</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome Email</SelectItem>
                          <SelectItem value="password-reset">Password Reset</SelectItem>
                          <SelectItem value="notification">Notifications</SelectItem>
                          <SelectItem value="report">Report Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>From Name</Label>
                      <Input placeholder="RegSecured Compliance" />
                    </div>
                    <div className="space-y-2">
                      <Label>From Email</Label>
                      <Input placeholder="noreply@yourcompany.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Footer</Label>
                      <Textarea placeholder="Custom email footer..." rows={3} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-slate-600">Send notifications via email</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-slate-600">Send critical alerts via SMS</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>In-App Notifications</Label>
                          <p className="text-sm text-slate-600">Show notifications in application</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Webhook Notifications</Label>
                          <p className="text-sm text-slate-600">Send to external webhook URLs</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Webhook URL</Label>
                      <Input placeholder="https://api.yourcompany.com/webhooks" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Hierarchy Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Departments & Divisions</Label>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Department
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <ChevronDown className="h-4 w-4" />
                            <span className="font-medium">Compliance Department</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">45 users</Badge>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="ml-6 mt-2 space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>• KYC Team</span>
                            <Badge variant="outline">12 users</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>• AML Team</span>
                            <Badge variant="outline">18 users</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>• Risk Assessment</span>
                            <Badge variant="outline">15 users</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <ChevronRight className="h-4 w-4" />
                            <span className="font-medium">Operations</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">28 users</Badge>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Geographic Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Office Locations</Label>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Location
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New York HQ</p>
                            <p className="text-sm text-slate-600">123 Wall Street, New York, NY</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">Primary</Badge>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">London Office</p>
                            <p className="text-sm text-slate-600">456 Canary Wharf, London, UK</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">Branch</Badge>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Cost Centers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Cost Center Assignment</Label>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Cost Center
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">CC-001: Compliance Operations</p>
                            <p className="text-sm text-slate-600">Budget: $2.5M annually</p>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">CC-002: Technology Infrastructure</p>
                            <p className="text-sm text-slate-600">Budget: $1.8M annually</p>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      Business Units
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Business Unit Configuration</Label>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Unit
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Retail Banking</p>
                            <p className="text-sm text-slate-600">Consumer banking services</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">125 users</Badge>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Investment Services</p>
                            <p className="text-sm text-slate-600">Wealth management and advisory</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">89 users</Badge>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      User Seat Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Current Seats</Label>
                        <div className="text-2xl font-bold">245</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Available Seats</Label>
                        <div className="text-2xl font-bold text-green-600">255</div>
                      </div>
                    </div>
                    <Progress value={49} className="w-full" />
                    <p className="text-sm text-slate-600">49% of seats utilized</p>
                    <div className="space-y-2">
                      <Label>Seat Allocation by Role</Label>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Analysts</span>
                          <span>120 seats</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Reviewers</span>
                          <span>65 seats</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Relationship Managers</span>
                          <span>45 seats</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Admins</span>
                          <span>15 seats</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add More Seats
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      Storage Quota Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Used Storage</Label>
                        <div className="text-2xl font-bold">1.2 TB</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Total Quota</Label>
                        <div className="text-2xl font-bold">5.0 TB</div>
                      </div>
                    </div>
                    <Progress value={24} className="w-full" />
                    <p className="text-sm text-slate-600">24% of storage used</p>
                    <div className="space-y-2">
                      <Label>Storage Breakdown</Label>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Documents</span>
                          <span>0.8 TB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Reports</span>
                          <span>0.3 TB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Audit Logs</span>
                          <span>0.1 TB</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Database className="h-4 w-4 mr-2" />
                      Increase Quota
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      API Rate Limits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Current Limit</Label>
                        <div className="text-2xl font-bold">10,000</div>
                        <p className="text-xs text-slate-600">requests/minute</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Usage (24h avg)</Label>
                        <div className="text-2xl font-bold text-blue-600">3,245</div>
                        <p className="text-xs text-slate-600">requests/minute</p>
                      </div>
                    </div>
                    <Progress value={32} className="w-full" />
                    <p className="text-sm text-slate-600">32% of rate limit utilized</p>
                    <div className="space-y-2">
                      <Label>API Usage by Endpoint</Label>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>/api/screening</span>
                          <span>1,200 req/min</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>/api/documents</span>
                          <span>890 req/min</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>/api/reports</span>
                          <span>655 req/min</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Billing & Tier Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Tier</Label>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>
                        <span className="text-sm text-slate-600">$2,500/month</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Billing Cycle</Label>
                      <p className="text-sm">Monthly billing • Next payment: Feb 15, 2024</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Usage-based Charges</Label>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Extra storage (0.2 TB)</span>
                          <span>$50</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>API overages</span>
                          <span>$0</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total Monthly Cost</span>
                      <span>$2,550</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Upgrade Tier
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  )
}
