"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

export const FeaturesCharts = dynamic(
  () => import("@/app/admin/features/page").then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  },
)
