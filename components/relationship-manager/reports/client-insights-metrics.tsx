import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users, AlertCircle, Clock, TrendingUp } from "lucide-react"

export function ClientInsightsMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          <Users className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">128</div>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12 from last quarter
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
          <Clock className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-slate-500">
            <span className="text-amber-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +6 from last week
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Compliance Alerts</CardTitle>
          <AlertCircle className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              -3 from last month
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Client Retention</CardTitle>
          <TrendingUp className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">96.4%</div>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +1.2% from last year
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
