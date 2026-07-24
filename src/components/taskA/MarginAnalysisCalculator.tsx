import React, { useState } from 'react';
import { MarginScenario } from '../../types';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertOctagon,
  Check,
  X,
  PieChart,
  Calculator,
  RotateCcw,
} from 'lucide-react';

interface MarginAnalysisCalculatorProps {
  scenarios: MarginScenario[];
}

export const MarginAnalysisCalculator: React.FC<MarginAnalysisCalculatorProps> = ({
  scenarios,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scen-3');

  // Custom simulation state
  const [contractValue, setContractValue] = useState<number>(56250);
  const [totalProjectHours, setTotalProjectHours] = useState<number>(520);
  const [blendedCostRate, setBlendedCostRate] = useState<number>(78);
  const [unbilledMilestoneRelease, setUnbilledMilestoneRelease] = useState<number>(18750);

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[2];

  // Dynamic calculations based on simulation parameters
  const calculatedLaborCost = totalProjectHours * blendedCostRate;
  const calculatedGrossMarginDollars = contractValue - calculatedLaborCost;
  const calculatedGrossMarginPercent = Number(
    ((calculatedGrossMarginDollars / contractValue) * 100).toFixed(1)
  );

  const resetToDefaults = () => {
    setContractValue(56250);
    setTotalProjectHours(520);
    setBlendedCostRate(78);
    setUnbilledMilestoneRelease(18750);
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Intro header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#FF4E00]" />
              <span>Commercial Margin Analysis & Financial Scenario Modeling</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-1">
              Evaluating commercial impact across three operational choices, including the financial risk of absorbing the 40% overrun versus re-negotiating scope.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F2F1EF] p-1.5 border-2 border-[#1A1A1A] font-display font-bold">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScenarioId(s.id)}
                className={`px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                  selectedScenarioId === s.id
                    ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_0px_#FF4E00]'
                    : 'text-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                {s.name.split(':')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((s) => {
          const isSelected = s.id === selectedScenarioId;
          const isProposed = s.id === 'scen-3';

          return (
            <div
              key={s.id}
              onClick={() => setSelectedScenarioId(s.id)}
              className={`cursor-pointer border-2 border-[#1A1A1A] p-5 transition-all relative flex flex-col justify-between shadow-[4px_4px_0px_0px_#1A1A1A] ${
                isSelected
                  ? 'bg-white ring-2 ring-[#FF4E00]'
                  : 'bg-[#F2F1EF] hover:bg-white'
              }`}
            >
              {isProposed && (
                <span className="absolute -top-3 right-4 bg-[#FF4E00] text-white font-mono font-bold text-[10px] px-2.5 py-0.5 border-2 border-[#1A1A1A] uppercase tracking-wider shadow-[2px_2px_0px_0px_#1A1A1A]">
                  Recommended PM Path
                </span>
              )}

              <div>
                <h4 className="font-display font-bold text-sm text-[#1A1A1A] uppercase mb-1">{s.name}</h4>
                <p className="text-xs text-[#555] font-medium line-clamp-2 mb-4">{s.description}</p>

                <div className="bg-white rounded-none p-3 space-y-2 border-2 border-[#1A1A1A] mb-4 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#555]">Total Hours:</span>
                    <span className="font-bold text-[#1A1A1A]">{s.totalHours} hrs</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#555]">Labor Cost:</span>
                    <span className="font-bold text-[#1A1A1A]">${s.actualLaborCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1 border-t-2 border-[#1A1A1A]">
                    <span className="text-[#1A1A1A] font-bold">Gross Margin $:</span>
                    <span
                      className={`font-bold ${
                        s.grossMarginPercent < 10
                          ? 'text-red-600'
                          : s.grossMarginPercent < 25
                          ? 'text-amber-600'
                          : 'text-emerald-700'
                      }`}
                    >
                      ${s.grossMarginDollars.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#1A1A1A] font-bold">Gross Margin %:</span>
                    <span
                      className={`font-bold text-sm ${
                        s.grossMarginPercent < 10
                          ? 'text-red-600'
                          : s.grossMarginPercent < 25
                          ? 'text-amber-600'
                          : 'text-emerald-700'
                      }`}
                    >
                      {s.grossMarginPercent}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="font-mono font-bold text-[#1A1A1A] text-xs uppercase">Key Impact:</div>
                  <div className="space-y-1 font-medium">
                    {s.pros.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-emerald-900">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                    {s.cons.map((c, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-red-900">
                        <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-[#1A1A1A] flex justify-between items-center text-xs font-mono">
                <span className="text-[#555]">Client Risk Level:</span>
                <span
                  className={`font-bold px-2 py-0.5 text-[10px] uppercase border border-[#1A1A1A] ${
                    s.clientRiskLevel === 'Critical'
                      ? 'bg-red-600 text-white'
                      : s.clientRiskLevel === 'Medium'
                      ? 'bg-amber-500 text-black'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {s.clientRiskLevel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Financial Simulation Playground */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1A1A1A] pb-3">
          <div>
            <h4 className="font-display font-bold text-[#1A1A1A] text-sm uppercase flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#FF4E00]" />
              <span>Interactive Margin Simulator & Rate Sensitivity</span>
            </h4>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Adjust variables to test commercial scenarios against Digital Heroes' target 30% gross margin benchmark.
            </p>
          </div>

          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1A1A] hover:bg-[#FF4E00] text-white font-display font-bold text-xs uppercase border-2 border-[#1A1A1A] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-white" />
            Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono">
          <div className="space-y-1.5">
            <label className="text-xs text-[#1A1A1A] font-bold flex justify-between">
              <span>Contract Fixed Value ($)</span>
              <span className="font-bold text-[#FF4E00]">${contractValue.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="40000"
              max="80000"
              step="1250"
              value={contractValue}
              onChange={(e) => setContractValue(Number(e.target.value))}
              className="w-full accent-[#FF4E00] cursor-pointer h-2 bg-[#F2F1EF] border border-[#1A1A1A]"
            />
            <div className="text-[10px] text-[#555]">Original SOW: $56,250 (450h @ $125/h)</div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#1A1A1A] font-bold flex justify-between">
              <span>Project Hours Cap (hrs)</span>
              <span className="font-bold text-[#FF4E00]">{totalProjectHours} hrs</span>
            </label>
            <input
              type="range"
              min="450"
              max="700"
              step="10"
              value={totalProjectHours}
              onChange={(e) => setTotalProjectHours(Number(e.target.value))}
              className="w-full accent-[#FF4E00] cursor-pointer h-2 bg-[#F2F1EF] border border-[#1A1A1A]"
            />
            <div className="text-[10px] text-[#555]">Status Quo Overrun: 630 hrs (+40%)</div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#1A1A1A] font-bold flex justify-between">
              <span>Blended Cost Rate ($/hr)</span>
              <span className="font-bold text-[#FF4E00]">${blendedCostRate}/hr</span>
            </label>
            <input
              type="range"
              min="60"
              max="110"
              step="2"
              value={blendedCostRate}
              onChange={(e) => setBlendedCostRate(Number(e.target.value))}
              className="w-full accent-[#FF4E00] cursor-pointer h-2 bg-[#F2F1EF] border border-[#1A1A1A]"
            />
            <div className="text-[10px] text-[#555]">Offshore mix lowers cost from $85 to $78</div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#1A1A1A] font-bold flex justify-between">
              <span>Milestone Release ($)</span>
              <span className="font-bold text-emerald-700">${unbilledMilestoneRelease.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="37500"
              step="1875"
              value={unbilledMilestoneRelease}
              onChange={(e) => setUnbilledMilestoneRelease(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-[#F2F1EF] border border-[#1A1A1A]"
            />
            <div className="text-[10px] text-[#555]">Milestone 2 approval unblocks $18,750 cash</div>
          </div>
        </div>

        {/* Live Calculation Results Dashboard */}
        <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="border-r-2 border-[#1A1A1A] pr-4">
            <div className="text-xs text-[#555] font-bold uppercase">Calculated Labor Cost</div>
            <div className="text-xl font-bold text-[#1A1A1A] mt-0.5">
              ${calculatedLaborCost.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#555] mt-1 font-medium">
              {totalProjectHours} hrs × ${blendedCostRate}/hr
            </div>
          </div>

          <div className="border-r-2 border-[#1A1A1A] pr-4">
            <div className="text-xs text-[#555] font-bold uppercase">Simulated Gross Margin</div>
            <div className={`text-xl font-bold mt-0.5 ${calculatedGrossMarginPercent >= 25 ? 'text-emerald-700' : 'text-amber-700'}`}>
              ${calculatedGrossMarginDollars.toLocaleString()} ({calculatedGrossMarginPercent}%)
            </div>
            <div className="text-[11px] text-[#555] mt-1 font-medium">
              Agency Target: 30.0%
            </div>
          </div>

          <div>
            <div className="text-xs text-[#555] font-bold uppercase">Cash Flow Immediate Impact</div>
            <div className="text-xl font-bold text-emerald-700 mt-0.5">
              +${unbilledMilestoneRelease.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#555] mt-1 font-medium">
              Released upon Milestone 2 client sign-off
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

