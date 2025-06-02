import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ClientPerformanceCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Client Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="onboarding">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          </TabsList>
          <TabsContent value="onboarding" className="pt-4">
            <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">87%</div>
                <div className="text-sm text-slate-500">Average onboarding completion rate</div>
                <div className="mt-4 text-xs text-emerald-600">↑ 4% from previous quarter</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="compliance" className="pt-4">
            <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">94%</div>
                <div className="text-sm text-slate-500">Compliance documentation rate</div>
                <div className="mt-4 text-xs text-emerald-600">↑ 2% from previous quarter</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="satisfaction" className="pt-4">
            <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">4.8/5</div>
                <div className="text-sm text-slate-500">Client satisfaction score</div>
                <div className="mt-4 text-xs text-emerald-600">↑ 0.2 from previous quarter</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
