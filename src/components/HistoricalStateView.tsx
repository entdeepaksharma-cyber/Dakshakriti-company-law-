import React, { useState } from 'react';
import { Company, CorporateEvent, Person, Role } from '../types';
import { CorporateStateEngine, StateComparisonResult, StateChangeItem } from '../services/corporateStateEngine';
import { 
  GitCommit, 
  Calendar, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles,
  FileText,
  Scale,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface HistoricalStateViewProps {
  company: Company;
  events: CorporateEvent[];
  people: Person[];
  roles: Role[];
  onSelectEvent: (event: CorporateEvent) => void;
}

export const HistoricalStateView: React.FC<HistoricalStateViewProps> = ({
  company,
  events,
  people,
  roles,
  onSelectEvent
}) => {
  const [activeTab, setActiveTab] = useState<'POINT_IN_TIME' | 'STATE_COMPARISON'>('STATE_COMPARISON');

  // Point in Time state
  const [selectedDate, setSelectedDate] = useState<string>('2025-03-31');

  // State Comparison states
  const [compareDateA, setCompareDateA] = useState<string>('2024-01-10');
  const [compareDateB, setCompareDateB] = useState<string>('2026-03-31');
  const [expandedChangeIndex, setExpandedChangeIndex] = useState<number | null>(0);

  // Compute states
  const singleState = CorporateStateEngine.reconstructState(company, events, people, roles, selectedDate);
  const comparisonResult: StateComparisonResult = CorporateStateEngine.compareStates(
    company,
    events,
    people,
    roles,
    compareDateA,
    compareDateB
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <GitCommit className="h-5 w-5 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Corporate Legal History & State Engine
            </h1>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-400">
              Event-Sourced Model
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Reconstruct what the company was on any exact calendar date, compare corporate legal states, and trace causal proof with the signature "Why Did This Change?" engine.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 p-1">
          <button
            onClick={() => setActiveTab('STATE_COMPARISON')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'STATE_COMPARISON'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            State Comparison (A vs B)
          </button>
          <button
            onClick={() => setActiveTab('POINT_IN_TIME')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'POINT_IN_TIME'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Snapshot at Date (T)
          </button>
        </div>
      </div>

      {activeTab === 'STATE_COMPARISON' ? (
        /* COMPARISON MODE (THE SIGNATURE "WHY DID THIS CHANGE?" SCREEN) */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Initial State A</label>
                <input
                  type="date"
                  value={compareDateA}
                  onChange={(e) => setCompareDateA(e.target.value)}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 text-slate-500">
                <ArrowRight className="h-5 w-5" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target State B</label>
                <input
                  type="date"
                  value={compareDateB}
                  onChange={(e) => setCompareDateB(e.target.value)}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-slate-400 mr-1">Presets:</span>
              <button
                onClick={() => { setCompareDateA('2024-01-10'); setCompareDateB('2024-06-25'); }}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-mono transition"
              >
                Inc → Rights Issue
              </button>
              <button
                onClick={() => { setCompareDateA('2024-06-25'); setCompareDateB('2024-10-01'); }}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-mono transition"
              >
                Share Transfer
              </button>
              <button
                onClick={() => { setCompareDateA('2024-01-10'); setCompareDateB('2026-03-31'); }}
                className="px-2 py-1 rounded bg-indigo-600/30 border border-indigo-500/40 hover:bg-indigo-600/50 text-[10px] text-indigo-300 font-mono transition font-semibold"
              >
                Full Lifecycle (2024→2026)
              </button>
            </div>
          </div>

          {/* Quick Stats Comparison Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Paid-up Capital</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-sm font-mono text-slate-400">₹{(comparisonResult.state_a.company.capital / 100000).toFixed(1)}L</span>
                <ArrowRight className="h-3 w-3 text-slate-600" />
                <span className="text-base font-bold font-mono text-white">₹{(comparisonResult.state_b.company.capital / 100000).toFixed(1)}L</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Directors</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-sm font-mono text-slate-400">{comparisonResult.state_a.directors.filter(d => d.status === 'Active').length}</span>
                <ArrowRight className="h-3 w-3 text-slate-600" />
                <span className="text-base font-bold font-mono text-white">{comparisonResult.state_b.directors.filter(d => d.status === 'Active').length}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Charges Registered</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-sm font-mono text-slate-400">{comparisonResult.state_a.charges.length}</span>
                <ArrowRight className="h-3 w-3 text-slate-600" />
                <span className="text-base font-bold font-mono text-white">{comparisonResult.state_b.charges.length} (₹5 Cr)</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">State Transitions</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-base font-bold text-sky-400">{comparisonResult.changes.length} Material Changes</span>
              </div>
            </div>
          </div>

          {/* Conflict Banners if any */}
          {comparisonResult.conflicts_detected.length > 0 && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-1">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span>Historical Contradictions Detected in Period</span>
              </div>
              <ul className="list-disc pl-5 text-xs text-rose-200/90 space-y-0.5">
                {comparisonResult.conflicts_detected.map((cf, i) => (
                  <li key={i}>{cf}</li>
                ))}
              </ul>
            </div>
          )}

          {/* List of Changes with signature "WHY DID THIS CHANGE?" button */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" />
                <span>Detailed State Transition Log ({compareDateA} → {compareDateB})</span>
              </h2>
              <span className="text-xs text-slate-400">Click "WHY DID THIS CHANGE?" to inspect evidentiary provenance</span>
            </div>

            <div className="space-y-4">
              {comparisonResult.changes.map((item, index) => {
                const isExpanded = expandedChangeIndex === index;
                const change = item.why_changed;

                return (
                  <div 
                    key={index} 
                    className="rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden transition"
                  >
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            item.change_type === 'ADDED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            item.change_type === 'REMOVED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          }`}>
                            {item.change_type}
                          </span>
                          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-300">
                            {item.category}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{item.effective_date}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-slate-400">
                          {item.previous_value && <span className="line-through text-slate-500 mr-2">{item.previous_value}</span>}
                          <span className="text-slate-300">{item.new_value}</span>
                        </p>
                      </div>

                      {/* THE SIGNATURE ACTION BUTTON */}
                      <button
                        onClick={() => setExpandedChangeIndex(isExpanded ? null : index)}
                        className={`rounded-lg px-3 py-2 text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                          isExpanded 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/25'
                        }`}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>WHY DID THIS CHANGE?</span>
                      </button>
                    </div>

                    {/* EXPANDED PROVENANCE TREE (STAGE 10 / 21 SIGNATURE CHAIN) */}
                    {isExpanded && (
                      <div className="p-5 border-t border-slate-800 bg-slate-900/90 space-y-4 animate-in slide-in-from-top-2 duration-150">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center justify-between">
                          <span>Complete Causal Provenance & Evidence Chain</span>
                          <span className="font-mono text-slate-400">8-Layer Audit Verification</span>
                        </div>

                        {/* Visual Chain Nodes */}
                        <div className="relative pl-6 border-l-2 border-indigo-500/50 space-y-3.5 text-xs">
                          {/* 1. STATE A */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-slate-700 border-2 border-slate-900" />
                            <div className="font-mono text-[10px] text-slate-400">STARTING STATE (T1)</div>
                            <div className="text-slate-300 font-semibold">{change.state_a}</div>
                          </div>

                          {/* 2. CORPORATE EVENT */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-sky-500 border-2 border-slate-900" />
                            <div className="font-mono text-[10px] text-sky-400">TRIGGER EVENT</div>
                            <div className="text-white font-bold">{change.event_title} ({change.event_type})</div>
                            <div className="text-slate-400 text-[11px]">{change.change_description}</div>
                          </div>

                          {/* 3. DECISION & AUTHORITY */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-indigo-500 border-2 border-slate-900" />
                            <div className="font-mono text-[10px] text-indigo-400">DECISION & LEGAL AUTHORITY</div>
                            <div className="text-slate-200">
                              Decision by: <strong className="text-white">{change.decision}</strong> • Under Authority: <strong className="text-white">{change.authority}</strong>
                            </div>
                          </div>

                          {/* 4. DOCUMENT & EVIDENCE EXCERPT */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                            <div className="font-mono text-[10px] text-emerald-400">SOURCE DOCUMENT & SUBSTANTIATING EVIDENCE</div>
                            <div className="text-slate-300 font-semibold">{change.document_title}</div>
                            <blockquote className="mt-1 border-l-2 border-emerald-500 pl-2 text-[11px] italic text-slate-400 bg-slate-950/60 p-2 rounded">
                              "{change.evidence_text}"
                            </blockquote>
                          </div>

                          {/* 5. STATUTORY LEGAL SOURCE */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-purple-500 border-2 border-slate-900" />
                            <div className="font-mono text-[10px] text-purple-400">GOVERNING LAW & STATUTE</div>
                            <div className="text-slate-300 font-mono text-[11px]">{change.legal_source}</div>
                          </div>

                          {/* 6. VERIFICATION STATUS */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-amber-500 border-2 border-slate-900" />
                            <div className="font-mono text-[10px] text-amber-400">VERIFICATION & TRUST DISPOSITION</div>
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                                {change.verification_status}
                              </span>
                              <span className="text-[11px] text-slate-400">Verified by Professional CS / Legal Reviewer</span>
                            </div>
                          </div>

                          {/* 7. RESULTING STATE B */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-indigo-400 border-2 border-slate-900" />
                            <div className="font-mono text-[10px] text-indigo-300">RESULTING STATE (T2)</div>
                            <div className="text-white font-bold">{change.state_b}</div>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => onSelectEvent(item.trigger_event)}
                            className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <span>Inspect Event Record in Timeline</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* SINGLE POINT IN TIME RECONSTRUCTION ("TIME MACHINE") */
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Reconstruct Corporate Legal State at Date T
              </h2>
              <p className="text-xs text-slate-400">
                Formula: State(T) = Initial Incorporation State + Verified Events effective on or before T
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
              />
              <span className="rounded bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 text-xs font-mono text-sky-400 font-bold">
                T = {selectedDate}
              </span>
            </div>
          </div>

          {/* Reconstructed State Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Panel 1: Management Structure on Date */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Board of Directors on {selectedDate}
                </h3>
                <span className="font-mono text-xs text-sky-400">
                  {singleState.directors.filter(d => d.status === 'Active').length} Active
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {singleState.directors.map((d, i) => (
                  <div key={i} className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{d.name}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                        d.status.includes('Active') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {d.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{d.role} (Appointed: {d.appointment_date})</div>
                    <div className="text-[10px] text-slate-500 font-mono">Proof: {d.evidence}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 2: Shareholding on Date */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Ownership & Share Capital on {selectedDate}
                </h3>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  Paid-up: ₹{(singleState.company.capital / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {singleState.shareholders.map((s, i) => (
                  <div key={i} className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{s.name}</span>
                      <span className="font-mono font-bold text-sky-400">{s.percentage}%</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {s.shares.toLocaleString()} Equity Shares @ ₹10 each (Acquired: {s.acquisition_date})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 3: Encumbrances / Charges on Date */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Registered Charges & Debt
                </h3>
                <span className="font-mono text-xs text-amber-400">
                  {singleState.charges.length} Charge(s)
                </span>
              </div>
              {singleState.charges.length > 0 ? (
                singleState.charges.map((c, i) => (
                  <div key={i} className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{c.holder}</span>
                      <span className="font-mono text-amber-400 font-bold">₹{(c.amount / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Charge ID: {c.charge_id} • Created: {c.created_date}</div>
                    <div className="text-[10px] text-slate-500">{c.status}</div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 italic p-3">No charges registered on this date.</div>
              )}
            </div>

            {/* Panel 4: Active Judicial Proceedings on Date */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Pending Legal Proceedings
                </h3>
                <span className="font-mono text-xs text-rose-400">
                  {singleState.active_proceedings.length} Matter(s)
                </span>
              </div>
              {singleState.active_proceedings.length > 0 ? (
                singleState.active_proceedings.map((p, i) => (
                  <div key={i} className="rounded-lg border border-rose-500/20 bg-rose-950/10 p-3 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-rose-200">{p.case_number}</span>
                      <span className="text-[10px] text-rose-300 font-mono">{p.forum}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">{p.issue}</div>
                    <div className="text-[10px] text-slate-400 font-medium">Impact: {p.impact}</div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 italic p-3">No active proceedings pending on this date.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
