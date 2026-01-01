INSERT INTO regsec_tenants (id, name, slug, subscription_tier, max_users, is_active)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Default Tenant', 'default', 'enterprise', 100, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO regsec_workflows (tenant_id, workflow_name, workflow_type, description, entity_types, steps, is_active, is_default)
VALUES
    (
        '00000000-0000-0000-0000-000000000001',
        'Standard Individual Onboarding',
        'onboarding',
        'Standard workflow for individual client onboarding',
        ARRAY['individual']::regsec_entity_type[],
        '[
            {"step": 1, "name": "Client Information", "required": true},
            {"step": 2, "name": "Document Collection", "required": true},
            {"step": 3, "name": "Screening", "required": true},
            {"step": 4, "name": "Risk Assessment", "required": true},
            {"step": 5, "name": "Review & Approval", "required": true}
        ]'::jsonb,
        true,
        true
    ),
    (
        '00000000-0000-0000-0000-000000000001',
        'Standard Corporate Onboarding',
        'onboarding',
        'Standard workflow for corporate client onboarding',
        ARRAY['legal-entity', 'corporation', 'llc']::regsec_entity_type[],
        '[
            {"step": 1, "name": "Company Information", "required": true},
            {"step": 2, "name": "Beneficial Ownership", "required": true},
            {"step": 3, "name": "Corporate Documents", "required": true},
            {"step": 4, "name": "Screening", "required": true},
            {"step": 5, "name": "Risk Assessment", "required": true},
            {"step": 6, "name": "Review & Approval", "required": true}
        ]'::jsonb,
        true,
        true
    ),
    (
        '00000000-0000-0000-0000-000000000001',
        'Enhanced Due Diligence',
        'enhanced_due_diligence',
        'Enhanced due diligence workflow for high-risk clients',
        ARRAY['individual', 'legal-entity', 'trust', 'foundation']::regsec_entity_type[],
        '[
            {"step": 1, "name": "Initial Assessment", "required": true},
            {"step": 2, "name": "Source of Wealth", "required": true},
            {"step": 3, "name": "Source of Funds", "required": true},
            {"step": 4, "name": "Enhanced Screening", "required": true},
            {"step": 5, "name": "Background Verification", "required": true},
            {"step": 6, "name": "Senior Management Review", "required": true},
            {"step": 7, "name": "Final Approval", "required": true}
        ]'::jsonb,
        true,
        false
    )
ON CONFLICT DO NOTHING;

INSERT INTO regsec_settings (tenant_id, setting_category, setting_key, setting_value, description)
VALUES
    ('00000000-0000-0000-0000-000000000001', 'risk', 'score_thresholds', '{"low": 30, "medium": 60, "high": 80, "very_high": 100}'::jsonb, 'Risk score thresholds for client classification'),
    ('00000000-0000-0000-0000-000000000001', 'sla', 'case_resolution_hours', '{"low": 168, "medium": 72, "high": 24, "critical": 4}'::jsonb, 'SLA deadlines in hours by case priority'),
    ('00000000-0000-0000-0000-000000000001', 'sla', 'alert_resolution_hours', '{"low": 168, "medium": 72, "high": 24, "critical": 4}'::jsonb, 'SLA deadlines in hours by alert severity'),
    ('00000000-0000-0000-0000-000000000001', 'screening', 'enabled_providers', '["Dow Jones", "World-Check", "LexisNexis"]'::jsonb, 'Enabled screening providers'),
    ('00000000-0000-0000-0000-000000000001', 'screening', 'auto_screen_on_create', 'true'::jsonb, 'Automatically screen new clients'),
    ('00000000-0000-0000-0000-000000000001', 'screening', 'ongoing_monitoring_frequency_days', '90'::jsonb, 'Days between ongoing monitoring screens'),
    ('00000000-0000-0000-0000-000000000001', 'documents', 'max_file_size_mb', '50'::jsonb, 'Maximum document file size in MB'),
    ('00000000-0000-0000-0000-000000000001', 'documents', 'allowed_types', '["pdf", "jpg", "jpeg", "png", "doc", "docx"]'::jsonb, 'Allowed document file types'),
    ('00000000-0000-0000-0000-000000000001', 'documents', 'enable_ocr', 'true'::jsonb, 'Enable OCR for document processing'),
    ('00000000-0000-0000-0000-000000000001', 'review', 'periodic_review_months', '{"low": 24, "medium": 12, "high": 6, "very_high": 3}'::jsonb, 'Months between periodic reviews by risk rating'),
    ('00000000-0000-0000-0000-000000000001', 'notifications', 'email_enabled', 'true'::jsonb, 'Enable email notifications'),
    ('00000000-0000-0000-0000-000000000001', 'notifications', 'in_app_enabled', 'true'::jsonb, 'Enable in-app notifications')
ON CONFLICT (tenant_id, setting_category, setting_key) DO NOTHING;
