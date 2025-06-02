"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Link } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export function TaskCreationForm() {
  const [dueDate, setDueDate] = useState<Date>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Client Information Update Task</CardTitle>
        <CardDescription>
          Create a new task to request or update client information for compliance purposes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select>
              <SelectTrigger id="client">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acme">Acme Financial Services</SelectItem>
                <SelectItem value="global">Global Trade Partners</SelectItem>
                <SelectItem value="horizon">Horizon Investments</SelectItem>
                <SelectItem value="quantum">Quantum Securities</SelectItem>
                <SelectItem value="evergreen">Evergreen Capital</SelectItem>
                <SelectItem value="meridian">Meridian Partners</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-type">Task Type</Label>
            <Select>
              <SelectTrigger id="task-type">
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beneficial-ownership">Beneficial Ownership Update</SelectItem>
                <SelectItem value="risk-profile">Risk Profile Update</SelectItem>
                <SelectItem value="contact-info">Contact Information Update</SelectItem>
                <SelectItem value="pep-status">PEP Status Update</SelectItem>
                <SelectItem value="business-activity">Business Activity Update</SelectItem>
                <SelectItem value="source-of-funds">Source of Funds Update</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assigned-to">Assigned To</Label>
            <Select>
              <SelectTrigger id="assigned-to">
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="me">Me (Current User)</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="michael">Michael Chen</SelectItem>
                <SelectItem value="david">David Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="communication-template">Communication Template</Label>
            <Select>
              <SelectTrigger id="communication-template">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beneficial-ownership">Beneficial Ownership Update</SelectItem>
                <SelectItem value="risk-rating">Risk Rating Change</SelectItem>
                <SelectItem value="status-update">Status Update</SelectItem>
                <SelectItem value="pep-notification">Notification of PEP</SelectItem>
                <SelectItem value="source-of-funds">Source of Funds Clarification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Task Description</Label>
          <Textarea
            id="description"
            placeholder="Enter detailed description of the information needed from the client..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="related-documents">Related Documents (Optional)</Label>
          <div className="flex items-center gap-2">
            <Input id="related-documents" placeholder="Link to related documents or requirements" />
            <Button variant="outline" size="icon">
              <Link className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Task</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
