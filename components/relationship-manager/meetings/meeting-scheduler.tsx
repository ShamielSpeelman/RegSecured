"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Users } from "lucide-react"

export function MeetingScheduler() {
  const [meetingType, setMeetingType] = useState("")
  const [includePrep, setIncludePrep] = useState(false)

  const meetingTemplates = {
    "onboarding-kickoff": {
      duration: "60",
      agenda:
        "1. Welcome and introductions\n2. Overview of onboarding process\n3. Required documentation review\n4. Timeline and next steps\n5. Q&A session",
      participants: ["client", "relationship-manager", "compliance-officer"],
    },
    "kyc-review": {
      duration: "45",
      agenda:
        "1. Review submitted KYC documents\n2. Verify client information\n3. Address any discrepancies\n4. Additional documentation requirements\n5. Next steps",
      participants: ["client", "relationship-manager", "kyc-analyst"],
    },
    "document-review": {
      duration: "30",
      agenda:
        "1. Document completeness check\n2. Quality review\n3. Compliance verification\n4. Required corrections\n5. Approval process",
      participants: ["client", "relationship-manager"],
    },
    "compliance-check": {
      duration: "45",
      agenda:
        "1. Compliance status review\n2. Regulatory requirements\n3. Risk assessment\n4. Remediation actions\n5. Timeline for completion",
      participants: ["client", "relationship-manager", "compliance-officer"],
    },
  }

  return (
    <Card className="border-stone-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stone-900">Schedule Meeting</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="techcorp-ltd">TechCorp Ltd</SelectItem>
                  <SelectItem value="michael-chen">Michael Chen</SelectItem>
                  <SelectItem value="global-investments">Global Investments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting-type">Meeting Type</Label>
              <Select value={meetingType} onValueChange={setMeetingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onboarding-kickoff">Onboarding Kickoff</SelectItem>
                  <SelectItem value="kyc-review">KYC Review</SelectItem>
                  <SelectItem value="document-review">Document Review</SelectItem>
                  <SelectItem value="compliance-check">Compliance Check</SelectItem>
                  <SelectItem value="follow-up">Follow-up Meeting</SelectItem>
                  <SelectItem value="custom">Custom Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input
              id="title"
              placeholder="Enter meeting title"
              defaultValue={
                meetingType && meetingTemplates[meetingType as keyof typeof meetingTemplates]
                  ? `${meetingType
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")} Meeting`
                  : ""
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input type="time" id="time" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                type="number"
                id="duration"
                placeholder="60"
                defaultValue={
                  meetingType && meetingTemplates[meetingType as keyof typeof meetingTemplates]
                    ? meetingTemplates[meetingType as keyof typeof meetingTemplates].duration
                    : ""
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Meeting Location</Label>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="virtual">Virtual Meeting</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="client-site">Client Site</SelectItem>
                  <SelectItem value="external">External Location</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Meeting room or link" className="flex-1" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Additional Participants</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Add team members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                <SelectItem value="kyc-analyst">KYC Analyst</SelectItem>
                <SelectItem value="senior-manager">Senior Manager</SelectItem>
                <SelectItem value="legal-counsel">Legal Counsel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agenda">Meeting Agenda</Label>
            <Textarea
              id="agenda"
              placeholder="Meeting agenda and discussion points..."
              rows={4}
              defaultValue={
                meetingType && meetingTemplates[meetingType as keyof typeof meetingTemplates]
                  ? meetingTemplates[meetingType as keyof typeof meetingTemplates].agenda
                  : ""
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preparation">Preparation Notes</Label>
            <Textarea id="preparation" placeholder="Pre-meeting preparation, documents to review, etc..." rows={2} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="prep-reminder"
              checked={includePrep}
              onCheckedChange={(checked) => setIncludePrep(checked as boolean)}
            />
            <Label htmlFor="prep-reminder" className="text-sm">
              Send preparation reminder 24 hours before meeting
            </Label>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Send Invites
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
