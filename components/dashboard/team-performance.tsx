"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, Target } from "lucide-react"
import type { Team } from "@/lib/mock-analyst-dashboard"

interface TeamPerformanceComponentProps {
  team: Team
}

export function TeamPerformanceComponent({ team }: TeamPerformanceComponentProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="text-sm text-yellow-700 font-medium">My Rank</span>
            </div>
            <div className="text-3xl font-bold text-yellow-600">
              #{team.myRank}
              <span className="text-lg text-yellow-700"> / {team.totalMembers}</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800 mt-2">
              {team.myRank <= 3 ? "Top Performer" : "Good Standing"}
            </Badge>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">Team Size</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">{team.totalMembers}</div>
            <p className="text-xs text-blue-700 mt-1">active analysts</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700 font-medium">Team Avg Score</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{team.avgTeamScore}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
