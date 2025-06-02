import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ClientStatusSummary() {
  const clients = [
    {
      name: "Acme Financial Services",
      id: "CLT-2024-001",
      status: "Active",
      riskLevel: "Low",
      lastReview: "2024-03-15",
      nextReview: "2024-06-15",
      completeness: 100,
    },
    {
      name: "Global Investments Ltd",
      id: "CLT-2024-014",
      status: "Active",
      riskLevel: "Medium",
      lastReview: "2024-02-28",
      nextReview: "2024-05-28",
      completeness: 100,
    },
    {
      name: "Horizon Banking Group",
      id: "CLT-2024-032",
      status: "Review Required",
      riskLevel: "Medium",
      lastReview: "2023-12-10",
      nextReview: "2024-03-10",
      completeness: 92,
    },
    {
      name: "Stellar Capital Partners",
      id: "CLT-2024-022",
      status: "Onboarding",
      riskLevel: "Low",
      lastReview: "N/A",
      nextReview: "N/A",
      completeness: 68,
    },
    {
      name: "Meridian Trust",
      id: "CLT-2023-118",
      status: "Active",
      riskLevel: "High",
      lastReview: "2024-01-05",
      nextReview: "2024-04-05",
      completeness: 100,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800"
      case "Review Required":
        return "bg-amber-100 text-amber-800"
      case "Onboarding":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-emerald-100 text-emerald-800"
      case "Medium":
        return "bg-amber-100 text-amber-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-base font-medium">Client Status Summary</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input type="search" placeholder="Search clients..." className="pl-8 w-full sm:w-[200px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="review">Review Required</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <div className="flex items-center gap-1">
                  Client Name
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Last Review</TableHead>
              <TableHead>Next Review</TableHead>
              <TableHead>Completeness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.id}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRiskColor(client.riskLevel)}>
                    {client.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell>{client.lastReview}</TableCell>
                <TableCell>{client.nextReview}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${client.completeness}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{client.completeness}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
