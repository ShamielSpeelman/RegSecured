import type { FormSection } from "@/components/client/forms/enhanced-dynamic-form"

// Company Information Form for Legal Entities
export const companyInformationForm: FormSection[] = [
  {
    id: "basic-company-info",
    title: "Basic Company Information",
    description: "Please provide basic information about the legal entity",
    fields: [
      {
        id: "entityName",
        type: "text",
        label: "Legal Entity Name",
        placeholder: "Enter the full legal name of the entity",
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
      },
      {
        id: "tradingName",
        type: "text",
        label: "Trading Name (if different)",
        placeholder: "Enter trading name if different from legal name",
        required: false,
      },
      {
        id: "entityType",
        type: "select",
        label: "Entity Type",
        required: true,
        options: [
          { label: "Corporation", value: "corporation" },
          { label: "Limited Liability Company (LLC)", value: "llc" },
          { label: "Partnership", value: "partnership" },
          { label: "Limited Partnership", value: "limited_partnership" },
          { label: "Sole Proprietorship", value: "sole_proprietorship" },
          { label: "Other", value: "other" },
        ],
      },
      {
        id: "otherEntityType",
        type: "text",
        label: "Please Specify Other Entity Type",
        required: true,
        dependsOn: {
          field: "entityType",
          value: "other",
        },
      },
      {
        id: "registrationNumber",
        type: "text",
        label: "Registration Number",
        placeholder: "Enter company registration number",
        required: true,
        regulatoryRequirement: true,
      },
      {
        id: "taxIdentificationNumber",
        type: "text",
        label: "Tax Identification Number",
        placeholder: "Enter tax ID number",
        required: true,
        regulatoryRequirement: true,
      },
      {
        id: "legalEntityIdentifier",
        type: "text",
        label: "Legal Entity Identifier (LEI)",
        placeholder: "Enter LEI if applicable",
        required: false,
        helpText: "A 20-character code that identifies legal entities participating in financial transactions",
      },
    ],
    entityTypes: ["legal-entity", "corporation", "llc", "partnership", "limited-partnership"],
  },
  {
    id: "incorporation-info",
    title: "Incorporation Information",
    description: "Please provide details about the entity's incorporation",
    fields: [
      {
        id: "dateOfIncorporation",
        type: "date",
        label: "Date of Incorporation",
        required: true,
      },
      {
        id: "countryOfIncorporation",
        type: "country",
        label: "Country of Incorporation",
        required: true,
        options: [
          { label: "United States", value: "us" },
          { label: "United Kingdom", value: "uk" },
          { label: "Canada", value: "ca" },
          { label: "Australia", value: "au" },
          { label: "Other", value: "other" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "stateOfIncorporation",
        type: "text",
        label: "State/Province of Incorporation",
        placeholder: "Enter state or province",
        required: true,
      },
      {
        id: "registeredAddress",
        type: "address",
        label: "Registered Address",
        required: true,
        regulatoryRequirement: true,
      },
      {
        id: "businessAddress",
        type: "address",
        label: "Principal Business Address",
        required: true,
      },
      {
        id: "mailingAddressSame",
        type: "checkbox",
        label: "Mailing Address",
        placeholder: "Mailing address is the same as business address",
        required: false,
      },
      {
        id: "mailingAddress",
        type: "address",
        label: "Mailing Address",
        required: true,
        dependsOn: {
          field: "mailingAddressSame",
          value: false,
        },
      },
    ],
    entityTypes: ["legal-entity", "corporation", "llc", "partnership", "limited-partnership"],
  },
  {
    id: "contact-info",
    title: "Contact Information",
    description: "Please provide contact information for the entity",
    fields: [
      {
        id: "businessPhone",
        type: "phone",
        label: "Business Phone Number",
        placeholder: "Enter business phone number",
        required: true,
        validation: {
          pattern: "^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$",
          patternMessage: "Please enter a valid phone number",
        },
      },
      {
        id: "businessEmail",
        type: "email",
        label: "Business Email",
        placeholder: "Enter business email address",
        required: true,
      },
      {
        id: "website",
        type: "text",
        label: "Website",
        placeholder: "Enter company website URL",
        required: false,
      },
      {
        id: "primaryContactName",
        type: "text",
        label: "Primary Contact Name",
        placeholder: "Enter name of primary contact person",
        required: true,
      },
      {
        id: "primaryContactTitle",
        type: "text",
        label: "Primary Contact Title",
        placeholder: "Enter job title of primary contact",
        required: true,
      },
      {
        id: "primaryContactPhone",
        type: "phone",
        label: "Primary Contact Phone",
        placeholder: "Enter phone number of primary contact",
        required: true,
        validation: {
          pattern: "^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$",
          patternMessage: "Please enter a valid phone number",
        },
      },
      {
        id: "primaryContactEmail",
        type: "email",
        label: "Primary Contact Email",
        placeholder: "Enter email of primary contact",
        required: true,
      },
    ],
    entityTypes: ["legal-entity", "corporation", "llc", "partnership", "limited-partnership"],
  },
  {
    id: "business-activity",
    title: "Business Activity",
    description: "Please provide information about the entity's business activities",
    fields: [
      {
        id: "businessDescription",
        type: "textarea",
        label: "Business Description",
        placeholder: "Provide a detailed description of the entity's business activities",
        required: true,
        validation: {
          minLength: 50,
          maxLength: 1000,
        },
        regulatoryRequirement: true,
      },
      {
        id: "industryType",
        type: "select",
        label: "Industry Type",
        required: true,
        options: [
          { label: "Financial Services", value: "financial_services" },
          { label: "Technology", value: "technology" },
          { label: "Healthcare", value: "healthcare" },
          { label: "Manufacturing", value: "manufacturing" },
          { label: "Real Estate", value: "real_estate" },
          { label: "Retail", value: "retail" },
          { label: "Professional Services", value: "professional_services" },
          { label: "Other", value: "other" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "otherIndustryType",
        type: "text",
        label: "Please Specify Other Industry Type",
        required: true,
        dependsOn: {
          field: "industryType",
          value: "other",
        },
      },
      {
        id: "naicsCode",
        type: "text",
        label: "NAICS Code",
        placeholder: "Enter North American Industry Classification System code",
        required: false,
        helpText: "6-digit code that classifies business establishments",
      },
      {
        id: "annualRevenue",
        type: "select",
        label: "Annual Revenue",
        required: true,
        options: [
          { label: "Under $1 Million", value: "under_1m" },
          { label: "$1M - $10M", value: "1m_10m" },
          { label: "$10M - $50M", value: "10m_50m" },
          { label: "$50M - $100M", value: "50m_100m" },
          { label: "Over $100M", value: "over_100m" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "numberOfEmployees",
        type: "select",
        label: "Number of Employees",
        required: true,
        options: [
          { label: "1-10", value: "1_10" },
          { label: "11-50", value: "11_50" },
          { label: "51-200", value: "51_200" },
          { label: "201-500", value: "201_500" },
          { label: "500+", value: "500_plus" },
        ],
      },
    ],
    entityTypes: ["legal-entity", "corporation", "llc", "partnership", "limited-partnership"],
  },
]

// UBO Disclosure Form for Legal Entities
export const uboDisclosureForm: FormSection[] = [
  {
    id: "ubo-overview",
    title: "Ultimate Beneficial Ownership Disclosure",
    description:
      "Please provide information about all Ultimate Beneficial Owners (UBOs) who own 25% or more of the entity",
    fields: [
      {
        id: "hasUbos",
        type: "radio",
        label: "Does this entity have Ultimate Beneficial Owners with 25% or more ownership?",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "uboExplanation",
        type: "textarea",
        label: "Please explain the ownership structure",
        placeholder: "Provide details about why there are no UBOs with 25% or more ownership",
        required: true,
        dependsOn: {
          field: "hasUbos",
          value: "no",
        },
        validation: {
          minLength: 50,
          maxLength: 500,
        },
      },
      {
        id: "numberOfUbos",
        type: "number",
        label: "Number of Ultimate Beneficial Owners",
        placeholder: "Enter number of UBOs",
        required: true,
        dependsOn: {
          field: "hasUbos",
          value: "yes",
        },
        validation: {
          min: 1,
          max: 20,
        },
      },
    ],
    entityTypes: ["legal-entity", "corporation", "llc", "partnership", "limited-partnership"],
    regulatoryRequirement: true,
  },
  {
    id: "ubo-details",
    title: "UBO Details",
    description: "Please provide detailed information for each Ultimate Beneficial Owner",
    fields: [
      {
        id: "ubo1Name",
        type: "text",
        label: "UBO 1 - Full Name",
        placeholder: "Enter full legal name",
        required: true,
        dependsOn: {
          field: "hasUbos",
          value: "yes",
        },
      },
      {
        id: "ubo1Ownership",
        type: "percentage",
        label: "UBO 1 - Ownership Percentage",
        placeholder: "Enter ownership percentage",
        required: true,
        dependsOn: {
          field: "hasUbos",
          value: "yes",
        },
        validation: {
          min: 25,
          max: 100,
        },
      },
      {
        id: "ubo1Nationality",
        type: "country",
        label: "UBO 1 - Nationality",
        required: true,
        dependsOn: {
          field: "hasUbos",
          value: "yes",
        },
        options: [
          { label: "United States", value: "us" },
          { label: "United Kingdom", value: "uk" },
          { label: "Canada", value: "ca" },
          { label: "Australia", value: "au" },
          { label: "Other", value: "other" },
        ],
      },
      {
        id: "ubo1DateOfBirth",
        type: "date",
        label: "UBO 1 - Date of Birth",
        required: true,
        dependsOn: {
          field: "hasUbos",
          value: "yes",
        },
      },
      {
        id: "ubo1Address",
        type: "address",
        label: "UBO 1 - Residential Address",
        required: true,
        dependsOn: {
          field: "hasUbos",
          value: "yes",
        },
      },
    ],
    entityTypes: ["legal-entity", "corporation", "llc", "partnership", "limited-partnership"],
    regulatoryRequirement: true,
  },
]

// Shareholder Information Form
export const shareholderInformationForm: FormSection[] = [
  {
    id: "shareholder-structure",
    title: "Shareholder Structure",
    description: "Please provide information about the entity's shareholders and ownership structure",
    fields: [
      {
        id: "totalShares",
        type: "number",
        label: "Total Number of Shares Outstanding",
        placeholder: "Enter total number of shares",
        required: true,
        validation: {
          min: 1,
        },
      },
      {
        id: "shareClasses",
        type: "select",
        label: "Number of Share Classes",
        required: true,
        options: [
          { label: "Single Class", value: "single" },
          { label: "Multiple Classes", value: "multiple" },
        ],
      },
      {
        id: "publiclyTraded",
        type: "radio",
        label: "Is the entity publicly traded?",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "stockExchange",
        type: "text",
        label: "Stock Exchange",
        placeholder: "Enter stock exchange name",
        required: true,
        dependsOn: {
          field: "publiclyTraded",
          value: "yes",
        },
      },
      {
        id: "tickerSymbol",
        type: "text",
        label: "Ticker Symbol",
        placeholder: "Enter ticker symbol",
        required: true,
        dependsOn: {
          field: "publiclyTraded",
          value: "yes",
        },
      },
    ],
    entityTypes: ["corporation", "llc"],
  },
]

// Directors and Officers Form
export const directorsOfficersForm: FormSection[] = [
  {
    id: "governance-structure",
    title: "Directors and Officers",
    description: "Please provide information about the entity's directors and officers",
    fields: [
      {
        id: "boardSize",
        type: "number",
        label: "Number of Board Members",
        placeholder: "Enter number of board members",
        required: true,
        validation: {
          min: 1,
          max: 50,
        },
      },
      {
        id: "hasIndependentDirectors",
        type: "radio",
        label: "Does the board include independent directors?",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        id: "numberOfIndependentDirectors",
        type: "number",
        label: "Number of Independent Directors",
        placeholder: "Enter number of independent directors",
        required: true,
        dependsOn: {
          field: "hasIndependentDirectors",
          value: "yes",
        },
        validation: {
          min: 1,
        },
      },
      {
        id: "ceoName",
        type: "text",
        label: "Chief Executive Officer (CEO)",
        placeholder: "Enter CEO full name",
        required: true,
      },
      {
        id: "cfoName",
        type: "text",
        label: "Chief Financial Officer (CFO)",
        placeholder: "Enter CFO full name",
        required: false,
      },
      {
        id: "chairmanName",
        type: "text",
        label: "Chairman of the Board",
        placeholder: "Enter Chairman full name",
        required: true,
      },
    ],
    entityTypes: ["corporation", "llc"],
  },
]
