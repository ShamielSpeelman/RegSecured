"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DollarSign,
  Plus,
  Edit,
  Trash2,
  CalendarIcon,
  FileText,
  Clock,
  TrendingUp,
  Download,
  Search,
  Send,
  Eye,
  Calculator,
  BarChart3,
  Receipt,
} from "lucide-react"
import { format } from "date-fns"

// Mock data for distributions
const mockDistributions = [
  {
    id: "1",
    beneficiaryId: "1",
    beneficiaryName: "Emily Chen",
    type: "income",
    amount: 25000,
    requestDate: "2024-01-05",
    approvalDate: "2024-01-10",
    distributionDate: "2024-01-15",
    status: "completed",
    purpose: "Annual income distribution",
    taxImplications: "Taxable income to beneficiary",
    approvedBy: ["Sarah Mitchell", "Heritage Trust Corporation"],
    paymentMethod: "wire_transfer",
    reference: "DIST-2024-001",
    notes: "Regular annual distribution as per trust terms",
  },
  {
    id: "2",
    beneficiaryId: "2",
    beneficiaryName: "Michael Chen",
    type: "capital",
    amount: 50000,
    requestDate: "2023-05-15",
    approvalDate: "2023-05-20",
    distributionDate: "2023-06-01",
    status: "completed",
    purpose: "Business startup funding",
    taxImplications: "Capital gains treatment",
    approvedBy: ["Sarah Mitchell", "Heritage Trust Corporation"],
    paymentMethod: "check",
    reference: "DIST-2023-008",
    notes: "One-time distribution for business venture",
  },
  {
    id: "3",
    beneficiaryId: "3",
    beneficiaryName: "Sarah Chen",
    type: "discretionary",
    amount: 5000,
    requestDate: "2024-01-25",
    approvalDate: "2024-01-30",
    distributionDate: "2024-02-01",
    status: "completed",
    purpose: "Educational expenses",
    taxImplications: "Gift tax considerations",
    approvedBy: ["Sarah Mitchell"],
    paymentMethod: "direct_deposit",
    reference: "DIST-2024-002",
    notes: "Spring semester tuition payment",
  },
  {
    id: "4",
    beneficiaryId: "1",
    beneficiaryName: "Emily Chen",
    type: "discretionary",
    amount: 15000,
    requestDate: "2024-02-20",
    approvalDate: null,
    distributionDate: null,
    status: "pending_approval",
    purpose: "Medical expenses",
    taxImplications: "Medical expense exclusion may apply",
    approvedBy: [],
    paymentMethod: "wire_transfer",
    reference: "DIST-2024-003",
    notes: "Emergency medical procedure funding",
  },
  {
    id: "5",
    beneficiaryId: "4",
    beneficiaryName: "Chen Family Foundation",
    type: "charitable",
    amount: 100000,
    requestDate: "2023-12-01",
    approvalDate: "2023-12-15",
    distributionDate: "2023-12-31",
    status: "completed",
    purpose: "Annual charitable distribution",
    taxImplications: "Charitable deduction available",
    approvedBy: ["Sarah Mitchell", "Heritage Trust Corporation"],
    paymentMethod: "wire_transfer",
    reference: "DIST-2023-012",
    notes: "Required annual charitable distribution",
  },
]

const mockScheduledDistributions = [
  {
    id: "1",
    beneficiaryName: "Emily Chen",
    type: "income",
    amount: 25000,
    scheduledDate: "2024-07-15",
    frequency: "semi-annual",
    status: "scheduled",
    autoApprove: true,
  },
  {
    id: "2",
    beneficiaryName: "Chen Family Foundation",
    type: "charitable",
    amount: 100000,
    scheduledDate: "2024-12-31",
    frequency: "annual",
    status: "scheduled",
    autoApprove: false,
  },
  {
    id: "3",
    beneficiaryName: "Michael Chen",
    type: "capital",
    amount: 75000,
    scheduledDate: "2024-03-22",
    frequency: "one-time",
    status: "pending_vesting",
    autoApprove: false,
    vestingCondition: "Age 30 (March 22, 2024)",
  },
]

const mockTaxReports = [
  {
    id: "1",
    year: "2023",
    totalDistributions: 275000,
    incomeDistributions: 50000,
    capitalDistributions: 125000,
    charitableDistributions: 100000,
    status: "filed",
    filingDate: "2024-03-15",
    forms: ["1041", "K-1", "5227"],
  },
  {
    id: "2",
    year: "2024",
    totalDistributions: 45000,
    incomeDistributions: 25000,
    capitalDistributions: 0,
    charitableDistributions: 0,
    status: "in_progress",
    filingDate: null,
    forms: ["1041", "K-1"],
  },
]

