export interface User {
  id: string
  name: string
  email: string
  role: string
  organization: string
  status: "active" | "inactive" | "suspended"
  lastLogin: string
  location: string
  device: string
  riskScore: number
  engagementScore: number
  organizations: string[]
  avatar?: string
}

export interface UserActivityData {
  date: string
  logins: number
  activeUsers: number
  newUsers: number
}

export interface EngagementData {
  feature: string
  usage: number
  trend: string
}

export interface GeographicData {
  region: string
  users: number
  percentage: number
}

export interface RiskAlert {
  id: string
  user: string
  type: string
  severity: "low" | "medium" | "high"
  description: string
  timestamp: string
}

export const mockUsers: User[] = [
  {
    id: "usr_001",
    name: "Sarah Johnson",
    email: "sarah.johnson@acmebank.com",
    role: "Senior Analyst",
    organization: "ACME Bank",
    status: "active",
    lastLogin: "2024-01-25T10:30:00Z",
    location: "New York, US",
    device: "Chrome on Windows",
    riskScore: 15,
    engagementScore: 92,
    organizations: ["ACME Bank", "ACME Securities"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "usr_002",
    name: "Michael Chen",
    email: "m.chen@globalfinance.com",
    role: "Compliance Manager",
    organization: "Global Finance Corp",
    status: "active",
    lastLogin: "2024-01-25T09:15:00Z",
    location: "Singapore, SG",
    device: "Safari on macOS",
    riskScore: 8,
    engagementScore: 87,
    organizations: ["Global Finance Corp"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "usr_003",
    name: "Emma Rodriguez",
    email: "e.rodriguez@eurobank.eu",
    role: "Risk Analyst",
    organization: "EuroBank",
    status: "suspended",
    lastLogin: "2024-01-24T16:45:00Z",
    location: "Madrid, ES",
    device: "Firefox on Linux",
    riskScore: 45,
    engagementScore: 34,
    organizations: ["EuroBank"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "usr_004",
    name: "David Kim",
    email: "d.kim@asiafintech.com",
    role: "Relationship Manager",
    organization: "Asia FinTech",
    status: "inactive",
    lastLogin: "2024-01-20T14:20:00Z",
    location: "Seoul, KR",
    device: "Chrome on Android",
    riskScore: 22,
    engagementScore: 78,
    organizations: ["Asia FinTech", "Korea Investment"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export const mockActivityData: UserActivityData[] = [
  { date: "2024-01-20", logins: 1250, activeUsers: 980, newUsers: 45 },
  { date: "2024-01-21", logins: 1180, activeUsers: 920, newUsers: 38 },
  { date: "2024-01-22", logins: 1320, activeUsers: 1050, newUsers: 52 },
  { date: "2024-01-23", logins: 1280, activeUsers: 1020, newUsers: 41 },
  { date: "2024-01-24", logins: 1450, activeUsers: 1150, newUsers: 67 },
  { date: "2024-01-25", logins: 1380, activeUsers: 1100, newUsers: 55 },
]

export const mockEngagementData: EngagementData[] = [
  { feature: "KYC Reviews", usage: 85, trend: "+12%" },
  { feature: "Risk Assessment", usage: 78, trend: "+8%" },
  { feature: "Document Upload", usage: 92, trend: "+15%" },
  { feature: "Compliance Reports", usage: 67, trend: "-3%" },
  { feature: "Client Communications", usage: 74, trend: "+5%" },
]

export const mockGeographicData: GeographicData[] = [
  { region: "North America", users: 450, percentage: 35 },
  { region: "Europe", users: 380, percentage: 29 },
  { region: "Asia Pacific", users: 320, percentage: 25 },
  { region: "Latin America", users: 90, percentage: 7 },
  { region: "Middle East & Africa", users: 50, percentage: 4 },
]

export const mockRiskAlerts: RiskAlert[] = [
  {
    id: "alert_001",
    user: "Emma Rodriguez",
    type: "Suspicious Login",
    severity: "high",
    description: "Multiple failed login attempts from unusual location",
    timestamp: "2024-01-25T08:30:00Z",
  },
  {
    id: "alert_002",
    user: "John Smith",
    type: "Privilege Escalation",
    severity: "medium",
    description: "User requested admin access outside normal hours",
    timestamp: "2024-01-25T07:15:00Z",
  },
  {
    id: "alert_003",
    user: "Lisa Wang",
    type: "Data Access Anomaly",
    severity: "low",
    description: "Unusual pattern in document access behavior",
    timestamp: "2024-01-25T06:45:00Z",
  },
]
