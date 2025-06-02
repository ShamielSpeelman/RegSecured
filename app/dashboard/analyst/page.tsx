import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AnalystDashboard() {
  return (
    <DashboardLayout userRole="analyst">
      {/* Keep existing dashboard content */}
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">KYC Analyst Dashboard</h1>
          <p className="text-slate-600 font-light">Manage cases, review documents, and process compliance workflows</p>
        </div>
        {/* Rest of existing content */}
      </div>
    </DashboardLayout>
  )
}
