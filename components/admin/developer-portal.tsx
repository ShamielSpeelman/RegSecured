"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Book, Download, Key, Users, Star, Package, FileText, ExternalLink, TrendingUp } from "lucide-react"

const developerData = {
  sdks: [
    {
      id: "javascript-sdk",
      name: "JavaScript SDK",
      version: "v2.4.1",
      language: "JavaScript",
      downloads: 45230,
      rating: 4.8,
      lastUpdated: "2024-01-10T00:00:00Z",
      status: "stable",
      documentation: "Complete",
      examples: 24,
    },
    {
      id: "python-sdk",
      name: "Python SDK",
      version: "v1.9.3",
      language: "Python",
      downloads: 32150,
      rating: 4.9,
      lastUpdated: "2024-01-08T00:00:00Z",
      status: "stable",
      documentation: "Complete",
      examples: 18,
    },
    {
      id: "java-sdk",
      name: "Java SDK",
      version: "v3.1.0",
      language: "Java",
      downloads: 28940,
      rating: 4.7,
      lastUpdated: "2024-01-12T00:00:00Z",
      status: "stable",
      documentation: "Complete",
      examples: 15,
    },
    {
      id: "csharp-sdk",
      name: "C# SDK",
      version: "v2.0.0-beta",
      language: "C#",
      downloads: 12450,
      rating: 4.5,
      lastUpdated: "2024-01-05T00:00:00Z",
      status: "beta",
      documentation: "In Progress",
      examples: 8,
    },
  ],
  developers: [
    {
      id: "dev-001",
      name: "TechCorp Solutions",
      email: "dev@techcorp.com",
      apiKeys: 3,
      lastActive: "2024-01-15T10:30:00Z",
      status: "active",
      tier: "enterprise",
      integrations: 12,
    },
    {
      id: "dev-002",
      name: "FinanceApp Inc",
      email: "api@financeapp.com",
      apiKeys: 2,
      lastActive: "2024-01-15T09:45:00Z",
      status: "active",
      tier: "premium",
      integrations: 8,
    },
    {
      id: "dev-003",
      name: "StartupXYZ",
      email: "tech@startupxyz.com",
      apiKeys: 1,
      lastActive: "2024-01-14T16:20:00Z",
      status: "active",
      tier: "basic",
      integrations: 3,
    },
  ],
  documentation: [
    {
      id: "getting-started",
      title: "Getting Started Guide",
      category: "Basics",
      views: 15420,
      lastUpdated: "2024-01-10T00:00:00Z",
      status: "published",
    },
    {
      id: "api-reference",
      title: "API Reference",
      category: "Reference",
      views: 23450,
      lastUpdated: "2024-01-12T00:00:00Z",
      status: "published",
    },
    {
      id: "webhooks-guide",
      title: "Webhooks Integration",
      category: "Advanced",
      views: 8930,
      lastUpdated: "2024-01-08T00:00:00Z",
      status: "published",
    },
    {
      id: "authentication",
      title: "Authentication Methods",
      category: "Security",
      views: 12340,
      lastUpdated: "2024-01-09T00:00:00Z",
      status: "published",
    },
  ],
  stats: {
    totalDevelopers: 1247,
    activeDevelopers: 892,
    totalDownloads: 156780,
    avgRating: 4.7,
  },
}

export function DeveloperPortal() {
  const [selectedSDK, setSelectedSDK] = useState(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "text-green-600 bg-green-100"
      case "beta":
        return "text-orange-600 bg-orange-100"
      case "alpha":
        return "text-red-600 bg-red-100"
      case "active":
        return "text-green-600 bg-green-100"
      case "published":
        return "text-green-600 bg-green-100"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "enterprise":
        return "text-purple-600 bg-purple-100"
      case "premium":
        return "text-blue-600 bg-blue-100"
      case "basic":
        return "text-slate-600 bg-slate-100"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-indigo-600" />
          <CardTitle>Developer Portal</CardTitle>
        </div>
        <CardDescription>Comprehensive developer resources, SDKs, documentation, and API management</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sdks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
            <TabsTrigger value="developers">Developers</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="sdks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">SDK Library</h3>
              <Button size="sm">
                <Package className="h-4 w-4 mr-2" />
                Publish SDK
              </Button>
            </div>

            <div className="grid gap-4">
              {developerData.sdks.map((sdk) => (
                <Card key={sdk.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{sdk.name}</h4>
                          <Badge variant="outline">{sdk.version}</Badge>
                          <Badge className={getStatusColor(sdk.status)}>{sdk.status}</Badge>
                        </div>

                        <p className="text-sm text-slate-600 mb-3">{sdk.language}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-slate-600">Downloads</p>
                            <p className="text-lg font-semibold">{sdk.downloads.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{sdk.rating}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Documentation</p>
                            <p className="font-semibold">{sdk.documentation}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Examples</p>
                            <p className="font-semibold">{sdk.examples}</p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-500">
                          Last updated: {new Date(sdk.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Book className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="developers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Registered Developers</h3>
              <Button size="sm">
                <Users className="h-4 w-4 mr-2" />
                Invite Developer
              </Button>
            </div>

            <div className="grid gap-4">
              {developerData.developers.map((developer) => (
                <Card key={developer.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{developer.name}</h4>
                          <Badge className={getStatusColor(developer.status)}>{developer.status}</Badge>
                          <Badge className={getTierColor(developer.tier)}>{developer.tier}</Badge>
                        </div>

                        <p className="text-sm text-slate-600 mb-3">{developer.email}</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-slate-600">API Keys</p>
                            <p className="font-semibold">{developer.apiKeys}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Integrations</p>
                            <p className="font-semibold">{developer.integrations}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Last Active</p>
                            <p className="font-semibold">{new Date(developer.lastActive).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Documentation Library</h3>
              <Button size="sm">
                <Book className="h-4 w-4 mr-2" />
                Add Documentation
              </Button>
            </div>

            <div className="grid gap-3">
              {developerData.documentation.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium">{doc.title}</h4>
                          <Badge variant="outline">{doc.category}</Badge>
                          <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>{doc.views.toLocaleString()} views</span>
                          <span>Updated {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {developerData.stats.totalDevelopers.toLocaleString()}
                  </h3>
                  <p className="text-sm text-slate-600">Total Developers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-green-600">
                    {developerData.stats.activeDevelopers.toLocaleString()}
                  </h3>
                  <p className="text-sm text-slate-600">Active Developers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-purple-600">
                    {developerData.stats.totalDownloads.toLocaleString()}
                  </h3>
                  <p className="text-sm text-slate-600">Total Downloads</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-orange-600">{developerData.stats.avgRating}</h3>
                  <p className="text-sm text-slate-600">Avg Rating</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Developer Activity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Developer Analytics Dashboard</h3>
                  <p className="text-slate-600">Comprehensive insights into developer engagement and SDK usage</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
