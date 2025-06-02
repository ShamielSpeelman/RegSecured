"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Bell, Clock, MoreHorizontal, Shield, User } from "lucide-react"

export function AlertList() {
  const [alerts, setAlerts] = useState([
    {
      id: "ALT-2024-001",
      type: "kyc",
      priority: "high",
      status: "new",
      title: "KYC Review Required",
      description: "Enhanced due diligence review required for high-risk client",
      client: {
        name: "Acme Corporation Ltd",
        id: "CLT-2024-001",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: "2024-05-31T09:15:00Z",
      dueDate: "2024-06-03",
      assignedTo: null,
      source: "Automated Risk Assessment",
      relatedItems: ["KYC-2024-005", "DOC-2024-012"],
    },
    {
      id: "ALT-2024-002",
      type: "document",
      priority: "medium",
      status: "in-progress",
      title: "Missing Document",
      description: "Proof of address document expired and requires renewal",
      client: {
        name: "John Smith",
        id: "CLT-2024-002",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: "2024-05-30T14:22:00Z",
      dueDate: "2024-06-05",
      assignedTo: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      source: "Document Expiry Tracker",
      relatedItems: ["DOC-2024-018"],
    },
    {
      id: "ALT-2024-003",
      type: "compliance",
      priority: "high",
      status: "pending",
      title: "Compliance Review Finding",
      description: "Potential compliance issue identified during periodic review",
      client: {
        name: "TechStart Ventures",
        id: "CLT-2024-003",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: "2024-05-29T11:05:00Z",
      dueDate: "2024-06-02",
      assignedTo: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      source: "Compliance Review",
      relatedItems: ["REV-2024-007", "FND-2024-003"],
    },
    {
      id: "ALT-2024-004",
      type: "risk",
      priority: "medium",
      status: "new",
      title: "Risk Profile Change",
      description: "Client risk profile changed from low to medium",
      client: {
        name: "Global Imports Inc",
        id: "CLT-2024-004",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: "2024-05-31T08:45:00Z",
      dueDate: "2024-06-07",
      assignedTo: null,
      source: "Risk Assessment Engine",
      relatedItems: ["RSK-2024-022"],
    },
    {
      id: "ALT-2024-005",
      type: "screening",
      priority: "high",
      status: "new",
      title: "Potential Sanctions Match",
      description: "Potential sanctions match detected during periodic screening",
      client: {
        name: "Eastern Trading Co",
        id: "CLT-2024-005",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: "2024-05-31T07:30:00Z",
      dueDate: "2024-06-01",
      assignedTo: null,
      source: "Sanctions Screening",
      relatedItems: ["SCR-2024-031"],
    },
  ])

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case "kyc":
        return <User className="h-4 w-4 text-blue-600" />
      case "document":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "compliance":
        return <Shield className="h-4 w-4 text-purple-600" />
      case "risk":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "screening":
        return <Bell className="h-4 w-4 text-red-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800">Medium Priority</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-700">
            New
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-700">
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-700">
            Pending Review
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const handleAssignToMe = (alertId: string) => {
    setAlerts(
      alerts.map((alert) => {
        if (alert.id === alertId) {
          return {
            ...alert,
            status: "in-progress",
            assignedTo: {
              name: "Current User",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          }
        }
        return alert
      }),
    )
  }

  const handleMarkAsResolved = (alertId: string) => {
    setAlerts(
      alerts.map((alert) => {
        if (alert.id === alertId) {
          return {
            ...alert,
            status: "resolved",
          }
        }
        return alert
      }),
    )
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className={alert.status === "new" ? "border-l-4 border-l-blue-500" : ""}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                {getAlertTypeIcon(alert.type)}
                <CardTitle className="text-lg">{alert.title}</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                {getPriorityBadge(alert.priority)}
                {getStatusBadge(alert.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleAssignToMe(alert.id)}>Assign to me</DropdownMenuItem>
                    <DropdownMenuItem>Escalate</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMarkAsResolved(alert.id)}>Mark as resolved</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardDescription className="text-sm mt-1">{alert.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={alert.client.avatar || "/placeholder.svg"} alt={alert.client.name} />
                  <AvatarFallback>{alert.client.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{alert.client.name}</div>
                  <div className="text-sm text-muted-foreground">Client ID: {alert.client.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <div>{formatDate(alert.createdAt)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Due Date:</span>
                  <div>{alert.dueDate}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Source:</span>
                  <div>{alert.source}</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t">
            <div className="flex items-center text-sm text-muted-foreground">
              {alert.assignedTo ? (
                <div className="flex items-center">
                  <span className="mr-2">Assigned to:</span>
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={alert.assignedTo.avatar || "/placeholder.svg"} alt={alert.assignedTo.name} />
                    <AvatarFallback>{alert.assignedTo.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{alert.assignedTo.name}</span>
                </div>
              ) : (
                <span>Unassigned</span>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {alert.status !== "resolved" && <Button size="sm">Take Action</Button>}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
