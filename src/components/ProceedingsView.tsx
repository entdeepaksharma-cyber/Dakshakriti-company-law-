import React, { useState } from 'react';
import { Company, LegalProceeding } from '../types';
import { 
  Scale, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  Gavel, 
  ShieldAlert, 
  Clock, 
  ArrowRight
} from 'lucide-react';

interface ProceedingsViewProps {
  company: Company;
  proceedings: LegalProceeding[];
}

export const ProceedingsView: React.FC<ProceedingsViewProps> = ({
  company,
  proceedings
}) => {
  const [selectedProceedingId, setSelectedProceedingId] = useState<string>(proceedings[0]?.proceeding_id || '');
  const activeProc = proceedings.find(p => p.proceeding_id === selectedProceedingId) || proceedings[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-rose-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Corporate Dispute & Legal Proceeding Intelligence
            </h1>
            <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-xs font-semibold text-rose-300">
              Stage 29 Adjudication & Tribunal Impact
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Transforms court and tribunal records into structured, chronological, evidence-linked claims, defences, orders and direct corporate state impacts.
          </p>
        </div>
      </div>

      {/* Proceedings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proceedings.map(proc => {
          const isSelected = proc.proceeding_id === selectedProceedingId;
          const isNCLT = proc.forum.includes('NCLT');

          return (
            <div
              key={proc.proceeding_id}
              onClick={() => setSelectedProceedingId(proc.proceeding_id)}
              className={`rounded-2xl border p-5 transition cursor-pointer ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-600/10 shadow-xl'
                  : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex justify-between items-center text-[10px]">
                <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-slate-300">{proc.forum}</span>
                <span className="rounded bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-rose-400 font-bold">
                  {proc.stage}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-white">{proc.matter_title}</h3>
              <div className="text-xs text-slate-400 font-mono mt-1">Case No: {proc.case_number}</div>
              <p className="mt-2 text-xs text-slate-300 line-clamp-2">{proc.corporate_impact}</p>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Filed: {proc.filing_date}</span>
                <span className="text-rose-400 font-bold">Exposure: ₹{(proc.amount_in_dispute / 100000).toFixed(1)}L</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Proceeding Deep Dive */}
      {activeProc && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6 shadow-2xl text-xs">
          <div className="pb-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="rounded bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-400">
                PROCEEDING DOSSIER
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{activeProc.matter_title}</h2>
              <div className="text-slate-400 text-xs font-mono mt-0.5">
                Forum: {activeProc.forum} • Case No: {activeProc.case_number} • Filed: {activeProc.filing_date}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Financial Exposure</div>
              <div className="text-2xl font-black font-mono text-rose-400">₹{(activeProc.amount_in_dispute / 100000).toFixed(2)} Lakhs</div>
            </div>
          </div>

          {/* Corporate State Impact Highlight (Stage 29.20) */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Gavel className="h-4 w-4" />
              <span>Direct Corporate State Impact</span>
            </div>
            <p className="text-rose-200 text-xs font-semibold leading-relaxed">
              {activeProc.corporate_impact}
            </p>
          </div>

          {/* Claims vs Defences (Stage 29.11 & 29.12) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Claimant Allegations */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Opposing Party Claims ({activeProc.opposing_party})
              </div>
              <ul className="space-y-2">
                {activeProc.claims.map((claim, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{claim}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Defences */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Company Legal Position & Defence
              </div>
              <ul className="space-y-2">
                {activeProc.defence.map((def, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{def}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
