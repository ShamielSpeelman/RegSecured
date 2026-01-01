# RegSecured - Supabase Authentication & Database Integration Plan
## Comprehensive Implementation Breakdown

**Version**: 2.3-Revised  
**Date**: January 2026  
**Integration Database**: Keizen Supabase Database  
**Table Prefix**: `regsec_`  
**Multi-tenancy**: Enabled with complete separation from Keizen tables

---

## Executive Summary

RegSecured is a regulatory compliance platform that currently uses simulated authentication with localStorage. This plan outlines the complete refactoring to integrate Supabase authentication while maintaining the ability to distinguish between Keizen and RegSecured users in the same auth system. All RegSecured tables will use the `regsec_` prefix for complete isolation.

---

## 1. CURRENT STATE ANALYSIS

### 1.1 Existing Authentication System

**Current Implementation** (`app/auth/page.tsx`):
- **Method**: localStorage-based simulation
- **Storage Keys**: `userRole`, `userName`, `clientProfile`
- **Predefined Roles**: 6 hardcoded roles with demo credentials
  - analyst (analyst@regsecured.com)
  - reviewer (reviewer@regsecured.com)
  - relationship-manager (rm@regsecured.com)
  - admin (admin@regsecured.com)
  - superadmin (superadmin@regsecured.com)
  - client (client@regsecured.com)

**Issues**:
- No actual authentication
- No session management
- No security
- No audit trail
- Cannot persist across devices
- No password recovery
- No MFA capability

### 1.2 Application Structure

**Role-Based Dashboards**:
- `/dashboard/analyst` - KYC/AML analysis
- `/dashboard/reviewer` - Compliance review & approval
- `/dashboard/relationship-manager` - Client relationship management
- `/dashboard/admin` - System administration
- `/dashboard/superadmin` - Multi-tenant global admin
- `/dashboard/client` - Client portal (dynamic based on entity type)

**Key Data Models** (`lib/types/entities.ts`):
- EntityType: 10 types (individual, legal-entity, trust, foundation, etc.)
- RelationshipRole: 23 roles (UBO, shareholder, director, trustee, etc.)
- OnboardingScenario: 7 scenarios
- ClientProfile: Complete onboarding profile structure

**Navigation** (`lib/navigation-config.ts`):
- Role-based adaptive navigation
- Context-aware menus for client portal
- Entity-type specific menu items

###1.3 Current Database State (Keizen)

**Existing Auth**: Supabase Auth is already configured
- **auth.users**: Core authentication table (managed by Supabase)
- **profiles**: User profile data (exists)
- **businesses**: Business entities (exists)
- **business_members**: Business membership with roles (exists)

**Total Tables**: 115 tables without `regsec_` prefix
- All belong to Keizen accounting/business management application
- Complete separation required

---

## 2. AUTHENTICATION STRATEGY

### 2.1 Shared Auth with Application Differentiation

**Approach**: Use single Supabase Auth with application context metadata

```typescript
// User Metadata Structure
user_metadata: {
  full_name: string
  applications: {
    keizen?: {
      enabled: boolean
      role: 'owner' | 'admin' | 'accountant' | 'viewer'
      default_business_id?: uuid
    }
    regsecured?: {
      enabled: boolean
      role: 'analyst' | 'reviewer' | 'relationship-manager' | 'admin' | 'superadmin' | 'client'
      tenant_id?: uuid  // For multi-tenancy
      organization_id?: uuid  // Client organization
    }
  }
}
```

**Benefits**:
- Single sign-on potential
- Unified user management
- Cross-application awareness
- AML/KYC to Keizen user flow support

### 2.2 Authentication Flow

**Sign Up**:
1. User registers with email/password
2. Email confirmation required
3. Application context set during onboarding
4. Profile created in appropriate application tables

**Sign In**:
1. User authenticates via Supabase Auth
2. Check `user_metadata.applications` for access
3. Route to appropriate application dashboard
4. Load application-specific profile data

**Application Detection**:
```typescript
// On login, determine which application
if (user.user_metadata?.applications?.regsecured?.enabled) {
  // RegSecured user - load regsec_ tables
  router.push(`/dashboard/${user.user_metadata.applications.regsecured.role}`)
} else if (user.user_metadata?.applications?.keizen?.enabled) {
  // Keizen user - existing flow
  router.push('/keizen/dashboard')
} else {
  // Onboarding needed
  router.push('/select-application')
}
```

### 2.3 Row Level Security (RLS) Strategy

**Application Separation**:
```sql
-- Example RLS policy for RegSecured tables
CREATE POLICY "regsec_users_own_data" ON regsec_users
  FOR ALL 
  USING (
    auth.uid() = user_id 
    AND (auth.jwt() -> 'user_metadata' -> 'applications' -> 'regsecured' ->> 'enabled')::boolean = true
  );
```

**Multi-Tenant Separation**:
```sql
-- Tenant-level isolation
CREATE POLICY "regsec_tenant_isolation" ON regsec_cases
  FOR ALL
  USING (
    tenant_id = (auth.jwt() -> 'user_metadata' -> 'applications' -> 'regsecured' ->> 'tenant_id')::uuid
  );
```

---

## 3. DATABASE SCHEMA DESIGN

### 3.1 Core Tables Overview

**Total New Tables**: ~40 tables
- All prefixed with `regsec_`
- Complete RLS policies
- Comprehensive audit logging
- Multi-tenant architecture

### 3.2 Core Authentication & User Management

#### **regsec_tenants**
Multi-tenant organization structure
```sql
CREATE TABLE regsec_tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  subscription_plan text NOT NULL DEFAULT 'trial', -- trial, basic, professional, enterprise
  subscription_status text NOT NULL DEFAULT 'active', -- active, suspended, cancelled
  subscription_end_date timestamptz,
  max_users integer NOT NULL DEFAULT 5,
  max_clients integer,
  max_cases integer,
  
  -- Settings
  settings jsonb DEFAULT '{}'::jsonb,
  features jsonb DEFAULT '{}'::jsonb,
  compliance_jurisdictions text[] DEFAULT '{}',
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  is_active boolean DEFAULT true,
  
  -- Contact
  primary_contact_email text,
  primary_contact_phone text,
  address jsonb,
  
  CONSTRAINT valid_subscription_plan CHECK (subscription_plan IN ('trial', 'basic', 'professional', 'enterprise')),
  CONSTRAINT valid_subscription_status CHECK (subscription_status IN ('active', 'suspended', 'cancelled'))
);

CREATE INDEX idx_regsec_tenants_slug ON regsec_tenants(slug);
CREATE INDEX idx_regsec_tenants_status ON regsec_tenants(subscription_status) WHERE is_active = true;
```

