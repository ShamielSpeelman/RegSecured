CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE regsec_application_type AS ENUM ('keizen', 'regsecured');
CREATE TYPE regsec_user_role AS ENUM ('analyst', 'reviewer', 'relationship_manager', 'admin', 'superadmin', 'client');
CREATE TYPE regsec_entity_type AS ENUM ('individual', 'legal-entity', 'trust', 'foundation', 'investment-fund', 'partnership', 'llc', 'corporation', 'limited-partnership', 'family-office');
CREATE TYPE regsec_onboarding_status AS ENUM ('not_started', 'in_progress', 'pending_review', 'approved', 'rejected', 'on_hold');
CREATE TYPE regsec_risk_rating AS ENUM ('low', 'medium', 'high', 'very_high');
CREATE TYPE regsec_case_status AS ENUM ('open', 'in_progress', 'pending_review', 'resolved', 'escalated', 'closed');
CREATE TYPE regsec_case_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE regsec_alert_status AS ENUM ('new', 'under_review', 'escalated', 'false_positive', 'confirmed', 'resolved');
CREATE TYPE regsec_alert_type AS ENUM ('sanctions', 'pep', 'adverse_media', 'watchlist', 'duplicate', 'risk_threshold');
CREATE TYPE regsec_document_status AS ENUM ('pending', 'uploaded', 'under_review', 'approved', 'rejected', 'expired');
CREATE TYPE regsec_document_category AS ENUM ('identity', 'address', 'corporate', 'financial', 'regulatory', 'trust', 'beneficial-ownership', 'authorization', 'compliance');
CREATE TYPE regsec_relationship_role AS ENUM ('ultimate-beneficial-owner', 'shareholder', 'stakeholder', 'director', 'officer', 'trustee', 'beneficiary', 'settlor', 'protector', 'authorized-signatory', 'legal-representative', 'solicitor', 'lawyer', 'administrative-company', 'management-company', 'loan-note-holder', 'investor', 'fund-manager', 'general-partner', 'limited-partner', 'nominee-director', 'nominee-shareholder', 'corporate-secretary');

CREATE TABLE regsec_tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    domain TEXT,
    subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'professional', 'enterprise')),
    max_users INTEGER DEFAULT 5,
    max_clients INTEGER,
    settings JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    application_type regsec_application_type NOT NULL DEFAULT 'regsecured',
    email TEXT NOT NULL,
    full_name TEXT,
    role regsec_user_role NOT NULL DEFAULT 'analyst',
    department TEXT,
    job_title TEXT,
    phone TEXT,
    mobile_phone TEXT,
    profile_image_url TEXT,
    timezone TEXT DEFAULT 'UTC',
    language TEXT DEFAULT 'en',
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,
    preferences JSONB DEFAULT '{}'::jsonb,
    permissions JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(email, tenant_id)
);

