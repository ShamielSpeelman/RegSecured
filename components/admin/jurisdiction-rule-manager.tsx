"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Plus, Search, Edit, Copy, Trash2, Eye, FileText, Settings } from "lucide-react"

interface JurisdictionRule {
  id: string
  jurisdiction: string
  ruleType: string
  status: "active" | "draft" | "deprecated"
  lastUpdated: string
  applicableEntities: string[]
  riskLevel: "low" | "medium" | "high"
  requirements: string[]
}

export function JurisdictionRuleManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("all")
  const [selectedRuleType, setSelectedRuleType] = useState("all")

  const jurisdictionRules: JurisdictionRule[] = [
    {
      id: "us-kyc-001",
      jurisdiction: "United States",
      ruleType: "KYC Individual",
      status: "active",
      lastUpdated: "2024-01-15",
      applicableEntities: ["Individual", "Sole Proprietorship"],
      riskLevel: "medium",
      requirements: ["Government ID", "Proof of Address", "SSN Verification"],
    },
    {
      id: "eu-gdpr-001",
      jurisdiction: "European Union",
      ruleType: "Data Privacy",
      status: "active",
      lastUpdated: "2024-01-10",
      applicableEntities: ["All"],
      riskLevel: "high",
      requirements: ["Consent Management", "Data Processing Agreement", "Privacy Notice"],
    },
    {
      id: "uk-corp-001",
      jurisdiction: "United Kingdom",
      ruleType: "Corporate KYC",
      status: "active",
      lastUpdated: "2024-01-12",
      applicableEntities: ["Corporation", "Partnership", "Trust"],
      riskLevel: "high",
      requirements: ["Certificate of Incorporation", "UBO Declaration", "Director Verification"],
    },
    {
      id: "sg-aml-001",
      jurisdiction: "Singapore",
      ruleType: "AML Screening",
      status: "draft",
      lastUpdated: "2024-01-20",
      applicableEntities: ["All"],
      riskLevel: "medium",
      requirements: ["Sanctions Check", "PEP Screening", "Adverse Media"],
    },
  ]

  const jurisdictions = ["United States", "European Union", "United Kingdom", "Singapore", "Canada", "Australia"]
  const ruleTypes = ["KYC Individual", "KYC Corporate", "AML Screening", "Data Privacy", "Tax Compliance"]

  const filteredRules = jurisdictionRules.filter((rule) => {
    const matchesSearch =
      rule.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.ruleType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesJurisdiction = selectedJurisdiction === "all" || rule.jurisdiction === selectedJurisdiction
    const matchesRuleType = selectedRuleType === "all" || rule.ruleType === selectedRuleType

    return matchesSearch && matchesJurisdiction && matchesRuleType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">Jurisdiction Rule Management</h2>
            <p className="text-sm text-slate-600">Configure compliance rules across global jurisdictions</p>
          </div>
        </div>
        <Button size="sm" className="h-8">
          <Plus className="h-3 w-3 mr-2" />
          New Rule
        </Button>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList className="grid w-fit grid-cols-3 bg-slate-50">
          <TabsTrigger value="rules" className="text-xs">
            Rule Library
          </TabsTrigger>
          <TabsTrigger value="builder" className="text-xs">
            Visual Builder
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-xs">
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search rules by jurisdiction or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="w-48">
                  <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All Jurisdictions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jurisdictions</SelectItem>
                      {jurisdictions.map((jurisdiction) => (
                        <SelectItem key={jurisdiction} value={jurisdiction}>
                          {jurisdiction}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-48">
                  <Select value={selectedRuleType} onValueChange={setSelectedRuleType}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All Rule Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Rule Types</SelectItem>
                      {ruleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rules Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredRules.map((rule) => (
              <Card key={rule.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-slate-900">{rule.jurisdiction}</h3>
                        <Badge variant="outline" className="text-xs">
                          {rule.ruleType}
                        </Badge>
                        <Badge
                          variant={
                            rule.status === "active" ? "default" : rule.status === "draft" ? "secondary" : "destructive"
                          }
                          className="text-xs"
                        >
                          {rule.status}
                        </Badge>
                        <Badge
                          variant={
                            rule.riskLevel === "high"
                              ? "destructive"
                              : rule.riskLevel === "medium"
                                ? "secondary"
                                : "default"
                          }
                          className="text-xs"
                        >
                          {rule.riskLevel} risk
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-6 text-sm">
                        <div>
                          <Label className="text-xs font-medium text-slate-600">Applicable Entities</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {rule.applicableEntities.map((entity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {entity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs font-medium text-slate-600">Requirements</Label>
                          <div className="mt-1">
                            <span className="text-xs text-slate-700">{rule.requirements.length} requirements</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs font-medium text-slate-600">Last Updated</Label>
                          <div className="mt-1">
                            <span className="text-xs text-slate-700">{rule.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Visual Rule Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <Settings className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">Visual rule builder interface coming soon</p>
                <p className="text-xs mt-1">Drag-and-drop rule creation with conditional logic</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Rule Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">Pre-built compliance templates</p>
                <p className="text-xs mt-1">Industry-standard rule templates for quick deployment</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
