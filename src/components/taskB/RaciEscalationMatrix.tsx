import React, { useState } from 'react';
import { RACIRow, EscalationTier } from '../../types';
import { Users, Clock, AlertOctagon, ShieldAlert, CheckCircle, Info } from 'lucide-react';

interface RaciEscalationMatrixProps {
  raciRows: RACIRow[];
  setRaciRows: React.Dispatch<React.SetStateAction<RACIRow[]>>;
  escalationTiers: EscalationTier[];
}

export const RaciEscalationMatrix: React.FC<RaciEscalationMatrixProps> = ({
  raciRows,
  setRaciRows,
  escalationTiers,
}) => {
  const [selectedPodFilter, setSelectedPodFilter] = useState<string>('all');

  const updateRACIValue = (
    rowId: string,
    podKey: 'devPod' | 'designPod' | 'marketingPod' | 'leadPM' | 'clientSponsor',
    newValue: 'R' | 'A' | 'C' | 'I' | '-'
  ) => {
    setRaciRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, [podKey]: newValue } : r))
    );
  };

  const getRaciBadgeStyle = (val: string) => {
    switch (val) {
      case 'R':
        return 'bg-[#FF4E00] text-white font-bold border border-[#1A1A1A]';
      case 'A':
        return 'bg-[#1A1A1A] text-white font-bold border border-[#1A1A1A]';
      case 'C':
        return 'bg-amber-100 text-amber-950 font-bold border border-[#1A1A1A]';
      case 'I':
        return 'bg-[#F2F1EF] text-[#555] font-bold border border-[#1A1A1A]';
      default:
        return 'bg-white text-gray-400 border border-gray-300';
    }
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FF4E00]" />
              <span>RACI Matrix & Multi-Timezone Escalation Matrix</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Clear accountability across 5 concurrent client projects spanning EST, GMT, and IST timezones with strict SLA response times.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-[11px] bg-[#F2F1EF] p-2 border-2 border-[#1A1A1A] font-mono shadow-[2px_2px_0px_0px_#1A1A1A]">
            <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#FF4E00] text-white font-bold">R</span> Responsible
            <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white font-bold">A</span> Accountable
            <span className="px-2 py-0.5 border border-[#1A1A1A] bg-amber-100 text-amber-950 font-bold">C</span> Consulted
            <span className="px-2 py-0.5 border border-[#1A1A1A] bg-white text-[#555] font-bold">I</span> Informed
          </div>
        </div>
      </div>

      {/* RACI Matrix Table */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4">
        <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">
          Project Governance RACI Matrix
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1A1A]">
            <thead className="bg-[#1A1A1A] text-white font-mono font-bold uppercase text-[11px]">
              <tr>
                <th className="py-3 px-3">Lifecycle Phase & Deliverable</th>
                <th className="py-3 px-3">Primary Timezone</th>
                <th className="py-3 px-3 text-center">Dev Pod</th>
                <th className="py-3 px-3 text-center">Design Pod</th>
                <th className="py-3 px-3 text-center">Marketing Pod</th>
                <th className="py-3 px-3 text-center">Lead PM</th>
                <th className="py-3 px-3 text-center">Client Sponsor</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#1A1A1A]">
              {raciRows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F2F1EF] transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-[#1A1A1A]">{row.taskPhase}</div>
                    <div className="text-[11px] text-[#555] font-medium mt-0.5">{row.deliverable}</div>
                  </td>
                  <td className="py-3.5 px-3 text-[#1A1A1A] font-mono font-bold">{row.primaryTimezone}</td>

                  {/* Dev Pod */}
                  <td className="py-3.5 px-3 text-center font-mono">
                    <select
                      value={row.devPod}
                      onChange={(e) => updateRACIValue(row.id, 'devPod', e.target.value as any)}
                      className={`px-2 py-1 text-xs focus:outline-none cursor-pointer font-bold ${getRaciBadgeStyle(
                        row.devPod
                      )}`}
                    >
                      <option value="R">R</option>
                      <option value="A">A</option>
                      <option value="C">C</option>
                      <option value="I">I</option>
                      <option value="-">-</option>
                    </select>
                  </td>

                  {/* Design Pod */}
                  <td className="py-3.5 px-3 text-center font-mono">
                    <select
                      value={row.designPod}
                      onChange={(e) => updateRACIValue(row.id, 'designPod', e.target.value as any)}
                      className={`px-2 py-1 text-xs focus:outline-none cursor-pointer font-bold ${getRaciBadgeStyle(
                        row.designPod
                      )}`}
                    >
                      <option value="R">R</option>
                      <option value="A">A</option>
                      <option value="C">C</option>
                      <option value="I">I</option>
                      <option value="-">-</option>
                    </select>
                  </td>

                  {/* Marketing Pod */}
                  <td className="py-3.5 px-3 text-center font-mono">
                    <select
                      value={row.marketingPod}
                      onChange={(e) =>
                        updateRACIValue(row.id, 'marketingPod', e.target.value as any)
                      }
                      className={`px-2 py-1 text-xs focus:outline-none cursor-pointer font-bold ${getRaciBadgeStyle(
                        row.marketingPod
                      )}`}
                    >
                      <option value="R">R</option>
                      <option value="A">A</option>
                      <option value="C">C</option>
                      <option value="I">I</option>
                      <option value="-">-</option>
                    </select>
                  </td>

                  {/* Lead PM */}
                  <td className="py-3.5 px-3 text-center font-mono">
                    <select
                      value={row.leadPM}
                      onChange={(e) => updateRACIValue(row.id, 'leadPM', e.target.value as any)}
                      className={`px-2 py-1 text-xs focus:outline-none cursor-pointer font-bold ${getRaciBadgeStyle(
                        row.leadPM
                      )}`}
                    >
                      <option value="R">R</option>
                      <option value="A">A</option>
                      <option value="C">C</option>
                      <option value="I">I</option>
                      <option value="-">-</option>
                    </select>
                  </td>

                  {/* Client Sponsor */}
                  <td className="py-3.5 px-3 text-center font-mono">
                    <select
                      value={row.clientSponsor}
                      onChange={(e) =>
                        updateRACIValue(row.id, 'clientSponsor', e.target.value as any)
                      }
                      className={`px-2 py-1 text-xs focus:outline-none cursor-pointer font-bold ${getRaciBadgeStyle(
                        row.clientSponsor
                      )}`}
                    >
                      <option value="R">R</option>
                      <option value="A">A</option>
                      <option value="C">C</option>
                      <option value="I">I</option>
                      <option value="-">-</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escalation Matrix & SLA Response Times */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4">
        <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#FF4E00]" />
          <span>Multi-Tier Escalation Matrix & SLA Response Times</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {escalationTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`border-2 border-[#1A1A1A] p-4 space-y-3 flex flex-col justify-between shadow-[2px_2px_0px_0px_#1A1A1A] ${
                idx === 2
                  ? 'bg-red-50'
                  : idx === 1
                  ? 'bg-amber-50'
                  : 'bg-[#F2F1EF]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 font-mono">
                  <span className="font-bold text-xs text-[#1A1A1A] font-display uppercase">{tier.tier}</span>
                  <span className="px-2 py-0.5 border border-[#1A1A1A] text-[10px] font-bold bg-[#FF4E00] text-white">
                    SLA: {tier.slaResponseTime}
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-[#555] text-[11px] font-bold block uppercase">
                      Trigger Condition:
                    </span>
                    <span className="text-[#1A1A1A] font-medium">{tier.triggerCondition}</span>
                  </div>

                  <div>
                    <span className="text-[#555] text-[11px] font-bold block uppercase">
                      Mandatory PM Action:
                    </span>
                    <span className="text-[#1A1A1A] font-medium">{tier.pmAction}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t-2 border-[#1A1A1A] text-[11px] flex justify-between items-center text-[#555] font-mono">
                <span>Escalates To:</span>
                <span className="font-bold text-[#FF4E00] uppercase">{tier.escalatesTo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
