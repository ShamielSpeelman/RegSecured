"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, Eye, FileText } from "lucide-react"

export function ComplianceStatusTable() {
  const [clients, setClients] = useState([
    {
      id: "CLT-2024-001",
      name: "Acme Corporation Ltd",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Corporate",
      riskLevel: "High",
      complianceStatus: "review-required",
      complianceScore: 72,
      lastReviewDate: "2024-03-15",
      nextReviewDate: "2024-06-15",
      pendingItems: 2,
      reviewType: "Enhanced Due Diligence",
    },
    {
      id: "CLT-2024-002",
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Individual",
      riskLevel: "Low",
      complianceStatus: "compliant",
      complianceScore: 95,
      lastReviewDate: "2024-04-10",
      nextReviewDate: "2024-10-10",
      pendingItems: 0,
      reviewType: "Standard Due Diligence",
    },
    {
      id: "CLT-2024-003",
      name: "TechStart Ventures",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Corporate",
      riskLevel: "Medium",
      complianceStatus: "pending-documents",
      complianceScore: 83,
      lastReviewDate: "2024-02-22",
      nextReviewDate: "2024-08-22",
      pendingItems: 1,
      reviewType: "Standard Due Diligence",
    },
    {
      id: "CLT-2024-004",
      name: "Global Imports Inc",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Corporate",
      riskLevel: "Medium",
      complianceStatus: "compliant",
      complianceScore: 88,
      lastReviewDate: "2024-05-05",
      nextReviewDate: "2024-11-05",
      pendingItems: 0,
      reviewType: "Standard Due Diligence",
    },
    {
      id: "CLT-2024-005",
      name: "Eastern Trading Co",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Corporate",
      riskLevel: "High",
      complianceStatus: "non-compliant",
      complianceScore: 65,
      lastReviewDate: "2024-04-30",
      nextReviewDate: "2024-07-30",
      pendingItems: 3,
      reviewType: "Enhanced Due Diligence",
    },
    {
      id: "CLT-2024-006",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "Individual",
      riskLevel: "Low",
      complianceStatus: "compliant",
      complianceScore: 98,
      lastReviewDate: "2024-05-12",
      nextReviewDate: "2024-11-12",
      pendingItems: 0,
      reviewType: "Standard Due Diligence",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "review-required":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "pending-documents":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "non-compliant":
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
      case "review-required":
        return (
          <Badge variant="default" className="bg-amber-100 text-amber-800">
            Review Required
          </Badge>
        )
      case "pending-documents":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Pending Documents
          </Badge>
        )
      case "non-compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

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

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Compliance Status</TableHead>
            <TableHead className="hidden md:table-cell">Score</TableHead>
            <TableHead className="hidden lg:table-cell">Last Review</TableHead>
            <TableHead className="hidden lg:table-cell">Next Review</TableHead>
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
              <TableCell>{getRiskLevelBadge(client.riskLevel)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(client.complianceStatus)}
                  <span>{getStatusBadge(client.complianceStatus)}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${getScoreColor(client.complianceScore)}`}>
                    {client.complianceScore}%
                  </span>
                  <Progress value={client.complianceScore} className="h-2 w-16" />
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">{client.lastReviewDate}</TableCell>
              <TableCell className="hidden lg:table-cell">{client.nextReviewDate}</TableCell>
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
