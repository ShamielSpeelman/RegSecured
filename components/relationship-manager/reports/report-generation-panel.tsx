import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Calendar, Clock, PlusCircle } from "lucide-react"

export function ReportGenerationPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          Generate New Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quarterly">Quarterly Review</SelectItem>
                <SelectItem value="annual">Annual Review</SelectItem>
                <SelectItem value="compliance">Compliance Assessment</SelectItem>
                <SelectItem value="risk">Risk Assessment</SelectItem>
                <SelectItem value="performance">Performance Report</SelectItem>
                <SelectItem value="custom">Custom Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Client</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acme">Acme Financial Services</SelectItem>
                <SelectItem value="global">Global Investments Ltd</SelectItem>
                <SelectItem value="horizon">Horizon Banking Group</SelectItem>
                <SelectItem value="stellar">Stellar Capital Partners</SelectItem>
                <SelectItem value="meridian">Meridian Trust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Time Period</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1-2024">Q1 2024</SelectItem>
                <SelectItem value="q4-2023">Q4 2023</SelectItem>
                <SelectItem value="q3-2023">Q3 2023</SelectItem>
                <SelectItem value="q2-2023">Q2 2023</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Template</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Template</SelectItem>
                <SelectItem value="executive">Executive Summary</SelectItem>
                <SelectItem value="detailed">Detailed Analysis</SelectItem>
                <SelectItem value="regulatory">Regulatory Format</SelectItem>
                <SelectItem value="custom">Custom Template</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-500 pt-2">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Est. time: 45 min</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Due: Today</span>
            </div>
          </div>

          <Button className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
