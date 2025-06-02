import { NextResponse } from "next/server"
import { getProjectStructure } from "@/lib/actions/file-system"

// Alternative API route approach if server actions aren't preferred
export async function GET() {
  try {
    const structure = await getProjectStructure()
    return NextResponse.json(structure)
  } catch (error) {
    console.error("Error fetching project structure:", error)
    return NextResponse.json({ error: "Failed to fetch project structure" }, { status: 500 })
  }
}
