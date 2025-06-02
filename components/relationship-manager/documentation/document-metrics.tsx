import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, CheckCircle, FileWarning } from "lucide-react"

const documentMetricsData = [
  { name: "KYC", pending: 24, completed: 87, expired: 5 },
  { name: "AML", pending: 12, completed: 45, expired: 3 },
  { name: "Tax", pending: 18, completed: 62, expired: 8 },
  { name: "Legal", pending: 9, completed: 38, expired: 2 },
  { name: "Financial", pending: 15, completed: 53, expired: 4 },
  { name: "Regulatory", pending: 21, completed: 76, expired: 7 },
]

const expiryTrendData = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 15 },
  { month: "Mar", count: 18 },
  { month: "Apr", count: 8 },
  { month: "May", count: 10 },
  { month: "Jun", count: 14 },
  { month: "Jul", count: 22 },
  { month: "Aug", count: 16 },
]

export function DocumentMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Document Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">387</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +8.2% from last month
              </span>
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Completion Rate</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Documents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">79</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +12.5% from last month
              </span>
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>High Priority</span>
                <span className="font-medium text-red-500">23</span>
              </div>
              <Progress value={29} className="h-1 bg-red-100" indicatorClassName="bg-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +18.3% from last month
              </span>
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>On-time Completion</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-1 bg-emerald-100" indicatorClassName="bg-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <FileWarning className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                -4.2% from last month
              </span>
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Next 30 Days</span>
                <span className="font-medium text-amber-500">18</span>
              </div>
              <Progress value={62} className="h-1 bg-amber-100" indicatorClassName="bg-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="category">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="category">By Document Category</TabsTrigger>
          <TabsTrigger value="expiry">Expiry Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="category" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Requests by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={documentMetricsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                    <Bar dataKey="completed" fill="#10b981" name="Completed" />
                    <Bar dataKey="expired" fill="#ef4444" name="Expired" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expiry" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Expiry Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={expiryTrendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#f59e0b" name="Expiring Documents" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DocumentMetrics
