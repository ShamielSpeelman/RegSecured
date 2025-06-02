"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, User, Building2, Shield, Users, Percent, FileText } from "lucide-react"
import type { EntityType, RelationshipRole, Relationship, EntityInfo, IndividualInfo } from "@/lib/types/entities"

interface RelationshipManagerProps {
  primaryEntityId: string
  primaryEntityType: EntityType
  relationships: Relationship[]
  relatedEntities: (EntityInfo | IndividualInfo)[]
  onAddRelationship: (relationship: Omit<Relationship, "id">) => void
  onUpdateRelationship: (id: string, relationship: Partial<Relationship>) => void
  onRemoveRelationship: (id: string) => void
}

const ROLE_CATEGORIES = {
  ownership: {
    label: "Ownership & Control",
    roles: ["ultimate-beneficial-owner", "shareholder", "stakeholder"] as RelationshipRole[],
    icon: Percent,
    color: "blue",
  },
  management: {
    label: "Management & Operations",
    roles: ["director", "officer", "authorized-signatory", "corporate-secretary"] as RelationshipRole[],
    icon: Users,
    color: "green",
  },
  trust: {
    label: "Trust & Fiduciary",
    roles: ["trustee", "beneficiary", "settlor", "protector"] as RelationshipRole[],
    icon: Shield,
    color: "purple",
  },
  legal: {
    label: "Legal & Professional",
    roles: ["legal-representative", "solicitor", "lawyer", "administrative-company"] as RelationshipRole[],
    icon: FileText,
    color: "orange",
  },
  investment: {
    label: "Investment & Finance",
    roles: ["investor", "fund-manager", "general-partner", "limited-partner", "loan-note-holder"] as RelationshipRole[],
    icon: Building2,
    color: "emerald",
  },
}

const ROLE_LABELS: Record<RelationshipRole, string> = {
  "ultimate-beneficial-owner": "Ultimate Beneficial Owner",
  shareholder: "Shareholder",
  stakeholder: "Stakeholder",
  director: "Director",
  officer: "Officer",
  trustee: "Trustee",
  beneficiary: "Beneficiary",
  settlor: "Settlor",
  protector: "Protector",
  "authorized-signatory": "Authorized Signatory",
  "legal-representative": "Legal Representative",
  solicitor: "Solicitor",
  lawyer: "Lawyer",
  "administrative-company": "Administrative Company",
  "management-company": "Management Company",
  "loan-note-holder": "Loan Note Holder",
  investor: "Investor",
  "fund-manager": "Fund Manager",
  "general-partner": "General Partner",
  "limited-partner": "Limited Partner",
  "nominee-director": "Nominee Director",
  "nominee-shareholder": "Nominee Shareholder",
  "corporate-secretary": "Corporate Secretary",
}

