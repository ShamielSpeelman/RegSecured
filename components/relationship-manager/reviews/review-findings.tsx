"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  FileText,
  Plus,
  Edit,
  Trash2,
  Download,
} from "lucide-react"

const reviewFindings = [
  {
    id: "RF001",
    reviewId: "REV001",
    clientName: "Acme Corporation",
    findingType: "Documentation Gap",
    severity: "High",
    category: "KYC",
    description: "Missing beneficial ownership documentation for entities with >25% ownership",
    status: "Open",
    assignedTo: "Sarah Johnson",
    dueDate: "2024-02-15",
    createdDate: "2024-01-20",
    remediationActions: [
      "Request updated beneficial ownership forms",
      "Verify entity structure documentation",
      "Update client risk profile",
    ],
  },
  {
    id: "RF002",
    reviewId: "REV002",
    clientName: "Global Tech Solutions",
    findingType: "Risk Rating Discrepancy",
    severity: "Medium",
    category: "Risk Assessment",
    description: "Client risk rating may need adjustment based on recent transaction patterns",
    status: "In Progress",
    assignedTo: "Michael Chen",
    dueDate: "2024-02-10",
    createdDate: "2024-01-18",
    remediationActions: [
      "Analyze transaction patterns",
      "Review risk scoring methodology",
      "Update risk rating if necessary",
    ],
  },
  {
    id: "RF003",
    reviewId: "REV003",
    clientName: "Investment Partners LLC",
    findingType: "Sanctions Screening",
    severity: "Critical",
    category: "AML",
    description: "Potential sanctions match requiring immediate investigation",
    status: "Escalated",
    assignedTo: "Emma Davis",
    dueDate: "2024-01-25",
    createdDate: "2024-01-22",
    remediationActions: [
      "Conduct enhanced due diligence",
      "Review sanctions screening results",
      "Escalate to compliance committee",
    ],
  },
]

const findingCategories = ["All", "KYC", "AML", "Risk Assessment", "Documentation", "Sanctions"]
const severityLevels = ["All", "Critical", "High", "Medium", "Low"]
const statusOptions = ["All", "Open", "In Progress", "Resolved", "Escalated"]

const ReviewFindings = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSeverity, setSelectedSeverity] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showNewFindingForm, setShowNewFindingForm] = useState(false)

  const filteredFindings = reviewFindings.filter((finding) => {
    const matchesSearch =
      finding.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      finding.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      finding.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || finding.category === selectedCategory
    const matchesSeverity = selectedSeverity === "All" || finding.severity === selectedSeverity
    const matchesStatus = selectedStatus === "All" || finding.status === selectedStatus

    return matchesSearch && matchesCategory && matchesSeverity && matchesStatus
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "destructive"
      case "In Progress":
        return "default"
      case "Resolved":
        return "secondary"
      case "Escalated":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <XCircle className="h-4 w-4" />
      case "In Progress":
        return <Clock className="h-4 w-4" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />
      case "Escalated":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Review Findings</h2>
          <p className="text-gray-600">Manage and track review findings and remediation actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowNewFindingForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Finding
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search findings, clients, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {findingCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((severity) => (
                    <SelectItem key={severity} value={severity}>
                      {severity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Findings List */}
      <div className="space-y-4">
        {filteredFindings.map((finding) => (
          <Card key={finding.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{finding.findingType}</CardTitle>
                    <Badge variant={getSeverityColor(finding.severity)}>{finding.severity}</Badge>
                    <Badge variant="outline">{finding.category}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {finding.clientName}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {finding.id}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due: {finding.dueDate}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(finding.status)} className="flex items-center gap-1">
                    {getStatusIcon(finding.status)}
                    {finding.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="remediation">Remediation</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Finding Description</h4>
                    <p className="text-gray-700">{finding.description}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Assigned To:</span>
                      <p>{finding.assignedTo}</p>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <p>{finding.createdDate}</p>
                    </div>
                    <div>
                      <span className="font-medium">Due Date:</span>
                      <p>{finding.dueDate}</p>
                    </div>
                    <div>
                      <span className="font-medium">Review ID:</span>
                      <p>{finding.reviewId}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="remediation" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Remediation Actions</h4>
                    <ul className="space-y-2">
                      {finding.remediationActions.map((action, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Add Action</Button>
                    <Button size="sm" variant="outline">
                      Update Status
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>• Finding created on {finding.createdDate}</p>
                    <p>• Assigned to {finding.assignedTo}</p>
                    <p>• Status: {finding.status}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFindings.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No findings found</h3>
            <p className="text-gray-600">No review findings match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { default as ReviewFindings } from "./review-findings"
