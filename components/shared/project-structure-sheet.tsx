"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react"
import { useState } from "react"

interface ProjectStructureSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface TreeNode {
  name: string
  type: "folder" | "file"
  children?: TreeNode[]
}

// Simplified structure based on standard Next.js project layout
const projectStructure: TreeNode = {
  name: "project-root",
  type: "folder",
  children: [
    {
      name: "app",
      type: "folder",
      children: [
        { name: "globals.css", type: "file" },
        { name: "layout.tsx", type: "file" },
        { name: "page.tsx", type: "file" },
      ],
    },
    {
      name: "components",
      type: "folder",
      children: [
        {
          name: "shared",
          type: "folder",
          children: [{ name: "project-structure-sheet.tsx", type: "file" }],
        },
        {
          name: "ui",
          type: "folder",
          children: [
            { name: "button.tsx", type: "file" },
            { name: "card.tsx", type: "file" },
            { name: "sheet.tsx", type: "file" },
          ],
        },
      ],
    },
    {
      name: "lib",
      type: "folder",
      children: [{ name: "utils.ts", type: "file" }],
    },
    { name: "next.config.mjs", type: "file" },
    { name: "package.json", type: "file" },
    { name: "tailwind.config.ts", type: "file" },
    { name: "tsconfig.json", type: "file" },
  ],
}

function TreeItem({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(level < 2)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <div className="flex items-center py-1" style={{ paddingLeft: `${level * 16}px` }}>
        {hasChildren ? (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center space-x-2 hover:bg-stone-100 rounded px-2 py-1 w-full text-left">
              {isOpen ? (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-500" />
              )}
              <Folder className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">{node.name}</span>
            </CollapsibleTrigger>
          </Collapsible>
        ) : (
          <div className="flex items-center space-x-2 px-2 py-1">
            <div className="w-4 h-4" />
            <File className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600">{node.name}</span>
          </div>
        )}
      </div>
      {hasChildren && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            {node.children?.map((child, index) => (
              <TreeItem key={index} node={child} level={level + 1} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}

export function ProjectStructureSheet({ open, onOpenChange }: ProjectStructureSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full h-full max-w-none p-0 bg-stone-50">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b border-stone-200 bg-white">
            <SheetTitle className="text-xl font-medium text-slate-800">Project Structure</SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-1">
              <TreeItem node={projectStructure} />
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
