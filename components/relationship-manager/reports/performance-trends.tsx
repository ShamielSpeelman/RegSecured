import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PerformanceTrends() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Performance Trends</CardTitle>
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
            <SelectItem value="ytd">Year to Date</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="onboarding">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="onboarding">Onboarding Time</TabsTrigger>
            <TabsTrigger value="completion">Completion Rate</TabsTrigger>
            <TabsTrigger value="satisfaction">Client Satisfaction</TabsTrigger>
          </TabsList>
          <TabsContent value="onboarding" className="pt-4">
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">14.2 days</div>
                <div className="text-sm text-slate-500">Current average onboarding time</div>
                <div className="mt-4 text-xs text-emerald-600">Downward trend (improving)</div>
                <div className="mt-2 text-xs text-slate-500">
                  <span className="font-medium">Oct:</span> 17.8 days
                  <span className="mx-2">|</span>
                  <span className="font-medium">Nov:</span> 16.3 days
                  <span className="mx-2">|</span>
                  <span className="font-medium">Dec:</span> 15.1 days
                  <span className="mx-2">|</span>
                  <span className="font-medium">Jan:</span> 14.8 days
                  <span className="mx-2">|</span>
                  <span className="font-medium">Feb:</span> 14.5 days
                  <span className="mx-2">|</span>
                  <span className="font-medium">Mar:</span> 14.2 days
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="completion" className="pt-4">
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">92.7%</div>
                <div className="text-sm text-slate-500">Current completion rate</div>
                <div className="mt-4 text-xs text-emerald-600">Upward trend (improving)</div>
                <div className="mt-2 text-xs text-slate-500">
                  <span className="font-medium">Oct:</span> 87.2%
                  <span className="mx-2">|</span>
                  <span className="font-medium">Nov:</span> 88.5%
                  <span className="mx-2">|</span>
                  <span className="font-medium">Dec:</span> 89.8%
                  <span className="mx-2">|</span>
                  <span className="font-medium">Jan:</span> 90.4%
                  <span className="mx-2">|</span>
                  <span className="font-medium">Feb:</span> 91.6%
                  <span className="mx-2">|</span>
                  <span className="font-medium">Mar:</span> 92.7%
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="satisfaction" className="pt-4">
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">4.8/5</div>
                <div className="text-sm text-slate-500">Current satisfaction score</div>
                <div className="mt-4 text-xs text-emerald-600">Stable trend (high performance)</div>
                <div className="mt-2 text-xs text-slate-500">
                  <span className="font-medium">Oct:</span> 4.6/5
                  <span className="mx-2">|</span>
                  <span className="font-medium">Nov:</span> 4.6/5
                  <span className="mx-2">|</span>
                  <span className="font-medium">Dec:</span> 4.7/5
                  <span className="mx-2">|</span>
                  <span className="font-medium">Jan:</span> 4.7/5
                  <span className="mx-2">|</span>
                  <span className="font-medium">Feb:</span> 4.8/5
                  <span className="mx-2">|</span>
                  <span className="font-medium">Mar:</span> 4.8/5
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
