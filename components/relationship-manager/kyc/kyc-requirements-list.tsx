"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, AlertTriangle, FileText, User, Building } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface KYCRequirement {
  id: string
  category: string
  requirement: string
  status: "completed" | "pending" | "missing" | "expired"
  mandatory: boolean
  description: string
  applicableFor: "individual" | "entity" | "both"
  jurisdiction: string[]
}

const mockRequirements: KYCRequirement[] = [
  {
    id: "req-001",
    category: "Identity Verification",
    requirement: "Government-issued Photo ID",
    status: "completed",
    mandatory: true,
    description: "Valid passport, driver's license, or national ID card",
    applicableFor: "individual",
    jurisdiction: ["US", "CA", "GB", "EU"],
  },
  {
    id: "req-002",
    category: "Address Verification",
    requirement: "Proof of Address",
    status: "pending",
    mandatory: true,
    description: "Utility bill, bank statement, or lease agreement (not older than 3 months)",
    applicableFor: "both",
    jurisdiction: ["US", "CA", "GB", "EU"],
  },
  {
    id: "req-003",
    category: "Financial Information",
    requirement: "Source of Funds Declaration",
    status: "missing",
    mandatory: true,
    description: "Documentation proving the source of funds for the account",
    applicableFor: "both",
    jurisdiction: ["US", "CA", "GB", "EU"],
  },
  {
    id: "req-004",
    category: "Tax Compliance",
    requirement: "Tax Identification Number",
    status: "completed",
    mandatory: true,
    description: "SSN, TIN, or equivalent tax identification number",
    applicableFor: "both",
    jurisdiction: ["US"],
  },
  {
    id: "req-005",
    category: "Corporate Documents",
    requirement: "Certificate of Incorporation",
    status: "pending",
    mandatory: true,
    description: "Official certificate of incorporation or registration",
    applicableFor: "entity",
    jurisdiction: ["US", "CA", "GB", "EU"],
  },
  {
    id: "req-006",
    category: "Corporate Documents",
    requirement: "Beneficial Ownership Information",
    status: "missing",
    mandatory: true,
    description: "Details of all beneficial owners (25% or more ownership)",
    applicableFor: "entity",
    jurisdiction: ["US", "CA", "GB", "EU"],
  },
  {
    id: "req-007",
    category: "Enhanced Due Diligence",
    requirement: "Source of Wealth Documentation",
    status: "pending",
    mandatory: false,
    description: "Required for high-risk clients or large transactions",
    applicableFor: "both",
    jurisdiction: ["US", "CA", "GB", "EU"],
  },
  {
    id: "req-008",
    category: "Sanctions Screening",
    requirement: "PEP Declaration",
    status: "completed",
    mandatory: true,
    description: "Declaration of Politically Exposed Person status",
    applicableFor: "both",
    jurisdiction: ["US", "CA", "GB", "EU"],
  },
]

export function KYCRequirementsList() {
  const [selectedClientType, setSelectedClientType] = useState<"individual" | "entity" | "both">("both")
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("US")

  const filteredRequirements = mockRequirements.filter(
    (req) =>
      (req.applicableFor === selectedClientType || req.applicableFor === "both" || selectedClientType === "both") &&
      req.jurisdiction.includes(selectedJurisdiction),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Circle className="h-4 w-4 text-yellow-600" />
      case "missing":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <Circle className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusBadge = (status: string, mandatory: boolean) => {
    const baseClasses = "text-xs"
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className={`${baseClasses} bg-green-100 text-green-800`}>
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            Pending
          </Badge>
        )
      case "missing":
        return (
          <Badge variant="destructive" className={baseClasses}>
            Missing
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="destructive" className={`${baseClasses} bg-orange-100 text-orange-800`}>
            Expired
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className={baseClasses}>
            Unknown
          </Badge>
        )
    }
  }

  const completedCount = filteredRequirements.filter((req) => req.status === "completed").length
  const totalCount = filteredRequirements.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const mandatoryRequirements = filteredRequirements.filter((req) => req.mandatory)
  const optionalRequirements = filteredRequirements.filter((req) => !req.mandatory)

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Client Type</label>
          <Select
            value={selectedClientType}
            onValueChange={(value: "individual" | "entity" | "both") => setSelectedClientType(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="both">All Types</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="entity">Entity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Jurisdiction</label>
          <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="GB">United Kingdom</SelectItem>
              <SelectItem value="EU">European Union</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Completion Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Requirements Completed</span>
              <span>
                {completedCount} of {totalCount}
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-xs text-slate-500">{Math.round(completionPercentage)}% complete</p>
          </div>
        </CardContent>
      </Card>

      {/* Mandatory Requirements */}
      {mandatoryRequirements.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-900 mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
            Mandatory Requirements
          </h3>
          <div className="space-y-2">
            {mandatoryRequirements.map((requirement) => (
              <Card key={requirement.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getStatusIcon(requirement.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-slate-900">{requirement.requirement}</h4>
                          {getStatusBadge(requirement.status, requirement.mandatory)}
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{requirement.category}</p>
                        <p className="text-xs text-slate-500">{requirement.description}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          {requirement.applicableFor === "individual" && (
                            <Badge variant="outline" className="text-xs">
                              <User className="h-3 w-3 mr-1" />
                              Individual
                            </Badge>
                          )}
                          {requirement.applicableFor === "entity" && (
                            <Badge variant="outline" className="text-xs">
                              <Building className="h-3 w-3 mr-1" />
                              Entity
                            </Badge>
                          )}
                          {requirement.applicableFor === "both" && (
                            <Badge variant="outline" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              All Types
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {requirement.status !== "completed" && (
                        <Button size="sm" variant="outline" className="text-xs">
                          Collect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Optional Requirements */}
      {optionalRequirements.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-900 mb-3 flex items-center">
            <Circle className="h-4 w-4 text-slate-400 mr-2" />
            Optional Requirements
          </h3>
          <div className="space-y-2">
            {optionalRequirements.map((requirement) => (
              <Card key={requirement.id} className="border-l-4 border-l-slate-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getStatusIcon(requirement.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-slate-900">{requirement.requirement}</h4>
                          {getStatusBadge(requirement.status, requirement.mandatory)}
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{requirement.category}</p>
                        <p className="text-xs text-slate-500">{requirement.description}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          {requirement.applicableFor === "individual" && (
                            <Badge variant="outline" className="text-xs">
                              <User className="h-3 w-3 mr-1" />
                              Individual
                            </Badge>
                          )}
                          {requirement.applicableFor === "entity" && (
                            <Badge variant="outline" className="text-xs">
                              <Building className="h-3 w-3 mr-1" />
                              Entity
                            </Badge>
                          )}
                          {requirement.applicableFor === "both" && (
                            <Badge variant="outline" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              All Types
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {requirement.status !== "completed" && (
                        <Button size="sm" variant="outline" className="text-xs">
                          Collect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
