"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type DocumentStatus = "pending" | "uploaded" | "reviewing" | "approved" | "rejected"

export interface DocumentRequirement {
  id: string
  title: string
  description: string
  required: boolean
  acceptedFormats: string[]
  maxSize: number // in MB
  status: DocumentStatus
  uploadedFile?: {
    name: string
    size: number
    uploadDate: Date
    previewUrl?: string
  }
  rejectionReason?: string
}

interface DocumentUploadCardProps {
  document: DocumentRequirement
  onUpload: (documentId: string, file: File) => Promise<void>
  onRemove: (documentId: string) => Promise<void>
  className?: string
}

export function DocumentUploadCard({ document, onUpload, onRemove, className }: DocumentUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFileUpload(e.target.files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || ""
    const isValidType = document.acceptedFormats.some(
      (format) => format.toLowerCase() === `.${fileExtension}` || format.toLowerCase() === fileExtension,
    )

    if (!isValidType) {
      setError(`Invalid file type. Accepted formats: ${document.acceptedFormats.join(", ")}`)
      return
    }

    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > document.maxSize) {
      setError(`File too large. Maximum size: ${document.maxSize}MB`)
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      await onUpload(document.id, file)
    } catch (err) {
      setError("Failed to upload file. Please try again.")
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async () => {
    try {
      await onRemove(document.id)
    } catch (err) {
      setError("Failed to remove file. Please try again.")
      console.error(err)
    }
  }

  const getStatusIcon = () => {
    switch (document.status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "reviewing":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "uploaded":
        return <FileText className="h-5 w-5 text-slate-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (document.status) {
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "reviewing":
        return "Under Review"
      case "uploaded":
        return "Uploaded"
      default:
        return "Not Uploaded"
    }
  }

  const getStatusColor = () => {
    switch (document.status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "reviewing":
        return "bg-blue-100 text-blue-700"
      case "uploaded":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-500"
    }
  }

  return (
    <Card className={cn("border-stone-200/70", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-medium text-slate-800">
              {document.title}
              {document.required && <span className="text-red-500 ml-1">*</span>}
            </CardTitle>
            <CardDescription className="text-sm mt-1">{document.description}</CardDescription>
          </div>
          <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor())}>
            <div className="flex items-center space-x-1">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {document.status === "rejected" && document.rejectionReason && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-700">
            <p className="font-medium">Rejection reason:</p>
            <p>{document.rejectionReason}</p>
          </div>
        )}

        {document.status === "pending" || document.status === "rejected" ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
              isDragging ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:border-slate-300",
              "cursor-pointer",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id={`file-upload-${document.id}`}
              className="sr-only"
              onChange={handleFileChange}
              accept={document.acceptedFormats.join(",")}
            />
            <label htmlFor={`file-upload-${document.id}`} className="cursor-pointer flex flex-col items-center">
              <Upload className="h-10 w-10 text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-700">Drag and drop or click to upload</p>
              <p className="text-xs text-slate-500 mt-1">
                Accepted formats: {document.acceptedFormats.join(", ")} (Max: {document.maxSize}MB)
              </p>
              {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
              {isUploading && <p className="text-xs text-blue-600 mt-2">Uploading...</p>}
            </label>
          </div>
        ) : (
          document.uploadedFile && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                      {document.uploadedFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(document.uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Uploaded{" "}
                      {document.uploadedFile.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {document.status !== "approved" && (
                  <Button variant="ghost" size="sm" onClick={handleRemove} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {document.uploadedFile.previewUrl && (
                <div className="mt-3">
                  <a
                    href={document.uploadedFile.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Preview document
                  </a>
                </div>
              )}
            </div>
          )
        )}

        <div className="mt-3 text-xs text-slate-500">
          <p>
            {document.status === "approved"
              ? "This document has been verified and approved."
              : document.status === "reviewing"
                ? "This document is currently under review by our team."
                : document.status === "uploaded"
                  ? "Document uploaded successfully and pending review."
                  : "Please upload this document to proceed with your application."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
