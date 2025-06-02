import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function ReviewerDashboard() {
  return (
    <DashboardLayout userRole="reviewer">
      {/* Keep existing dashboard content */}
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Compliance Officer Dashboard</h1>
          <p className="text-slate-600 font-light">Review cases, manage risk assessments, and ensure compliance</p>
        </div>
        {/* Rest of existing content */}
      </div>
    </DashboardLayout>
  )
}
