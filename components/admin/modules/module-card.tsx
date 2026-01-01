"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Settings, Eye, RotateCcw, Cpu, Database, Lightbulb } from "lucide-react"
import type { Module } from "@/lib/data/modules-data"

interface ModuleCardProps {
  module: Module
}

export function ModuleCard({ module }: ModuleCardProps) {
  const IconComponent = module.icon

  return (
    <Card className="border-l-4" style={{ borderLeftColor: module.color }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full" style={{ backgroundColor: `${module.color}20` }}>
              <IconComponent className="w-6 h-6" style={{ color: module.color }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{module.name}</h3>
              <div className="flex items-center gap-4 mt-1">
                <Badge
                  variant={
                    module.status === "active"
                      ? "default"
                      : module.status === "maintenance"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {module.status}
                </Badge>
                <span className="text-sm text-slate-500">v{module.version}</span>
                <span className="text-sm text-slate-500">{module.organizations} organizations</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-600">Health Score</p>
              <p className="text-xl font-bold" style={{ color: module.color }}>
                {module.health}%
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <Label className="text-sm font-medium text-slate-600">Usage Rate</Label>
            <div className="mt-2">
              <Progress value={module.usage} className="h-2" />
              <p className="text-sm text-slate-500 mt-1">{module.usage}% utilization</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-600">Features</Label>
            <div className="mt-2">
              <p className="text-lg font-semibold text-slate-800">
                {module.activeFeatures}/{module.features}
              </p>
              <p className="text-sm text-slate-500">Active features</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-600">Dependencies</Label>
            <div className="mt-2">
              <p className="text-lg font-semibold text-slate-800">{module.dependencies.length}</p>
              <p className="text-sm text-slate-500">Connected modules</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-600">Auto-scaling</Label>
            <div className="mt-2 flex items-center gap-2">
              <Switch defaultChecked />
              <span className="text-sm text-slate-500">Enabled</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Last updated: 2 hours ago</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">CPU: 45%</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">Memory: 62%</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Lightbulb className="w-4 h-4" />
            AI Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
