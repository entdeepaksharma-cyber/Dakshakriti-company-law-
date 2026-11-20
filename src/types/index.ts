/**
 * Corporate Legal Intelligence Platform - Core Data Models & Schemas
 * Based on Specifications in Stages 6, 13, 20, 21, 23, 25-35
 */

export type TrustStatus = 
  | 'SOURCE_RECORD'
  | 'AI_EXTRACTED'
  | 'NEEDS_REVIEW'
  | 'HUMAN_VERIFIED'
  | 'DISPUTED'
  | 'REJECTED'
  | 'UNKNOWN';

export type EvidenceType = 
  | 'DIRECT'
  | 'INDIRECT'
  | 'DERIVED'
  | 'CONTRADICTORY'
  | 'UNKNOWN';

export type UserRole = 
  | 'ADMIN'
  | 'PROFESSIONAL'
  | 'REVIEWER'
  | 'VIEWER';

export type CorporateType = 
  | 'Private Limited Company'
  | 'Public Limited Company'
  | 'One Person Company'
  | 'Section 8 Company'
  | 'Government Company'
  | 'Foreign Company'
  | 'LLP';

export type EventType =
  | 'INCORPORATION'
  | 'DIRECTOR_APPOINTMENT'
  | 'DIRECTOR_RESIGNATION'
  | 'DIRECTOR_REMOVAL'
  | 'SHARE_ISSUE'
  | 'SHARE_TRANSFER'
  | 'SHARE_TRANSMISSION'
  | 'CAPITAL_ALTERATION'
  | 'BOARD_MEETING'
  | 'BOARD_RESOLUTION'
  | 'SHAREHOLDER_RESOLUTION'
  | 'CONSTITUTIONAL_AMENDMENT'
  | 'BORROWING'
  | 'CHARGE_CREATION'
  | 'CHARGE_MODIFICATION'
  | 'CHARGE_SATISFACTION'
  | 'REGULATORY_NOTICE'
  | 'TRIBUNAL_ORDER'
  | 'COURT_ORDER'
  | 'CONTRACT_EXECUTION'
  | 'DISPUTE_INITIATION';

export interface User {
  user_id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
}

export interface Company {
  company_id: string;
  legal_name: string;
  former_names: string[];
  identifier: string; // CIN / LLPIN
  corporate_type: CorporateType;
  incorporation_date: string;
  jurisdiction: string;
  registered_address: string;
  authorized_capital: number;
  paid_up_capital: number;
  status: 'Active' | 'Under Process' | 'Dormant' | 'Strike Off';
  source_status: TrustStatus;
  created_at: string;
  updated_at: string;
}

export interface Person {
  person_id: string;
  full_name: string;
  aliases: string[];
  din?: string; // Director Identification Number
  pan?: string;
  status: 'Active' | 'Inactive';
  verification_status: TrustStatus;
}

export interface Role {
  role_id: string;
  person_id: string;
  company_id: string;
  role_type: 'Director' | 'Managing Director' | 'Additional Director' | 'Shareholder' | 'Company Secretary' | 'CFO' | 'Authorized Signatory' | 'Promoter';
  title: string;
  start_date: string;
  end_date?: string;
  source_event_id?: string;
  verification_status: TrustStatus;
}

export interface Authority {
  authority_id: string;
  person_id: string;
  role_id: string;
  company_id: string;
  scope: string;
  limitations?: string;
  monetary_limit?: number; // e.g. up to ₹5,00,00,000
  effective_start: string;
  effective_end?: string;
  supporting_resolution_id?: string;
  legal_basis: string;
  verification_status: TrustStatus;
}

export interface Shareholding {
  shareholding_id: string;
  company_id: string;
  holder_id: string; // Person or Company ID
  security_class: 'Equity Shares' | 'Preference Shares' | 'Debentures';
  quantity: number;
  face_value: number;
  percentage: number;
  acquisition_event_id: string;
  effective_date: string;
  verification_status: TrustStatus;
}

export interface Document {
  document_id: string;
  company_id: string;
  document_type: string;
  title: string;
  document_date: string;
  effective_date: string;
  source: string;
  storage_reference: string;
  file_hash: string;
  version: number;
  content_text: string;
  parties: string[];
  processing_status: 'UPLOADED' | 'EXTRACTED' | 'PROCESSED' | 'REVIEWED';
  classification_confidence: number;
  verification_status: TrustStatus;
}

export interface Evidence {
  evidence_id: string;
  company_id: string;
  document_id: string;
  page_number: number;
  section_reference: string;
  text_excerpt: string;
  proposition: string;
  evidence_type: EvidenceType;
  confidence: number;
  verification_status: TrustStatus;
  reviewer?: string;
  review_date?: string;
}

export interface CorporateEvent {
  event_id: string;
  company_id: string;
  event_type: EventType;
  title: string;
  event_date: string;
  effective_date: string;
  filing_date?: string;
  verification_date?: string;
  actors: { person_id?: string; name: string; role?: string }[];
  decision_maker: string;
  authority: string;
  description: string;
  source_document_ids: string[];
  evidence_ids: string[];
  legal_source_ids: string[];
  consequence: string;
  status: TrustStatus;
  confidence: number;
  created_at: string;
}

