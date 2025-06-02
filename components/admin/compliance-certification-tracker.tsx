"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Calendar, CheckCircle2, Clock, FileText, Download, RefreshCw, Target, Shield } from "lucide-react"

export function ComplianceCertificationTracker() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("current")

  const certifications = [
    {
      name: "SOC 2 Type II",
      status: "active",
      expiryDate: "2024-12-15",
      daysUntilExpiry: 234,
      progress: 100,
      lastAudit: "2024-01-15",
      nextAudit: "2024-10-15",
      auditor: "Deloitte",
      scope: "Security, Availability, Confidentiality",
      riskLevel: "low",
    },
    {
      name: "ISO 27001",
      status: "active",
      expiryDate: "2025-03-20",
      daysUntilExpiry: 329,
      progress: 100,
      lastAudit: "2024-03-20",
      nextAudit: "2024-12-20",
      auditor: "PwC",
      scope: "Information Security Management",
      riskLevel: "low",
    },
    {
      name: "PCI DSS Level 1",
      status: "renewal_required",
      expiryDate: "2024-06-30",
      daysUntilExpiry: 67,
      progress: 78,
      lastAudit: "2023-06-30",
      nextAudit: "2024-05-15",
      auditor: "KPMG",
      scope: "Payment Card Processing",
      riskLevel: "medium",
    },
    {
      name: "FedRAMP Moderate",
      status: "in_progress",
      expiryDate: "N/A",
      daysUntilExpiry: null,
      progress: 45,
      lastAudit: "N/A",
      nextAudit: "2024-07-01",
      auditor: "3PAO Assessor",
      scope: "Cloud Security Authorization",
      riskLevel: "high",
    },
    {
      name: "GDPR Compliance",
      status: "active",
      expiryDate: "Ongoing",
      daysUntilExpiry: null,
      progress: 92,
      lastAudit: "2024-02-01",
      nextAudit: "2024-08-01",
      auditor: "Internal Team",
      scope: "Data Protection & Privacy",
      riskLevel: "low",
    },
    {
      name: "HIPAA Compliance",
      status: "active",
      expiryDate: "Ongoing",
      daysUntilExpiry: null,
      progress: 88,
      lastAudit: "2024-01-10",
      nextAudit: "2024-07-10",
      auditor: "Healthcare Auditors Inc",
      scope: "Healthcare Data Protection",
      riskLevel: "low",
    },
  ]

  const automatedTasks = [
    {
      task: "Evidence Collection",
      status: "completed",
      lastRun: "2 hours ago",
      nextRun: "Daily at 2:00 AM",
      success: 98,
      items: 1247,
    },
    {
      task: "Control Testing",
      status: "running",
      lastRun: "Running now",
      nextRun: "Weekly on Sundays",
      success: 94,
      items: 89,
    },
    {
      task: "Gap Analysis",
      status: "scheduled",
      lastRun: "Yesterday",
      nextRun: "In 2 hours",
      success: 91,
      items: 156,
    },
    {
      task: "Report Generation",
      status: "completed",
      lastRun: "1 hour ago",
      nextRun: "Monthly on 1st",
      success: 99,
      items: 23,
    },
  ]

  const upcomingDeadlines = [
    {
      certification: "PCI DSS Level 1",
      task: "Quarterly Self-Assessment",
      dueDate: "2024-05-15",
      daysLeft: 21,
      priority: "high",
      assignee: "Security Team",
    },
    {
      certification: "SOC 2 Type II",
      task: "Interim Review",
      dueDate: "2024-05-30",
      daysLeft: 36,
      priority: "medium",
      assignee: "Compliance Team",
    },
    {
      certification: "ISO 27001",
      task: "Management Review",
      dueDate: "2024-06-10",
      daysLeft: 47,
      priority: "medium",
      assignee: "CISO",
    },
    {
      certification: "FedRAMP Moderate",
      task: "Security Assessment",
      dueDate: "2024-07-01",
      daysLeft: 68,
      priority: "critical",
      assignee: "DevSecOps Team",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "renewal_required":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "expired":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">Compliance Certification Tracker</h2>
            <p className="text-sm text-slate-600">Automated certification management and compliance monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="historical">Historical</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8">
            <Download className="h-3 w-3 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Certification Status Overview */}
        <Card className="col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Certification Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-slate-600" />
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">{cert.name}</h3>
                        <p className="text-xs text-slate-500">{cert.scope}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getStatusColor(cert.status)}`}>
                        {cert.status.replace("_", " ")}
                      </Badge>
                      {cert.daysUntilExpiry && (
                        <Badge variant="outline" className="text-xs">
                          {cert.daysUntilExpiry} days left
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={cert.progress} className="flex-1 h-1" />
                        <span className="text-xs font-medium">{cert.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Auditor</p>
                      <p className="text-xs font-medium text-slate-700">{cert.auditor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Next Audit</p>
                      <p className="text-xs font-medium text-slate-700">{cert.nextAudit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Risk Level</p>
                      <p className={`text-xs font-medium ${getRiskColor(cert.riskLevel)}`}>
                        {cert.riskLevel.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Expires: {cert.expiryDate}</span>
                      <span>Last Audit: {cert.lastAudit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      {cert.status === "renewal_required" && (
                        <Button size="sm" className="h-6 text-xs">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Renew
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Automated Tasks */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Automated Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {automatedTasks.map((task, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{task.task}</span>
                  {task.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : task.status === "running" ? (
                    <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="font-medium">{task.success}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items Processed:</span>
                    <span className="font-medium">{task.items}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Run:</span>
                    <span>{task.lastRun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Run:</span>
                    <span>{task.nextRun}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="col-span-12">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Compliance Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={
                        deadline.priority === "critical"
                          ? "destructive"
                          : deadline.priority === "high"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {deadline.priority}
                    </Badge>
                    <span className="text-xs text-slate-500">{deadline.daysLeft} days</span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-900 mb-1">{deadline.task}</h3>
                  <p className="text-xs text-slate-600 mb-2">{deadline.certification}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Due: {deadline.dueDate}</span>
                    <span>{deadline.assignee}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
