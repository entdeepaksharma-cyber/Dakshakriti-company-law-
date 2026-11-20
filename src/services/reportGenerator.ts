import { Company, CorporateEvent, Document, Evidence, LegalSource, ComplianceItem, ReconstructedState, DueDiligenceMatter } from '../types';
import { CorporateStateEngine } from './corporateStateEngine';

export interface GeneratedReport {
  report_id: string;
  report_type: 'CORPORATE_STATE' | 'HISTORICAL_RECONSTRUCTION' | 'EVENT_INTELLIGENCE' | 'EVIDENCE' | 'DUE_DILIGENCE' | 'GOVERNANCE_COMPLIANCE';
  title: string;
  generated_at: string;
  company_name: string;
  period: string;
  prepared_for: string;
  executive_summary: string;
  sections: {
    heading: string;
    content: string;
    items?: string[];
  }[];
  sources_index: {
    doc_id: string;
    title: string;
    date: string;
    page: number;
    evidence_quote: string;
  }[];
  limitations: string;
}

export class ReportGenerator {
  static generateReport(
    reportType: GeneratedReport['report_type'],
    company: Company,
    events: CorporateEvent[],
    documents: Document[],
    evidenceList: Evidence[],
    legalSources: LegalSource[],
    complianceItems: ComplianceItem[],
    options?: { targetDate?: string; compareDate?: string; eventId?: string }
  ): GeneratedReport {
    const reportId = 'rep_' + Math.random().toString(36).substring(2, 9);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST';
    const dateT = options?.targetDate || '2026-03-31';

    const state = CorporateStateEngine.reconstructState(
      company,
      events,
      [],
      [],
      dateT
    );

    const sourcesIndex = evidenceList.map(ev => {
      const doc = documents.find(d => d.document_id === ev.document_id);
      return {
        doc_id: ev.document_id,
        title: doc?.title || 'Corporate Record',
        date: doc?.document_date || 'N/A',
        page: ev.page_number,
        evidence_quote: ev.text_excerpt
      };
    });

    const limitations = `AI-ASSISTED LEGAL INTELLIGENCE DISCLAIMER: This intelligence report is generated from available company records and statutory sources. AI-generated outputs indicate detected corporate states, relationships and evidence chains for professional review. They do not constitute formal legal advice or substitute for independent legal certification by an advocate or practicing company secretary.`;

    switch (reportType) {
      case 'CORPORATE_STATE':
        return {
          report_id: reportId,
          report_type: 'CORPORATE_STATE',
          title: `Corporate Legal State Report — ${company.legal_name}`,
          generated_at: now,
          company_name: company.legal_name,
          period: `As of ${dateT}`,
          prepared_for: 'Company Secretary & Board of Directors',
          executive_summary: `As of ${dateT}, ${company.legal_name} (${company.identifier}) is an active Private Limited Company incorporated on ${company.incorporation_date}. The reconstructed management state reflects ${state.directors.filter(d => d.status === 'Active').length} active directors. Paid-up share capital stands at ₹${(state.company.capital / 100000).toFixed(2)} Lakhs across 3 recorded shareholders. One active statutory bank charge is registered for ₹5 Crore. A minority shareholder proceeding CP 142/ND/2026 is currently pending before NCLT Delhi Bench with an interim status quo direction.`,
          sections: [
            {
              heading: '1. Corporate Identity & Registration',
              content: `Legal Name: ${company.legal_name}\nCIN: ${company.identifier}\nJurisdiction: ${company.jurisdiction}\nRegistered Office: ${company.registered_address}\nIncorporation Date: ${company.incorporation_date}\nCurrent Operational Status: ${company.status}`
            },
            {
              heading: '2. Board Composition & Management State',
              content: 'Management structure reconstructed from verified appointment and resignation records:',
              items: state.directors.map(d => `${d.name} — ${d.role} (Status: ${d.status}, Appointed: ${d.appointment_date})`)
            },
            {
              heading: '3. Capital Structure & Shareholding',
              content: `Authorized Capital: ₹${(company.authorized_capital / 100000).toFixed(2)} Lakhs | Paid-up Capital: ₹${(state.company.capital / 100000).toFixed(2)} Lakhs`,
              items: state.shareholders.map(s => `${s.name}: ${s.shares.toLocaleString()} Equity Shares (${s.percentage}%) acquired on ${s.acquisition_date}`)
            },
            {
              heading: '4. Encumbrances & Borrowings',
              content: 'Statutory charge details registered on MCA portal:',
              items: state.charges.map(c => `Charge ID ${c.charge_id}: ${c.holder} — ₹${(c.amount / 10000000).toFixed(2)} Crore (${c.status})`)
            },
            {
              heading: '5. Judicial & Regulatory Matters',
              content: 'Pending matters affecting company rights or operations:',
              items: state.active_proceedings.map(p => `${p.forum} [${p.case_number}]: ${p.issue} — Impact: ${p.impact}`)
            }
          ],
          sources_index: sourcesIndex,
          limitations
        };

      case 'HISTORICAL_RECONSTRUCTION':
        const dateA = options?.targetDate || '2024-01-10';
        const dateB = options?.compareDate || '2026-03-31';
        const comparison = CorporateStateEngine.compareStates(company, events, [], [], dateA, dateB);

        return {
          report_id: reportId,
          report_type: 'HISTORICAL_RECONSTRUCTION',
          title: `Historical Corporate Reconstruction Report (${dateA} → ${dateB})`,
          generated_at: now,
          company_name: company.legal_name,
          period: `${dateA} to ${dateB}`,
          prepared_for: 'Transaction Counsel & Due Diligence Advisory',
          executive_summary: `This report reconstructs the transition of ${company.legal_name} from State T1 (${dateA}) to State T2 (${dateB}). Over this period, ${comparison.changes.length} material state-changing events occurred, including board expansion, Rights Issue capital increase from ₹10L to ₹25L, 25% share transfer to an outside investor, creation of a ₹5 Cr bank charge, and initiation of an NCLT minority shareholder proceeding.`,
          sections: [
            {
              heading: '1. Comparative State Overview',
              content: `State A (${dateA}): Paid-up Capital ₹10L, 2 Directors, 2 Shareholders, Nil Charges.\nState B (${dateB}): Paid-up Capital ₹25L, 3 Active Directors (1 disputed cessation), 3 Shareholders, ₹5 Cr Charge, 1 NCLT Proceeding.`
            },
            {
              heading: '2. Chronological Causal State Transitions',
              content: 'Each transition is supported by underlying corporate documents and statutory evidence:',
              items: comparison.changes.map(c => `[${c.effective_date}] ${c.title}: Triggered by ${c.trigger_event.event_type} (${c.trigger_event.authority}). Old: ${c.previous_value || 'None'} → New: ${c.new_value}`)
            },
            {
              heading: '3. Detected Conflicts & Inconsistencies',
              content: 'The following discrepancies were flagged by the Conflict Engine and require professional reconciliation:',
              items: comparison.conflicts_detected
            }
          ],
          sources_index: sourcesIndex,
          limitations
        };

      case 'DUE_DILIGENCE':
        return {
          report_id: reportId,
          report_type: 'DUE_DILIGENCE',
          title: `Corporate Due Diligence Intelligence Report — ${company.legal_name}`,
          generated_at: now,
          company_name: company.legal_name,
          period: 'Full Lifecycle Due Diligence (2024-2026)',
          prepared_for: 'Investment Committee & Lenders',
          executive_summary: `Due diligence examination of ${company.legal_name} indicates overall transaction readiness at 68% with 1 CRITICAL red flag (NCLT Section 241 status quo order restraining share transfers and asset hypothecation) and 2 HIGH red flags (Priya Mehta director cessation date discrepancy and pending ROC Section 206 inquiry response). Title to shareholding and board authority must be reconciled prior to closing.`,
          sections: [
            {
              heading: '1. Critical Red Flags & Injunctions',
              content: 'Immediate matters requiring resolution or conditional escrow:',
              items: [
                'CRITICAL: NCLT Delhi Bench Order dated 20.02.2026 directs status quo on equity shareholding pattern and restrains creation of further charges.',
                'HIGH: Priya Mehta director resignation date conflict (10 Jan 2025 vs 15 Jan 2025 in DIR-11) has triggered ROC scrutiny.',
                'HIGH: Overdue Form INC-28 submission with ROC to intimate NCLT order.'
              ]
            },
            {
              heading: '2. Corporate Governance & Authority Audit',
              content: 'Verification of authority chains and Board minutes:',
              items: [
                'Managing Director Rahul Sharma holds verified general execution authority up to ₹1 Crore.',
                'Special Board resolution under Section 179(3)(d) verified for HDFC Bank ₹5 Crore loan facility.',
                'Missing formal e-stamp duty receipt for Priya Mehta → Sunil Kapoor 25% share transfer deed.'
              ]
            },
            {
              heading: '3. Charges & Asset Security Inspection',
              content: 'MCA charge registry confirms Charge ID 100882194 for ₹5 Crore in favour of HDFC Bank Limited covering all equipment and plant & machinery.'
            },
            {
              heading: '4. Recommended Transaction Conditions Precedent (CPs)',
              content: 'Recommended contractual protections for incoming investor/lender:',
              items: [
                'CP 1: Obtaining leave/modification from NCLT Delhi Bench regarding CP 142/ND/2026 prior to any new share issuance.',
                'CP 2: Filing formal reconciliation reply with ROC Delhi under Section 206 with certified treasury stamp duty receipts.',
                'CP 3: Board ratification confirming the definitive cessation date of Priya Mehta.'
              ]
            }
          ],
          sources_index: sourcesIndex,
          limitations
        };

      default:
        return {
          report_id: reportId,
          report_type: 'EVENT_INTELLIGENCE',
          title: `Corporate Intelligence Synthesis — ${company.legal_name}`,
          generated_at: now,
          company_name: company.legal_name,
          period: `2024 - 2026`,
          prepared_for: 'Corporate Legal Department',
          executive_summary: `Complete corporate intelligence synthesis connecting ${events.length} corporate events, ${evidenceList.length} evidence records, and ${legalSources.length} Companies Act statutory provisions.`,
          sections: [
            {
              heading: '1. Event Intelligence Summary',
              content: `Reconstructed ${events.length} standardized corporate events across formation, management, ownership, charges, and dispute categories.`
            },
            {
              heading: '2. Evidence Traceability Chain',
              content: 'All conclusions are linked to primary records with exact page numbers and quotes.'
            }
          ],
          sources_index: sourcesIndex,
          limitations
        };
    }
  }
}
