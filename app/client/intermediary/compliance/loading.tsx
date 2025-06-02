import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function IntermediaryComplianceLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Metrics Cards Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-2 w-full mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alert Skeleton */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Skeleton className="h-4 w-4 mt-0.5" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-80" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28" />
            ))}
          </div>

          {/* Content Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
