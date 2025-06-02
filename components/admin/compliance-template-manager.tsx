"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Search, Download, Upload, Copy, Edit, Eye, Users, Building, Globe, Zap } from "lucide-react"

interface ComplianceTemplate {
  id: string
  name: string
  category: string
  industry: string
  jurisdiction: string[]
  status: "active" | "draft" | "archived"
  deployments: number
  lastUpdated: string
  description: string
  components: string[]
}

export function ComplianceTemplateManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")

  const templates: ComplianceTemplate[] = [
    {
      id: "tmpl-001",
      name: "Standard Banking KYC",
      category: "KYC",
      industry: "Banking",
      jurisdiction: ["US", "EU", "UK"],
      status: "active",
      deployments: 45,
      lastUpdated: "2024-01-15",
      description: "Comprehensive KYC template for traditional banking institutions",
      components: ["Individual Onboarding", "Corporate Onboarding", "Risk Assessment", "Document Verification"],
    },
    {
      id: "tmpl-002",
      name: "Fintech Lite Onboarding",
      category: "Onboarding",
      industry: "Fintech",
      jurisdiction: ["US", "CA"],
      status: "active",
      deployments: 23,
      lastUpdated: "2024-01-18",
      description: "Streamlined onboarding for digital-first financial services",
      components: ["Digital Identity", "Risk Scoring", "Automated Screening"],
    },
    {
      id: "tmpl-003",
      name: "Asset Management AML",
      category: "AML",
      industry: "Asset Management",
      jurisdiction: ["US", "EU", "UK", "SG"],
      status: "active",
      deployments: 12,
      lastUpdated: "2024-01-20",
      description: "Anti-money laundering framework for investment firms",
      components: ["Enhanced Due Diligence", "Ongoing Monitoring", "Sanctions Screening", "PEP Checks"],
    },
    {
      id: "tmpl-004",
      name: "Crypto Exchange Compliance",
      category: "Crypto",
      industry: "Cryptocurrency",
      jurisdiction: ["US", "EU"],
      status: "draft",
      deployments: 0,
      lastUpdated: "2024-01-22",
      description: "Specialized compliance framework for cryptocurrency exchanges",
      components: ["Wallet Verification", "Transaction Monitoring", "Travel Rule", "VASP Compliance"],
    },
  ]

  const categories = ["KYC", "AML", "Onboarding", "Risk Management", "Data Privacy", "Crypto"]
  const industries = ["Banking", "Fintech", "Asset Management", "Insurance", "Cryptocurrency", "Payment Services"]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesIndustry = selectedIndustry === "all" || template.industry === selectedIndustry

    return matchesSearch && matchesCategory && matchesIndustry
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">Compliance Template Manager</h2>
            <p className="text-sm text-slate-600">Deploy and manage compliance templates across tenants</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Upload className="h-3 w-3 mr-2" />
            Import
          </Button>
          <Button size="sm" className="h-8">
            <Plus className="h-3 w-3 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="library" className="space-y-4">
        <TabsList className="grid w-fit grid-cols-3 bg-slate-50">
          <TabsTrigger value="library" className="text-xs">
            Template Library
          </TabsTrigger>
          <TabsTrigger value="deployments" className="text-xs">
            Active Deployments
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="text-xs">
            Marketplace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="w-48">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-48">
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-slate-900">{template.name}</h3>
                        <Badge
                          variant={
                            template.status === "active"
                              ? "default"
                              : template.status === "draft"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {template.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">{template.description}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3 text-slate-400" />
                          <span className="text-slate-600">{template.industry}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-slate-400" />
                          <span className="text-slate-600">{template.deployments} deployments</span>
                        </div>
                      </div>
                      <span className="text-slate-500">{template.lastUpdated}</span>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-slate-600">Jurisdictions</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.jurisdiction.map((jurisdiction, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {jurisdiction}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-slate-600">Components</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.components.slice(0, 3).map((component, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {component}
                          </Badge>
                        ))}
                        {template.components.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.components.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button size="sm" className="h-7 text-xs flex-1">
                        <Zap className="h-3 w-3 mr-1" />
                        Deploy
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deployments" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Template Deployments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">Template deployment tracking</p>
                <p className="text-xs mt-1">Monitor template usage across all tenants</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Template Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <Globe className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">Community template marketplace</p>
                <p className="text-xs mt-1">Browse and share compliance templates with the community</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
