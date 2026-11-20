import React, { useState } from 'react';
import { Company, CorporateEvent, Document, Evidence, LegalSource, Person } from '../types';
import { 
  Network, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Filter, 
  Info, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';

interface EvidenceGraphViewProps {
  company: Company;
  events: CorporateEvent[];
  documents: Document[];
  evidenceList: Evidence[];
  legalSources: LegalSource[];
  people: Person[];
  onSelectEvent: (event: CorporateEvent) => void;
  onNavigateToDocument: (docId: string) => void;
}

export const EvidenceGraphView: React.FC<EvidenceGraphViewProps> = ({
  company,
  events,
  documents,
  evidenceList,
  legalSources,
  people,
  onSelectEvent,
  onNavigateToDocument
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('comp_abc');
  const [activePathFilter, setActivePathFilter] = useState<'ALL' | 'PATH_1_EVENT' | 'PATH_2_STATE' | 'PATH_3_AUTHORITY'>('ALL');

  // Define Graph Nodes
  interface GraphNode {
    id: string;
    label: string;
    type: 'COMPANY' | 'PERSON' | 'EVENT' | 'DOCUMENT' | 'EVIDENCE' | 'LEGAL_SOURCE';
    x: number;
    y: number;
    sublabel?: string;
    status?: string;
    docId?: string;
    eventId?: string;
  }

  interface GraphLink {
    source: string;
    target: string;
    label: string;
  }

  // Pre-calculated aesthetic 2D coordinates for the interactive canvas
  const nodes: GraphNode[] = [
    // Center: Company
    { id: 'comp_abc', label: company.legal_name, type: 'COMPANY', x: 400, y: 300, sublabel: company.identifier, status: 'Active' },
    
    // People (Left side)
    { id: 'per_rahul', label: 'Rahul Sharma', type: 'PERSON', x: 180, y: 160, sublabel: 'Managing Director & Promoter', status: 'HUMAN_VERIFIED' },
    { id: 'per_priya', label: 'Priya Mehta', type: 'PERSON', x: 180, y: 280, sublabel: 'Ex-Director / 15% Shareholder', status: 'DISPUTED' },
    { id: 'per_anita', label: 'Anita Mehta', type: 'PERSON', x: 180, y: 400, sublabel: 'Additional Director', status: 'HUMAN_VERIFIED' },
    { id: 'per_sunil', label: 'Sunil Kapoor', type: 'PERSON', x: 180, y: 500, sublabel: 'Investor (25%)', status: 'NEEDS_REVIEW' },

    // Corporate Events (Center Right)
    { id: 'evt_inc', label: 'Incorporation', type: 'EVENT', x: 400, y: 120, sublabel: '10 Jan 2024', status: 'HUMAN_VERIFIED', eventId: 'evt_001_inc' },
    { id: 'evt_dir_app', label: 'Appoint Anita Mehta', type: 'EVENT', x: 580, y: 160, sublabel: '12 Mar 2024', status: 'HUMAN_VERIFIED', eventId: 'evt_002_dir_app' },
    { id: 'evt_rights', label: 'Rights Issue Allotment', type: 'EVENT', x: 620, y: 260, sublabel: '20 Jun 2024 (₹25L)', status: 'HUMAN_VERIFIED', eventId: 'evt_003_share_issue' },
    { id: 'evt_trans', label: 'Share Transfer (25%)', type: 'EVENT', x: 620, y: 360, sublabel: '15 Sep 2024', status: 'HUMAN_VERIFIED', eventId: 'evt_004_share_transfer' },
    { id: 'evt_resig', label: 'Priya Resignation', type: 'EVENT', x: 400, y: 480, sublabel: '10/15 Jan 2025 (Conflict)', status: 'DISPUTED', eventId: 'evt_005_dir_resig' },
    { id: 'evt_loan', label: 'HDFC Loan & Charge', type: 'EVENT', x: 580, y: 460, sublabel: '12 Aug 2025 (₹5 Cr)', status: 'HUMAN_VERIFIED', eventId: 'evt_008_charge' },
    { id: 'evt_nclt', label: 'NCLT Status Quo Order', type: 'EVENT', x: 400, y: 620, sublabel: '20 Feb 2026', status: 'SOURCE_RECORD', eventId: 'evt_010_nclt_petition' },

    // Primary Documents & Evidence (Far Right)
    { id: 'doc_coi', label: 'Certificate of Inc (D001)', type: 'DOCUMENT', x: 800, y: 120, sublabel: 'Registrar of Companies', docId: 'doc_001_inc' },
    { id: 'doc_sh4', label: 'Share Transfer Deed (D007)', type: 'DOCUMENT', x: 840, y: 360, sublabel: 'Form SH-4 Deed', docId: 'doc_007_share_transfer' },
    { id: 'doc_chg2', label: 'Charge Certificate (D010)', type: 'DOCUMENT', x: 820, y: 480, sublabel: 'Form CHG-2 (₹5 Cr)', docId: 'doc_010_charge_chg1' },
    { id: 'doc_order', label: 'NCLT Interim Order (D012)', type: 'DOCUMENT', x: 650, y: 640, sublabel: 'Bench-III Order', docId: 'doc_012_nclt_order' },

    // Statutory Legal Sources
    { id: 'leg_s149', label: 'Companies Act Sec 149/161', type: 'LEGAL_SOURCE', x: 650, y: 70, sublabel: 'Director Qualifications' },
    { id: 'leg_s56', label: 'Companies Act Sec 56', type: 'LEGAL_SOURCE', x: 850, y: 260, sublabel: 'Securities Transfer' },
    { id: 'leg_s77', label: 'Companies Act Sec 77', type: 'LEGAL_SOURCE', x: 850, y: 570, sublabel: 'Charge Registration' },
    { id: 'leg_s241', label: 'Companies Act Sec 241/242', type: 'LEGAL_SOURCE', x: 220, y: 620, sublabel: 'Oppression Relief' }
  ];

  const links: GraphLink[] = [
    { source: 'per_rahul', target: 'comp_abc', label: 'MANAGING_DIRECTOR' },
    { source: 'per_priya', target: 'comp_abc', label: 'EX_DIRECTOR / 15% SH' },
    { source: 'per_anita', target: 'comp_abc', label: 'ADDITIONAL_DIRECTOR' },
    { source: 'per_sunil', target: 'comp_abc', label: '25% SHAREHOLDER' },

    { source: 'comp_abc', target: 'evt_inc', label: 'FORMED_BY' },
    { source: 'evt_inc', target: 'doc_coi', label: 'EVIDENCED_BY' },
    { source: 'per_anita', target: 'evt_dir_app', label: 'APPOINTED_IN' },
    { source: 'evt_dir_app', target: 'leg_s149', label: 'GOVERNED_BY' },

    { source: 'per_priya', target: 'evt_trans', label: 'TRANSFEROR' },
    { source: 'per_sunil', target: 'evt_trans', label: 'TRANSFEREE' },
    { source: 'evt_trans', target: 'doc_sh4', label: 'EVIDENCED_BY' },
    { source: 'evt_trans', target: 'leg_s56', label: 'GOVERNED_BY' },

    { source: 'per_priya', target: 'evt_resig', label: 'RESIGNED_FROM' },
    { source: 'per_rahul', target: 'evt_loan', label: 'AUTHORIZED_SIGNATORY' },
    { source: 'evt_loan', target: 'doc_chg2', label: 'EVIDENCED_BY' },
    { source: 'evt_loan', target: 'leg_s77', label: 'GOVERNED_BY' },

    { source: 'per_priya', target: 'evt_nclt', label: 'PETITIONER' },
    { source: 'comp_abc', target: 'evt_nclt', label: 'RESPONDENT' },
    { source: 'evt_nclt', target: 'doc_order', label: 'ORDER_RECORDED' },
    { source: 'evt_nclt', target: 'leg_s241', label: 'INVOKED_STATUTE' }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];
  const connectedLinks = links.filter(l => l.source === selectedNodeId || l.target === selectedNodeId);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Corporate Legal Knowledge Graph
            </h1>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
              Multi-Hop Relationship Network
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Relational intelligence graph connecting corporate entities, officers, authority delegations, documents, evidentiary passages, and governing statutes.
          </p>
        </div>

        {/* Signature Graph Path Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-slate-400 mr-1">Signature Paths:</span>
          <button
            onClick={() => setActivePathFilter('PATH_1_EVENT')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              activePathFilter === 'PATH_1_EVENT' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Path 1: Event → Evidence
          </button>
          <button
            onClick={() => setActivePathFilter('PATH_3_AUTHORITY')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              activePathFilter === 'PATH_3_AUTHORITY' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Path 3: Person → Authority
          </button>
          <button
            onClick={() => setActivePathFilter('ALL')}
            className={`px-2 py-1 rounded text-xs font-semibold transition ${
              activePathFilter === 'ALL' ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            Full Graph
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
        {/* SVG Graph Visualizer (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <Layers className="h-3.5 w-3.5 text-indigo-400" />
              Interactive Entity Canvas • Click any node to inspect provenance
            </span>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500" /> Company</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-500" /> People</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Events</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-purple-500" /> Statutes</span>
            </div>
          </div>

          <div className="flex-1 w-full overflow-auto">
            <svg viewBox="0 0 950 720" className="w-full h-full min-h-[560px]">
              {/* Render Connections */}
              {links.map((link, idx) => {
                const s = nodes.find(n => n.id === link.source);
                const t = nodes.find(n => n.id === link.target);
                if (!s || !t) return null;
                const isConnectedToSelected = s.id === selectedNodeId || t.id === selectedNodeId;

                return (
                  <g key={idx}>
                    <line
                      x1={s.x}
                      y1={s.y}
                      x2={t.x}
                      y2={t.y}
                      stroke={isConnectedToSelected ? '#818cf8' : '#334155'}
                      strokeWidth={isConnectedToSelected ? 2.5 : 1}
                      strokeDasharray={isConnectedToSelected ? undefined : '4 2'}
                      opacity={isConnectedToSelected ? 1 : 0.6}
                    />
                    {isConnectedToSelected && (
                      <text
                        x={(s.x + t.x) / 2}
                        y={(s.y + t.y) / 2 - 4}
                        fill="#cbd5e1"
                        fontSize="9"
                        fontFamily="monospace"
                        textAnchor="middle"
                        className="select-none"
                      >
                        {link.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Render Nodes */}
              {nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                let fill = '#1e293b';
                let stroke = '#475569';
                let radius = 24;

                if (node.type === 'COMPANY') {
                  fill = '#312e81';
                  stroke = '#818cf8';
                  radius = 32;
                } else if (node.type === 'PERSON') {
                  fill = '#0c4a6e';
                  stroke = '#38bdf8';
                  radius = 24;
                } else if (node.type === 'EVENT') {
                  fill = node.status === 'DISPUTED' ? '#881337' : '#064e3b';
                  stroke = node.status === 'DISPUTED' ? '#fb7185' : '#34d399';
                  radius = 26;
                } else if (node.type === 'DOCUMENT') {
                  fill = '#3f3f46';
                  stroke = '#a1a1aa';
                  radius = 22;
                } else if (node.type === 'LEGAL_SOURCE') {
                  fill = '#581c87';
                  stroke = '#c084fc';
                  radius = 24;
                }

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="cursor-pointer transition-all hover:opacity-90"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius}
                      fill={fill}
                      stroke={isSelected ? '#ffffff' : stroke}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-all duration-150"
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {node.label.length > 12 ? node.label.substring(0, 11) + '..' : node.label}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + radius + 12}
                      fill="#94a3b8"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {node.type}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Node Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl flex flex-col justify-between h-[620px] overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <span className="rounded bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-400">
                NODE INSPECTION • {selectedNode.type}
              </span>
              <h2 className="text-base font-bold text-white mt-1">{selectedNode.label}</h2>
              {selectedNode.sublabel && (
                <div className="text-xs text-slate-400 font-mono mt-0.5">{selectedNode.sublabel}</div>
              )}
            </div>

            {/* Node Status Badge */}
            {selectedNode.status && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Trust State:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  selectedNode.status === 'HUMAN_VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  selectedNode.status === 'DISPUTED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                  'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                }`}>
                  {selectedNode.status}
                </span>
              </div>
            )}

            {/* Direct Relationships */}
            <div className="space-y-2 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Direct Connections ({connectedLinks.length})
              </div>
              <div className="space-y-1.5">
                {connectedLinks.map((link, idx) => {
                  const targetId = link.source === selectedNode.id ? link.target : link.source;
                  const targetNode = nodes.find(n => n.id === targetId);
                  return (
                    <div
                      key={idx}
                      onClick={() => targetNode && setSelectedNodeId(targetNode.id)}
                      className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/70 hover:bg-slate-800/80 cursor-pointer transition flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-200">{targetNode?.label}</div>
                        <div className="text-[10px] text-sky-400 font-mono">{link.label}</div>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono uppercase">{targetNode?.type}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Node Quick Action / Jump */}
            {selectedNode.docId && (
              <div className="pt-2">
                <button
                  onClick={() => onNavigateToDocument(selectedNode.docId!)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open Linked Document</span>
                </button>
              </div>
            )}

            {selectedNode.eventId && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    const evt = events.find(e => e.event_id === selectedNode.eventId);
                    if (evt) onSelectEvent(evt);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-300 hover:bg-sky-500/20 transition"
                >
                  <span>Inspect Event in Timeline</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Philosophy footer */}
          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400">
            A company is a living network of corporate decisions, evidence, and statutory obligations across time.
          </div>
        </div>
      </div>
    </div>
  );
};
