"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, Clock, AlertTriangle, Eye, MessageSquare, FileText } from "lucide-react"

export function ComplianceReviewTracker() {
  const complianceReviews = [
    {
      clientId: "ONB-2024-001",
      clientName: "Acme Corporation Ltd",
      reviewType: "Enhanced Due Diligence",
      riskLevel: "High",
      status: "in-progress",
      progress: 75,
      reviewer: "Sarah Chen",
      startDate: "2024-02-08",
      dueDate: "2024-02-15",
      checkpoints: [
        { name: "Identity Verification", status: "completed", completedDate: "2024-02-09" },
        { name: "Business Verification", status: "completed", completedDate: "2024-02-10" },
        { name: "Sanctions Screening", status: "completed", completedDate: "2024-02-11" },
        { name: "PEP Screening", status: "in-progress", assignedTo: "Sarah Chen" },
        { name: "Source of Funds Review", status: "pending" },
        { name: "Final Risk Assessment", status: "pending" },
      ],
      findings: 2,
      lastUpdate: "2 hours ago",
    },
    {
      clientId: "ONB-2024-002",
      clientName: "John Smith",
      reviewType: "Standard Due Diligence",
      riskLevel: "Medium",
      status: "pending-approval",
      progress: 95,
      reviewer: "Mike Johnson",
      startDate: "2024-02-05",
      dueDate: "2024-02-12",
      checkpoints: [
        { name: "Identity Verification", status: "completed", completedDate: "2024-02-06" },
        { name: "Address Verification", status: "completed", completedDate: "2024-02-07" },
        { name: "Sanctions Screening", status: "completed", completedDate: "2024-02-08" },
        { name: "PEP Screening", status: "completed", completedDate: "2024-02-09" },
        { name: "Source of Funds Review", status: "completed", completedDate: "2024-02-10" },
        { name: "Final Risk Assessment", status: "pending-approval", assignedTo: "Lisa Wang" },
      ],
      findings: 0,
      lastUpdate: "1 day ago",
    },
    {
      clientId: "ONB-2024-003",
      clientName: "TechStart Ventures",
      reviewType: "Enhanced Due Diligence",
      riskLevel: "High",
      status: "on-hold",
      progress: 60,
      reviewer: "Lisa Wang",
      startDate: "2024-02-06",
      dueDate: "2024-02-13",
      checkpoints: [
        { name: "Identity Verification", status: "completed", completedDate: "2024-02-07" },
        { name: "Business Verification", status: "completed", completedDate: "2024-02-08" },
        { name: "Sanctions Screening", status: "completed", completedDate: "2024-02-09" },
        { name: "PEP Screening", status: "on-hold", note: "Additional documentation required" },
        { name: "Source of Funds Review", status: "pending" },
        { name: "Final Risk Assessment", status: "pending" },
      ],
      findings: 1,
      lastUpdate: "3 hours ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-gray-400" />
      case "on-hold":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "pending-approval":
        return <Shield className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "on-hold":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            On Hold
          </Badge>
        )
      case "pending-approval":
        return (
          <Badge variant="default" className="bg-purple-100 text-purple-800">
            Pending Approval
          </Badge>
        )
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
          <Badge variant="default" className="bg-yellow-100 text-yellow-800">
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

  return (
    <div className="space-y-6">
      {complianceReviews.map((review, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{review.clientName}</CardTitle>
                <CardDescription>
                  {review.clientId} • {review.reviewType}
                </CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                  {getRiskLevelBadge(review.riskLevel)}
                  {getStatusBadge(review.status)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{review.progress}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={review.progress} className="h-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Reviewer:</span>
                  <div className="font-medium">{review.reviewer}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Due Date:</span>
                  <div className="font-medium">{review.dueDate}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Findings:</span>
                  <div className="font-medium">
                    {review.findings > 0 ? (
                      <span className="text-orange-600">{review.findings} issue(s)</span>
                    ) : (
                      <span className="text-green-600">No issues</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Review Checkpoints</h4>
                {review.checkpoints.map((checkpoint, checkpointIndex) => (
                  <div key={checkpointIndex} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(checkpoint.status)}
                      <div>
                        <div className="font-medium text-sm">{checkpoint.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {checkpoint.completedDate && `Completed ${checkpoint.completedDate}`}
                          {checkpoint.assignedTo && `Assigned to ${checkpoint.assignedTo}`}
                          {checkpoint.note && checkpoint.note}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">{getStatusBadge(checkpoint.status)}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-muted-foreground">Last updated {review.lastUpdate}</div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Continue Review
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
