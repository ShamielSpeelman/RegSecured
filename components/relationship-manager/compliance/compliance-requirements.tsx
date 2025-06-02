"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

export function ComplianceRequirements() {
  const requirements = [
    {
      category: "KYC Documentation",
      status: "compliant",
      progress: 100,
      items: [
        { name: "Identity Verification", status: "complete" },
        { name: "Address Verification", status: "complete" },
        { name: "Source of Funds", status: "complete" },
      ],
    },
    {
      category: "Periodic Reviews",
      status: "in-progress",
      progress: 75,
      items: [
        { name: "Annual Client Review", status: "complete" },
        { name: "Risk Assessment Update", status: "complete" },
        { name: "Beneficial Ownership Verification", status: "pending" },
        { name: "Enhanced Due Diligence", status: "pending" },
      ],
    },
    {
      category: "Regulatory Requirements",
      status: "compliant",
      progress: 100,
      items: [
        { name: "Sanctions Screening", status: "complete" },
        { name: "PEP Screening", status: "complete" },
        { name: "Adverse Media Screening", status: "complete" },
      ],
    },
    {
      category: "Transaction Monitoring",
      status: "attention-required",
      progress: 67,
      items: [
        { name: "Transaction Pattern Analysis", status: "complete" },
        { name: "Unusual Activity Review", status: "attention-required" },
        { name: "High-Risk Transaction Review", status: "pending" },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "attention-required":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Compliant
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        )
      case "attention-required":
        return (
          <Badge variant="default" className="bg-red-100 text-red-800">
            Attention Required
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Compliance Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {requirements.map((requirement, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{requirement.category}</h4>
              {getStatusBadge(requirement.status)}
            </div>
            <Progress value={requirement.progress} className="h-2" />
            <div className="space-y-2 mt-2">
              {requirement.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between text-sm p-2 rounded-md bg-slate-50">
                  <div className="flex items-center">
                    {getStatusIcon(item.status)}
                    <span className="ml-2">{item.name}</span>
                  </div>
                  <span
                    className={
                      item.status === "complete"
                        ? "text-green-600"
                        : item.status === "pending"
                          ? "text-amber-600"
                          : "text-red-600"
                    }
                  >
                    {item.status === "complete"
                      ? "Complete"
                      : item.status === "pending"
                        ? "Pending"
                        : "Attention Required"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
