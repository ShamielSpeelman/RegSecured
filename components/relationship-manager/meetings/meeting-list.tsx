"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Video, MapPin, FileText, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MeetingList() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const meetings = [
    {
      id: "1",
      title: "Onboarding Kickoff - TechCorp Ltd",
      client: "TechCorp Ltd",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      date: "Dec 15, 2024",
      time: "10:00 AM",
      duration: "1 hour",
      type: "Onboarding",
      location: "Virtual Meeting",
      isVirtual: true,
      status: "scheduled",
      participants: 3,
      hasNotes: false,
    },
    {
      id: "2",
      title: "KYC Review - Sarah Johnson",
      client: "Sarah Johnson",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      duration: "45 minutes",
      type: "KYC Review",
      location: "Conference Room A",
      isVirtual: false,
      status: "completed",
      participants: 2,
      hasNotes: true,
    },
    {
      id: "3",
      title: "Document Review - Michael Chen",
      client: "Michael Chen",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      date: "Dec 16, 2024",
      time: "11:30 AM",
      duration: "30 minutes",
      type: "Document Review",
      location: "Virtual Meeting",
      isVirtual: true,
      status: "scheduled",
      participants: 2,
      hasNotes: false,
    },
    {
      id: "4",
      title: "Compliance Check - Global Investments",
      client: "Global Investments",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      date: "Dec 16, 2024",
      time: "3:00 PM",
      duration: "1 hour",
      type: "Compliance",
      location: "Conference Room B",
      isVirtual: false,
      status: "in-progress",
      participants: 4,
      hasNotes: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-orange-100 text-orange-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Onboarding":
        return "bg-purple-100 text-purple-800"
      case "KYC Review":
        return "bg-blue-100 text-blue-800"
      case "Document Review":
        return "bg-yellow-100 text-yellow-800"
      case "Compliance":
        return "bg-red-100 text-red-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  return (
    <Card className="border-stone-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-stone-900">Meetings</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search meetings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Meetings</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="flex items-center space-x-4 p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={meeting.clientAvatar || "/placeholder.svg"} alt={meeting.client} />
                  <AvatarFallback>
                    {meeting.client
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-stone-900 truncate">{meeting.title}</h4>
                  <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                  <Badge className={getTypeColor(meeting.type)}>{meeting.type}</Badge>
                </div>

                <div className="flex items-center space-x-4 text-sm text-stone-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {meeting.time} ({meeting.duration})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {meeting.isVirtual ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                    <span>{meeting.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{meeting.participants} participants</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center space-x-2">
                {meeting.hasNotes && (
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3 mr-1" />
                    Notes
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Meeting</DropdownMenuItem>
                    <DropdownMenuItem>Add Notes</DropdownMenuItem>
                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Cancel Meeting</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
