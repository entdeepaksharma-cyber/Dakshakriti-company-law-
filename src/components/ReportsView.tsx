import React, { useState } from 'react';
import { Company, CorporateEvent, Document, Evidence, LegalSource, ComplianceItem } from '../types';
import { ReportGenerator, GeneratedReport } from '../services/reportGenerator';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface ReportsViewProps {
  company: Company;
  events: CorporateEvent[];
  documents: Document[];
  evidenceList: Evidence[];
  legalSources: LegalSource[];
  complianceItems: ComplianceItem[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  company,
  events,
  documents,
  evidenceList,
  legalSources,
  complianceItems
}) => {
  const [reportType, setReportType] = useState<GeneratedReport['report_type']>('CORPORATE_STATE');
  const [targetDate, setTargetDate] = useState('2026-03-31');
  const [compareDate, setCompareDate] = useState('2024-01-10');

  const [currentReport, setCurrentReport] = useState<GeneratedReport>(() => 
    ReportGenerator.generateReport(
      'CORPORATE_STATE',
      company,
      events,
      documents,
      evidenceList,
      legalSources,
      complianceItems,
      { targetDate: '2026-03-31', compareDate: '2024-01-10' }
    )
  );

  const handleGenerate = () => {
    const rep = ReportGenerator.generateReport(
      reportType,
      company,
      events,
      documents,
      evidenceList,
      legalSources,
      complianceItems,
      { targetDate, compareDate }
    );
    setCurrentReport(rep);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Corporate Legal Intelligence Report Generator
            </h1>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
              Stage 10 & 21 Traceable Dossiers
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Generate formal, auditable reports reconstructed from verified evidence, statutory rules, and temporal corporate state models.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Report Controls Form */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="CORPORATE_STATE">Corporate State Report</option>
              <option value="HISTORICAL_RECONSTRUCTION">Historical Reconstruction Report</option>
              <option value="DUE_DILIGENCE">Due Diligence Intelligence Report</option>
              <option value="EVENT_INTELLIGENCE">Corporate Event Intelligence Report</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">As-Of Date (T)</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {reportType === 'HISTORICAL_RECONSTRUCTION' && (
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Baseline Date (T1)</label>
              <input
                type="date"
                value={compareDate}
                onChange={(e) => setCompareDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleGenerate}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition shrink-0"
        >
          Generate Report
        </button>
      </div>

      {/* Report Paper Preview Container (Designed for Print & Screen) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 md:p-12 shadow-2xl space-y-8 max-w-4xl mx-auto print:bg-white print:text-black print:border-none print:p-0 print:shadow-none">
        {/* Document Header */}
        <div className="border-b-2 border-slate-700 print:border-black pb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase print:text-slate-700">
              DAKSHAKRITI • CORPORATE LEGAL INTELLIGENCE
            </span>
            <span className="text-[10px] font-mono text-slate-400 print:text-slate-600">
              Ref: {currentReport.report_id}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white print:text-black tracking-tight">
            {currentReport.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 print:text-slate-600 pt-1">
            <div>Company: <strong className="text-white print:text-black">{currentReport.company_name}</strong></div>
            <div>•</div>
            <div>Period: <strong className="text-white print:text-black">{currentReport.period}</strong></div>
            <div>•</div>
            <div>Generated: <span className="font-mono">{currentReport.generated_at}</span></div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="rounded-xl border border-indigo-500/30 bg-slate-950/80 p-5 space-y-2 print:border-slate-300 print:bg-slate-50">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-900">
            Executive Intelligence Summary
          </h2>
          <p className="text-xs md:text-sm text-slate-200 print:text-slate-800 leading-relaxed font-sans">
            {currentReport.executive_summary}
          </p>
        </div>

        {/* Report Sections */}
        <div className="space-y-6">
          {currentReport.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-sm font-bold text-white print:text-black pb-1 border-b border-slate-800 print:border-slate-300">
                {sec.heading}
              </h3>
              <p className="text-xs text-slate-300 print:text-slate-700 whitespace-pre-wrap leading-relaxed">
                {sec.content}
              </p>
              {sec.items && (
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-200 print:text-slate-800">
                  {sec.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Sources & Evidentiary Index */}
        <div className="space-y-3 pt-6 border-t border-slate-800 print:border-slate-300">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800">
            Evidentiary Source Index (Traceability Record)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {currentReport.sources_index.map((src, i) => (
              <div key={i} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1 print:border-slate-200 print:bg-slate-50">
                <div className="flex justify-between items-center text-[11px] font-bold text-white print:text-black">
                  <span>{src.title}</span>
                  <span className="text-[10px] text-sky-400 font-mono print:text-blue-700">Page {src.page}</span>
                </div>
                <div className="text-[10px] text-slate-400 italic line-clamp-2 print:text-slate-600">
                  "{src.evidence_quote}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Legal-Tech Disclaimer & Professional Boundary */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 text-[11px] text-slate-400 print:text-slate-600 print:border-slate-200 leading-relaxed space-y-1">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
            Statutory & Legal Safety Disclaimer
          </div>
          <p>{currentReport.limitations}</p>
        </div>
      </div>
    </div>
  );
};
