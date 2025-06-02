"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, CheckCircle, MessageSquare, User, Calendar, Plus } from "lucide-react"

export function IssueManagementPanel() {
  const [newIssueText, setNewIssueText] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")

  const issues = [
    {
      id: "ISS-001",
      clientId: "ONB-2024-001",
      clientName: "Acme Corporation Ltd",
      title: "Missing Beneficial Ownership Documentation",
      description:
        "Client has not provided complete beneficial ownership structure documentation as required for enhanced due diligence.",
      priority: "high",
      status: "open",
      assignedTo: "Sarah Chen",
      createdDate: "2024-02-12",
      dueDate: "2024-02-15",
      category: "documentation",
      lastUpdate: "2 hours ago",
    },
    {
      id: "ISS-002",
      clientId: "ONB-2024-002",
      clientName: "John Smith",
      title: "Address Verification Discrepancy",
      description: "Utility bill address does not match the address provided in the application form.",
      priority: "medium",
      status: "in-progress",
      assignedTo: "Mike Johnson",
      createdDate: "2024-02-11",
      dueDate: "2024-02-18",
      category: "verification",
      lastUpdate: "1 day ago",
    },
    {
      id: "ISS-003",
      clientId: "ONB-2024-003",
      clientName: "TechStart Ventures",
      title: "PEP Screening Alert",
      description:
        "Potential match found in PEP database for one of the beneficial owners. Requires manual review and additional documentation.",
      priority: "high",
      status: "escalated",
      assignedTo: "Lisa Wang",
      createdDate: "2024-02-10",
      dueDate: "2024-02-13",
      category: "screening",
      lastUpdate: "3 hours ago",
    },
    {
      id: "ISS-004",
      clientId: "ONB-2024-004",
      clientName: "Maria Rodriguez",
      title: "Source of Funds Clarification",
      description: "Client needs to provide additional documentation to clarify the source of initial deposit funds.",
      priority: "low",
      status: "resolved",
      assignedTo: "David Kim",
      createdDate: "2024-02-08",
      dueDate: "2024-02-20",
      category: "compliance",
      lastUpdate: "2 days ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "escalated":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Open</Badge>
      case "in-progress":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        )
      case "escalated":
        return (
          <Badge variant="default" className="bg-orange-100 text-orange-800">
            Escalated
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      documentation: { label: "Documentation", variant: "default" as const },
      verification: { label: "Verification", variant: "default" as const },
      screening: { label: "Screening", variant: "default" as const },
      compliance: { label: "Compliance", variant: "default" as const },
    }

    const config = categoryConfig[category as keyof typeof categoryConfig] || {
      label: category,
      variant: "secondary" as const,
    }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleCreateIssue = () => {
    if (newIssueText.trim() && selectedPriority) {
      // Handle issue creation logic here
      setNewIssueText("")
      setSelectedPriority("")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Issue</CardTitle>
          <CardDescription>Report a new issue or concern for client onboarding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Describe the issue or concern..."
              value={newIssueText}
              onChange={(e) => setNewIssueText(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex space-x-4">
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleCreateIssue} disabled={!newIssueText.trim() || !selectedPriority}>
                <Plus className="h-4 w-4 mr-2" />
                Create Issue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Issues</CardTitle>
          <CardDescription>Current issues requiring attention across all onboarding cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {issues.map((issue, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(issue.status)}
                    <div>
                      <div className="font-medium">{issue.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {issue.clientName} • {issue.clientId}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(issue.priority)}
                    {getStatusBadge(issue.status)}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{issue.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Due {issue.dueDate}</span>
                    </div>
                    {getCategoryBadge(issue.category)}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
