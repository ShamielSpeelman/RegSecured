"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Progress } from "@/components/ui/progress"
import { Plus, Edit, TrendingUp, Users, Building, PieChart, ArrowUpDown } from "lucide-react"

interface Shareholder {
  id: string
  name: string
  type: "individual" | "corporate" | "institutional"
  shareClass: string
  sharesHeld: number
  ownershipPercentage: number
  votingRights: number
  registrationDate: string
  status: "active" | "pending" | "transferred"
  contactEmail: string
  jurisdiction: string
}

interface ShareClass {
  id: string
  className: string
  totalShares: number
  issuedShares: number
  parValue: number
  votingRights: "full" | "limited" | "none"
  dividendRights: "preferential" | "ordinary" | "none"
  status: "active" | "suspended"
}

interface ShareTransfer {
  id: string
  transferDate: string
  fromShareholder: string
  toShareholder: string
  shareClass: string
  sharesTransferred: number
  transferPrice: number
  status: "pending" | "approved" | "completed" | "rejected"
  approvalRequired: boolean
}

const mockShareholders: Shareholder[] = [
  {
    id: "1",
    name: "ABC Investment Fund",
    type: "institutional",
    shareClass: "Class A Ordinary",
    sharesHeld: 500000,
    ownershipPercentage: 45.5,
    votingRights: 500000,
    registrationDate: "2022-01-15",
    status: "active",
    contactEmail: "contact@abcinvest.com",
    jurisdiction: "Cayman Islands",
  },
  {
    id: "2",
    name: "John Smith",
    type: "individual",
    shareClass: "Class A Ordinary",
    sharesHeld: 250000,
    ownershipPercentage: 22.7,
    votingRights: 250000,
    registrationDate: "2022-01-15",
    status: "active",
    contactEmail: "john.smith@email.com",
    jurisdiction: "United States",
  },
  {
    id: "3",
    name: "TechCorp Holdings Ltd",
    type: "corporate",
    shareClass: "Class B Preferred",
    sharesHeld: 200000,
    ownershipPercentage: 18.2,
    votingRights: 0,
    registrationDate: "2022-03-01",
    status: "active",
    contactEmail: "legal@techcorp.com",
    jurisdiction: "British Virgin Islands",
  },
  {
    id: "4",
    name: "Employee Stock Plan",
    type: "institutional",
    shareClass: "Class C Employee",
    sharesHeld: 150000,
    ownershipPercentage: 13.6,
    votingRights: 75000,
    registrationDate: "2022-06-01",
    status: "active",
    contactEmail: "hr@company.com",
    jurisdiction: "Delaware",
  },
]

const mockShareClasses: ShareClass[] = [
  {
    id: "1",
    className: "Class A Ordinary",
    totalShares: 1000000,
    issuedShares: 750000,
    parValue: 0.01,
    votingRights: "full",
    dividendRights: "ordinary",
    status: "active",
  },
  {
    id: "2",
    className: "Class B Preferred",
    totalShares: 500000,
    issuedShares: 200000,
    parValue: 0.01,
    votingRights: "none",
    dividendRights: "preferential",
    status: "active",
  },
  {
    id: "3",
    className: "Class C Employee",
    totalShares: 300000,
    issuedShares: 150000,
    parValue: 0.01,
    votingRights: "limited",
    dividendRights: "ordinary",
    status: "active",
  },
]

const mockTransfers: ShareTransfer[] = [
  {
    id: "1",
    transferDate: "2024-01-15",
    fromShareholder: "John Smith",
    toShareholder: "ABC Investment Fund",
    shareClass: "Class A Ordinary",
    sharesTransferred: 50000,
    transferPrice: 125000,
    status: "pending",
    approvalRequired: true,
  },
  {
    id: "2",
    transferDate: "2023-12-20",
    fromShareholder: "TechCorp Holdings Ltd",
    toShareholder: "New Investor Corp",
    shareClass: "Class B Preferred",
    sharesTransferred: 25000,
    transferPrice: 75000,
    status: "completed",
    approvalRequired: true,
  },
]

