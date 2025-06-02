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
  Users,
  Plus,
  Edit,
  FileText,
  Clock,
  User,
  Heart,
  TrendingUp,
  Download,
  Search,
  DollarSign,
  Gift,
  GraduationCap,
} from "lucide-react"
import { format } from "date-fns"

// Mock data for beneficiaries
const mockBeneficiaries = [
  {
    id: "1",
    name: "Emily Chen",
    type: "income",
    relationship: "daughter",
    dateOfBirth: "1995-06-15",
    age: 28,
    status: "active",
    entitlements: ["income", "discretionary"],
    vestingAge: null,
    distributionHistory: [
      { date: "2024-01-15", amount: 25000, type: "income", purpose: "Annual income distribution" },
      { date: "2023-12-20", amount: 15000, type: "discretionary", purpose: "Education expenses" },
    ],
    totalDistributed: 180000,
    address: "456 University Ave, Boston, MA 02115",
    email: "emily.chen@email.com",
    phone: "+1 (555) 234-5678",
    occupation: "Graduate Student",
    taxId: "***-**-5678",
    specialConditions: "Education-related distributions prioritized",
  },
  {
    id: "2",
    name: "Michael Chen",
    type: "capital",
    relationship: "son",
    dateOfBirth: "1998-03-22",
    age: 25,
    status: "active",
    entitlements: ["capital"],
    vestingAge: 30,
    distributionHistory: [{ date: "2023-06-01", amount: 50000, type: "capital", purpose: "Business startup funding" }],
    totalDistributed: 50000,
    address: "789 Tech Street, San Francisco, CA 94105",
    email: "michael.chen@startup.com",
    phone: "+1 (555) 345-6789",
    occupation: "Entrepreneur",
    taxId: "***-**-6789",
    specialConditions: "Capital distributions available at age 30",
  },
  {
    id: "3",
    name: "Sarah Chen",
    type: "discretionary",
    relationship: "daughter",
    dateOfBirth: "2005-11-08",
    age: 18,
    status: "minor",
    entitlements: ["discretionary"],
    vestingAge: 25,
    distributionHistory: [{ date: "2024-02-01", amount: 5000, type: "discretionary", purpose: "Educational expenses" }],
    totalDistributed: 15000,
    address: "123 Family Home, Residential Area, NY 10006",
    email: "sarah.chen@student.edu",
    phone: "+1 (555) 456-7890",
    occupation: "Student",
    taxId: "***-**-7890",
    specialConditions: "Distributions for education and health only until age 25",
  },
  {
    id: "4",
    name: "Chen Family Foundation",
    type: "charitable",
    relationship: "charitable beneficiary",
    dateOfBirth: null,
    age: null,
    status: "active",
    entitlements: ["discretionary"],
    vestingAge: null,
    distributionHistory: [
      { date: "2023-12-31", amount: 100000, type: "charitable", purpose: "Annual charitable distribution" },
    ],
    totalDistributed: 300000,
    address: "555 Charity Lane, Philanthropic District, NY 10008",
    email: "contact@chenfoundation.org",
    phone: "+1 (555) 567-8901",
    occupation: "Charitable Organization",
    taxId: "**-*******",
    specialConditions: "Minimum 5% annual distribution required",
  },
]

const mockCommunications = [
  {
    id: "1",
    beneficiaryId: "1",
    beneficiaryName: "Emily Chen",
    type: "distribution_notice",
    subject: "Annual Income Distribution Notice",
    date: "2024-01-10",
    status: "sent",
    content: "Your annual income distribution of $25,000 has been approved and will be processed on January 15, 2024.",
  },
  {
    id: "2",
    beneficiaryId: "2",
    beneficiaryName: "Michael Chen",
    type: "request_response",
    subject: "Business Funding Request - Approved",
    date: "2023-05-25",
    status: "sent",
    content:
      "Your request for business startup funding has been approved. Distribution of $50,000 will be made on June 1, 2023.",
  },
  {
    id: "3",
    beneficiaryId: "3",
    beneficiaryName: "Sarah Chen",
    type: "educational_update",
    subject: "Educational Expense Reimbursement",
    date: "2024-01-30",
    status: "sent",
    content: "Your educational expense reimbursement of $5,000 has been processed for spring semester tuition.",
  },
]

