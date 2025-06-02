"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, FileText, Copy } from "lucide-react"

export function MeetingTemplates() {
  const templates = [
    {
      id: "1",
      name: "Onboarding Kickoff",
      description: "Initial meeting to welcome new clients and outline the onboarding process",
      duration: "60 minutes",
      participants: ["Client", "Relationship Manager", "Compliance Officer"],
      agenda: [
        "Welcome and introductions",
        "Overview of onboarding process",
        "Required documentation review",
        "Timeline and next steps",
        "Q&A session",
      ],
      category: "Onboarding",
    },
    {
      id: "2",
      name: "KYC Review Meeting",
      description: "Comprehensive review of Know Your Customer documentation and verification",
      duration: "45 minutes",
      participants: ["Client", "Relationship Manager", "KYC Analyst"],
      agenda: [
        "Review submitted KYC documents",
        "Verify client information",
        "Address any discrepancies",
        "Additional documentation requirements",
        "Next steps and timeline",
      ],
      category: "Compliance",
    },
    {
      id: "3",
      name: "Document Review Session",
      description: "Detailed review of client-submitted documents for completeness and accuracy",
      duration: "30 minutes",
      participants: ["Client", "Relationship Manager"],
      agenda: [
        "Document completeness check",
        "Quality and accuracy review",
        "Compliance verification",
        "Required corrections or additions",
        "Approval process overview",
      ],
      category: "Documentation",
    },
    {
      id: "4",
      name: "Compliance Check Meeting",
      description: "Regular compliance status review and regulatory requirement assessment",
      duration: "45 minutes",
      participants: ["Client", "Relationship Manager", "Compliance Officer"],
      agenda: [
        "Current compliance status review",
        "Regulatory requirements update",
        "Risk assessment discussion",
        "Remediation actions if needed",
        "Timeline for completion",
      ],
      category: "Compliance",
    },
    {
      id: "5",
      name: "Follow-up Meeting",
      description: "General follow-up meeting to address outstanding items and next steps",
      duration: "30 minutes",
      participants: ["Client", "Relationship Manager"],
      agenda: [
        "Review of previous meeting action items",
        "Status update on pending tasks",
        "Address any new concerns",
        "Plan next steps",
        "Schedule future meetings",
      ],
      category: "General",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Onboarding":
        return "bg-purple-100 text-purple-800"
      case "Compliance":
        return "bg-red-100 text-red-800"
      case "Documentation":
        return "bg-yellow-100 text-yellow-800"
      case "General":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  return (
    <Card className="border-stone-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stone-900">Meeting Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-stone-900 mb-1">{template.name}</h4>
                  <p className="text-xs text-stone-600 mb-2">{template.description}</p>
                  <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                </div>
                <Button variant="outline" size="sm">
                  <Copy className="h-3 w-3 mr-1" />
                  Use
                </Button>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center space-x-2 text-xs text-stone-600">
                  <Clock className="h-3 w-3" />
                  <span>{template.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-stone-600">
                  <Users className="h-3 w-3" />
                  <span>{template.participants.length} participants</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1 text-xs text-stone-600 mb-1">
                  <FileText className="h-3 w-3" />
                  <span>Agenda:</span>
                </div>
                <ul className="text-xs text-stone-600 space-y-1">
                  {template.agenda.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <span className="text-stone-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {template.agenda.length > 3 && (
                    <li className="text-stone-400 italic">+{template.agenda.length - 3} more items...</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
