import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Edit, Trash2, Play, Pause } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ScheduledCommunications() {
  const scheduledComms = [
    {
      id: 1,
      client: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Follow-up Email",
      subject: "KYC Process Update",
      scheduledDate: "2024-02-01",
      scheduledTime: "09:00",
      status: "active",
      frequency: "one-time",
    },
    {
      id: 2,
      client: "TechCorp Industries",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Reminder",
      subject: "Document Submission Reminder",
      scheduledDate: "2024-02-02",
      scheduledTime: "14:30",
      status: "active",
      frequency: "weekly",
    },
    {
      id: 3,
      client: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Status Update",
      subject: "Application Progress Report",
      scheduledDate: "2024-02-03",
      scheduledTime: "11:15",
      status: "paused",
      frequency: "bi-weekly",
    },
    {
      id: 4,
      client: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Welcome Message",
      subject: "Welcome to Our Platform",
      scheduledDate: "2024-02-01",
      scheduledTime: "10:00",
      status: "completed",
      frequency: "one-time",
    },
    {
      id: 5,
      client: "Global Finance Ltd",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Meeting Reminder",
      subject: "Upcoming Review Meeting",
      scheduledDate: "2024-02-05",
      scheduledTime: "15:00",
      status: "active",
      frequency: "one-time",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "one-time":
        return "bg-gray-100 text-gray-800"
      case "weekly":
        return "bg-blue-100 text-blue-800"
      case "bi-weekly":
        return "bg-purple-100 text-purple-800"
      case "monthly":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New
          </Button>
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Bulk Schedule
          </Button>
        </div>
        <div className="text-sm text-slate-600">
          {scheduledComms.filter((c) => c.status === "active").length} active schedules
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduledComms.map((comm) => (
              <TableRow key={comm.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comm.avatar || "/placeholder.svg"} alt={comm.client} />
                      <AvatarFallback>
                        {comm.client
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{comm.client}</div>
                  </div>
                </TableCell>
                <TableCell>{comm.type}</TableCell>
                <TableCell className="max-w-xs truncate">{comm.subject}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{comm.scheduledDate}</div>
                    <div className="text-slate-500">{comm.scheduledTime}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getFrequencyColor(comm.frequency)}>{comm.frequency}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(comm.status)}>{comm.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {comm.status === "active" ? (
                      <Button variant="ghost" size="sm">
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : comm.status === "paused" ? (
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    ) : null}
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
