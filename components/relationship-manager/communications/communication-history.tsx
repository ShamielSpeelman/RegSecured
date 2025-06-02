import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Mail, Phone, Calendar, Search, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CommunicationHistory() {
  const communications = [
    {
      id: 1,
      client: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "email",
      subject: "KYC Documentation Update",
      direction: "outbound",
      status: "delivered",
      timestamp: "2024-01-30 14:30",
      response: true,
    },
    {
      id: 2,
      client: "TechCorp Industries",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "message",
      subject: "Compliance Review Completed",
      direction: "inbound",
      status: "read",
      timestamp: "2024-01-30 11:15",
      response: false,
    },
    {
      id: 3,
      client: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "call",
      subject: "Risk Assessment Discussion",
      direction: "outbound",
      status: "completed",
      timestamp: "2024-01-29 16:45",
      response: true,
    },
    {
      id: 4,
      client: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "meeting",
      subject: "Onboarding Kickoff Meeting",
      direction: "scheduled",
      status: "confirmed",
      timestamp: "2024-01-29 10:00",
      response: true,
    },
    {
      id: 5,
      client: "Global Finance Ltd",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "email",
      subject: "Final Approval Notification",
      direction: "outbound",
      status: "delivered",
      timestamp: "2024-01-28 09:30",
      response: true,
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      case "meeting":
        return <Calendar className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
      case "completed":
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "read":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case "inbound":
        return "bg-blue-100 text-blue-800"
      case "outbound":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search communications..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="message">Message</SelectItem>
              <SelectItem value="call">Call</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="inbound">Inbound</SelectItem>
              <SelectItem value="outbound">Outbound</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Response</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communications.map((comm) => (
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
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(comm.type)}
                    <span className="capitalize">{comm.type}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{comm.subject}</TableCell>
                <TableCell>
                  <Badge className={getDirectionColor(comm.direction)}>{comm.direction}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(comm.status)}>{comm.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-slate-600">{comm.timestamp}</TableCell>
                <TableCell>
                  {comm.response ? (
                    <Badge className="bg-green-100 text-green-800">Yes</Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">No</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