export default function DistributionsPage() {
  const [selectedDistribution, setSelectedDistribution] = useState(null)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredDistributions = mockDistributions.filter((distribution) => {
    const matchesSearch =
      distribution.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distribution.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distribution.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || distribution.status === statusFilter
    const matchesType = typeFilter === "all" || distribution.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-purple-100 text-purple-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "bg-green-100 text-green-800"
      case "capital":
        return "bg-blue-100 text-blue-800"
      case "discretionary":
        return "bg-purple-100 text-purple-800"
      case "charitable":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <DollarSign className="h-4 w-4" />
      case "capital":
        return <TrendingUp className="h-4 w-4" />
      case "discretionary":
        return <Calculator className="h-4 w-4" />
      case "charitable":
        return <Receipt className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const totalDistributions = mockDistributions.reduce((sum, d) => sum + d.amount, 0)
  const pendingDistributions = mockDistributions.filter((d) => d.status === "pending_approval").length
  const completedThisYear = mockDistributions.filter(
    (d) => d.status === "completed" && new Date(d.distributionDate).getFullYear() === 2024,
  ).length

  return (
    <DashboardLayout userRole="client">
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trust Distributions</h1>
            <p className="text-muted-foreground">Manage distribution requests, approvals, and payment processing</p>
          </div>
          <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Request Distribution
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Request Distribution</DialogTitle>
                <DialogDescription>Submit a new distribution request for trustee approval</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beneficiary">Beneficiary</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select beneficiary" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emily">Emily Chen</SelectItem>
                        <SelectItem value="michael">Michael Chen</SelectItem>
                        <SelectItem value="sarah">Sarah Chen</SelectItem>
                        <SelectItem value="foundation">Chen Family Foundation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="distribution-type">Distribution Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income Distribution</SelectItem>
                        <SelectItem value="capital">Capital Distribution</SelectItem>
                        <SelectItem value="discretionary">Discretionary Distribution</SelectItem>
                        <SelectItem value="charitable">Charitable Distribution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wire_transfer">Wire Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="direct_deposit">Direct Deposit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Input id="purpose" placeholder="Enter purpose of distribution" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="justification">Justification</Label>
                  <Textarea
                    id="justification"
                    placeholder="Provide detailed justification for the distribution request"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supporting-docs">Supporting Documents</Label>
                  <Input id="supporting-docs" type="file" multiple />
                  <p className="text-sm text-muted-foreground">
                    Upload invoices, receipts, or other supporting documentation
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsRequestDialogOpen(false)}>Submit Request</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Distributed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalDistributions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All-time distributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingDistributions}</div>
              <p className="text-xs text-muted-foreground">Awaiting trustee approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Year</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedThisYear}</div>
              <p className="text-xs text-muted-foreground">Completed distributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Scheduled</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Mar 22</div>
              <p className="text-xs text-muted-foreground">Michael Chen vesting</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="distributions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="distributions">Distribution History</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Distributions</TabsTrigger>
            <TabsTrigger value="tax-reporting">Tax Reporting</TabsTrigger>
          </TabsList>

          <TabsContent value="distributions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribution History</CardTitle>
                <CardDescription>Track all distribution requests, approvals, and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search distributions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending_approval">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="capital">Capital</SelectItem>
                      <SelectItem value="discretionary">Discretionary</SelectItem>
                      <SelectItem value="charitable">Charitable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Beneficiary</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Distribution Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDistributions.map((distribution) => (
                      <TableRow key={distribution.id}>
                        <TableCell>
                          <div className="font-medium">{distribution.reference}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(distribution.type)}
                            <div>
                              <div className="font-medium">{distribution.beneficiaryName}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(distribution.type)}>{distribution.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${distribution.amount.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate">{distribution.purpose}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(distribution.status)}>
                            {distribution.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {distribution.distributionDate
                            ? format(new Date(distribution.distributionDate), "MMM dd, yyyy")
                            : "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            {distribution.status === "completed" && (
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
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
                <CardTitle>Scheduled Distributions</CardTitle>
                <CardDescription>Manage recurring and future distributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Distribution
                  </Button>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Calendar View
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Beneficiary</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Auto-Approve</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockScheduledDistributions.map((scheduled) => (
                      <TableRow key={scheduled.id}>
                        <TableCell>
                          <div className="font-medium">{scheduled.beneficiaryName}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(scheduled.type)}>{scheduled.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${scheduled.amount.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>{format(new Date(scheduled.scheduledDate), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{scheduled.frequency}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(scheduled.status)}>
                            {scheduled.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={scheduled.autoApprove ? "default" : "secondary"}>
                            {scheduled.autoApprove ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="tax-reporting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tax Reporting</CardTitle>
                <CardDescription>Track tax implications and generate required tax forms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Tax Report
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export All Forms
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockTaxReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium">Tax Year {report.year}</h4>
                          <p className="text-sm text-muted-foreground">
                            Total Distributions: ${report.totalDistributions.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              report.status === "filed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {report.status.replace("_", " ")}
                          </Badge>
                          {report.filingDate && (
                            <span className="text-sm text-muted-foreground">
                              Filed: {format(new Date(report.filingDate), "MMM dd, yyyy")}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Income</div>
                          <div className="font-medium">${report.incomeDistributions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Capital</div>
                          <div className="font-medium">${report.capitalDistributions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Charitable</div>
                          <div className="font-medium">${report.charitableDistributions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Forms</div>
                          <div className="flex flex-wrap gap-1">
                            {report.forms.map((form) => (
                              <Badge key={form} variant="outline" className="text-xs">
                                {form}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download Forms
                        </Button>
                        {report.status === "in_progress" && (
                          <Button size="sm">
                            <Send className="mr-2 h-4 w-4" />
                            File Return
                          </Button>
                        )}
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
