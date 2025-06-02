import type { EntityType, OnboardingScenario, RelationshipRole, DocumentCategory } from "@/lib/types/entities"

export interface DocumentRequirement {
  id: string
  name: string
  title: string
  description: string
  helpText?: string
  category: DocumentCategory
  required: boolean
  entityTypes: EntityType[]
  scenarios?: OnboardingScenario[]
  roles?: RelationshipRole[]
  jurisdiction?: string[]
  acceptedFormats: string[]
  maxFileSize: number // in MB
  maxSizeMB: number // alias for maxFileSize
  expiryRequired?: boolean
  expiryMonths?: number
  notarizationRequired?: boolean
  requiresNotarization?: boolean
  apostilleRequired?: boolean
  requiresApostille?: boolean
  multipleFilesAllowed?: boolean
  allowMultipleFiles?: boolean
  specificRequirements?: string[]
  alternativeDocuments?: string[]
  alternatives?: string[]
  dependsOnForm?: string
  formDependencies: string[]
  templateId?: string
  order: number
  status?: "pending" | "reviewing" | "approved" | "rejected"
}

export interface DocumentTemplate {
  id: string
  name: string
  description: string
  downloadUrl?: string
  isRequired: boolean
  entityTypes: EntityType[]
  scenarios?: OnboardingScenario[]
}

