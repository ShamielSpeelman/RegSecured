import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Shield,
  FileText,
  BarChart3,
  Settings,
  Database,
  UserCheck,
  AlertTriangle,
  Search,
  Upload,
  TrendingUp,
  Eye,
  Globe,
  Zap,
  Lock,
  Activity,
  User,
  Calendar,
  Building,
  MessageSquare,
  Bell,
} from "lucide-react"

export interface NavigationItem {
  id: string
  label: string
  icon: any
  href?: string
  children?: NavigationItem[]
  entityTypes?: string[] // Which entity types this applies to
  scenarios?: string[] // Which scenarios this applies to
  roles?: string[] // Which roles this applies to
}

export interface RoleNavigation {
  role: string
  navigation: NavigationItem[]
}

// Helper function to get entity-aware navigation items
const getEntityAwareNavigation = (entityType?: string, scenario?: string, role?: string): NavigationItem[] => {
  const baseNavigation: NavigationItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/client/dashboard",
    },
    {
      id: "my-onboarding",
      label: "My Onboarding",
      icon: UserCheck,
      children: [
        {
          id: "application-status",
          label: "Application Status",
          icon: Activity,
          href: "/client/onboarding/status",
        },
        {
          id: "form-completion",
          label: "Form Completion",
          icon: FileText,
          href: "/client/onboarding/forms",
        },
        {
          id: "document-upload",
          label: "Document Upload",
          icon: Upload,
          href: "/client/onboarding/documents",
        },
        {
          id: "review-submit",
          label: "Review & Submit",
          icon: Eye,
          href: "/client/onboarding/review",
        },
      ],
    },
    {
      id: "profile-management",
      label: "Profile Management",
      icon: User,
      children: [
        {
          id: "entity-information",
          label: entityType === "individual" ? "Personal Information" : "Entity Information",
          icon: entityType === "individual" ? User : Building,
          href: "/client/profile/personal",
        },
        {
          id: "contact-details",
          label: "Contact Details",
          icon: MessageSquare,
          href: "/client/profile/contact",
        },
        {
          id: "document-library",
          label: "Document Library",
          icon: Database,
          href: "/client/profile/documents",
        },
      ],
    },
    {
      id: "communications",
      label: "Communications",
      icon: MessageSquare,
      children: [
        {
          id: "messages",
          label: "Messages",
          icon: MessageSquare,
          href: "/client/communications/messages",
        },
        {
          id: "notifications",
          label: "Notifications",
          icon: Bell,
          href: "/client/notifications",
        },
        {
          id: "support-requests",
          label: "Support Requests",
          icon: Eye,
          href: "/client/communications/support",
        },
      ],
    },
  ]

  // Add entity-specific navigation items
  if (entityType === "legal-entity") {
    // Add corporate-specific items
    const corporateItems: NavigationItem = {
      id: "corporate-governance",
      label: "Corporate Governance",
      icon: Building,
      children: [
        {
          id: "board-management",
          label: "Board Management",
          icon: Users,
          href: "/client/corporate/board",
        },
        {
          id: "shareholder-registry",
          label: "Shareholder Registry",
          icon: Database,
          href: "/client/corporate/shareholders",
        },
        {
          id: "corporate-actions",
          label: "Corporate Actions",
          icon: Activity,
          href: "/client/corporate/actions",
        },
      ],
    }
    baseNavigation.splice(3, 0, corporateItems)
  }

  if (entityType === "trust") {
    // Add trust-specific items
    const trustItems: NavigationItem = {
      id: "trust-administration",
      label: "Trust Administration",
      icon: Shield,
      children: [
        {
          id: "trustee-management",
          label: "Trustee Management",
          icon: Users,
          href: "/client/trust/trustees",
        },
        {
          id: "beneficiary-registry",
          label: "Beneficiary Registry",
          icon: Database,
          href: "/client/trust/beneficiaries",
        },
        {
          id: "trust-distributions",
          label: "Trust Distributions",
          icon: Activity,
          href: "/client/trust/distributions",
        },
      ],
    }
    baseNavigation.splice(3, 0, trustItems)
  }

  if (scenario === "intermediary-client") {
    // Add intermediary-specific items
    const intermediaryItems: NavigationItem = {
      id: "intermediary-services",
      label: "Intermediary Services",
      icon: Users,
      children: [
        {
          id: "client-management",
          label: "Client Management",
          icon: Users,
          href: "/client/intermediary/clients",
        },
        {
          id: "reporting",
          label: "Reporting",
          icon: BarChart3,
          href: "/client/intermediary/reports",
        },
        {
          id: "compliance-monitoring",
          label: "Compliance Monitoring",
          icon: Shield,
          href: "/client/intermediary/compliance",
        },
      ],
    }
    baseNavigation.splice(3, 0, intermediaryItems)
  }

  return baseNavigation
}

