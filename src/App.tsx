/**
 * Dakshakriti - Corporate Legal Intelligence Platform
 * Stage 1 to 36 Complete Architecture Implementation
 */

import React, { useState } from 'react';
import { 
  INITIAL_COMPANIES, 
  INITIAL_DOCUMENTS, 
  INITIAL_EVIDENCE, 
  INITIAL_CORPORATE_EVENTS, 
  INITIAL_LEGAL_SOURCES, 
  INITIAL_COMPLIANCE_ITEMS, 
  INITIAL_DUE_DILIGENCE_MATTERS, 
  INITIAL_RED_FLAGS, 
  INITIAL_VERIFICATION_ITEMS, 
  INITIAL_AUDIT_LOGS,
  INITIAL_PEOPLE,
  INITIAL_ROLES,
  INITIAL_AUTHORITIES,
  INITIAL_CONTRACTS,
  INITIAL_PROCEEDINGS,
  CURRENT_USER 
} from './data/mockData';
import { 
  Company, 
  CorporateEvent, 
  Document, 
  Evidence, 
  TrustStatus, 
  VerificationItem, 
  AuditLogEntry 
} from './types';
import { 
  LayoutDashboard, 
  Clock, 
  FileText, 
  Sparkles, 
  Menu,
  CheckCheck
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { TimelineView } from './components/TimelineView';
import { DocumentIntelligenceView } from './components/DocumentIntelligenceView';
import { EvidenceGraphView } from './components/EvidenceGraphView';
import { HistoricalStateView } from './components/HistoricalStateView';
import { PeopleRolesView } from './components/PeopleRolesView';
import { ComplianceView } from './components/ComplianceView';
import { DueDiligenceView } from './components/DueDiligenceView';
import { GovernanceView } from './components/GovernanceView';
import { ContractsView } from './components/ContractsView';
import { ProceedingsView } from './components/ProceedingsView';
import { LegalIntelligenceView } from './components/LegalIntelligenceView';
import { VerificationCentreView } from './components/VerificationCentreView';
import { QuestionEngineView } from './components/QuestionEngineView';
import { ReportsView } from './components/ReportsView';
import { AuditTrailView } from './components/AuditTrailView';
import { NewCompanyModal } from './components/NewCompanyModal';
import { UploadDocumentModal } from './components/UploadDocumentModal';
import { ProcessedDocumentResult } from './services/documentProcessor';

export default function App() {
  // Global State
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [selectedCompany, setSelectedCompany] = useState<Company>(INITIAL_COMPANIES[0]);
  const [currentView, setCurrentView] = useState<string>('dashboard');

  // Responsive Drawer & Collapse State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsedDesktop, setIsCollapsedDesktop] = useState(false);

  const [documents, setDocuments] = useState<Document[]>(INITIAL_DOCUMENTS);
  const [events, setEvents] = useState<CorporateEvent[]>(INITIAL_CORPORATE_EVENTS);
  const [evidenceList, setEvidenceList] = useState<Evidence[]>(INITIAL_EVIDENCE);
  const [verificationItems, setVerificationItems] = useState<VerificationItem[]>(INITIAL_VERIFICATION_ITEMS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [complianceList, setComplianceList] = useState(INITIAL_COMPLIANCE_ITEMS);
  const [redFlagsList, setRedFlagsList] = useState(INITIAL_RED_FLAGS);

  // Selected entities for drilldown
  const [selectedEvent, setSelectedEvent] = useState<CorporateEvent | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isNewCompanyOpen, setIsNewCompanyOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Helper to append audit log
  const logAuditAction = (action: string, objectType: string, objectId: string, newValue: string, oldValue?: string, reason?: string) => {
    const newLog: AuditLogEntry = {
      audit_id: 'aud_' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      user_name: CURRENT_USER.name,
      user_role: CURRENT_USER.role,
      action,
      object_type: objectType,
      object_id: objectId,
      old_value: oldValue,
      new_value: newValue,
      reason: reason || 'Professional action performed in workspace'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Actions
  const handleSelectEvent = (event: CorporateEvent | null) => {
    setSelectedEvent(event);
    if (event && currentView !== 'timeline') {
      setCurrentView('timeline');
    }
  };

  const handleNavigateToDocument = (docId: string) => {
    setSelectedDocId(docId);
    setCurrentView('documents');
  };

  const handleCreateCompany = (newComp: Company) => {
    setCompanies(prev => [newComp, ...prev]);
    setSelectedCompany(newComp);
    logAuditAction('CREATE_COMPANY', 'Company', newComp.company_id, `Created workspace for ${newComp.legal_name}`);
  };

  const handleDocumentProcessed = (result: ProcessedDocumentResult) => {
    setDocuments(prev => [result.document, ...prev]);
    setEvidenceList(prev => [...result.created_evidence, ...prev]);
    
    if (result.detected_events.length > 0) {
      const fullEvt = result.detected_events[0] as CorporateEvent;
      setEvents(prev => [fullEvt, ...prev]);
    }

    logAuditAction('DOCUMENT_UPLOADED', 'Document', result.document.document_id, `Ingested and processed ${result.document.title}`);
    setSelectedDocId(result.document.document_id);
    setCurrentView('documents');
  };

  const handleVerifyDocument = (docId: string, status: TrustStatus) => {
    setDocuments(prev => prev.map(d => d.document_id === docId ? { ...d, verification_status: status } : d));
    logAuditAction('VERIFY_DOCUMENT', 'Document', docId, status);
  };

  const handleVerifyEvidence = (evidenceId: string, status: TrustStatus) => {
    setEvidenceList(prev => prev.map(e => e.evidence_id === evidenceId ? { ...e, verification_status: status, reviewer: CURRENT_USER.name } : e));
    logAuditAction('VERIFY_EVIDENCE', 'Evidence', evidenceId, status);
  };

  const handleUpdateVerificationItem = (id: string, status: VerificationItem['status'], reason?: string) => {
    setVerificationItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    logAuditAction('VERIFY_QUEUE_ITEM', 'VerificationItem', id, status, undefined, reason);
  };

  const handleVerifyCompliance = (compId: string) => {
    setComplianceList(prev => prev.map(c => c.compliance_id === compId ? { ...c, status: 'VERIFIED', verification_status: 'HUMAN_VERIFIED' } : c));
    logAuditAction('VERIFY_COMPLIANCE', 'ComplianceItem', compId, 'VERIFIED', undefined, 'Compliance verified by CS');
  };

  // Calculations for badges
  const verifiedCount = evidenceList.filter(e => e.verification_status === 'HUMAN_VERIFIED' || e.verification_status === 'SOURCE_RECORD').length;
  const reviewCount = verificationItems.filter(i => i.status === 'NEEDS_REVIEW').length;
  const conflictCount = verificationItems.filter(i => i.status === 'DISPUTED' || i.category === 'DATE_CONFLICTS').length;
  const openIssuesCount = complianceList.filter(c => c.status === 'OVERDUE' || c.status === 'MISSING_EVIDENCE').length;

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white antialiased overflow-hidden">
      {/* Global Navbar */}
      <Navbar
        companies={companies}
        selectedCompany={selectedCompany}
        onSelectCompany={setSelectedCompany}
        currentUser={CURRENT_USER}
        onOpenNewCompany={() => setIsNewCompanyOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateTo={setCurrentView}
        verifiedCount={verifiedCount}
        reviewCount={reviewCount}
        conflictCount={conflictCount}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          reviewCount={reviewCount}
          conflictCount={conflictCount}
          openIssuesCount={openIssuesCount}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          isCollapsedDesktop={isCollapsedDesktop}
          onToggleCollapseDesktop={() => setIsCollapsedDesktop(prev => !prev)}
        />

        {/* Viewport Content Area */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-8 pt-4 md:pt-6 pb-24 md:pb-12">
          {currentView === 'dashboard' && (
            <DashboardView
              company={selectedCompany}
              events={events}
              documents={documents}
              evidenceList={evidenceList}
              complianceItems={complianceList}
              redFlags={redFlagsList}
              onNavigate={setCurrentView}
              onSelectEvent={handleSelectEvent}
            />
          )}

          {currentView === 'timeline' && (
            <TimelineView
              events={events}
              documents={documents}
              evidenceList={evidenceList}
              legalSources={INITIAL_LEGAL_SOURCES}
              selectedEvent={selectedEvent}
              onSelectEvent={setSelectedEvent}
              onNavigateToDocument={handleNavigateToDocument}
            />
          )}

          {currentView === 'history' && (
            <HistoricalStateView
              company={selectedCompany}
              events={events}
              people={INITIAL_PEOPLE}
              roles={INITIAL_ROLES}
              onSelectEvent={handleSelectEvent}
            />
          )}

          {currentView === 'documents' && (
            <DocumentIntelligenceView
              documents={documents}
              evidenceList={evidenceList}
              events={events}
              selectedDocumentId={selectedDocId}
              onOpenUpload={() => setIsUploadOpen(true)}
              onVerifyDocument={handleVerifyDocument}
              onVerifyEvidence={handleVerifyEvidence}
            />
          )}

          {currentView === 'evidence-graph' && (
            <EvidenceGraphView
              company={selectedCompany}
              events={events}
              documents={documents}
              evidenceList={evidenceList}
              legalSources={INITIAL_LEGAL_SOURCES}
              people={INITIAL_PEOPLE}
              onSelectEvent={handleSelectEvent}
              onNavigateToDocument={handleNavigateToDocument}
            />
          )}

          {currentView === 'people' && (
            <PeopleRolesView
              company={selectedCompany}
              people={INITIAL_PEOPLE}
              roles={INITIAL_ROLES}
              authorities={INITIAL_AUTHORITIES}
            />
          )}

          {currentView === 'authority' && (
            <PeopleRolesView
              company={selectedCompany}
              people={INITIAL_PEOPLE}
              roles={INITIAL_ROLES}
              authorities={INITIAL_AUTHORITIES}
            />
          )}

          {currentView === 'governance' && (
            <GovernanceView
              company={selectedCompany}
              people={INITIAL_PEOPLE}
              roles={INITIAL_ROLES}
            />
          )}

          {currentView === 'compliance' && (
            <ComplianceView
              company={selectedCompany}
              items={complianceList}
              legalSources={INITIAL_LEGAL_SOURCES}
              onVerifyCompliance={handleVerifyCompliance}
            />
          )}

          {currentView === 'contracts' && (
            <ContractsView
              company={selectedCompany}
              contracts={INITIAL_CONTRACTS}
            />
          )}

          {currentView === 'proceedings' && (
            <ProceedingsView
              company={selectedCompany}
              proceedings={INITIAL_PROCEEDINGS}
            />
          )}

          {currentView === 'due-diligence' && (
            <DueDiligenceView
              company={selectedCompany}
              matters={INITIAL_DUE_DILIGENCE_MATTERS}
              redFlags={redFlagsList}
              contracts={INITIAL_CONTRACTS}
              events={events}
              onGenerateReport={() => setCurrentView('reports')}
              onNavigateToDocument={handleNavigateToDocument}
            />
          )}

          {currentView === 'legal-knowledge' && (
            <LegalIntelligenceView
              sources={INITIAL_LEGAL_SOURCES}
            />
          )}

          {currentView === 'verification' && (
            <VerificationCentreView
              items={verificationItems}
              onUpdateItemStatus={handleUpdateVerificationItem}
            />
          )}

          {currentView === 'questions' && (
            <QuestionEngineView
              company={selectedCompany}
              events={events}
              documents={documents}
              evidenceList={evidenceList}
              legalSources={INITIAL_LEGAL_SOURCES}
              onNavigateToDocument={handleNavigateToDocument}
            />
          )}

          {currentView === 'reports' && (
            <ReportsView
              company={selectedCompany}
              events={events}
              documents={documents}
              evidenceList={evidenceList}
              legalSources={INITIAL_LEGAL_SOURCES}
              complianceItems={complianceList}
            />
          )}

          {currentView === 'audit' && (
            <AuditTrailView
              logs={auditLogs}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (md:hidden) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-slate-800 bg-slate-950/95 py-2 px-1 backdrop-blur">
        <button
          onClick={() => {
            setCurrentView('dashboard');
            setIsMobileSidebarOpen(false);
          }}
          className={`flex flex-col items-center gap-1 p-1 transition ${
            currentView === 'dashboard' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span className="text-[10px]">Overview</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('timeline');
            setIsMobileSidebarOpen(false);
          }}
          className={`flex flex-col items-center gap-1 p-1 transition ${
            currentView === 'timeline' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span className="text-[10px]">Timeline</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('documents');
            setIsMobileSidebarOpen(false);
          }}
          className={`flex flex-col items-center gap-1 p-1 transition ${
            currentView === 'documents' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span className="text-[10px]">Docs</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('questions');
            setIsMobileSidebarOpen(false);
          }}
          className={`flex flex-col items-center gap-1 p-1 transition ${
            currentView === 'questions' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-[10px]">Ask AI</span>
        </button>

        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className={`relative flex flex-col items-center gap-1 p-1 transition ${
            isMobileSidebarOpen ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu className="h-4 w-4" />
          <span className="text-[10px]">Menu</span>
          {(reviewCount > 0 || conflictCount > 0) && (
            <span className="absolute top-0 right-1 h-2 w-2 rounded-full bg-amber-400" />
          )}
        </button>
      </nav>

      {/* Modals */}
      <NewCompanyModal
        isOpen={isNewCompanyOpen}
        onClose={() => setIsNewCompanyOpen(false)}
        onCreateCompany={handleCreateCompany}
      />

      <UploadDocumentModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        companyId={selectedCompany.company_id}
        onDocumentProcessed={handleDocumentProcessed}
      />
    </div>
  );
}
