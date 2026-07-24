import React, { useState } from 'react';
import { ScopeItem, Milestone } from '../../types';
import {
  ShieldAlert,
  Scissors,
  CheckCircle,
  RefreshCw,
  Plus,
  Trash2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

interface RecoveryPlanBuilderProps {
  scopeItems: ScopeItem[];
  setScopeItems: React.Dispatch<React.SetStateAction<ScopeItem[]>>;
  milestones: Milestone[];
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;
}

export const RecoveryPlanBuilder: React.FC<RecoveryPlanBuilderProps> = ({
  scopeItems,
  setScopeItems,
  milestones,
  setMilestones,
}) => {
  const [filter, setFilter] = useState<'all' | 'ship' | 'cut' | 'renegotiate'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newHours, setNewHours] = useState(30);
  const [newAction, setNewAction] = useState<'ship' | 'cut' | 'renegotiate'>('ship');

  const filteredItems = scopeItems.filter((item) =>
    filter === 'all' ? true : item.action === filter
  );

  const totalOriginalHours = scopeItems.reduce((sum, i) => sum + i.originalEstimateHours, 0);
  const totalSpentHours = scopeItems.reduce((sum, i) => sum + i.spentHours, 0);
  const hoursShipped = scopeItems
    .filter((i) => i.action === 'ship')
    .reduce((sum, i) => sum + i.remainingHours, 0);
  const hoursCut = scopeItems
    .filter((i) => i.action === 'cut')
    .reduce((sum, i) => sum + i.remainingHours, 0);
  const hoursRenegotiated = scopeItems
    .filter((i) => i.action === 'renegotiate')
    .reduce((sum, i) => sum + i.remainingHours, 0);

  const toggleAction = (id: string, action: 'ship' | 'cut' | 'renegotiate') => {
    setScopeItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, action } : item))
    );
  };

  const handleAddScopeItem = () => {
    if (!newFeatureName.trim()) return;
    const newItem: ScopeItem = {
      id: `scope-${Date.now()}`,
      featureName: newFeatureName,
      originalEstimateHours: newHours,
      spentHours: 0,
      remainingHours: newHours,
      category: 'secondary',
      action: newAction,
      owner: 'Unassigned',
      rationale: 'User added scope item during recovery planning.',
    };
    setScopeItems((prev) => [...prev, newItem]);
    setNewFeatureName('');
    setShowAddModal(false);
  };

  const handleDeleteItem = (id: string) => {
    setScopeItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Context Alert Banner */}
      <div className="bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_0px_#FF4E00] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-[#FF4E00] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display font-bold text-white text-base uppercase tracking-wider">
              Current Crisis Summary (Day 1 Inheritance)
            </h4>
            <p className="text-gray-300 text-xs mt-1 font-medium leading-relaxed">
              Project is <strong className="text-[#FF4E00] font-bold uppercase">40% over budgeted hours</strong> (630 vs 450 target) and <strong className="text-[#FF4E00] font-bold uppercase">3 weeks behind schedule</strong>. Client has stopped approving Milestone 2 ($18,750). 2 of 4 developers are double-booked on another launch.
            </p>
          </div>
        </div>
      </div>

      {/* Scope Triage Header & Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-white border-2 border-[#1A1A1A] p-4 shadow-[3px_3px_0px_0px_#1A1A1A]">
          <div className="text-[#555] text-xs font-bold uppercase">Total Original Estimate</div>
          <div className="text-2xl font-display font-bold text-[#1A1A1A] mt-1">{totalOriginalHours} hrs</div>
          <div className="text-xs text-[#555] mt-1">Spent to Date: <span className="text-[#FF4E00] font-bold">{totalSpentHours} hrs</span></div>
        </div>

        <div className="bg-emerald-50 border-2 border-[#1A1A1A] p-4 shadow-[3px_3px_0px_0px_#1A1A1A]">
          <div className="text-emerald-800 text-xs font-bold uppercase flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Core MVP Scope (Ship)
          </div>
          <div className="text-2xl font-display font-bold text-emerald-950 mt-1">{hoursShipped} remaining hrs</div>
          <div className="text-xs text-emerald-700 font-medium mt-1">Focus for immediate launch</div>
        </div>

        <div className="bg-red-50 border-2 border-[#1A1A1A] p-4 shadow-[3px_3px_0px_0px_#1A1A1A]">
          <div className="text-red-800 text-xs font-bold uppercase flex items-center gap-1">
            <Scissors className="w-3.5 h-3.5 text-red-600" /> Trimmed Scope (Cut)
          </div>
          <div className="text-2xl font-display font-bold text-red-950 mt-1">{hoursCut} hrs removed</div>
          <div className="text-xs text-red-700 font-medium mt-1">Saves budget & developer burn</div>
        </div>

        <div className="bg-amber-50 border-2 border-[#1A1A1A] p-4 shadow-[3px_3px_0px_0px_#1A1A1A]">
          <div className="text-amber-800 text-xs font-bold uppercase flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600" /> Retainer Phase 2 (Renegotiate)
          </div>
          <div className="text-2xl font-display font-bold text-amber-950 mt-1">{hoursRenegotiated} hrs deferred</div>
          <div className="text-xs text-amber-800 font-medium mt-1">Converted into expansion revenue</div>
        </div>
      </div>

      {/* Scope Triage Table & Filters */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <span>a) Scope Triage Matrix (What Ships, Cuts, & Renegotiates)</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Click buttons to reclassify feature priorities and immediately see impact on remaining developer workload.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-1 flex text-xs font-display font-bold">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 uppercase ${
                  filter === 'all' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                All ({scopeItems.length})
              </button>
              <button
                onClick={() => setFilter('ship')}
                className={`px-3 py-1 uppercase ${
                  filter === 'ship' ? 'bg-emerald-600 text-white' : 'text-[#1A1A1A] hover:bg-emerald-600 hover:text-white'
                }`}
              >
                Ship
              </button>
              <button
                onClick={() => setFilter('cut')}
                className={`px-3 py-1 uppercase ${
                  filter === 'cut' ? 'bg-red-600 text-white' : 'text-[#1A1A1A] hover:bg-red-600 hover:text-white'
                }`}
              >
                Cut
              </button>
              <button
                onClick={() => setFilter('renegotiate')}
                className={`px-3 py-1 uppercase ${
                  filter === 'renegotiate' ? 'bg-[#FF4E00] text-white' : 'text-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                Renegotiate
              </button>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF4E00] hover:bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] font-display font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
              Add Scope Item
            </button>
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 mb-4 space-y-3 shadow-[3px_3px_0px_0px_#1A1A1A]">
            <h4 className="text-xs font-display font-bold text-[#1A1A1A] uppercase tracking-wider">
              Add New Scope Item
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Feature title"
                value={newFeatureName}
                onChange={(e) => setNewFeatureName(e.target.value)}
                className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] p-2 text-xs focus:outline-none"
              />
              <input
                type="number"
                placeholder="Hours estimate"
                value={newHours}
                onChange={(e) => setNewHours(Number(e.target.value))}
                className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] p-2 text-xs focus:outline-none"
              />
              <select
                value={newAction}
                onChange={(e) => setNewAction(e.target.value as any)}
                className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] p-2 text-xs focus:outline-none font-bold"
              >
                <option value="ship">Ship (Must-have)</option>
                <option value="cut">Cut (Trim from build)</option>
                <option value="renegotiate">Renegotiate (Phase 2 Retainer)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 text-xs text-[#1A1A1A] font-bold uppercase hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleAddScopeItem}
                className="px-3 py-1 text-xs bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] font-display font-bold uppercase"
              >
                Save Item
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1A1A]">
            <thead className="bg-[#1A1A1A] text-white font-mono font-bold uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Feature & Deliverable</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Spent / Est</th>
                <th className="py-2.5 px-3">Remaining</th>
                <th className="py-2.5 px-3">Owner Pod</th>
                <th className="py-2.5 px-3">Triage Action</th>
                <th className="py-2.5 px-3">PM Rationale</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#1A1A1A]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#F2F1EF] transition-colors">
                  <td className="py-3 px-3 font-bold text-[#1A1A1A]">
                    {item.featureName}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border-2 border-[#1A1A1A] ${
                        item.category === 'core'
                          ? 'bg-emerald-100 text-emerald-950'
                          : item.category === 'secondary'
                          ? 'bg-amber-100 text-amber-950'
                          : 'bg-violet-100 text-violet-950'
                      }`}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className="text-[#FF4E00] font-bold">{item.spentHours}h</span> / {item.originalEstimateHours}h
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-[#1A1A1A]">
                    {item.remainingHours}h
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px]">{item.owner}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 font-mono">
                      <button
                        onClick={() => toggleAction(item.id, 'ship')}
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase border border-[#1A1A1A] transition-all ${
                          item.action === 'ship'
                            ? 'bg-emerald-600 text-white shadow-[1px_1px_0px_0px_#1A1A1A]'
                            : 'bg-white text-[#1A1A1A] hover:bg-emerald-100'
                        }`}
                      >
                        Ship
                      </button>
                      <button
                        onClick={() => toggleAction(item.id, 'cut')}
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase border border-[#1A1A1A] transition-all ${
                          item.action === 'cut'
                            ? 'bg-red-600 text-white shadow-[1px_1px_0px_0px_#1A1A1A]'
                            : 'bg-white text-[#1A1A1A] hover:bg-red-100'
                        }`}
                      >
                        Cut
                      </button>
                      <button
                        onClick={() => toggleAction(item.id, 'renegotiate')}
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase border border-[#1A1A1A] transition-all ${
                          item.action === 'renegotiate'
                            ? 'bg-[#FF4E00] text-white shadow-[1px_1px_0px_0px_#1A1A1A]'
                            : 'bg-white text-[#1A1A1A] hover:bg-orange-100'
                        }`}
                      >
                        Phase 2
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#555] text-[11px] max-w-xs font-medium leading-normal">
                    {item.rationale}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-[#1A1A1A] hover:text-red-600 p-1 transition-colors"
                      title="Remove Scope Item"
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

      {/* Critical Path & Milestone Schedule Visualizer */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF4E00]" />
              <span>Revised Critical Path & Milestone Timeline</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Comparison between original schedule baseline, current delayed state, and proposed recovery target.
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-mono font-bold bg-[#1A1A1A] text-white border-2 border-[#1A1A1A]">
            Target Launch: Week 13 (Fixed Date)
          </span>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`border-2 border-[#1A1A1A] p-4 flex flex-col justify-between transition-all shadow-[3px_3px_0px_0px_#1A1A1A] ${
                m.status === 'blocked'
                  ? 'bg-red-50'
                  : m.status === 'approved'
                  ? 'bg-emerald-50'
                  : m.status === 'in_progress'
                  ? 'bg-amber-50'
                  : 'bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 font-mono">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase border border-[#1A1A1A] ${
                      m.status === 'blocked'
                        ? 'bg-red-600 text-white'
                        : m.status === 'approved'
                        ? 'bg-emerald-600 text-white'
                        : m.status === 'in_progress'
                        ? 'bg-[#FF4E00] text-white'
                        : 'bg-gray-200 text-[#1A1A1A]'
                    }`}
                  >
                    {m.status.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-[#555] font-bold">
                    {m.budgetedHours} hrs
                  </span>
                </div>

                <h4 className="font-display font-bold text-[#1A1A1A] text-xs line-clamp-2 uppercase">
                  {m.title}
                </h4>

                <div className="mt-3 space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between text-[#555]">
                    <span>Original Due:</span>
                    <span className="text-[#1A1A1A] font-bold">{m.originalDueDate}</span>
                  </div>
                  <div className="flex justify-between text-[#555]">
                    <span>Revised Target:</span>
                    <span className="text-[#FF4E00] font-bold">{m.revisedDueDate}</span>
                  </div>
                  <div className="flex justify-between text-[#555]">
                    <span>Actual Spent:</span>
                    <span className={m.actualHours > m.budgetedHours ? 'text-red-600 font-bold' : 'text-[#1A1A1A] font-bold'}>
                      {m.actualHours} hrs
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-[#1A1A1A]">
                <div className="text-[10px] text-[#555] font-bold uppercase mb-1 font-mono">Deliverables:</div>
                <ul className="space-y-1">
                  {m.deliverables.map((d, idx) => (
                    <li key={idx} className="text-[11px] text-[#1A1A1A] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#FF4E00] border border-[#1A1A1A]" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
