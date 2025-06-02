import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function RelationshipManagerDashboard() {
  return (
    <DashboardLayout userRole="relationship-manager">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Relationship Manager Dashboard</h1>
          <p className="text-slate-600 font-light">Manage client relationships and onboarding processes</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-stone-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">My Clients</p>
                  <p className="text-2xl font-light text-slate-800">247</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Onboardings</p>
                  <p className="text-2xl font-light text-slate-800">12</p>
                </div>
                <UserPlus className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">This Month</p>
                  <p className="text-2xl font-light text-slate-800">8</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg. Time</p>
                  <p className="text-2xl font-light text-slate-800">5.2d</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-stone-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-slate-700 hover:bg-slate-800 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Start New Client Onboarding
              </Button>
              <Button variant="outline" className="w-full justify-start border-stone-300">
                <Users className="h-4 w-4 mr-2" />
                Search Client Portfolio
              </Button>
              <Button variant="outline" className="w-full justify-start border-stone-300">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Performance Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="border-stone-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Client ABC Corp onboarding completed</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Document request sent to XYZ Ltd</p>
                  <p className="text-xs text-slate-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <UserPlus className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">New onboarding initiated for DEF Inc</p>
                  <p className="text-xs text-slate-500">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Items */}
        <Card className="border-stone-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-800">Pending Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">TechStart Solutions - Document Review</p>
                  <p className="text-sm text-slate-600">Waiting for compliance team review</p>
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Pending</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">Global Investments Ltd - Risk Assessment</p>
                  <p className="text-sm text-slate-600">Additional information required</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">In Progress</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* My Clients */}
          <Card className="border-stone-200/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-800">My Clients</h3>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">247</div>
                  <div className="text-sm text-slate-600">Total Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">12</div>
                  <div className="text-sm text-slate-600">Active Onboarding</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">High Risk Clients</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Pending Updates</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Review Required</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">6</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm" asChild>
                  <a href="/relationship-manager/clients">
                    <Users className="h-4 w-4 mr-1" />
                    Portfolio
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 text-sm" asChild>
                  <a href="/relationship-manager/onboarding-status">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Status
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* New Client Onboarding */}
          <Card className="border-stone-200/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <UserPlus className="h-5 w-5 mr-2 text-emerald-600" />
                <h3 className="text-lg font-semibold text-slate-800">New Client Onboarding</h3>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">12</div>
                  <div className="text-sm text-slate-600">Active Onboarding</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">5</div>
                  <div className="text-sm text-slate-600">Overdue Items</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">KYC Pending</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Document Collection</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Ready for Review</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">4</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm" asChild>
                  <a href="/relationship-manager/onboarding">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Initiate
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 text-sm" asChild>
                  <a href="/relationship-manager/kyc">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    KYC
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Client Services */}
          <Card className="border-stone-200/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-5 w-5 mr-2 text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-800">Client Services</h3>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-purple-600">23</div>
                  <div className="text-sm text-slate-600">Active Tasks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">9</div>
                  <div className="text-sm text-slate-600">Urgent Requests</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Document Requests</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">14</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Review Requests</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Update Tasks</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">11</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm" asChild>
                  <a href="/relationship-manager/tasks">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Tasks
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 text-sm" asChild>
                  <a href="/relationship-manager/documentation">
                    <Users className="h-4 w-4 mr-1" />
                    Documents
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reports & Analytics */}
          <Card className="border-stone-200/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                <h3 className="text-lg font-semibold text-slate-800">Reports & Analytics</h3>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-orange-600">18</div>
                  <div className="text-sm text-slate-600">Generated Reports</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-slate-600">Performance Score</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Client Reports</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Performance Metrics</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Insights Available</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">5</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm" asChild>
                  <a href="/relationship-manager/client-reports">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Reports
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 text-sm" asChild>
                  <a href="/relationship-manager/insights">
                    <Users className="h-4 w-4 mr-1" />
                    Insights
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Relationship Management */}
          <Card className="border-stone-200/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                <h3 className="text-lg font-semibold text-slate-800">Relationship Management</h3>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">7</div>
                  <div className="text-sm text-slate-600">Today's Meetings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">15</div>
                  <div className="text-sm text-slate-600">This Week</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Scheduled Meetings</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">22</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Follow-ups Due</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Appointments</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">12</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm" asChild>
                  <a href="/relationship-manager/calendar">
                    <Clock className="h-4 w-4 mr-1" />
                    Calendar
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 text-sm" asChild>
                  <a href="/relationship-manager/meetings">
                    <Users className="h-4 w-4 mr-1" />
                    Meetings
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Risk & Compliance */}
          <Card className="border-stone-200/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                <h3 className="text-lg font-semibold text-slate-800">Risk & Compliance</h3>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-red-600">6</div>
                  <div className="text-sm text-slate-600">Active Alerts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-slate-600">High Risk Items</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Compliance Reviews</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">11</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Risk Assessments</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Overdue Items</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">4</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm" asChild>
                  <a href="/relationship-manager/alerts">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Alerts
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 text-sm" asChild>
                  <a href="/relationship-manager/compliance-tracking">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Compliance
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
