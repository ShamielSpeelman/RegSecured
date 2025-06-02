"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, User, Building, Calendar, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Client {
  id: string
  name: string
  type: "individual" | "entity"
  email: string
  phone: string
  status: "active" | "pending" | "suspended"
  lastKycUpdate: string
  riskLevel: "low" | "medium" | "high"
  relationshipManager: string
}

const mockClients: Client[] = [
  {
    id: "CLT-001",
    name: "John Smith",
    type: "individual",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    status: "active",
    lastKycUpdate: "2024-01-15",
    riskLevel: "low",
    relationshipManager: "Sarah Johnson",
  },
  {
    id: "CLT-002",
    name: "TechCorp Solutions Ltd",
    type: "entity",
    email: "contact@techcorp.com",
    phone: "+1-555-0456",
    status: "pending",
    lastKycUpdate: "2024-01-10",
    riskLevel: "medium",
    relationshipManager: "Michael Chen",
  },
  {
    id: "CLT-003",
    name: "Maria Rodriguez",
    type: "individual",
    email: "maria.rodriguez@email.com",
    phone: "+1-555-0789",
    status: "active",
    lastKycUpdate: "2023-12-20",
    riskLevel: "high",
    relationshipManager: "David Wilson",
  },
  {
    id: "CLT-004",
    name: "Global Investments Inc",
    type: "entity",
    email: "info@globalinv.com",
    phone: "+1-555-0321",
    status: "active",
    lastKycUpdate: "2024-01-05",
    riskLevel: "medium",
    relationshipManager: "Sarah Johnson",
  },
]

export function KYCClientSelector() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [filterType, setFilterType] = useState<"all" | "individual" | "entity">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "pending" | "suspended">("all")

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || client.type === filterType
    const matchesStatus = filterStatus === "all" || client.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client)
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search clients by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="type-filter">Client Type</Label>
            <Select value={filterType} onValueChange={(value: "all" | "individual" | "entity") => setFilterType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="entity">Entity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label htmlFor="status-filter">Status</Label>
            <Select
              value={filterStatus}
              onValueChange={(value: "all" | "active" | "pending" | "suspended") => setFilterStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="space-y-3">
        {filteredClients.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <AlertCircle className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                <p className="text-slate-600">No clients found matching your criteria</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredClients.map((client) => (
            <Card
              key={client.id}
              className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                selectedClient?.id === client.id ? "ring-2 ring-slate-900 bg-slate-50" : ""
              }`}
              onClick={() => handleSelectClient(client)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {client.type === "individual" ? (
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-slate-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-slate-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-slate-900 truncate">{client.name}</h3>
                        <Badge variant={getStatusBadgeVariant(client.status)} className="text-xs">
                          {client.status}
                        </Badge>
                        <Badge variant={getRiskBadgeVariant(client.riskLevel)} className="text-xs">
                          {client.riskLevel} risk
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">ID: {client.id}</p>
                      <p className="text-xs text-slate-500">{client.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center text-xs text-slate-500 mb-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Last KYC: {client.lastKycUpdate}
                    </div>
                    <p className="text-xs text-slate-500">RM: {client.relationshipManager}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Selected Client Actions */}
      {selectedClient && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selected Client</CardTitle>
            <CardDescription>
              {selectedClient.name} - {selectedClient.id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <Button className="flex-1">Update KYC Information</Button>
              <Button variant="outline" className="flex-1">
                View Client Profile
              </Button>
              <Button variant="outline" className="flex-1">
                Request Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
