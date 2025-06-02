import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin">
      {/* Keep existing dashboard content */}
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">System Administrator Dashboard</h1>
          <p className="text-slate-600 font-light">Manage system configuration, users, and platform settings</p>
        </div>
        {/* Rest of existing content */}
      </div>
    </DashboardLayout>
  )
}
