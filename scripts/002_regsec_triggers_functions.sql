CREATE OR REPLACE FUNCTION regsec_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_regsec_tenants_updated_at BEFORE UPDATE ON regsec_tenants
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_user_profiles_updated_at BEFORE UPDATE ON regsec_user_profiles
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_clients_updated_at BEFORE UPDATE ON regsec_clients
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_addresses_updated_at BEFORE UPDATE ON regsec_addresses
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_individuals_updated_at BEFORE UPDATE ON regsec_individuals
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_relationships_updated_at BEFORE UPDATE ON regsec_relationships
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_cases_updated_at BEFORE UPDATE ON regsec_cases
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_documents_updated_at BEFORE UPDATE ON regsec_documents
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_alerts_updated_at BEFORE UPDATE ON regsec_alerts
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_risk_assessments_updated_at BEFORE UPDATE ON regsec_risk_assessments
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_workflows_updated_at BEFORE UPDATE ON regsec_workflows
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_workflow_instances_updated_at BEFORE UPDATE ON regsec_workflow_instances
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE TRIGGER update_regsec_settings_updated_at BEFORE UPDATE ON regsec_settings
    FOR EACH ROW EXECUTE FUNCTION regsec_update_updated_at_column();

CREATE OR REPLACE FUNCTION regsec_generate_client_number()
RETURNS TRIGGER AS $$
DECLARE
    next_num INTEGER;
    new_number TEXT;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(client_number FROM 4) AS INTEGER)), 0) + 1
    INTO next_num
    FROM regsec_clients
    WHERE tenant_id = NEW.tenant_id;
    
    new_number := 'CL-' || LPAD(next_num::TEXT, 6, '0');
    NEW.client_number := new_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_regsec_client_number
    BEFORE INSERT ON regsec_clients
    FOR EACH ROW
    WHEN (NEW.client_number IS NULL)
    EXECUTE FUNCTION regsec_generate_client_number();

CREATE OR REPLACE FUNCTION regsec_generate_case_number()
RETURNS TRIGGER AS $$
DECLARE
    next_num INTEGER;
    new_number TEXT;
    year_prefix TEXT;
BEGIN
    year_prefix := TO_CHAR(NOW(), 'YY');
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(case_number FROM 8) AS INTEGER)), 0) + 1
    INTO next_num
    FROM regsec_cases
    WHERE tenant_id = NEW.tenant_id 
    AND case_number LIKE 'CASE-' || year_prefix || '%';
    
    new_number := 'CASE-' || year_prefix || '-' || LPAD(next_num::TEXT, 5, '0');
    NEW.case_number := new_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_regsec_case_number
    BEFORE INSERT ON regsec_cases
    FOR EACH ROW
    WHEN (NEW.case_number IS NULL)
    EXECUTE FUNCTION regsec_generate_case_number();

CREATE OR REPLACE FUNCTION regsec_generate_alert_number()
RETURNS TRIGGER AS $$
DECLARE
    next_num INTEGER;
    new_number TEXT;
    year_prefix TEXT;
BEGIN
    year_prefix := TO_CHAR(NOW(), 'YY');
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(alert_number FROM 9) AS INTEGER)), 0) + 1
    INTO next_num
    FROM regsec_alerts
    WHERE tenant_id = NEW.tenant_id 
    AND alert_number LIKE 'ALERT-' || year_prefix || '%';
    
    new_number := 'ALERT-' || year_prefix || '-' || LPAD(next_num::TEXT, 5, '0');
    NEW.alert_number := new_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_regsec_alert_number
    BEFORE INSERT ON regsec_alerts
    FOR EACH ROW
    WHEN (NEW.alert_number IS NULL)
    EXECUTE FUNCTION regsec_generate_alert_number();

CREATE OR REPLACE FUNCTION regsec_log_audit_trail()
RETURNS TRIGGER AS $$
DECLARE
    old_data JSONB;
    new_data JSONB;
    action_type TEXT;
    entity_type_name TEXT;
BEGIN
    IF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        new_data := NULL;
        action_type := 'DELETE';
        entity_type_name := TG_TABLE_NAME;
        
        INSERT INTO regsec_audit_log (tenant_id, user_id, action, entity_type, entity_id, old_values, new_values)
        VALUES (OLD.tenant_id, current_setting('app.current_user_id', TRUE)::UUID, action_type, entity_type_name, OLD.id, old_data, new_data);
        
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        old_data := to_jsonb(OLD);
        new_data := to_jsonb(NEW);
        action_type := 'UPDATE';
        entity_type_name := TG_TABLE_NAME;
        
        INSERT INTO regsec_audit_log (tenant_id, user_id, action, entity_type, entity_id, old_values, new_values)
        VALUES (NEW.tenant_id, current_setting('app.current_user_id', TRUE)::UUID, action_type, entity_type_name, NEW.id, old_data, new_data);
        
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        old_data := NULL;
        new_data := to_jsonb(NEW);
        action_type := 'INSERT';
        entity_type_name := TG_TABLE_NAME;
        
        INSERT INTO regsec_audit_log (tenant_id, user_id, action, entity_type, entity_id, old_values, new_values)
        VALUES (NEW.tenant_id, current_setting('app.current_user_id', TRUE)::UUID, action_type, entity_type_name, NEW.id, old_data, new_data);
        
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_regsec_clients AFTER INSERT OR UPDATE OR DELETE ON regsec_clients
    FOR EACH ROW EXECUTE FUNCTION regsec_log_audit_trail();

CREATE TRIGGER audit_regsec_cases AFTER INSERT OR UPDATE OR DELETE ON regsec_cases
    FOR EACH ROW EXECUTE FUNCTION regsec_log_audit_trail();

CREATE TRIGGER audit_regsec_alerts AFTER INSERT OR UPDATE OR DELETE ON regsec_alerts
    FOR EACH ROW EXECUTE FUNCTION regsec_log_audit_trail();

CREATE TRIGGER audit_regsec_documents AFTER INSERT OR UPDATE OR DELETE ON regsec_documents
    FOR EACH ROW EXECUTE FUNCTION regsec_log_audit_trail();

CREATE TRIGGER audit_regsec_risk_assessments AFTER INSERT OR UPDATE OR DELETE ON regsec_risk_assessments
    FOR EACH ROW EXECUTE FUNCTION regsec_log_audit_trail();

CREATE OR REPLACE FUNCTION regsec_check_sla_breach()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.sla_deadline IS NOT NULL AND NOW() > NEW.sla_deadline AND NEW.status NOT IN ('resolved', 'closed') THEN
        NEW.is_sla_breached := TRUE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_case_sla_breach BEFORE UPDATE ON regsec_cases
    FOR EACH ROW EXECUTE FUNCTION regsec_check_sla_breach();

CREATE TRIGGER check_alert_sla_breach BEFORE UPDATE ON regsec_alerts
    FOR EACH ROW EXECUTE FUNCTION regsec_check_sla_breach();
