"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  Database,
  Lock,
  Key,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Play,
  FileText,
  Search,
  Eye,
  Settings,
} from "lucide-react"

const isolationTests = [
  {
    id: 1,
    name: "Database Schema Isolation",
    description: "Verify tenant data is properly isolated at database level",
    status: "passed",
    lastRun: "2 hours ago",
    duration: "45s",
    coverage: 98,
    issues: 0,
  },
  {
    id: 2,
    name: "API Access Control",
    description: "Test cross-tenant API access restrictions",
    status: "passed",
    lastRun: "1 hour ago",
    duration: "32s",
    coverage: 100,
    issues: 0,
  },
  {
    id: 3,
    name: "File Storage Isolation",
    description: "Verify file access boundaries between tenants",
    status: "warning",
    lastRun: "30 minutes ago",
    duration: "28s",
    coverage: 95,
    issues: 2,
  },
  {
    id: 4,
    name: "Cache Isolation",
    description: "Test Redis/cache layer tenant separation",
    status: "failed",
    lastRun: "15 minutes ago",
    duration: "41s",
    coverage: 87,
    issues: 5,
  },
  {
    id: 5,
    name: "Session Management",
    description: "Verify user session isolation across tenants",
    status: "passed",
    lastRun: "45 minutes ago",
    duration: "23s",
    coverage: 100,
    issues: 0,
  },
]

const auditLogs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:15",
    tenant: "Acme Financial",
    action: "Data Access",
    resource: "customer_profiles",
    user: "john.doe@acme.com",
    result: "success",
    details: "Accessed 15 customer records",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:31:42",
    tenant: "Global Bank Ltd",
    action: "Cross-Tenant Query",
    resource: "transactions",
    user: "admin@globalbank.com",
    result: "blocked",
    details: "Attempted access to Acme Financial data - BLOCKED",
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:30:18",
    tenant: "FinTech Innovations",
    action: "File Upload",
    resource: "documents/kyc",
    user: "sarah.wilson@fintech.com",
    result: "success",
    details: "Uploaded KYC document (2.3MB)",
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:29:55",
    tenant: "Crypto Exchange Pro",
    action: "Database Query",
    resource: "user_accounts",
    user: "system@crypto.com",
    result: "success",
    details: "Bulk user verification query (1,250 records)",
  },
]

const complianceChecks = [
  {
    id: 1,
    standard: "SOC 2 Type II",
    requirement: "Logical Access Controls",
    status: "compliant",
    lastCheck: "1 day ago",
    nextCheck: "29 days",
    evidence: "Access logs, permission matrices",
  },
  {
    id: 2,
    standard: "ISO 27001",
    requirement: "Information Security Management",
    status: "compliant",
    lastCheck: "2 days ago",
    nextCheck: "28 days",
    evidence: "Security policies, incident reports",
  },
  {
    id: 3,
    standard: "GDPR",
    requirement: "Data Protection by Design",
    status: "review",
    lastCheck: "3 days ago",
    nextCheck: "27 days",
    evidence: "Privacy impact assessments",
  },
  {
    id: 4,
    standard: "PCI DSS",
    requirement: "Secure Network Architecture",
    status: "compliant",
    lastCheck: "1 day ago",
    nextCheck: "29 days",
    evidence: "Network diagrams, firewall configs",
  },
]

export function DataIsolationVerification() {
  const [selectedTest, setSelectedTest] = useState(isolationTests[0])
  const [testResults, setTestResults] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Shield className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge className="bg-green-100 text-green-800">Passed</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case "compliant":
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>
      case "review":
        return <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case "blocked":
        return <Badge className="bg-red-100 text-red-800">Blocked</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Isolation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Isolation Score</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">96%</div>
              <div className="text-xs text-gray-500">Overall compliance</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Tests Passed</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">3</div>
              <div className="text-xs text-gray-500">of 5 total</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Issues Found</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">7</div>
              <div className="text-xs text-gray-500">Require attention</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Data Boundaries</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">4</div>
              <div className="text-xs text-gray-500">Tenant boundaries</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tests">Isolation Tests</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="tools">Verification Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Test List */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Isolation Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isolationTests.map((test) => (
                  <div
                    key={test.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTest.id === test.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTest(test)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(test.status)}
                        <span className="font-medium text-sm">{test.name}</span>
                      </div>
                      {getStatusBadge(test.status)}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{test.description}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <div>Coverage: {test.coverage}%</div>
                      <div>Issues: {test.issues}</div>
                      <div>Duration: {test.duration}</div>
                      <div>Last: {test.lastRun}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Test Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium">{selectedTest.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-4">{selectedTest.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label className="text-sm font-medium">Test Coverage</Label>
                        <Progress value={selectedTest.coverage} className="mt-1" />
                        <div className="text-xs text-gray-500 mt-1">{selectedTest.coverage}%</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <div className="mt-1">{getStatusBadge(selectedTest.status)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <Label className="text-sm font-medium">Last Run</Label>
                        <div className="text-sm text-gray-600 mt-1">{selectedTest.lastRun}</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Duration</Label>
                        <div className="text-sm text-gray-600 mt-1">{selectedTest.duration}</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Issues Found</Label>
                        <div className="text-sm text-gray-600 mt-1">{selectedTest.issues}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Test Results</Label>
                      <Textarea
                        placeholder="Test execution results will appear here..."
                        value={testResults}
                        onChange={(e) => setTestResults(e.target.value)}
                        className="h-32"
                        readOnly
                      />
                    </div>

                    <div className="flex space-x-3">
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Run Test
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Data Access Audit Logs</CardTitle>
                <div className="flex space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tenants</SelectItem>
                      <SelectItem value="acme">Acme Financial</SelectItem>
                      <SelectItem value="global">Global Bank Ltd</SelectItem>
                      <SelectItem value="fintech">FinTech Innovations</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">{log.timestamp}</TableCell>
                      <TableCell className="font-medium">{log.tenant}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-sm text-gray-600">{log.resource}</TableCell>
                      <TableCell className="text-sm">{log.user}</TableCell>
                      <TableCell>{getStatusBadge(log.result)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Compliance Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Standard</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Check</TableHead>
                    <TableHead>Next Check</TableHead>
                    <TableHead>Evidence</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceChecks.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell className="font-medium">{check.standard}</TableCell>
                      <TableCell>{check.requirement}</TableCell>
                      <TableCell>{getStatusBadge(check.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{check.lastCheck}</TableCell>
                      <TableCell className="text-sm text-gray-600">{check.nextCheck}</TableCell>
                      <TableCell className="text-sm text-gray-600">{check.evidence}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Manual Verification Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tenant-select">Select Tenant for Testing</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Financial</SelectItem>
                      <SelectItem value="global">Global Bank Ltd</SelectItem>
                      <SelectItem value="fintech">FinTech Innovations</SelectItem>
                      <SelectItem value="crypto">Crypto Exchange Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="test-query">Test Query</Label>
                  <Textarea id="test-query" placeholder="Enter SQL query or API endpoint to test..." className="h-24" />
                </div>
                <div className="flex space-x-3">
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Execute Test
                  </Button>
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Validate Access
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Automated Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Run Full Database Isolation Test
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Verify API Access Controls
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Test File System Boundaries
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Complete Security Audit
                  </Button>
                </div>
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium">Schedule Automated Tests</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">Schedule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
