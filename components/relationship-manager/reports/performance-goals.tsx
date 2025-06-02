import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"

export function PerformanceGoals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Performance Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Onboarding Time</div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                On Track
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Current: 14.2 days</span>
                <span>Target: 15 days</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Completion Rate</div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                On Track
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Current: 92.7%</span>
                <span>Target: 90%</span>
              </div>
              <Progress value={103} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Document Collection</div>
              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                At Risk
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Current: 3.4 days</span>
                <span>Target: 3 days</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Client Satisfaction</div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Exceeding
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Current: 4.8/5</span>
                <span>Target: 4.5/5</span>
              </div>
              <Progress value={107} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Escalation Rate</div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                On Track
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Current: 4.3%</span>
                <span>Target: &lt;5%</span>
              </div>
              <Progress value={86} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
