import React, { useState } from 'react';
import { LegalSource } from '../types';
import { 
  BookOpen, 
  Search, 
  Scale, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface LegalIntelligenceViewProps {
  sources: LegalSource[];
}

export const LegalIntelligenceView: React.FC<LegalIntelligenceViewProps> = ({ sources }) => {
  const [search, setSearch] = useState('');
  const [selectedSourceId, setSelectedSourceId] = useState<string>(sources[0]?.source_id || '');

  const filteredSources = sources.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.citation.toLowerCase().includes(search.toLowerCase()) ||
    s.requirement.toLowerCase().includes(search.toLowerCase())
  );

  const activeSource = sources.find(s => s.source_id === selectedSourceId) || sources[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Companies Act, 2013 Statutory Knowledge Base
            </h1>
            <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-xs font-semibold text-purple-300">
              Stage 23 & 24 Legal Knowledge Engine
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Authoritative, versioned repository of Indian corporate law provisions, rules, notifications, required corporate records, and mandatory filings.
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
        {/* Left Column: Sections List (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900 p-3 space-y-2 h-[660px] overflow-y-auto">
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search section, citation or rule..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 py-1 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            {filteredSources.map(s => {
              const isSelected = s.source_id === selectedSourceId;
              return (
                <div
                  key={s.source_id}
                  onClick={() => setSelectedSourceId(s.source_id)}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/20 shadow-sm'
                      : 'border-slate-800/80 bg-slate-950/60 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-mono text-purple-400 font-bold">{s.citation}</span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] text-slate-400 font-mono">
                      {s.source_type}
                    </span>
                  </div>
                  <h3 className="mt-1 text-xs font-bold text-white leading-snug">{s.title}</h3>
                  <div className="mt-1 text-[10px] text-slate-500 truncate">{s.authority}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Section Detail Dossier (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5 h-[660px] overflow-y-auto shadow-2xl text-xs">
          {activeSource && (
            <div className="space-y-5">
              <div className="pb-3 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="rounded bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-400">
                    CANONICAL STATUTORY PROVISION
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">{activeSource.title}</h2>
                  <div className="text-slate-400 text-xs font-mono mt-0.5">
                    Citation: {activeSource.citation} • Effective: {activeSource.effective_from}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Enforcing Authority</span>
                  <span className="font-semibold text-slate-200">{activeSource.authority}</span>
                </div>
              </div>

              {/* Requirement Description */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  Substantive Legal Requirement
                </div>
                <p className="text-slate-200 leading-relaxed font-sans">{activeSource.requirement}</p>
              </div>

              {/* Applicability Condition */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                  Applicability Criteria
                </div>
                <p className="text-slate-300">{activeSource.applicability}</p>
              </div>

              {/* Expected Corporate Documents */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Expected Internal Records & Resolutions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSource.expected_documents.map((doc, idx) => (
                    <span key={idx} className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-emerald-300 font-medium text-[11px]">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expected Statutory Filings (MCA Forms) */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Mandatory Statutory Filings & Deadlines
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSource.expected_filings.map((filing, idx) => (
                    <span key={idx} className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-amber-300 font-medium text-[11px] font-mono">
                      {filing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