#### **regsec_users**
RegSecured user profiles (extends auth.users)
```sql
CREATE TABLE regsec_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Profile
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  avatar_url text,
  title text,  -- Job title
  department text,
  
  -- Role & Permissions
  role text NOT NULL,  -- analyst, reviewer, relationship-manager, admin, superadmin, client
  permissions jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  
  -- Employment
  employee_id text,
  hire_date date,
  termination_date date,
  
  -- Settings
  language text DEFAULT 'en',
  timezone text DEFAULT 'UTC',
  notification_preferences jsonb DEFAULT '{}'::jsonb,
  
  -- MFA
  mfa_enabled boolean DEFAULT false,
  mfa_method text,  -- totp, sms, email
  
  -- Activity
  last_login_at timestamptz,
  last_active_at timestamptz,
  login_count integer DEFAULT 0,
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  
  CONSTRAINT valid_role CHECK (role IN ('analyst', 'reviewer', 'relationship-manager', 'admin', 'superadmin', 'client')),
  CONSTRAINT valid_mfa_method CHECK (mfa_method IN ('totp', 'sms', 'email', NULL))
);

CREATE INDEX idx_regsec_users_tenant ON regsec_users(tenant_id);
CREATE INDEX idx_regsec_users_role ON regsec_users(tenant_id, role) WHERE is_active = true;
CREATE INDEX idx_regsec_users_email ON regsec_users(email);
```

#### **regsec_user_sessions**
Session tracking and audit
```sql
CREATE TABLE regsec_user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES regsec_users(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Session
  session_id text NOT NULL,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  last_activity_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  
  -- Device & Location
  ip_address inet,
  user_agent text,
  device_type text,  -- desktop, mobile, tablet
  browser text,
  os text,
  location_country text,
  location_city text,
  
  -- Risk
  risk_score integer DEFAULT 0,
  risk_factors jsonb DEFAULT '[]'::jsonb,
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT valid_risk_score CHECK (risk_score BETWEEN 0 AND 100)
);

CREATE INDEX idx_regsec_sessions_user ON regsec_user_sessions(user_id, started_at DESC);
CREATE INDEX idx_regsec_sessions_active ON regsec_user_sessions(user_id) WHERE is_active = true;
```

### 3.3 Client & Entity Management

#### **regsec_client_organizations**
Client organizations (companies being onboarded)
```sql
CREATE TABLE regsec_client_organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Organization Info
  name text NOT NULL,
  legal_name text,
  entity_type text NOT NULL,  -- from EntityType enum
  registration_number text,
  jurisdiction text NOT NULL,
  incorporation_date date,
  
  -- Address
  registered_address jsonb,
  business_address jsonb,
  mailing_address jsonb,
  
  -- Identifiers
  tax_id text,
  lei text,  -- Legal Entity Identifier
  swift_code text,
  
  -- Business Info
  website text,
  industry text,
  business_description text,
  annual_revenue numeric(15,2),
  employee_count integer,
  publicly_listed boolean DEFAULT false,
  regulated_entity boolean DEFAULT false,
  
  -- Structure
  parent_organization_id uuid REFERENCES regsec_client_organizations(id),
  ultimate_parent_name text,
  
  -- Onboarding
  onboarding_scenario text NOT NULL,
  onboarding_status text NOT NULL DEFAULT 'not-started',
  onboarding_progress integer DEFAULT 0,
  current_step text,
  
  -- Risk
  risk_rating text,  -- low, medium, high, critical
  risk_score integer,
  risk_factors jsonb DEFAULT '[]'::jsonb,
  last_risk_assessment_date date,
  next_review_date date,
  
  -- Assignment
  assigned_analyst_id uuid REFERENCES regsec_users(id),
  assigned_reviewer_id uuid REFERENCES regsec_users(id),
  assigned_rm_id uuid REFERENCES regsec_users(id),
  
  -- Status
  status text NOT NULL DEFAULT 'pending',  -- pending, active, rejected, suspended, closed
  approval_date date,
  approved_by uuid REFERENCES regsec_users(id),
  rejection_reason text,
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES regsec_users(id),
  tags text[] DEFAULT '{}',
  notes text,
  metadata jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT valid_entity_type CHECK (entity_type IN (
    'individual', 'legal-entity', 'trust', 'foundation', 'investment-fund',
    'partnership', 'llc', 'corporation', 'limited-partnership', 'family-office'
  )),
  CONSTRAINT valid_onboarding_status CHECK (onboarding_status IN (
    'not-started', 'in-progress', 'completed', 'rejected'
  )),
  CONSTRAINT valid_risk_rating CHECK (risk_rating IN ('low', 'medium', 'high', 'critical', NULL)),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'active', 'rejected', 'suspended', 'closed'))
);

CREATE INDEX idx_regsec_clients_tenant ON regsec_client_organizations(tenant_id);
CREATE INDEX idx_regsec_clients_status ON regsec_client_organizations(tenant_id, status);
CREATE INDEX idx_regsec_clients_risk ON regsec_client_organizations(tenant_id, risk_rating);
CREATE INDEX idx_regsec_clients_analyst ON regsec_client_organizations(assigned_analyst_id);
CREATE INDEX idx_regsec_clients_reviewer ON regsec_client_organizations(assigned_reviewer_id);
CREATE INDEX idx_regsec_clients_rm ON regsec_client_organizations(assigned_rm_id);
```

#### **regsec_individuals**
Individual persons (UBOs, directors, shareholders, etc.)
```sql
CREATE TABLE regsec_individuals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Personal Information
  title text,  -- Mr, Ms, Dr, etc.
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  maiden_name text,
  date_of_birth date NOT NULL,
  place_of_birth text,
  gender text,
  
  -- Nationality & Residency
  nationality text[] NOT NULL,  -- Can have multiple
  residence_country text NOT NULL,
  tax_residency text[] NOT NULL,
  
  -- Identity Documents
  passport_number text,
  passport_country text,
  passport_expiry date,
  national_id text,
  national_id_country text,
  drivers_license text,
  drivers_license_country text,
  
  -- Contact
  email text,
  phone text,
  mobile text,
  
  -- Address
  residential_address jsonb NOT NULL,
  mailing_address jsonb,
  previous_addresses jsonb DEFAULT '[]'::jsonb,
  
  -- Employment
  occupation text,
  employer text,
  employer_address jsonb,
  annual_income numeric(15,2),
  source_of_income text,
  
  -- PEP & Sanctions
  is_pep boolean DEFAULT false,
  pep_details jsonb,
  pep_check_date date,
  is_sanctioned boolean DEFAULT false,
  sanctions_details jsonb,
  sanctions_check_date date,
  
  -- Risk
  risk_rating text,
  risk_score integer,
  risk_factors jsonb DEFAULT '[]'::jsonb,
  
  -- Status
  status text NOT NULL DEFAULT 'pending',
  verification_status text NOT NULL DEFAULT 'not-verified',
  verified_date date,
  verified_by uuid REFERENCES regsec_users(id),
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES regsec_users(id),
  notes text,
  metadata jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT valid_risk_rating CHECK (risk_rating IN ('low', 'medium', 'high', 'critical', NULL)),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'verified', 'rejected')),
  CONSTRAINT valid_verification_status CHECK (verification_status IN (
    'not-verified', 'pending', 'verified', 'failed', 'expired'
  ))
);

CREATE INDEX idx_regsec_individuals_tenant ON regsec_individuals(tenant_id);
CREATE INDEX idx_regsec_individuals_name ON regsec_individuals(tenant_id, last_name, first_name);
CREATE INDEX idx_regsec_individuals_pep ON regsec_individuals(tenant_id) WHERE is_pep = true;
CREATE INDEX idx_regsec_individuals_sanctioned ON regsec_individuals(tenant_id) WHERE is_sanctioned = true;
```

