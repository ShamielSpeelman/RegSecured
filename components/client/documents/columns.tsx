"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Document = {
  id: string
  name: string
  type: string
  status: "pending" | "approved" | "rejected" | "expired"
  uploadedDate: string
  expiryDate?: string
}

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Document Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "approved"
              ? "default"
              : status === "pending"
                ? "secondary"
                : status === "rejected"
                  ? "destructive"
                  : "outline"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "uploadedDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Uploaded Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
]
