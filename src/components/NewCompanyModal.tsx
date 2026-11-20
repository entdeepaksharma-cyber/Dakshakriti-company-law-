import React, { useState } from 'react';
import { Company, CorporateType } from '../types';
import { X, Building2, CheckCircle2 } from 'lucide-react';

interface NewCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCompany: (company: Company) => void;
}

export const NewCompanyModal: React.FC<NewCompanyModalProps> = ({
  isOpen,
  onClose,
  onCreateCompany
}) => {
  const [legalName, setLegalName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [corporateType, setCorporateType] = useState<CorporateType>('Private Limited Company');
  const [incDate, setIncDate] = useState('2024-01-10');
  const [jurisdiction, setJurisdiction] = useState('Registrar of Companies, Delhi');
  const [address, setAddress] = useState('');
  const [authorizedCapital, setAuthorizedCapital] = useState('5000000');
  const [paidUpCapital, setPaidUpCapital] = useState('1000000');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!legalName || !identifier) return;

    const newComp: Company = {
      company_id: 'comp_' + Math.random().toString(36).substring(2, 9),
      legal_name: legalName,
      former_names: [],
      identifier: identifier.toUpperCase(),
      corporate_type: corporateType,
      incorporation_date: incDate,
      jurisdiction,
      registered_address: address || 'Corporate Headquarters, New Delhi',
      authorized_capital: parseFloat(authorizedCapital) || 5000000,
      paid_up_capital: parseFloat(paidUpCapital) || 1000000,
      status: 'Active',
      source_status: 'SOURCE_RECORD',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onCreateCompany(newComp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-sky-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Create Company Workspace
            </h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:text-white transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Legal Company Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Acme Tech Solutions Private Limited"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Corporate Identifier (CIN / LLPIN)</label>
              <input
                type="text"
                required
                placeholder="e.g. U72900DL2024PTC123456"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Corporate Type</label>
              <select
                value={corporateType}
                onChange={(e) => setCorporateType(e.target.value as any)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Private Limited Company">Private Limited Company</option>
                <option value="Public Limited Company">Public Limited Company</option>
                <option value="One Person Company">One Person Company</option>
                <option value="Section 8 Company">Section 8 Company</option>
                <option value="LLP">LLP</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Incorporation Date</label>
              <input
                type="date"
                required
                value={incDate}
                onChange={(e) => setIncDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Jurisdiction (ROC)</label>
              <input
                type="text"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Registered Office Address</label>
            <input
              type="text"
              placeholder="Full registered address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Authorized Capital (INR)</label>
              <input
                type="number"
                value={authorizedCapital}
                onChange={(e) => setAuthorizedCapital(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Initial Paid-up Capital (INR)</label>
              <input
                type="number"
                value={paidUpCapital}
                onChange={(e) => setPaidUpCapital(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-indigo-500 transition"
            >
              Create Company Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