// Comprehensive document requirements for all entity types
export const DOCUMENT_REQUIREMENTS: DocumentRequirement[] = [
  // ===== IDENTITY DOCUMENTS =====
  {
    id: "passport",
    name: "Passport",
    title: "Passport",
    description: "Valid passport showing full name, date of birth, nationality, and photograph",
    category: "identity",
    required: true,
    entityTypes: ["individual"],
    acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
    maxFileSize: 10,
    maxSizeMB: 10,
    expiryRequired: true,
    expiryMonths: 6,
    requiresNotarization: false,
    requiresApostille: false,
    allowMultipleFiles: false,
    specificRequirements: [
      "Must be valid for at least 6 months",
      "All pages with information must be included",
      "Photo page must be clearly visible",
      "Document must be in color",
    ],
    alternativeDocuments: ["national-id", "drivers-license"],
    alternatives: ["National ID Card", "Driver's License"],
    formDependencies: [],
    order: 1,
  },
  {
    id: "national-id",
    name: "National ID Card",
    title: "National ID Card",
    description: "Government-issued national identity card (front and back)",
    category: "identity",
    required: false,
    entityTypes: ["individual"],
    acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
    maxFileSize: 10,
    maxSizeMB: 10,
    multipleFilesAllowed: true,
    allowMultipleFiles: true,
    requiresNotarization: false,
    requiresApostille: false,
    specificRequirements: [
      "Both front and back sides required",
      "Must be current and valid",
      "All text must be clearly readable",
    ],
    formDependencies: [],
    order: 2,
  },
  {
    id: "drivers-license",
    name: "Driver's License",
    title: "Driver's License",
    description: "Valid driver's license (front and back)",
    category: "identity",
    required: false,
    entityTypes: ["individual"],
    acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
    maxFileSize: 10,
    maxSizeMB: 10,
    multipleFilesAllowed: true,
    allowMultipleFiles: true,
    requiresNotarization: false,
    requiresApostille: false,
    specificRequirements: [
      "Both front and back sides required",
      "Must be current and valid",
      "Photo must be clearly visible",
    ],
    formDependencies: [],
    order: 3,
  },

  // ===== ADDRESS VERIFICATION =====
  {
    id: "utility-bill",
    name: "Utility Bill",
    title: "Utility Bill",
    description: "Recent utility bill showing name and residential address",
    category: "address",
    required: true,
    entityTypes: ["individual"],
    acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
    maxFileSize: 10,
    maxSizeMB: 10,
    requiresNotarization: false,
    requiresApostille: false,
    allowMultipleFiles: false,
    specificRequirements: [
      "Must be dated within the last 3 months",
      "Must show full name and address",
      "Accepted utilities: electricity, gas, water, internet, phone",
      "Mobile phone bills not accepted",
    ],
    alternativeDocuments: ["bank-statement", "tax-document", "rental-agreement"],
    alternatives: ["Bank Statement", "Tax Document", "Rental Agreement"],
    formDependencies: [],
    order: 4,
  },
  {
    id: "bank-statement",
    name: "Bank Statement",
    title: "Bank Statement",
    description: "Recent bank statement showing name and address",
    category: "address",
    required: false,
    entityTypes: ["individual"],
    acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
    maxFileSize: 10,
    maxSizeMB: 10,
    requiresNotarization: false,
    requiresApostille: false,
    allowMultipleFiles: false,
    specificRequirements: [
      "Must be dated within the last 3 months",
      "Must show full name and address",
      "Can be electronic or paper statement",
      "Account numbers may be redacted for privacy",
    ],
    formDependencies: [],
    order: 5,
  },

  // ===== CORPORATE DOCUMENTS =====
  {
    id: "certificate-of-incorporation",
    name: "Certificate of Incorporation",
    title: "Certificate of Incorporation",
    description: "Official certificate of incorporation from the registrar",
    category: "corporate",
    required: true,
    entityTypes: ["legal-entity", "corporation", "llc"],
    scenarios: ["direct-client", "representative-acting", "corporate-banking", "administrative-onboarding"],
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    maxFileSize: 15,
    maxSizeMB: 15,
    apostilleRequired: true,
    requiresApostille: true,
    requiresNotarization: false,
    allowMultipleFiles: false,
    specificRequirements: [
      "Must be certified copy or original",
      "Must show company name, registration number, and date of incorporation",
      "Apostille required for foreign entities",
    ],
    formDependencies: [],
    order: 7,
  },
  {
    id: "memorandum-articles",
    name: "Memorandum and Articles of Association",
    title: "Memorandum and Articles of Association",
    description: "Current memorandum and articles of association",
    category: "corporate",
    required: true,
    entityTypes: ["legal-entity", "corporation", "llc"],
    scenarios: ["direct-client", "representative-acting", "corporate-banking"],
    acceptedFormats: [".pdf"],
    maxFileSize: 25,
    maxSizeMB: 25,
    requiresNotarization: false,
    requiresApostille: false,
    allowMultipleFiles: false,
    specificRequirements: [
      "Must be current and include all amendments",
      "Must show company objects and share structure",
      "Certified copy required",
    ],
    formDependencies: [],
    order: 8,
  },
  {
    id: "board-resolution",
    name: "Board Resolution",
    title: "Board Resolution",
    description: "Board resolution authorizing account opening and signatories",
    category: "corporate",
    required: true,
    entityTypes: ["legal-entity", "corporation", "llc"],
    scenarios: ["direct-client", "corporate-banking"],
    acceptedFormats: [".pdf"],
    maxFileSize: 10,
    maxSizeMB: 10,
    notarizationRequired: true,
    requiresNotarization: true,
    requiresApostille: false,
    allowMultipleFiles: false,
    specificRequirements: [
      "Must be dated within the last 6 months",
      "Must authorize specific individuals for account operations",
      "Must be signed by authorized directors",
      "Notarization required",
    ],
    dependsOnForm: "directors-officers",
    formDependencies: ["directors-officers"],
    templateId: "board-resolution-template",
    order: 9,
  },

  // ===== BENEFICIAL OWNERSHIP =====
  {
    id: "ubo-declaration",
    name: "Ultimate Beneficial Ownership Declaration",
    title: "Ultimate Beneficial Ownership Declaration",
    description: "Completed UBO declaration form with supporting documents",
    category: "beneficial-ownership",
    required: true,
    entityTypes: ["legal-entity", "corporation", "llc", "trust", "foundation"],
    scenarios: ["direct-client", "representative-acting", "corporate-banking", "complex-ownership"],
    acceptedFormats: [".pdf"],
    maxFileSize: 25,
    maxSizeMB: 25,
    requiresNotarization: false,
    requiresApostille: false,
    allowMultipleFiles: false,
    specificRequirements: [
      "Must declare all UBOs with 25% or more ownership",
      "Must include identity documents for each UBO",
      "Must be signed and dated",
      "Supporting ownership charts may be required",
    ],
    dependsOnForm: "ubo-disclosure",
    formDependencies: ["ubo-disclosure"],
    templateId: "ubo-declaration-template",
    order: 12,
  },

  // ===== TRUST DOCUMENTS =====
  {
    id: "trust-deed",
    name: "Trust Deed",
    title: "Trust Deed",
    description: "Original or certified copy of the trust deed",
    category: "trust",
    required: true,
    entityTypes: ["trust"],
    scenarios: ["trust-structure", "direct-client", "representative-acting"],
    acceptedFormats: [".pdf"],
    maxFileSize: 50,
    maxSizeMB: 50,
    notarizationRequired: true,
    requiresNotarization: true,
    requiresApostille: false,
    allowMultipleFiles: false,
    specificRequirements: [
      "Must be original or certified copy",
      "Must show trust name, date of establishment, and governing law",
      "Must include trustee appointment provisions",
      "Notarization required for foreign trusts",
    ],
    formDependencies: [],
    order: 14,
  },

  // ===== AUTHORIZATION DOCUMENTS =====
  {
    id: "power-of-attorney",
    name: "Power of Attorney",
    title: "Power of Attorney",
    description: "Legal power of attorney authorizing representative to act",
    category: "authorization",
    required: true,
    entityTypes: ["individual", "legal-entity", "trust", "foundation"],
    scenarios: ["representative-acting"],
    roles: ["legal-representative", "solicitor", "lawyer"],
    acceptedFormats: [".pdf"],
    maxFileSize: 15,
    maxSizeMB: 15,
    notarizationRequired: true,
    requiresNotarization: true,
    apostilleRequired: true,
    requiresApostille: true,
    allowMultipleFiles: false,
    specificRequirements: [
      "Must be notarized",
      "Must specifically authorize financial services applications",
      "Must be dated within the last 12 months",
      "Apostille required for cross-border representation",
    ],
    formDependencies: [],
    templateId: "power-of-attorney-template",
    order: 17,
  },

  // ===== FINANCIAL DOCUMENTS =====
  {
    id: "source-of-wealth",
    name: "Source of Wealth Documentation",
    title: "Source of Wealth Documentation",
    description: "Documentation evidencing the source of wealth",
    category: "financial",
    required: true,
    entityTypes: ["individual"],
    scenarios: ["direct-client", "representative-acting"],
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    maxFileSize: 25,
    maxSizeMB: 25,
    multipleFilesAllowed: true,
    allowMultipleFiles: true,
    requiresNotarization: false,
    requiresApostille: false,
    specificRequirements: [
      "May include employment contracts, business ownership documents, inheritance documents",
      "Must cover the source of funds for the relationship",
      "Multiple documents may be required",
    ],
    formDependencies: [],
    order: 20,
  },
]

