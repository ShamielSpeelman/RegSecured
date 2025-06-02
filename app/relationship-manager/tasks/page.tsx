import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientUpdateTaskList } from "@/components/relationship-manager/tasks/client-update-task-list"
import { TaskCreationForm } from "@/components/relationship-manager/tasks/task-creation-form"
import { TaskMetrics } from "@/components/relationship-manager/tasks/task-metrics"
import { TaskFilters } from "@/components/relationship-manager/tasks/task-filters"
import { TaskTemplates } from "@/components/relationship-manager/tasks/task-templates"

export default function TasksPage() {
  return (
    <DashboardLayout userRole="relationship-manager">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/relationship-manager">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Client Services</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Update Client Information</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Update Client Information</h1>
          <p className="text-slate-600 font-light">Manage and track client information update tasks and requests.</p>
        </div>

        <TaskMetrics />

        <div className="mt-6">
          <TaskFilters />
        </div>

        <Tabs defaultValue="active" className="mt-6">
          <TabsList>
            <TabsTrigger value="active">Active Tasks</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="templates">Task Templates</TabsTrigger>
            <TabsTrigger value="create">Create Task</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            <ClientUpdateTaskList status="active" />
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <ClientUpdateTaskList status="completed" />
          </TabsContent>
          <TabsContent value="overdue" className="mt-4">
            <ClientUpdateTaskList status="overdue" />
          </TabsContent>
          <TabsContent value="templates" className="mt-4">
            <TaskTemplates />
          </TabsContent>
          <TabsContent value="create" className="mt-4">
            <TaskCreationForm />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
