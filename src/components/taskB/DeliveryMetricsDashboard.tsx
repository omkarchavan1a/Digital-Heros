import React, { useState } from 'react';
import { HealthMetric } from '../../types';
import { Activity, AlertTriangle, CheckCircle2, TrendingDown, BellRing, Settings2 } from 'lucide-react';

interface DeliveryMetricsDashboardProps {
  metrics: HealthMetric[];
  setMetrics: React.Dispatch<React.SetStateAction<HealthMetric[]>>;
}

export const DeliveryMetricsDashboard: React.FC<DeliveryMetricsDashboardProps> = ({
  metrics,
  setMetrics,
}) => {
  const handleMetricValueChange = (id: string, newVal: number) => {
    setMetrics((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;

        // Auto evaluate status based on thresholds
        let status: 'healthy' | 'warning' | 'critical' = 'healthy';
        if (m.code === 'SPI' || m.code === 'CPI' || m.code === 'CSAT') {
          if (newVal <= m.criticalThreshold) status = 'critical';
          else if (newVal <= m.warningThreshold) status = 'warning';
        } else if (m.code === 'CUR' || m.code === 'UMR') {
          if (newVal >= m.criticalThreshold) status = 'critical';
          else if (newVal >= m.warningThreshold) status = 'warning';
        }

        return { ...m, currentValue: newVal, status };
      })
    );
  };

  const getStatusBadge = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy':
        return 'bg-emerald-600 text-white border-[#1A1A1A]';
      case 'warning':
        return 'bg-amber-500 text-black border-[#1A1A1A]';
      case 'critical':
        return 'bg-red-600 text-white border-[#1A1A1A]';
    }
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#FF4E00]" />
              <span>5 Core Delivery Health Metrics & Trigger Action Thresholds</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Quantitative early warning metrics used by agency leadership to detect project risk and trigger mandatory intervention.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F2F1EF] px-3 py-1.5 border-2 border-[#1A1A1A] text-xs text-[#1A1A1A] font-mono font-bold uppercase shadow-[2px_2px_0px_0px_#1A1A1A]">
            <BellRing className="w-4 h-4 text-[#FF4E00] animate-pulse" />
            <span>Automated Trigger Engine Active</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((m) => (
          <div
            key={m.id}
            className={`border-2 border-[#1A1A1A] p-5 transition-all flex flex-col justify-between shadow-[4px_4px_0px_0px_#1A1A1A] ${
              m.status === 'critical'
                ? 'bg-red-50'
                : m.status === 'warning'
                ? 'bg-amber-50'
                : 'bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 font-mono">
                <span className="text-xs font-bold text-[#FF4E00] uppercase bg-[#1A1A1A] px-2 py-0.5 text-white">{m.code}</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${getStatusBadge(
                    m.status
                  )}`}
                >
                  {m.status}
                </span>
              </div>

              <h4 className="font-display font-bold text-sm text-[#1A1A1A] uppercase mb-1">{m.name}</h4>
              <p className="text-[11px] text-[#555] font-mono mb-4">
                Formula: {m.calculationFormula}
              </p>

              {/* Metric Slider & Value Display */}
              <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-3 space-y-2 mb-4 font-mono">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#555] font-bold">Current Value:</span>
                  <span
                    className={`text-2xl font-black ${
                      m.status === 'critical'
                        ? 'text-red-600'
                        : m.status === 'warning'
                        ? 'text-amber-600'
                        : 'text-emerald-700'
                    }`}
                  >
                    {m.code === 'UMR' ? `$${m.currentValue.toLocaleString()}` : m.currentValue}
                    <span className="text-xs text-[#555] font-normal ml-1">{m.unit}</span>
                  </span>
                </div>

                {/* Slider simulation */}
                <input
                  type="range"
                  min={m.code === 'UMR' ? 0 : m.code === 'CUR' ? 50 : 0.4}
                  max={m.code === 'UMR' ? 50000 : m.code === 'CUR' ? 100 : 1.2}
                  step={m.code === 'UMR' ? 1000 : m.code === 'CUR' ? 1 : 0.01}
                  value={m.currentValue}
                  onChange={(e) => handleMetricValueChange(m.id, Number(e.target.value))}
                  className="w-full accent-[#FF4E00] cursor-pointer h-2 bg-white border border-[#1A1A1A]"
                />

                <div className="flex justify-between text-[10px] text-[#555] font-bold uppercase">
                  <span>Target Range: {m.targetRange}</span>
                  <span>
                    Warning @ {m.code === 'UMR' ? `$${m.warningThreshold}` : m.warningThreshold}
                  </span>
                </div>
              </div>

              {/* Action Triggered */}
              <div className="bg-white border-2 border-[#1A1A1A] p-3 text-xs space-y-1 shadow-[2px_2px_0px_0px_#1A1A1A]">
                <div className="font-display font-bold text-[#1A1A1A] uppercase flex items-center gap-1.5 text-[11px]">
                  <AlertTriangle
                    className={`w-3.5 h-3.5 ${
                      m.status === 'critical'
                        ? 'text-red-600'
                        : m.status === 'warning'
                        ? 'text-amber-600'
                        : 'text-emerald-700'
                    }`}
                  />
                  Action Triggered on Threshold Breach:
                </div>
                <p className="text-[#1A1A1A] text-[11px] leading-relaxed font-medium">
                  {m.actionWhenTriggered}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
