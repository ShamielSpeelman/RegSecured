import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Copy, ArrowRight } from "lucide-react"

export function TaskTemplates() {
  const templates = [
    {
      id: 1,
      name: "Annual Beneficial Ownership Verification",
      category: "KYC",
      description: "Annual verification of beneficial ownership information",
      communicationTemplate: "Beneficial Ownership Update",
      lastUsed: "2 days ago",
      estimatedCompletion: "5 days",
    },
    {
      id: 2,
      name: "PEP Status Review",
      category: "Risk",
      description: "Review and update of client's PEP status",
      communicationTemplate: "Notification of PEP",
      lastUsed: "1 week ago",
      estimatedCompletion: "3 days",
    },
    {
      id: 3,
      name: "Business Activity Update",
      category: "KYC",
      description: "Update client's business activities and operations",
      communicationTemplate: "Status Update",
      lastUsed: "3 days ago",
      estimatedCompletion: "7 days",
    },
    {
      id: 4,
      name: "Source of Funds Verification",
      category: "AML",
      description: "Verification of client's source of funds",
      communicationTemplate: "Source of Funds Clarification",
      lastUsed: "5 days ago",
      estimatedCompletion: "10 days",
    },
    {
      id: 5,
      name: "Risk Profile Reassessment",
      category: "Risk",
      description: "Comprehensive reassessment of client risk profile",
      communicationTemplate: "Risk Rating Change",
      lastUsed: "1 day ago",
      estimatedCompletion: "14 days",
    },
    {
      id: 6,
      name: "Contact Information Update",
      category: "General",
      description: "Update client contact information and communication preferences",
      communicationTemplate: "Status Update",
      lastUsed: "4 hours ago",
      estimatedCompletion: "2 days",
    },
    {
      id: 7,
      name: "Sanctions Screening Follow-up",
      category: "Compliance",
      description: "Follow-up on potential sanctions match",
      communicationTemplate: "Sanctions Notice",
      lastUsed: "2 weeks ago",
      estimatedCompletion: "1 day",
    },
    {
      id: 8,
      name: "Transaction Pattern Review",
      category: "AML",
      description: "Review of changes in transaction patterns",
      communicationTemplate: "Transaction Monitoring Alert",
      lastUsed: "1 week ago",
      estimatedCompletion: "5 days",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "KYC":
        return "bg-orange-100 text-orange-800"
      case "Risk":
        return "bg-yellow-100 text-yellow-800"
      case "AML":
        return "bg-indigo-100 text-indigo-800"
      case "Compliance":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search task templates..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="kyc">KYC</SelectItem>
              <SelectItem value="risk">Risk</SelectItem>
              <SelectItem value="aml">AML</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                </div>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Communication Template:</span>
                    <span className="font-medium">{template.communicationTemplate}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Est. Completion Time:</span>
                    <span className="font-medium">{template.estimatedCompletion}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Last Used:</span>
                    <span className="font-medium">{template.lastUsed}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button className="flex-1">
                    Use
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
