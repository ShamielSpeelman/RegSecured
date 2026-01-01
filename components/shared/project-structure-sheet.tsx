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

// Static project structure based on the actual files in the project
const projectStructure: TreeNode = {
  name: "regsecured-project",
  type: "folder",
  children: [
    {
      name: "app",
      type: "folder",
      children: [
        { name: "404.tsx", type: "file" },
        { name: "500.tsx", type: "file" },
        { name: "layout.tsx", type: "file" },
        { name: "not-found.tsx", type: "file" },
        { name: "page.tsx", type: "file" },
        {
          name: "admin",
          type: "folder",
          children: [
            {
              name: "access-control",
              type: "folder",
              children: [
                { name: "loading.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
              ],
            },
            {
              name: "analytics",
              type: "folder",
              children: [
                { name: "loading.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
              ],
            },
            { name: "audit", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "bi", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "compliance", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "features", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "global-config", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "insights", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            {
              name: "marketplace",
              type: "folder",
              children: [
                { name: "loading.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
              ],
            },
            { name: "marketplace-extensibility", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            {
              name: "modules",
              type: "folder",
              children: [
                { name: "loading.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
              ],
            },
            { name: "monitoring", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            {
              name: "organizations",
              type: "folder",
              children: [
                { name: "loading.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
              ],
            },
            { name: "regulatory", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "risk", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            {
              name: "role-templates",
              type: "folder",
              children: [
                { name: "loading.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
              ],
            },
            { name: "security", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "security-compliance", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            {
              name: "tenants",
              type: "folder",
              children: [
                { name: "loading.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
              ],
            },
            { name: "usage", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            {
              name: "users",
              type: "folder",
              children: [
                { name: "loading.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
              ],
            },
            { name: "versions", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
          ],
        },
        {
          name: "dashboard",
          type: "folder",
          children: [
            { name: "admin", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "analyst", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "client", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "relationship-manager", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "reviewer", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "superadmin", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
          ],
        },
      ],
    },
    {
      name: "components",
      type: "folder",
      children: [
        {
          name: "shared",
          type: "folder",
          children: [
            { name: "cta-section.tsx", type: "file" },
            { name: "feature-card.tsx", type: "file" },
            { name: "hero-section.tsx", type: "file" },
            { name: "project-structure-sheet.tsx", type: "file" },
          ],
        },
        {
          name: "ui",
          type: "folder",
          children: [{ name: "button-consistent.tsx", type: "file" }],
        },
        {
          name: "layout",
          type: "folder",
          children: [
            { name: "dashboard-layout.tsx", type: "file" },
            { name: "footer.tsx", type: "file" },
            { name: "header.tsx", type: "file" },
          ],
        },
      ],
    },
    {
      name: "lib",
      type: "folder",
      children: [
        {
          name: "document-definitions",
          type: "folder",
          children: [{ name: "document-requirements.ts", type: "file" }],
        },
        {
          name: "form-definitions",
          type: "folder",
          children: [
            { name: "foundation-forms.ts", type: "file" },
            { name: "individual-forms.ts", type: "file" },
            { name: "legal-entity-forms.ts", type: "file" },
            { name: "trust-forms.ts", type: "file" },
          ],
        },
        {
          name: "form-orchestration",
          type: "folder",
          children: [{ name: "form-orchestrator.ts", type: "file" }],
        },
        {
          name: "types",
          type: "folder",
          children: [{ name: "entities.ts", type: "file" }],
        },
        { name: "navigation-config.ts", type: "file" },
      ],
    },
    { name: "README.md", type: "file" },
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
