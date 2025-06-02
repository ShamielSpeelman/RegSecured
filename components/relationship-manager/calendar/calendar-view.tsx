"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MapPin, Video } from "lucide-react"

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const appointments = [
    {
      id: "1",
      title: "KYC Meeting - Sarah Johnson",
      client: "Sarah Johnson",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      time: "09:00 AM",
      duration: "1 hour",
      type: "KYC Review",
      location: "Conference Room A",
      isVirtual: false,
      status: "confirmed",
    },
    {
      id: "2",
      title: "Onboarding Kickoff - TechCorp Ltd",
      client: "TechCorp Ltd",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      time: "11:30 AM",
      duration: "45 minutes",
      type: "Onboarding",
      location: "Virtual Meeting",
      isVirtual: true,
      status: "confirmed",
    },
    {
      id: "3",
      title: "Document Review - Michael Chen",
      client: "Michael Chen",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      time: "02:00 PM",
      duration: "30 minutes",
      type: "Document Review",
      location: "Office",
      isVirtual: false,
      status: "pending",
    },
    {
      id: "4",
      title: "Compliance Check - Global Investments",
      client: "Global Investments",
      clientAvatar: "/placeholder.svg?height=32&width=32",
      time: "04:00 PM",
      duration: "1 hour",
      type: "Compliance",
      location: "Virtual Meeting",
      isVirtual: true,
      status: "confirmed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "KYC Review":
        return "bg-blue-100 text-blue-800"
      case "Onboarding":
        return "bg-purple-100 text-purple-800"
      case "Document Review":
        return "bg-yellow-100 text-yellow-800"
      case "Compliance":
        return "bg-red-100 text-red-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  // Generate days for month view
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Create calendar days array
  const calendarDays = []

  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  return (
    <div className="space-y-6">
      <Card className="border-stone-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-stone-900">Calendar</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
                  Month
                </Button>
                <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
                  Week
                </Button>
                <Button variant={view === "day" ? "default" : "outline"} size="sm" onClick={() => setView("day")}>
                  Day
                </Button>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  Today
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === "month" && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-stone-900">
                  {currentDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </h3>
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-stone-600">
                    {day}
                  </div>
                ))}

                {calendarDays.map((day, i) => (
                  <div key={i} className="aspect-square p-1">
                    {day !== null ? (
                      <div
                        className={`h-full w-full rounded border border-stone-200 p-1 text-xs ${day === currentDate.getDate() ? "bg-stone-100" : ""}`}
                      >
                        <div className="font-medium">{day}</div>
                        {day === 15 && (
                          <div className="mt-1 space-y-1">
                            <div className="bg-blue-100 text-blue-800 rounded px-1 text-xs truncate">KYC</div>
                            <div className="bg-purple-100 text-purple-800 rounded px-1 text-xs truncate">Onboard</div>
                          </div>
                        )}
                        {day === 16 && (
                          <div className="mt-1">
                            <div className="bg-yellow-100 text-yellow-800 rounded px-1 text-xs truncate">Review</div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-full w-full rounded border border-stone-100 p-1 text-xs bg-stone-50"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "week" && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-stone-900">
                  Week of{" "}
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
              </div>

              {/* Week View */}
              <div className="grid grid-cols-8 gap-1">
                <div className="p-2"></div>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-stone-600 border-b">
                    <div>{day}</div>
                    <div className="text-lg font-semibold">{15 + index}</div>
                  </div>
                ))}

                {/* Time slots */}
                {Array.from({ length: 12 }, (_, hour) => (
                  <div key={hour} className="contents">
                    <div className="p-2 text-xs text-stone-500 border-r">{hour + 8}:00</div>
                    {Array.from({ length: 7 }, (_, day) => (
                      <div key={day} className="p-1 border border-stone-100 min-h-[60px]">
                        {hour === 1 && day === 1 && (
                          <div className="bg-blue-100 text-blue-800 rounded p-1 text-xs">KYC Meeting</div>
                        )}
                        {hour === 3 && day === 2 && (
                          <div className="bg-purple-100 text-purple-800 rounded p-1 text-xs">Onboarding</div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "day" && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-stone-900">
                  {currentDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
              </div>

              {/* Day View - Time slots with appointments */}
              <div className="space-y-1">
                {Array.from({ length: 12 }, (_, hour) => {
                  const timeHour = hour + 8
                  const timeString = `${timeHour}:00 ${timeHour >= 12 ? "PM" : "AM"}`
                  const displayHour = timeHour > 12 ? timeHour - 12 : timeHour
                  const formattedTime = `${displayHour}:00 ${timeHour >= 12 ? "PM" : "AM"}`

                  // Find appointments for this hour
                  const hourAppointments = appointments.filter((app) => {
                    const appHour = Number.parseInt(app.time.split(":")[0])
                    const isPM = app.time.includes("PM")
                    const appHour24 = isPM && appHour !== 12 ? appHour + 12 : appHour
                    return appHour24 === timeHour
                  })

                  return (
                    <div key={hour} className="grid grid-cols-[80px_1fr] border-b border-stone-100">
                      <div className="p-2 text-xs text-stone-500">{formattedTime}</div>
                      <div className="p-1 min-h-[60px]">
                        {hourAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex items-center space-x-2 p-2 rounded bg-stone-50 border border-stone-200"
                          >
                            <Badge className={getTypeColor(appointment.type)}>{appointment.type}</Badge>
                            <span className="text-sm font-medium">{appointment.title}</span>
                            <span className="text-xs text-stone-500">({appointment.duration})</span>
                            {appointment.isVirtual ? (
                              <Video className="h-3 w-3 text-stone-400" />
                            ) : (
                              <MapPin className="h-3 w-3 text-stone-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
