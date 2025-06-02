import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, Calendar } from "lucide-react"

export function OnboardingStatusFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search by client name, ID, or case number..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="initiated">Initiated</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending-review">Pending Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="flex items-center gap-1">
          In Progress
          <X className="h-3 w-3 cursor-pointer" />
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          High Priority
          <X className="h-3 w-3 cursor-pointer" />
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          This Month
          <X className="h-3 w-3 cursor-pointer" />
        </Badge>
      </div>
    </div>
  )
}
