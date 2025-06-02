import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

export function ComplianceStatusOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Compliance Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">KYC Documentation</div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                98% Complete
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>126/128 clients</span>
                <span>2 pending</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Annual Reviews</div>
              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                <Clock className="h-3 w-3 mr-1" />
                92% Complete
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>118/128 clients</span>
                <span>10 pending</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Risk Assessments</div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                100% Complete
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>128/128 clients</span>
                <span>0 pending</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Regulatory Filings</div>
              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                86% Complete
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>110/128 clients</span>
                <span>18 pending</span>
              </div>
              <Progress value={86} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Screening Alerts</div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                100% Resolved
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>7/7 alerts</span>
                <span>0 pending</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
