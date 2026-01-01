"use client"

import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const AutoScalingManagerContent = dynamic(
  () =>
    import("./auto-scaling-manager-content").then((mod) => ({
      default: mod.AutoScalingManagerContent,
    })),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    ),
  },
)

export function AutoScalingManager() {
  return <AutoScalingManagerContent />
}
