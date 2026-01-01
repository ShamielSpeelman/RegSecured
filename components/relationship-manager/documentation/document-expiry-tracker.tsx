"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Clock, Calendar, User, FileText, Send, Eye, CheckSquare } from "lucide-react"

interface ExpiringDocument {
  id: string
  clientId: string
  clientName: string
  documentType: string
  category: string
  expiryDate: string
  daysRemaining: number
  status: "critical" | "warning" | "upcoming"
  lastRenewalRequest?: string
}

const mockExpiringDocuments: ExpiringDocument[] = [
  {
    id: "DOC-001",
    clientId: "CLI-001",
    clientName: "Acme Corporation",
    documentType: "Corporate Registration",
    category: "KYC",
    expiryDate: "2024-06-15",
    daysRemaining: 5,
    status: "critical",
  },
  {
    id: "DOC-002",
    clientId: "CLI-002",
    clientName: "TechStart Ltd",
    documentType: "Director ID",
    category: "KYC",
    expiryDate: "2024-06-25",
    daysRemaining: 15,
    status: "warning",
  },
  {
    id: "DOC-003",
    clientId: "CLI-003",
    clientName: "Global Finance Inc",
    documentType: "AML Certificate",
    category: "AML",
    expiryDate: "2024-07-10",
    daysRemaining: 30,
    status: "upcoming",
  },
  {
    id: "DOC-004",
    clientId: "CLI-004",
    clientName: "Innovation Partners",
    documentType: "Risk Assessment",
    category: "Risk",
    expiryDate: "2024-06-20",
    daysRemaining: 10,
    status: "warning",
  },
  {
    id: "DOC-005",
    clientId: "CLI-005",
    clientName: "Secure Holdings",
    documentType: "Compliance Certificate",
    category: "Compliance",
    expiryDate: "2024-06-12",
    daysRemaining: 2,
    status: "critical",
  },
]

const DocumentExpiryTracker = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredDocuments = mockExpiringDocuments.filter((doc) => {
    const matchesSearch =
      doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleSelectDocument = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId) ? prev.filter((id) => id !== documentId) : [...prev, documentId],
    )
  }

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(filteredDocuments.map((doc) => doc.id))
    }
  }

  const getStatusBadge = (status: string, daysRemaining: number) => {
    switch (status) {
      case "critical":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Critical ({daysRemaining}d)
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="secondary" className="flex items-center gap-1 bg-orange-100 text-orange-800">
            <Clock className="h-3 w-3" />
            Warning ({daysRemaining}d)
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Upcoming ({daysRemaining}d)
          </Badge>
        )
      default:
        return null
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      KYC: "bg-blue-100 text-blue-800",
      AML: "bg-green-100 text-green-800",
      Risk: "bg-red-100 text-red-800",
      Compliance: "bg-purple-100 text-purple-800",
    }
    return (
      <Badge variant="outline" className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {category}
      </Badge>
    )
  }

  const criticalCount = filteredDocuments.filter((doc) => doc.status === "critical").length
  const warningCount = filteredDocuments.filter((doc) => doc.status === "warning").length
  const upcomingCount = filteredDocuments.filter((doc) => doc.status === "upcoming").length

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical (≤7 days)</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Warning (8-30 days)</p>
                <p className="text-2xl font-bold text-orange-600">{warningCount}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming (31+ days)</p>
                <p className="text-2xl font-bold text-blue-600">{upcomingCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Document Expiry Tracker</CardTitle>
          <CardDescription>Monitor and manage expiring client documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search clients or documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="KYC">KYC</SelectItem>
                <SelectItem value="AML">AML</SelectItem>
                <SelectItem value="Risk">Risk</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedDocuments.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
              <CheckSquare className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">{selectedDocuments.length} document(s) selected</span>
              <div className="flex gap-2 ml-auto">
                <Button size="sm" variant="outline">
                  <Send className="h-4 w-4 mr-1" />
                  Send Renewal Requests
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
            </div>
          )}

          {/* Document List */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Checkbox
                checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">Select All ({filteredDocuments.length})</span>
            </div>

            {filteredDocuments.map((document) => (
              <div key={document.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <Checkbox
                  checked={selectedDocuments.includes(document.id)}
                  onCheckedChange={() => handleSelectDocument(document.id)}
                />

                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{document.clientName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{document.clientId}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{document.documentType}</span>
                    </div>
                    <div className="mt-1">{getCategoryBadge(document.category)}</div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Expires: {document.expiryDate}</p>
                    <div className="mt-1">{getStatusBadge(document.status, document.daysRemaining)}</div>
                  </div>

                  <div>
                    {document.lastRenewalRequest && (
                      <p className="text-sm text-muted-foreground">Last request: {document.lastRenewalRequest}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Send className="h-4 w-4 mr-1" />
                      Request Renewal
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No expiring documents found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export { default as DocumentExpiryTracker } from "./document-expiry-tracker"