// Document templates that can be downloaded
export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: "ubo-declaration-template",
    name: "UBO Declaration Form",
    description: "Template for ultimate beneficial ownership declaration",
    downloadUrl: "/templates/ubo-declaration.pdf",
    isRequired: true,
    entityTypes: ["legal-entity", "corporation", "llc", "trust", "foundation"],
    scenarios: ["direct-client", "representative-acting", "corporate-banking"],
  },
  {
    id: "board-resolution-template",
    name: "Board Resolution Template",
    description: "Template for board resolution authorizing account opening",
    downloadUrl: "/templates/board-resolution.pdf",
    isRequired: true,
    entityTypes: ["legal-entity", "corporation", "llc"],
    scenarios: ["direct-client", "corporate-banking"],
  },
  {
    id: "power-of-attorney-template",
    name: "Power of Attorney Template",
    description: "Template for legal representation authorization",
    downloadUrl: "/templates/power-of-attorney.pdf",
    isRequired: true,
    entityTypes: ["individual", "legal-entity", "trust", "foundation"],
    scenarios: ["representative-acting"],
  },
]

export class DocumentRequirementsEngine {
  /**
   * Get required documents for specific entity type and scenario
   */
  static getRequiredDocuments(
    entityType: EntityType,
    scenario: OnboardingScenario,
    role?: RelationshipRole,
    jurisdiction?: string,
    completedForms?: string[],
  ): DocumentRequirement[] {
    return DOCUMENT_REQUIREMENTS.filter((doc) => {
      // Check entity type compatibility
      const entityTypeMatch = doc.entityTypes.includes(entityType)

      // Check scenario compatibility
      const scenarioMatch = !doc.scenarios || doc.scenarios.includes(scenario)

      // Check role compatibility
      const roleMatch = !doc.roles || !role || doc.roles.includes(role)

      // Check jurisdiction compatibility
      const jurisdictionMatch = !doc.jurisdiction || !jurisdiction || doc.jurisdiction.includes(jurisdiction)

      return entityTypeMatch && scenarioMatch && roleMatch && jurisdictionMatch
    }).sort((a, b) => a.order - b.order)
  }