export default function ShareholderRegistryPage() {
  const [shareholders, setShareholders] = useState<Shareholder[]>(mockShareholders)
  const [shareClasses, setShareClasses] = useState<ShareClass[]>(mockShareClasses)
  const [transfers, setTransfers] = useState<ShareTransfer[]>(mockTransfers)
  const [isAddShareholderOpen, setIsAddShareholderOpen] = useState(false)
  const [isAddTransferOpen, setIsAddTransferOpen] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "individual":
        return <Users className="h-4 w-4" />
      case "corporate":
        return <Building className="h-4 w-4" />
      case "institutional":
        return <PieChart className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      transferred: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      completed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  const totalShares = shareholders.reduce((sum, sh) => sum + sh.sharesHeld, 0)
  const totalVotingRights = shareholders.reduce((sum, sh) => sum + sh.votingRights, 0)

  return (
    <DashboardLayout userRole="client">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">Shareholder Registry</h1>
            <p className="text-stone-600 mt-1">Manage shareholders, share classes, and ownership transfers</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shareholders</CardTitle>
              <Users className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shareholders.length}</div>
              <p className="text-xs text-stone-600">
                {shareholders.filter((s) => s.status === "active").length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issued Shares</CardTitle>
              <TrendingUp className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalShares.toLocaleString()}</div>
              <p className="text-xs text-stone-600">Across {shareClasses.length} share classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Voting Rights</CardTitle>
              <PieChart className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVotingRights.toLocaleString()}</div>
              <p className="text-xs text-stone-600">Total voting shares</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-stone-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transfers.filter((t) => t.status === "pending").length}</div>
              <p className="text-xs text-stone-600">Requiring approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="shareholders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="shareholders">Shareholders</TabsTrigger>
            <TabsTrigger value="share-classes">Share Classes</TabsTrigger>
            <TabsTrigger value="transfers">Share Transfers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Shareholders Tab */}
          <TabsContent value="shareholders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Shareholder Registry</CardTitle>
                    <CardDescription>Manage shareholder information and ownership details</CardDescription>
                  </div>
                  <Dialog open={isAddShareholderOpen} onOpenChange={setIsAddShareholderOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Shareholder
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Shareholder</DialogTitle>
                        <DialogDescription>Enter the details for the new shareholder</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="sh-name">Shareholder Name</Label>
                          <Input id="sh-name" placeholder="Enter name or entity name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sh-type">Shareholder Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="corporate">Corporate</SelectItem>
                              <SelectItem value="institutional">Institutional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sh-email">Contact Email</Label>
                          <Input id="sh-email" type="email" placeholder="Enter email address" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sh-jurisdiction">Jurisdiction</Label>
                          <Input id="sh-jurisdiction" placeholder="Enter jurisdiction" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sh-class">Share Class</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select share class" />
                            </SelectTrigger>
                            <SelectContent>
                              {shareClasses.map((sc) => (
                                <SelectItem key={sc.id} value={sc.className}>
                                  {sc.className}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sh-shares">Number of Shares</Label>
                          <Input id="sh-shares" type="number" placeholder="Enter number of shares" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddShareholderOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddShareholderOpen(false)}>Add Shareholder</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shareholder</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Share Class</TableHead>
                      <TableHead>Shares Held</TableHead>
                      <TableHead>Ownership %</TableHead>
                      <TableHead>Voting Rights</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shareholders.map((shareholder) => (
                      <TableRow key={shareholder.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(shareholder.type)}
                            <div>
                              <div className="font-medium">{shareholder.name}</div>
                              <div className="text-sm text-stone-600">{shareholder.jurisdiction}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{shareholder.type}</TableCell>
                        <TableCell>{shareholder.shareClass}</TableCell>
                        <TableCell>{shareholder.sharesHeld.toLocaleString()}</TableCell>
                        <TableCell>{shareholder.ownershipPercentage.toFixed(1)}%</TableCell>
                        <TableCell>{shareholder.votingRights.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(shareholder.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Share Classes Tab */}
          <TabsContent value="share-classes" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Share Classes</CardTitle>
                    <CardDescription>Manage different classes of shares and their rights</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Share Class
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shareClasses.map((shareClass) => (
                    <Card key={shareClass.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{shareClass.className}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-stone-600">Total Authorized:</span>
                                <div className="font-medium">{shareClass.totalShares.toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-stone-600">Issued:</span>
                                <div className="font-medium">{shareClass.issuedShares.toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-stone-600">Par Value:</span>
                                <div className="font-medium">${shareClass.parValue}</div>
                              </div>
                              <div>
                                <span className="text-stone-600">Status:</span>
                                <div className="font-medium">{getStatusBadge(shareClass.status)}</div>
                              </div>
                            </div>
                            <div className="flex space-x-4 text-sm">
                              <div>
                                <span className="text-stone-600">Voting Rights:</span>
                                <Badge variant="outline" className="ml-1">
                                  {shareClass.votingRights}
                                </Badge>
                              </div>
                              <div>
                                <span className="text-stone-600">Dividend Rights:</span>
                                <Badge variant="outline" className="ml-1">
                                  {shareClass.dividendRights}
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Issued vs Authorized</span>
                                <span>{((shareClass.issuedShares / shareClass.totalShares) * 100).toFixed(1)}%</span>
                              </div>
                              <Progress
                                value={(shareClass.issuedShares / shareClass.totalShares) * 100}
                                className="h-2"
                              />
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Share Transfers Tab */}
          <TabsContent value="transfers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Share Transfers</CardTitle>
                    <CardDescription>Track and approve share transfer requests</CardDescription>
                  </div>
                  <Dialog open={isAddTransferOpen} onOpenChange={setIsAddTransferOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Transfer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Initiate Share Transfer</DialogTitle>
                        <DialogDescription>Create a new share transfer request</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="from-shareholder">From Shareholder</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select shareholder" />
                              </SelectTrigger>
                              <SelectContent>
                                {shareholders.map((sh) => (
                                  <SelectItem key={sh.id} value={sh.name}>
                                    {sh.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="to-shareholder">To Shareholder</Label>
                            <Input id="to-shareholder" placeholder="Enter recipient name" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="transfer-shares">Number of Shares</Label>
                            <Input id="transfer-shares" type="number" placeholder="Enter number of shares" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="transfer-price">Transfer Price</Label>
                            <Input id="transfer-price" type="number" placeholder="Enter total price" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="transfer-date">Transfer Date</Label>
                          <Input id="transfer-date" type="date" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddTransferOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddTransferOpen(false)}>Create Transfer</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transfer Date</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Share Class</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transfers.map((transfer) => (
                      <TableRow key={transfer.id}>
                        <TableCell>{new Date(transfer.transferDate).toLocaleDateString()}</TableCell>
                        <TableCell>{transfer.fromShareholder}</TableCell>
                        <TableCell>{transfer.toShareholder}</TableCell>
                        <TableCell>{transfer.shareClass}</TableCell>
                        <TableCell>{transfer.sharesTransferred.toLocaleString()}</TableCell>
                        <TableCell>${transfer.transferPrice.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {transfer.status === "pending" && (
                              <>
                                <Button variant="outline" size="sm" className="text-green-600">
                                  Approve
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600">
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ownership Distribution</CardTitle>
                  <CardDescription>Breakdown of ownership by shareholder type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["institutional", "individual", "corporate"].map((type) => {
                      const typeShares = shareholders
                        .filter((s) => s.type === type)
                        .reduce((sum, s) => sum + s.ownershipPercentage, 0)
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="capitalize">{type}</span>
                            <span>{typeShares.toFixed(1)}%</span>
                          </div>
                          <Progress value={typeShares} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Share Class Distribution</CardTitle>
                  <CardDescription>Issued shares by class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {shareClasses.map((sc) => {
                      const percentage =
                        (sc.issuedShares / shareClasses.reduce((sum, c) => sum + c.issuedShares, 0)) * 100
                      return (
                        <div key={sc.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span>{sc.className}</span>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
