"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Plus, Edit, Copy, Eye, Users, Calendar, Shield, AlertTriangle } from "lucide-react"

interface DocumentTemplate {
  id: string
  name: string
  description: string
  category: string
  documentsRequired: string[]
  estimatedTime: string
  usageCount: number
  lastUsed: string
  priority: "high" | "medium" | "low"
}

const mockTemplates: DocumentTemplate[] = [
  {
    id: "TEMP-001",
    name: "Standard KYC Package",
    description: "Complete KYC documentation package for individual clients",
    category: "KYC",
    documentsRequired: ["Government ID", "Proof of Address", "Bank Statement", "Source of Funds"],
    estimatedTime: "3-5 days",
    usageCount: 156,
    lastUsed: "2024-05-30",
    priority: "high",
  },
  {
    id: "TEMP-002",
    name: "Corporate KYC Package",
    description: "Comprehensive KYC package for corporate entities",
    category: "KYC",
    documentsRequired: [
      "Certificate of Incorporation",
      "Board Resolution",
      "Director IDs",
      "Beneficial Ownership",
      "Financial Statements",
    ],
    estimatedTime: "5-7 days",
    usageCount: 89,
    lastUsed: "2024-05-29",
    priority: "high",
  },
  {
    id: "TEMP-003",
    name: "Enhanced Due Diligence",
    description: "Enhanced due diligence for high-risk clients",
    category: "AML",
    documentsRequired: ["Source of Wealth", "Business Plan", "Reference Letters", "Enhanced Background Check"],
    estimatedTime: "7-10 days",
    usageCount: 34,
    lastUsed: "2024-05-28",
    priority: "high",
  },
  {
    id: "TEMP-004",
    name: "PEP Documentation",
    description: "Specialized documentation for Politically Exposed Persons",
    category: "Risk",
    documentsRequired: ["PEP Declaration", "Source of Wealth", "Enhanced Background Check", "Ongoing Monitoring"],
    estimatedTime: "10-14 days",
    usageCount: 12,
    lastUsed: "2024-05-25",
    priority: "high",
  },
  {
    id: "TEMP-005",
    name: "Annual Review Package",
    description: "Annual compliance review documentation",
    category: "Compliance",
    documentsRequired: ["Updated Financial Statements", "Business Activity Review", "Risk Assessment Update"],
    estimatedTime: "2-3 days",
    usageCount: 78,
    lastUsed: "2024-05-27",
    priority: "medium",
  },
  {
    id: "TEMP-006",
    name: "Transaction Monitoring Review",
    description: "Documentation for suspicious transaction reviews",
    category: "AML",
    documentsRequired: ["Transaction Details", "Client Explanation", "Supporting Evidence"],
    estimatedTime: "1-2 days",
    usageCount: 45,
    lastUsed: "2024-05-30",
    priority: "high",
  },
  {
    id: "TEMP-007",
    name: "Sanctions Screening Package",
    description: "Documentation for sanctions screening compliance",
    category: "Risk",
    documentsRequired: ["Screening Results", "False Positive Analysis", "Compliance Clearance"],
    estimatedTime: "1-3 days",
    usageCount: 23,
    lastUsed: "2024-05-26",
    priority: "medium",
  },
  {
    id: "TEMP-008",
    name: "Document Renewal Request",
    description: "Standard package for document renewal requests",
    category: "General",
    documentsRequired: ["Expiry Notice", "Renewal Request Form", "Updated Documents"],
    estimatedTime: "1-2 days",
    usageCount: 134,
    lastUsed: "2024-05-30",
    priority: "medium",
  },
]

export default function DocumentTemplates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
    const matchesPriority = priorityFilter === "all" || template.priority === priorityFilter
    return matchesSearch && matchesCategory && matchesPriority
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "KYC":
        return <Users className="h-4 w-4" />
      case "AML":
        return <Shield className="h-4 w-4" />
      case "Risk":
        return <AlertTriangle className="h-4 w-4" />
      case "Compliance":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      KYC: "bg-blue-100 text-blue-800",
      AML: "bg-green-100 text-green-800",
      Risk: "bg-red-100 text-red-800",
      Compliance: "bg-purple-100 text-purple-800",
      General: "bg-gray-100 text-gray-800",
    }
    return (
      <Badge
        variant="outline"
        className={`${colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"} flex items-center gap-1`}
      >
        {getCategoryIcon(category)}
        {category}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Document Templates</h3>
          <p className="text-sm text-muted-foreground">Pre-configured document request packages</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription className="mt-1">{template.description}</CardDescription>
                </div>
                <div className="flex gap-1 ml-2">{getCategoryBadge(template.category)}</div>
              </div>
              <div className="flex items-center gap-2 mt-2">{getPriorityBadge(template.priority)}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Documents Required */}
              <div>
                <p className="text-sm font-medium mb-2">Documents Required:</p>
                <div className="space-y-1">
                  {template.documentsRequired.slice(0, 3).map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      {doc}
                    </div>
                  ))}
                  {template.documentsRequired.length > 3 && (
                    <p className="text-sm text-muted-foreground">
                      +{template.documentsRequired.length - 3} more documents
                    </p>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Estimated Time</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {template.estimatedTime}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Usage Count</p>
                  <p className="font-medium">{template.usageCount} times</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground">Last Used: {template.lastUsed}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-1" />
                  Use Template
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No templates found matching your criteria</p>
            <Button variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create New Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
