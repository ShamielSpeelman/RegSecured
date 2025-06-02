import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Calendar, CheckCircle2, Clock, Edit, MessageSquare, MoreHorizontal, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ClientUpdateTaskListProps {
  status: "active" | "completed" | "overdue"
}

export function ClientUpdateTaskList({ status }: ClientUpdateTaskListProps) {
  // Sample data - in a real app, this would come from an API
  const tasks = [
    {
      id: "T-1001",
      client: {
        name: "Acme Financial Services",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      taskType: "Beneficial Ownership Update",
      priority: "High",
      dueDate: "2025-06-05",
      assignedTo: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "In Progress",
      lastUpdated: "2 hours ago",
      communicationTemplate: "Beneficial Ownership Update",
    },
    {
      id: "T-1002",
      client: {
        name: "Global Trade Partners",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      taskType: "Risk Profile Update",
      priority: "Medium",
      dueDate: "2025-06-10",
      assignedTo: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "Not Started",
      lastUpdated: "1 day ago",
      communicationTemplate: "Risk Rating Change",
    },
    {
      id: "T-1003",
      client: {
        name: "Horizon Investments",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      taskType: "Contact Information Update",
      priority: "Low",
      dueDate: "2025-06-15",
      assignedTo: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "In Progress",
      lastUpdated: "3 hours ago",
      communicationTemplate: "Status Update",
    },
    {
      id: "T-1004",
      client: {
        name: "Quantum Securities",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      taskType: "PEP Status Update",
      priority: "High",
      dueDate: "2025-06-03",
      assignedTo: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "Pending Client",
      lastUpdated: "5 hours ago",
      communicationTemplate: "Notification of PEP",
    },
    {
      id: "T-1005",
      client: {
        name: "Evergreen Capital",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      taskType: "Business Activity Update",
      priority: "Medium",
      dueDate: "2025-06-12",
      assignedTo: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "In Progress",
      lastUpdated: "1 day ago",
      communicationTemplate: "Status Update",
    },
    {
      id: "T-1006",
      client: {
        name: "Meridian Partners",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      taskType: "Source of Funds Update",
      priority: "High",
      dueDate: "2025-06-04",
      assignedTo: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "Pending Review",
      lastUpdated: "4 hours ago",
      communicationTemplate: "Source of Funds Clarification",
    },
  ]

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (status === "active") {
      return task.status !== "Completed" && new Date(task.dueDate) >= new Date()
    } else if (status === "completed") {
      return task.status === "Completed"
    } else if (status === "overdue") {
      return task.status !== "Completed" && new Date(task.dueDate) < new Date()
    }
    return true
  })

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "Medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      case "Not Started":
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">Not Started</Badge>
      case "Pending Client":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Pending Client</Badge>
      case "Pending Review":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Review</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Task Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={task.client.avatar || "/placeholder.svg"} alt={task.client.name} />
                        <AvatarFallback>{task.client.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{task.client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{task.taskType}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                        <AvatarFallback>{task.assignedTo.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{task.assignedTo.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-slate-500" />
                      {task.lastUpdated}
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
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark Complete
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
                  No tasks found for the selected status.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
