import type { FormSection } from "@/components/client/forms/enhanced-dynamic-form"

// Foundation Information Form
export const foundationInformationForm: FormSection[] = [
  {
    id: "basic-foundation-info",
    title: "Basic Foundation Information",
    description: "Please provide basic information about the foundation",
    fields: [
      {
        id: "foundationName",
        type: "text",
        label: "Foundation Name",
        placeholder: "Enter the full name of the foundation",
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        regulatoryRequirement: true,
      },
      {
        id: "foundationType",
        type: "select",
        label: "Foundation Type",
        required: true,
        options: [
          { label: "Private Foundation", value: "private" },
          { label: "Public Foundation", value: "public" },
          { label: "Corporate Foundation", value: "corporate" },
          { label: "Family Foundation", value: "family" },
          { label: "Operating Foundation", value: "operating" },
          { label: "Other", value: "other" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "otherFoundationType",
        type: "text",
        label: "Please Specify Other Foundation Type",
        required: true,
        dependsOn: {
          field: "foundationType",
          value: "other",
        },
      },
      {
        id: "dateEstablished",
        type: "date",
        label: "Date Foundation Established",
        required: true,
        regulatoryRequirement: true,
      },
      {
        id: "jurisdiction",
        type: "country",
        label: "Jurisdiction of Establishment",
        required: true,
        options: [
          { label: "United States", value: "us" },
          { label: "United Kingdom", value: "uk" },
          { label: "Switzerland", value: "ch" },
          { label: "Netherlands", value: "nl" },
          { label: "Liechtenstein", value: "li" },
          { label: "Other", value: "other" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "registrationNumber",
        type: "text",
        label: "Registration Number",
        placeholder: "Enter foundation registration number",
        required: true,
        regulatoryRequirement: true,
      },
      {
        id: "taxExemptStatus",
        type: "radio",
        label: "Tax Exempt Status",
        required: true,
        options: [
          { label: "Tax Exempt", value: "exempt" },
          { label: "Not Tax Exempt", value: "not_exempt" },
          { label: "Pending", value: "pending" },
        ],
        regulatoryRequirement: true,
      },
    ],
    entityTypes: ["foundation"],
  },
  {
    id: "foundation-purpose",
    title: "Foundation Purpose and Activities",
    description: "Please provide information about the foundation's purpose and activities",
    fields: [
      {
        id: "charitablePurpose",
        type: "textarea",
        label: "Charitable Purpose",
        placeholder: "Describe the foundation's charitable purpose and mission",
        required: true,
        validation: {
          minLength: 100,
          maxLength: 2000,
        },
        regulatoryRequirement: true,
      },
      {
        id: "primaryActivities",
        type: "multiselect",
        label: "Primary Activities",
        required: true,
        options: [
          { label: "Education", value: "education" },
          { label: "Healthcare", value: "healthcare" },
          { label: "Arts and Culture", value: "arts_culture" },
          { label: "Environmental", value: "environmental" },
          { label: "Social Services", value: "social_services" },
          { label: "Religious", value: "religious" },
          { label: "Research", value: "research" },
          { label: "Other", value: "other" },
        ],
      },
      {
        id: "geographicScope",
        type: "select",
        label: "Geographic Scope",
        required: true,
        options: [
          { label: "Local", value: "local" },
          { label: "Regional", value: "regional" },
          { label: "National", value: "national" },
          { label: "International", value: "international" },
        ],
      },
      {
        id: "annualGrantBudget",
        type: "select",
        label: "Annual Grant Budget",
        required: true,
        options: [
          { label: "Under $100,000", value: "under_100k" },
          { label: "$100K - $1M", value: "100k_1m" },
          { label: "$1M - $10M", value: "1m_10m" },
          { label: "$10M - $50M", value: "10m_50m" },
          { label: "Over $50M", value: "over_50m" },
        ],
      },
    ],
    entityTypes: ["foundation"],
  },
]

// Foundation Governance Form
export const foundationGovernanceForm: FormSection[] = [
  {
    id: "governance-structure",
    title: "Foundation Governance",
    description: "Please provide information about the foundation's governance structure",
    fields: [
      {
        id: "boardSize",
        type: "number",
        label: "Number of Board Members",
        placeholder: "Enter number of board members",
        required: true,
        validation: {
          min: 3,
          max: 50,
        },
      },
      {
        id: "hasIndependentMembers",
        type: "radio",
        label: "Does the board include independent members?",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        id: "numberOfIndependentMembers",
        type: "number",
        label: "Number of Independent Board Members",
        placeholder: "Enter number of independent members",
        required: true,
        dependsOn: {
          field: "hasIndependentMembers",
          value: "yes",
        },
        validation: {
          min: 1,
        },
      },
      {
        id: "chairmanName",
        type: "text",
        label: "Chairman/President",
        placeholder: "Enter chairman/president full name",
        required: true,
      },
      {
        id: "executiveDirectorName",
        type: "text",
        label: "Executive Director/CEO",
        placeholder: "Enter executive director full name",
        required: false,
      },
      {
        id: "hasAdvisoryBoard",
        type: "radio",
        label: "Does the foundation have an advisory board?",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    entityTypes: ["foundation"],
  },
]
