"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Plus,
  Edit,
  FileText,
  CalendarIcon,
  TrendingUp,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { format } from "date-fns"

interface CorporateAction {
  id: string
  type: "dividend" | "stock-split" | "rights-issue" | "bonus-issue" | "share-buyback" | "merger" | "spin-off"
  title: string
  description: string
  announcementDate: string
  recordDate: string
  paymentDate: string
  exDate: string
  status: "announced" | "pending-approval" | "approved" | "executed" | "completed" | "cancelled"
  shareClass: string
  ratio?: string
  amount?: number
  currency?: string
  eligibleShares: number
  totalValue?: number
  regulatoryFilings: string[]
  approvalRequired: boolean
  boardApproval?: boolean
  shareholderApproval?: boolean
}

interface RegulatoryFiling {
  id: string
  corporateActionId: string
  filingType: string
  jurisdiction: string
  filingDate: string
  status: "draft" | "submitted" | "approved" | "rejected"
  reference: string
  deadline: string
}

const mockCorporateActions: CorporateAction[] = [
  {
    id: "1",
    type: "dividend",
    title: "Q4 2023 Dividend Payment",
    description: "Final dividend payment for fiscal year 2023",
    announcementDate: "2024-01-15",
    recordDate: "2024-02-01",
    paymentDate: "2024-02-15",
    exDate: "2024-01-31",
    status: "approved",
    shareClass: "Class A Ordinary",
    amount: 0.25,
    currency: "USD",
    eligibleShares: 750000,
    totalValue: 187500,
    regulatoryFilings: ["Form 8-K", "Dividend Notice"],
    approvalRequired: true,
    boardApproval: true,
    shareholderApproval: false,
  },
  {
    id: "2",
    type: "stock-split",
    title: "2-for-1 Stock Split",
    description: "Stock split to increase liquidity and accessibility",
    announcementDate: "2024-01-20",
    recordDate: "2024-03-01",
    paymentDate: "2024-03-15",
    exDate: "2024-02-28",
    status: "pending-approval",
    shareClass: "Class A Ordinary",
    ratio: "2:1",
    eligibleShares: 750000,
    regulatoryFilings: ["Form 8-K", "Stock Split Notice"],
    approvalRequired: true,
    boardApproval: true,
    shareholderApproval: true,
  },
  {
    id: "3",
    type: "rights-issue",
    title: "Rights Issue for Capital Expansion",
    description: "Rights offering to existing shareholders for business expansion",
    announcementDate: "2024-02-01",
    recordDate: "2024-04-01",
    paymentDate: "2024-04-30",
    exDate: "2024-03-29",
    status: "announced",
    shareClass: "Class A Ordinary",
    ratio: "1:5",
    amount: 10.0,
    currency: "USD",
    eligibleShares: 750000,
    totalValue: 1500000,
    regulatoryFilings: ["Prospectus", "Rights Circular"],
    approvalRequired: true,
    boardApproval: false,
    shareholderApproval: false,
  },
]

const mockFilings: RegulatoryFiling[] = [
  {
    id: "1",
    corporateActionId: "1",
    filingType: "Form 8-K",
    jurisdiction: "SEC (United States)",
    filingDate: "2024-01-16",
    status: "approved",
    reference: "8K-2024-001",
    deadline: "2024-01-19",
  },
  {
    id: "2",
    corporateActionId: "2",
    filingType: "Stock Split Notice",
    jurisdiction: "Cayman Islands",
    filingDate: "2024-01-21",
    status: "submitted",
    reference: "SSN-2024-001",
    deadline: "2024-01-25",
  },
  {
    id: "3",
    corporateActionId: "3",
    filingType: "Prospectus",
    jurisdiction: "SEC (United States)",
    filingDate: "",
    status: "draft",
    reference: "PROS-2024-001",
    deadline: "2024-02-15",
  },
]

