import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Calendar, CheckCircle, Clock } from "lucide-react"

export function ReviewMetrics() {
  // Sample metrics data - in a real app, this would come from an API
  const metrics = {
    scheduledReviews: 14,
    inProgressReviews: 8,
    completedReviews: 32,
    overdueReviews: 3,
    completionRate: 78,
    averageCompletionTime: "5.4 days",
    highRiskReviews: 6,
    upcomingDeadlines: 5,
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Scheduled Reviews</p>
            <p className="text-2xl font-bold mt-1">{metrics.scheduledReviews}</p>
            <p className="text-xs text-slate-500 mt-1">{metrics.upcomingDeadlines} due this week</p>
          </div>
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">In Progress</p>
            <p className="text-2xl font-bold mt-1">{metrics.inProgressReviews}</p>
            <p className="text-xs text-slate-500 mt-1">{metrics.highRiskReviews} high risk clients</p>
          </div>
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Completed Reviews</p>
            <p className="text-2xl font-bold mt-1">{metrics.completedReviews}</p>
            <p className="text-xs text-slate-500 mt-1">{metrics.completionRate}% completion rate</p>
          </div>
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Overdue Reviews</p>
            <p className="text-2xl font-bold mt-1">{metrics.overdueReviews}</p>
            <p className="text-xs text-slate-500 mt-1">Requires immediate attention</p>
          </div>
          <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
