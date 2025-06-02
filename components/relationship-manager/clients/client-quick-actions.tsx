import { Button } from "@/components/ui/button"
import { UserPlus, MessageSquare, FileText, Calendar, TrendingUp } from "lucide-react"

export function ClientQuickActions() {
  const actions = [
    {
      icon: UserPlus,
      label: "New Client",
      description: "Start onboarding process",
      href: "/relationship-manager/onboarding",
    },
    {
      icon: MessageSquare,
      label: "Send Message",
      description: "Communicate with clients",
      href: "/relationship-manager/communications",
    },
    {
      icon: FileText,
      label: "Generate Report",
      description: "Create client reports",
      href: "/relationship-manager/client-reports",
    },
    {
      icon: Calendar,
      label: "Schedule Meeting",
      description: "Book client meetings",
      href: "/relationship-manager/calendar",
    },
    {
      icon: TrendingUp,
      label: "View Analytics",
      description: "Portfolio insights",
      href: "/relationship-manager/insights",
    },
  ]

  return (
    <div className="space-y-3">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <Button key={index} variant="outline" className="w-full justify-start h-auto p-3" asChild>
            <a href={action.href}>
              <div className="flex items-center space-x-3">
                <Icon className="h-4 w-4 text-slate-600" />
                <div className="text-left">
                  <div className="font-medium text-sm">{action.label}</div>
                  <div className="text-xs text-slate-600">{action.description}</div>
                </div>
              </div>
            </a>
          </Button>
        )
      })}
    </div>
  )
}
