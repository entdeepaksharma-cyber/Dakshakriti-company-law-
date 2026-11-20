import React, { useState } from 'react';
import { DocumentProcessor, ProcessedDocumentResult } from '../services/documentProcessor';
import { Upload, X, FileText, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  onDocumentProcessed: (result: ProcessedDocumentResult) => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  companyId,
  onDocumentProcessed
}) => {
  const [docTitle, setDocTitle] = useState('');
  const [docText, setDocText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const sampleTemplates = [
    {
      title: 'Board Resolution for Branch Lease',
      text: `CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE BOARD OF DIRECTORS OF ABC PRIVATE LIMITED HELD ON 14TH OCTOBER 2025 AT REGISTERED OFFICE.
"RESOLVED THAT the Company do take on lease commercial office premises at Sector 62, Noida, Uttar Pradesh, and Mr. Rahul Sharma, Managing Director, be and is hereby authorized to execute the Lease Deed and pay security deposit of INR 12,00,000."
For ABC Private Limited,
Rahul Sharma (Director), Anita Mehta (Director).`
    },
    {
      title: 'Consent to Act as Director DIR-2',
      text: `FORM DIR-2 - CONSENT TO ACT AS A DIRECTOR OF A COMPANY
Pursuant to Section 152(5) of the Companies Act, 2013.
To: ABC Private Limited
I, Vikram Singh, hereby give my consent to act as Independent Director of ABC Private Limited with effect from 18th February 2025.
Director Identification Number (DIN): 06541299.
Declaration: I declare that I am not disqualified to become a director under Section 164 of the Companies Act, 2013.`
    },
    {
      title: 'Annual General Meeting Notice 2025',
      text: `NOTICE IS HEREBY GIVEN THAT THE FIRST ANNUAL GENERAL MEETING OF THE MEMBERS OF ABC PRIVATE LIMITED WILL BE HELD ON 28TH SEPTEMBER 2025 AT 11:00 AM AT REGISTERED OFFICE.
ORDINARY BUSINESS:
1. To receive, consider and adopt the Audited Financial Statements for the financial period ended 31st March 2025.
2. To regularize appointment of Ms. Anita Mehta as Director.
By Order of the Board of Directors.`
    }
  ];

  const handleSelectTemplate = (tpl: { title: string; text: string }) => {
    setDocTitle(tpl.title);
    setDocText(tpl.text);
  };

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docText.trim()) return;

    setProcessing(true);
    setStep(1); // Upload & validate

    setTimeout(async () => {
      setStep(2); // OCR & Entity extraction
      setTimeout(async () => {
        setStep(3); // Event & Evidence creation
        setTimeout(async () => {
          const result = await DocumentProcessor.processRawDocument(
            {
              name: docTitle ? `${docTitle}.pdf` : 'Corporate_Resolution.pdf',
              textContent: docText
            },
            companyId
          );
          onDocumentProcessed(result);
          setProcessing(false);
          onClose();
        }, 500);
      }, 500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Ingest Corporate Record & Run OCR Pipeline
            </h2>
          </div>
          <button 
            disabled={processing}
            onClick={onClose} 
            className="rounded-lg p-1 text-slate-400 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Templates selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick Ingest from Standard Templates:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {sampleTemplates.map((tpl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectTemplate(tpl)}
                className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white transition text-[11px]"
              >
                {tpl.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleProcess} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Record Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Board Resolution dated 14 Oct 2025"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Document Text / OCR Content
            </label>
            <textarea
              required
              rows={7}
              placeholder="Paste corporate document text or resolution clause..."
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs font-mono text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {processing && (
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  Running 10-Step Document Pipeline...
                </span>
                <span className="font-mono">Step {step}/3</span>
              </div>
              <div className="text-[10px] text-slate-400">
                {step === 1 && '1. File Validation, Hashing & Format Parsing...'}
                {step === 2 && '2. OCR, Document Classification & Entity Extraction...'}
                {step === 3 && '3. Event Detection, Evidence Mapping & Verification Gate...'}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              disabled={processing}
              onClick={onClose}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing || !docText.trim()}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-indigo-500 transition disabled:opacity-50 flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Process & Extract</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
