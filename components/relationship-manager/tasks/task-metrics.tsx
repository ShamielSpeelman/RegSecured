import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Clock, UserCog } from "lucide-react"

export function TaskMetrics() {
  // Sample metrics data - in a real app, this would come from an API
  const metrics = {
    totalTasks: 42,
    completedTasks: 18,
    pendingTasks: 16,
    overdueTasks: 8,
    completionRate: 43,
    averageCompletionTime: "3.2 days",
    tasksRequiringAttention: 5,
    assignedToMe: 12,
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Tasks Assigned to Me</p>
            <p className="text-2xl font-bold mt-1">{metrics.assignedToMe}</p>
            <p className="text-xs text-slate-500 mt-1">{metrics.tasksRequiringAttention} requiring attention</p>
          </div>
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <UserCog className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Tasks</p>
            <p className="text-2xl font-bold mt-1">{metrics.pendingTasks}</p>
            <p className="text-xs text-slate-500 mt-1">{metrics.completionRate}% completion rate</p>
          </div>
          <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Completed Tasks</p>
            <p className="text-2xl font-bold mt-1">{metrics.completedTasks}</p>
            <p className="text-xs text-slate-500 mt-1">Avg. {metrics.averageCompletionTime} to complete</p>
          </div>
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Overdue Tasks</p>
            <p className="text-2xl font-bold mt-1">{metrics.overdueTasks}</p>
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
