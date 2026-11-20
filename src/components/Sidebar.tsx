import React from 'react';
import { 
  LayoutDashboard, 
  Clock, 
  GitCommit, 
  FileText, 
  Network, 
  Users, 
  KeyRound, 
  Landmark, 
  CheckSquare, 
  Briefcase, 
  Scale, 
  AlertOctagon, 
  BookOpen, 
  CheckCheck, 
  HelpCircle, 
  FileSpreadsheet, 
  History,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  count?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  reviewCount: number;
  conflictCount: number;
  openIssuesCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsedDesktop: boolean;
  onToggleCollapseDesktop: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  reviewCount,
  conflictCount,
  openIssuesCount,
  isOpenMobile,
  onCloseMobile,
  isCollapsedDesktop,
  onToggleCollapseDesktop
}) => {
  const navSections: NavSection[] = [
    {
      title: 'Workspace Core',
      items: [
        { id: 'dashboard', label: 'Company Overview', icon: LayoutDashboard },
        { id: 'timeline', label: 'Corporate Timeline', icon: Clock },
        { id: 'history', label: 'Historical State & Diff', icon: GitCommit, badge: 'Time Machine' }
      ]
    },
    {
      title: 'Evidence & Knowledge',
      items: [
        { id: 'documents', label: 'Documents & OCR', icon: FileText, count: 12 },
        { id: 'evidence-graph', label: 'Evidence Graph', icon: Network },
        { id: 'people', label: 'People & Roles', icon: Users },
        { id: 'authority', label: 'Authority Engine', icon: KeyRound }
      ]
    },
    {
      title: 'Legal Operations',
      items: [
        { id: 'governance', label: 'Board & Governance', icon: Landmark },
        { id: 'compliance', label: 'Statutory Compliance', icon: CheckSquare, badge: openIssuesCount > 0 ? `${openIssuesCount} Due` : undefined },
        { id: 'contracts', label: 'Commercial Contracts', icon: Briefcase },
        { id: 'proceedings', label: 'Disputes & Proceedings', icon: Scale },
        { id: 'due-diligence', label: 'Due Diligence & Red Flags', icon: AlertOctagon, badge: conflictCount > 0 ? `${conflictCount} Red Flags` : undefined },
        { id: 'legal-knowledge', label: 'Companies Act 2013', icon: BookOpen }
      ]
    },
    {
      title: 'Professional Trust & Outputs',
      items: [
        { 
          id: 'verification', 
          label: 'Verification Centre', 
          icon: CheckCheck, 
          badge: reviewCount > 0 ? `${reviewCount} Queue` : undefined, 
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
        },
        { id: 'questions', label: 'Corporate Question AI', icon: HelpCircle },
        { id: 'reports', label: 'Intelligence Reports', icon: FileSpreadsheet },
        { id: 'audit', label: 'Immutable Audit Log', icon: History }
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div className="p-3 space-y-5 flex-1 overflow-y-auto">
        {/* Mobile Header with Close button */}
        <div className="flex md:hidden items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Navigation Menu</span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop Collapse Button Header */}
        <div className="hidden md:flex items-center justify-between px-1">
          {!isCollapsedDesktop && (
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Platform Modules
            </span>
          )}
          <button
            onClick={onToggleCollapseDesktop}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850 transition mx-auto md:mx-0"
            title={isCollapsedDesktop ? "Expand Sidebar" : "Minimize Sidebar"}
          >
            {isCollapsedDesktop ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isCollapsedDesktop && (
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {section.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    title={isCollapsedDesktop ? item.label : undefined}
                    className={`w-full flex items-center rounded-lg py-2 text-xs font-medium transition ${
                      isCollapsedDesktop ? 'justify-center px-2' : 'justify-between px-3'
                    } ${
                      isActive
                        ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                      {!isCollapsedDesktop && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsedDesktop && item.badge && (
                      <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-semibold border ${
                        item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {!isCollapsedDesktop && item.count !== undefined && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Trust Philosophy badge */}
      {!isCollapsedDesktop && (
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 m-2 rounded-xl shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Trust Principle</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 leading-snug">
            AI proposes. Rules validate. Source supports. Human verifies.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 1. Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden animate-in fade-in duration-150"
        />
      )}

      {/* 2. Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 p-2 shadow-2xl transition-transform duration-200 ease-in-out md:hidden ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </div>

      {/* 3. Desktop Sidebar */}
      <aside
        className={`hidden md:flex shrink-0 border-r border-slate-800 bg-slate-950 flex-col justify-between overflow-y-auto transition-all duration-200 ease-in-out ${
          isCollapsedDesktop ? 'w-16' : 'w-64'
        }`}
      >
        {navContent}
      </aside>
    </>
  );
};

