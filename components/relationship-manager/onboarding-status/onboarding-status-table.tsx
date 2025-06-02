import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Eye, MessageSquare, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function OnboardingStatusTable() {
  const onboardings = [
    {
      id: "ONB-001",
      client: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      status: "In Progress",
      priority: "High",
      progress: 75,
      stage: "KYC Review",
      startDate: "2024-01-15",
      dueDate: "2024-02-15",
      daysRemaining: 12,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "ONB-002",
      client: "TechCorp Industries",
      email: "compliance@techcorp.com",
      status: "Pending Review",
      priority: "Medium",
      progress: 90,
      stage: "Final Approval",
      startDate: "2024-01-10",
      dueDate: "2024-02-10",
      daysRemaining: 8,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "ONB-003",
      client: "Michael Chen",
      email: "m.chen@investment.com",
      status: "On Hold",
      priority: "High",
      progress: 45,
      stage: "Document Collection",
      startDate: "2024-01-20",
      dueDate: "2024-02-20",
      daysRemaining: 18,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "ONB-004",
      client: "Emma Rodriguez",
      email: "emma.r@email.com",
      status: "In Progress",
      priority: "Low",
      progress: 30,
      stage: "Initial Screening",
      startDate: "2024-01-25",
      dueDate: "2024-02-25",
      daysRemaining: 23,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "ONB-005",
      client: "Global Finance Ltd",
      email: "kyc@globalfinance.com",
      status: "Completed",
      priority: "Medium",
      progress: 100,
      stage: "Completed",
      startDate: "2023-12-15",
      dueDate: "2024-01-15",
      daysRemaining: 0,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending Review":
        return "bg-orange-100 text-orange-800"
      case "On Hold":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Current Stage</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {onboardings.map((onboarding) => (
            <TableRow key={onboarding.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={onboarding.avatar || "/placeholder.svg"} alt={onboarding.client} />
                    <AvatarFallback>
                      {onboarding.client
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{onboarding.client}</div>
                    <div className="text-sm text-slate-600">{onboarding.email}</div>
                    <div className="text-xs text-slate-500">{onboarding.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(onboarding.status)}>{onboarding.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(onboarding.priority)}>{onboarding.priority}</Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{onboarding.progress}%</span>
                  </div>
                  <Progress value={onboarding.progress} className="h-2" />
                </div>
              </TableCell>
              <TableCell className="text-sm">{onboarding.stage}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{onboarding.dueDate}</div>
                  {onboarding.daysRemaining > 0 && (
                    <div className="text-xs text-slate-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {onboarding.daysRemaining} days left
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Client
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" />
                        Update Timeline
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