#### **regsec_relationships**
Relationships between entities and individuals
```sql
CREATE TABLE regsec_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Relationship
  from_entity_type text NOT NULL,  -- 'organization' or 'individual'
  from_entity_id uuid NOT NULL,
  to_entity_type text NOT NULL,  -- 'organization' or 'individual'
  to_entity_id uuid NOT NULL,
  
  -- Role
  role text NOT NULL,  -- from RelationshipRole enum
  role_details text,
  
  -- Ownership
  ownership_percentage numeric(5,2),
  voting_rights numeric(5,2),
  ownership_type text,  -- direct, indirect, beneficial
  
  -- Authority
  has_signing_authority boolean DEFAULT false,
  authority_limits text,
  is_primary_contact boolean DEFAULT false,
  
  -- Dates
  appointment_date date,
  resignation_date date,
  effective_from date,
  effective_to date,
  is_active boolean DEFAULT true,
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES regsec_users(id),
  notes text,
  
  CONSTRAINT valid_entity_type CHECK (from_entity_type IN ('organization', 'individual') AND to_entity_type IN ('organization', 'individual')),
  CONSTRAINT valid_role CHECK (role IN (
    'ultimate-beneficial-owner', 'shareholder', 'stakeholder', 'director', 'officer',
    'trustee', 'beneficiary', 'settlor', 'protector', 'authorized-signatory',
    'legal-representative', 'solicitor', 'lawyer', 'administrative-company',
    'management-company', 'loan-note-holder', 'investor', 'fund-manager',
    'general-partner', 'limited-partner', 'nominee-director', 'nominee-shareholder',
    'corporate-secretary'
  )),
  CONSTRAINT valid_ownership CHECK (ownership_percentage IS NULL OR (ownership_percentage >= 0 AND ownership_percentage <= 100)),
  CONSTRAINT valid_voting CHECK (voting_rights IS NULL OR (voting_rights >= 0 AND voting_rights <= 100))
);

CREATE INDEX idx_regsec_relationships_tenant ON regsec_relationships(tenant_id);
CREATE INDEX idx_regsec_relationships_from ON regsec_relationships(from_entity_type, from_entity_id);
CREATE INDEX idx_regsec_relationships_to ON regsec_relationships(to_entity_type, to_entity_id);
CREATE INDEX idx_regsec_relationships_role ON regsec_relationships(tenant_id, role);
CREATE INDEX idx_regsec_relationships_active ON regsec_relationships(tenant_id) WHERE is_active = true;
```

### 3.4 Document Management

#### **regsec_documents**
Document tracking and storage
```sql
CREATE TABLE regsec_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Association
  entity_type text NOT NULL,  -- 'organization', 'individual', 'case'
  entity_id uuid NOT NULL,
  
  -- Document Info
  document_type text NOT NULL,  -- passport, utility-bill, certificate-of-incorporation, etc.
  category text NOT NULL,  -- identity, address, corporate, financial, trust, etc.
  title text NOT NULL,
  description text,
  
  -- File
  file_path text NOT NULL,  -- Supabase Storage path
  file_name text NOT NULL,
  file_size integer NOT NULL,  -- bytes
  mime_type text NOT NULL,
  file_hash text,  -- SHA256 for integrity
  
  -- Version
  version integer DEFAULT 1,
  is_latest_version boolean DEFAULT true,
  supersedes_document_id uuid REFERENCES regsec_documents(id),
  
  -- Verification
  verification_status text NOT NULL DEFAULT 'pending',
  verified_date date,
  verified_by uuid REFERENCES regsec_users(id),
  verification_notes text,
  
  -- Expiry
  issue_date date,
  expiry_date date,
  is_expired boolean GENERATED ALWAYS AS (expiry_date IS NOT NULL AND expiry_date < CURRENT_DATE) STORED,
  
  -- Requirements
  requires_notarization boolean DEFAULT false,
  is_notarized boolean DEFAULT false,
  notarization_date date,
  requires_apostille boolean DEFAULT false,
  is_apostilled boolean DEFAULT false,
  apostille_date date,
  
  -- OCR & Processing
  ocr_processed boolean DEFAULT false,
  ocr_data jsonb,
  extracted_data jsonb,
  ai_verification_score numeric(3,2),
  
  -- Security
  is_sensitive boolean DEFAULT true,
  encryption_status text DEFAULT 'encrypted',
  access_level text DEFAULT 'restricted',  -- restricted, internal, confidential
  
  -- Metadata
  uploaded_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES regsec_users(id),
  last_accessed_at timestamptz,
  access_count integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT valid_verification_status CHECK (verification_status IN (
    'pending', 'approved', 'rejected', 'expired', 'needs-update'
  )),
  CONSTRAINT valid_entity_type CHECK (entity_type IN ('organization', 'individual', 'case'))
);

CREATE INDEX idx_regsec_documents_tenant ON regsec_documents(tenant_id);
CREATE INDEX idx_regsec_documents_entity ON regsec_documents(entity_type, entity_id);
CREATE INDEX idx_regsec_documents_type ON regsec_documents(tenant_id, document_type);
CREATE INDEX idx_regsec_documents_status ON regsec_documents(tenant_id, verification_status);
CREATE INDEX idx_regsec_documents_expired ON regsec_documents(tenant_id) WHERE is_expired = true;
```

### 3.5 Screening & Compliance

#### **regsec_screening_results**
PEP, sanctions, and adverse media screening
```sql
CREATE TABLE regsec_screening_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Subject
  entity_type text NOT NULL,  -- 'organization' or 'individual'
  entity_id uuid NOT NULL,
  case_id uuid,  -- Optional link to case
  
  -- Screening
  screening_type text NOT NULL,  -- pep, sanctions, adverse-media, watchlist
  provider text NOT NULL,  -- dowjones, worldcheck, refinitiv, etc.
  provider_reference text,
  
  -- Results
  match_status text NOT NULL DEFAULT 'no-match',  -- no-match, potential-match, confirmed-match
  match_count integer DEFAULT 0,
  matches jsonb DEFAULT '[]'::jsonb,  -- Array of match objects
  
  -- Risk
  risk_level text,  -- low, medium, high, critical
  risk_score integer,
  risk_factors jsonb DEFAULT '[]'::jsonb,
  
  -- Review
  review_status text NOT NULL DEFAULT 'pending',  -- pending, reviewed, false-positive, true-positive, escalated
  reviewed_date date,
  reviewed_by uuid REFERENCES regsec_users(id),
  reviewer_notes text,
  disposition text,  -- proceed, reject, escalate, monitor
  
  -- Timing
  screened_at timestamptz DEFAULT now(),
  screened_by uuid REFERENCES regsec_users(id),
  last_updated_at timestamptz DEFAULT now(),
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  raw_response jsonb,  -- Full API response
  
  CONSTRAINT valid_entity_type CHECK (entity_type IN ('organization', 'individual')),
  CONSTRAINT valid_screening_type CHECK (screening_type IN ('pep', 'sanctions', 'adverse-media', 'watchlist')),
  CONSTRAINT valid_match_status CHECK (match_status IN ('no-match', 'potential-match', 'confirmed-match')),
  CONSTRAINT valid_review_status CHECK (review_status IN ('pending', 'reviewed', 'false-positive', 'true-positive', 'escalated')),
  CONSTRAINT valid_disposition CHECK (disposition IN ('proceed', 'reject', 'escalate', 'monitor', NULL))
);

CREATE INDEX idx_regsec_screening_tenant ON regsec_screening_results(tenant_id);
CREATE INDEX idx_regsec_screening_entity ON regsec_screening_results(entity_type, entity_id);
CREATE INDEX idx_regsec_screening_case ON regsec_screening_results(case_id) WHERE case_id IS NOT NULL;
CREATE INDEX idx_regsec_screening_status ON regsec_screening_results(tenant_id, review_status);
CREATE INDEX idx_regsec_screening_matches ON regsec_screening_results(tenant_id) WHERE match_status != 'no-match';
```

