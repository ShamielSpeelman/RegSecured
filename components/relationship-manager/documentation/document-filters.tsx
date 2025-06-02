"use client"

import React from "react"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function DocumentFilters() {
  const [activeFilters, setActiveFilters] = React.useState([
    { id: 1, type: "Status", value: "Pending" },
    { id: 2, type: "Priority", value: "High" },
  ])

  const removeFilter = (id: number) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search documents, clients, or request IDs..." className="w-full pl-8" />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden md:inline">Filter</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuLabel>Filter Documents</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Status</DropdownMenuLabel>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>In Progress</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
                <DropdownMenuItem>Rejected</DropdownMenuItem>
                <DropdownMenuItem>Expired</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  Document Type
                </DropdownMenuLabel>
                <DropdownMenuItem>KYC Documents</DropdownMenuItem>
                <DropdownMenuItem>AML Documents</DropdownMenuItem>
                <DropdownMenuItem>Tax Documents</DropdownMenuItem>
                <DropdownMenuItem>Legal Documents</DropdownMenuItem>
                <DropdownMenuItem>Financial Statements</DropdownMenuItem>
                <DropdownMenuItem>Regulatory Filings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Priority</DropdownMenuLabel>
                <DropdownMenuItem>High</DropdownMenuItem>
                <DropdownMenuItem>Medium</DropdownMenuItem>
                <DropdownMenuItem>Low</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Options</SelectLabel>
                <SelectItem value="date-newest">Date (Newest)</SelectItem>
                <SelectItem value="date-oldest">Date (Oldest)</SelectItem>
                <SelectItem value="priority-high">Priority (High-Low)</SelectItem>
                <SelectItem value="priority-low">Priority (Low-High)</SelectItem>
                <SelectItem value="client-az">Client Name (A-Z)</SelectItem>
                <SelectItem value="client-za">Client Name (Z-A)</SelectItem>
                <SelectItem value="expiry-soon">Expiry (Soonest)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <span className="hidden md:inline">View</span>
            <ChevronDown className="h-4 w-4 md:ml-1" />
          </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter.id} variant="outline" className="flex items-center gap-1">
              <span className="text-xs font-medium">
                {filter.type}: {filter.value}
              </span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter.id)} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setActiveFilters([])}>
            Clear all
          </Button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Quick filters:</span>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Expiring this month
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          High priority
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Pending client action
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Recently requested
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Regulatory required
        </Button>
      </div>
    </div>
  )
}

export default DocumentFilters
