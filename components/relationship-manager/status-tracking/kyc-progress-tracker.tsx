"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertCircle, FileText, User, Building } from "lucide-react"

export function KYCProgressTracker() {
  const kycItems = [
    {
      clientId: "ONB-2024-001",
      clientName: "Acme Corporation Ltd",
      clientType: "Corporate",
      overallProgress: 75,
      sections: [
        { name: "Basic Information", status: "completed", progress: 100 },
        { name: "Business Details", status: "completed", progress: 100 },
        { name: "Beneficial Ownership", status: "in-progress", progress: 60 },
        { name: "Financial Information", status: "pending", progress: 0 },
        { name: "Risk Assessment", status: "pending", progress: 0 },
      ],
      lastUpdated: "2 hours ago",
      reviewer: "Sarah Chen",
    },
    {
      clientId: "ONB-2024-002",
      clientName: "John Smith",
      clientType: "Individual",
      overallProgress: 45,
      sections: [
        { name: "Personal Information", status: "completed", progress: 100 },
        { name: "Identity Verification", status: "in-progress", progress: 70 },
        { name: "Address Verification", status: "in-progress", progress: 30 },
        { name: "Source of Funds", status: "pending", progress: 0 },
        { name: "Risk Assessment", status: "pending", progress: 0 },
      ],
      lastUpdated: "1 day ago",
      reviewer: "Mike Johnson",
    },
    {
      clientId: "ONB-2024-003",
      clientName: "TechStart Ventures",
      clientType: "Corporate",
      overallProgress: 90,
      sections: [
        { name: "Basic Information", status: "completed", progress: 100 },
        { name: "Business Details", status: "completed", progress: 100 },
        { name: "Beneficial Ownership", status: "completed", progress: 100 },
        { name: "Financial Information", status: "completed", progress: 100 },
        { name: "Risk Assessment", status: "in-progress", progress: 50 },
      ],
      lastUpdated: "30 minutes ago",
      reviewer: "Lisa Wang",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
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
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {kycItems.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                {item.clientType === "Corporate" ? (
                  <Building className="h-5 w-5 text-blue-600" />
                ) : (
                  <User className="h-5 w-5 text-green-600" />
                )}
                <div>
                  <CardTitle className="text-lg">{item.clientName}</CardTitle>
                  <CardDescription>
                    {item.clientId} • {item.clientType}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{item.overallProgress}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={item.overallProgress} className="h-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {item.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(section.status)}
                        <span className="text-sm font-medium">{section.name}</span>
                      </div>
                      {getStatusBadge(section.status)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{section.progress}%</span>
                      </div>
                      <Progress value={section.progress} className="h-1" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Last updated {item.lastUpdated} by {item.reviewer}
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm">Continue Review</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
