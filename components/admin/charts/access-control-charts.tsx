"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

export const AccessControlCharts = dynamic(
  () => import("@/app/admin/access-control/page").then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  },
)