### 3.6 Case & Workflow Management

#### **regsec_cases**
KYC/AML cases for review
```sql
CREATE TABLE regsec_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Case Info
  case_number text UNIQUE NOT NULL,
  case_type text NOT NULL,  -- kyc, aml, periodic-review, transaction-review, alert-investigation
  title text NOT NULL,
  description text,
  
  -- Subject
  client_organization_id uuid REFERENCES regsec_client_organizations(id),
  individual_id uuid REFERENCES regsec_individuals(id),
  
  -- Priority & Risk
  priority text NOT NULL DEFAULT 'medium',  -- low, medium, high, critical
  risk_level text,
  risk_score integer,
  
  -- Assignment
  assigned_analyst_id uuid REFERENCES regsec_users(id),
  assigned_reviewer_id uuid REFERENCES regsec_users(id),
  assigned_date date,
  
  -- Status & Workflow
  status text NOT NULL DEFAULT 'open',  -- open, in-progress, pending-review, approved, rejected, closed
  workflow_stage text,
  
  -- SLA
  due_date date,
  sla_hours integer,
  sla_breach boolean DEFAULT false,
  sla_breach_date timestamptz,
  
  -- Dates
  opened_at timestamptz DEFAULT now(),
  opened_by uuid REFERENCES regsec_users(id),
  started_at timestamptz,
  completed_at timestamptz,
  closed_at timestamptz,
  closed_by uuid REFERENCES regsec_users(id),
  
  -- Decision
  decision text,  -- approved, rejected, escalated
  decision_date date,
  decision_by uuid REFERENCES regsec_users(id),
  decision_notes text,
  rejection_reason text,
  
  -- Metadata
  tags text[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_case_type CHECK (case_type IN (
    'kyc', 'aml', 'periodic-review', 'transaction-review', 'alert-investigation', 'remediation'
  )),
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  CONSTRAINT valid_status CHECK (status IN (
    'open', 'in-progress', 'pending-review', 'approved', 'rejected', 'closed', 'escalated'
  )),
  CONSTRAINT valid_decision CHECK (decision IN ('approved', 'rejected', 'escalated', NULL))
);

CREATE INDEX idx_regsec_cases_tenant ON regsec_cases(tenant_id);
CREATE INDEX idx_regsec_cases_number ON regsec_cases(case_number);
CREATE INDEX idx_regsec_cases_client ON regsec_cases(client_organization_id);
CREATE INDEX idx_regsec_cases_status ON regsec_cases(tenant_id, status);
CREATE INDEX idx_regsec_cases_analyst ON regsec_cases(assigned_analyst_id) WHERE status IN ('open', 'in-progress');
CREATE INDEX idx_regsec_cases_reviewer ON regsec_cases(assigned_reviewer_id) WHERE status = 'pending-review';
CREATE INDEX idx_regsec_cases_sla_breach ON regsec_cases(tenant_id) WHERE sla_breach = true;
```

#### **regsec_case_activities**
Activity log for cases
```sql
CREATE TABLE regsec_case_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  case_id uuid NOT NULL REFERENCES regsec_cases(id) ON DELETE CASCADE,
  
  -- Activity
  activity_type text NOT NULL,  -- status-change, assignment, comment, document-added, review, decision
  description text NOT NULL,
  
  -- Changes
  old_value jsonb,
  new_value jsonb,
  
  -- Actor
  performed_by uuid REFERENCES regsec_users(id),
  performed_at timestamptz DEFAULT now(),
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT valid_activity_type CHECK (activity_type IN (
    'status-change', 'assignment', 'comment', 'document-added', 'review', 'decision', 'escalation', 'note'
  ))
);

CREATE INDEX idx_regsec_case_activities_case ON regsec_case_activities(case_id, performed_at DESC);
CREATE INDEX idx_regsec_case_activities_user ON regsec_case_activities(performed_by, performed_at DESC);
```

### 3.7 Risk Assessment

#### **regsec_risk_assessments**
Detailed risk assessments
```sql
CREATE TABLE regsec_risk_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Subject
  entity_type text NOT NULL,  -- 'organization' or 'individual'
  entity_id uuid NOT NULL,
  case_id uuid REFERENCES regsec_cases(id),
  
  -- Assessment
  assessment_type text NOT NULL,  -- initial, periodic, triggered, enhanced
  assessment_date date NOT NULL,
  assessment_period text,  -- monthly, quarterly, annually
  
  -- Overall Risk
  overall_risk_rating text NOT NULL,  -- low, medium, high, critical
  overall_risk_score integer NOT NULL,
  
  -- Risk Categories
  customer_risk_score integer,
  geographic_risk_score integer,
  product_service_risk_score integer,
  transaction_risk_score integer,
  
  -- Risk Factors
  risk_factors jsonb DEFAULT '[]'::jsonb,
  mitigating_factors jsonb DEFAULT '[]'::jsonb,
  red_flags jsonb DEFAULT '[]'::jsonb,
  
  -- Review
  performed_by uuid REFERENCES regsec_users(id),
  reviewed_by uuid REFERENCES regsec_users(id),
  approved_by uuid REFERENCES regsec_users(id),
  
  -- Next Review
  next_review_date date,
  review_frequency text,  -- monthly, quarterly, semi-annually, annually
  
  -- Status
  status text NOT NULL DEFAULT 'draft',  -- draft, completed, approved
  
  -- Metadata
  notes text,
  recommendations text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_entity_type CHECK (entity_type IN ('organization', 'individual')),
  CONSTRAINT valid_assessment_type CHECK (assessment_type IN ('initial', 'periodic', 'triggered', 'enhanced')),
  CONSTRAINT valid_risk_rating CHECK (overall_risk_rating IN ('low', 'medium', 'high', 'critical')),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'completed', 'approved'))
);

CREATE INDEX idx_regsec_risk_assessments_tenant ON regsec_risk_assessments(tenant_id);
CREATE INDEX idx_regsec_risk_assessments_entity ON regsec_risk_assessments(entity_type, entity_id);
CREATE INDEX idx_regsec_risk_assessments_case ON regsec_risk_assessments(case_id) WHERE case_id IS NOT NULL;
CREATE INDEX idx_regsec_risk_assessments_due ON regsec_risk_assessments(tenant_id, next_review_date) WHERE status = 'approved';
```

