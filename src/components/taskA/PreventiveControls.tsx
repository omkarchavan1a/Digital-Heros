import React, { useState } from 'react';
import { ControlRule } from '../../types';
import { ShieldAlert, Clock, AlertTriangle, ArrowUpRight, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface PreventiveControlsProps {
  controls: ControlRule[];
  setControls: React.Dispatch<React.SetStateAction<ControlRule[]>>;
}

export const PreventiveControls: React.FC<PreventiveControlsProps> = ({
  controls,
  setControls,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [cadence, setCadence] = useState('Weekly');
  const [threshold, setThreshold] = useState('> 10% budget variance');
  const [signal, setSignal] = useState('Sprint burndown rate lags by 2 days');
  const [action, setAction] = useState('Escalate to Delivery Director');

  const handleAddControl = () => {
    if (!name.trim()) return;
    const newCtrl: ControlRule = {
      id: `ctrl-${Date.now()}`,
      controlName: name,
      cadence,
      varianceThreshold: threshold,
      triggerSignal: signal,
      escalationAction: action,
      owner: 'Delivery Lead',
    };
    setControls((prev) => [...prev, newCtrl]);
    setName('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setControls((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#FF4E00]" />
              <span>Preventive Delivery Controls Framework</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Exact cadence, quantitative thresholds, and trigger signals designed to catch delivery slippage before it impacts account profitability.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF4E00] hover:bg-[#1A1A1A] text-white font-display font-bold text-xs uppercase border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            Add Custom Control Rule
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 space-y-3 shadow-[3px_3px_0px_0px_#1A1A1A]">
          <h4 className="text-xs font-display font-bold text-[#1A1A1A] uppercase tracking-wider">
            Define New Delivery Control Rule
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono">
            <input
              type="text"
              placeholder="Control Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] p-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Cadence"
              value={cadence}
              onChange={(e) => setCadence(e.target.value)}
              className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] p-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Variance Threshold"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] p-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Trigger Signal"
              value={signal}
              onChange={(e) => setSignal(e.target.value)}
              className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] p-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Escalation Action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] p-2 focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 font-mono">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 text-xs text-[#1A1A1A] font-bold uppercase hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={handleAddControl}
              className="px-3 py-1 text-xs bg-[#1A1A1A] text-white font-display font-bold uppercase border-2 border-[#1A1A1A]"
            >
              Save Control Rule
            </button>
          </div>
        </div>
      )}

      {/* Control Rules Table */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1A1A]">
            <thead className="bg-[#1A1A1A] text-white font-mono font-bold uppercase text-[11px]">
              <tr>
                <th className="py-3 px-3">Control Mechanism</th>
                <th className="py-3 px-3">Cadence / Frequency</th>
                <th className="py-3 px-3">Variance Threshold</th>
                <th className="py-3 px-3">Exact Trigger Signal</th>
                <th className="py-3 px-3">Mandatory Escalation Action</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#1A1A1A]">
              {controls.map((ctrl) => (
                <tr key={ctrl.id} className="hover:bg-[#F2F1EF] transition-colors">
                  <td className="py-3.5 px-3 font-bold text-[#1A1A1A] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4E00] shrink-0" />
                    {ctrl.controlName}
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    <span className="flex items-center gap-1 text-[#1A1A1A] font-bold">
                      <Clock className="w-3.5 h-3.5 text-[#FF4E00]" />
                      {ctrl.cadence}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    <span className="px-2 py-0.5 border border-[#1A1A1A] bg-amber-100 text-amber-950 font-bold uppercase text-[10px]">
                      {ctrl.varianceThreshold}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-[#1A1A1A] font-mono text-[11px] max-w-xs font-medium">
                    {ctrl.triggerSignal}
                  </td>
                  <td className="py-3.5 px-3 text-[#1A1A1A] max-w-xs">
                    <span className="flex items-center gap-1 font-bold text-[#1A1A1A]">
                      <ArrowUpRight className="w-4 h-4 text-[#FF4E00] shrink-0" />
                      {ctrl.escalationAction}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleDelete(ctrl.id)}
                      className="text-[#1A1A1A] hover:text-red-600 p-1 transition-colors"
                      title="Delete Control"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Early Warning Signal Matrix */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4">
        <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#FF4E00]" />
          <span>Early Warning Escalation Signal Map (Green → Amber → Red)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-emerald-50 border-2 border-[#1A1A1A] p-4 space-y-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
            <div className="flex items-center justify-between font-bold text-emerald-950 uppercase">
              <span>GREEN: Normal Operations</span>
              <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px]">Variance &lt; 5%</span>
            </div>
            <p className="text-[#1A1A1A] text-[11px] font-sans font-medium leading-relaxed">
              Standard sprint cadence. Developers logging time accurately; client reviewing PRs within 24 hours.
            </p>
          </div>

          <div className="bg-amber-50 border-2 border-[#1A1A1A] p-4 space-y-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
            <div className="flex items-center justify-between font-bold text-amber-950 uppercase">
              <span>AMBER: Early Warning Flag</span>
              <span className="px-2 py-0.5 bg-amber-500 text-black text-[10px]">Variance 5% - 15%</span>
            </div>
            <p className="text-[#1A1A1A] text-[11px] font-sans font-medium leading-relaxed">
              Sprint burndown behind by 1.5 days or client silent on milestone review for &gt; 48h. PM initiates internal pod sync.
            </p>
          </div>

          <div className="bg-red-50 border-2 border-[#1A1A1A] p-4 space-y-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
            <div className="flex items-center justify-between font-bold text-red-950 uppercase">
              <span>RED: Mandatory Escalation</span>
              <span className="px-2 py-0.5 bg-red-600 text-white text-[10px]">Variance &gt; 15%</span>
            </div>
            <p className="text-[#1A1A1A] text-[11px] font-sans font-medium leading-relaxed">
              Budget burn exceeds milestone threshold or milestone invoice blocked. Immediately triggers Executive Escalation Notice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
