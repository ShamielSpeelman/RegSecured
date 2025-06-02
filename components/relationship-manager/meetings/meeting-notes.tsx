"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Calendar, Clock, Users, Plus, Save } from "lucide-react"

export function MeetingNotes() {
  const [isAddingNote, setIsAddingNote] = useState(false)

  const recentMeetings = [
    {
      id: "1",
      title: "KYC Review - Sarah Johnson",
      client: "Sarah Johnson",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      date: "Dec 14, 2024",
      time: "2:00 PM",
      duration: "45 minutes",
      status: "completed",
      hasNotes: true,
      notes:
        "Client provided all required KYC documents. Identity verification completed successfully. Risk assessment shows low risk profile. Approved for account opening.",
      actionItems: [
        "Send welcome package to client",
        "Set up initial account access",
        "Schedule follow-up call in 1 week",
      ],
      attendees: ["Sarah Johnson", "John Smith (RM)", "Alice Brown (Compliance)"],
    },
    {
      id: "2",
      title: "Onboarding Kickoff - TechCorp Ltd",
      client: "TechCorp Ltd",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      date: "Dec 13, 2024",
      time: "10:00 AM",
      duration: "1 hour",
      status: "completed",
      hasNotes: true,
      notes:
        "Initial onboarding meeting completed. Client requirements discussed. Corporate structure documentation needed. Compliance requirements explained.",
      actionItems: [
        "Request corporate structure documents",
        "Send compliance checklist",
        "Schedule KYC review meeting",
      ],
      attendees: ["Mike Johnson (TechCorp)", "John Smith (RM)", "David Wilson (Legal)"],
    },
  ]

  return (
    <Card className="border-stone-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-stone-900">Meeting Notes</CardTitle>
          <Button onClick={() => setIsAddingNote(!isAddingNote)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Notes
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAddingNote && (
          <div className="mb-6 p-4 border border-stone-200 rounded-lg bg-stone-50">
            <h4 className="text-sm font-medium text-stone-900 mb-3">Add Meeting Notes</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="meeting-select" className="text-xs">
                    Meeting
                  </Label>
                  <Input placeholder="Select or search meeting..." />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="note-date" className="text-xs">
                    Date
                  </Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="meeting-notes" className="text-xs">
                  Meeting Notes
                </Label>
                <Textarea placeholder="Enter meeting notes, key discussion points, decisions made..." rows={3} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="action-items" className="text-xs">
                  Action Items
                </Label>
                <Textarea placeholder="List action items and follow-up tasks..." rows={2} />
              </div>
              <div className="flex space-x-2">
                <Button size="sm">
                  <Save className="h-3 w-3 mr-1" />
                  Save Notes
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsAddingNote(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {recentMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
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
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-medium text-stone-900">{meeting.title}</h4>
                    <Badge className="bg-green-100 text-green-800">{meeting.status}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-stone-600 mb-3">
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
                      <Users className="h-3 w-3" />
                      <span>{meeting.attendees.length} attendees</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="text-xs font-medium text-stone-700 mb-1">Meeting Notes:</h5>
                      <p className="text-xs text-stone-600 leading-relaxed">{meeting.notes}</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-stone-700 mb-1">Action Items:</h5>
                      <ul className="text-xs text-stone-600 space-y-1">
                        {meeting.actionItems.map((item, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span className="text-stone-400">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-stone-700 mb-1">Attendees:</h5>
                      <p className="text-xs text-stone-600">{meeting.attendees.join(", ")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
