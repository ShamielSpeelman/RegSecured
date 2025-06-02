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
  CalendarIcon,
  FileText,
  AlertTriangle,
  CheckCircle,
  Building,
  User,
  Download,
  Search,
  Upload,
} from "lucide-react"
import { format } from "date-fns"

// Mock data for trustees
const mockTrustees = [
  {
    id: "1",
    name: "Sarah Mitchell",
    type: "individual",
    role: "Professional Trustee",
    appointmentDate: "2020-01-15",
    status: "active",
    powers: ["investment", "distribution", "administrative"],
    limitations: "Cannot distribute more than $100,000 annually without co-trustee approval",
    email: "sarah.mitchell@trustco.com",
    phone: "+1 (555) 123-4567",
    address: "123 Trust Street, Financial District, NY 10004",
    qualifications: "CPA, Certified Trust and Financial Advisor",
    nextReview: "2024-01-15",
  },
  {
    id: "2",
    name: "Heritage Trust Corporation",
    type: "corporate",
    role: "Corporate Trustee",
    appointmentDate: "2020-01-15",
    status: "active",
    powers: ["investment", "distribution", "administrative", "custody"],
    limitations: "None",
    email: "trustees@heritagetrust.com",
    phone: "+1 (555) 987-6543",
    address: "456 Corporate Plaza, Suite 2000, NY 10005",
    qualifications: "Licensed Trust Company, FDIC Insured",
    nextReview: "2024-06-30",
  },
  {
    id: "3",
    name: "Robert Chen",
    type: "individual",
    role: "Family Trustee",
    appointmentDate: "2022-03-10",
    status: "active",
    powers: ["distribution"],
    limitations: "Limited to distributions under $25,000",
    email: "robert.chen@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Family Lane, Residential Area, NY 10006",
    qualifications: "Family Member, Business Owner",
    nextReview: "2025-03-10",
  },
  {
    id: "4",
    name: "Margaret Thompson",
    type: "individual",
    role: "Successor Trustee",
    appointmentDate: "2023-01-01",
    status: "inactive",
    powers: ["investment", "distribution", "administrative"],
    limitations: "Only active upon resignation of primary trustees",
    email: "margaret.thompson@law.com",
    phone: "+1 (555) 234-5678",
    address: "321 Legal Avenue, Law District, NY 10007",
    qualifications: "Attorney, Estate Planning Specialist",
    nextReview: "2026-01-01",
  },
]

const mockMeetings = [
  {
    id: "1",
    title: "Quarterly Investment Review",
    date: "2024-03-15",
    time: "10:00 AM",
    attendees: ["Sarah Mitchell", "Heritage Trust Corporation"],
    agenda: "Review portfolio performance, discuss distribution requests",
    status: "scheduled",
    location: "Heritage Trust Offices",
  },
  {
    id: "2",
    title: "Annual Trust Review",
    date: "2024-01-20",
    time: "2:00 PM",
    attendees: ["Sarah Mitchell", "Heritage Trust Corporation", "Robert Chen"],
    agenda: "Annual performance review, beneficiary updates, tax planning",
    status: "completed",
    location: "Virtual Meeting",
  },
  {
    id: "3",
    title: "Emergency Distribution Decision",
    date: "2024-02-28",
    time: "11:00 AM",
    attendees: ["Sarah Mitchell", "Robert Chen"],
    agenda: "Review emergency distribution request from beneficiary",
    status: "completed",
    location: "Conference Call",
  },
]

const mockDocuments = [
  {
    id: "1",
    title: "Trust Deed Amendment #3",
    type: "amendment",
    date: "2024-01-15",
    status: "executed",
    signatories: ["Sarah Mitchell", "Heritage Trust Corporation"],
    description: "Amendment to investment powers",
  },
  {
    id: "2",
    title: "Trustee Resolution - Q4 2023 Distributions",
    type: "resolution",
    date: "2023-12-20",
    status: "executed",
    signatories: ["Sarah Mitchell", "Heritage Trust Corporation"],
    description: "Approval of year-end distributions to beneficiaries",
  },
  {
    id: "3",
    title: "Investment Policy Statement Update",
    type: "policy",
    date: "2024-02-01",
    status: "draft",
    signatories: [],
    description: "Updated investment guidelines and risk parameters",
  },
]

