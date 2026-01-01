export interface Alert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  timestamp: Date
  actionRequired: boolean
}

export interface Workload {
  overdue: number
  dueToday: number
  thisWeek: number
  total: number
  efficiency: number
}

export interface Risk {
  highRiskClients: number
  pendingReviews: number
  flaggedTransactions: number
}

export interface Compliance {
  pendingApprovals: number
  upcomingAudits: number
  documentationGaps: number
}

export interface Pipeline {
  slaCompliance: number
  avgProcessingTime: string
  throughput: number
}

export interface Team {
  myRank: number
  totalMembers: number
  avgTeamScore: number
}

export interface Client {
  name: string
  riskLevel: string
  lastReview: string
}

export interface AnalystDashboard {
  alerts: Alert[]
  workload: Workload
  risk: Risk
  compliance: Compliance
  pipeline: Pipeline
  team: Team
  clients: Client[]
  quality: {
    overallScore: number
  }
}

export const mockAnalystDashboard: AnalystDashboard = {
  alerts: [
    {
      id: "1",
      severity: "critical",
      title: "High-Risk Client Requires Immediate Review",
      description: "Client ABC Corp flagged for unusual transaction patterns",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionRequired: true,
    },
    {
      id: "2",
      severity: "high",
      title: "SLA Breach Imminent",
      description: "3 KYC reviews due in next 2 hours",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      actionRequired: true,
    },
    {
      id: "3",
      severity: "medium",
      title: "Documentation Update Required",
      description: "5 clients need updated compliance documents",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      actionRequired: false,
    },
  ],
  workload: {
    overdue: 2,
    dueToday: 5,
    thisWeek: 23,
    total: 47,
    efficiency: 87,
  },
  risk: {
    highRiskClients: 8,
    pendingReviews: 12,
    flaggedTransactions: 5,
  },
  compliance: {
    pendingApprovals: 7,
    upcomingAudits: 2,
    documentationGaps: 4,
  },
  pipeline: {
    slaCompliance: 94,
    avgProcessingTime: "2.3 days",
    throughput: 156,
  },
  team: {
    myRank: 3,
    totalMembers: 12,
    avgTeamScore: 85,
  },
  clients: [
    {
      name: "Acme Corporation",
      riskLevel: "High",
      lastReview: "2024-01-15",
    },
    {
      name: "TechStart Inc",
      riskLevel: "Medium",
      lastReview: "2024-01-20",
    },
  ],
  quality: {
    overallScore: 92,
  },
}
