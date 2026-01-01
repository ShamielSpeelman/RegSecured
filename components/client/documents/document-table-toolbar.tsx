"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface DocumentTableToolbarProps {
  requiredDocuments?: any[]
}

export function DocumentTableToolbar({ requiredDocuments }: DocumentTableToolbarProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <Input placeholder="Filter documents..." className="max-w-sm" />
      <Button>
        <Upload className="mr-2 h-4 w-4" />
        Upload Document
      </Button>
    </div>
  )
}
