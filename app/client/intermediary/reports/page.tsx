"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, FileText, Users, Clock, Plus, Eye, Send, Settings } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for reports
const reportTemplates = [
  {
    id: "RPT-001",
    name: "Monthly Client Portfolio Report",
    type: "Portfolio",
    frequency: "Monthly",
    lastGenerated: "2024-01-31",
    nextDue: "2024-02-29",
    status: "Active",
    recipients: 3,
    format: "PDF",
  },
  {
    id: "RPT-002",
    name: "Quarterly Compliance Summary",
    type: "Compliance",
    frequency: "Quarterly",
    lastGenerated: "2024-01-31",
    nextDue: "2024-04-30",
    status: "Active",
    recipients: 5,
    format: "Excel",
  },
  {
    id: "RPT-003",
    name: "AML/KYC Status Report",
    type: "Regulatory",
    frequency: "Weekly",
    lastGenerated: "2024-02-05",
    nextDue: "2024-02-12",
    status: "Active",
    recipients: 2,
    format: "PDF",
  },
  {
    id: "RPT-004",
    name: "Risk Assessment Dashboard",
    type: "Risk",
    frequency: "Monthly",
    lastGenerated: "2024-01-31",
    nextDue: "2024-02-29",
    status: "Draft",
    recipients: 4,
    format: "Dashboard",
  },
]

const reportMetrics = {
  totalReports: 24,
  scheduledReports: 18,
  adhocReports: 6,
  pendingReports: 3,
  overdueReports: 1,
  totalRecipients: 45,
  automatedReports: 15,
  manualReports: 9,
}

const recentReports = [
  {
    id: "GEN-001",
    name: "January Portfolio Performance",
    type: "Portfolio",
    generatedDate: "2024-02-01",
    generatedBy: "System",
    status: "Completed",
    downloadCount: 12,
    size: "2.4 MB",
  },
  {
    id: "GEN-002",
    name: "Weekly Compliance Check",
    type: "Compliance",
    generatedDate: "2024-02-05",
    generatedBy: "Sarah Johnson",
    status: "Completed",
    downloadCount: 8,
    size: "1.8 MB",
  },
  {
    id: "GEN-003",
    name: "High Risk Client Analysis",
    type: "Risk",
    generatedDate: "2024-02-03",
    generatedBy: "Michael Chen",
    status: "In Progress",
    downloadCount: 0,
    size: "N/A",
  },
]

export default function IntermediaryReportsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [reportType, setReportType] = useState("all")
  const [reportStatus, setReportStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Portfolio":
        return "bg-blue-100 text-blue-800"
      case "Compliance":
        return "bg-green-100 text-green-800"
      case "Regulatory":
        return "bg-red-100 text-red-800"
      case "Risk":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reporting Dashboard</h1>
            <p className="text-muted-foreground">
              Generate, schedule, and manage reports for your intermediary services
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Report
          </Button>
        </div>

        {/* Reporting Overview Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportMetrics.totalReports}</div>
              <p className="text-xs text-muted-foreground">
                {reportMetrics.scheduledReports} scheduled, {reportMetrics.adhocReports} ad-hoc
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportMetrics.pendingReports}</div>
              <p className="text-xs text-muted-foreground">{reportMetrics.overdueReports} overdue report</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Automated Reports</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportMetrics.automatedReports}</div>
              <p className="text-xs text-muted-foreground">{reportMetrics.manualReports} manual reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportMetrics.totalRecipients}</div>
              <p className="text-xs text-muted-foreground">Across all report distributions</p>
            </CardContent>
          </Card>
        </div>

        {/* Reporting Management Tabs */}
        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="generated">Generated Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="analytics">Report Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Report Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Portfolio">Portfolio</SelectItem>
                      <SelectItem value="Compliance">Compliance</SelectItem>
                      <SelectItem value="Regulatory">Regulatory</SelectItem>
                      <SelectItem value="Risk">Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={reportStatus} onValueChange={setReportStatus}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Report Templates Table */}
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Manage your report templates and scheduling configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Generated</TableHead>
                      <TableHead>Next Due</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-muted-foreground">{template.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(template.type)}>{template.type}</Badge>
                        </TableCell>
                        <TableCell>{template.frequency}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(template.status)}>{template.status}</Badge>
                        </TableCell>
                        <TableCell>{template.lastGenerated}</TableCell>
                        <TableCell>{template.nextDue}</TableCell>
                        <TableCell>{template.recipients}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Generate
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

          <TabsContent value="generated" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recently Generated Reports</CardTitle>
                <CardDescription>View and download recently generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{report.name}</div>
                            <div className="text-sm text-muted-foreground">{report.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(report.type)}>{report.type}</Badge>
                        </TableCell>
                        <TableCell>{report.generatedDate}</TableCell>
                        <TableCell>{report.generatedBy}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        </TableCell>
                        <TableCell>{report.downloadCount}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" disabled={report.status !== "Completed"}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Send className="mr-2 h-4 w-4" />
                              Share
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

          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Report Generation</CardTitle>
                <CardDescription>Manage automated report generation schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Upcoming Reports</h3>
                    <div className="space-y-3">
                      {reportTemplates
                        .filter((template) => template.status === "Active")
                        .map((template) => (
                          <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{template.name}</p>
                              <p className="text-sm text-muted-foreground">Due: {template.nextDue}</p>
                            </div>
                            <Badge className={getTypeColor(template.type)}>{template.type}</Badge>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Schedule New Report</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="report-name">Report Name</Label>
                        <Input id="report-name" placeholder="Enter report name" />
                      </div>
                      <div>
                        <Label htmlFor="report-type">Report Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="portfolio">Portfolio</SelectItem>
                            <SelectItem value="compliance">Compliance</SelectItem>
                            <SelectItem value="regulatory">Regulatory</SelectItem>
                            <SelectItem value="risk">Risk</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Report Generation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Portfolio Reports</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compliance Reports</span>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk Reports</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Regulatory Reports</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Average Generation Time</p>
                        <p className="text-sm text-muted-foreground">Time to generate reports</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">2.3m</p>
                        <p className="text-sm text-green-600">↓ 15% faster</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Success Rate</p>
                        <p className="text-sm text-muted-foreground">Successful generations</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">98.5%</p>
                        <p className="text-sm text-green-600">↑ 2% improvement</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Total Downloads</p>
                        <p className="text-sm text-muted-foreground">This month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">1,247</p>
                        <p className="text-sm text-blue-600">↑ 23% increase</p>
                      </div>
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
