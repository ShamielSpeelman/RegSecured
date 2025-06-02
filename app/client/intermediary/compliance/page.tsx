"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Shield,
  AlertTriangle,
  Clock,
  Users,
  FileText,
  Search,
  Eye,
  Download,
  Bell,
  BarChart3,
  Activity,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for compliance monitoring
const complianceMetrics = {
  overallScore: 94,
  totalClients: 45,
  compliantClients: 42,
  nonCompliantClients: 2,
  pendingReviews: 1,
  activeAlerts: 6,
  resolvedAlerts: 28,
  overdueReviews: 3,
  upcomingDeadlines: 8,
  regulatoryChanges: 4,
}

const complianceAlerts = [
  {
    id: "ALT-001",
    type: "High Risk",
    client: "Global Trade Ventures Ltd",
    description: "Sanctions screening match requires review",
    severity: "High",
    created: "2024-02-05",
    dueDate: "2024-02-07",
    status: "Open",
    assignee: "Sarah Johnson",
  },
  {
    id: "ALT-002",
    type: "Document Expiry",
    client: "Apex Financial Holdings",
    description: "Corporate registration expires in 30 days",
    severity: "Medium",
    created: "2024-02-04",
    dueDate: "2024-03-05",
    status: "In Progress",
    assignee: "Michael Chen",
  },
  {
    id: "ALT-003",
    type: "KYC Review",
    client: "Heritage Trust Foundation",
    description: "Annual KYC review due",
    severity: "Medium",
    created: "2024-02-03",
    dueDate: "2024-02-15",
    status: "Open",
    assignee: "Emma Wilson",
  },
  {
    id: "ALT-004",
    type: "Risk Assessment",
    client: "Innovation Capital Fund",
    description: "Risk profile requires reassessment",
    severity: "Low",
    created: "2024-02-02",
    dueDate: "2024-02-20",
    status: "Open",
    assignee: "David Kim",
  },
]

const clientComplianceStatus = [
  {
    id: "CLT-001",
    name: "Apex Financial Holdings",
    type: "Corporate",
    complianceScore: 98,
    lastReview: "2024-01-15",
    nextReview: "2024-07-15",
    status: "Compliant",
    riskLevel: "Low",
    openAlerts: 0,
    jurisdiction: "Singapore",
  },
  {
    id: "CLT-002",
    name: "Global Trade Ventures Ltd",
    type: "Corporate",
    complianceScore: 75,
    lastReview: "2024-01-10",
    nextReview: "2024-04-10",
    status: "Non-Compliant",
    riskLevel: "High",
    openAlerts: 2,
    jurisdiction: "Hong Kong",
  },
  {
    id: "CLT-003",
    name: "Heritage Trust Foundation",
    type: "Trust",
    complianceScore: 92,
    lastReview: "2024-01-20",
    nextReview: "2024-07-20",
    status: "Compliant",
    riskLevel: "Medium",
    openAlerts: 1,
    jurisdiction: "Cayman Islands",
  },
  {
    id: "CLT-004",
    name: "Innovation Capital Fund",
    type: "Fund",
    complianceScore: 88,
    lastReview: "2024-01-12",
    nextReview: "2024-06-12",
    status: "Compliant",
    riskLevel: "Medium",
    openAlerts: 1,
    jurisdiction: "Luxembourg",
  },
]

const regulatoryUpdates = [
  {
    id: "REG-001",
    title: "Updated AML Guidelines for Crypto Assets",
    jurisdiction: "Singapore",
    effectiveDate: "2024-03-01",
    impact: "High",
    status: "Action Required",
    description: "New requirements for cryptocurrency transaction monitoring",
  },
  {
    id: "REG-002",
    title: "Enhanced Due Diligence Requirements",
    jurisdiction: "EU",
    effectiveDate: "2024-04-15",
    impact: "Medium",
    status: "Under Review",
    description: "Additional verification requirements for high-risk jurisdictions",
  },
  {
    id: "REG-003",
    title: "Beneficial Ownership Disclosure Updates",
    jurisdiction: "Hong Kong",
    effectiveDate: "2024-02-28",
    impact: "Medium",
    status: "Implemented",
    description: "Updated thresholds for beneficial ownership reporting",
  },
]

