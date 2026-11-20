import React, { useState } from 'react';
import { Document, Evidence, CorporateEvent, TrustStatus } from '../types';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileCheck, 
  Upload, 
  ArrowLeft, 
  Sparkles,
  ExternalLink,
  Edit3,
  XCircle,
  Link2
} from 'lucide-react';

interface DocumentIntelligenceViewProps {
  documents: Document[];
  evidenceList: Evidence[];
  events: CorporateEvent[];
  selectedDocumentId?: string;
  onOpenUpload: () => void;
  onVerifyDocument: (docId: string, status: TrustStatus) => void;
  onVerifyEvidence: (evidenceId: string, status: TrustStatus) => void;
}

export const DocumentIntelligenceView: React.FC<DocumentIntelligenceViewProps> = ({
  documents,
  evidenceList,
  events,
  selectedDocumentId,
  onOpenUpload,
  onVerifyDocument,
  onVerifyEvidence
}) => {
  const [activeDocId, setActiveDocId] = useState<string | null>(selectedDocumentId || documents[0]?.document_id || null);
  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const activeDoc = documents.find(d => d.document_id === activeDocId);
  const docEvidence = evidenceList.filter(e => e.document_id === activeDocId);
  const docEvents = events.filter(e => e.source_document_ids.includes(activeDocId || ''));

  const filteredDocs = documents.filter(d => {
    if (typeFilter !== 'ALL' && d.document_type !== typeFilter) return false;
    if (searchFilter && !d.title.toLowerCase().includes(searchFilter.toLowerCase()) && !d.document_type.toLowerCase().includes(searchFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">Document Repository & OCR Intelligence</h1>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-300">
              {documents.length} Canonical Records
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Split-screen document viewer connecting raw corporate source files with structured AI extractions, entity resolution and human verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-indigo-500"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload New Document</span>
          </button>
        </div>
      </div>

      {/* Main Split-Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[700px]">
        {/* Left Column (4 cols on lg): Document List & Filter */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col h-[750px] overflow-hidden">
          <div className="p-3 border-b border-slate-800 space-y-2 bg-slate-950/40">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Filter documents..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1 px-2.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Document Types</option>
              <option value="Certificate of Incorporation">Certificate of Incorporation</option>
              <option value="Board Resolution">Board Resolution</option>
              <option value="Director Appointment">Director Appointment</option>
              <option value="Director Resignation">Director Resignation</option>
              <option value="Share Issue">Share Issue</option>
              <option value="Share Transfer Document">Share Transfer</option>
              <option value="Charge Document">Charge Document</option>
              <option value="Regulatory Notice">Regulatory Notice</option>
              <option value="Tribunal Order">Tribunal Order</option>
            </select>
          </div>

          {/* Document List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1">
            {filteredDocs.map((doc) => {
              const isSelected = doc.document_id === activeDocId;
              const isDisputed = doc.verification_status === 'DISPUTED';
              const isVerified = doc.verification_status === 'HUMAN_VERIFIED' || doc.verification_status === 'SOURCE_RECORD';

              return (
                <div
                  key={doc.document_id}
                  onClick={() => setActiveDocId(doc.document_id)}
                  className={`rounded-xl p-3 text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/15 border border-indigo-500/40 shadow-sm'
                      : 'hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono text-sky-400 font-bold">{doc.document_date}</span>
                    <span className={`rounded px-1.5 py-0.2 font-semibold ${
                      isDisputed ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      isVerified ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {doc.verification_status}
                    </span>
                  </div>
                  <h4 className={`mt-1 text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {doc.title}
                  </h4>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{doc.document_type}</span>
                    <span>v{doc.version}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols on lg): Split-Screen Document Intelligence Viewer */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col h-[750px] overflow-hidden shadow-2xl">
          {activeDoc ? (
            <div className="flex flex-col h-full">
              {/* Document Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-400">
                      CANONICAL RECORD
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {activeDoc.document_id}</span>
                  </div>
                  <h2 className="text-base font-bold text-white mt-0.5">{activeDoc.title}</h2>
                  <div className="text-[11px] text-slate-400">
                    Source: <span className="text-slate-300">{activeDoc.source}</span> • Date: <span className="font-mono text-slate-300">{activeDoc.document_date}</span>
                  </div>
                </div>

                {/* Verification Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onVerifyDocument(activeDoc.document_id, 'HUMAN_VERIFIED')}
                    className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Confirm</span>
                  </button>
                  <button
                    onClick={() => onVerifyDocument(activeDoc.document_id, 'DISPUTED')}
                    className="flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition"
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Flag Conflict</span>
                  </button>
                </div>
              </div>

              {/* Split Body */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-800">
                {/* Left Side: Original Document Text / OCR Content */}
                <div className="flex flex-col h-full bg-slate-950/30 overflow-hidden">
                  <div className="p-3 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <FileText className="h-3.5 w-3.5 text-sky-400" />
                      Original Document Text (Page 1)
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{activeDoc.file_hash.substring(0, 16)}...</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text bg-slate-950/50">
                    {activeDoc.content_text}
                  </div>
                </div>

                {/* Right Side: Structured AI Intelligence Extraction */}
                <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4 bg-slate-900">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Structured Extraction
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                      Confidence: {Math.round(activeDoc.classification_confidence * 100)}%
                    </span>
                  </div>

                  {/* Extracted Entities */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2 text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Identified Entities & Parties
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeDoc.parties.map((p, idx) => (
                        <span key={idx} className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-indigo-300 text-[11px] font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Extracted Evidence Propositions */}
                  <div className="space-y-2 text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                      <span>Evidence Extracted ({docEvidence.length})</span>
                    </div>

                    {docEvidence.map((ev) => (
                      <div key={ev.evidence_id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200 text-xs">{ev.proposition}</span>
                          <span className="text-[10px] text-slate-500 font-mono">P.{ev.page_number}</span>
                        </div>
                        <blockquote className="border-l-2 border-emerald-500 pl-2 text-[11px] italic text-slate-400">
                          "{ev.text_excerpt}"
                        </blockquote>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            ev.verification_status === 'HUMAN_VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            ev.verification_status === 'DISPUTED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {ev.verification_status}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onVerifyEvidence(ev.evidence_id, 'HUMAN_VERIFIED')}
                              className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-medium transition"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => onVerifyEvidence(ev.evidence_id, 'DISPUTED')}
                              className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-medium transition"
                            >
                              Dispute
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connected Corporate Events */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2 text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                      Connected Corporate Events ({docEvents.length})
                    </div>
                    {docEvents.map(evt => (
                      <div key={evt.event_id} className="p-2 rounded bg-slate-900 border border-slate-800">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-white">{evt.title}</span>
                          <span className="text-sky-400 font-mono text-[10px]">{evt.effective_date}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{evt.consequence}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select a document from the left panel to inspect.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
