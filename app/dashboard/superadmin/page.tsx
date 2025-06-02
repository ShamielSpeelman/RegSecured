import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout userRole="superadmin">
      {/* Keep existing dashboard content */}
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Super Admin Dashboard</h1>
          <p className="text-slate-600 font-light">Global platform management and multi-tenant oversight</p>
        </div>
        {/* Rest of existing content */}
      </div>
    </DashboardLayout>
  )
}
