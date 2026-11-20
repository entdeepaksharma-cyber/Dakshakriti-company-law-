import React, { useState } from 'react';
import { Person, Role, Authority, Company } from '../types';
import { 
  Users, 
  KeyRound, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Calendar,
  Briefcase
} from 'lucide-react';

interface PeopleRolesViewProps {
  company: Company;
  people: Person[];
  roles: Role[];
  authorities: Authority[];
}

export const PeopleRolesView: React.FC<PeopleRolesViewProps> = ({
  company,
  people,
  roles,
  authorities
}) => {
  const [selectedPersonId, setSelectedPersonId] = useState<string>(people[0]?.person_id || '');

  const selectedPerson = people.find(p => p.person_id === selectedPersonId) || people[0];
  const personRoles = roles.filter(r => r.person_id === selectedPerson?.person_id);
  const personAuthorities = authorities.filter(a => a.person_id === selectedPerson?.person_id);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-sky-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">People, Roles & Authority Engine</h1>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-300">
              Person ≠ Role Architecture
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            A person’s legal identity remains separate from corporate roles and authorities held over time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: People Roster (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900 p-3 space-y-2 h-[680px] overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
            Associated Key Persons ({people.length})
          </div>
          {people.map(person => {
            const isSelected = person.person_id === selectedPersonId;
            const currentRole = roles.find(r => r.person_id === person.person_id);

            return (
              <div
                key={person.person_id}
                onClick={() => setSelectedPersonId(person.person_id)}
                className={`rounded-xl p-3.5 transition cursor-pointer border ${
                  isSelected 
                    ? 'border-indigo-500 bg-indigo-600/15 shadow-sm'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white">{person.full_name}</h3>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                    person.verification_status === 'HUMAN_VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    person.verification_status === 'DISPUTED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {person.verification_status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">{currentRole?.title || 'No active role'}</div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>DIN: {person.din || 'N/A'}</span>
                  <span>PAN: {person.pan || 'N/A'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Person Profile, Roles & Authorities (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6 shadow-xl h-[680px] overflow-y-auto">
          {selectedPerson && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="pb-4 border-b border-slate-800 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-400">
                      ID: {selectedPerson.person_id}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-mono">
                      DIN: {selectedPerson.din || 'Not Appointed'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">{selectedPerson.full_name}</h2>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Known Aliases: {selectedPerson.aliases.join(', ')}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedPerson.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {selectedPerson.status}
                  </span>
                </div>
              </div>

              {/* Roles History (Person + Role + Company + Effective Period) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-sky-400" />
                    <span>Role Timeline & Capacities ({personRoles.length})</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">Temporal Role Architecture</span>
                </div>

                <div className="space-y-2">
                  {personRoles.map(role => (
                    <div key={role.role_id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white">{role.title}</span>
                        <span className="font-mono text-sky-400 text-[11px]">
                          {role.start_date} → {role.end_date || 'Present'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>Role Type: <strong className="text-slate-300">{role.role_type}</strong></span>
                        <span>•</span>
                        <span>Company: {company.legal_name}</span>
                      </div>
                      <div className="pt-1 flex items-center gap-2">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          role.verification_status === 'HUMAN_VERIFIED' ? 'bg-emerald-500/10 text-emerald-400' :
                          role.verification_status === 'DISPUTED' ? 'bg-rose-500/10 text-rose-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {role.verification_status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Authorities (Who can act & on what basis?) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <KeyRound className="h-4 w-4 text-indigo-400" />
                    <span>Corporate Authorities & Delegations ({personAuthorities.length})</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">Authority Engine</span>
                </div>

                {personAuthorities.length > 0 ? (
                  <div className="space-y-2">
                    {personAuthorities.map(auth => (
                      <div key={auth.authority_id} className="rounded-xl border border-indigo-500/20 bg-indigo-950/10 p-4 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-indigo-200">{auth.scope}</span>
                          {auth.monetary_limit && (
                            <span className="font-mono font-bold text-emerald-400 text-[11px]">
                              Limit: ₹{(auth.monetary_limit / 100000).toFixed(0)} Lakhs
                            </span>
                          )}
                        </div>
                        {auth.limitations && (
                          <div className="text-[11px] text-slate-400">
                            <strong>Condition:</strong> {auth.limitations}
                          </div>
                        )}
                        <div className="text-[10px] text-slate-500 font-mono">
                          Legal Basis: {auth.legal_basis} (Effective: {auth.effective_start})
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic p-3 rounded-lg border border-slate-800 bg-slate-950/40">
                    No specific individual executive authority delegation recorded. General statutory rights only.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
