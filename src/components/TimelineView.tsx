import React, { useState } from 'react';
import { CorporateEvent, Document, Evidence, LegalSource, EventType } from '../types';
import { 
  Clock, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  X, 
  Scale, 
  Building2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface TimelineViewProps {
  events: CorporateEvent[];
  documents: Document[];
  evidenceList: Evidence[];
  legalSources: LegalSource[];
  selectedEvent: CorporateEvent | null;
  onSelectEvent: (event: CorporateEvent | null) => void;
  onNavigateToDocument: (docId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  events,
  documents,
  evidenceList,
  legalSources,
  selectedEvent,
  onSelectEvent,
  onNavigateToDocument
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterYear, setFilterYear] = useState<string>('ALL');

  // Filter events
  const filteredEvents = events.filter(e => {
    if (filterType !== 'ALL' && e.event_type !== filterType) return false;
    if (filterStatus !== 'ALL' && e.status !== filterStatus) return false;
    if (filterYear !== 'ALL' && !e.effective_date.startsWith(filterYear)) return false;
    return true;
  }).sort((a, b) => new Date(a.effective_date).getTime() - new Date(b.effective_date).getTime());

  // Group events by Year
  const groupedByYear: { [year: string]: CorporateEvent[] } = {};
  filteredEvents.forEach(e => {
    const year = e.effective_date.substring(0, 4);
    if (!groupedByYear[year]) groupedByYear[year] = [];
    groupedByYear[year].push(e);
  });

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-sky-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">Corporate Legal Timeline</h1>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-300">
              {filteredEvents.length} Events
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Temporal event-sourced record. Each event connects to primary documents, evidentiary propositions, and statutory legal grounds.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Year Filter */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="ALL">All Years</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>

          {/* Event Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="ALL">All Event Types</option>
            <option value="INCORPORATION">Incorporation</option>
            <option value="DIRECTOR_APPOINTMENT">Director Appointment</option>
            <option value="DIRECTOR_RESIGNATION">Director Resignation</option>
            <option value="SHARE_ISSUE">Share Issue</option>
            <option value="SHARE_TRANSFER">Share Transfer</option>
            <option value="BORROWING">Borrowing</option>
            <option value="CHARGE_CREATION">Charge Creation</option>
            <option value="REGULATORY_NOTICE">Regulatory Notice</option>
            <option value="TRIBUNAL_ORDER">Tribunal Order</option>
          </select>

          {/* Trust Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="HUMAN_VERIFIED">Human Verified</option>
            <option value="SOURCE_RECORD">Source Record</option>
            <option value="DISPUTED">Disputed / Conflicted</option>
            <option value="NEEDS_REVIEW">Needs Review</option>
          </select>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="space-y-10">
        {Object.keys(groupedByYear).map(year => (
          <div key={year} className="space-y-4">
            <div className="sticky top-16 z-20 flex items-center gap-3 bg-slate-950/80 py-2 backdrop-blur">
              <span className="flex h-8 items-center justify-center rounded-lg bg-indigo-600 px-3 text-xs font-extrabold text-white shadow-md shadow-indigo-600/30">
                {year}
              </span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
              {groupedByYear[year].map((evt) => {
                const isSelected = selectedEvent?.event_id === evt.event_id;
                const isDisputed = evt.status === 'DISPUTED';
                const isVerified = evt.status === 'HUMAN_VERIFIED' || evt.status === 'SOURCE_RECORD';

                return (
                  <div
                    key={evt.event_id}
                    onClick={() => onSelectEvent(evt)}
                    className={`relative rounded-xl border p-4.5 transition cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-slate-900 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500'
                        : isDisputed
                        ? 'border-rose-500/40 bg-slate-900/90 hover:border-rose-400 hover:bg-slate-900'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    {/* Timeline Node Dot */}
                    <div className={`absolute -left-[31px] top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      isDisputed ? 'border-rose-500 bg-rose-950' :
                      isVerified ? 'border-emerald-500 bg-emerald-950' :
                      'border-amber-500 bg-amber-950'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        isDisputed ? 'bg-rose-400' :
                        isVerified ? 'bg-emerald-400' :
                        'bg-amber-400'
                      }`} />
                    </div>

                    {/* Event Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-400">
                          {evt.effective_date}
                        </span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-300">
                          {evt.event_type}
                        </span>
                        {evt.filing_date && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            Filing: {evt.filing_date}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1 ${
                          isDisputed ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                          isVerified ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {isDisputed && <AlertTriangle className="h-3 w-3" />}
                          {isVerified && <CheckCircle2 className="h-3 w-3" />}
                          <span>{evt.status.replace('_', ' ')}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Click to investigate
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                      </div>
                    </div>

                    {/* Event Body */}
                    <h3 className="mt-2 text-sm font-bold text-white group-hover:text-indigo-300 transition">
                      {evt.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Event Metadata Chips */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60 text-[11px]">
                      <div className="text-slate-400">
                        <strong className="text-slate-400">Authority:</strong> {evt.authority}
                      </div>
                      <span className="text-slate-600">•</span>
                      <div className="text-slate-400">
                        <strong className="text-slate-400">Decision:</strong> {evt.decision_maker}
                      </div>
                      <span className="text-slate-600">•</span>
                      <div className="text-slate-400 flex items-center gap-1">
                        <FileText className="h-3 w-3 text-sky-400" />
                        <span>{evt.source_document_ids.length} Sources</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contextual Investigation Drawer (CLICK -> EXPLAIN -> VERIFY) */}
      {selectedEvent && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] lg:w-[540px] bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto p-6 animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-400">
                EVENT INVESTIGATION
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{selectedEvent.title}</h2>
              <div className="text-xs text-slate-400 font-mono">
                Effective: {selectedEvent.effective_date} • {selectedEvent.event_type}
              </div>
            </div>
            <button
              onClick={() => onSelectEvent(null)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 space-y-6 text-xs">
            {/* Step 1: WHAT HAPPENED? */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                1. What Happened? (Factual Extraction)
              </div>
              <p className="text-slate-200 leading-relaxed font-sans">{selectedEvent.description}</p>
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500">Decision Maker:</span>
                  <div className="font-medium text-slate-300">{selectedEvent.decision_maker}</div>
                </div>
                <div>
                  <span className="text-slate-500">Legal Authority:</span>
                  <div className="font-medium text-slate-300">{selectedEvent.authority}</div>
                </div>
              </div>
            </div>

            {/* Step 2: WHAT PROVES IT? (Evidence Chain) */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                <span>2. What Proves It? (Evidence Chain)</span>
                <span className="font-mono text-[9px] text-slate-400">{selectedEvent.evidence_ids.length} Linked Excerpts</span>
              </div>

              {selectedEvent.evidence_ids.length > 0 ? (
                selectedEvent.evidence_ids.map(eviId => {
                  const ev = evidenceList.find(e => e.evidence_id === eviId);
                  const doc = documents.find(d => d.document_id === ev?.document_id);
                  if (!ev) return null;
                  return (
                    <div key={ev.evidence_id} className="rounded-lg border border-slate-800 bg-slate-900 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200 truncate">{doc?.title}</span>
                        <span className="text-[10px] text-sky-400 font-mono">Page {ev.page_number}</span>
                      </div>
                      <blockquote className="border-l-2 border-indigo-500 pl-2.5 text-[11px] italic text-slate-300">
                        "{ev.text_excerpt}"
                      </blockquote>
                      <div className="flex items-center justify-between pt-1">
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          ev.verification_status === 'HUMAN_VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          ev.verification_status === 'DISPUTED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {ev.verification_status}
                        </span>
                        {doc && (
                          <button
                            onClick={() => {
                              onSelectEvent(null);
                              onNavigateToDocument(doc.document_id);
                            }}
                            className="text-[10px] text-sky-400 hover:underline flex items-center gap-1 font-medium"
                          >
                            <span>Open Source Document</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-400 text-xs italic">
                  No direct evidence objects attached. Candidate event pending review.
                </div>
              )}
            </div>

            {/* Step 3: WHAT LAW APPLIES? (Statutory Source) */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                3. What Law Applies? (Statutory Framework)
              </div>
              {selectedEvent.legal_source_ids.map(legId => {
                const leg = legalSources.find(l => l.source_id === legId);
                if (!leg) return null;
                return (
                  <div key={leg.source_id} className="space-y-1">
                    <div className="font-bold text-white text-xs">{leg.title}</div>
                    <div className="text-[11px] text-slate-300">{leg.requirement}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Citation: {leg.citation} • {leg.authority}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 4: WHAT CHANGED IN CORPORATE STATE? */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                4. What Changed Legally? (State Transition)
              </div>
              <p className="text-slate-200 leading-relaxed font-sans">{selectedEvent.consequence}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
