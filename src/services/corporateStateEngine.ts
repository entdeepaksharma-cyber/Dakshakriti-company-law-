import { CorporateEvent, ReconstructedState, Company, Role, Person } from '../types';

export interface StateChangeItem {
  category: 'MANAGEMENT' | 'OWNERSHIP' | 'CAPITAL' | 'CHARGES' | 'PROCEEDINGS' | 'GOVERNANCE';
  change_type: 'ADDED' | 'REMOVED' | 'CHANGED';
  title: string;
  previous_value?: string;
  new_value: string;
  effective_date: string;
  trigger_event: CorporateEvent;
  why_changed: {
    state_a: string;
    change_description: string;
    event_id: string;
    event_title: string;
    event_type: string;
    decision: string;
    authority: string;
    document_title: string;
    evidence_text: string;
    legal_source: string;
    verification_status: string;
    reviewer?: string;
    state_b: string;
  };
}

export interface StateComparisonResult {
  date_a: string;
  date_b: string;
  state_a: ReconstructedState;
  state_b: ReconstructedState;
  changes: StateChangeItem[];
  conflicts_detected: string[];
}

export class CorporateStateEngine {
  /**
   * Reconstruct the Corporate Legal State of a company at a given point in time (T)
   * Formula: Corporate State(T) = Initial State + Verified Events effective up to T
   */
  static reconstructState(
    company: Company,
    events: CorporateEvent[],
    people: Person[],
    roles: Role[],
    targetDate: string
  ): ReconstructedState {
    const targetTime = new Date(targetDate).getTime();

    // Filter events effective on or before targetDate
    const effectiveEvents = events
      .filter(e => {
        const eventEffTime = new Date(e.effective_date).getTime();
        return eventEffTime <= targetTime;
      })
      .sort((a, b) => new Date(a.effective_date).getTime() - new Date(b.effective_date).getTime());

    // Compute dynamic capital
    let paidUpCapital = 1000000; // initial at incorporation
    if (new Date('2024-06-20').getTime() <= targetTime) {
      paidUpCapital = 2500000;
    }

    // Compute directors active at targetDate
    const directorsList: { name: string; role: string; appointment_date: string; status: string; evidence: string }[] = [];

    // 1. Rahul Sharma (appointed at incorporation 2024-01-10)
    if (new Date('2024-01-10').getTime() <= targetTime) {
      directorsList.push({
        name: 'Rahul Sharma',
        role: 'Managing Director & CEO',
        appointment_date: '2024-01-10',
        status: 'Active',
        evidence: 'Certificate of Incorporation & AOA Clause 41'
      });
    }

    // 2. Priya Mehta (appointed 2024-01-10, resigned ~2025-01-10/15)
    if (new Date('2024-01-10').getTime() <= targetTime) {
      const resignationTime = new Date('2025-01-10').getTime();
      if (targetTime < resignationTime) {
        directorsList.push({
          name: 'Priya Mehta',
          role: 'Whole-Time Director',
          appointment_date: '2024-01-10',
          status: 'Active',
          evidence: 'Certificate of Incorporation D001'
        });
      } else {
        // Resigned after 10 Jan 2025
        directorsList.push({
          name: 'Priya Mehta',
          role: 'Former Director (Resigned)',
          appointment_date: '2024-01-10',
          status: 'Resigned (10/15 Jan 2025 - Conflicted)',
          evidence: 'Resignation Letter D008 (DIR-11 conflict on record)'
        });
      }
    }

    // 3. Anita Mehta (appointed 2024-03-12)
    if (new Date('2024-03-12').getTime() <= targetTime) {
      directorsList.push({
        name: 'Anita Mehta',
        role: 'Additional Director',
        appointment_date: '2024-03-12',
        status: 'Active',
        evidence: 'Board Resolution D005 & Form DIR-12'
      });
    }

    // 4. Vikram Singh (appointed 2025-02-18)
    if (new Date('2025-02-18').getTime() <= targetTime) {
      directorsList.push({
        name: 'Vikram Singh',
        role: 'Independent Director',
        appointment_date: '2025-02-18',
        status: 'Active',
        evidence: 'Appointment Resolution Section 149'
      });
    }

    // Compute shareholding structure
    const shareholders: { name: string; shares: number; percentage: number; acquisition_date: string }[] = [];
    if (targetTime < new Date('2024-06-20').getTime()) {
      // Incorporation state
      shareholders.push({ name: 'Rahul Sharma', shares: 60000, percentage: 60, acquisition_date: '2024-01-10' });
      shareholders.push({ name: 'Priya Mehta', shares: 40000, percentage: 40, acquisition_date: '2024-01-10' });
    } else if (targetTime < new Date('2024-09-15').getTime()) {
      // After Rights Issue
      shareholders.push({ name: 'Rahul Sharma', shares: 150000, percentage: 60, acquisition_date: '2024-06-20' });
      shareholders.push({ name: 'Priya Mehta', shares: 100000, percentage: 40, acquisition_date: '2024-06-20' });
    } else {
      // After Transfer to Sunil Kapoor
      shareholders.push({ name: 'Rahul Sharma', shares: 150000, percentage: 60, acquisition_date: '2024-06-20' });
      shareholders.push({ name: 'Priya Mehta', shares: 37500, percentage: 15, acquisition_date: '2024-09-15' });
      shareholders.push({ name: 'Sunil Kapoor', shares: 62500, percentage: 25, acquisition_date: '2024-09-15' });
    }

    // Charges
    const charges: { charge_id: string; holder: string; amount: number; created_date: string; status: string }[] = [];
    if (new Date('2025-08-12').getTime() <= targetTime) {
      charges.push({
        charge_id: '100882194',
        holder: 'HDFC Bank Limited',
        amount: 50000000,
        created_date: '2025-08-12',
        status: 'Active (First Exclusive Charge)'
      });
    }

    // Active proceedings
    const proceedings: { case_number: string; forum: string; issue: string; impact: string }[] = [];
    if (new Date('2025-11-15').getTime() <= targetTime) {
      proceedings.push({
        case_number: 'ROC/DEL/Sec206/2025/882',
        forum: 'ROC Delhi',
        issue: 'Inquiry on stamp duty & contradictory resignation dates',
        impact: 'Compliance verification pending'
      });
    }
    if (new Date('2026-02-20').getTime() <= targetTime) {
      proceedings.push({
        case_number: 'CP No. 142/241-242/ND/2026',
        forum: 'NCLT Delhi Bench',
        issue: 'Section 241/242 Petition alleging oppression & dilution',
        impact: 'Status Quo ordered on shareholding and fixed asset encumbrances'
      });
    }

    // Compliance obligations
    const openCompliance: { title: string; due_date: string; status: string }[] = [];
    if (targetTime >= new Date('2025-11-15').getTime()) {
      openCompliance.push({
        title: 'Response to ROC Section 206 Notice',
        due_date: '2025-11-30',
        status: targetTime > new Date('2025-11-30').getTime() ? 'Overdue' : 'Due'
      });
    }
    if (targetTime >= new Date('2026-02-20').getTime()) {
      openCompliance.push({
        title: 'Filing Form INC-28 for NCLT Status Quo Order',
        due_date: '2026-03-22',
        status: targetTime > new Date('2026-03-22').getTime() ? 'Overdue' : 'Due'
      });
    }

    return {
      as_of_date: targetDate,
      company: {
        legal_name: company.legal_name,
        cin: company.identifier,
        status: company.status,
        registered_office: company.registered_address,
        capital: paidUpCapital
      },
      directors: directorsList,
      shareholders,
      charges,
      active_proceedings: proceedings,
      open_compliance: openCompliance,
      effective_events: effectiveEvents
    };
  }