export default function BeneficiariesPage() {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredBeneficiaries = mockBeneficiaries.filter((beneficiary) => {
    const matchesSearch =
      beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.relationship.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || beneficiary.type === typeFilter
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "minor":
        return "bg-blue-100 text-blue-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "deceased":
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
        return <Gift className="h-4 w-4" />
      case "charitable":
        return <Heart className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getCommunicationTypeColor = (type: string) => {
    switch (type) {
      case "distribution_notice":
        return "bg-green-100 text-green-800"
      case "request_response":
        return "bg-blue-100 text-blue-800"
      case "educational_update":
        return "bg-purple-100 text-purple-800"
      case "general":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalBeneficiaries = mockBeneficiaries.length
  const activeBeneficiaries = mockBeneficiaries.filter((b) => b.status === "active").length
  const minorBeneficiaries = mockBeneficiaries.filter((b) => b.status === "minor").length
  const totalDistributed = mockBeneficiaries.reduce((sum, b) => sum + b.totalDistributed, 0)

  return (
    <DashboardLayout userRole="client">
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Beneficiary Registry</h1>
            <p className="text-muted-foreground">Manage trust beneficiaries, entitlements, and distribution history</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Beneficiary
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Beneficiary</DialogTitle>
                <DialogDescription>Add a new beneficiary to the trust</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beneficiary-name">Name</Label>
                    <Input id="beneficiary-name" placeholder="Enter beneficiary name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beneficiary-type">Beneficiary Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income Beneficiary</SelectItem>
                        <SelectItem value="capital">Capital Beneficiary</SelectItem>
                        <SelectItem value="discretionary">Discretionary Beneficiary</SelectItem>
                        <SelectItem value="charitable">Charitable Beneficiary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="grandchild">Grandchild</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="charity">Charitable Organization</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-of-birth">Date of Birth</Label>
                    <Input id="date-of-birth" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vesting-age">Vesting Age (if applicable)</Label>
                    <Input id="vesting-age" type="number" placeholder="e.g., 25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID</Label>
                    <Input id="tax-id" placeholder="SSN or EIN" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entitlements">Entitlements</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Income Distributions</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Capital Distributions</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Discretionary Distributions</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Remainder Interest</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="special-conditions">Special Conditions</Label>
                  <Textarea id="special-conditions" placeholder="Enter any special conditions or restrictions" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Add Beneficiary</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBeneficiaries}</div>
              <p className="text-xs text-muted-foreground">
                {activeBeneficiaries} active, {minorBeneficiaries} minors
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Distributed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalDistributed.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Lifetime distributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Awaiting trustee approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Vestings</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Michael Chen at age 30</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="beneficiaries" className="space-y-4">
          <TabsList>
            <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
            <TabsTrigger value="distributions">Distribution History</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="beneficiaries" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Beneficiary Registry</CardTitle>
                <CardDescription>Manage beneficiary information, entitlements, and special conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search beneficiaries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
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
                      <TableHead>Beneficiary</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Relationship</TableHead>
                      <TableHead>Age/Vesting</TableHead>
                      <TableHead>Entitlements</TableHead>
                      <TableHead>Total Distributed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBeneficiaries.map((beneficiary) => (
                      <TableRow key={beneficiary.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(beneficiary.type)}
                            <div>
                              <div className="font-medium">{beneficiary.name}</div>
                              <div className="text-sm text-muted-foreground">{beneficiary.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(beneficiary.type)}>{beneficiary.type}</Badge>
                        </TableCell>
                        <TableCell>{beneficiary.relationship}</TableCell>
                        <TableCell>
                          <div>
                            {beneficiary.age && <div>Age: {beneficiary.age}</div>}
                            {beneficiary.vestingAge && (
                              <div className="text-sm text-muted-foreground">Vests at: {beneficiary.vestingAge}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {beneficiary.entitlements.slice(0, 2).map((entitlement) => (
                              <Badge key={entitlement} variant="secondary" className="text-xs">
                                {entitlement}
                              </Badge>
                            ))}
                            {beneficiary.entitlements.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{beneficiary.entitlements.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>${beneficiary.totalDistributed.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(beneficiary.status)}>{beneficiary.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
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

          <TabsContent value="distributions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribution History</CardTitle>
                <CardDescription>Track all distributions made to beneficiaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBeneficiaries.map((beneficiary) => (
                    <div key={beneficiary.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(beneficiary.type)}
                          <h4 className="font-medium">{beneficiary.name}</h4>
                          <Badge className={getTypeColor(beneficiary.type)}>{beneficiary.type}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total: ${beneficiary.totalDistributed.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {beneficiary.distributionHistory.map((distribution, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                            <div>
                              <div className="font-medium">${distribution.amount.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">{distribution.purpose}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">{format(new Date(distribution.date), "MMM dd, yyyy")}</div>
                              <Badge variant="outline" className="text-xs">
                                {distribution.type}
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
          </TabsContent>

          <TabsContent value="communications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Beneficiary Communications</CardTitle>
                <CardDescription>Manage communications with beneficiaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Communication
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Communications
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Beneficiary</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCommunications.map((communication) => (
                      <TableRow key={communication.id}>
                        <TableCell>
                          <div className="font-medium">{communication.beneficiaryName}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCommunicationTypeColor(communication.type)}>
                            {communication.type.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{communication.subject}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">{communication.content}</div>
                          </div>
                        </TableCell>
                        <TableCell>{format(new Date(communication.date), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{communication.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
