"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users } from "lucide-react"

export function AppointmentScheduler() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="border-stone-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stone-900">Schedule Appointment</CardTitle>
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
              <Label htmlFor="type">Meeting Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onboarding">Onboarding Kickoff</SelectItem>
                  <SelectItem value="kyc">KYC Review</SelectItem>
                  <SelectItem value="document-review">Document Review</SelectItem>
                  <SelectItem value="compliance">Compliance Check</SelectItem>
                  <SelectItem value="follow-up">Follow-up Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              <Label htmlFor="duration">Duration</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="virtual">Virtual Meeting</SelectItem>
                  <SelectItem value="client-site">Client Site</SelectItem>
                  <SelectItem value="external">External Location</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Specific location or meeting link" className="flex-1" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agenda">Agenda/Notes</Label>
            <Textarea
              id="agenda"
              placeholder="Meeting agenda, preparation notes, or special requirements..."
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
