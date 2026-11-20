import React, { useState } from 'react';
import { Company, Person, Role } from '../types';
import { 
  Landmark, 
  Users, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Vote, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface GovernanceViewProps {
  company: Company;
  people: Person[];
  roles: Role[];
}

export const GovernanceView: React.FC<GovernanceViewProps> = ({
  company,
  people,
  roles
}) => {
  const [activeTab, setActiveTab] = useState<'BOARD' | 'MEETINGS' | 'RESOLUTIONS' | 'CONFLICTS'>('BOARD');

  const boardMeetings = [
    {
      id: 'bm_01',
      title: '1st Meeting of Board of Directors',
      date: '2024-01-20',
      notice_date: '2024-01-13',
      attendees: ['Rahul Sharma', 'Priya Mehta'],
      quorum: true,
      resolutions: ['First Board Meeting Formalities', 'Opening of HDFC Bank Account', 'Adoption of Common Seal'],
      status: 'VERIFIED'
    },
    {
      id: 'bm_02',
      title: 'Meeting for Appointment of Additional Director',
      date: '2024-03-12',
      notice_date: '2024-03-05',
      attendees: ['Rahul Sharma', 'Priya Mehta'],
      quorum: true,
      resolutions: ['Appointment of Anita Mehta under Section 161(1)', 'Filing of DIR-12'],
      status: 'VERIFIED'
    },
    {
      id: 'bm_03',
      title: 'Meeting for Rights Issue of Shares',
      date: '2024-06-20',
      notice_date: '2024-06-12',
      attendees: ['Rahul Sharma', 'Priya Mehta', 'Anita Mehta'],
      quorum: true,
      resolutions: ['Allotment of 1,50,000 Equity Shares at Par', 'Approval of Form PAS-3'],
      status: 'VERIFIED'
    },
    {
      id: 'bm_04',
      title: 'Meeting for Approval of ₹5 Cr Bank Facility',
      date: '2025-08-04',
      notice_date: '2025-07-28',
      attendees: ['Rahul Sharma', 'Anita Mehta', 'Vikram Singh'],
      quorum: true,
      resolutions: ['Borrowing under Section 179(3)(d)', 'Delegation of Authority to MD', 'Filing MGT-14'],
      status: 'VERIFIED'
    }
  ];

  const conflictsList = [
    {
      id: 'conf_01',
      person_name: 'Rahul Sharma',
      relation: 'Promoter & Managing Director',
      transaction: 'Sublease of Technology Lab to Sharma Software Tech Private Limited',
      interest: 'Common Director and 45% shareholder in counterparty entity',
      disclosure_date: '2024-04-15',
      approval_status: 'Disclosed in MBP-1; Board approved with Rahul Sharma abstaining from voting',
      risk: 'LOW (Section 184 compliant)',
      status: 'RESOLVED'
    },
    {
      id: 'conf_02',
      person_name: 'Priya Mehta',
      relation: 'Former Director & 15% Shareholder',
      transaction: 'Share Transfer to Sunil Kapoor (₹62.5 Lakhs)',
      interest: 'Personal liquidity transaction executed while holding board seat',
      disclosure_date: '2024-09-15',
      approval_status: 'Board approved transfer; subsequent petition filed before NCLT alleging oppression',
      risk: 'CRITICAL (Subject of active litigation)',
      status: 'DISPUTED'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Corporate Governance & Board Intelligence Engine
            </h1>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
              Stage 27 Decision & Accountability
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Reconstruct who constituted the board, what meetings occurred, how resolutions were voted, and whether statutory director duties and conflict disclosures were observed.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('BOARD')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'BOARD' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Board Composition & History
        </button>
        <button
          onClick={() => setActiveTab('MEETINGS')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'MEETINGS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Corporate Meetings ({boardMeetings.length})
        </button>
        <button
          onClick={() => setActiveTab('CONFLICTS')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'CONFLICTS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Conflicts & Related-Party (MBP-1)
        </button>
      </div>

      {/* TAB 1: Board Composition */}
      {activeTab === 'BOARD' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Rahul Sharma</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Active</span>
            </div>
            <div className="text-[11px] text-slate-300">Managing Director & CEO</div>
            <div className="space-y-1 text-[10px] text-slate-400 font-mono">
              <div>DIN: 08942115</div>
              <div>Tenure: 10 Jan 2024 → Present</div>
              <div>Authority: Executive & Borrowing</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Anita Mehta</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Active</span>
            </div>
            <div className="text-[11px] text-slate-300">Additional Director (Operations)</div>
            <div className="space-y-1 text-[10px] text-slate-400 font-mono">
              <div>DIN: 09124482</div>
              <div>Tenure: 12 Mar 2024 → Present</div>
              <div>Authority: Operational Agreements</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Vikram Singh</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Active</span>
            </div>
            <div className="text-[11px] text-slate-300">Independent Director</div>
            <div className="space-y-1 text-[10px] text-slate-400 font-mono">
              <div>DIN: 06541299</div>
              <div>Tenure: 18 Feb 2025 → Present</div>
              <div>Authority: Audit & Governance Oversight</div>
            </div>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-rose-950/10 p-4 space-y-3 md:col-span-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-200">Priya Mehta (Cessation on Record)</span>
              <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">Conflicted Date</span>
            </div>
            <div className="text-[11px] text-slate-300">First Director (10 Jan 2024 → 10/15 Jan 2025)</div>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              Resignation letter dated 10 Jan 2025 conflicts with Form DIR-11 filed with ROC citing 15 Jan 2025. This cessation is subject to inquiry under ROC Notice ROC/DEL/Sec206/2025/882 and challenged in NCLT Petition CP 142/ND/2026.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Corporate Meetings */}
      {activeTab === 'MEETINGS' && (
        <div className="space-y-3">
          {boardMeetings.map(bm => (
            <div key={bm.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sky-400 font-bold">{bm.date}</span>
                  <h3 className="font-bold text-white">{bm.title}</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {bm.status}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 flex items-center gap-4">
                <span>Notice Sent: <strong className="text-slate-200 font-mono">{bm.notice_date}</strong> (7 Days clear)</span>
                <span>•</span>
                <span>Quorum: <strong className="text-emerald-400">Satisfied (2/3 Present)</strong></span>
              </div>
              <div className="pt-2 border-t border-slate-800/60">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Resolutions Adopted:</div>
                <ul className="list-disc pl-4 text-xs text-slate-200 mt-1 space-y-0.5">
                  {bm.resolutions.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Conflicts & Related Parties */}
      {activeTab === 'CONFLICTS' && (
        <div className="space-y-3">
          {conflictsList.map(cf => (
            <div key={cf.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{cf.person_name}</span>
                  <span className="text-slate-400 text-[10px]">({cf.relation})</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  cf.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {cf.status}
                </span>
              </div>
              <div className="font-medium text-slate-200">Transaction: {cf.transaction}</div>
              <p className="text-[11px] text-slate-400">Nature of Interest: {cf.interest}</p>
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Disclosed: {cf.disclosure_date}</span>
                <span className="text-amber-400 font-bold">{cf.risk}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
