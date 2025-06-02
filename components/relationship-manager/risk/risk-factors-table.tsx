"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Eye } from "lucide-react"

export function RiskFactorsTable() {
  const clients = [
    {
      id: "CLT-2024-001",
      name: "Acme Corporation Ltd",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Corporate",
      riskScore: 78,
      riskLevel: "High",
      riskFactors: [
        { factor: "High-risk jurisdiction", impact: "high" },
        { factor: "Complex ownership structure", impact: "medium" },
        { factor: "High transaction volume", impact: "medium" },
      ],
      lastAssessment: "2024-05-15",
    },
    {
      id: "CLT-2024-003",
      name: "TechStart Ventures",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Corporate",
      riskScore: 65,
      riskLevel: "Medium",
      riskFactors: [
        { factor: "New business relationship", impact: "medium" },
        { factor: "Digital asset exposure", impact: "medium" },
      ],
      lastAssessment: "2024-04-22",
    },
    {
      id: "CLT-2024-005",
      name: "Eastern Trading Co",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Corporate",
      riskScore: 82,
      riskLevel: "High",
      riskFactors: [
        { factor: "Cross-border transactions", impact: "high" },
        { factor: "PEP association", impact: "high" },
        { factor: "High-risk industry", impact: "medium" },
      ],
      lastAssessment: "2024-05-30",
    },
    {
      id: "CLT-2024-007",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Individual",
      riskScore: 72,
      riskLevel: "High",
      riskFactors: [
        { factor: "High net worth individual", impact: "medium" },
        { factor: "Multiple jurisdictions", impact: "high" },
      ],
      lastAssessment: "2024-05-10",
    },
    {
      id: "CLT-2024-004",
      name: "Global Imports Inc",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Corporate",
      riskScore: 58,
      riskLevel: "Medium",
      riskFactors: [
        { factor: "International trade", impact: "medium" },
        { factor: "Cash-intensive business", impact: "medium" },
      ],
      lastAssessment: "2024-05-05",
    },
  ]

  const getRiskLevelBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "High":
        return <Badge variant="destructive">High Risk</Badge>
      case "Medium":
        return (
          <Badge variant="default" className="bg-amber-100 text-amber-800">
            Medium Risk
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Low Risk
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return (
          <Badge variant="outline" className="border-red-500 text-red-700">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-700">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-red-600"
    if (score >= 50) return "text-amber-600"
    return "text-green-600"
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead className="hidden md:table-cell">Key Risk Factors</TableHead>
            <TableHead className="hidden lg:table-cell">Last Assessment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                    <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {client.id} • {client.type}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${getScoreColor(client.riskScore)}`}>{client.riskScore}/100</span>
                  <Progress
                    value={client.riskScore}
                    className={`h-2 w-16 ${
                      client.riskScore >= 75
                        ? "bg-slate-200 [&>div]:bg-red-500"
                        : client.riskScore >= 50
                          ? "bg-slate-200 [&>div]:bg-amber-500"
                          : "bg-slate-200 [&>div]:bg-green-500"
                    }`}
                  />
                </div>
              </TableCell>
              <TableCell>{getRiskLevelBadge(client.riskLevel)}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="space-y-1">
                  {client.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center text-sm">
                      {factor.impact === "high" && <AlertTriangle className="h-3 w-3 text-red-600 mr-1" />}
                      <span className="mr-1">{factor.factor}</span>
                      {getImpactBadge(factor.impact)}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">{client.lastAssessment}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
