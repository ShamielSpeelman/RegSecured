import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"

export function TaskFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Search tasks by ID, client, or type..." className="pl-10" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select>
          <SelectTrigger className="w-[140px]">
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
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Task Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="beneficial-ownership">Beneficial Ownership</SelectItem>
            <SelectItem value="risk-profile">Risk Profile</SelectItem>
            <SelectItem value="contact-info">Contact Information</SelectItem>
            <SelectItem value="pep-status">PEP Status</SelectItem>
            <SelectItem value="business-activity">Business Activity</SelectItem>
            <SelectItem value="source-of-funds">Source of Funds</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Assigned To" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Staff</SelectItem>
            <SelectItem value="me">Assigned to Me</SelectItem>
            <SelectItem value="sarah">Sarah Johnson</SelectItem>
            <SelectItem value="michael">Michael Chen</SelectItem>
            <SelectItem value="david">David Wilson</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  )
}