export default function TrusteesPage() {
  const [selectedTrustee, setSelectedTrustee] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTrustees = mockTrustees.filter((trustee) => {
    const matchesSearch =
      trustee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trustee.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || trustee.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "resigned":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "individual":
        return <User className="h-4 w-4" />
      case "corporate":
        return <Building className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getMeetingStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "executed":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout userRole="client">
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trustee Management</h1>
            <p className="text-muted-foreground">Manage trustees, their powers, and administrative responsibilities</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Trustee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Trustee</DialogTitle>
                <DialogDescription>Add a new trustee to the trust structure</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trustee-name">Name</Label>
                    <Input id="trustee-name" placeholder="Enter trustee name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trustee-type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trustee-role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional Trustee</SelectItem>
                        <SelectItem value="corporate">Corporate Trustee</SelectItem>
                        <SelectItem value="family">Family Trustee</SelectItem>
                        <SelectItem value="successor">Successor Trustee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-date">Appointment Date</Label>
                    <Input id="appointment-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="powers">Powers</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Investment Powers</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Distribution Powers</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Administrative Powers</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Custody Powers</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limitations">Limitations</Label>
                  <Textarea id="limitations" placeholder="Enter any limitations on trustee powers" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Add Trustee</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trustees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 successor trustee</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Review</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Jan 15</div>
              <p className="text-xs text-muted-foreground">Professional trustee review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Requiring trustee approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">All requirements met</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="trustees" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trustees">Trustees</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="trustees" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Trustee Registry</CardTitle>
                <CardDescription>Manage trustee appointments, powers, and responsibilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search trustees..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="resigned">Resigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trustee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Powers</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Review</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrustees.map((trustee) => (
                      <TableRow key={trustee.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(trustee.type)}
                            <div>
                              <div className="font-medium">{trustee.name}</div>
                              <div className="text-sm text-muted-foreground">{trustee.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{trustee.type === "individual" ? "Individual" : "Corporate"}</Badge>
                        </TableCell>
                        <TableCell>{trustee.role}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {trustee.powers.slice(0, 2).map((power) => (
                              <Badge key={power} variant="secondary" className="text-xs">
                                {power}
                              </Badge>
                            ))}
                            {trustee.powers.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{trustee.powers.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(trustee.status)}>{trustee.status}</Badge>
                        </TableCell>
                        <TableCell>{format(new Date(trustee.nextReview), "MMM dd, yyyy")}</TableCell>
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

          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trustee Meetings</CardTitle>
                <CardDescription>Schedule and manage trustee meetings and decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </div>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Calendar View
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meeting</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMeetings.map((meeting) => (
                      <TableRow key={meeting.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{meeting.title}</div>
                            <div className="text-sm text-muted-foreground">{meeting.agenda}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{format(new Date(meeting.date), "MMM dd, yyyy")}</div>
                            <div className="text-sm text-muted-foreground">{meeting.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {meeting.attendees.slice(0, 2).join(", ")}
                            {meeting.attendees.length > 2 && ` +${meeting.attendees.length - 2}`}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getMeetingStatusColor(meeting.status)}>{meeting.status}</Badge>
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

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trustee Documents</CardTitle>
                <CardDescription>Manage trustee resolutions, amendments, and administrative documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Document
                    </Button>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Signatories</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{document.title}</div>
                            <div className="text-sm text-muted-foreground">{document.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{document.type}</Badge>
                        </TableCell>
                        <TableCell>{format(new Date(document.date), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          <Badge className={getDocumentStatusColor(document.status)}>{document.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {document.signatories.length > 0 ? document.signatories.slice(0, 2).join(", ") : "Pending"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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