export default function CorporateActionsPage() {
  const [corporateActions, setCorporateActions] = useState<CorporateAction[]>(mockCorporateActions)
  const [filings, setFilings] = useState<RegulatoryFiling[]>(mockFilings)
  const [isAddActionOpen, setIsAddActionOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const getStatusBadge = (status: string) => {
    const variants = {
      announced: "bg-blue-100 text-blue-800",
      "pending-approval": "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      executed: "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      draft: "bg-gray-100 text-gray-800",
      submitted: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status.replace("-", " ")}</Badge>
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dividend":
        return <DollarSign className="h-4 w-4" />
      case "stock-split":
        return <TrendingUp className="h-4 w-4" />
      case "rights-issue":
        return <Activity className="h-4 w-4" />
      case "bonus-issue":
        return <Plus className="h-4 w-4" />
      case "share-buyback":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "dividend":
        return "text-green-600"
      case "stock-split":
        return "text-blue-600"
      case "rights-issue":
        return "text-purple-600"
      case "bonus-issue":
        return "text-orange-600"
      case "share-buyback":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const totalValue = corporateActions
    .filter((action) => action.totalValue)
    .reduce((sum, action) => sum + (action.totalValue || 0), 0)

  const pendingApprovals = corporateActions.filter(
    (action) => action.status === "pending-approval" || action.status === "announced",
  ).length

  return (
    <DashboardLayout userRole="client">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">Corporate Actions</h1>
            <p className="text-stone-600 mt-1">
              Manage corporate actions, regulatory filings, and shareholder communications
            </p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Actions</CardTitle>
              <Activity className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {corporateActions.filter((a) => a.status !== "completed" && a.status !== "cancelled").length}
              </div>
              <p className="text-xs text-stone-600">{pendingApprovals} pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-stone-600">Across all actions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Regulatory Filings</CardTitle>
              <FileText className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filings.length}</div>
              <p className="text-xs text-stone-600">{filings.filter((f) => f.status === "draft").length} in draft</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Good</div>
              <p className="text-xs text-stone-600">All deadlines met</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="actions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="actions">Corporate Actions</TabsTrigger>
            <TabsTrigger value="filings">Regulatory Filings</TabsTrigger>
            <TabsTrigger value="calendar">Action Calendar</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Corporate Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Corporate Actions</CardTitle>
                    <CardDescription>Track and manage all corporate actions and their execution</CardDescription>
                  </div>
                  <Dialog open={isAddActionOpen} onOpenChange={setIsAddActionOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Action
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Create Corporate Action</DialogTitle>
                        <DialogDescription>Set up a new corporate action for shareholders</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="action-type">Action Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select action type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dividend">Dividend Payment</SelectItem>
                              <SelectItem value="stock-split">Stock Split</SelectItem>
                              <SelectItem value="rights-issue">Rights Issue</SelectItem>
                              <SelectItem value="bonus-issue">Bonus Issue</SelectItem>
                              <SelectItem value="share-buyback">Share Buyback</SelectItem>
                              <SelectItem value="merger">Merger</SelectItem>
                              <SelectItem value="spin-off">Spin-off</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="action-title">Title</Label>
                          <Input id="action-title" placeholder="Enter action title" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="action-description">Description</Label>
                          <Textarea id="action-description" placeholder="Enter detailed description" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="share-class">Share Class</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select share class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="class-a">Class A Ordinary</SelectItem>
                              <SelectItem value="class-b">Class B Preferred</SelectItem>
                              <SelectItem value="class-c">Class C Employee</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="announcement-date">Announcement Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="record-date">Record Date</Label>
                          <Input id="record-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="payment-date">Payment/Execution Date</Label>
                          <Input id="payment-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount/Ratio</Label>
                          <Input id="amount" placeholder="Enter amount or ratio (e.g., 0.25 or 2:1)" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                              <SelectItem value="SGD">SGD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddActionOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddActionOpen(false)}>Create Action</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {corporateActions.map((action) => (
                    <Card key={action.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-stone-100 ${getTypeColor(action.type)}`}>
                              {getTypeIcon(action.type)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{action.title}</h3>
                              <p className="text-sm text-stone-600 capitalize">{action.type.replace("-", " ")}</p>
                            </div>
                            {getStatusBadge(action.status)}
                          </div>

                          <p className="text-stone-700">{action.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-stone-600">Announcement:</span>
                              <div className="font-medium">
                                {new Date(action.announcementDate).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-stone-600">Record Date:</span>
                              <div className="font-medium">{new Date(action.recordDate).toLocaleDateString()}</div>
                            </div>
                            <div>
                              <span className="text-stone-600">Payment Date:</span>
                              <div className="font-medium">{new Date(action.paymentDate).toLocaleDateString()}</div>
                            </div>
                            <div>
                              <span className="text-stone-600">Share Class:</span>
                              <div className="font-medium">{action.shareClass}</div>
                            </div>
                          </div>

                          {(action.amount || action.ratio) && (
                            <div className="flex space-x-6 text-sm">
                              {action.amount && (
                                <div>
                                  <span className="text-stone-600">Amount:</span>
                                  <span className="font-medium ml-1">
                                    {action.currency} {action.amount}
                                  </span>
                                </div>
                              )}
                              {action.ratio && (
                                <div>
                                  <span className="text-stone-600">Ratio:</span>
                                  <span className="font-medium ml-1">{action.ratio}</span>
                                </div>
                              )}
                              {action.totalValue && (
                                <div>
                                  <span className="text-stone-600">Total Value:</span>
                                  <span className="font-medium ml-1">
                                    {action.currency} {action.totalValue.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <span className="text-stone-600">Board Approval:</span>
                              {action.boardApproval ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                              )}
                            </div>
                            {action.shareholderApproval !== undefined && (
                              <div className="flex items-center space-x-1">
                                <span className="text-stone-600">Shareholder Approval:</span>
                                {action.shareholderApproval ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {action.regulatoryFilings.map((filing, index) => (
                              <Badge key={index} variant="outline">
                                {filing}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regulatory Filings Tab */}
          <TabsContent value="filings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Regulatory Filings</CardTitle>
                    <CardDescription>Track regulatory submissions and compliance deadlines</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Filing
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filing Type</TableHead>
                      <TableHead>Corporate Action</TableHead>
                      <TableHead>Jurisdiction</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filings.map((filing) => {
                      const relatedAction = corporateActions.find((a) => a.id === filing.corporateActionId)
                      return (
                        <TableRow key={filing.id}>
                          <TableCell className="font-medium">{filing.filingType}</TableCell>
                          <TableCell>{relatedAction?.title || "N/A"}</TableCell>
                          <TableCell>{filing.jurisdiction}</TableCell>
                          <TableCell>
                            {filing.filingDate ? new Date(filing.filingDate).toLocaleDateString() : "Not filed"}
                          </TableCell>
                          <TableCell>{new Date(filing.deadline).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(filing.status)}</TableCell>
                          <TableCell>{filing.reference}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Corporate Action Calendar</CardTitle>
                <CardDescription>View upcoming dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                    <div className="space-y-3">
                      {corporateActions
                        .filter((action) => new Date(action.paymentDate) > new Date())
                        .sort((a, b) => new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime())
                        .slice(0, 5)
                        .map((action) => (
                          <div key={action.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <div className={`p-2 rounded ${getTypeColor(action.type)} bg-stone-100`}>
                              {getTypeIcon(action.type)}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{action.title}</div>
                              <div className="text-sm text-stone-600">
                                {new Date(action.paymentDate).toLocaleDateString()}
                              </div>
                            </div>
                            {getStatusBadge(action.status)}
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Filing Deadlines</h3>
                    <div className="space-y-3">
                      {filings
                        .filter((filing) => new Date(filing.deadline) > new Date() && filing.status !== "approved")
                        .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                        .slice(0, 5)
                        .map((filing) => (
                          <div key={filing.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{filing.filingType}</div>
                              <div className="text-sm text-stone-600">{filing.jurisdiction}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {new Date(filing.deadline).toLocaleDateString()}
                              </div>
                              {getStatusBadge(filing.status)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Action Templates</CardTitle>
                <CardDescription>Pre-configured templates for common corporate actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      type: "dividend",
                      title: "Quarterly Dividend",
                      description: "Standard quarterly dividend payment template",
                    },
                    { type: "stock-split", title: "Stock Split", description: "Template for stock split actions" },
                    {
                      type: "rights-issue",
                      title: "Rights Issue",
                      description: "Rights offering template for capital raising",
                    },
                    { type: "bonus-issue", title: "Bonus Issue", description: "Bonus share issuance template" },
                    { type: "share-buyback", title: "Share Buyback", description: "Share repurchase program template" },
                    { type: "merger", title: "Merger", description: "Corporate merger action template" },
                  ].map((template, index) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg bg-stone-100 ${getTypeColor(template.type)}`}>
                          {getTypeIcon(template.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{template.title}</h3>
                          <p className="text-sm text-stone-600">{template.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Use Template
                      </Button>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
