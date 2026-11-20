import React, { useState } from 'react';
import { Company, ComplianceItem, LegalSource } from '../types';
import { 
  CheckSquare, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Filter,
  Calendar,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface ComplianceViewProps {
  company: Company;
  items: ComplianceItem[];
  legalSources: LegalSource[];
  onVerifyCompliance: (id: string) => void;
}

export const ComplianceView: React.FC<ComplianceViewProps> = ({
  company,
  items,
  legalSources,
  onVerifyCompliance
}) => {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(items[0]?.compliance_id || null);

  const filteredItems = items.filter(item => {
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    return true;
  });

  const activeItem = items.find(i => i.compliance_id === selectedItemId);
  const activeLegalSource = legalSources.find(l => l.source_id === activeItem?.legal_source_id);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-emerald-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Corporate Compliance & Requirement Engine
            </h1>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
              Stage 25 Event-Driven Compliance
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Compliance is not merely a calendar checklist. It is an evidence-backed legal state triggered by corporate events and statutory thresholds.
          </p>
        </div>
      </div>

      {/* Compliance Overview Summary Matrix (Stage 25.20) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Applicable Requirements</div>
          <div className="mt-1 text-2xl font-bold text-white">84</div>
          <div className="text-[10px] text-slate-400 font-mono">Companies Act 2013</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Verified Evidence</div>
          <div className="mt-1 text-2xl font-bold text-emerald-400">61</div>
          <div className="text-[10px] text-slate-400 font-mono">Filing Challans Checked</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Review Required</div>
          <div className="mt-1 text-2xl font-bold text-amber-400">9</div>
          <div className="text-[10px] text-amber-300/80 font-mono">Pending Human Sign-off</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Missing Evidence</div>
          <div className="mt-1 text-2xl font-bold text-rose-400">7</div>
          <div className="text-[10px] text-rose-300/80 font-mono">Gaps Detected</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Overdue Items</div>
          <div className="mt-1 text-2xl font-bold text-rose-400">3</div>
          <div className="text-[10px] text-rose-300/80 font-mono">Immediate Action</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Disputed Records</div>
          <div className="mt-1 text-2xl font-bold text-purple-400">2</div>
          <div className="text-[10px] text-purple-300/80 font-mono">Contradictory filings</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'VERIFIED', 'REVIEW_REQUIRED', 'MISSING_EVIDENCE', 'OVERDUE', 'DISPUTED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
              statusFilter === st
                ? 'bg-indigo-600 text-white shadow-md'
                : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Main 2-Column Split: Item List & Item Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Left Column: Requirements list (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900 p-3 space-y-2 h-[640px] overflow-y-auto">
          {filteredItems.map(item => {
            const isSelected = item.compliance_id === selectedItemId;
            const isOverdue = item.status === 'OVERDUE';
            const isMissing = item.status === 'MISSING_EVIDENCE';
            const isVerified = item.status === 'VERIFIED';

            return (
              <div
                key={item.compliance_id}
                onClick={() => setSelectedItemId(item.compliance_id)}
                className={`rounded-xl p-3.5 transition cursor-pointer border ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-600/15 shadow-sm'
                    : 'border-slate-800/80 bg-slate-950/60 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-mono text-sky-400 font-bold">Due: {item.due_date}</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    isOverdue ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    isMissing ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    isVerified ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="mt-1.5 text-xs font-bold text-white leading-snug">{item.requirement_title}</h3>
                <div className="mt-1 text-[11px] text-slate-400">
                  Responsible: <strong className="text-slate-300">{item.responsible_actor}</strong> • Form: <strong className="text-slate-300">{item.required_filing}</strong>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Trigger: {item.trigger_type}</span>
                  <span className="text-rose-400 font-bold">Risk: {item.risk_level}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Compliance Evidence & Legal Inspection (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5 h-[640px] overflow-y-auto shadow-2xl">
          {activeItem ? (
            <div className="space-y-5 text-xs">
              <div className="pb-3 border-b border-slate-800 flex items-start justify-between">
                <div>
                  <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-400">
                    COMPLIANCE OBLIGATION DETAIL
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">{activeItem.requirement_title}</h2>
                  <div className="text-xs text-slate-400 font-mono">Due Date: {activeItem.due_date}</div>
                </div>

                <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                  activeItem.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                  activeItem.status === 'OVERDUE' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                  'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  {activeItem.status.replace('_', ' ')}
                </span>
              </div>

              {/* Legal Source */}
              {activeLegalSource && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Governing Legal Provision
                  </div>
                  <div className="font-bold text-white">{activeLegalSource.title}</div>
                  <p className="text-[11px] text-slate-300">{activeLegalSource.requirement}</p>
                  <div className="text-[10px] text-purple-300 font-mono pt-1">
                    Citation: {activeLegalSource.citation} • {activeLegalSource.authority}
                  </div>
                </div>
              )}

              {/* Expected Evidence vs Found Evidence */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex justify-between">
                  <span>Evidence Requirement</span>
                  <span className="text-slate-400 font-mono">Stage 25 Evidence Matrix</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Expected Proof Document:</span>
                  <div className="text-slate-200 font-medium">{activeItem.expected_evidence}</div>
                </div>
                {activeItem.found_evidence_id ? (
                  <div className="rounded-lg bg-emerald-950/20 border border-emerald-500/30 p-2.5 text-[11px] text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Evidence attached and cross-verified with MCA registry records.</span>
                  </div>
                ) : (
                  <div className="rounded-lg bg-rose-950/20 border border-rose-500/30 p-2.5 text-[11px] text-rose-300 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                    <span>Supporting document is currently missing from company workspace.</span>
                  </div>
                )}
              </div>

              {/* Operational Assignment */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Operational Accountability
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500">Responsible Role:</span>
                    <div className="font-semibold text-slate-200">{activeItem.responsible_actor}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Filing Form:</span>
                    <div className="font-semibold text-sky-400 font-mono">{activeItem.required_filing}</div>
                  </div>
                </div>
              </div>

              {/* Verification Button */}
              {activeItem.status !== 'VERIFIED' && (
                <div className="pt-2">
                  <button
                    onClick={() => onVerifyCompliance(activeItem.compliance_id)}
                    className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-500 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Mark Compliance Item Verified with Proof</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select an item to view compliance breakdown.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
