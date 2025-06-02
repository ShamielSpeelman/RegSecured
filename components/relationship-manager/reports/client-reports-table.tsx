import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Send, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ClientReportsTable() {
  const reports = [
    {
      id: "REP-2023-Q4-001",
      client: "Acme Financial Services",
      type: "Quarterly Review",
      date: "2023-12-15",
      status: "Delivered",
      size: "4.2 MB",
    },
    {
      id: "REP-2024-Q1-014",
      client: "Global Investments Ltd",
      type: "Quarterly Review",
      date: "2024-03-28",
      status: "Approved",
      size: "3.8 MB",
    },
    {
      id: "REP-2024-COMP-032",
      client: "Horizon Banking Group",
      type: "Compliance Assessment",
      date: "2024-04-10",
      status: "Pending Review",
      size: "5.1 MB",
    },
    {
      id: "REP-2024-Q1-022",
      client: "Stellar Capital Partners",
      type: "Quarterly Review",
      date: "2024-03-31",
      status: "Draft",
      size: "2.9 MB",
    },
    {
      id: "REP-2024-RISK-018",
      client: "Meridian Trust",
      type: "Risk Assessment",
      date: "2024-04-05",
      status: "Pending Review",
      size: "6.3 MB",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-800"
      case "Approved":
        return "bg-blue-100 text-blue-800"
      case "Pending Review":
        return "bg-amber-100 text-amber-800"
      case "Draft":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Client Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.id}</TableCell>
                <TableCell>{report.client}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>{report.size}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Send">
                      <Send className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Report</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Review</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
