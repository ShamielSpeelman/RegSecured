import { Shield, FileText, Brain, Eye, BarChart3 } from "lucide-react"

export interface Module {
  id: string
  name: string
  status: "active" | "maintenance" | "inactive"
  version: string
  health: number
  usage: number
  dependencies: string[]
  features: number
  activeFeatures: number
  organizations: number
  icon: any
  color: string
}

export interface Dependency {
  source: string
  target: string
  type: "critical" | "high" | "medium" | "low"
}

export interface FeatureToggle {
  id: string
  name: string
  module: string
  status: "active" | "beta" | "alpha" | "development"
  rollout: number
  organizations: number
  performance: string
  risk: "none" | "low" | "medium" | "high"
}

export interface PerformanceMetric {
  time: string
  cpu: number
  memory: number
  requests: number
}

export interface UsageAnalytic {
  name: string
  value: number
  color: string
}

export const moduleData: Module[] = [
  {
    id: "kyc-aml",
    name: "KYC/AML Engine",
    status: "active",
    version: "3.2.1",
    health: 98,
    usage: 87,
    dependencies: ["document-verification", "risk-assessment"],
    features: 15,
    activeFeatures: 13,
    organizations: 45,
    icon: Shield,
    color: "#10b981",
  },
  {
    id: "document-verification",
    name: "Document Verification",
    status: "active",
    version: "2.8.3",
    health: 95,
    usage: 92,
    dependencies: ["ocr-engine", "ai-validation"],
    features: 12,
    activeFeatures: 11,
    organizations: 42,
    icon: FileText,
    color: "#3b82f6",
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment AI",
    status: "active",
    version: "4.1.0",
    health: 99,
    usage: 78,
    dependencies: ["ml-engine", "data-analytics"],
    features: 18,
    activeFeatures: 16,
    organizations: 38,
    icon: Brain,
    color: "#f59e0b",
  },
  {
    id: "compliance-monitoring",
    name: "Compliance Monitor",
    status: "maintenance",
    version: "2.5.7",
    health: 85,
    usage: 65,
    dependencies: ["audit-trail", "reporting"],
    features: 10,
    activeFeatures: 8,
    organizations: 35,
    icon: Eye,
    color: "#ef4444",
  },
  {
    id: "reporting-engine",
    name: "Advanced Reporting",
    status: "active",
    version: "3.0.2",
    health: 97,
    usage: 89,
    dependencies: ["data-warehouse", "visualization"],
    features: 22,
    activeFeatures: 20,
    organizations: 48,
    icon: BarChart3,
    color: "#8b5cf6",
  },
]

export const dependencyData: Dependency[] = [
  { source: "KYC/AML Engine", target: "Document Verification", type: "critical" },
  { source: "KYC/AML Engine", target: "Risk Assessment AI", type: "high" },
  { source: "Document Verification", target: "OCR Engine", type: "critical" },
  { source: "Risk Assessment AI", target: "ML Engine", type: "critical" },
  { source: "Compliance Monitor", target: "Audit Trail", type: "medium" },
  { source: "Advanced Reporting", target: "Data Warehouse", type: "high" },
]

export const featureToggleData: FeatureToggle[] = [
  {
    id: "ai-enhanced-kyc",
    name: "AI-Enhanced KYC",
    module: "KYC/AML Engine",
    status: "beta",
    rollout: 25,
    organizations: 12,
    performance: "+15% accuracy",
    risk: "low",
  },
  {
    id: "real-time-screening",
    name: "Real-time Screening",
    module: "Risk Assessment AI",
    status: "active",
    rollout: 100,
    organizations: 38,
    performance: "+30% speed",
    risk: "none",
  },
  {
    id: "biometric-verification",
    name: "Biometric Verification",
    module: "Document Verification",
    status: "alpha",
    rollout: 5,
    organizations: 2,
    performance: "+95% accuracy",
    risk: "medium",
  },
  {
    id: "predictive-compliance",
    name: "Predictive Compliance",
    module: "Compliance Monitor",
    status: "development",
    rollout: 0,
    organizations: 0,
    performance: "TBD",
    risk: "high",
  },
]

export const performanceData: PerformanceMetric[] = [
  { time: "00:00", cpu: 45, memory: 62, requests: 1200 },
  { time: "04:00", cpu: 38, memory: 58, requests: 800 },
  { time: "08:00", cpu: 72, memory: 75, requests: 2400 },
  { time: "12:00", cpu: 85, memory: 82, requests: 3200 },
  { time: "16:00", cpu: 78, memory: 79, requests: 2800 },
  { time: "20:00", cpu: 52, memory: 65, requests: 1600 },
]

export const usageAnalytics: UsageAnalytic[] = [
  { name: "KYC/AML", value: 35, color: "#10b981" },
  { name: "Document Verification", value: 28, color: "#3b82f6" },
  { name: "Risk Assessment", value: 22, color: "#f59e0b" },
  { name: "Reporting", value: 15, color: "#8b5cf6" },
]
