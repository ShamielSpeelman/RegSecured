import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, MessageSquare, FileText, ArrowRight } from "lucide-react"

export default function OnboardingStatusPage() {
  return (
    <DashboardLayout userRole="client">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/client/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">My Onboarding</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Application Status</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Application Status</h1>
          <p className="text-slate-600 font-light">Track the progress of your application</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="text-xl font-medium">Application #APP-20250517-001</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">Under Review</p>
                      <p className="text-sm text-slate-600">Your application is currently being reviewed by our team</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    Estimated completion: 1-2 business days
                  </span>
                </div>

                <h3 className="text-lg font-medium text-slate-800 mb-4">Application Timeline</h3>
                <div className="relative pl-6 border-l border-slate-200 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-white">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-slate-800">Application Submitted</p>
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">May 17, 2025 - 10:30 AM</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Your application has been successfully submitted for review.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-white">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-slate-800">Compliance Review</p>
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Started: May 17, 2025 - 11:45 AM</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Our compliance team is reviewing your application and documents.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-white">
                      <Clock className="h-5 w-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Risk Assessment</p>
                      <p className="text-xs text-slate-400">Pending</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Your risk profile will be assessed based on the information provided.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-white">
                      <Clock className="h-5 w-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Final Approval</p>
                      <p className="text-xs text-slate-400">Pending</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Final review and approval of your application by our senior compliance officer.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-white">
                      <Clock className="h-5 w-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Account Activation</p>
                      <p className="text-xs text-slate-400">Pending</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Your account will be activated and ready for use once approved.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="/client/communications/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Your Compliance Officer
                  </a>
                </Button>

                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="/client/help">
                    <FileText className="mr-2 h-4 w-4" />
                    View Help Resources
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="text-lg font-medium">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">While your application is being reviewed, you can:</p>
                <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
                  <li>Check your messages for any requests from our compliance team</li>
                  <li>Prepare any additional documents that might be requested</li>
                  <li>Explore our platform features and resources</li>
                </ul>

                <div className="pt-2">
                  <Button asChild>
                    <a href="/client/dashboard">
                      Return to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