CREATE TABLE regsec_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    client_number TEXT UNIQUE NOT NULL,
    entity_type regsec_entity_type NOT NULL,
    primary_name TEXT NOT NULL,
    legal_name TEXT,
    trade_name TEXT,
    risk_rating regsec_risk_rating DEFAULT 'medium',
    onboarding_status regsec_onboarding_status DEFAULT 'not_started',
    onboarding_progress INTEGER DEFAULT 0 CHECK (onboarding_progress >= 0 AND onboarding_progress <= 100),
    assigned_rm_id UUID REFERENCES regsec_user_profiles(id),
    assigned_analyst_id UUID REFERENCES regsec_user_profiles(id),
    jurisdiction TEXT,
    registration_number TEXT,
    tax_id TEXT,
    lei TEXT,
    incorporation_date DATE,
    industry TEXT,
    business_description TEXT,
    website TEXT,
    email TEXT,
    phone TEXT,
    is_pep BOOLEAN DEFAULT false,
    is_sanctioned BOOLEAN DEFAULT false,
    is_high_risk BOOLEAN DEFAULT false,
    last_review_date TIMESTAMPTZ,
    next_review_date TIMESTAMPTZ,
    approval_date TIMESTAMPTZ,
    approved_by UUID REFERENCES regsec_user_profiles(id),
    rejection_date TIMESTAMPTZ,
    rejected_by UUID REFERENCES regsec_user_profiles(id),
    rejection_reason TEXT,
    notes TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES regsec_user_profiles(id),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    entity_id UUID NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('client', 'individual')),
    address_type TEXT NOT NULL CHECK (address_type IN ('residential', 'business', 'registered', 'mailing')),
    street TEXT NOT NULL,
    street_2 TEXT,
    city TEXT NOT NULL,
    state TEXT,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    valid_from DATE,
    valid_to DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_individuals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    client_id UUID REFERENCES regsec_clients(id) ON DELETE CASCADE,
    title TEXT,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    full_name TEXT GENERATED ALWAYS AS (
        CASE 
            WHEN middle_name IS NOT NULL THEN first_name || ' ' || middle_name || ' ' || last_name
            ELSE first_name || ' ' || last_name
        END
    ) STORED,
    date_of_birth DATE,
    place_of_birth TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    nationality TEXT[],
    residence_country TEXT,
    tax_residency TEXT[],
    passport_number TEXT,
    passport_expiry DATE,
    passport_issuing_country TEXT,
    national_id TEXT,
    drivers_license TEXT,
    occupation TEXT,
    employer TEXT,
    is_pep BOOLEAN DEFAULT false,
    pep_details TEXT,
    is_sanctioned BOOLEAN DEFAULT false,
    sanctions_details TEXT,
    risk_rating regsec_risk_rating DEFAULT 'medium',
    email TEXT,
    phone TEXT,
    mobile_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES regsec_user_profiles(id),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES regsec_clients(id) ON DELETE CASCADE,
    individual_id UUID REFERENCES regsec_individuals(id) ON DELETE CASCADE,
    related_client_id UUID REFERENCES regsec_clients(id) ON DELETE CASCADE,
    role regsec_relationship_role NOT NULL,
    ownership_percentage NUMERIC(5,2) CHECK (ownership_percentage >= 0 AND ownership_percentage <= 100),
    voting_rights NUMERIC(5,2) CHECK (voting_rights >= 0 AND voting_rights <= 100),
    appointment_date DATE,
    resignation_date DATE,
    is_active BOOLEAN DEFAULT true,
    is_primary_contact BOOLEAN DEFAULT false,
    has_signing_authority BOOLEAN DEFAULT false,
    authority_limits TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES regsec_user_profiles(id),
    metadata JSONB DEFAULT '{}'::jsonb,
    CHECK (
        (individual_id IS NOT NULL AND related_client_id IS NULL) OR
        (individual_id IS NULL AND related_client_id IS NOT NULL)
    )
);

CREATE TABLE regsec_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    case_number TEXT UNIQUE NOT NULL,
    client_id UUID NOT NULL REFERENCES regsec_clients(id) ON DELETE CASCADE,
    case_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status regsec_case_status DEFAULT 'open',
    priority regsec_case_priority DEFAULT 'medium',
    risk_rating regsec_risk_rating,
    assigned_to UUID REFERENCES regsec_user_profiles(id),
    assigned_by UUID REFERENCES regsec_user_profiles(id),
    assigned_at TIMESTAMPTZ,
    due_date TIMESTAMPTZ,
    opened_at TIMESTAMPTZ DEFAULT NOW(),
    opened_by UUID REFERENCES regsec_user_profiles(id),
    closed_at TIMESTAMPTZ,
    closed_by UUID REFERENCES regsec_user_profiles(id),
    resolution TEXT,
    sla_deadline TIMESTAMPTZ,
    is_sla_breached BOOLEAN DEFAULT false,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_case_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    case_id UUID NOT NULL REFERENCES regsec_cases(id) ON DELETE CASCADE,
    note_type TEXT DEFAULT 'comment' CHECK (note_type IN ('comment', 'action', 'decision', 'escalation')),
    content TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES regsec_user_profiles(id),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_case_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    case_id UUID NOT NULL REFERENCES regsec_cases(id) ON DELETE CASCADE,
    assigned_to UUID NOT NULL REFERENCES regsec_user_profiles(id),
    assigned_by UUID NOT NULL REFERENCES regsec_user_profiles(id),
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    unassigned_at TIMESTAMPTZ,
    unassigned_by UUID REFERENCES regsec_user_profiles(id),
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE regsec_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    client_id UUID REFERENCES regsec_clients(id) ON DELETE CASCADE,
    individual_id UUID REFERENCES regsec_individuals(id) ON DELETE CASCADE,
    case_id UUID REFERENCES regsec_cases(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    category regsec_document_category,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    file_hash TEXT,
    status regsec_document_status DEFAULT 'pending',
    version INTEGER DEFAULT 1,
    is_required BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    is_expired BOOLEAN DEFAULT false,
    issue_date DATE,
    expiry_date DATE,
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES regsec_user_profiles(id),
    rejected_at TIMESTAMPTZ,
    rejected_by UUID REFERENCES regsec_user_profiles(id),
    rejection_reason TEXT,
    ocr_data JSONB,
    extracted_data JSONB,
    notes TEXT,
    tags TEXT[],
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    uploaded_by UUID NOT NULL REFERENCES regsec_user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_screening_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    client_id UUID REFERENCES regsec_clients(id) ON DELETE CASCADE,
    individual_id UUID REFERENCES regsec_individuals(id) ON DELETE CASCADE,
    screening_provider TEXT NOT NULL,
    screening_type TEXT NOT NULL,
    search_term TEXT NOT NULL,
    match_count INTEGER DEFAULT 0,
    has_matches BOOLEAN DEFAULT false,
    risk_score NUMERIC(5,2),
    raw_results JSONB,
    screened_at TIMESTAMPTZ DEFAULT NOW(),
    screened_by UUID REFERENCES regsec_user_profiles(id),
    is_ongoing BOOLEAN DEFAULT false,
    next_screening_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    CHECK (
        (client_id IS NOT NULL AND individual_id IS NULL) OR
        (client_id IS NULL AND individual_id IS NOT NULL)
    )
);

