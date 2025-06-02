import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OnboardingEfficiencyCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Onboarding Efficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="time">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="time">Time to Complete</TabsTrigger>
            <TabsTrigger value="stages">Stage Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="time" className="pt-4">
            <div className="h-[280px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">14.2 days</div>
                <div className="text-sm text-slate-500">Average time to complete onboarding</div>
                <div className="mt-4 text-xs text-emerald-600">↓ 2.4 days from target (16.6 days)</div>
                <div className="mt-2 text-xs text-slate-500">Across all client segments</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="stages" className="pt-4">
            <div className="h-[280px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">KYC Verification</div>
                <div className="text-sm text-slate-500">Longest onboarding stage</div>
                <div className="mt-4 text-xs text-amber-600">5.3 days average completion time</div>
                <div className="mt-2 text-xs text-slate-500">Opportunity for optimization</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="trends" className="pt-4">
            <div className="h-[280px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">-18%</div>
                <div className="text-sm text-slate-500">Reduction in onboarding time</div>
                <div className="mt-4 text-xs text-emerald-600">Year-over-year improvement</div>
                <div className="mt-2 text-xs text-slate-500">Due to process optimization</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
