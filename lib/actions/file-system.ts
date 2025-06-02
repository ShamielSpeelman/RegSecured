"use server"

import fs from "fs"
import path from "path"
import { cache } from "react"

export interface FileNode {
  name: string
  type: "folder" | "file"
  children?: FileNode[]
}

// Cache the result to avoid reading the file system on every request
export const getProjectStructure = cache(async (): Promise<FileNode> => {
  const rootDir = process.cwd()
  return readDirectoryStructure(rootDir, path.basename(rootDir))
})

async function readDirectoryStructure(dirPath: string, name: string): Promise<FileNode> {
  const stats = await fs.promises.stat(dirPath)

  if (!stats.isDirectory()) {
    return { name, type: "file" }
  }

  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true })

    // Filter out node_modules, .git, .next and other common directories to ignore
    const filteredEntries = entries.filter(
      (entry) =>
        !["node_modules", ".git", ".next", ".vercel", "dist", "build", ".vscode", ".idea"].includes(entry.name) &&
        !entry.name.startsWith(".") &&
        !entry.name.endsWith(".log"),
    )

    const children = await Promise.all(
      filteredEntries.map(async (entry) => {
        const entryPath = path.join(dirPath, entry.name)
        return readDirectoryStructure(entryPath, entry.name)
      }),
    )

    // Sort folders first, then files, both alphabetically
    children.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name)
      }
      return a.type === "folder" ? -1 : 1
    })

    return {
      name,
      type: "folder",
      children,
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
    return {
      name,
      type: "folder",
      children: [],
    }
  }
}
