import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Upload, MessageSquare, CheckCircle, Clock } from "lucide-react"

export default function ClientDashboard() {
  return (
    <DashboardLayout userRole="client">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Client Portal Dashboard</h1>
          <p className="text-slate-600 font-light">Manage your onboarding process and account information</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-stone-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Application Status</p>
                  <p className="text-2xl font-light text-slate-800">In Progress</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Documents Uploaded</p>
                  <p className="text-2xl font-light text-slate-800">7/10</p>
                </div>
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Forms Completed</p>
                  <p className="text-2xl font-light text-slate-800">3/4</p>
                </div>
                <FileText className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Messages</p>
                  <p className="text-2xl font-light text-slate-800">2</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
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
                <Upload className="h-4 w-4 mr-2" />
                Upload Required Documents
              </Button>
              <Button variant="outline" className="w-full justify-start border-stone-300">
                <FileText className="h-4 w-4 mr-2" />
                Complete Pending Forms
              </Button>
              <Button variant="outline" className="w-full justify-start border-stone-300">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
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
                  <p className="text-sm font-medium text-slate-800">Identity verification completed</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Upload className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Bank statement uploaded</p>
                  <p className="text-xs text-slate-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">New message from compliance team</p>
                  <p className="text-xs text-slate-500">2 days ago</p>
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
                  <p className="font-medium text-slate-800">Proof of Address Document</p>
                  <p className="text-sm text-slate-600">Please upload a recent utility bill or bank statement</p>
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Required</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">Source of Funds Declaration</p>
                  <p className="text-sm text-slate-600">Complete the source of funds questionnaire</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