export interface LegalSource {
  source_id: string;
  source_type: 'STATUTE' | 'RULE' | 'REGULATION' | 'NOTIFICATION' | 'CIRCULAR' | 'ORDER' | 'JUDGMENT';
  title: string;
  citation: string;
  section?: string;
  subsection?: string;
  rule?: string;
  authority: string;
  effective_from: string;
  effective_until?: string;
  requirement: string;
  applicability: string;
  expected_documents: string[];
  expected_filings: string[];
}

export interface ComplianceItem {
  compliance_id: string;
  company_id: string;
  requirement_title: string;
  legal_source_id: string;
  trigger_event_id?: string;
  trigger_type: 'EVENT' | 'TIME' | 'THRESHOLD';
  due_date: string;
  responsible_actor: string;
  required_filing: string;
  expected_evidence: string;
  found_evidence_id?: string;
  status: 'VERIFIED' | 'REVIEW_REQUIRED' | 'MISSING_EVIDENCE' | 'OVERDUE' | 'DISPUTED' | 'NOT_APPLICABLE';
  risk_level: 'INFORMATIONAL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  verification_status: TrustStatus;
}

export interface DueDiligenceMatter {
  matter_id: string;
  company_id: string;
  title: string;
  transaction_type: string;
  target_closing_date: string;
  status: 'Review in Progress' | 'Ready for Decision' | 'Material Issues Identified' | 'Closed';
  readiness_score: number;
  critical_red_flags: number;
  high_red_flags: number;
  evidence_gaps: number;
}

export interface RedFlag {
  flag_id: string;
  company_id: string;
  category: 'OWNERSHIP' | 'GOVERNANCE' | 'AUTHORITY' | 'CHARGES' | 'LITIGATION' | 'REGULATORY' | 'EVIDENCE';
  title: string;
  description: string;
  severity: 'INFORMATIONAL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  related_event_id?: string;
  related_document_id?: string;
  status: 'OPEN' | 'RESOLVED' | 'REVIEW_REQUIRED';
}

export interface CorporateMeeting {
  meeting_id: string;
  company_id: string;
  meeting_type: 'Board Meeting' | 'Annual General Meeting' | 'Extraordinary General Meeting' | 'Audit Committee';
  date: string;
  notice_date: string;
  agenda: string[];
  attendees: string[];
  quorum_satisfied: boolean;
  minutes_document_id?: string;
  verification_status: TrustStatus;
}

export interface CorporateResolution {
  resolution_id: string;
  company_id: string;
  meeting_id?: string;
  resolution_type: 'Ordinary Resolution' | 'Special Resolution' | 'Board Resolution';
  date: string;
  subject: string;
  details: string;
  voting_result: string;
  authority_granted_to?: string;
  document_id: string;
  verification_status: TrustStatus;
}

export interface CommercialContract {
  contract_id: string;
  company_id: string;
  title: string;
  counterparty: string;
  contract_type: 'Loan Agreement' | 'Master Services Agreement' | 'Lease Agreement' | 'Share Purchase Agreement' | 'Supply Agreement';
  execution_date: string;
  effective_date: string;
  expiry_date: string;
  value: number;
  signatory_name: string;
  signatory_authority_verified: boolean;
  obligations: { description: string; due_date: string; status: string }[];
  notice_period_days: number;
  dispute_status: 'None' | 'Notice Issued' | 'Active Dispute';
  verification_status: TrustStatus;
}

export interface LegalProceeding {
  proceeding_id: string;
  company_id: string;
  forum: 'NCLT Delhi Bench' | 'NCLAT' | 'High Court of Delhi' | 'District Commercial Court' | 'ROC Delhi';
  case_number: string;
  matter_title: string;
  opposing_party: string;
  filing_date: string;
  stage: 'Notice' | 'Pleadings' | 'Evidence' | 'Arguments' | 'Interim Order' | 'Final Order' | 'Appeal';
  claims: string[];
  defence: string[];
  amount_in_dispute: number;
  corporate_impact: string;
  status: 'Pending' | 'Stayed' | 'Disposed' | 'Appealed';
  verification_status: TrustStatus;
}

export interface VerificationItem {
  id: string;
  company_id: string;
  category: 'PENDING_ENTITIES' | 'PENDING_EVENTS' | 'DATE_CONFLICTS' | 'MISSING_EVIDENCE' | 'AUTHORITY_MISMATCH';
  title: string;
  ai_finding: string;
  source_doc_title: string;
  source_doc_page: number;
  evidence_text: string;
  suggested_interpretation: string;
  confidence: number;
  conflicting_record?: string;
  status: 'NEEDS_REVIEW' | 'VERIFIED' | 'REJECTED' | 'DISPUTED' | 'UNKNOWN';
}

export interface AuditLogEntry {
  audit_id: string;
  timestamp: string;
  user_name: string;
  user_role: string;
  action: string;
  object_type: string;
  object_id: string;
  old_value?: string;
  new_value: string;
  reason?: string;
  source_ref?: string;
}

export interface ReconstructedState {
  as_of_date: string;
  company: {
    legal_name: string;
    cin: string;
    status: string;
    registered_office: string;
    capital: number;
  };
  directors: { name: string; role: string; appointment_date: string; status: string; evidence: string }[];
  shareholders: { name: string; shares: number; percentage: number; acquisition_date: string }[];
  charges: { charge_id: string; holder: string; amount: number; created_date: string; status: string }[];
  active_proceedings: { case_number: string; forum: string; issue: string; impact: string }[];
  open_compliance: { title: string; due_date: string; status: string }[];
  effective_events: CorporateEvent[];
}
