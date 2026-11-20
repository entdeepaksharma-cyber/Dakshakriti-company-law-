import React, { useState } from 'react';
import { AuditLogEntry } from '../types';
import { 
  History, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  FileText,
  Filter
} from 'lucide-react';

interface AuditTrailViewProps {
  logs: AuditLogEntry[];
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({ logs }) => {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const filteredLogs = logs.filter(log => {
    if (actionFilter !== 'ALL' && log.action !== actionFilter) return false;
    if (search && !log.action.toLowerCase().includes(search.toLowerCase()) && !log.user_name.toLowerCase().includes(search.toLowerCase()) && !log.new_value.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Immutable Corporate Audit Trail
            </h1>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
              Stage 35 Trust & Auditability
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            WHO + WHAT + WHEN + WHY + EVIDENCE = AUDITABLE ACTION. All human verifications, extractions, and status alterations are permanently recorded.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search audit actions, users, objects or reasons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-1.5 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
        >
          <option value="ALL">All Actions</option>
          <option value="VERIFY_EVENT">VERIFY_EVENT</option>
          <option value="FLAG_CONFLICT">FLAG_CONFLICT</option>
          <option value="CREATE_WORKSPACE">CREATE_WORKSPACE</option>
          <option value="VERIFY_CHARGE">VERIFY_CHARGE</option>
          <option value="DOCUMENT_UPLOADED">DOCUMENT_UPLOADED</option>
        </select>
      </div>

      {/* Audit Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Timestamp (UTC/IST)</th>
                <th className="py-3 px-4">Professional User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Object</th>
                <th className="py-3 px-4">Transition Details</th>
                <th className="py-3 px-4">Justification / Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.audit_id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono text-[11px] text-sky-400 whitespace-nowrap">
                    {log.timestamp.replace('T', ' ').substring(0, 19)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{log.user_name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{log.user_role}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                    <div>{log.object_type}</div>
                    <div className="text-[10px] text-slate-500">{log.object_id}</div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    {log.old_value && (
                      <span className="text-[10px] text-slate-500 line-through mr-1.5">{log.old_value} →</span>
                    )}
                    <span className="font-medium text-slate-200">{log.new_value}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {log.reason || 'Standard operational verification'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
