"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal } from "lucide-react"

export function AlertFilters() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search alerts by client, type, or description..." className="pl-8" />
          </div>
          <Button type="submit">Search</Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Alert Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="kyc">KYC</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="risk">Risk</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </Tabs>
    </div>
  )
}
