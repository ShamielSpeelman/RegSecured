"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { useDebounce } from "@/lib/hooks/use-debounce"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import type { Document } from "@/types"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DocumentTableToolbar } from "./document-table-toolbar"
import { DocumentRequirementsEngine, type DocumentRequirement } from "@/lib/document-definitions/document-requirements"

interface EnhancedDocumentManagerProps {
  documents: Document[]
}

export function EnhancedDocumentManager({ documents: initialDocuments }: EnhancedDocumentManagerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [requiredDocuments, setRequiredDocuments] = useState<DocumentRequirement[]>([])

  const category = searchParams.get("category") || ""
  const debouncedCategory = useDebounce(category, 500)

  useEffect(() => {
    const documents = DocumentRequirementsEngine.getRequiredDocuments(debouncedCategory)
    setRequiredDocuments(documents)
  }, [debouncedCategory])

  return (
    <div>
      <DocumentTableToolbar requiredDocuments={requiredDocuments} />
      <DataTable columns={columns} data={documents} />
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Open Alert</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
