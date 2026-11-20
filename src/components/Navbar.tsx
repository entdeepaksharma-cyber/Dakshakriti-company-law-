import React, { useState } from 'react';
import { Company, User } from '../types';
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  FileCheck2, 
  Plus, 
  ChevronDown,
  UserCheck,
  CheckCircle2,
  Clock,
  Menu
} from 'lucide-react';

interface NavbarProps {
  companies: Company[];
  selectedCompany: Company;
  onSelectCompany: (company: Company) => void;
  currentUser: User;
  onOpenNewCompany: () => void;
  onOpenUpload: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateTo: (view: string) => void;
  verifiedCount: number;
  reviewCount: number;
  conflictCount: number;
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  companies,
  selectedCompany,
  onSelectCompany,
  currentUser,
  onOpenNewCompany,
  onOpenUpload,
  searchQuery,
  onSearchChange,
  onNavigateTo,
  verifiedCount,
  reviewCount,
  conflictCount,
  onToggleMobileSidebar
}) => {
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-950/90 px-3 md:px-6 backdrop-blur">
      {/* Left: Hamburger (Mobile) + Branding & Company Selector */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="flex md:hidden p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5 text-indigo-400" />
        </button>

        <div 
          onClick={() => onNavigateTo('dashboard')} 
          className="flex cursor-pointer items-center gap-2 transition hover:opacity-90"
        >
          <div className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white text-xs md:text-sm">DAKSHAKRITI</span>
              <span className="hidden sm:inline rounded bg-indigo-500/10 px-1.5 py-0.5 text-[9px] md:text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">LEGAL OS</span>
            </div>
            <p className="text-[9px] md:text-[10px] text-slate-400 hidden xs:block">Corporate Legal Intelligence</p>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-800 hidden md:block" />

        {/* Company Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCompanyMenu(!showCompanyMenu)}
            className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-slate-800 bg-slate-900 px-2 sm:px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800/80"
          >
            <Building2 className="h-3.5 w-3.5 text-sky-400 shrink-0" />
            <span className="max-w-[80px] xs:max-w-[110px] sm:max-w-[160px] md:max-w-[200px] truncate font-semibold">
              {selectedCompany.legal_name}
            </span>
            <span className="hidden sm:inline-block rounded bg-emerald-500/10 px-1.5 py-0.2 text-[9px] text-emerald-400 font-mono">
              {selectedCompany.status}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          </button>

          {showCompanyMenu && (
            <div className="absolute left-0 mt-2 w-72 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-2 py-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Select Company Workspace
              </div>
              <div className="mt-1 space-y-1">
                {companies.map(c => (
                  <button
                    key={c.company_id}
                    onClick={() => {
                      onSelectCompany(c);
                      setShowCompanyMenu(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                      c.company_id === selectedCompany.company_id
                        ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="truncate">{c.legal_name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{c.identifier}</div>
                    </div>
                    {c.company_id === selectedCompany.company_id && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="my-2 border-t border-slate-800" />

              <button
                onClick={() => {
                  setShowCompanyMenu(false);
                  onOpenNewCompany();
                }}
                className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-sky-400 hover:bg-sky-500/10 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create New Company Workspace</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Universal Search Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search Who + What + When + Where (e.g. Rahul Sharma, Share Transfer, DIR-12, NCLT)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/90 py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 transition focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Right: Trust Status Pills, Quick Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Verification & Conflict Indicators */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => onNavigateTo('verification')}
            className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/20 transition"
            title="Verified Evidence Items"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>{verifiedCount} Verified</span>
          </button>

          <button
            onClick={() => onNavigateTo('verification')}
            className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300 hover:bg-amber-500/20 transition"
            title="Items requiring professional review"
          >
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span>{reviewCount} In Review</span>
          </button>

          {conflictCount > 0 && (
            <button
              onClick={() => onNavigateTo('verification')}
              className="flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-300 hover:bg-rose-500/20 transition animate-pulse"
              title="Conflicting records detected across documents"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
              <span>{conflictCount} Conflict{conflictCount > 1 ? 's' : ''}</span>
            </button>
          )}
        </div>

        {/* Upload Records Button */}
        <button
          onClick={onOpenUpload}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow transition hover:bg-indigo-500 active:scale-95"
        >
          <FileCheck2 className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Ingest Record</span>
        </button>

        {/* User Role Pill */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-sky-400 font-bold text-[10px]">
            DS
          </div>
          <div className="hidden xl:block text-left leading-tight">
            <div className="font-semibold text-slate-200 text-[11px]">{currentUser.name}</div>
            <div className="text-[9px] text-slate-400">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