CREATE TABLE regsec_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    alert_number TEXT UNIQUE NOT NULL,
    client_id UUID REFERENCES regsec_clients(id) ON DELETE CASCADE,
    individual_id UUID REFERENCES regsec_individuals(id) ON DELETE CASCADE,
    screening_result_id UUID REFERENCES regsec_screening_results(id) ON DELETE CASCADE,
    case_id UUID REFERENCES regsec_cases(id),
    alert_type regsec_alert_type NOT NULL,
    status regsec_alert_status DEFAULT 'new',
    severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    title TEXT NOT NULL,
    description TEXT,
    match_details JSONB,
    risk_score NUMERIC(5,2),
    assigned_to UUID REFERENCES regsec_user_profiles(id),
    assigned_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES regsec_user_profiles(id),
    review_decision TEXT CHECK (review_decision IN ('true_positive', 'false_positive', 'escalate', 'pending')),
    review_notes TEXT,
    resolved_at TIMESTAMPTZ,
    resolved_by UUID REFERENCES regsec_user_profiles(id),
    resolution_notes TEXT,
    sla_deadline TIMESTAMPTZ,
    is_sla_breached BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    CHECK (
        (client_id IS NOT NULL AND individual_id IS NULL) OR
        (client_id IS NULL AND individual_id IS NOT NULL) OR
        (client_id IS NULL AND individual_id IS NULL)
    )
);

CREATE TABLE regsec_risk_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES regsec_clients(id) ON DELETE CASCADE,
    assessment_type TEXT NOT NULL DEFAULT 'periodic' CHECK (assessment_type IN ('initial', 'periodic', 'triggered', 'enhanced')),
    risk_rating regsec_risk_rating NOT NULL,
    overall_score NUMERIC(5,2),
    risk_factors JSONB DEFAULT '[]'::jsonb,
    mitigating_factors JSONB DEFAULT '[]'::jsonb,
    recommendations TEXT,
    assessment_date TIMESTAMPTZ DEFAULT NOW(),
    next_assessment_date TIMESTAMPTZ,
    assessed_by UUID NOT NULL REFERENCES regsec_user_profiles(id),
    approved_by UUID REFERENCES regsec_user_profiles(id),
    approved_at TIMESTAMPTZ,
    is_current BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES regsec_user_profiles(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES regsec_user_profiles(id),
    notification_type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    workflow_name TEXT NOT NULL,
    workflow_type TEXT NOT NULL,
    description TEXT,
    entity_types regsec_entity_type[],
    steps JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES regsec_user_profiles(id),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_workflow_instances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    workflow_id UUID NOT NULL REFERENCES regsec_workflows(id),
    client_id UUID NOT NULL REFERENCES regsec_clients(id) ON DELETE CASCADE,
    current_step INTEGER DEFAULT 0,
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('not_started', 'in_progress', 'completed', 'cancelled')),
    step_data JSONB DEFAULT '{}'::jsonb,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_communication_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    client_id UUID REFERENCES regsec_clients(id) ON DELETE CASCADE,
    individual_id UUID REFERENCES regsec_individuals(id) ON DELETE CASCADE,
    case_id UUID REFERENCES regsec_cases(id),
    communication_type TEXT NOT NULL CHECK (communication_type IN ('email', 'phone', 'meeting', 'letter', 'portal_message')),
    direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
    subject TEXT,
    content TEXT,
    from_user UUID REFERENCES regsec_user_profiles(id),
    to_recipients TEXT[],
    cc_recipients TEXT[],
    attachments TEXT[],
    sent_at TIMESTAMPTZ,
    received_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES regsec_user_profiles(id),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_compliance_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES regsec_clients(id) ON DELETE CASCADE,
    check_type TEXT NOT NULL,
    check_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'passed', 'failed', 'waived')),
    result TEXT,
    performed_at TIMESTAMPTZ DEFAULT NOW(),
    performed_by UUID REFERENCES regsec_user_profiles(id),
    waived_by UUID REFERENCES regsec_user_profiles(id),
    waive_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE regsec_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES regsec_tenants(id) ON DELETE CASCADE,
    setting_category TEXT NOT NULL,
    setting_key TEXT NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES regsec_user_profiles(id),
    UNIQUE(tenant_id, setting_category, setting_key)
);