export function RelationshipManager({
  primaryEntityId,
  primaryEntityType,
  relationships,
  relatedEntities,
  onAddRelationship,
  onUpdateRelationship,
  onRemoveRelationship,
}: RelationshipManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRelationship, setEditingRelationship] = useState<Relationship | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Group relationships by category
  const groupedRelationships = Object.entries(ROLE_CATEGORIES).reduce(
    (acc, [category, config]) => {
      acc[category] = relationships.filter((rel) => config.roles.includes(rel.role))
      return acc
    },
    {} as Record<string, Relationship[]>,
  )

  // Calculate ownership totals
  const totalOwnership = relationships
    .filter((rel) => rel.ownershipPercentage)
    .reduce((sum, rel) => sum + (rel.ownershipPercentage || 0), 0)

  const getEntityName = (entityId: string) => {
    const entity = relatedEntities.find((e) => e.id === entityId)
    if (!entity) return "Unknown Entity"

    if ("firstName" in entity) {
      return `${entity.firstName} ${entity.lastName}`
    } else {
      return entity.name
    }
  }

  const getEntityType = (entityId: string) => {
    const entity = relatedEntities.find((e) => e.id === entityId)
    if (!entity) return "unknown"

    return "firstName" in entity ? "individual" : "entity"
  }

  const getRoleBadgeColor = (role: RelationshipRole) => {
    for (const [category, config] of Object.entries(ROLE_CATEGORIES)) {
      if (config.roles.includes(role)) {
        return config.color
      }
    }
    return "gray"
  }

  return (
    <Card className="border-stone-200/70">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Entity Relationships</CardTitle>
            <CardDescription>Manage ownership, control, and other relationships for this entity</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Relationship
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Relationship</DialogTitle>
                <DialogDescription>Define a new relationship between entities or individuals</DialogDescription>
              </DialogHeader>
              <AddRelationshipForm
                primaryEntityId={primaryEntityId}
                onSubmit={(relationship) => {
                  onAddRelationship(relationship)
                  setIsAddDialogOpen(false)
                }}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ownership">Ownership</TabsTrigger>
            <TabsTrigger value="roles">All Roles</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-stone-200/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Relationships</p>
                      <p className="text-2xl font-semibold text-slate-800">{relationships.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Ownership Disclosed</p>
                      <p className="text-2xl font-semibold text-slate-800">{totalOwnership}%</p>
                    </div>
                    <Percent className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">UBOs Identified</p>
                      <p className="text-2xl font-semibold text-slate-800">
                        {relationships.filter((rel) => rel.role === "ultimate-beneficial-owner").length}
                      </p>
                    </div>
                    <Shield className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Relationship Categories */}
            <div className="space-y-4">
              {Object.entries(ROLE_CATEGORIES).map(([category, config]) => {
                const categoryRelationships = groupedRelationships[category]
                if (categoryRelationships.length === 0) return null

                const IconComponent = config.icon

                return (
                  <Card key={category} className="border-stone-200/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <IconComponent className="h-5 w-5" />
                        {config.label}
                        <Badge variant="outline">{categoryRelationships.length}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {categoryRelationships.map((relationship) => (
                          <div
                            key={relationship.id}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                                {getEntityType(relationship.toEntityId) === "individual" ? (
                                  <User className="h-4 w-4 text-slate-600" />
                                ) : (
                                  <Building2 className="h-4 w-4 text-slate-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{getEntityName(relationship.toEntityId)}</p>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className={`text-${getRoleBadgeColor(relationship.role)}-700 border-${getRoleBadgeColor(relationship.role)}-200`}
                                  >
                                    {ROLE_LABELS[relationship.role]}
                                  </Badge>
                                  {relationship.ownershipPercentage && (
                                    <Badge variant="outline">{relationship.ownershipPercentage}% ownership</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setEditingRelationship(relationship)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => onRemoveRelationship(relationship.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="ownership" className="space-y-6 mt-6">
            <Card className="border-stone-200/50">
              <CardHeader>
                <CardTitle className="text-base font-medium">Ownership Structure</CardTitle>
                <CardDescription>Breakdown of ownership and control relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relationships
                    .filter((rel) => rel.ownershipPercentage && rel.ownershipPercentage > 0)
                    .sort((a, b) => (b.ownershipPercentage || 0) - (a.ownershipPercentage || 0))
                    .map((relationship) => (
                      <div
                        key={relationship.id}
                        className="flex items-center justify-between p-4 border border-stone-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                            {getEntityType(relationship.toEntityId) === "individual" ? (
                              <User className="h-5 w-5 text-slate-600" />
                            ) : (
                              <Building2 className="h-5 w-5 text-slate-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{getEntityName(relationship.toEntityId)}</p>
                            <p className="text-sm text-slate-600">{ROLE_LABELS[relationship.role]}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-slate-800">{relationship.ownershipPercentage}%</p>
                          {relationship.votingRights && (
                            <p className="text-sm text-slate-600">{relationship.votingRights}% voting</p>
                          )}
                        </div>
                      </div>
                    ))}

                  {totalOwnership < 100 && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">Ownership Disclosure Incomplete</p>
                      <p className="text-sm text-amber-700">
                        {100 - totalOwnership}% of ownership remains undisclosed. Please add all beneficial owners with
                        25% or more ownership.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6 mt-6">
            <div className="space-y-4">
              {relationships.map((relationship) => (
                <Card key={relationship.id} className="border-stone-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                          {getEntityType(relationship.toEntityId) === "individual" ? (
                            <User className="h-6 w-6 text-slate-600" />
                          ) : (
                            <Building2 className="h-6 w-6 text-slate-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{getEntityName(relationship.toEntityId)}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={`text-${getRoleBadgeColor(relationship.role)}-700 border-${getRoleBadgeColor(relationship.role)}-200`}
                            >
                              {ROLE_LABELS[relationship.role]}
                            </Badge>
                            {relationship.ownershipPercentage && (
                              <Badge variant="outline">{relationship.ownershipPercentage}% ownership</Badge>
                            )}
                            {relationship.hasSigningAuthority && <Badge variant="outline">Signing Authority</Badge>}
                          </div>
                          {relationship.appointmentDate && (
                            <p className="text-xs text-slate-500 mt-1">
                              Appointed: {new Date(relationship.appointmentDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingRelationship(relationship)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onRemoveRelationship(relationship.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Add Relationship Form Component
function AddRelationshipForm({
  primaryEntityId,
  onSubmit,
  onCancel,
}: {
  primaryEntityId: string
  onSubmit: (relationship: Omit<Relationship, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    toEntityId: "",
    role: "" as RelationshipRole,
    ownershipPercentage: "",
    votingRights: "",
    appointmentDate: "",
    hasSigningAuthority: false,
    authorityLimits: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const relationship: Omit<Relationship, "id"> = {
      fromEntityId: primaryEntityId,
      toEntityId: formData.toEntityId,
      role: formData.role,
      ownershipPercentage: formData.ownershipPercentage ? Number.parseFloat(formData.ownershipPercentage) : undefined,
      votingRights: formData.votingRights ? Number.parseFloat(formData.votingRights) : undefined,
      appointmentDate: formData.appointmentDate || undefined,
      isActive: true,
      hasSigningAuthority: formData.hasSigningAuthority,
      authorityLimits: formData.authorityLimits || undefined,
      notes: formData.notes || undefined,
    }

    onSubmit(relationship)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="toEntityId">Related Entity/Person</Label>
          <Select
            value={formData.toEntityId}
            onValueChange={(value) => setFormData({ ...formData, toEntityId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select entity or person" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entity-1">John Smith (Individual)</SelectItem>
              <SelectItem value="entity-2">ABC Holdings Ltd (Company)</SelectItem>
              <SelectItem value="entity-3">Smith Family Trust (Trust)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Relationship Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value as RelationshipRole })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ROLE_LABELS).map(([role, label]) => (
                <SelectItem key={role} value={role}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ownershipPercentage">Ownership Percentage</Label>
          <Input
            id="ownershipPercentage"
            type="number"
            min="0"
            max="100"
            step="0.01"
            placeholder="0.00"
            value={formData.ownershipPercentage}
            onChange={(e) => setFormData({ ...formData, ownershipPercentage: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="votingRights">Voting Rights (%)</Label>
          <Input
            id="votingRights"
            type="number"
            min="0"
            max="100"
            step="0.01"
            placeholder="0.00"
            value={formData.votingRights}
            onChange={(e) => setFormData({ ...formData, votingRights: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="appointmentDate">Appointment Date</Label>
        <Input
          id="appointmentDate"
          type="date"
          value={formData.appointmentDate}
          onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          placeholder="Additional notes about this relationship"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!formData.toEntityId || !formData.role}>
          Add Relationship
        </Button>
      </div>
    </form>
  )
}
