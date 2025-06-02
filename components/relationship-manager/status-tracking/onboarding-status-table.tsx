"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, MessageSquare, Calendar } from "lucide-react"

export function OnboardingStatusTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const onboardingRequests = [
    {
      id: "ONB-2024-001",
      clientName: "Acme Corporation Ltd",
      clientType: "Corporate",
      status: "kyc-review",
      stage: "KYC Documentation Review",
      progress: 75,
      assignedTo: "Sarah Chen",
      dueDate: "2024-02-15",
      priority: "high",
      lastUpdate: "2 hours ago",
    },
    {
      id: "ONB-2024-002",
      clientName: "John Smith",
      clientType: "Individual",
      status: "document-collection",
      stage: "Document Collection",
      progress: 45,
      assignedTo: "Mike Johnson",
      dueDate: "2024-02-18",
      priority: "medium",
      lastUpdate: "1 day ago",
    },
    {
      id: "ONB-2024-003",
      clientName: "TechStart Ventures",
      clientType: "Corporate",
      status: "compliance-review",
      stage: "Compliance Review",
      progress: 90,
      assignedTo: "Lisa Wang",
      dueDate: "2024-02-12",
      priority: "high",
      lastUpdate: "30 minutes ago",
    },
    {
      id: "ONB-2024-004",
      clientName: "Maria Rodriguez",
      clientType: "Individual",
      status: "data-entry",
      stage: "Initial Data Entry",
      progress: 25,
      assignedTo: "David Kim",
      dueDate: "2024-02-20",
      priority: "low",
      lastUpdate: "3 hours ago",
    },
    {
      id: "ONB-2024-005",
      clientName: "Global Finance Inc",
      clientType: "Corporate",
      status: "completed",
      stage: "Onboarding Complete",
      progress: 100,
      assignedTo: "Sarah Chen",
      dueDate: "2024-02-10",
      priority: "medium",
      lastUpdate: "2 days ago",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "data-entry": { label: "Data Entry", variant: "secondary" as const },
      "document-collection": { label: "Document Collection", variant: "default" as const },
      "kyc-review": { label: "KYC Review", variant: "default" as const },
      "compliance-review": { label: "Compliance Review", variant: "default" as const },
      completed: { label: "Completed", variant: "default" as const },
      "on-hold": { label: "On Hold", variant: "secondary" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "secondary" as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "High", variant: "destructive" as const },
      medium: { label: "Medium", variant: "default" as const },
      low: { label: "Low", variant: "secondary" as const },
    }

    const config = priorityConfig[priority as keyof typeof priorityConfig] || {
      label: priority,
      variant: "secondary" as const,
    }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredRequests = onboardingRequests.filter((request) => {
    const matchesSearch =
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Status Overview</CardTitle>
        <CardDescription>Track the progress of all client onboarding requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by client name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="data-entry">Data Entry</SelectItem>
              <SelectItem value="document-collection">Document Collection</SelectItem>
              <SelectItem value="kyc-review">KYC Review</SelectItem>
              <SelectItem value="compliance-review">Compliance Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.clientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {request.id} • {request.clientType}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getStatusBadge(request.status)}
                      <div className="text-xs text-muted-foreground">{request.stage}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{request.progress}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${request.progress}%` }}></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{request.assignedTo}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{request.dueDate}</div>
                    <div className="text-xs text-muted-foreground">Updated {request.lastUpdate}</div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
