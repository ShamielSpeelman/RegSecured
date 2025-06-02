"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  CalendarIcon,
  Download,
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3,
  Settings,
  Zap,
  Globe,
  Building,
} from "lucide-react"

export function AutomatedRegulatoryReporting() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [date, setDate] = useState<Date | undefined>(new Date())

  const regulatoryReports = [
    {
      name: "Suspicious Activity Report (SAR)",
      jurisdiction: "US - FinCEN",
      frequency: "As needed",
      nextDue: "2024-05-15",
      status: "draft",
      progress: 78,
      lastSubmitted: "2024-03-12",
      automationLevel: 85,
      dataPoints: 156,
      estimatedTime: "2 hours",
    },
    {
      name: "Currency Transaction Report (CTR)",
      jurisdiction: "US - FinCEN",
      frequency: "Daily",
      nextDue: "2024-04-25",
      status: "ready",
      progress: 100,
      lastSubmitted: "2024-04-24",
      automationLevel: 95,
      dataPoints: 89,
      estimatedTime: "15 minutes",
    },
    {
      name: "GDPR Data Processing Report",
      jurisdiction: "EU - DPA",
      frequency: "Quarterly",
      nextDue: "2024-06-30",
      status: "in_progress",
      progress: 45,
      lastSubmitted: "2024-03-31",
      automationLevel: 72,
      dataPoints: 234,
      estimatedTime: "4 hours",
    },
    {
      name: "Basel III Capital Adequacy",
      jurisdiction: "Global - BCBS",
      frequency: "Quarterly",
      nextDue: "2024-07-15",
      status: "scheduled",
      progress: 12,
      lastSubmitted: "2024-04-15",
      automationLevel: 68,
      dataPoints: 445,
      estimatedTime: "8 hours",
    },
    {
      name: "FINTRAC Large Cash Transaction",
      jurisdiction: "Canada - FINTRAC",
      frequency: "Daily",
      nextDue: "2024-04-25",
      status: "submitted",
      progress: 100,
      lastSubmitted: "2024-04-24",
      automationLevel: 92,
      dataPoints: 67,
      estimatedTime: "20 minutes",
    },
    {
      name: "MiFID II Transaction Reporting",
      jurisdiction: "EU - ESMA",
      frequency: "Daily",
      nextDue: "2024-04-25",
      status: "ready",
      progress: 100,
      lastSubmitted: "2024-04-24",
      automationLevel: 88,
      dataPoints: 1234,
      estimatedTime: "30 minutes",
    },
  ]

  const automationWorkflows = [
    {
      name: "Data Collection",
      status: "active",
      lastRun: "2 minutes ago",
      nextRun: "Continuous",
      success: 98,
      sources: 12,
      records: 15678,
    },
    {
      name: "Data Validation",
      status: "active",
      lastRun: "5 minutes ago",
      nextRun: "Every 15 minutes",
      success: 94,
      sources: 8,
      records: 14523,
    },
    {
      name: "Report Generation",
      status: "completed",
      lastRun: "1 hour ago",
      nextRun: "Daily at 6:00 AM",
      success: 99,
      sources: 15,
      records: 8934,
    },
    {
      name: "Regulatory Submission",
      status: "scheduled",
      lastRun: "Yesterday",
      nextRun: "Tomorrow at 9:00 AM",
      success: 96,
      sources: 6,
      records: 234,
    },
  ]

  const complianceMetrics = [
    {
      metric: "On-time Submissions",
      value: "98.5%",
      change: "+2.1%",
      trend: "up",
      target: "95%",
    },
    {
      metric: "Automation Coverage",
      value: "87%",
      change: "+5.3%",
      trend: "up",
      target: "90%",
    },
    {
      metric: "Data Accuracy",
      value: "99.2%",
      change: "+0.8%",
      trend: "up",
      target: "99%",
    },
    {
      metric: "Processing Time",
      value: "2.3h",
      change: "-15%",
      trend: "down",
      target: "< 3h",
    },
  ]

  const upcomingDeadlines = [
    {
      report: "CTR Daily Submission",
      jurisdiction: "US",
      dueDate: "2024-04-25",
      hoursLeft: 8,
      priority: "high",
      automated: true,
    },
    {
      report: "FINTRAC Large Cash",
      jurisdiction: "Canada",
      dueDate: "2024-04-25",
      hoursLeft: 8,
      priority: "high",
      automated: true,
    },
    {
      report: "MiFID II Transaction",
      jurisdiction: "EU",
      dueDate: "2024-04-25",
      hoursLeft: 8,
      priority: "medium",
      automated: true,
    },
    {
      report: "SAR Investigation",
      jurisdiction: "US",
      dueDate: "2024-05-15",
      hoursLeft: 504,
      priority: "critical",
      automated: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800 border-green-200"
      case "ready":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "scheduled":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">Automated Regulatory Reporting</h2>
            <p className="text-sm text-slate-600">Streamlined compliance reporting with intelligent automation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jurisdictions</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="eu">European Union</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="global">Global</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8">
            <Download className="h-3 w-3 mr-2" />
            Export Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Compliance Metrics */}
        <Card className="col-span-12">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Compliance Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {complianceMetrics.map((metric, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">{metric.metric}</span>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900">{metric.value}</span>
                    <span className="text-xs text-slate-500">Target: {metric.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regulatory Reports */}
        <Card className="col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Regulatory Reports Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {regulatoryReports.map((report, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Building className="h-4 w-4 text-slate-600" />
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">{report.name}</h3>
                        <p className="text-xs text-slate-500">
                          {report.jurisdiction} • {report.frequency}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                        {report.status.replace("_", " ")}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {report.automationLevel}% automated
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={report.progress} className="flex-1 h-1" />
                        <span className="text-xs font-medium">{report.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Next Due</p>
                      <p className="text-xs font-medium text-slate-700">{report.nextDue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Data Points</p>
                      <p className="text-xs font-medium text-slate-700">{report.dataPoints}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Est. Time</p>
                      <p className="text-xs font-medium text-slate-700">{report.estimatedTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Last Submitted</p>
                      <p className="text-xs font-medium text-slate-700">{report.lastSubmitted}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {report.status === "ready" && (
                        <Button size="sm" className="h-6 text-xs">
                          <Send className="h-3 w-3 mr-1" />
                          Submit Now
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                    {report.automationLevel < 90 && (
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        Enhance Automation
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Automation Workflows */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Automation Workflows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {automationWorkflows.map((workflow, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{workflow.name}</span>
                  {workflow.status === "active" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : workflow.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="font-medium">{workflow.success}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sources:</span>
                    <span className="font-medium">{workflow.sources}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Records:</span>
                    <span className="font-medium">{workflow.records.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Run:</span>
                    <span>{workflow.lastRun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Run:</span>
                    <span>{workflow.nextRun}</span>
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
              <CalendarIcon className="h-4 w-4" />
              Upcoming Submission Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`text-xs ${getPriorityColor(deadline.priority)}`}>{deadline.priority}</Badge>
                    <div className="flex items-center gap-1">
                      {deadline.automated ? (
                        <Zap className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                      )}
                      <span className="text-xs text-slate-500">{deadline.automated ? "Auto" : "Manual"}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-slate-900 mb-1">{deadline.report}</h3>
                  <p className="text-xs text-slate-600 mb-2">{deadline.jurisdiction}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Due: {deadline.dueDate}</span>
                    <span>{deadline.hoursLeft}h left</span>
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