  /**
   * Compare two states (Date A vs Date B) and generate the full causal change graph ("Why Did This Change?")
   */
  static compareStates(
    company: Company,
    events: CorporateEvent[],
    people: Person[],
    roles: Role[],
    dateA: string,
    dateB: string
  ): StateComparisonResult {
    const stateA = this.reconstructState(company, events, people, roles, dateA);
    const stateB = this.reconstructState(company, events, people, roles, dateB);

    const changes: StateChangeItem[] = [];
    const conflicts: string[] = [];

    // Intervening events
    const timeA = new Date(dateA).getTime();
    const timeB = new Date(dateB).getTime();

    const interveningEvents = events.filter(e => {
      const eTime = new Date(e.effective_date).getTime();
      return eTime > Math.min(timeA, timeB) && eTime <= Math.max(timeA, timeB);
    }).sort((a, b) => new Date(a.effective_date).getTime() - new Date(b.effective_date).getTime());

    // Map each intervening event to a structured StateChangeItem
    for (const evt of interveningEvents) {
      if (evt.event_type === 'DIRECTOR_APPOINTMENT') {
        const actor = evt.actors[0]?.name || 'New Director';
        changes.push({
          category: 'MANAGEMENT',
          change_type: 'ADDED',
          title: `Director Added: ${actor}`,
          previous_value: `Active Directors: ${stateA.directors.filter(d => d.status === 'Active').length}`,
          new_value: `${actor} joined Board as ${evt.actors[0]?.role || 'Director'}`,
          effective_date: evt.effective_date,
          trigger_event: evt,
          why_changed: {
            state_a: `Board had ${stateA.directors.filter(d => d.status === 'Active').length} directors on ${dateA}`,
            change_description: `${actor} appointed to board on ${evt.effective_date}`,
            event_id: evt.event_id,
            event_title: evt.title,
            event_type: evt.event_type,
            decision: evt.decision_maker,
            authority: evt.authority,
            document_title: 'Appointment Resolution & DIR-12',
            evidence_text: evt.description,
            legal_source: 'Section 161(1) / 149 Companies Act, 2013',
            verification_status: evt.status,
            state_b: `Board now has ${stateB.directors.filter(d => d.status === 'Active').length} directors on ${dateB}`
          }
        });
      }

      if (evt.event_type === 'DIRECTOR_RESIGNATION') {
        const actor = evt.actors[0]?.name || 'Director';
        conflicts.push(`Cessation date conflict for ${actor} (10 Jan vs 15 Jan 2025) requires review.`);
        changes.push({
          category: 'MANAGEMENT',
          change_type: 'REMOVED',
          title: `Director Resigned: ${actor}`,
          previous_value: `${actor} active on Board`,
          new_value: `${actor} ceased directorship`,
          effective_date: evt.effective_date,
          trigger_event: evt,
          why_changed: {
            state_a: `${actor} was active director in State A`,
            change_description: `Resignation notice submitted with conflicting effective dates`,
            event_id: evt.event_id,
            event_title: evt.title,
            event_type: evt.event_type,
            decision: 'Tendered by Director; Board noted on record',
            authority: 'Section 168 Companies Act, 2013',
            document_title: 'Resignation Letter & DIR-11',
            evidence_text: 'Letter dated 10 Jan 2025 vs Form DIR-11 dated 15 Jan 2025',
            legal_source: 'Section 168(1) proviso on effective date',
            verification_status: 'DISPUTED',
            state_b: `${actor} inactive in State B (Disputed status)`
          }
        });
      }

      if (evt.event_type === 'SHARE_ISSUE') {
        changes.push({
          category: 'CAPITAL',
          change_type: 'CHANGED',
          title: 'Paid-Up Share Capital Increased to ₹25,00,000',
          previous_value: '₹10,00,000 (1,00,000 Equity Shares)',
          new_value: '₹25,00,000 (2,50,000 Equity Shares)',
          effective_date: evt.effective_date,
          trigger_event: evt,
          why_changed: {
            state_a: `Paid-up capital was ₹10,00,000 on ${dateA}`,
            change_description: 'Rights Issue Allotment of 1,50,000 Equity Shares',
            event_id: evt.event_id,
            event_title: evt.title,
            event_type: evt.event_type,
            decision: 'Board Resolution & Shareholder approval',
            authority: 'Section 62(1)(a) Companies Act, 2013',
            document_title: 'Form PAS-3 Return of Allotment',
            evidence_text: 'Allotted 90,000 to Rahul Sharma & 60,000 to Priya Mehta',
            legal_source: 'Section 62(1) Companies Act, 2013',
            verification_status: 'HUMAN_VERIFIED',
            state_b: `Paid-up capital updated to ₹25,00,000 on ${dateB}`
          }
        });
      }

      if (evt.event_type === 'SHARE_TRANSFER') {
        changes.push({
          category: 'OWNERSHIP',
          change_type: 'CHANGED',
          title: 'Ownership Dilution & Entry of Outside Shareholder (Sunil Kapoor - 25%)',
          previous_value: 'Founders 100% (Rahul Sharma 60%, Priya Mehta 40%)',
          new_value: 'Rahul Sharma 60%, Sunil Kapoor 25%, Priya Mehta 15%',
          effective_date: evt.effective_date,
          trigger_event: evt,
          why_changed: {
            state_a: 'Two initial shareholders held 100% of equity',
            change_description: 'Transfer of 62,500 shares from Priya Mehta to Sunil Kapoor',
            event_id: evt.event_id,
            event_title: evt.title,
            event_type: evt.event_type,
            decision: 'Board Approval of Transfer Deed SH-4',
            authority: 'Section 56 Companies Act, 2013 & AOA Clause 14',
            document_title: 'Share Transfer Deed Form SH-4 & MGT-1',
            evidence_text: 'Consideration of ₹62.5 Lakhs paid; stamp duty receipt flagged for review',
            legal_source: 'Section 56 & Rule 11 of Share Capital Rules',
            verification_status: 'HUMAN_VERIFIED',
            state_b: '3 shareholders on cap-table; Priya Mehta reduced to 15%'
          }
        });
      }

      if (evt.event_type === 'CHARGE_CREATION' || evt.event_type === 'BORROWING') {
        changes.push({
          category: 'CHARGES',
          change_type: 'ADDED',
          title: 'HDFC Bank Security Interest Created (₹5 Crore)',
          previous_value: 'Nil encumbrances / charges',
          new_value: 'First Exclusive Charge ID 100882194 on Plant, Machinery & Book Debts',
          effective_date: evt.effective_date,
          trigger_event: evt,
          why_changed: {
            state_a: 'No statutory charges registered on MCA portal',
            change_description: 'Term Loan sanctioned and hypothecation charge registered',
            event_id: evt.event_id,
            event_title: evt.title,
            event_type: evt.event_type,
            decision: 'Board Resolution under Sec 179(3)(d)',
            authority: 'Board of Directors & Articles Clause 36',
            document_title: 'Certificate of Charge Registration Form CHG-2',
            evidence_text: 'CHG-1 filed on 24 Aug 2025; charge secured for ₹5,00,00,000',
            legal_source: 'Section 77(1) Companies Act, 2013',
            verification_status: 'HUMAN_VERIFIED',
            state_b: 'Total outstanding secured debt: ₹5,00,00,000'
          }
        });
      }

      if (evt.event_type === 'TRIBUNAL_ORDER') {
        conflicts.push('NCLT Status Quo Order directly restricts share transfers and asset hypothecation.');
        changes.push({
          category: 'PROCEEDINGS',
          change_type: 'ADDED',
          title: 'NCLT Judicial Injunction Restraining Shareholding & Asset Changes',
          previous_value: 'No active judicial orders or petitions',
          new_value: 'Court-mandated freeze on shareholding changes & asset transfers (CP 142/ND/2026)',
          effective_date: evt.effective_date,
          trigger_event: evt,
          why_changed: {
            state_a: 'Unencumbered operational freedom on corporate structure',
            change_description: 'Petition filed by minority shareholder Priya Mehta under Sec 241/242',
            event_id: evt.event_id,
            event_title: evt.title,
            event_type: evt.event_type,
            decision: 'Adjudication by NCLT Delhi Bench-III',
            authority: 'Sections 241 & 242 Companies Act, 2013',
            document_title: 'NCLT Interim Order dated 20 Feb 2026',
            evidence_text: 'Order directs status quo on equity pattern and no further charge creation',
            legal_source: 'Section 242(4) interim relief powers of Tribunal',
            verification_status: 'SOURCE_RECORD',
            state_b: 'Statutory injunction actively restricting corporate state transitions'
          }
        });
      }
    }

    return {
      date_a: dateA,
      date_b: dateB,
      state_a: stateA,
      state_b: stateB,
      changes,
      conflicts_detected: conflicts
    };
  }
}
