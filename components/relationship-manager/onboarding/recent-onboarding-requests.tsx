"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  MoreHorizontal,
  Eye,
  FileEdit,
  AlertCircle,
  Search,
  ArrowUpDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Sample data for recent onboarding requests
const recentRequests = [
  {
    id: "ONB-2023-001",
    clientName: "John Smith",
    clientType: "Individual",
    dateInitiated: "2023-05-28",
    status: "In Progress",
    riskLevel: "Low",
    assignedTo: "KYC Team",
    currentStage: "Document Collection",
  },
  {
    id: "ONB-2023-002",
    clientName: "Acme Corporation",
    clientType: "Entity",
    dateInitiated: "2023-05-27",
    status: "Pending Review",
    riskLevel: "Medium",
    assignedTo: "Compliance Team",
    currentStage: "Risk Assessment",
  },
  {
    id: "ONB-2023-003",
    clientName: "Sarah Johnson",
    clientType: "Individual",
    dateInitiated: "2023-05-25",
    status: "Completed",
    riskLevel: "Low",
    assignedTo: "KYC Team",
    currentStage: "Approved",
  },
  {
    id: "ONB-2023-004",
    clientName: "Tech Innovations Ltd",
    clientType: "Entity",
    dateInitiated: "2023-05-24",
    status: "On Hold",
    riskLevel: "High",
    assignedTo: "Enhanced Due Diligence Team",
    currentStage: "Additional Information Required",
  },
  {
    id: "ONB-2023-005",
    clientName: "Michael Brown",
    clientType: "Individual",
    dateInitiated: "2023-05-23",
    status: "Rejected",
    riskLevel: "High",
    assignedTo: "Compliance Team",
    currentStage: "Final Decision",
  },
]

export function RecentOnboardingRequests() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredRequests = recentRequests.filter(
    (request) =>
      request.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="mr-1 h-3 w-3" /> In Progress
          </Badge>
        )
      case "Pending Review":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="mr-1 h-3 w-3" /> Pending Review
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      case "On Hold":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <AlertTriangle className="mr-1 h-3 w-3" /> On Hold
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      case "Medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      default:
        return <Badge>{risk}</Badge>
    }
  }

  const viewRequest = (id: string) => {
    toast({
      title: "Viewing request",
      description: `Navigating to onboarding request ${id}`,
    })
  }

  const editRequest = (id: string) => {
    toast({
      title: "Editing request",
      description: `Opening onboarding request ${id} for editing`,
    })
  }

  const flagRequest = (id: string) => {
    toast({
      title: "Request flagged",
      description: `Onboarding request ${id} has been flagged for review`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by client name, ID or status..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("id")}>
                  ID
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("clientName")}>
                  Client Name
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Client Type</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("dateInitiated")}>
                  Date Initiated
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("status")}>
                  Status
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("riskLevel")}>
                  Risk Level
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Current Stage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRequests.length > 0 ? (
              sortedRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.clientName}</TableCell>
                  <TableCell>{request.clientType}</TableCell>
                  <TableCell>{request.dateInitiated}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{getRiskBadge(request.riskLevel)}</TableCell>
                  <TableCell>{request.currentStage}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => viewRequest(request.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editRequest(request.id)}>
                          <FileEdit className="mr-2 h-4 w-4" />
                          Edit Request
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => flagRequest(request.id)}>
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Flag for Review
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No onboarding requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
