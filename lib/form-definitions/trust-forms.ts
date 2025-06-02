import type { FormSection } from "@/components/client/forms/enhanced-dynamic-form"

// Trust Information Form
export const trustInformationForm: FormSection[] = [
  {
    id: "basic-trust-info",
    title: "Basic Trust Information",
    description: "Please provide basic information about the trust",
    fields: [
      {
        id: "trustName",
        type: "text",
        label: "Trust Name",
        placeholder: "Enter the full name of the trust",
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        regulatoryRequirement: true,
      },
      {
        id: "trustType",
        type: "select",
        label: "Trust Type",
        required: true,
        options: [
          { label: "Revocable Trust", value: "revocable" },
          { label: "Irrevocable Trust", value: "irrevocable" },
          { label: "Charitable Trust", value: "charitable" },
          { label: "Asset Protection Trust", value: "asset_protection" },
          { label: "Special Needs Trust", value: "special_needs" },
          { label: "Other", value: "other" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "otherTrustType",
        type: "text",
        label: "Please Specify Other Trust Type",
        required: true,
        dependsOn: {
          field: "trustType",
          value: "other",
        },
      },
      {
        id: "dateEstablished",
        type: "date",
        label: "Date Trust Established",
        required: true,
        regulatoryRequirement: true,
      },
      {
        id: "governingLaw",
        type: "country",
        label: "Governing Law Jurisdiction",
        required: true,
        options: [
          { label: "United States", value: "us" },
          { label: "United Kingdom", value: "uk" },
          { label: "Cayman Islands", value: "ky" },
          { label: "British Virgin Islands", value: "vg" },
          { label: "Switzerland", value: "ch" },
          { label: "Other", value: "other" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "trustIdentificationNumber",
        type: "text",
        label: "Trust Identification Number",
        placeholder: "Enter trust ID or tax number",
        required: true,
        regulatoryRequirement: true,
      },
    ],
    entityTypes: ["trust"],
  },
  {
    id: "trust-purpose",
    title: "Trust Purpose and Assets",
    description: "Please provide information about the trust's purpose and assets",
    fields: [
      {
        id: "trustPurpose",
        type: "textarea",
        label: "Trust Purpose",
        placeholder: "Describe the purpose and objectives of the trust",
        required: true,
        validation: {
          minLength: 50,
          maxLength: 1000,
        },
        regulatoryRequirement: true,
      },
      {
        id: "estimatedValue",
        type: "select",
        label: "Estimated Trust Value",
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
        id: "assetTypes",
        type: "multiselect",
        label: "Types of Assets Held",
        required: true,
        options: [
          { label: "Cash and Cash Equivalents", value: "cash" },
          { label: "Real Estate", value: "real_estate" },
          { label: "Securities", value: "securities" },
          { label: "Private Equity", value: "private_equity" },
          { label: "Art and Collectibles", value: "art_collectibles" },
          { label: "Business Interests", value: "business_interests" },
          { label: "Other", value: "other" },
        ],
      },
    ],
    entityTypes: ["trust"],
  },
]

// Trustee Information Form
export const trusteeInformationForm: FormSection[] = [
  {
    id: "trustee-details",
    title: "Trustee Information",
    description: "Please provide information about the trust's trustees",
    fields: [
      {
        id: "numberOfTrustees",
        type: "number",
        label: "Number of Trustees",
        placeholder: "Enter number of trustees",
        required: true,
        validation: {
          min: 1,
          max: 20,
        },
      },
      {
        id: "hasCorporateTrustee",
        type: "radio",
        label: "Does the trust have a corporate trustee?",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        id: "corporateTrusteeName",
        type: "text",
        label: "Corporate Trustee Name",
        placeholder: "Enter corporate trustee name",
        required: true,
        dependsOn: {
          field: "hasCorporateTrustee",
          value: "yes",
        },
      },
      {
        id: "trusteeSuccession",
        type: "textarea",
        label: "Trustee Succession Provisions",
        placeholder: "Describe how successor trustees are appointed",
        required: true,
        validation: {
          minLength: 20,
          maxLength: 500,
        },
      },
    ],
    entityTypes: ["trust"],
    regulatoryRequirement: true,
  },
]

// Beneficiary Information Form
export const beneficiaryInformationForm: FormSection[] = [
  {
    id: "beneficiary-structure",
    title: "Beneficiary Information",
    description: "Please provide information about the trust's beneficiaries",
    fields: [
      {
        id: "beneficiaryType",
        type: "select",
        label: "Beneficiary Structure",
        required: true,
        options: [
          { label: "Named Individuals", value: "named_individuals" },
          { label: "Class of Beneficiaries", value: "class" },
          { label: "Charitable Organizations", value: "charitable" },
          { label: "Mixed (Individuals and Organizations)", value: "mixed" },
        ],
        regulatoryRequirement: true,
      },
      {
        id: "numberOfBeneficiaries",
        type: "number",
        label: "Number of Current Beneficiaries",
        placeholder: "Enter number of current beneficiaries",
        required: true,
        validation: {
          min: 1,
        },
      },
      {
        id: "beneficiaryClass",
        type: "textarea",
        label: "Description of Beneficiary Class",
        placeholder: "Describe the class of beneficiaries (e.g., descendants, family members)",
        required: true,
        dependsOn: {
          field: "beneficiaryType",
          value: "class",
        },
        validation: {
          minLength: 20,
          maxLength: 500,
        },
      },
      {
        id: "distributionTerms",
        type: "textarea",
        label: "Distribution Terms",
        placeholder: "Describe how and when distributions are made to beneficiaries",
        required: true,
        validation: {
          minLength: 50,
          maxLength: 1000,
        },
        regulatoryRequirement: true,
      },
    ],
    entityTypes: ["trust"],
    regulatoryRequirement: true,
  },
]
