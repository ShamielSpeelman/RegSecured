"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, CheckCircle, Clock, AlertTriangle, Download, Eye, MessageSquare } from "lucide-react"

export function DocumentCollectionStatus() {
  const documentRequests = [
    {
      clientId: "ONB-2024-001",
      clientName: "Acme Corporation Ltd",
      totalDocuments: 12,
      collectedDocuments: 9,
      pendingDocuments: 3,
      documents: [
        { name: "Certificate of Incorporation", status: "collected", uploadDate: "2024-02-10", size: "2.4 MB" },
        { name: "Articles of Association", status: "collected", uploadDate: "2024-02-10", size: "1.8 MB" },
        { name: "Board Resolution", status: "collected", uploadDate: "2024-02-11", size: "0.9 MB" },
        { name: "Beneficial Ownership Declaration", status: "pending", dueDate: "2024-02-15" },
        { name: "Financial Statements (Latest)", status: "pending", dueDate: "2024-02-15" },
        { name: "Bank Reference Letter", status: "under-review", uploadDate: "2024-02-12", size: "0.5 MB" },
      ],
      lastActivity: "2 hours ago",
    },
    {
      clientId: "ONB-2024-002",
      clientName: "John Smith",
      totalDocuments: 8,
      collectedDocuments: 4,
      pendingDocuments: 4,
      documents: [
        { name: "Passport Copy", status: "collected", uploadDate: "2024-02-09", size: "1.2 MB" },
        { name: "Proof of Address", status: "collected", uploadDate: "2024-02-09", size: "0.8 MB" },
        { name: "Bank Statement", status: "under-review", uploadDate: "2024-02-11", size: "2.1 MB" },
        { name: "Source of Funds Declaration", status: "pending", dueDate: "2024-02-18" },
        { name: "Employment Letter", status: "pending", dueDate: "2024-02-18" },
      ],
      lastActivity: "1 day ago",
    },
  ]

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "collected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "under-review":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "collected":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Collected
          </Badge>
        )
      case "under-review":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Under Review
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {documentRequests.map((request, index) => {
        const completionRate = Math.round((request.collectedDocuments / request.totalDocuments) * 100)

        return (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{request.clientName}</CardTitle>
                  <CardDescription>{request.clientId}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
                  <div className="text-sm text-muted-foreground">
                    {request.collectedDocuments} of {request.totalDocuments} collected
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={completionRate} className="h-3" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>{request.collectedDocuments} Collected</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Under Review</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span>{request.pendingDocuments} Pending</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {request.documents.map((doc, docIndex) => (
                    <div key={docIndex} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getDocumentStatusIcon(doc.status)}
                        <div>
                          <div className="font-medium text-sm">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {doc.status === "collected" || doc.status === "under-review"
                              ? `Uploaded ${doc.uploadDate} • ${doc.size}`
                              : `Due ${doc.dueDate}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getDocumentStatusBadge(doc.status)}
                        {(doc.status === "collected" || doc.status === "under-review") && (
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        {doc.status === "pending" && (
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Request
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-muted-foreground">Last activity {request.lastActivity}</div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Client
                    </Button>
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
