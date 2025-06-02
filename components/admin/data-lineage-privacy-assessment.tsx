"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Database, GitBranch, Shield, Eye, Search, Users, FileText, ArrowRight, Lock } from "lucide-react"

export function DataLineagePrivacyAssessment() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDataType, setSelectedDataType] = useState("all")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all")

  const dataAssets = [
    {
      name: "Customer PII Database",
      type: "Database",
      classification: "Highly Sensitive",
      riskScore: 95,
      dataSubjects: 125000,
      retentionPeriod: "7 years",
      lastAccessed: "2 minutes ago",
      location: "US-East-1",
      encryption: "AES-256",
      compliance: ["GDPR", "CCPA", "HIPAA"],
    },
    {
      name: "Transaction Records",
      type: "Data Lake",
      classification: "Sensitive",
      riskScore: 78,
      dataSubjects: 89000,
      retentionPeriod: "10 years",
      lastAccessed: "5 minutes ago",
      location: "EU-West-1",
      encryption: "AES-256",
      compliance: ["PCI DSS", "GDPR"],
    },
    {
      name: "Employee Data",
      type: "HR System",
      classification: "Confidential",
      riskScore: 82,
      dataSubjects: 2500,
      retentionPeriod: "5 years",
      lastAccessed: "1 hour ago",
      location: "US-West-2",
      encryption: "AES-128",
      compliance: ["GDPR", "SOX"],
    },
    {
      name: "Marketing Analytics",
      type: "Data Warehouse",
      classification: "Internal",
      riskScore: 45,
      dataSubjects: 250000,
      retentionPeriod: "3 years",
      lastAccessed: "30 minutes ago",
      location: "Global CDN",
      encryption: "TLS 1.3",
      compliance: ["GDPR", "CCPA"],
    },
  ]

  const dataLineage = [
    {
      source: "Customer Onboarding API",
      destination: "Customer PII Database",
      dataType: "Personal Information",
      transformations: ["Validation", "Encryption", "Normalization"],
      frequency: "Real-time",
      volume: "~500 records/hour",
      lastProcessed: "2 minutes ago",
    },
    {
      source: "Payment Gateway",
      destination: "Transaction Records",
      dataType: "Financial Data",
      transformations: ["Tokenization", "Aggregation"],
      frequency: "Batch (hourly)",
      volume: "~2,000 transactions/hour",
      lastProcessed: "15 minutes ago",
    },
    {
      source: "Customer PII Database",
      destination: "Marketing Analytics",
      dataType: "Anonymized Demographics",
      transformations: ["Anonymization", "Aggregation", "Filtering"],
      frequency: "Daily",
      volume: "~50,000 records/day",
      lastProcessed: "2 hours ago",
    },
    {
      source: "HR System",
      destination: "Payroll Database",
      dataType: "Employee Information",
      transformations: ["Validation", "Calculation"],
      frequency: "Bi-weekly",
      volume: "~2,500 records/cycle",
      lastProcessed: "3 days ago",
    },
  ]

  const privacyAssessments = [
    {
      assessment: "GDPR Article 30 Compliance",
      status: "compliant",
      score: 94,
      lastReview: "2024-03-15",
      nextReview: "2024-06-15",
      findings: 2,
      recommendations: 3,
    },
    {
      assessment: "CCPA Privacy Impact",
      status: "needs_attention",
      score: 76,
      lastReview: "2024-02-20",
      nextReview: "2024-05-20",
      findings: 8,
      recommendations: 12,
    },
    {
      assessment: "Data Minimization Review",
      status: "compliant",
      score: 88,
      lastReview: "2024-03-01",
      nextReview: "2024-09-01",
      findings: 3,
      recommendations: 5,
    },
    {
      assessment: "Cross-Border Transfer Analysis",
      status: "in_progress",
      score: 65,
      lastReview: "2024-03-20",
      nextReview: "2024-04-20",
      findings: 12,
      recommendations: 18,
    },
  ]

  const dataSubjectRequests = [
    {
      type: "Access Request",
      requestId: "DSR-2024-001234",
      dataSubject: "john.doe@email.com",
      status: "in_progress",
      submitted: "2024-04-20",
      dueDate: "2024-05-20",
      affectedSystems: 8,
      estimatedRecords: 156,
    },
    {
      type: "Deletion Request",
      requestId: "DSR-2024-001235",
      dataSubject: "jane.smith@email.com",
      status: "completed",
      submitted: "2024-04-18",
      dueDate: "2024-05-18",
      affectedSystems: 12,
      estimatedRecords: 89,
    },
    {
      type: "Portability Request",
      requestId: "DSR-2024-001236",
      dataSubject: "mike.wilson@email.com",
      status: "pending",
      submitted: "2024-04-22",
      dueDate: "2024-05-22",
      affectedSystems: 6,
      estimatedRecords: 234,
    },
  ]

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-yellow-600"
    return "text-green-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800 border-green-200"
      case "needs_attention":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GitBranch className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">Data Lineage & Privacy Assessment</h2>
            <p className="text-sm text-slate-600">Track data flows and assess privacy compliance across systems</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
            <Input
              placeholder="Search data assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 h-8 w-48 text-xs"
            />
          </div>
          <Select value={selectedDataType} onValueChange={setSelectedDataType}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="api">API</SelectItem>
              <SelectItem value="file">File System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Data Assets Inventory */}
        <Card className="col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data Assets Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataAssets.map((asset, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-slate-600" />
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">{asset.name}</h3>
                        <p className="text-xs text-slate-500">
                          {asset.type} • {asset.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {asset.classification}
                      </Badge>
                      <span className={`text-xs font-medium ${getRiskColor(asset.riskScore)}`}>
                        Risk: {asset.riskScore}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Data Subjects</p>
                      <p className="text-sm font-medium text-slate-700">{asset.dataSubjects.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Retention</p>
                      <p className="text-sm font-medium text-slate-700">{asset.retentionPeriod}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Encryption</p>
                      <p className="text-sm font-medium text-slate-700">{asset.encryption}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Last Accessed</p>
                      <p className="text-sm font-medium text-slate-700">{asset.lastAccessed}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {asset.compliance.map((comp, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {comp}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="h-6 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      View Lineage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Assessments */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy Assessments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {privacyAssessments.map((assessment, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{assessment.assessment}</span>
                  <Badge className={`text-xs ${getStatusColor(assessment.status)}`}>
                    {assessment.status.replace("_", " ")}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span>Score:</span>
                    <span className="font-medium">{assessment.score}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Findings:</span>
                    <span className="font-medium">{assessment.findings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Review:</span>
                    <span>{assessment.nextReview}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Lineage Flow */}
        <Card className="col-span-12">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              Data Lineage Flows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataLineage.map((flow, index) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700">{flow.source}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{flow.destination}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {flow.dataType}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-xs text-slate-500">
                    <div>
                      <span>Transformations: </span>
                      <span className="font-medium">{flow.transformations.join(", ")}</span>
                    </div>
                    <div>
                      <span>Frequency: </span>
                      <span className="font-medium">{flow.frequency}</span>
                    </div>
                    <div>
                      <span>Volume: </span>
                      <span className="font-medium">{flow.volume}</span>
                    </div>
                    <div>
                      <span>Last Processed: </span>
                      <span className="font-medium">{flow.lastProcessed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Subject Requests */}
        <Card className="col-span-12">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Data Subject Rights Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {dataSubjectRequests.map((request, index) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{request.type}</span>
                    <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                      {request.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-slate-500 mb-3">
                    <div className="flex justify-between">
                      <span>Request ID:</span>
                      <span className="font-medium font-mono">{request.requestId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Subject:</span>
                      <span className="font-medium">{request.dataSubject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span className="font-medium">{request.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Affected Systems:</span>
                      <span className="font-medium">{request.affectedSystems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Records:</span>
                      <span className="font-medium">{request.estimatedRecords}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full h-6 text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
