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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MessageSquare, Clock, CheckCircle, AlertTriangle, Search, Calendar, User } from "lucide-react"
import { useState } from "react"

const supportRequests = [
  {
    id: "SR-001",
    subject: "Document Upload Issue",
    category: "Technical",
    priority: "Medium",
    status: "Open",
    createdDate: "2024-01-28",
    lastUpdate: "2024-01-29",
    assignedTo: "Sarah Johnson",
    description: "Unable to upload passport document - getting error message",
  },
  {
    id: "SR-002",
    subject: "Account Verification Status",
    category: "Account",
    priority: "High",
    status: "In Progress",
    createdDate: "2024-01-25",
    lastUpdate: "2024-01-28",
    assignedTo: "Mike Chen",
    description: "Need clarification on verification timeline",
  },
  {
    id: "SR-003",
    subject: "Form Submission Error",
    category: "Technical",
    priority: "Low",
    status: "Resolved",
    createdDate: "2024-01-20",
    lastUpdate: "2024-01-22",
    assignedTo: "Sarah Johnson",
    description: "Error when submitting KYC form - resolved",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Open":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <Clock className="h-3 w-3 mr-1" />
          Open
        </Badge>
      )
    case "In Progress":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      )
    case "Resolved":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Resolved
        </Badge>
      )
    case "Closed":
      return <Badge className="bg-slate-100 text-slate-800 border-slate-200">Closed</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "High":
      return <Badge variant="destructive">High</Badge>
    case "Medium":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
    case "Low":
      return <Badge variant="outline">Low</Badge>
    default:
      return <Badge variant="outline">Normal</Badge>
  }
}

export default function SupportRequestsPage() {
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newRequest, setNewRequest] = useState({
    subject: "",
    category: "",
    priority: "Medium",
    description: "",
  })

  const filteredRequests = supportRequests.filter(
    (request) =>
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmitRequest = () => {
    // Submit logic here
    setShowNewRequest(false)
    setNewRequest({ subject: "", category: "", priority: "Medium", description: "" })
  }

  const requestStats = {
    total: supportRequests.length,
    open: supportRequests.filter((r) => r.status === "Open").length,
    inProgress: supportRequests.filter((r) => r.status === "In Progress").length,
    resolved: supportRequests.filter((r) => r.status === "Resolved").length,
  }

  return (
    <DashboardLayout userRole="client">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/client">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Communications</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Support Requests</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-slate-800 mb-2">Support Requests</h1>
              <p className="text-slate-600 font-light">Submit and track support requests</p>
            </div>
            <Button onClick={() => setShowNewRequest(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Support Request
            </Button>
          </div>
        </div>

        {/* Support Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Requests</p>
                  <p className="text-2xl font-semibold">{requestStats.total}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Open</p>
                  <p className="text-2xl font-semibold text-blue-600">{requestStats.open}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">In Progress</p>
                  <p className="text-2xl font-semibold text-yellow-600">{requestStats.inProgress}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Resolved</p>
                  <p className="text-2xl font-semibold text-green-600">{requestStats.resolved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="new">New Request</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search support requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Support Requests Table */}
            <Card>
              <CardHeader>
                <CardTitle>Your Support Requests</CardTitle>
                <CardDescription>Track the status of your submitted support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.subject}</p>
                            <p className="text-sm text-slate-500 truncate max-w-[200px]">{request.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.category}</TableCell>
                        <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-slate-400" />
                            {request.assignedTo}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            {new Date(request.lastUpdate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredRequests.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No support requests found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit New Support Request</CardTitle>
                <CardDescription>Describe your issue and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={newRequest.subject}
                      onChange={(e) => setNewRequest({ ...newRequest, subject: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={newRequest.category}
                      onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technical">Technical Issue</SelectItem>
                        <SelectItem value="Account">Account Related</SelectItem>
                        <SelectItem value="Document">Document Upload</SelectItem>
                        <SelectItem value="Verification">Verification Process</SelectItem>
                        <SelectItem value="General">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newRequest.priority}
                    onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue..."
                    rows={6}
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmitRequest}
                    disabled={!newRequest.subject || !newRequest.category || !newRequest.description}
                  >
                    Submit Request
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setNewRequest({ subject: "", category: "", priority: "Medium", description: "" })}
                  >
                    Clear Form
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
