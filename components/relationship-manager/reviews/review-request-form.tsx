"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Search, User, AlertTriangle, FileText, Send } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const reviewTypes = [
  { id: "annual", name: "Annual Review", description: "Comprehensive annual client review", priority: "Medium" },
  { id: "periodic", name: "Periodic Review", description: "Regular periodic assessment", priority: "Low" },
  { id: "risk-based", name: "Risk-Based Review", description: "Risk-triggered review", priority: "High" },
  { id: "regulatory", name: "Regulatory Review", description: "Regulatory compliance review", priority: "High" },
  { id: "ad-hoc", name: "Ad-Hoc Review", description: "Special circumstances review", priority: "Medium" },
]

const reviewers = [
  { id: "1", name: "Sarah Johnson", role: "Senior Compliance Officer", department: "Compliance" },
  { id: "2", name: "Michael Chen", role: "Risk Analyst", department: "Risk Management" },
  { id: "3", name: "Emma Davis", role: "AML Specialist", department: "AML" },
  { id: "4", name: "David Wilson", role: "Compliance Manager", department: "Compliance" },
]

const clients = [
  { id: "CLI001", name: "Acme Corporation", type: "Corporate", riskRating: "Medium" },
  { id: "CLI002", name: "Global Tech Solutions", type: "Corporate", riskRating: "High" },
  { id: "CLI003", name: "John Smith", type: "Individual", riskRating: "Low" },
  { id: "CLI004", name: "Investment Partners LLC", type: "Corporate", riskRating: "High" },
]

export default function ReviewRequestForm() {
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedReviewType, setSelectedReviewType] = useState("")
  const [selectedReviewer, setSelectedReviewer] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [priority, setPriority] = useState("")
  const [clientSearch, setClientSearch] = useState("")
  const [reviewerSearch, setReviewerSearch] = useState("")
  const [notifyClient, setNotifyClient] = useState(false)
  const [autoReminders, setAutoReminders] = useState(true)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      client.id.toLowerCase().includes(clientSearch.toLowerCase()),
  )

  const filteredReviewers = reviewers.filter(
    (reviewer) =>
      reviewer.name.toLowerCase().includes(reviewerSearch.toLowerCase()) ||
      reviewer.role.toLowerCase().includes(reviewerSearch.toLowerCase()),
  )

  const selectedReviewTypeData = reviewTypes.find((type) => type.id === selectedReviewType)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Review request submitted")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create Review Request
          </CardTitle>
          <CardDescription>Submit a new review request for client compliance assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Review Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Review Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {reviewTypes.map((type) => (
                  <div
                    key={type.id}
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-300",
                      selectedReviewType === type.id ? "border-blue-500 bg-blue-50" : "border-gray-200",
                    )}
                    onClick={() => setSelectedReviewType(type.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{type.name}</h4>
                      <Badge
                        variant={
                          type.priority === "High"
                            ? "destructive"
                            : type.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {type.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Selection */}
            <div className="space-y-3">
              <Label htmlFor="client-search">Select Client</Label>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="client-search"
                    placeholder="Search clients by name or ID..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {clientSearch && (
                  <div className="border rounded-lg max-h-48 overflow-y-auto">
                    {filteredClients.map((client) => (
                      <div
                        key={client.id}
                        className={cn(
                          "p-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0",
                          selectedClient === client.id ? "bg-blue-50 border-blue-200" : "",
                        )}
                        onClick={() => {
                          setSelectedClient(client.id)
                          setClientSearch(client.name)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-gray-600">
                              {client.id} • {client.type}
                            </p>
                          </div>
                          <Badge
                            variant={
                              client.riskRating === "High"
                                ? "destructive"
                                : client.riskRating === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {client.riskRating} Risk
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reviewer Assignment */}
              <div className="space-y-3">
                <Label htmlFor="reviewer-search">Assign Reviewer</Label>
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="reviewer-search"
                      placeholder="Search reviewers..."
                      value={reviewerSearch}
                      onChange={(e) => setReviewerSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {reviewerSearch && (
                    <div className="border rounded-lg max-h-32 overflow-y-auto">
                      {filteredReviewers.map((reviewer) => (
                        <div
                          key={reviewer.id}
                          className={cn(
                            "p-2 cursor-pointer hover:bg-gray-50 border-b last:border-b-0",
                            selectedReviewer === reviewer.id ? "bg-blue-50" : "",
                          )}
                          onClick={() => {
                            setSelectedReviewer(reviewer.id)
                            setReviewerSearch(reviewer.name)
                          }}
                        >
                          <p className="font-medium text-sm">{reviewer.name}</p>
                          <p className="text-xs text-gray-600">
                            {reviewer.role} • {reviewer.department}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Priority & Due Date */}
              <div className="space-y-3">
                <Label>Priority & Due Date</Label>
                <div className="space-y-3">
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dueDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Select due date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-3">
              <Label htmlFor="notes">Review Notes & Instructions</Label>
              <Textarea
                id="notes"
                placeholder="Provide specific instructions, areas of focus, or additional context for this review..."
                rows={4}
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <Label>Review Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-client" checked={notifyClient} onCheckedChange={setNotifyClient} />
                  <Label htmlFor="notify-client" className="text-sm">
                    Notify client about review initiation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-reminders" checked={autoReminders} onCheckedChange={setAutoReminders} />
                  <Label htmlFor="auto-reminders" className="text-sm">
                    Enable automatic reminders for reviewer
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-600">
                {selectedReviewTypeData && (
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {selectedReviewTypeData.name} - {selectedReviewTypeData.priority} Priority
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Review Request
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
