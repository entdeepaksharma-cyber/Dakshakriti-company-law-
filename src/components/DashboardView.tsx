import React from 'react';
import { Company, CorporateEvent, Document, Evidence, ComplianceItem, RedFlag } from '../types';
import { 
  Building2, 
  ShieldAlert, 
  FileCheck, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Sparkles,
  GitCommit,
  Scale
} from 'lucide-react';

interface DashboardViewProps {
  company: Company;
  events: CorporateEvent[];
  documents: Document[];
  evidenceList: Evidence[];
  complianceItems: ComplianceItem[];
  redFlags: RedFlag[];
  onNavigate: (view: string) => void;
  onSelectEvent: (event: CorporateEvent) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  company,
  events,
  documents,
  evidenceList,
  complianceItems,
  redFlags,
  onNavigate,
  onSelectEvent
}) => {
  const verifiedCount = evidenceList.filter(e => e.verification_status === 'HUMAN_VERIFIED' || e.verification_status === 'SOURCE_RECORD').length;
  const inReviewCount = evidenceList.filter(e => e.verification_status === 'NEEDS_REVIEW' || e.verification_status === 'AI_EXTRACTED').length;
  const disputedCount = evidenceList.filter(e => e.verification_status === 'DISPUTED').length;
  const criticalFlags = redFlags.filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH');
  const overdueCompliance = complianceItems.filter(c => c.status === 'OVERDUE' || c.status === 'MISSING_EVIDENCE');

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="rounded bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[11px] font-mono font-semibold text-sky-400">
                {company.corporate_type}
              </span>
              <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {company.status}
              </span>
              <span className="text-xs text-slate-400 font-mono">CIN: {company.identifier}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              {company.legal_name}
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              {company.registered_address} • Incorporated on <strong className="text-slate-300">{company.incorporation_date}</strong> under Ministry of Corporate Affairs, NCT of Delhi & Haryana.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('timeline')}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
            >
              <Clock className="h-3.5 w-3.5 text-sky-400" />
              <span>Full Timeline</span>
            </button>
            <button
              onClick={() => onNavigate('history')}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
            >
              <GitCommit className="h-3.5 w-3.5 text-indigo-400" />
              <span>Time Machine</span>
            </button>
            <button
              onClick={() => onNavigate('questions')}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition hover:bg-indigo-500"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Corporate AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 shadow-sm">
          <div className="text-[11px] font-medium text-slate-400">Paid-up Capital</div>
          <div className="mt-1 text-xl font-bold text-white">₹{(company.paid_up_capital / 100000).toFixed(1)}L</div>
          <div className="text-[10px] text-slate-400 font-mono">Auth: ₹{(company.authorized_capital / 100000).toFixed(0)}L</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 shadow-sm">
          <div className="text-[11px] font-medium text-slate-400">Active Directors</div>
          <div className="mt-1 text-xl font-bold text-white">3</div>
          <div className="text-[10px] text-amber-400 font-medium">1 disputed resignation</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 shadow-sm">
          <div className="text-[11px] font-medium text-slate-400">Shareholders</div>
          <div className="mt-1 text-xl font-bold text-white">3</div>
          <div className="text-[10px] text-slate-400 font-mono">2 Founders + 1 Investor</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 shadow-sm">
          <div className="text-[11px] font-medium text-slate-400">Registered Charges</div>
          <div className="mt-1 text-xl font-bold text-white">₹5.0 Cr</div>
          <div className="text-[10px] text-slate-400 font-mono">HDFC Bank Ltd (CHG-2)</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 shadow-sm">
          <div className="text-[11px] font-medium text-slate-400">Active Proceedings</div>
          <div className="mt-1 text-xl font-bold text-rose-400">2</div>
          <div className="text-[10px] text-rose-300/80">NCLT + ROC Sec 206</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 shadow-sm">
          <div className="text-[11px] font-medium text-slate-400">Intelligence Health</div>
          <div className="mt-1 text-xl font-bold text-emerald-400">89%</div>
          <div className="text-[10px] text-emerald-400/80 font-mono">{verifiedCount} Verified Evidence</div>
        </div>
      </div>

      {/* Main Content Layout: Attention Panel & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Attention Panel & Red Flags */}
        <div className="lg:col-span-7 space-y-6">
          {/* Attention / Action Required Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-rose-400" />
                <h2 className="text-sm font-bold tracking-tight text-white uppercase tracking-wider">
                  Attention Required — Red Flags & Conflicts
                </h2>
              </div>
              <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-400">
                {criticalFlags.length + overdueCompliance.length} Action Items
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {criticalFlags.map((flag) => (
                <div 
                  key={flag.flag_id}
                  className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-3.5 transition hover:bg-rose-950/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[9px] font-bold text-rose-300 uppercase">
                          {flag.severity}
                        </span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-400">
                          {flag.category}
                        </span>
                        <h3 className="text-xs font-bold text-rose-200">{flag.title}</h3>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{flag.description}</p>
                    </div>
                    <button
                      onClick={() => onNavigate('verification')}
                      className="shrink-0 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-[11px] font-semibold text-rose-300 hover:bg-rose-500/20 transition flex items-center gap-1"
                    >
                      <span>Review</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}

              {overdueCompliance.map((comp) => (
                <div 
                  key={comp.compliance_id}
                  className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-3.5 transition hover:bg-amber-950/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 uppercase">
                          {comp.status.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-amber-400 font-mono">Due: {comp.due_date}</span>
                        <h3 className="text-xs font-bold text-amber-200">{comp.requirement_title}</h3>
                      </div>
                      <p className="text-[11px] text-slate-300">Responsible: <span className="font-semibold text-slate-200">{comp.responsible_actor}</span> • Expected: {comp.expected_evidence}</p>
                    </div>
                    <button
                      onClick={() => onNavigate('compliance')}
                      className="shrink-0 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/20 transition flex items-center gap-1"
                    >
                      <span>Examine</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Corporate State Snapshot */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold tracking-tight text-white uppercase tracking-wider">
                Current Corporate State (T = Today)
              </h2>
              <button 
                onClick={() => onNavigate('history')} 
                className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Reconstruct Past State</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Current Management</span>
                  <span className="text-emerald-400 text-[10px]">Verified</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                    <span className="font-medium text-slate-200">Rahul Sharma</span>
                    <span className="text-slate-400 text-[10px]">Managing Director (Since Jan 2024)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                    <span className="font-medium text-slate-200">Anita Mehta</span>
                    <span className="text-slate-400 text-[10px]">Additional Director (Since Mar 2024)</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-slate-200">Vikram Singh</span>
                    <span className="text-slate-400 text-[10px]">Independent Director (Since Feb 2025)</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Current Cap-Table</span>
                  <span className="text-sky-400 text-[10px]">2,50,000 Equity</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                    <span className="font-medium text-slate-200">Rahul Sharma (Promoter)</span>
                    <span className="font-mono text-sky-400">1,50,000 (60.0%)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                    <span className="font-medium text-slate-200">Sunil Kapoor (Investor)</span>
                    <span className="font-mono text-sky-400">62,500 (25.0%)</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-slate-200">Priya Mehta (Promoter)</span>
                    <span className="font-mono text-amber-400">37,500 (15.0%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Intelligence Health & Recent Corporate Events */}
        <div className="lg:col-span-5 space-y-6">
          {/* Intelligence Health Summary */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
            <h2 className="text-sm font-bold tracking-tight text-white uppercase tracking-wider pb-3 border-b border-slate-800">
              Evidence & Trust Health Matrix
            </h2>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-300 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  Canonical Records Ingested
                </span>
                <span className="font-mono font-bold text-white">{documents.length} Records</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-t border-slate-800/60">
                <span className="text-slate-300 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-sky-400" />
                  Standardized Corporate Events
                </span>
                <span className="font-mono font-bold text-sky-400">{events.length} Events</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-t border-slate-800/60">
                <span className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Source-Verified Evidence
                </span>
                <span className="font-mono font-bold text-emerald-400">{verifiedCount} Verified</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-t border-slate-800/60">
                <span className="text-slate-300 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  Pending Professional Review
                </span>
                <span className="font-mono font-bold text-amber-400">{inReviewCount} Items</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-t border-slate-800/60">
                <span className="text-slate-300 flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                  Contradictory / Disputed Items
                </span>
                <span className="font-mono font-bold text-rose-400">{disputedCount} Conflicted</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Human Verification Rate</span>
              <span className="text-xs font-bold text-emerald-400">
                {Math.round((verifiedCount / Math.max(1, evidenceList.length)) * 100)}%
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-sky-500" 
                style={{ width: `${Math.round((verifiedCount / Math.max(1, evidenceList.length)) * 100)}%` }} 
              />
            </div>
          </div>

          {/* Recent Corporate Events */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold tracking-tight text-white uppercase tracking-wider">
                Recent Corporate Events
              </h2>
              <button 
                onClick={() => onNavigate('timeline')}
                className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Full Timeline</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-800/60">
              {events.slice(-5).reverse().map((evt) => (
                <div 
                  key={evt.event_id}
                  onClick={() => onSelectEvent(evt)}
                  className="py-3 group cursor-pointer transition hover:bg-slate-800/30 px-2 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-sky-400">{evt.effective_date}</span>
                    <span className={`rounded px-1.5 py-0.2 text-[9px] font-semibold ${
                      evt.status === 'HUMAN_VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      evt.status === 'DISPUTED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {evt.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="mt-1 text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition">
                    {evt.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-1">{evt.description}</p>
                  <div className="mt-1 text-[10px] text-slate-400 font-mono flex items-center gap-2">
                    <span>Auth: {evt.authority.split(',')[0]}</span>
                    <span>•</span>
                    <span>{evt.source_document_ids.length} Sources</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
