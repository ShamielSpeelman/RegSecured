import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Calendar, CheckCircle2, Eye, FileText, MessageSquare, MoreHorizontal, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ReviewScheduleProps {
  status: "upcoming" | "inProgress" | "completed"
}

export function ReviewSchedule({ status }: ReviewScheduleProps) {
  // Sample data - in a real app, this would come from an API
  const reviews = [
    {
      id: "R-2001",
      client: {
        name: "Acme Financial Services",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewType: "Annual Review",
      riskLevel: "Medium",
      dueDate: "2025-06-15",
      assignedTo: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "Scheduled",
      progress: 0,
      lastUpdated: "1 day ago",
      communicationTemplate: "Annual Client Review",
    },
    {
      id: "R-2002",
      client: {
        name: "Global Trade Partners",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewType: "Enhanced Due Diligence",
      riskLevel: "High",
      dueDate: "2025-06-10",
      assignedTo: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "In Progress",
      progress: 35,
      lastUpdated: "3 hours ago",
      communicationTemplate: "Enhanced Due Diligence",
    },
    {
      id: "R-2003",
      client: {
        name: "Horizon Investments",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewType: "Periodic Review",
      riskLevel: "Low",
      dueDate: "2025-06-30",
      assignedTo: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "Scheduled",
      progress: 0,
      lastUpdated: "2 days ago",
      communicationTemplate: "Status Update",
    },
    {
      id: "R-2004",
      client: {
        name: "Quantum Securities",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewType: "PEP Review",
      riskLevel: "High",
      dueDate: "2025-06-05",
      assignedTo: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "In Progress",
      progress: 75,
      lastUpdated: "6 hours ago",
      communicationTemplate: "Notification of PEP",
    },
    {
      id: "R-2005",
      client: {
        name: "Evergreen Capital",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewType: "Annual Review",
      riskLevel: "Medium",
      dueDate: "2025-06-20",
      assignedTo: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "Scheduled",
      progress: 0,
      lastUpdated: "5 days ago",
      communicationTemplate: "Annual Client Review",
    },
    {
      id: "R-2006",
      client: {
        name: "Meridian Partners",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewType: "Sanctions Review",
      riskLevel: "High",
      dueDate: "2025-06-08",
      assignedTo: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "In Progress",
      progress: 50,
      lastUpdated: "1 day ago",
      communicationTemplate: "Sanctions Notice",
    },
    {
      id: "R-2007",
      client: {
        name: "Atlas Ventures",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewType: "Transaction Pattern Review",
      riskLevel: "Medium",
      dueDate: "2025-06-12",
      assignedTo: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "In Progress",
      progress: 25,
      lastUpdated: "2 days ago",
      communicationTemplate: "Transaction Monitoring Alert",
    },
    {
      id: "R-2008",
      client: {
        name: "Pinnacle Investments",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      reviewType: "Annual Review",
      riskLevel: "Low",
      dueDate: "2025-06-25",
      assignedTo: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "Scheduled",
      progress: 0,
      lastUpdated: "3 days ago",
      communicationTemplate: "Annual Client Review",
    },
  ]

  // Filter reviews based on status
  const filteredReviews = reviews.filter((review) => {
    if (status === "upcoming") {
      return review.status === "Scheduled"
    } else if (status === "inProgress") {
      return review.status === "In Progress"
    } else if (status === "completed") {
      return review.status === "Completed"
    }
    return true
  })

  const getRiskLevelBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "Medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">{riskLevel}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      case "Scheduled":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Scheduled</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">{status}</Badge>
    }
  }

  const getProgressBar = (progress: number) => {
    return (
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Review ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Review Type</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.client.avatar || "/placeholder.svg"} alt={review.client.name} />
                        <AvatarFallback>{review.client.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{review.client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{review.reviewType}</TableCell>
                  <TableCell>{getRiskLevelBadge(review.riskLevel)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      {new Date(review.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={review.assignedTo.avatar || "/placeholder.svg"}
                          alt={review.assignedTo.name}
                        />
                        <AvatarFallback>{review.assignedTo.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{review.assignedTo.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getProgressBar(review.progress)}
                      <span className="text-xs text-slate-500">{review.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="h-4 w-4 mr-2" />
                          Reassign
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Communication
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Request Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Escalate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6 text-slate-500">
                  No reviews found for the selected status.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
