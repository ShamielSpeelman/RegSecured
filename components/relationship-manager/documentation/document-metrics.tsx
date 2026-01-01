"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const DocumentMetricsContent = dynamic(
  () =>
    import("./document-metrics-content").then((mod) => ({
      default: mod.DocumentMetricsContent,
    })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[600px] w-full" />,
  },
)

export function DocumentMetrics() {
  return <DocumentMetricsContent />
}

export default DocumentMetrics