### 3.8 Audit & Compliance

#### **regsec_audit_log**
Comprehensive audit trail
```sql
CREATE TABLE regsec_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Action
  action text NOT NULL,  -- create, update, delete, view, approve, reject, export
  table_name text NOT NULL,
  record_id uuid,
  
  -- Actor
  user_id uuid REFERENCES auth.users(id),
  user_email text,
  user_role text,
  
  -- Context
  ip_address inet,
  user_agent text,
  session_id text,
  
  -- Changes
  old_values jsonb,
  new_values jsonb,
  changed_fields text[],
  
  -- Timestamp
  performed_at timestamptz DEFAULT now(),
  
  -- Metadata
  description text,
  metadata jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT valid_action CHECK (action IN (
    'create', 'update', 'delete', 'view', 'approve', 'reject', 'export', 'login', 'logout'
  ))
);

CREATE INDEX idx_regsec_audit_tenant ON regsec_audit_log(tenant_id, performed_at DESC);
CREATE INDEX idx_regsec_audit_user ON regsec_audit_log(user_id, performed_at DESC);
CREATE INDEX idx_regsec_audit_table ON regsec_audit_log(table_name, record_id);
CREATE INDEX idx_regsec_audit_action ON regsec_audit_log(tenant_id, action, performed_at DESC);
```

#### **regsec_compliance_reports**
Regulatory reporting
```sql
CREATE TABLE regsec_compliance_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Report
  report_type text NOT NULL,  -- sar, str, ctr, periodic, ad-hoc
  report_title text NOT NULL,
  report_period_start date,
  report_period_end date,
  
  -- Content
  summary text,
  findings jsonb DEFAULT '[]'::jsonb,
  recommendations text,
  
  -- File
  file_path text,
  file_format text,  -- pdf, excel, xml
  
  -- Status
  status text NOT NULL DEFAULT 'draft',  -- draft, under-review, approved, submitted
  
  -- Review Chain
  prepared_by uuid REFERENCES regsec_users(id),
  prepared_at timestamptz,
  reviewed_by uuid REFERENCES regsec_users(id),
  reviewed_at timestamptz,
  approved_by uuid REFERENCES regsec_users(id),
  approved_at timestamptz,
  
  -- Submission
  submitted_to text,  -- Regulatory authority
  submitted_at timestamptz,
  submission_reference text,
  submission_confirmation jsonb,
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT valid_report_type CHECK (report_type IN (
    'sar', 'str', 'ctr', 'periodic', 'ad-hoc', 'management'
  )),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'under-review', 'approved', 'submitted'))
);

CREATE INDEX idx_regsec_reports_tenant ON regsec_compliance_reports(tenant_id);
CREATE INDEX idx_regsec_reports_type ON regsec_compliance_reports(tenant_id, report_type);
CREATE INDEX idx_regsec_reports_status ON regsec_compliance_reports(tenant_id, status);
```

### 3.9 Additional Support Tables

#### **regsec_notifications**
In-app notifications
```sql
CREATE TABLE regsec_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES regsec_users(id) ON DELETE CASCADE,
  
  -- Notification
  type text NOT NULL,  -- info, warning, alert, task, approval
  title text NOT NULL,
  message text NOT NULL,
  priority text NOT NULL DEFAULT 'normal',  -- low, normal, high, urgent
  
  -- Link
  link_url text,
  link_entity_type text,
  link_entity_id uuid,
  
  -- Status
  is_read boolean DEFAULT false,
  read_at timestamptz,
  is_archived boolean DEFAULT false,
  archived_at timestamptz,
  
  -- Timing
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT valid_type CHECK (type IN ('info', 'warning', 'alert', 'task', 'approval')),
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'normal', 'high', 'urgent'))
);

CREATE INDEX idx_regsec_notifications_user ON regsec_notifications(user_id, created_at DESC);
CREATE INDEX idx_regsec_notifications_unread ON regsec_notifications(user_id) WHERE is_read = false AND is_archived = false;
```

#### **regsec_settings**
Tenant-level settings and configurations
```sql
CREATE TABLE regsec_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid UNIQUE NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
  
  -- Risk Thresholds
  risk_threshold_low integer DEFAULT 25,
  risk_threshold_medium integer DEFAULT 50,
  risk_threshold_high integer DEFAULT 75,
  
  -- SLA Configuration
  sla_kyc_hours integer DEFAULT 48,
  sla_aml_hours integer DEFAULT 24,
  sla_review_hours integer DEFAULT 72,
  
  -- Screening Configuration
  auto_screening_enabled boolean DEFAULT true,
  screening_providers text[] DEFAULT '{}',
  screening_frequency text DEFAULT 'monthly',
  
  -- Document Requirements
  document_expiry_warning_days integer DEFAULT 30,
  require_apostille_threshold text DEFAULT 'high',
  
  -- Workflow
  require_dual_approval boolean DEFAULT false,
  auto_assign_cases boolean DEFAULT true,
  case_assignment_algorithm text DEFAULT 'round-robin',
  
  -- Notifications
  email_notifications_enabled boolean DEFAULT true,
  sms_notifications_enabled boolean DEFAULT false,
  notification_digest text DEFAULT 'daily',
  
  -- Integrations
  integrations jsonb DEFAULT '{}'::jsonb,
  
  -- Compliance
  regulatory_jurisdictions text[] DEFAULT '{}',
  compliance_frameworks text[] DEFAULT '{}',
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES regsec_users(id)
);

CREATE INDEX idx_regsec_settings_tenant ON regsec_settings(tenant_id);
```

---

## 4. ROW LEVEL SECURITY (RLS) POLICIES

### 4.1 Tenant Isolation Strategy

Every table must enforce tenant isolation:

```sql
-- Enable RLS on all regsec_ tables
ALTER TABLE regsec_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_user_sessions ENABLE ROW LEVEL SECURITY;
-- ... (all other tables)

-- Helper function to get current user's tenant_id
CREATE OR REPLACE FUNCTION regsec_current_tenant_id()
RETURNS uuid AS $$
BEGIN
  RETURN (
    auth.jwt() -> 'user_metadata' -> 'applications' -> 'regsecured' ->> 'tenant_id'
  )::uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has RegSecured access
CREATE OR REPLACE FUNCTION regsec_has_access()
RETURNS boolean AS $$
BEGIN
  RETURN COALESCE(
    (auth.jwt() -> 'user_metadata' -> 'applications' -> 'regsecured' ->> 'enabled')::boolean,
    false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get user's role
CREATE OR REPLACE FUNCTION regsec_user_role()
RETURNS text AS $$
BEGIN
  RETURN (
    auth.jwt() -> 'user_metadata' -> 'applications' -> 'regsecured' ->> 'role'
  )::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 4.2 Standard RLS Policies

#### **regsec_users**
```sql
-- Users can view their own profile and colleagues in same tenant
CREATE POLICY "regsec_users_select" ON regsec_users
  FOR SELECT
  USING (
    regsec_has_access() 
    AND tenant_id = regsec_current_tenant_id()
  );

-- Users can update their own profile
CREATE POLICY "regsec_users_update_own" ON regsec_users
  FOR UPDATE
  USING (
    regsec_has_access()
    AND id = auth.uid()
  );

