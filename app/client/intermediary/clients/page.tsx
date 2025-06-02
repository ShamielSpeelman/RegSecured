"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Search,
  Plus,
  TrendingUp,
  AlertTriangle,
  Clock,
  FileText,
  MessageSquare,
  Calendar,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for client portfolio
const mockClients = [
  {
    id: "CLT-001",
    name: "Apex Financial Holdings",
    type: "Corporate",
    status: "Active",
    riskLevel: "Medium",
    onboardingProgress: 100,
    lastReview: "2024-01-15",
    nextReview: "2024-07-15",
    aum: "$2.5M",
    relationship: "Primary",
    jurisdiction: "Singapore",
    kycStatus: "Current",
    documents: 12,
    alerts: 0,
  },
  {
    id: "CLT-002",
    name: "Global Trade Ventures Ltd",
    type: "Corporate",
    status: "Onboarding",
    riskLevel: "High",
    onboardingProgress: 75,
    lastReview: "2024-01-10",
    nextReview: "2024-04-10",
    aum: "$5.2M",
    relationship: "Secondary",
    jurisdiction: "Hong Kong",
    kycStatus: "Pending",
    documents: 8,
    alerts: 2,
  },
  {
    id: "CLT-003",
    name: "Heritage Trust Foundation",
    type: "Trust",
    status: "Active",
    riskLevel: "Low",
    onboardingProgress: 100,
    lastReview: "2024-01-20",
    nextReview: "2024-01-20",
    aum: "$8.7M",
    relationship: "Primary",
    jurisdiction: "Cayman Islands",
    kycStatus: "Current",
    documents: 15,
    alerts: 0,
  },
  {
    id: "CLT-004",
    name: "Innovation Capital Fund",
    type: "Fund",
    status: "Under Review",
    riskLevel: "Medium",
    onboardingProgress: 90,
    lastReview: "2024-01-12",
    nextReview: "2024-06-12",
    aum: "$12.3M",
    relationship: "Primary",
    jurisdiction: "Luxembourg",
    kycStatus: "Under Review",
    documents: 10,
    alerts: 1,
  },
  {
    id: "CLT-005",
    name: "Pacific Wealth Management",
    type: "Corporate",
    status: "Active",
    riskLevel: "Low",
    onboardingProgress: 100,
    lastReview: "2024-01-18",
    nextReview: "2024-07-18",
    aum: "$3.8M",
    relationship: "Secondary",
    jurisdiction: "Australia",
    kycStatus: "Current",
    documents: 14,
    alerts: 0,
  },
]

const portfolioMetrics = {
  totalClients: 45,
  activeClients: 38,
  onboardingClients: 5,
  underReviewClients: 2,
  totalAUM: "$156.8M",
  averageAUM: "$3.5M",
  highRiskClients: 8,
  mediumRiskClients: 22,
  lowRiskClients: 15,
  pendingReviews: 12,
  overdueReviews: 3,
  activeAlerts: 6,
}

export default function IntermediaryClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Onboarding":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
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

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    const matchesRisk = riskFilter === "all" || client.riskLevel === riskFilter
    const matchesType = typeFilter === "all" || client.type === typeFilter

    return matchesSearch && matchesStatus && matchesRisk && matchesType
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Client Portfolio Management</h1>
            <p className="text-muted-foreground">
              Manage your client portfolio, track onboarding progress, and monitor compliance status
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
        </div>

        {/* Portfolio Overview Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioMetrics.totalClients}</div>
              <p className="text-xs text-muted-foreground">
                {portfolioMetrics.activeClients} active, {portfolioMetrics.onboardingClients} onboarding
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioMetrics.totalAUM}</div>
              <p className="text-xs text-muted-foreground">Average: {portfolioMetrics.averageAUM} per client</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Distribution</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioMetrics.highRiskClients}</div>
              <p className="text-xs text-muted-foreground">High risk clients requiring attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioMetrics.pendingReviews}</div>
              <p className="text-xs text-muted-foreground">{portfolioMetrics.overdueReviews} overdue reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Client Management Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-4">
          <TabsList>
            <TabsTrigger value="portfolio">Client Portfolio</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding Pipeline</TabsTrigger>
            <TabsTrigger value="reviews">Review Schedule</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search clients by name or ID..."
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
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Onboarding">Onboarding</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="High">High Risk</SelectItem>
                      <SelectItem value="Medium">Medium Risk</SelectItem>
                      <SelectItem value="Low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Trust">Trust</SelectItem>
                      <SelectItem value="Fund">Fund</SelectItem>
                      <SelectItem value="Individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Client Portfolio Table */}
            <Card>
              <CardHeader>
                <CardTitle>Client Portfolio ({filteredClients.length} clients)</CardTitle>
                <CardDescription>Overview of all clients under management with key metrics and status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>AUM</TableHead>
                      <TableHead>KYC Status</TableHead>
                      <TableHead>Next Review</TableHead>
                      <TableHead>Alerts</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-muted-foreground">{client.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{client.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(client.riskLevel)}>{client.riskLevel}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{client.aum}</TableCell>
                        <TableCell>
                          <Badge className={getKYCStatusColor(client.kycStatus)}>{client.kycStatus}</Badge>
                        </TableCell>
                        <TableCell>{client.nextReview}</TableCell>
                        <TableCell>
                          {client.alerts > 0 ? (
                            <Badge variant="destructive">{client.alerts}</Badge>
                          ) : (
                            <span className="text-muted-foreground">None</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Client
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Report
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Send Message
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="onboarding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Pipeline</CardTitle>
                <CardDescription>Track client onboarding progress and identify bottlenecks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClients
                    .filter((client) => client.onboardingProgress < 100)
                    .map((client) => (
                      <div key={client.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{client.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {client.type} • {client.jurisdiction}
                              </p>
                            </div>
                            <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Onboarding Progress</span>
                              <span>{client.onboardingProgress}%</span>
                            </div>
                            <Progress value={client.onboardingProgress} className="mt-1" />
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review Schedule</CardTitle>
                <CardDescription>Upcoming and overdue client reviews requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{client.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Last Review: {client.lastReview} • Next Review: {client.nextReview}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRiskColor(client.riskLevel)}>{client.riskLevel}</Badge>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Communications</CardTitle>
                <CardDescription>Manage communications with your client portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>AF</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Apex Financial Holdings</p>
                            <p className="text-sm text-muted-foreground">Document submission completed</p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>GT</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Global Trade Ventures</p>
                            <p className="text-sm text-muted-foreground">KYC documentation query</p>
                            <p className="text-xs text-muted-foreground">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Communication Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          KYC Document Request
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Review Reminder
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Compliance Update
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Welcome Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
