import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function PerformanceComparison() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Performance Comparison</CardTitle>
        <Select defaultValue="team">
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="Compare with..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="team">Team Average</SelectItem>
            <SelectItem value="department">Department Average</SelectItem>
            <SelectItem value="company">Company Average</SelectItem>
            <SelectItem value="industry">Industry Benchmark</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Onboarding Time</span>
              <span className="font-medium">14.2 days vs 16.8 days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "84%" }}></div>
              </div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                15% better
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Document Collection</span>
              <span className="font-medium">3.4 days vs 4.2 days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "81%" }}></div>
              </div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                19% better
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">KYC Verification</span>
              <span className="font-medium">5.3 days vs 5.1 days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "96%" }}></div>
              </div>
              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                4% worse
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Compliance Review</span>
              <span className="font-medium">2.8 days vs 3.5 days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "80%" }}></div>
              </div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                20% better
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Client Satisfaction</span>
              <span className="font-medium">4.8/5 vs 4.5/5</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "93%" }}></div>
              </div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                7% better
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
