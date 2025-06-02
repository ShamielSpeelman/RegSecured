"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Download, Star, Shield, Zap, Search, Filter, TrendingUp, Users, CheckCircle, Clock } from "lucide-react"

const marketplaceData = {
  featured: [
    {
      id: "salesforce-connector",
      name: "Salesforce CRM Connector",
      vendor: "RegSecured Labs",
      category: "CRM Integration",
      rating: 4.9,
      downloads: 15420,
      price: "Enterprise",
      certified: true,
      description: "Seamless Salesforce integration with real-time data sync and compliance mapping",
      features: ["Real-time sync", "Compliance mapping", "Custom fields", "Audit trail"],
      status: "active",
    },
    {
      id: "aws-security-hub",
      name: "AWS Security Hub",
      vendor: "Amazon Web Services",
      category: "Security",
      rating: 4.8,
      downloads: 12350,
      price: "Free",
      certified: true,
      description: "Centralized security findings aggregation from AWS security services",
      features: ["Multi-account support", "Custom insights", "Automated remediation", "Compliance standards"],
      status: "active",
    },
    {
      id: "microsoft-sentinel",
      name: "Microsoft Sentinel SIEM",
      vendor: "Microsoft Corporation",
      category: "Security",
      rating: 4.7,
      downloads: 9870,
      price: "Premium",
      certified: true,
      description: "Advanced threat detection and response with AI-powered analytics",
      features: ["AI analytics", "Threat hunting", "Incident response", "Custom playbooks"],
      status: "active",
    },
  ],
  categories: [
    { name: "CRM Integration", count: 24, icon: Users },
    { name: "Security", count: 18, icon: Shield },
    { name: "Analytics", count: 15, icon: TrendingUp },
    { name: "Automation", count: 12, icon: Zap },
    { name: "Compliance", count: 21, icon: CheckCircle },
    { name: "Data Sources", count: 33, icon: Store },
  ],
  stats: {
    totalIntegrations: 156,
    certifiedIntegrations: 89,
    activeInstallations: 47230,
    averageRating: 4.6,
  },
}

export function IntegrationMarketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-blue-600" />
          <CardTitle>Integration Marketplace</CardTitle>
        </div>
        <CardDescription>Discover, install, and manage certified integrations and connectors</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="installed">Installed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {marketplaceData.categories.map((category) => (
                <Card key={category.name} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <category.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium text-sm">{category.name}</h3>
                    <p className="text-xs text-slate-500">{category.count} integrations</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Integrations */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Featured Integrations</h3>
              <div className="grid gap-4">
                {marketplaceData.featured.map((integration) => (
                  <Card key={integration.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{integration.name}</h4>
                            {integration.certified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Certified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-2">by {integration.vendor}</p>
                          <p className="text-sm text-slate-700 mb-3">{integration.description}</p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {integration.features.map((feature) => (
                              <Badge key={feature} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {integration.rating}
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              {integration.downloads.toLocaleString()}
                            </div>
                            <Badge variant="outline">{integration.category}</Badge>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-lg mb-2">{integration.price}</p>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Install
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="installed" className="space-y-4">
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">12 Integrations Installed</h3>
              <p className="text-slate-600">All integrations are running smoothly</p>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">3 Installations Pending</h3>
              <p className="text-slate-600">Awaiting approval or configuration</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-600">{marketplaceData.stats.totalIntegrations}</h3>
                  <p className="text-sm text-slate-600">Total Available</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-green-600">{marketplaceData.stats.certifiedIntegrations}</h3>
                  <p className="text-sm text-slate-600">Certified</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-purple-600">
                    {marketplaceData.stats.activeInstallations.toLocaleString()}
                  </h3>
                  <p className="text-sm text-slate-600">Active Installs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-orange-600">{marketplaceData.stats.averageRating}</h3>
                  <p className="text-sm text-slate-600">Avg Rating</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
