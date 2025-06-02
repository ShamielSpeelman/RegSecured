"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Eye, Upload, Search, Calendar, AlertTriangle, CheckCircle, Clock, X } from "lucide-react"
import { useState } from "react"

const documents = [
  {
    id: "1",
    name: "Passport Copy",
    type: "Identity Document",
    uploadDate: "2024-01-15",
    expiryDate: "2029-01-15",
    status: "verified",
    size: "2.4 MB",
    category: "identity",
  },
  {
    id: "2",
    name: "Driver's License",
    type: "Identity Document",
    uploadDate: "2024-01-15",
    expiryDate: "2026-06-30",
    status: "verified",
    size: "1.8 MB",
    category: "identity",
  },
  {
    id: "3",
    name: "Utility Bill - Electric",
    type: "Proof of Address",
    uploadDate: "2024-01-20",
    expiryDate: "2024-04-20",
    status: "verified",
    size: "1.2 MB",
    category: "address",
  },
  {
    id: "4",
    name: "Bank Statement",
    type: "Financial Document",
    uploadDate: "2024-01-25",
    expiryDate: "2024-07-25",
    status: "pending",
    size: "3.1 MB",
    category: "financial",
  },
  {
    id: "5",
    name: "Employment Letter",
    type: "Income Verification",
    uploadDate: "2024-01-28",
    expiryDate: "2024-07-28",
    status: "expired",
    size: "0.9 MB",
    category: "financial",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    case "expired":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Expired
        </Badge>
      )
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <X className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function DocumentLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const documentStats = {
    total: documents.length,
    verified: documents.filter((d) => d.status === "verified").length,
    pending: documents.filter((d) => d.status === "pending").length,
    expired: documents.filter((d) => d.status === "expired").length,
  }

  return (
    <DashboardLayout userRole="client">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/client">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Profile Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Document Library</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-slate-800 mb-2">Document Library</h1>
              <p className="text-slate-600 font-light">Access and manage your uploaded documents</p>
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload New Document
            </Button>
          </div>
        </div>

        {/* Document Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Documents</p>
                  <p className="text-2xl font-semibold">{documentStats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Verified</p>
                  <p className="text-2xl font-semibold text-green-600">{documentStats.verified}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Pending Review</p>
                  <p className="text-2xl font-semibold text-yellow-600">{documentStats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Expired</p>
                  <p className="text-2xl font-semibold text-red-600">{documentStats.expired}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="identity">Identity</TabsTrigger>
                  <TabsTrigger value="address">Address</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
            <CardDescription>All documents you've uploaded for verification and compliance purposes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        {document.name}
                      </div>
                    </TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {new Date(document.expiryDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(document.status)}</TableCell>
                    <TableCell className="text-slate-500">{document.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No documents found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Expiring Documents Alert */}
        {documentStats.expired > 0 && (
          <Card className="mt-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm">
                  You have {documentStats.expired} expired document{documentStats.expired > 1 ? "s" : ""} that need to
                  be renewed. Please upload updated versions to maintain your account status.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
