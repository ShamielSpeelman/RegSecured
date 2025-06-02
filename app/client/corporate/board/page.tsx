"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Edit, Trash2, FileText, Users, Clock, AlertCircle } from "lucide-react"

interface BoardMember {
  id: string
  name: string
  position: string
  appointmentDate: string
  termExpiry: string
  status: "active" | "resigned" | "pending"
  email: string
  phone: string
  nationality: string
  experience: string
}

interface BoardMeeting {
  id: string
  date: string
  type: "regular" | "extraordinary"
  status: "scheduled" | "completed" | "cancelled"
  agenda: string
  attendees: number
  resolutions: number
}

const mockBoardMembers: BoardMember[] = [
  {
    id: "1",
    name: "John Smith",
    position: "Chairman",
    appointmentDate: "2022-01-15",
    termExpiry: "2025-01-15",
    status: "active",
    email: "john.smith@company.com",
    phone: "+1-555-0123",
    nationality: "US",
    experience: "15 years in financial services",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Independent Director",
    appointmentDate: "2022-03-01",
    termExpiry: "2025-03-01",
    status: "active",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0124",
    nationality: "UK",
    experience: "12 years in compliance and risk management",
  },
  {
    id: "3",
    name: "Michael Chen",
    position: "Executive Director",
    appointmentDate: "2021-06-01",
    termExpiry: "2024-06-01",
    status: "active",
    email: "michael.chen@company.com",
    phone: "+1-555-0125",
    nationality: "SG",
    experience: "20 years in corporate governance",
  },
]

const mockMeetings: BoardMeeting[] = [
  {
    id: "1",
    date: "2024-02-15",
    type: "regular",
    status: "scheduled",
    agenda: "Q4 2023 Financial Review, Risk Assessment Update",
    attendees: 5,
    resolutions: 3,
  },
  {
    id: "2",
    date: "2024-01-18",
    type: "regular",
    status: "completed",
    agenda: "Annual Budget Approval, Compliance Report",
    attendees: 6,
    resolutions: 4,
  },
  {
    id: "3",
    date: "2023-12-20",
    type: "extraordinary",
    status: "completed",
    agenda: "Emergency Risk Response, Regulatory Update",
    attendees: 5,
    resolutions: 2,
  },
]

export default function BoardManagementPage() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(mockBoardMembers)
  const [meetings, setMeetings] = useState<BoardMeeting[]>(mockMeetings)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null)

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      resigned: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  const getMeetingStatusBadge = (status: string) => {
    const variants = {
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  return (
    <DashboardLayout userRole="client">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">Board Management</h1>
            <p className="text-stone-600 mt-1">Manage board members, meetings, and governance activities</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Board Members</CardTitle>
              <Users className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{boardMembers.filter((m) => m.status === "active").length}</div>
              <p className="text-xs text-stone-600">
                {boardMembers.filter((m) => m.status === "pending").length} pending appointments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{meetings.filter((m) => m.status === "scheduled").length}</div>
              <p className="text-xs text-stone-600">Next meeting: Feb 15, 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Term Expiries</CardTitle>
              <Clock className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-stone-600">Expiring in next 12 months</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
              <AlertCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Good</div>
              <p className="text-xs text-stone-600">All requirements met</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList>
            <TabsTrigger value="members">Board Members</TabsTrigger>
            <TabsTrigger value="meetings">Board Meetings</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Board Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Board Members</CardTitle>
                    <CardDescription>Manage board member appointments and information</CardDescription>
                  </div>
                  <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Board Member</DialogTitle>
                        <DialogDescription>Enter the details for the new board member</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="chairman">Chairman</SelectItem>
                              <SelectItem value="executive">Executive Director</SelectItem>
                              <SelectItem value="independent">Independent Director</SelectItem>
                              <SelectItem value="non-executive">Non-Executive Director</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter email address" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" placeholder="Enter phone number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality">Nationality</Label>
                          <Input id="nationality" placeholder="Enter nationality" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="appointment">Appointment Date</Label>
                          <Input id="appointment" type="date" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="experience">Experience</Label>
                          <Textarea id="experience" placeholder="Enter relevant experience and qualifications" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddMemberOpen(false)}>Add Member</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Appointment Date</TableHead>
                      <TableHead>Term Expiry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {boardMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.position}</TableCell>
                        <TableCell>{new Date(member.appointmentDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(member.termExpiry).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(member.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
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

          {/* Board Meetings Tab */}
          <TabsContent value="meetings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Board Meetings</CardTitle>
                    <CardDescription>Schedule and manage board meetings</CardDescription>
                  </div>
                  <Dialog open={isAddMeetingOpen} onOpenChange={setIsAddMeetingOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Schedule Board Meeting</DialogTitle>
                        <DialogDescription>Create a new board meeting</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="meeting-date">Meeting Date</Label>
                          <Input id="meeting-date" type="datetime-local" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="meeting-type">Meeting Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select meeting type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="regular">Regular Meeting</SelectItem>
                              <SelectItem value="extraordinary">Extraordinary Meeting</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="agenda">Agenda</Label>
                          <Textarea id="agenda" placeholder="Enter meeting agenda" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddMeetingOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddMeetingOpen(false)}>Schedule Meeting</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Agenda</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meetings.map((meeting) => (
                      <TableRow key={meeting.id}>
                        <TableCell>{new Date(meeting.date).toLocaleDateString()}</TableCell>
                        <TableCell className="capitalize">{meeting.type}</TableCell>
                        <TableCell>{getMeetingStatusBadge(meeting.status)}</TableCell>
                        <TableCell className="max-w-xs truncate">{meeting.agenda}</TableCell>
                        <TableCell>{meeting.attendees}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
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

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Board Documents</CardTitle>
                <CardDescription>Manage board resolutions, minutes, and other governance documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium">Board Resolutions</h3>
                        <p className="text-sm text-stone-600">12 documents</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div>
                        <h3 className="font-medium">Meeting Minutes</h3>
                        <p className="text-sm text-stone-600">8 documents</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-purple-600" />
                      <div>
                        <h3 className="font-medium">Governance Policies</h3>
                        <p className="text-sm text-stone-600">5 documents</p>
                      </div>
                    </div>
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
