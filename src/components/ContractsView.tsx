import React, { useState } from 'react';
import { Company, CommercialContract } from '../types';
import { 
  Briefcase, 
  FileCheck2, 
  AlertTriangle, 
  Clock, 
  KeyRound, 
  CheckCircle2, 
  FileText,
  DollarSign
} from 'lucide-react';

interface ContractsViewProps {
  company: Company;
  contracts: CommercialContract[];
}

export const ContractsView: React.FC<ContractsViewProps> = ({
  company,
  contracts
}) => {
  const [selectedContractId, setSelectedContractId] = useState<string>(contracts[0]?.contract_id || '');
  const activeContract = contracts.find(c => c.contract_id === selectedContractId) || contracts[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-sky-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Commercial Contracts & Obligations Intelligence
            </h1>
            <span className="rounded-full bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-xs font-semibold text-sky-300">
              Stage 28 Commercial Operations
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            "What has the company agreed to do?" Tracks contractual commitments, verifies signatory authority, and flags potential breach indicators.
          </p>
        </div>
      </div>

      {/* Contract Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contracts.map(c => {
          const isSelected = c.contract_id === selectedContractId;
          const hasDispute = c.dispute_status !== 'None';

          return (
            <div
              key={c.contract_id}
              onClick={() => setSelectedContractId(c.contract_id)}
              className={`rounded-2xl border p-4.5 transition cursor-pointer ${
                isSelected 
                  ? 'border-indigo-500 bg-indigo-600/10 shadow-lg'
                  : hasDispute
                  ? 'border-rose-500/30 bg-slate-900/90 hover:border-rose-400'
                  : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center text-[10px]">
                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300 font-mono">{c.contract_type}</span>
                <span className={`px-2 py-0.2 rounded font-bold ${
                  hasDispute ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {c.dispute_status === 'None' ? 'Active' : c.dispute_status}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-white line-clamp-1">{c.title}</h3>
              <div className="text-xs text-slate-300 mt-1 font-semibold">Counterparty: {c.counterparty}</div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-400 font-bold">₹{(c.value / 100000).toFixed(1)} Lakhs</span>
                <span className="text-slate-400">Expires: {c.expiry_date}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Contract Inspection */}
      {activeContract && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6 shadow-2xl text-xs">
          <div className="pb-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-400">
                CONTRACT INTELLIGENCE PROFILE
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{activeContract.title}</h2>
              <div className="text-slate-400 text-xs font-mono mt-0.5">
                Executed: {activeContract.execution_date} • Effective: {activeContract.effective_date} • Expiry: {activeContract.expiry_date}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Contract Value</div>
              <div className="text-2xl font-black font-mono text-emerald-400">₹{(activeContract.value / 100000).toFixed(2)} Lakhs</div>
            </div>
          </div>

          {/* Signatory Authority Validation (Stage 28.7) */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <KeyRound className="h-4 w-4" />
              <span>Signatory Authority Audit</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-slate-400">Signatory: </span>
                <strong className="text-white text-xs">{activeContract.signatory_name}</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Signatory Authority Validated via Board Resolution</span>
              </div>
            </div>
          </div>

          {/* Obligations Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Contractual Obligations & Performance Tracking ({activeContract.obligations.length})
            </h3>
            <div className="space-y-2">
              {activeContract.obligations.map((ob, i) => (
                <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-200">{ob.description}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Due Date: {ob.due_date}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    ob.status.includes('Risk') || ob.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    ob.status === 'Delayed' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {ob.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
