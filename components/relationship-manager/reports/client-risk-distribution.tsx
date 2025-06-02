import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ClientRiskDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Client Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="risk">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="risk">Risk Level</TabsTrigger>
            <TabsTrigger value="industry">Industry</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
          </TabsList>
          <TabsContent value="risk" className="pt-4">
            <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">64%</div>
                    <div className="text-sm text-slate-500">Low Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">28%</div>
                    <div className="text-sm text-slate-500">Medium Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">8%</div>
                    <div className="text-sm text-slate-500">High Risk</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">Based on current risk assessment models</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="industry" className="pt-4">
            <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">42%</div>
                    <div className="text-sm text-slate-500">Financial</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">23%</div>
                    <div className="text-sm text-slate-500">Technology</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">18%</div>
                    <div className="text-sm text-slate-500">Real Estate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">17%</div>
                    <div className="text-sm text-slate-500">Other</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">Distribution by primary industry sector</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="geography" className="pt-4">
            <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">56%</div>
                    <div className="text-sm text-slate-500">North America</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">24%</div>
                    <div className="text-sm text-slate-500">Europe</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">14%</div>
                    <div className="text-sm text-slate-500">Asia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">6%</div>
                    <div className="text-sm text-slate-500">Other</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">Distribution by primary operating region</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
