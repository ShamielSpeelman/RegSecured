// Core entity types supported by the platform
export type EntityType =
  | "individual"
  | "legal-entity"
  | "trust"
  | "foundation"
  | "investment-fund"
  | "partnership"
  | "llc"
  | "corporation"
  | "limited-partnership"
  | "family-office"

// Relationship roles within entities
export type RelationshipRole =
  | "ultimate-beneficial-owner"
  | "shareholder"
  | "stakeholder"
  | "director"
  | "officer"
  | "trustee"
  | "beneficiary"
  | "settlor"
  | "protector"
  | "authorized-signatory"
  | "legal-representative"
  | "solicitor"
  | "lawyer"
  | "administrative-company"
  | "management-company"
  | "loan-note-holder"
  | "investor"
  | "fund-manager"
  | "general-partner"
  | "limited-partner"
  | "nominee-director"
  | "nominee-shareholder"
  | "corporate-secretary"

// Onboarding scenarios
export type OnboardingScenario =
  | "direct-client"
  | "representative-acting"
  | "administrative-onboarding"
  | "trust-structure"
  | "corporate-banking"
  | "investment-structure"
  | "complex-ownership"

// Entity information structure
export interface EntityInfo {
  id: string
  type: EntityType
  name: string
  registrationNumber?: string
  jurisdiction: string
  dateOfIncorporation?: string
  registeredAddress?: Address
  businessAddress?: Address
  taxId?: string
  lei?: string // Legal Entity Identifier
  website?: string
  businessDescription?: string
  industry?: string
  regulatedEntity?: boolean
  publiclyListed?: boolean
  parentEntity?: string
  subsidiaries?: string[]
}

// Individual person information
export interface IndividualInfo {
  id: string
  title?: string
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  placeOfBirth: string
  nationality: string[]
  residenceCountry: string
  taxResidency: string[]
  passportNumber?: string
  nationalId?: string
  driverLicense?: string
  occupation: string
  employer?: string
  politicallyExposed: boolean
  sanctioned: boolean
  address: Address
  previousAddresses?: Address[]
}

// Address structure
export interface Address {
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
  addressType?: "residential" | "business" | "registered" | "mailing"
}

// Relationship between entities/individuals
export interface Relationship {
  id: string
  fromEntityId: string
  toEntityId: string
  role: RelationshipRole
  ownershipPercentage?: number
  votingRights?: number
  appointmentDate?: string
  resignationDate?: string
  isActive: boolean
  isPrimaryContact?: boolean
  hasSigningAuthority?: boolean
  authorityLimits?: string
  notes?: string
}

// Document requirements by entity type and role
export interface DocumentRequirement {
  id: string
  name: string
  description: string
  required: boolean
  entityTypes: EntityType[]
  roles?: RelationshipRole[]
  jurisdiction?: string[]
  category: DocumentCategory
  acceptedFormats: string[]
  maxFileSize: number
  expiryRequired?: boolean
  notarizationRequired?: boolean
  apostilleRequired?: boolean
}

export type DocumentCategory =
  | "identity"
  | "address"
  | "corporate"
  | "financial"
  | "regulatory"
  | "trust"
  | "beneficial-ownership"
  | "authorization"
  | "compliance"

// Form field definitions for different entity types
export interface FormFieldDefinition {
  id: string
  type: "text" | "email" | "number" | "date" | "select" | "radio" | "checkbox" | "textarea" | "file"
  label: string
  placeholder?: string
  description?: string
  required: boolean
  entityTypes: EntityType[]
  roles?: RelationshipRole[]
  options?: { label: string; value: string }[]
  validation?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    pattern?: string
    patternMessage?: string
  }
  dependsOn?: {
    field: string
    value: any
  }
  section: string
}

// Onboarding workflow step
export interface OnboardingStep {
  id: string
  title: string
  description: string
  entityTypes: EntityType[]
  scenarios: OnboardingScenario[]
  requiredRoles?: RelationshipRole[]
  forms?: string[]
  documents?: string[]
  status: "not-started" | "in-progress" | "completed" | "rejected" | "pending-review"
  order: number
  dependencies?: string[]
}

// Client profile with entity and relationship information
export interface ClientProfile {
  id: string
  primaryEntity: EntityInfo | IndividualInfo
  entityType: EntityType
  onboardingScenario: OnboardingScenario
  relationships: Relationship[]
  relatedEntities: (EntityInfo | IndividualInfo)[]
  onboardingStatus: "not-started" | "in-progress" | "completed" | "rejected"
  onboardingProgress: number
  currentStep?: string
  assignedRM?: string
  riskRating?: "low" | "medium" | "high"
  jurisdiction: string
  regulatoryRequirements: string[]
  createdAt: string
  updatedAt: string
}

// Utility type guards
export const isEntityInfo = (entity: EntityInfo | IndividualInfo): entity is EntityInfo => {
  return "registrationNumber" in entity
}

export const isIndividualInfo = (entity: EntityInfo | IndividualInfo): entity is IndividualInfo => {
  return "firstName" in entity
}

// Entity type configurations
export const ENTITY_TYPE_CONFIG = {
  individual: {
    label: "Individual Person",
    description: "Natural person applying for services",
    icon: "User",
    requiredForms: ["personal-information", "financial-information", "risk-assessment"],
    requiredDocuments: ["identity", "address", "financial"],
    supportedRoles: ["ultimate-beneficial-owner", "authorized-signatory", "beneficiary"],
  },
  "legal-entity": {
    label: "Legal Entity",
    description: "Company, corporation, or other legal entity",
    icon: "Building2",
    requiredForms: ["company-information", "beneficial-ownership", "corporate-structure", "financial-information"],
    requiredDocuments: ["corporate", "beneficial-ownership", "financial", "regulatory"],
    supportedRoles: ["shareholder", "director", "officer", "ultimate-beneficial-owner"],
  },
  trust: {
    label: "Trust",
    description: "Trust structure with trustees and beneficiaries",
    icon: "Shield",
    requiredForms: ["trust-information", "trustee-information", "beneficiary-information", "settlor-information"],
    requiredDocuments: ["trust", "identity", "beneficial-ownership"],
    supportedRoles: ["trustee", "beneficiary", "settlor", "protector"],
  },
  foundation: {
    label: "Foundation",
    description: "Private foundation or charitable foundation",
    icon: "Heart",
    requiredForms: ["foundation-information", "council-information", "beneficiary-information"],
    requiredDocuments: ["corporate", "beneficial-ownership", "regulatory"],
    supportedRoles: ["council-member", "beneficiary", "founder", "protector"],
  },
  "investment-fund": {
    label: "Investment Fund",
    description: "Investment fund, hedge fund, or private equity fund",
    icon: "TrendingUp",
    requiredForms: ["fund-information", "manager-information", "investor-information"],
    requiredDocuments: ["corporate", "regulatory", "financial"],
    supportedRoles: ["fund-manager", "general-partner", "limited-partner", "investor"],
  },
} as const
