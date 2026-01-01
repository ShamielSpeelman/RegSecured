"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Edit, Send, AlertCircle, CheckCircle, XCircle, Clock, FileText } from "lucide-react"

// Mock data for document requests
const documentRequests = [
  {
    id: "DR-2023-1042",
    clientName: "Acme Financial Services",
    clientId: "CLT-7823",
    documentType: "Proof of Address",
    category: "KYC",
    status: "Pending",
    priority: "High",
    dueDate: "2023-06-15",
    requestDate: "2023-06-01",
    lastUpdated: "2023-06-01",
  },
  {
    id: "DR-2023-1041",
    clientName: "Global Trading Ltd",
    clientId: "CLT-6591",
    documentType: "Beneficial Ownership Declaration",
    category: "KYC",
    status: "Sent",
    priority: "Medium",
    dueDate: "2023-06-20",
    requestDate: "2023-05-30",
    lastUpdated: "2023-06-02",
  },
  {
    id: "DR-2023-1040",
    clientName: "Horizon Investments",
    clientId: "CLT-9023",
    documentType: "Source of Funds Documentation",
    category: "AML",
    status: "Received",
    priority: "High",
    dueDate: "2023-06-10",
    requestDate: "2023-05-28",
    lastUpdated: "2023-06-03",
  },
  {
    id: "DR-2023-1039",
    clientName: "Stellar Capital Partners",
    clientId: "CLT-4567",
    documentType: "Financial Statements",
    category: "Risk",
    status: "Under Review",
    priority: "Medium",
    dueDate: "2023-06-18",
    requestDate: "2023-05-25",
    lastUpdated: "2023-06-02",
  },
  {
    id: "DR-2023-1038",
    clientName: "Blue Ocean Ventures",
    clientId: "CLT-3321",
    documentType: "Passport Copy",
    category: "KYC",
    status: "Approved",
    priority: "Low",
    dueDate: "2023-06-05",
    requestDate: "2023-05-20",
    lastUpdated: "2023-06-01",
  },
  {
    id: "DR-2023-1037",
    clientName: "Quantum Securities",
    clientId: "CLT-8876",
    documentType: "Certificate of Incorporation",
    category: "KYC",
    status: "Rejected",
    priority: "Medium",
    dueDate: "2023-06-02",
    requestDate: "2023-05-18",
    lastUpdated: "2023-05-30",
  },
  {
    id: "DR-2023-1036",
    clientName: "Evergreen Asset Management",
    clientId: "CLT-5432",
    documentType: "Tax Identification Documents",
    category: "Compliance",
    status: "Overdue",
    priority: "Critical",
    dueDate: "2023-05-30",
    requestDate: "2023-05-15",
    lastUpdated: "2023-05-29",
  },
  {
    id: "DR-2023-1035",
    clientName: "Phoenix Capital Group",
    clientId: "CLT-7789",
    documentType: "Board Resolution",
    category: "Governance",
    status: "Sent",
    priority: "High",
    dueDate: "2023-06-25",
    requestDate: "2023-05-12",
    lastUpdated: "2023-05-28",
  },
]

// Status badge component with appropriate colors
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Sent":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Received":
        return "bg-green-100 text-green-800 border-green-200"
      case "Under Review":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "Overdue":
        return "bg-red-200 text-red-900 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "Pending":
        return <Clock className="h-3.5 w-3.5 mr-1" />
      case "Sent":
        return <Send className="h-3.5 w-3.5 mr-1" />
      case "Received":
        return <FileText className="h-3.5 w-3.5 mr-1" />
      case "Under Review":
        return <Eye className="h-3.5 w-3.5 mr-1" />
      case "Approved":
        return <CheckCircle className="h-3.5 w-3.5 mr-1" />
      case "Rejected":
        return <XCircle className="h-3.5 w-3.5 mr-1" />
      case "Overdue":
        return <AlertCircle className="h-3.5 w-3.5 mr-1" />
      default:
        return null
    }
  }

  return (
    <Badge className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {getStatusIcon()}
      {status}
    </Badge>
  )
}

// Priority badge component
const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return <Badge className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor()}`}>{priority}</Badge>
}

// Category badge component
const CategoryBadge = ({ category }: { category: string }) => {
  const getCategoryColor = () => {
    switch (category) {
      case "KYC":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "AML":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "Risk":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Compliance":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Governance":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return <Badge className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor()}`}>{category}</Badge>
}

const DocumentRequestList = () => {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedRequests.length === documentRequests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(documentRequests.map((request) => request.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedRequests.includes(id)) {
      setSelectedRequests(selectedRequests.filter((requestId) => requestId !== id))
    } else {
      setSelectedRequests([...selectedRequests, id])
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">Document Requests</h3>
        <div className="flex space-x-2">
          {selectedRequests.length > 0 && (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Resend ({selectedRequests.length})
              </Button>
              <Button variant="outline" size="sm">
                Mark as Received
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                Cancel
              </Button>
            </div>
          )}
          <Button size="sm">New Request</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedRequests.length === documentRequests.length && documentRequests.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[120px]">Request ID</TableHead>
              <TableHead className="w-[200px]">Client</TableHead>
              <TableHead className="w-[250px]">Document Type</TableHead>
              <TableHead className="w-[100px]">Category</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[120px]">Due Date</TableHead>
              <TableHead className="w-[120px]">Requested</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentRequests.map((request) => (
              <TableRow
                key={request.id}
                className={isOverdue(request.dueDate) && request.status !== "Approved" ? "bg-red-50" : ""}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRequests.includes(request.id)}
                    onCheckedChange={() => toggleSelect(request.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{request.clientName}</div>
                    <div className="text-xs text-gray-500">{request.clientId}</div>
                  </div>
                </TableCell>
                <TableCell>{request.documentType}</TableCell>
                <TableCell>
                  <CategoryBadge category={request.category} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={request.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={request.priority} />
                </TableCell>
                <TableCell
                  className={
                    isOverdue(request.dueDate) && request.status !== "Approved" ? "text-red-600 font-medium" : ""
                  }
                >
                  {new Date(request.dueDate).toLocaleDateString()}
                  {isOverdue(request.dueDate) && request.status !== "Approved" && (
                    <div className="text-xs font-medium text-red-600">Overdue</div>
                  )}
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {new Date(request.requestDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit Request
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" /> Resend Request
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <XCircle className="mr-2 h-4 w-4" /> Cancel Request
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {documentRequests.length} of {documentRequests.length} requests
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export { DocumentRequestList }
