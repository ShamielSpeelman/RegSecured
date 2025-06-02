import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Copy, Trash2 } from "lucide-react"

export function CommunicationTemplates() {
  const templates = [
    {
      id: 1,
      name: "Welcome Message",
      category: "Onboarding",
      description: "Initial welcome message for new clients",
      usage: 45,
      lastUsed: "2 days ago",
      content: "Welcome to our platform! We're excited to begin your onboarding journey...",
    },
    {
      id: 2,
      name: "Document Request",
      category: "KYC",
      description: "Request for additional documentation",
      usage: 32,
      lastUsed: "1 day ago",
      content: "We require additional documentation to complete your KYC process...",
    },
    {
      id: 3,
      name: "Review Complete",
      category: "Compliance",
      description: "Notification of completed compliance review",
      usage: 28,
      lastUsed: "3 hours ago",
      content: "Your compliance review has been completed successfully...",
    },
    {
      id: 4,
      name: "Meeting Invitation",
      category: "Meetings",
      description: "Template for scheduling client meetings",
      usage: 19,
      lastUsed: "5 days ago",
      content: "I would like to schedule a meeting to discuss your application...",
    },
    {
      id: 5,
      name: "Status Update",
      category: "General",
      description: "General status update template",
      usage: 67,
      lastUsed: "1 hour ago",
      content: "I wanted to provide you with an update on your application status...",
    },
    {
      id: 6,
      name: "Urgent Follow-up",
      category: "Urgent",
      description: "Template for urgent client follow-ups",
      usage: 12,
      lastUsed: "1 week ago",
      content: "This is an urgent follow-up regarding your application...",
    },
    {
      id: 7,
      name: "Data Deletion Request",
      category: "Privacy",
      description: "Template for processing GDPR data deletion requests",
      usage: 8,
      lastUsed: "3 days ago",
      content: "We have received your request for data deletion under GDPR Article 17...",
    },
    {
      id: 8,
      name: "Notification of PEP",
      category: "Risk",
      description: "Notification when client is identified as Politically Exposed Person",
      usage: 15,
      lastUsed: "1 week ago",
      content: "Our screening has identified you as a Politically Exposed Person (PEP)...",
    },
    {
      id: 9,
      name: "Sanctions Notice",
      category: "Risk",
      description: "Notification of sanctions screening results",
      usage: 6,
      lastUsed: "2 weeks ago",
      content: "Our sanctions screening has identified a potential match that requires review...",
    },
    {
      id: 10,
      name: "Annual Client Review",
      category: "Compliance",
      description: "Annual review notification and requirements",
      usage: 34,
      lastUsed: "4 days ago",
      content: "As part of our annual compliance review, we need to update your information...",
    },
    {
      id: 11,
      name: "Document Expiry Notification",
      category: "KYC",
      description: "Notification of expiring identification documents",
      usage: 42,
      lastUsed: "6 hours ago",
      content: "Your identification document is due to expire soon. Please provide updated documentation...",
    },
    {
      id: 12,
      name: "Account Blocked Notice",
      category: "Risk",
      description: "Notification of account or transaction blocking",
      usage: 9,
      lastUsed: "2 days ago",
      content: "Your account has been temporarily blocked due to suspicious activity...",
    },
    {
      id: 13,
      name: "Risk Rating Change",
      category: "Risk",
      description: "Notification of client risk rating changes",
      usage: 21,
      lastUsed: "1 day ago",
      content: "Your risk rating has been updated based on recent assessment...",
    },
    {
      id: 14,
      name: "Enhanced Due Diligence",
      category: "Compliance",
      description: "Request for enhanced due diligence information",
      usage: 18,
      lastUsed: "3 days ago",
      content: "Based on our risk assessment, we require enhanced due diligence information...",
    },
    {
      id: 15,
      name: "Source of Funds Clarification",
      category: "AML",
      description: "Request for source of funds documentation",
      usage: 25,
      lastUsed: "2 days ago",
      content: "Please provide documentation to clarify the source of your funds...",
    },
    {
      id: 16,
      name: "Beneficial Ownership Update",
      category: "KYC",
      description: "Request to update beneficial ownership information",
      usage: 16,
      lastUsed: "5 days ago",
      content: "Please update your beneficial ownership information as required by regulations...",
    },
    {
      id: 17,
      name: "Adverse Media Alert",
      category: "Risk",
      description: "Notification of adverse media findings",
      usage: 7,
      lastUsed: "1 week ago",
      content: "Our monitoring has identified adverse media coverage that requires discussion...",
    },
    {
      id: 18,
      name: "Transaction Monitoring Alert",
      category: "AML",
      description: "Notification of unusual transaction patterns",
      usage: 13,
      lastUsed: "4 hours ago",
      content: "Our transaction monitoring has flagged unusual activity on your account...",
    },
    {
      id: 19,
      name: "Regulatory Update Notice",
      category: "Compliance",
      description: "Notification of regulatory changes affecting clients",
      usage: 29,
      lastUsed: "1 week ago",
      content: "Important regulatory changes may affect your account. Please review the following...",
    },
    {
      id: 20,
      name: "Account Closure Notice",
      category: "General",
      description: "Notification of account closure procedures",
      usage: 11,
      lastUsed: "3 weeks ago",
      content: "We have received your request to close your account. Please note the following procedures...",
    },
    {
      id: 21,
      name: "Remediation Action Required",
      category: "Compliance",
      description: "Notification of required remediation actions",
      usage: 14,
      lastUsed: "2 days ago",
      content: "Immediate action is required to remediate compliance issues identified...",
    },
    {
      id: 22,
      name: "Data Breach Notification",
      category: "Privacy",
      description: "Template for data breach notifications",
      usage: 2,
      lastUsed: "6 months ago",
      content: "We are writing to inform you of a data security incident that may affect your personal information...",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Onboarding":
        return "bg-blue-100 text-blue-800"
      case "KYC":
        return "bg-orange-100 text-orange-800"
      case "Compliance":
        return "bg-green-100 text-green-800"
      case "Meetings":
        return "bg-purple-100 text-purple-800"
      case "Urgent":
        return "bg-red-100 text-red-800"
      case "Risk":
        return "bg-yellow-100 text-yellow-800"
      case "AML":
        return "bg-indigo-100 text-indigo-800"
      case "Privacy":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search templates..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="onboarding">Onboarding</SelectItem>
              <SelectItem value="kyc">KYC</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="meetings">Meetings</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="risk">Risk</SelectItem>
              <SelectItem value="aml">AML</SelectItem>
              <SelectItem value="privacy">Privacy</SelectItem>
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
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 line-clamp-3">{template.content}</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Used {template.usage} times</span>
                  <span>Last used {template.lastUsed}</span>
                </div>
                <Button variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
