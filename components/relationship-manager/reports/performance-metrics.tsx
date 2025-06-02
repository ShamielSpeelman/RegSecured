import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Clock, Users, CheckCircle, AlertTriangle } from "lucide-react"

export function PerformanceMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Onboarding Time</CardTitle>
          <Clock className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">14.2 days</div>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              -2.4 days from target
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Onboardings</CardTitle>
          <Users className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">32</div>
          <p className="text-xs text-slate-500">
            <span className="text-amber-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +8 from last month
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">92.7%</div>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +3.2% from last quarter
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Escalation Rate</CardTitle>
          <AlertTriangle className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.3%</div>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              -1.2% from last quarter
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