-- Only admins can create users
CREATE POLICY "regsec_users_insert" ON regsec_users
  FOR INSERT
  WITH CHECK (
    regsec_has_access()
    AND regsec_user_role() IN ('admin', 'superadmin')
    AND tenant_id = regsec_current_tenant_id()
  );

-- Only admins can delete users
CREATE POLICY "regsec_users_delete" ON regsec_users
  FOR DELETE
  USING (
    regsec_has_access()
    AND regsec_user_role() IN ('admin', 'superadmin')
    AND tenant_id = regsec_current_tenant_id()
  );
```

#### **regsec_client_organizations**
```sql
-- All users can view clients in their tenant
CREATE POLICY "regsec_clients_select" ON regsec_client_organizations
  FOR SELECT
  USING (
    regsec_has_access()
    AND tenant_id = regsec_current_tenant_id()
  );

-- Analysts, RMs, and admins can create clients
CREATE POLICY "regsec_clients_insert" ON regsec_client_organizations
  FOR INSERT
  WITH CHECK (
    regsec_has_access()
    AND regsec_user_role() IN ('analyst', 'relationship-manager', 'admin', 'superadmin')
    AND tenant_id = regsec_current_tenant_id()
  );

-- Assigned users and admins can update clients
CREATE POLICY "regsec_clients_update" ON regsec_client_organizations
  FOR UPDATE
  USING (
    regsec_has_access()
    AND tenant_id = regsec_current_tenant_id()
    AND (
      regsec_user_role() IN ('admin', 'superadmin')
      OR assigned_analyst_id = auth.uid()
      OR assigned_reviewer_id = auth.uid()
      OR assigned_rm_id = auth.uid()
    )
  );

-- Only admins can delete clients
CREATE POLICY "regsec_clients_delete" ON regsec_client_organizations
  FOR DELETE
  USING (
    regsec_has_access()
    AND regsec_user_role() IN ('admin', 'superadmin')
    AND tenant_id = regsec_current_tenant_id()
  );
```

#### **regsec_cases**
```sql
-- Users can view cases assigned to them or in their tenant
CREATE POLICY "regsec_cases_select" ON regsec_cases
  FOR SELECT
  USING (
    regsec_has_access()
    AND tenant_id = regsec_current_tenant_id()
    AND (
      regsec_user_role() IN ('admin', 'superadmin')
      OR assigned_analyst_id = auth.uid()
      OR assigned_reviewer_id = auth.uid()
    )
  );

-- Analysts and RMs can create cases
CREATE POLICY "regsec_cases_insert" ON regsec_cases
  FOR INSERT
  WITH CHECK (
    regsec_has_access()
    AND regsec_user_role() IN ('analyst', 'relationship-manager', 'admin', 'superadmin')
    AND tenant_id = regsec_current_tenant_id()
  );

-- Assigned users can update their cases
CREATE POLICY "regsec_cases_update" ON regsec_cases
  FOR UPDATE
  USING (
    regsec_has_access()
    AND tenant_id = regsec_current_tenant_id()
    AND (
      regsec_user_role() IN ('admin', 'superadmin')
      OR assigned_analyst_id = auth.uid()
      OR assigned_reviewer_id = auth.uid()
    )
  );
```

#### **regsec_documents**
```sql
-- Users can view documents for entities they have access to
CREATE POLICY "regsec_documents_select" ON regsec_documents
  FOR SELECT
  USING (
    regsec_has_access()
    AND tenant_id = regsec_current_tenant_id()
  );

-- Users can upload documents
CREATE POLICY "regsec_documents_insert" ON regsec_documents
  FOR INSERT
  WITH CHECK (
    regsec_has_access()
    AND tenant_id = regsec_current_tenant_id()
  );

-- Users can update documents they uploaded or if they're admin
CREATE POLICY "regsec_documents_update" ON regsec_documents
  FOR UPDATE
  USING (
    regsec_has_access()
    AND tenant_id = regsec_current_tenant_id()
    AND (
      regsec_user_role() IN ('admin', 'superadmin')
      OR uploaded_by = auth.uid()
    )
  );
```

#### **regsec_audit_log**
```sql
-- Only system can insert audit logs
CREATE POLICY "regsec_audit_insert" ON regsec_audit_log
  FOR INSERT
  WITH CHECK (true);  -- No auth required for inserts (system inserts)

-- Users can view audit logs for their tenant
CREATE POLICY "regsec_audit_select" ON regsec_audit_log
  FOR SELECT
  USING (
    regsec_has_access()
    AND tenant_id = regsec_current_tenant_id()
    AND regsec_user_role() IN ('admin', 'superadmin')
  );

-- No updates or deletes allowed on audit log
```

---

## 5. TRIGGERS & AUTOMATION

### 5.1 Audit Logging Trigger

Automatic audit logging for all data changes:

```sql
-- Function to log changes
CREATE OR REPLACE FUNCTION regsec_audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO regsec_audit_log (
    tenant_id,
    action,
    table_name,
    record_id,
    user_id,
    user_email,
    user_role,
    old_values,
    new_values,
    changed_fields
  ) VALUES (
    COALESCE(NEW.tenant_id, OLD.tenant_id),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    auth.uid(),
    auth.email(),
    regsec_user_role(),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END,
    CASE 
      WHEN TG_OP = 'UPDATE' THEN 
        ARRAY(SELECT key FROM jsonb_each(to_jsonb(NEW)) 
              WHERE to_jsonb(NEW)->>key IS DISTINCT FROM to_jsonb(OLD)->>key)
      ELSE NULL 
    END
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply to all regsec_ tables (example for critical tables)
CREATE TRIGGER audit_regsec_users
  AFTER INSERT OR UPDATE OR DELETE ON regsec_users
  FOR EACH ROW EXECUTE FUNCTION regsec_audit_trigger();

CREATE TRIGGER audit_regsec_client_organizations
  AFTER INSERT OR UPDATE OR DELETE ON regsec_client_organizations
  FOR EACH ROW EXECUTE FUNCTION regsec_audit_trigger();

CREATE TRIGGER audit_regsec_cases
  AFTER INSERT OR UPDATE OR DELETE ON regsec_cases
  FOR EACH ROW EXECUTE FUNCTION regsec_audit_trigger();

-- Add for all other sensitive tables...
```

### 5.2 Updated At Trigger

Automatically update `updated_at` timestamps:

```sql
CREATE OR REPLACE FUNCTION regsec_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at column
CREATE TRIGGER update_regsec_users_updated_at
  BEFORE UPDATE ON regsec_users
  FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at();

CREATE TRIGGER update_regsec_clients_updated_at
  BEFORE UPDATE ON regsec_client_organizations
  FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at();

-- Add for all other tables with updated_at...
```

### 5.3 Case Number Generation

Auto-generate unique case numbers:

```sql
CREATE OR REPLACE FUNCTION regsec_generate_case_number()
RETURNS TRIGGER AS $$
DECLARE
  tenant_prefix text;
  year_suffix text;
  sequence_num text;
BEGIN
  -- Get tenant slug prefix
  SELECT LEFT(slug, 3) INTO tenant_prefix
  FROM regsec_tenants
  WHERE id = NEW.tenant_id;
  
  -- Get year
  year_suffix := TO_CHAR(CURRENT_DATE, 'YY');
  
  -- Get sequence number for this tenant/year
  SELECT LPAD(
    (COUNT(*) + 1)::text,
    6,
    '0'
  ) INTO sequence_num
  FROM regsec_cases
  WHERE tenant_id = NEW.tenant_id
    AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE);
  
  -- Format: TEN-YY-000001
  NEW.case_number := UPPER(tenant_prefix) || '-' || year_suffix || '-' || sequence_num;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_regsec_case_number
  BEFORE INSERT ON regsec_cases
  FOR EACH ROW 
  WHEN (NEW.case_number IS NULL)
  EXECUTE FUNCTION regsec_generate_case_number();
