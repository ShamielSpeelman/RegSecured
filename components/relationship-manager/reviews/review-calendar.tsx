"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
} from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"

const reviewEvents = [
  {
    id: "REV001",
    title: "Annual Review - Acme Corp",
    client: "Acme Corporation",
    type: "Annual Review",
    status: "Scheduled",
    reviewer: "Sarah Johnson",
    date: new Date(2024, 1, 15),
    time: "10:00 AM",
    priority: "Medium",
    duration: "2 hours",
  },
  {
    id: "REV002",
    title: "Risk Assessment - Global Tech",
    client: "Global Tech Solutions",
    type: "Risk-Based Review",
    status: "In Progress",
    reviewer: "Michael Chen",
    date: new Date(2024, 1, 18),
    time: "2:00 PM",
    priority: "High",
    duration: "1.5 hours",
  },
  {
    id: "REV003",
    title: "Regulatory Review - Investment Partners",
    client: "Investment Partners LLC",
    type: "Regulatory Review",
    status: "Overdue",
    reviewer: "Emma Davis",
    date: new Date(2024, 1, 12),
    time: "9:00 AM",
    priority: "Critical",
    duration: "3 hours",
  },
  {
    id: "REV004",
    title: "Periodic Review - John Smith",
    client: "John Smith",
    type: "Periodic Review",
    status: "Completed",
    reviewer: "David Wilson",
    date: new Date(2024, 1, 20),
    time: "11:00 AM",
    priority: "Low",
    duration: "1 hour",
  },
]

const reviewTypes = [
  "All Types",
  "Annual Review",
  "Periodic Review",
  "Risk-Based Review",
  "Regulatory Review",
  "Ad-Hoc Review",
]
const reviewStatuses = ["All Statuses", "Scheduled", "In Progress", "Completed", "Overdue", "Cancelled"]
const reviewers = ["All Reviewers", "Sarah Johnson", "Michael Chen", "Emma Davis", "David Wilson"]

export function ReviewCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [filterType, setFilterType] = useState("All Types")
  const [filterStatus, setFilterStatus] = useState("All Statuses")
  const [filterReviewer, setFilterReviewer] = useState("All Reviewers")

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getEventsForDate = (date: Date) => {
    return reviewEvents.filter((event) => {
      const matchesDate = isSameDay(event.date, date)
      const matchesType = filterType === "All Types" || event.type === filterType
      const matchesStatus = filterStatus === "All Statuses" || event.status === filterStatus
      const matchesReviewer = filterReviewer === "All Reviewers" || event.reviewer === filterReviewer

      return matchesDate && matchesType && matchesStatus && matchesReviewer
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "default"
      case "In Progress":
        return "default"
      case "Completed":
        return "secondary"
      case "Overdue":
        return "destructive"
      case "Cancelled":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <Clock className="h-3 w-3" />
      case "In Progress":
        return <Clock className="h-3 w-3" />
      case "Completed":
        return <CheckCircle className="h-3 w-3" />
      case "Overdue":
        return <AlertTriangle className="h-3 w-3" />
      case "Cancelled":
        return <XCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "border-l-red-500"
      case "High":
        return "border-l-orange-500"
      case "Medium":
        return "border-l-yellow-500"
      case "Low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(direction === "prev" ? subMonths(currentDate, 1) : addMonths(currentDate, 1))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Review Calendar</h2>
          <p className="text-gray-600">Schedule and manage client reviews</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Schedule Review
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex gap-2">
              <Select value={viewMode} onValueChange={(value: "month" | "week" | "day") => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 flex-1">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Review Type" />
                </SelectTrigger>
                <SelectContent>
                  {reviewTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {reviewStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterReviewer} onValueChange={setFilterReviewer}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Reviewer" />
                </SelectTrigger>
                <SelectContent>
                  {reviewers.map((reviewer) => (
                    <SelectItem key={reviewer} value={reviewer}>
                      {reviewer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {format(currentDate, "MMMM yyyy")}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((day) => {
              const dayEvents = getEventsForDate(day)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isToday = isSameDay(day, new Date())

              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-24 p-1 border rounded cursor-pointer hover:bg-gray-50 ${
                    isSelected ? "bg-blue-50 border-blue-200" : "border-gray-200"
                  } ${isToday ? "bg-blue-100" : ""}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      !isSameMonth(day, currentDate) ? "text-gray-400" : "text-gray-900"
                    }`}
                  >
                    {format(day, "d")}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded border-l-2 bg-white ${getPriorityColor(event.priority)}`}
                      >
                        <div className="flex items-center gap-1">
                          {getStatusIcon(event.status)}
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 pl-1">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>Reviews for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
            <CardDescription>{getEventsForDate(selectedDate).length} review(s) scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getEventsForDate(selectedDate).map((event) => (
                <div key={event.id} className={`p-4 border rounded-lg border-l-4 ${getPriorityColor(event.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant={getStatusColor(event.status)} className="flex items-center gap-1">
                          {getStatusIcon(event.status)}
                          {event.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Client: {event.client}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {event.time} ({event.duration})
                        </p>
                        <p className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Reviewer: {event.reviewer}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {getEventsForDate(selectedDate).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No reviews scheduled for this date</p>
                  <Button className="mt-4" size="sm">
                    Schedule Review
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
