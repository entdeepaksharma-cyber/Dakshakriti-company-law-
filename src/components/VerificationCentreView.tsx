import React, { useState } from 'react';
import { VerificationItem, TrustStatus, AuditLogEntry } from '../types';
import { 
  CheckCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  HelpCircle, 
  FileText, 
  Clock, 
  Sparkles,
  ShieldCheck,
  Search,
  MessageSquareQuote
} from 'lucide-react';

interface VerificationCentreViewProps {
  items: VerificationItem[];
  onUpdateItemStatus: (
    id: string, 
    status: VerificationItem['status'], 
    reason?: string,
    notes?: string
  ) => void;
}

export const VerificationCentreView: React.FC<VerificationCentreViewProps> = ({
  items,
  onUpdateItemStatus
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(items[0]?.id || null);
  const [reviewNote, setReviewNote] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editText, setEditText] = useState('');

  const filteredItems = items.filter(item => {
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    return true;
  });

  const activeItem = items.find(i => i.id === selectedItemId);

  const categories = [
    { id: 'ALL', label: 'All Review Items', count: items.length },
    { id: 'DATE_CONFLICTS', label: 'Date Conflicts', count: items.filter(i => i.category === 'DATE_CONFLICTS').length },
    { id: 'PENDING_ENTITIES', label: 'Entity Resolution', count: items.filter(i => i.category === 'PENDING_ENTITIES').length },
    { id: 'MISSING_EVIDENCE', label: 'Missing Evidence', count: items.filter(i => i.category === 'MISSING_EVIDENCE').length },
    { id: 'AUTHORITY_MISMATCH', label: 'Authority Checks', count: items.filter(i => i.category === 'AUTHORITY_MISMATCH').length }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <CheckCheck className="h-5 w-5 text-emerald-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Professional Verification & Trust Centre
            </h1>
            <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">
              Human-in-the-Loop Gateway
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            AI proposes. Rules validate. Source supports. A qualified corporate professional verifies. Every confirmation is permanently recorded in the immutable audit log.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
              selectedCategory === cat.id ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* 2-Column Split: Queue on Left, Detailed Verification Screen on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left: Queue Items (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900 p-3 space-y-2 h-[650px] overflow-y-auto">
          {filteredItems.map(item => {
            const isSelected = item.id === selectedItemId;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItemId(item.id);
                  setReviewNote('');
                }}
                className={`rounded-xl p-3.5 text-left transition cursor-pointer border ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-600/10 shadow-sm'
                    : 'border-slate-800/80 bg-slate-950/50 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300 font-mono">
                    {item.category.replace('_', ' ')}
                  </span>
                  <span className={`rounded px-1.5 py-0.2 font-semibold ${
                    item.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    item.status === 'DISPUTED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    item.status === 'REJECTED' ? 'bg-slate-800 text-slate-400 border border-slate-700' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="mt-1.5 text-xs font-bold text-white leading-snug">{item.title}</h4>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">{item.ai_finding}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{item.source_doc_title}</span>
                  <span>Conf: {Math.round(item.confidence * 100)}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Examination & Human Decision (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between h-[650px] overflow-y-auto shadow-2xl">
          {activeItem ? (
            <div className="space-y-5">
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-400">
                    EXAMINATION CARD
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">{activeItem.title}</h2>
                  <div className="text-xs text-slate-400 font-mono">Source: {activeItem.source_doc_title} (Page {activeItem.source_doc_page})</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold border ${
                  activeItem.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                  activeItem.status === 'DISPUTED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                  'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {activeItem.status.replace('_', ' ')}
                </span>
              </div>

              {/* AI Proposed Finding */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Extracted Finding</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">{activeItem.ai_finding}</p>
              </div>

              {/* Underlying Primary Source Evidence Quote */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Substantiating Source Passage</span>
                </div>
                <blockquote className="border-l-2 border-emerald-500 pl-3 text-xs italic text-slate-300 bg-slate-900/60 p-2.5 rounded">
                  "{activeItem.evidence_text}"
                </blockquote>
              </div>

              {/* Conflicting Record if exists */}
              {activeItem.conflicting_record && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-1 text-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Conflicting Record on Record</span>
                  </div>
                  <p className="text-rose-200">{activeItem.conflicting_record}</p>
                </div>
              )}

              {/* Suggested Professional Interpretation */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Recommended Interpretation
                </div>
                <p className="text-slate-300">{activeItem.suggested_interpretation}</p>
              </div>

              {/* Professional Review Note Input */}
              <div className="space-y-1.5 text-xs">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Professional Reviewer Note / Reasoning (Logged to Audit Trail)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cross-checked with MCA portal Challan SRN and certified Board minutes..."
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Decision Action Buttons (Stage 20.49 Human Verification Protocol) */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateItemStatus(activeItem.id, 'VERIFIED', reviewNote || 'Verified against primary documents')}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-emerald-500 transition"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>CONFIRM & VERIFY</span>
                  </button>

                  <button
                    onClick={() => onUpdateItemStatus(activeItem.id, 'DISPUTED', reviewNote || 'Conflicting documents identified')}
                    className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <span>FLAG DISPUTED</span>
                  </button>

                  <button
                    onClick={() => onUpdateItemStatus(activeItem.id, 'REJECTED', reviewNote || 'Incorrect AI extraction rejected')}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
                  >
                    <XCircle className="h-4 w-4 text-slate-400" />
                    <span>REJECT</span>
                  </button>
                </div>

                <button
                  onClick={() => onUpdateItemStatus(activeItem.id, 'UNKNOWN', 'Marked as unknown due to insufficient evidence')}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Mark Unknown</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select an item from the review queue.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