```

### 5.4 SLA Breach Detection

Monitor and flag SLA breaches:

```sql
CREATE OR REPLACE FUNCTION regsec_check_sla_breach()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status NOT IN ('closed', 'completed') THEN
    IF NEW.due_date IS NOT NULL AND NEW.due_date < CURRENT_DATE THEN
      NEW.sla_breach := true;
      NEW.sla_breach_date := now();
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_regsec_case_sla
  BEFORE UPDATE ON regsec_cases
  FOR EACH ROW EXECUTE FUNCTION regsec_check_sla_breach();
```

---

## 6. IMPLEMENTATION PHASES

### Phase 1: Foundation (Week 1-2)
**Goal**: Set up core authentication and user management

**Tasks**:
1. Create Supabase client utilities
   - `/lib/supabase/client.ts` - Browser client
   - `/lib/supabase/server.ts` - Server client
   - `/middleware.ts` - Auth middleware

2. Create core tables (run migrations):
   - `regsec_tenants`
   - `regsec_users`
   - `regsec_user_sessions`
   - `regsec_settings`

3. Implement RLS policies for core tables

4. Build authentication pages:
   - `/app/auth/login/page.tsx`
   - `/app/auth/signup/page.tsx`
   - `/app/auth/forgot-password/page.tsx`

5. Update auth logic:
   - Replace localStorage with Supabase Auth
   - Implement session management
   - Add role checking middleware

**Success Criteria**:
- Users can register and login
- Roles are properly stored in user_metadata
- Sessions persist correctly
- RLS policies enforce tenant isolation

### Phase 2: Client & Entity Management (Week 3-4)
**Goal**: Migrate client onboarding system to database

**Tasks**:
1. Create entity tables (run migrations):
   - `regsec_client_organizations`
   - `regsec_individuals`
   - `regsec_relationships`

2. Implement RLS policies for entity tables

3. Build CRUD operations:
   - Create TypeScript types matching database schema
   - Build API routes for entity management
   - Add form submission handlers

4. Update existing pages:
   - `/app/client/onboarding/*` - Connect to database
   - `/app/relationship-manager/clients/*` - Load real data
   - `/app/dashboard/client/*` - Dynamic loading

**Success Criteria**:
- Client profiles saved to database
- Onboarding progress persists
- Relationships properly tracked
- Entity type detection works

### Phase 3: Document Management (Week 5)
**Goal**: Implement document upload and verification

**Tasks**:
1. Set up Supabase Storage:
   - Create `regsecured-documents` bucket
   - Configure access policies
   - Set up file encryption

2. Create document tables:
   - `regsec_documents`
   - Configure RLS policies

3. Build document upload system:
   - File upload components
   - Document verification workflow
   - OCR integration placeholder

4. Update document pages:
   - `/app/documents/upload/*`
   - `/app/documents/verification/*`
   - `/app/client/onboarding/documents/*`

**Success Criteria**:
- Documents upload to Storage
- Metadata saved to database
- Version control works
- Access control enforced

### Phase 4: Cases & Screening (Week 6-7)
**Goal**: Implement case management and screening

**Tasks**:
1. Create case tables:
   - `regsec_cases`
   - `regsec_case_activities`
   - `regsec_screening_results`
   - `regsec_risk_assessments`

2. Implement case workflow:
   - Case creation and assignment
   - Status transitions
   - Activity logging
   - SLA tracking

3. Build screening integration:
   - PEP/Sanctions check placeholders
   - Result storage
   - Match disposition workflow

4. Update case pages:
   - `/app/cases/*`
   - `/app/screening/*`
   - `/app/review/*`

**Success Criteria**:
- Cases created and assigned
- Workflow progresses correctly
- Screening results stored
- Activity logs comprehensive

### Phase 5: Dashboards & Analytics (Week 8)
**Goal**: Connect dashboards to real data

**Tasks**:
1. Build analytics queries:
   - Dashboard metrics
   - Performance indicators
   - Workload calculations

2. Update all dashboards:
   - `/app/dashboard/analyst/*`
   - `/app/dashboard/reviewer/*`
   - `/app/dashboard/relationship-manager/*`
   - `/app/dashboard/admin/*`

3. Real-time updates:
   - Implement Supabase Realtime subscriptions
   - Live notification system

**Success Criteria**:
- Dashboards show real data
- Metrics calculate correctly
- Real-time updates work

### Phase 6: Audit & Compliance (Week 9)
**Goal**: Complete audit trail and reporting

**Tasks**:
1. Create audit tables:
   - `regsec_audit_log`
   - `regsec_compliance_reports`
   - `regsec_notifications`

2. Implement audit triggers:
   - Automatic change logging
   - Session tracking
   - Access monitoring

3. Build reporting:
   - Audit log viewer
   - Compliance report generation
   - Export functionality

**Success Criteria**:
- All actions audited
- Reports generated correctly
- Compliance tracking works

### Phase 7: Testing & Refinement (Week 10)
**Goal**: Test and refine all functionality

**Tasks**:
1. End-to-end testing:
   - User registration and onboarding
   - Complete client onboarding flow
   - Case management workflow
   - Multi-tenant isolation

2. Performance optimization:
   - Query optimization
   - Index analysis
   - Caching strategy

3. Security audit:
   - RLS policy review
   - Permission testing
   - Vulnerability scanning

**Success Criteria**:
- All flows work end-to-end
- Performance acceptable
- Security verified

---

## 7. MIGRATION EXECUTION PLAN

### 7.1 Migration Scripts Organization

Create numbered migration files in `/scripts/migrations/`:

```
scripts/
  migrations/
    001_create_core_tables.sql
    002_create_entity_tables.sql
    003_create_document_tables.sql
    004_create_case_tables.sql
    005_create_audit_tables.sql
    006_create_rls_policies.sql
    007_create_triggers.sql
    008_create_indexes.sql
    009_create_functions.sql
    010_seed_initial_data.sql
```

### 7.2 Migration Execution

Use the Supabase MCP tools to execute migrations:

```typescript
// Execute via v0 tools
await supabase_apply_migration({
  project_id: "xavrkomgjhjvssbegnwc",
  name: "001_create_core_tables",
  query: `-- SQL from file`
})
```

### 7.3 Rollback Strategy

Each migration should include rollback script:

```sql
-- Migration: 001_create_core_tables.sql

-- UP
CREATE TABLE regsec_tenants (...);

-- DOWN (commented, for reference)
-- DROP TABLE IF EXISTS regsec_tenants CASCADE;
```

---

## 8. CODE STRUCTURE CHANGES

### 8.1 New Directories

```
lib/
  supabase/
    client.ts           # Browser Supabase client
    server.ts           # Server Supabase client
    middleware.ts       # Auth middleware utilities
  types/
    database.ts         # Generated database types
    regsecured.ts       # RegSecured-specific types
  api/
    users.ts            # User management functions
    clients.ts          # Client management functions
    cases.ts            # Case management functions
    documents.ts        # Document management functions
    screening.ts        # Screening functions
  hooks/
    useAuth.ts          # Authentication hook
    useUser.ts          # Current user hook
    useTenant.ts        # Current tenant hook
    useCases.ts         # Cases data hook
    useClients.ts       # Clients data hook

app/
  api/
    auth/              # Auth endpoints
    clients/           # Client CRUD endpoints
    cases/             # Case CRUD endpoints
    documents/         # Document endpoints
    screening/         # Screening endpoints

components/
  auth/
    LoginForm.tsx
    SignUpForm.tsx
    AuthGuard.tsx
    RoleGuard.tsx
```

### 8.2 Replace Mock Data

**Current**:
```typescript
// lib/mock-analyst-dashboard.ts
export const mockAnalystDashboard = {...}
```

**New**:
```typescript
// lib/api/analytics.ts
export async function getAnalystDashboard(userId: string) {
  const supabase = createClient()
  
  const { data: cases } = await supabase
    .from('regsec_cases')
    .select('*')
    .eq('assigned_analyst_id', userId)
  
  // Calculate real metrics
  return {
    alerts: calculateAlerts(cases),
    workload: calculateWorkload(cases),
    // ...
  }
}
```

### 8.3 Auth Context Provider

```typescript
// components/providers/auth-provider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  userRole: string | null
  tenantId: string | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])
  
  const userRole = user?.user_metadata?.applications?.regsecured?.role || null
  const tenantId = user?.user_metadata?.applications?.regsecured?.tenant_id || null
  
  const signOut = async () => {
    await supabase.auth.signOut()
  }
  
  return (
    <AuthContext.Provider value={{ user, userRole, tenantId, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

---

## 9. TESTING STRATEGY

### 9.1 Unit Tests

Test individual functions:
- RLS policy helpers
- Utility functions
- Data transformations

### 9.2 Integration Tests

Test database operations:
- User creation flow
- Client onboarding flow
- Case workflow
- Document upload

### 9.3 E2E Tests

Test complete user journeys:
- Analyst completes KYC review
- Reviewer approves case
- RM onboards new client
- Client completes onboarding

### 9.4 Security Tests

- RLS policy verification
- Tenant isolation testing
- Permission boundary testing
- SQL injection prevention

---

## 10. DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All migrations tested
- [ ] RLS policies verified
- [ ] Audit logging tested
- [ ] Performance benchmarks met
- [ ] Security audit passed
- [ ] Backup strategy defined

### Deployment
- [ ] Execute migrations in order
- [ ] Verify table creation
- [ ] Verify RLS policies
- [ ] Verify triggers
- [ ] Seed initial data (if needed)

### Post-Deployment
- [ ] Test authentication flow
- [ ] Test role-based access
- [ ] Test tenant isolation
- [ ] Monitor error logs
- [ ] Monitor performance
- [ ] Verify audit logs

---

## 11. DOCUMENTATION REQUIREMENTS

### Technical Documentation
- [ ] Database schema documentation
- [ ] RLS policy documentation
- [ ] API endpoint documentation
- [ ] Authentication flow diagrams
- [ ] Data model relationships

### User Documentation
- [ ] Role-specific user guides
- [ ] Onboarding process documentation
- [ ] Case management workflows
- [ ] Document upload guidelines
- [ ] Troubleshooting guide

---

## 12. MONITORING & MAINTENANCE

### Performance Monitoring
- Query performance tracking
- Slow query identification
- Index usage analysis
- Connection pool monitoring

### Security Monitoring
- Failed authentication attempts
- Suspicious access patterns
- RLS policy violations
- Audit log analysis

### Data Quality
- Orphaned records detection
- Data integrity checks
- Referential integrity monitoring
- Duplicate detection

---

## 13. FUTURE ENHANCEMENTS

### Short Term (Next 3 Months)
- OAuth integration (SSO)
- MFA implementation
- Advanced search and filtering
- Bulk operations
- Data export functionality

### Medium Term (3-6 Months)
- Real-time collaboration features
- Advanced analytics dashboard
- Machine learning risk scoring
- API for third-party integrations
- Mobile application

### Long Term (6-12 Months)
- Automated decision making
- Predictive compliance alerts
- Advanced OCR and document AI
- Blockchain integration for audit trail
- White-label solution

---

## 14. RISKS & MITIGATION

### Risk 1: Data Migration Complexity
**Mitigation**: Phase implementation, thorough testing, rollback plans

### Risk 2: Performance Impact
**Mitigation**: Proper indexing, query optimization, caching strategy

### Risk 3: RLS Policy Bugs
**Mitigation**: Comprehensive testing, security audit, gradual rollout

### Risk 4: User Adoption
**Mitigation**: Training materials, gradual feature rollout, support resources

### Risk 5: Scalability Concerns
**Mitigation**: Connection pooling, read replicas, query optimization

---

## 15. SUCCESS METRICS

### Technical Metrics
- Query response time < 200ms (p95)
- Zero RLS policy violations
- 100% audit log coverage
- <0.1% error rate

### Business Metrics
- User login success rate > 99%
- Case processing time reduction
- Document verification time reduction
- User satisfaction score > 4.5/5

### Security Metrics
- Zero data breaches
- Zero unauthorized access incidents
- 100% audit trail completeness
- Regular security assessments passed

---

## APPENDIX A: Quick Reference SQL Scripts

### Create Supabase Client (Browser)
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Create Supabase Client (Server)
```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

### Middleware for Auth
```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Check RegSecured access
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const hasAccess = user?.user_metadata?.applications?.regsecured?.enabled
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/access-denied', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## CONCLUSION

This implementation plan provides a comprehensive roadmap for integrating Supabase authentication and creating a complete database schema for the RegSecured application. The `regsec_` prefix ensures complete separation from the existing Keizen tables, while the shared Supabase Auth enables future cross-application functionality.

**Key Points**:
1. All tables prefixed with `regsec_` for isolation
2. Comprehensive RLS policies for security
3. Multi-tenant architecture with tenant-level isolation
4. Role-based access control integrated with Supabase Auth
5. Complete audit trail for compliance
6. Phased implementation for manageable rollout
7. Extensible design for future enhancements

**Next Steps**:
1. Review and approve this implementation plan
2. Begin Phase 1: Foundation setup
3. Execute migrations sequentially
4. Test each phase thoroughly before proceeding
5. Monitor and iterate based on feedback

**Estimated Timeline**: 10 weeks for complete implementation
**Estimated Effort**: 1-2 developers full-time

---

*Document Version: 1.0*  
*Last Updated: January 2026*  
*Author: v0 AI Assistant*
*Status: Ready for Implementation*