CREATE INDEX idx_regsec_user_profiles_tenant ON regsec_user_profiles(tenant_id);
CREATE INDEX idx_regsec_user_profiles_email ON regsec_user_profiles(email);
CREATE INDEX idx_regsec_user_profiles_role ON regsec_user_profiles(role);
CREATE INDEX idx_regsec_user_profiles_app_type ON regsec_user_profiles(application_type);
CREATE INDEX idx_regsec_clients_tenant ON regsec_clients(tenant_id);
CREATE INDEX idx_regsec_clients_number ON regsec_clients(client_number);
CREATE INDEX idx_regsec_clients_assigned_rm ON regsec_clients(assigned_rm_id);
CREATE INDEX idx_regsec_clients_status ON regsec_clients(onboarding_status);
CREATE INDEX idx_regsec_clients_risk ON regsec_clients(risk_rating);
CREATE INDEX idx_regsec_addresses_entity ON regsec_addresses(entity_id, entity_type);
CREATE INDEX idx_regsec_individuals_tenant ON regsec_individuals(tenant_id);
CREATE INDEX idx_regsec_individuals_client ON regsec_individuals(client_id);
CREATE INDEX idx_regsec_relationships_client ON regsec_relationships(client_id);
CREATE INDEX idx_regsec_relationships_individual ON regsec_relationships(individual_id);
CREATE INDEX idx_regsec_cases_tenant ON regsec_cases(tenant_id);
CREATE INDEX idx_regsec_cases_client ON regsec_cases(client_id);
CREATE INDEX idx_regsec_cases_assigned ON regsec_cases(assigned_to);
CREATE INDEX idx_regsec_cases_status ON regsec_cases(status);
CREATE INDEX idx_regsec_documents_client ON regsec_documents(client_id);
CREATE INDEX idx_regsec_documents_individual ON regsec_documents(individual_id);
CREATE INDEX idx_regsec_documents_case ON regsec_documents(case_id);
CREATE INDEX idx_regsec_documents_status ON regsec_documents(status);
CREATE INDEX idx_regsec_screening_client ON regsec_screening_results(client_id);
CREATE INDEX idx_regsec_screening_individual ON regsec_screening_results(individual_id);
CREATE INDEX idx_regsec_alerts_tenant ON regsec_alerts(tenant_id);
CREATE INDEX idx_regsec_alerts_client ON regsec_alerts(client_id);
CREATE INDEX idx_regsec_alerts_assigned ON regsec_alerts(assigned_to);
CREATE INDEX idx_regsec_alerts_status ON regsec_alerts(status);
CREATE INDEX idx_regsec_alerts_type ON regsec_alerts(alert_type);
CREATE INDEX idx_regsec_risk_assessments_client ON regsec_risk_assessments(client_id);
CREATE INDEX idx_regsec_audit_log_tenant ON regsec_audit_log(tenant_id);
CREATE INDEX idx_regsec_audit_log_user ON regsec_audit_log(user_id);
CREATE INDEX idx_regsec_audit_log_entity ON regsec_audit_log(entity_type, entity_id);
CREATE INDEX idx_regsec_audit_log_created ON regsec_audit_log(created_at);
CREATE INDEX idx_regsec_notifications_user ON regsec_notifications(user_id);
CREATE INDEX idx_regsec_notifications_read ON regsec_notifications(is_read);
CREATE INDEX idx_regsec_workflow_instances_client ON regsec_workflow_instances(client_id);
CREATE INDEX idx_regsec_communication_log_client ON regsec_communication_log(client_id);
CREATE INDEX idx_regsec_communication_log_case ON regsec_communication_log(case_id);
CREATE INDEX idx_regsec_compliance_checks_client ON regsec_compliance_checks(client_id);
