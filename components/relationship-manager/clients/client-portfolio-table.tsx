import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Eye, MessageSquare, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ClientPortfolioTableProps {
  filter: "all" | "active" | "onboarding" | "high-value"
}

export function ClientPortfolioTable({ filter }: ClientPortfolioTableProps) {
  const clients = [
    {
      id: "CL-001",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      type: "Individual",
      status: "Active",
      riskLevel: "Low",
      onboardingDate: "2024-01-15",
      lastContact: "2024-01-28",
      value: "$125,000",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "CL-002",
      name: "TechCorp Industries",
      email: "compliance@techcorp.com",
      type: "Corporate",
      status: "Onboarding",
      riskLevel: "Medium",
      onboardingDate: "2024-01-20",
      lastContact: "2024-01-29",
      value: "$2,500,000",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "CL-003",
      name: "Michael Chen",
      email: "m.chen@investment.com",
      type: "Individual",
      status: "Active",
      riskLevel: "High",
      onboardingDate: "2023-12-10",
      lastContact: "2024-01-25",
      value: "$750,000",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "CL-004",
      name: "Global Finance Ltd",
      email: "kyc@globalfinance.com",
      type: "Institutional",
      status: "Active",
      riskLevel: "Low",
      onboardingDate: "2023-11-05",
      lastContact: "2024-01-30",
      value: "$5,200,000",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "CL-005",
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      type: "Individual",
      status: "Onboarding",
      riskLevel: "Low",
      onboardingDate: "2024-01-25",
      lastContact: "2024-01-30",
      value: "$85,000",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Onboarding":
        return "bg-orange-100 text-orange-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Portfolio Value</TableHead>
            <TableHead>Last Contact</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                    <AvatarFallback>
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-slate-600">{client.email}</div>
                    <div className="text-xs text-slate-500">{client.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{client.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getRiskColor(client.riskLevel)}>{client.riskLevel}</Badge>
              </TableCell>
              <TableCell className="font-medium">{client.value}</TableCell>
              <TableCell className="text-sm text-slate-600">{client.lastContact}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Documents
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