export const navigationConfig: RoleNavigation[] = [
  {
    role: "analyst",
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/analyst",
      },
      {
        id: "my-cases",
        label: "My Cases",
        icon: FolderOpen,
        children: [
          { id: "assigned-cases", label: "Assigned Cases", icon: FolderOpen, href: "/cases/assigned" },
          { id: "pending-review", label: "Pending Review", icon: Eye, href: "/cases/pending" },
          { id: "recently-completed", label: "Recently Completed", icon: UserCheck, href: "/cases/completed" },
        ],
      },
      {
        id: "client-management",
        label: "Client Management",
        icon: Users,
        children: [
          { id: "search-clients", label: "Search Clients", icon: Search, href: "/clients/search" },
          { id: "client-profiles", label: "Client Profiles", icon: Users, href: "/clients/profiles" },
          { id: "document-review", label: "Document Review", icon: FileText, href: "/clients/documents" },
        ],
      },
      {
        id: "screening-alerts",
        label: "Screening & Alerts",
        icon: AlertTriangle,
        children: [
          { id: "alert-inbox", label: "Alert Inbox", icon: AlertTriangle, href: "/screening/alerts" },
          { id: "screening-results", label: "Screening Results", icon: Shield, href: "/screening/results" },
          {
            id: "false-positive",
            label: "False Positive Management",
            icon: UserCheck,
            href: "/screening/false-positives",
          },
        ],
      },
      {
        id: "document-processing",
        label: "Document Processing",
        icon: Upload,
        children: [
          { id: "document-upload", label: "Document Upload", icon: Upload, href: "/documents/upload" },
          {
            id: "document-verification",
            label: "Document Verification",
            icon: UserCheck,
            href: "/documents/verification",
          },
          { id: "ocr-results", label: "OCR Results Review", icon: Eye, href: "/documents/ocr" },
        ],
      },
      {
        id: "reports",
        label: "Reports",
        icon: BarChart3,
        children: [
          { id: "my-performance", label: "My Performance", icon: TrendingUp, href: "/reports/performance" },
          { id: "case-status", label: "Case Status Reports", icon: BarChart3, href: "/reports/cases" },
          { id: "workload", label: "Workload Reports", icon: Activity, href: "/reports/workload" },
        ],
      },
    ],
  },
  {
    role: "reviewer",
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/reviewer",
      },
      {
        id: "case-review",
        label: "Case Review",
        icon: UserCheck,
        children: [
          { id: "pending-approvals", label: "Pending Approvals", icon: UserCheck, href: "/review/pending" },
          { id: "high-risk-cases", label: "High Risk Cases", icon: AlertTriangle, href: "/review/high-risk" },
          { id: "escalated-cases", label: "Escalated Cases", icon: TrendingUp, href: "/review/escalated" },
          { id: "review-history", label: "Review History", icon: Activity, href: "/review/history" },
        ],
      },
      {
        id: "risk-management",
        label: "Risk Management",
        icon: Shield,
        children: [
          { id: "risk-assessments", label: "Risk Assessments", icon: Shield, href: "/risk/assessments" },
          { id: "risk-override", label: "Risk Override Requests", icon: AlertTriangle, href: "/risk/overrides" },
          { id: "risk-analytics", label: "Risk Analytics", icon: BarChart3, href: "/risk/analytics" },
        ],
      },
      {
        id: "screening-management",
        label: "Screening Management",
        icon: Search,
        children: [
          { id: "alert-disposition", label: "Alert Disposition", icon: UserCheck, href: "/screening/disposition" },
          { id: "sanctions-hits", label: "Sanctions Hits", icon: AlertTriangle, href: "/screening/sanctions" },
          { id: "pep-reviews", label: "PEP Reviews", icon: Eye, href: "/screening/pep" },
        ],
      },
      {
        id: "compliance-monitoring",
        label: "Compliance Monitoring",
        icon: Eye,
        children: [
          { id: "ongoing-monitoring", label: "Ongoing Monitoring", icon: Activity, href: "/compliance/monitoring" },
          { id: "periodic-reviews", label: "Periodic Reviews", icon: UserCheck, href: "/compliance/reviews" },
          { id: "remediation-cases", label: "Remediation Cases", icon: AlertTriangle, href: "/compliance/remediation" },
        ],
      },
      {
        id: "reports-analytics",
        label: "Reports & Analytics",
        icon: BarChart3,
        children: [
          {
            id: "compliance-dashboards",
            label: "Compliance Dashboards",
            icon: LayoutDashboard,
            href: "/reports/compliance",
          },
          { id: "risk-reports", label: "Risk Reports", icon: Shield, href: "/reports/risk" },
          { id: "regulatory-reports", label: "Regulatory Reports", icon: FileText, href: "/reports/regulatory" },
          { id: "audit-reports", label: "Audit Reports", icon: Eye, href: "/reports/audit" },
        ],
      },
    ],
  },
  {
    role: "relationship-manager",
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/relationship-manager",
      },
      {
        id: "my-clients",
        label: "My Clients",
        icon: Users,
        children: [
          { id: "client-portfolio", label: "Client Portfolio", icon: Users, href: "/relationship-manager/clients" },
          {
            id: "onboarding-status",
            label: "Onboarding Status",
            icon: Activity,
            href: "/relationship-manager/onboarding-status",
          },
          {
            id: "client-communications",
            label: "Client Communications",
            icon: FileText,
            href: "/relationship-manager/communications",
          },
        ],
      },
      {
        id: "new-client-onboarding",
        label: "New Client Onboarding",
        icon: UserCheck,
        children: [
          {
            id: "initiate-onboarding",
            label: "Initiate Onboarding",
            icon: UserCheck,
            href: "/relationship-manager/onboarding",
          },
          { id: "client-data-entry", label: "Client Data Entry", icon: FileText, href: "/relationship-manager/kyc" },
          {
            id: "status-tracking",
            label: "Status Tracking",
            icon: Activity,
            href: "/relationship-manager/status-tracking",
          },
        ],
      },
      {
        id: "client-services",
        label: "Client Services",
        icon: Settings,
        children: [
          {
            id: "update-client-info",
            label: "Update Client Information",
            icon: FileText,
            href: "/relationship-manager/tasks",
          },
          { id: "request-reviews", label: "Request Reviews", icon: Eye, href: "/relationship-manager/reviews" },
          {
            id: "document-requests",
            label: "Document Requests",
            icon: Upload,
            href: "/relationship-manager/documentation",
          },
        ],
      },
      {
        id: "reports",
        label: "Reports",
        icon: BarChart3,
        children: [
          {
            id: "my-client-reports",
            label: "My Client Reports",
            icon: BarChart3,
            href: "/relationship-manager/client-reports",
          },
          {
            id: "onboarding-metrics",
            label: "Onboarding Metrics",
            icon: TrendingUp,
            href: "/relationship-manager/performance",
          },
          {
            id: "client-status-summary",
            label: "Client Status Summary",
            icon: Activity,
            href: "/relationship-manager/insights",
          },
        ],
      },
      {
        id: "relationship-management",
        label: "Relationship Management",
        icon: User,
        children: [
          {
            id: "calendar-scheduling",
            label: "Calendar & Scheduling",
            icon: Calendar,
            href: "/relationship-manager/calendar",
          },
          {
            id: "meeting-management",
            label: "Meeting Management",
            icon: Users,
            href: "/relationship-manager/meetings",
          },
        ],
      },
      {
        id: "risk-compliance",
        label: "Risk & Compliance",
        icon: Shield,
        children: [
          {
            id: "alert-management",
            label: "Alert Management",
            icon: AlertTriangle,
            href: "/relationship-manager/alerts",
          },
          {
            id: "compliance-tracking",
            label: "Compliance Tracking",
            icon: Eye,
            href: "/relationship-manager/compliance-tracking",
          },
          {
            id: "risk-assessment",
            label: "Risk Assessment",
            icon: Shield,
            href: "/relationship-manager/risk-assessment",
          },
        ],
      },
    ],
  },
  {
    role: "admin",
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/admin",
      },
      {
        id: "system-configuration",
        label: "System Configuration",
        icon: Settings,
        children: [
          { id: "platform-settings", label: "Platform Settings", icon: Settings, href: "/config/platform" },
          { id: "integration-management", label: "Integration Management", icon: Zap, href: "/config/integrations" },
          { id: "api-keys", label: "API Keys & Connectors", icon: Lock, href: "/config/api-keys" },
          { id: "reference-data", label: "Reference Data Management", icon: Database, href: "/config/reference-data" },
        ],
      },
      {
        id: "user-management",
        label: "User Management",
        icon: Users,
        children: [
          { id: "user-accounts", label: "User Accounts", icon: Users, href: "/users/accounts" },
          { id: "role-management", label: "Role Management", icon: UserCheck, href: "/users/roles" },
          { id: "permission-settings", label: "Permission Settings", icon: Lock, href: "/users/permissions" },
          { id: "sso-configuration", label: "SSO Configuration", icon: Shield, href: "/users/sso" },
        ],
      },
      {
        id: "rules-policy-engine",
        label: "Rules & Policy Engine",
        icon: Shield,
        children: [
          { id: "global-rules", label: "Global Rules Configuration", icon: Globe, href: "/rules/global" },
          { id: "risk-model", label: "Risk Model Settings", icon: AlertTriangle, href: "/rules/risk-model" },
          { id: "jurisdiction-settings", label: "Jurisdiction Settings", icon: Globe, href: "/rules/jurisdictions" },
          { id: "workflow-templates", label: "Workflow Templates", icon: Activity, href: "/rules/workflows" },
        ],
      },
      {
        id: "system-monitoring",
        label: "System Monitoring",
        icon: Activity,
        children: [
          { id: "audit-logs", label: "Audit Logs", icon: Eye, href: "/monitoring/audit" },
          { id: "system-performance", label: "System Performance", icon: TrendingUp, href: "/monitoring/performance" },
          { id: "integration-status", label: "Integration Status", icon: Zap, href: "/monitoring/integrations" },
          { id: "error-logs", label: "Error Logs", icon: AlertTriangle, href: "/monitoring/errors" },
        ],
      },
      {
        id: "reports-analytics",
        label: "Reports & Analytics",
        icon: BarChart3,
        children: [
          { id: "system-usage", label: "System Usage Reports", icon: Activity, href: "/reports/usage" },
          { id: "performance-metrics", label: "Performance Metrics", icon: TrendingUp, href: "/reports/performance" },
          { id: "compliance-reports", label: "Compliance Reports", icon: Shield, href: "/reports/compliance" },
        ],
      },
    ],
  },
  {
    role: "superadmin",
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/superadmin",
      },
      {
        id: "system-administration",
        label: "System Administration",
        icon: Settings,
        children: [
          { id: "global-configuration", label: "Global Configuration", icon: Globe, href: "/admin/global-config" },
          { id: "multi-tenant", label: "Multi-Tenant Management", icon: Database, href: "/admin/tenants" },
          { id: "platform-monitoring", label: "Platform Monitoring", icon: Activity, href: "/admin/monitoring" },
          {
            id: "security-compliance",
            label: "Security & Compliance",
            icon: Shield,
            href: "/admin/security-compliance",
          },
          { id: "security-settings", label: "Security Settings", icon: Lock, href: "/admin/security" },
        ],
      },
      {
        id: "user-org-management",
        label: "User & Organization Management",
        icon: Users,
        children: [
          { id: "organization-setup", label: "Organization Setup", icon: Database, href: "/admin/organizations" },
          { id: "global-user-management", label: "Global User Management", icon: Users, href: "/admin/users" },
          { id: "role-templates", label: "Role Templates", icon: UserCheck, href: "/admin/role-templates" },
          { id: "access-control", label: "Access Control", icon: Lock, href: "/admin/access-control" },
        ],
      },
      {
        id: "platform-management",
        label: "Platform Management",
        icon: Zap,
        children: [
          { id: "module-configuration", label: "Module Configuration", icon: Settings, href: "/admin/modules" },
          { id: "integration-marketplace", label: "Integration Marketplace", icon: Zap, href: "/admin/marketplace" },
          {
            id: "marketplace-extensibility",
            label: "Marketplace & Extensibility",
            icon: Zap,
            href: "/admin/marketplace-extensibility",
          },
          { id: "feature-toggles", label: "Feature Toggles", icon: Eye, href: "/admin/features" },
          { id: "version-management", label: "Version Management", icon: Activity, href: "/admin/versions" },
        ],
      },
      {
        id: "analytics-insights",
        label: "Analytics & Insights",
        icon: BarChart3,
        children: [
          { id: "platform-analytics", label: "Platform Analytics", icon: BarChart3, href: "/admin/analytics" },
          { id: "usage-metrics", label: "Usage Metrics", icon: TrendingUp, href: "/admin/usage" },
          { id: "performance-insights", label: "Performance Insights", icon: Activity, href: "/admin/insights" },
          { id: "business-intelligence", label: "Business Intelligence", icon: Eye, href: "/admin/bi" },
        ],
      },
      {
        id: "compliance-audit",
        label: "Compliance & Audit",
        icon: Shield,
        children: [
          { id: "global-audit-logs", label: "Global Audit Logs", icon: Eye, href: "/admin/audit" },
          { id: "compliance-monitoring", label: "Compliance Monitoring", icon: Shield, href: "/admin/compliance" },
          { id: "regulatory-updates", label: "Regulatory Updates", icon: FileText, href: "/admin/regulatory" },
          { id: "risk-analytics", label: "Risk Analytics", icon: AlertTriangle, href: "/admin/risk" },
        ],
      },
    ],
  },
  {
    role: "client",
    navigation: [], // Will be populated dynamically by getNavigationForRole
  },
]

export function getNavigationForRole(
  role: string,
  entityType?: string,
  scenario?: string,
  relationshipRole?: string,
): NavigationItem[] {
  if (role === "client") {
    return getEntityAwareNavigation(entityType, scenario, relationshipRole)
  }

  const roleConfig = navigationConfig.find((config) => config.role === role)
  return roleConfig?.navigation || []
}
