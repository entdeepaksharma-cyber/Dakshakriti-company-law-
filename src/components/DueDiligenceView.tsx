import React, { useState } from 'react';
import { Company, DueDiligenceMatter, RedFlag, CorporateEvent, Document, CommercialContract } from '../types';
import { 
  AlertOctagon, 
  ShieldAlert, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

interface DueDiligenceViewProps {
  company: Company;
  matters: DueDiligenceMatter[];
  redFlags: RedFlag[];
  contracts: CommercialContract[];
  events: CorporateEvent[];
  onGenerateReport: (type: 'DUE_DILIGENCE') => void;
  onNavigateToDocument: (docId: string) => void;
}

export const DueDiligenceView: React.FC<DueDiligenceViewProps> = ({
  company,
  matters,
  redFlags,
  contracts,
  events,
  onGenerateReport,
  onNavigateToDocument
}) => {
  const [selectedMatter] = useState<DueDiligenceMatter>(matters[0]);
  const [activeTab, setActiveTab] = useState<'RED_FLAGS' | 'CHECKLIST' | 'TRANSACTION_QUESTIONS'>('RED_FLAGS');

  const criticalCount = redFlags.filter(r => r.severity === 'CRITICAL').length;
  const highCount = redFlags.filter(r => r.severity === 'HIGH').length;
  const mediumCount = redFlags.filter(r => r.severity === 'MEDIUM').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-rose-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Due Diligence & Transaction Intelligence Engine
            </h1>
            <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-xs font-semibold text-rose-300">
              Stage 26 M&A / Transaction Readiness
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            "What exactly am I buying, investing in, lending to, or contracting with—and what evidence supports that conclusion?"
          </p>
        </div>

        <button
          onClick={() => onGenerateReport('DUE_DILIGENCE')}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition shrink-0"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Generate Due Diligence Report</span>
        </button>
      </div>

      {/* Transaction Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="rounded bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-400">
            ACTIVE TRANSACTION MATTER
          </span>
          <h2 className="text-lg font-bold text-white mt-1">{selectedMatter.title}</h2>
          <div className="text-xs text-slate-400 font-mono mt-0.5">
            Type: {selectedMatter.transaction_type} • Target Closing: {selectedMatter.target_closing_date}
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Transaction Readiness</div>
            <div className="text-2xl font-black font-mono text-amber-400">{selectedMatter.readiness_score}%</div>
            <div className="text-[10px] text-amber-300/80">{selectedMatter.status}</div>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-slate-800 border-t-amber-400 flex items-center justify-center font-bold text-xs text-amber-400">
            {selectedMatter.readiness_score}
          </div>
        </div>
      </div>

      {/* Red Flags Summary Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Critical Red Flags</div>
          <div className="mt-1 text-2xl font-bold text-rose-400">{criticalCount}</div>
          <div className="text-[10px] text-slate-400 font-mono">Deal-Blocking Injunction</div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">High Red Flags</div>
          <div className="mt-1 text-2xl font-bold text-amber-400">{highCount}</div>
          <div className="text-[10px] text-slate-400 font-mono">Requires CP / Indemnity</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Medium Red Flags</div>
          <div className="mt-1 text-2xl font-bold text-slate-300">{mediumCount}</div>
          <div className="text-[10px] text-slate-400 font-mono">Post-Closing Covenants</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Evidence Gaps</div>
          <div className="mt-1 text-2xl font-bold text-sky-400">{selectedMatter.evidence_gaps}</div>
          <div className="text-[10px] text-slate-400 font-mono">Pending Documents</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('RED_FLAGS')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'RED_FLAGS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Red Flag Catalog ({redFlags.length})
        </button>
        <button
          onClick={() => setActiveTab('CHECKLIST')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'CHECKLIST' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Conditions Precedent (CPs)
        </button>
        <button
          onClick={() => setActiveTab('TRANSACTION_QUESTIONS')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'TRANSACTION_QUESTIONS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Key Diligence Inquiries
        </button>
      </div>

      {/* Tab 1: Red Flag Catalog */}
      {activeTab === 'RED_FLAGS' && (
        <div className="space-y-3">
          {redFlags.map(rf => (
            <div 
              key={rf.flag_id}
              className={`rounded-xl border p-4.5 transition ${
                rf.severity === 'CRITICAL' ? 'border-rose-500/40 bg-rose-950/20' :
                rf.severity === 'HIGH' ? 'border-amber-500/30 bg-amber-950/15' :
                'border-slate-800 bg-slate-900/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    rf.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    rf.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {rf.severity}
                  </span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-300">
                    {rf.category}
                  </span>
                  <h3 className="text-xs font-bold text-white">{rf.title}</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Status: {rf.status}</span>
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">{rf.description}</p>
              {rf.related_document_id && (
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex justify-end">
                  <button
                    onClick={() => onNavigateToDocument(rf.related_document_id!)}
                    className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Inspect Supporting Record</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Conditions Precedent (CPs) */}
      {activeTab === 'CHECKLIST' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Recommended Contractual Conditions Precedent (CPs)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Derived automatically from flagged risks, missing documents, and judicial injunctions.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4 space-y-1.5">
              <div className="flex items-center justify-between text-rose-400 font-bold">
                <span>CP 1: Tribunal Leave & Modification of Status Quo</span>
                <span className="text-[10px] font-mono uppercase bg-rose-500/10 px-2 py-0.5 rounded">Mandatory</span>
              </div>
              <p className="text-slate-300">
                The target company and promoters shall file an appropriate application before NCLT Delhi Bench in CP 142/ND/2026 seeking explicit leave or clarification to permit proposed investor allotment without violating the status quo injunction.
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4 space-y-1.5">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span>CP 2: ROC Section 206 Inquiry Closure & Stamp Duty Reconciliation</span>
                <span className="text-[10px] font-mono uppercase bg-amber-500/10 px-2 py-0.5 rounded">Mandatory</span>
              </div>
              <p className="text-slate-300">
                The Company Secretary shall provide proof of written explanation filed with ROC Delhi responding to Notice ROC/DEL/Sec206/2025/882 together with certified treasury stamp duty franking certificates for all historical share transfers.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5">
              <div className="flex items-center justify-between text-slate-200 font-bold">
                <span>CP 3: Board Ratification of Former Director Resignation</span>
                <span className="text-[10px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded">Formal</span>
              </div>
              <p className="text-slate-300">
                Passing of a clarifying board resolution resolving the ambiguity between 10 Jan 2025 and 15 Jan 2025 cessation dates for Priya Mehta.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Key Diligence Inquiries */}
      {activeTab === 'TRANSACTION_QUESTIONS' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Automated Due Diligence Checklist Findings
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-dimensional analysis across corporate memory, authority, and encumbrances.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
              <div className="font-bold text-white">1. Are there existing bank charges on company assets?</div>
              <div className="text-slate-300">
                YES. Charge ID 100882194 registered in favour of HDFC Bank Limited for ₹5 Crore covering all present and future plant & machinery, equipment and receivables.
              </div>
              <div className="text-[10px] text-sky-400 font-mono">Proof: Certificate of Registration CHG-2 dated 24 Aug 2025.</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
              <div className="font-bold text-white">2. Is there pending litigation affecting equity or control?</div>
              <div className="text-slate-300">
                YES. CP No. 142/ND/2026 pending before NCLT Delhi Bench filed by 15% shareholder Priya Mehta alleging oppression and challenging dilution.
              </div>
              <div className="text-[10px] text-rose-400 font-mono">Proof: Interim Order dated 20 Feb 2026 directing status quo.</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
              <div className="font-bold text-white">3. Did the Managing Director have authority to bind the company?</div>
              <div className="text-slate-300">
                YES. Authorized up to ₹1 Crore for general contracts under Article 42, and specifically authorized up to ₹5 Crore for borrowing under Special Board Resolution dated 04 Aug 2025.
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">Proof: MGT-14 filing SRN F88102911.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