export default function IntermediaryCompliancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [alertFilter, setAlertFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant":
        return "bg-green-100 text-green-800"
      case "Non-Compliant":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Open":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      case "Resolved":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAlerts = complianceAlerts.filter((alert) => {
    const matchesSearch =
      alert.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAlert = alertFilter === "all" || alert.type === alertFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSearch && matchesAlert && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compliance Monitoring</h1>
            <p className="text-muted-foreground">
              Monitor compliance status, manage alerts, and track regulatory requirements
            </p>
          </div>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            View All Alerts
          </Button>
        </div>

        {/* Compliance Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceMetrics.overallScore}%</div>
              <Progress value={complianceMetrics.overallScore} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {complianceMetrics.compliantClients} of {complianceMetrics.totalClients} clients compliant
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceMetrics.activeAlerts}</div>
              <p className="text-xs text-muted-foreground">{complianceMetrics.resolvedAlerts} resolved this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceMetrics.pendingReviews}</div>
              <p className="text-xs text-muted-foreground">{complianceMetrics.overdueReviews} overdue reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Regulatory Changes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceMetrics.regulatoryChanges}</div>
              <p className="text-xs text-muted-foreground">Requiring attention this quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts */}
        {complianceAlerts.filter((alert) => alert.severity === "High").length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Critical Compliance Alerts</AlertTitle>
            <AlertDescription className="text-red-700">
              You have {complianceAlerts.filter((alert) => alert.severity === "High").length} high-priority compliance
              alerts requiring immediate attention.
            </AlertDescription>
          </Alert>
        )}

        {/* Compliance Management Tabs */}
        <Tabs defaultValue="alerts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="clients">Client Status</TabsTrigger>
            <TabsTrigger value="monitoring">Ongoing Monitoring</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Compliance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search alerts by client or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={alertFilter} onValueChange={setAlertFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="High Risk">High Risk</SelectItem>
                      <SelectItem value="Document Expiry">Document Expiry</SelectItem>
                      <SelectItem value="KYC Review">KYC Review</SelectItem>
                      <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Alerts Table */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Alerts ({filteredAlerts.length} alerts)</CardTitle>
                <CardDescription>Active compliance alerts requiring attention and resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{alert.id}</div>
                            <div className="text-sm text-muted-foreground">{alert.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {alert.client.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{alert.client}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{alert.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                        </TableCell>
                        <TableCell>{alert.dueDate}</TableCell>
                        <TableCell>{alert.assignee}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Review
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

          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Compliance Status</CardTitle>
                <CardDescription>Overview of compliance status for all clients under management</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Compliance Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Open Alerts</TableHead>
                      <TableHead>Next Review</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientComplianceStatus.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-muted-foreground">{client.jurisdiction}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{client.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{client.complianceScore}%</span>
                            <Progress value={client.complianceScore} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(client.riskLevel)}>{client.riskLevel}</Badge>
                        </TableCell>
                        <TableCell>
                          {client.openAlerts > 0 ? (
                            <Badge variant="destructive">{client.openAlerts}</Badge>
                          ) : (
                            <span className="text-muted-foreground">None</span>
                          )}
                        </TableCell>
                        <TableCell>{client.nextReview}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ongoing Monitoring Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Transaction Monitoring</p>
                          <p className="text-sm text-muted-foreground">Real-time screening</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Sanctions Screening</p>
                          <p className="text-sm text-muted-foreground">Daily updates</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium">Document Expiry Tracking</p>
                          <p className="text-sm text-muted-foreground">Weekly checks</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Monitoring</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Risk Score Updates</p>
                          <p className="text-sm text-muted-foreground">Monthly recalculation</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monitoring Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Transactions Screened</span>
                      <span className="text-sm font-medium">12,847</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Alerts Generated</span>
                      <span className="text-sm font-medium">156</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "12%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">False Positives</span>
                      <span className="text-sm font-medium">23</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">True Positives</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regulatory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Updates & Changes</CardTitle>
                <CardDescription>Stay informed about regulatory changes affecting your clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regulatoryUpdates.map((update) => (
                    <div key={update.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{update.title}</h4>
                            <Badge className={getImpactColor(update.impact)}>{update.impact} Impact</Badge>
                            <Badge className={getStatusColor(update.status)}>{update.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{update.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Jurisdiction: {update.jurisdiction}</span>
                            <span>Effective: {update.effectiveDate}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
