import React, { useState } from 'react';
import { Company, CorporateEvent, Document, Evidence, LegalSource } from '../types';
import { QuestionEngine, StructuredQuestionResponse } from '../services/questionEngine';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface QuestionEngineViewProps {
  company: Company;
  events: CorporateEvent[];
  documents: Document[];
  evidenceList: Evidence[];
  legalSources: LegalSource[];
  onNavigateToDocument: (docId: string) => void;
}

export const QuestionEngineView: React.FC<QuestionEngineViewProps> = ({
  company,
  events,
  documents,
  evidenceList,
  legalSources,
  onNavigateToDocument
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<StructuredQuestionResponse | null>(null);

  const presetQueries = [
    'Who were the directors on 31 March 2025?',
    'What changed in the company’s ownership during 2024 and 2025?',
    'Who had authority to approve the borrowing of ₹5 Crore from HDFC Bank?',
    'What evidence supports the appointment of Anita Mehta?',
    'Are there any conflicting records or regulatory notices?'
  ];

  const handleAsk = async (questionText: string) => {
    if (!questionText.trim()) return;
    setLoading(true);
    setQuery(questionText);

    try {
      const res = await QuestionEngine.askQuestion(
        questionText,
        company,
        events,
        documents,
        evidenceList,
        legalSources
      );
      setResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Corporate Legal Question Engine
            </h1>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
              Context-Controlled AI Copilot
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Ask complex corporate legal questions. The engine converts natural language into structured graph queries, retrieves verified evidence, and outputs traceable findings.
          </p>
        </div>
      </div>

      {/* Query Input Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl space-y-3">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(query);
          }}
          className="flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Ask anything about corporate state, authority, events, ownership, or evidence..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-xs md:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full sm:w-auto rounded-xl bg-indigo-600 px-5 py-3 text-xs md:text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Graph...
              </span>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Ask Intelligence Engine</span>
              </>
            )}
          </button>
        </form>

        {/* Preset Prompt Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400">Sample Questions:</span>
          {presetQueries.map((pq, i) => (
            <button
              key={i}
              onClick={() => handleAsk(pq)}
              className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-[11px] text-slate-300 hover:border-slate-700 hover:text-white transition text-left"
            >
              {pq}
            </button>
          ))}
        </div>
      </div>

      {/* Structured AI Response Contract Display */}
      {response && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6 animate-in fade-in duration-200">
          {/* Header & Confidence Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300 font-mono">
                  Target: {response.parsed_parameters.target_object}
                </span>
                {response.parsed_parameters.target_time && (
                  <span className="rounded bg-sky-500/10 text-sky-400 font-mono px-2 py-0.5 border border-sky-500/20">
                    Time: {response.parsed_parameters.target_time}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-white mt-1">"{response.query}"</h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Intelligence Confidence</div>
                <div className="text-xs font-mono font-bold text-emerald-400">
                  {response.confidence.rating} ({response.confidence.score}%)
                </div>
              </div>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* 1. Concise Answer */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              1. Synthesized Intelligence Answer
            </div>
            <p className="text-sm font-semibold text-white leading-relaxed">{response.answer}</p>
          </div>

          {/* 2. Verified Corporate Facts */}
          <div className="space-y-2 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              2. Verified Corporate Facts ({response.facts.length})
            </div>
            <ul className="space-y-1.5 pl-2">
              {response.facts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Supporting Source Evidence (Clickable Citations) */}
          <div className="space-y-2 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
              <span>3. Primary Evidentiary Citations ({response.evidence.length})</span>
              <span className="text-[10px] text-slate-400 font-mono">Traceable to Document Location</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {response.evidence.map((ev, i) => (
                <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white truncate">{ev.source_title}</span>
                    <span className="text-[10px] text-sky-400 font-mono">Page {ev.page}</span>
                  </div>
                  <blockquote className="border-l-2 border-emerald-500 pl-2 text-[11px] italic text-slate-300 bg-slate-900/50 p-2 rounded">
                    "{ev.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between pt-1">
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                      {ev.verification_status}
                    </span>
                    <button
                      onClick={() => onNavigateToDocument(ev.document_id)}
                      className="text-[10px] text-sky-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Open Document</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Applicable Legal Sources */}
          {response.legal_sources.length > 0 && (
            <div className="space-y-2 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                4. Applicable Statutory Framework
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {response.legal_sources.map((ls, i) => (
                  <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                    <div className="font-bold text-white">{ls.title}</div>
                    <p className="text-[11px] text-slate-300">{ls.requirement}</p>
                    <div className="text-[10px] text-purple-300 font-mono">{ls.citation}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Analysis & Legal Reasoning */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              5. Legal Reasoning & Context Connection
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">{response.analysis}</p>
          </div>

          {/* 6. Conflicts & Uncertainties */}
          {(response.conflicts.length > 0 || response.uncertainties.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {response.conflicts.length > 0 && (
                <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-3.5 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Contradictions / Conflicts</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-rose-200 text-[11px]">
                    {response.conflicts.map((cf, i) => (
                      <li key={i}>{cf}</li>
                    ))}
                  </ul>
                </div>
              )}

              {response.uncertainties.length > 0 && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-3.5 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>Uncertainties / Missing Records</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-amber-200 text-[11px]">
                    {response.uncertainties.map((un, i) => (
                      <li key={i}>{un}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 7. Recommended Professional Action */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
              7. Recommended Professional Review Step
            </div>
            <ul className="space-y-1 pl-1">
              {response.recommended_review.map((rec, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-200 font-medium">
                  <ArrowRight className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