  /**
   * Get documents by category
   */
  static getDocumentsByCategory(
    entityType: EntityType,
    scenario: OnboardingScenario,
    category: DocumentCategory,
    role?: RelationshipRole,
  ): DocumentRequirement[] {
    const allDocs = this.getRequiredDocuments(entityType, scenario, role)
    return allDocs.filter((doc) => doc.category === category)
  }

  /**
   * Get required documents only
   */
  static getRequiredDocumentsOnly(
    entityType: EntityType,
    scenario: OnboardingScenario,
    role?: RelationshipRole,
  ): DocumentRequirement[] {
    const allDocs = this.getRequiredDocuments(entityType, scenario, role)
    return allDocs.filter((doc) => doc.required)
  }

  /**
   * Get optional documents
   */
  static getOptionalDocuments(
    entityType: EntityType,
    scenario: OnboardingScenario,
    role?: RelationshipRole,
  ): DocumentRequirement[] {
    const allDocs = this.getRequiredDocuments(entityType, scenario, role)
    return allDocs.filter((doc) => !doc.required)
  }

  /**
   * Get available templates for entity type and scenario
   */
  static getAvailableTemplates(entityType: EntityType, scenario: OnboardingScenario): DocumentTemplate[] {
    return DOCUMENT_TEMPLATES.filter((template) => {
      const entityTypeMatch = template.entityTypes.includes(entityType)
      const scenarioMatch = !template.scenarios || template.scenarios.includes(scenario)
      return entityTypeMatch && scenarioMatch
    })
  }

  /**
   * Check if a document can be uploaded (dependencies met)
   */
  static canUploadDocument(documentId: string, completedForms: string[]): boolean {
    const document = DOCUMENT_REQUIREMENTS.find((doc) => doc.id === documentId)
    if (!document) return false

    // Check if dependent form is completed
    if (document.dependsOnForm && !completedForms.includes(document.dependsOnForm)) {
      return false
    }

    return true
  }

  /**
   * Get document categories for entity type
   */
  static getDocumentCategories(
    entityType: EntityType,
    scenario: OnboardingScenario,
    role?: RelationshipRole,
  ): DocumentCategory[] {
    const documents = this.getRequiredDocuments(entityType, scenario, role)
    const categories = [...new Set(documents.map((doc) => doc.category))]

    // Sort categories in logical order
    const categoryOrder: DocumentCategory[] = [
      "identity",
      "address",
      "corporate",
      "beneficial-ownership",
      "trust",
      "authorization",
      "financial",
      "regulatory",
      "compliance",
    ]

    return categoryOrder.filter((cat) => categories.includes(cat))
  }

  /**
   * Calculate document completion percentage
   */
  static getDocumentCompletionPercentage(
    uploadedDocuments: string[],
    entityType: EntityType,
    scenario: OnboardingScenario,
    role?: RelationshipRole,
  ): number {
    const requiredDocs = this.getRequiredDocumentsOnly(entityType, scenario, role)
    if (requiredDocs.length === 0) return 100

    const uploadedRequiredDocs = requiredDocs.filter((doc) => uploadedDocuments.includes(doc.id))
    return Math.round((uploadedRequiredDocs.length / requiredDocs.length) * 100)
  }

  /**
   * Get next required document to upload
   */
  static getNextRequiredDocument(
    uploadedDocuments: string[],
    completedForms: string[],
    entityType: EntityType,
    scenario: OnboardingScenario,
    role?: RelationshipRole,
  ): DocumentRequirement | null {
    const requiredDocs = this.getRequiredDocumentsOnly(entityType, scenario, role)

    return (
      requiredDocs.find(
        (doc) => !uploadedDocuments.includes(doc.id) && this.canUploadDocument(doc.id, completedForms),
      ) || null
    )
  }

  /**
   * Validate document requirements completion
   */
  static validateDocumentRequirements(
    uploadedDocuments: string[],
    entityType: EntityType,
    scenario: OnboardingScenario,
    role?: RelationshipRole,
  ): { isComplete: boolean; missingDocuments: string[] } {
    const requiredDocs = this.getRequiredDocumentsOnly(entityType, scenario, role)
    const missingDocuments = requiredDocs.filter((doc) => !uploadedDocuments.includes(doc.id)).map((doc) => doc.id)

    return {
      isComplete: missingDocuments.length === 0,
      missingDocuments,
    }
  }
}
