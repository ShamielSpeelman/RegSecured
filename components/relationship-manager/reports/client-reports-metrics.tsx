import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users, FileText, TrendingUp, Clock } from "lucide-react"

export function ClientReportsMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Client Reports</CardTitle>
          <FileText className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142</div>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12% from last month
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clients Requiring Reports</CardTitle>
          <Users className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">28</div>
          <p className="text-xs text-slate-500">
            <span className="text-amber-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +4 since last week
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Report Completion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">94.2%</div>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +2.4% from target
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Generation Time</CardTitle>
          <Clock className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1.8 hrs</div>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              -0.5 hrs from last quarter
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
