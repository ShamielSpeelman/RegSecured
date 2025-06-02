import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Calendar } from "lucide-react"

export function ClientReportsFilters() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Filter Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input type="search" placeholder="Search by client name or ID..." className="pl-8 w-full" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="risk">Risk Assessment</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex gap-2 flex-1">
              <div className="flex-1">
                <p className="text-sm text-slate-500 mb-1">Date Range</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <Input type="date" className="flex-1" />
                  <span className="text-slate-500">to</span>
                  <Input type="date" className="flex-1" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
              <Button size="sm">Apply Filters</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
