ALTER TABLE regsec_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_individuals ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_case_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_case_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_screening_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_workflow_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_communication_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_compliance_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE regsec_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tenant" ON regsec_tenants
    FOR SELECT USING (
        id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Superadmins can manage all tenants" ON regsec_tenants
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role = 'superadmin'
        )
    );

CREATE POLICY "Users can view their own profile" ON regsec_user_profiles
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON regsec_user_profiles
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admins can view all profiles in tenant" ON regsec_user_profiles
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Admins can manage profiles in tenant" ON regsec_user_profiles
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view clients in their tenant" ON regsec_clients
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Analysts and above can create clients" ON regsec_clients
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'relationship_manager', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Analysts and above can update clients" ON regsec_clients
    FOR UPDATE USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'relationship_manager', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Admins can delete clients" ON regsec_clients
    FOR DELETE USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view addresses in their tenant" ON regsec_addresses
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can manage addresses in their tenant" ON regsec_addresses
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'relationship_manager', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view individuals in their tenant" ON regsec_individuals
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can manage individuals in their tenant" ON regsec_individuals
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'relationship_manager', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view relationships in their tenant" ON regsec_relationships
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can manage relationships in their tenant" ON regsec_relationships
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'relationship_manager', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view cases in their tenant" ON regsec_cases
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Analysts can create cases" ON regsec_cases
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'relationship_manager', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can update cases in their tenant" ON regsec_cases
    FOR UPDATE USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'relationship_manager', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view case notes in their tenant" ON regsec_case_notes
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can create case notes" ON regsec_case_notes
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can view documents in their tenant" ON regsec_documents
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can upload documents" ON regsec_documents
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can update documents in their tenant" ON regsec_documents
    FOR UPDATE USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'relationship_manager', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view screening results in their tenant" ON regsec_screening_results
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can create screening results" ON regsec_screening_results
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view alerts in their tenant" ON regsec_alerts
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can create alerts" ON regsec_alerts
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can update alerts in their tenant" ON regsec_alerts
    FOR UPDATE USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view risk assessments in their tenant" ON regsec_risk_assessments
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Analysts can create risk assessments" ON regsec_risk_assessments
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Reviewers can update risk assessments" ON regsec_risk_assessments
    FOR UPDATE USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('reviewer', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view audit logs in their tenant" ON regsec_audit_log
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view their own notifications" ON regsec_notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON regsec_notifications
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON regsec_notifications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view workflows in their tenant" ON regsec_workflows
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage workflows" ON regsec_workflows
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Users can view workflow instances in their tenant" ON regsec_workflow_instances
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can create workflow instances" ON regsec_workflow_instances
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can update workflow instances" ON regsec_workflow_instances
    FOR UPDATE USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can view communication logs in their tenant" ON regsec_communication_log
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can create communication logs" ON regsec_communication_log
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can view compliance checks in their tenant" ON regsec_compliance_checks
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can create compliance checks" ON regsec_compliance_checks
    FOR INSERT WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('analyst', 'reviewer', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Reviewers can update compliance checks" ON regsec_compliance_checks
    FOR UPDATE USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('reviewer', 'admin', 'superadmin')
        )
    );

CREATE POLICY "Admins can view settings in their tenant" ON regsec_settings
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Admins can manage settings" ON regsec_settings
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM regsec_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );
