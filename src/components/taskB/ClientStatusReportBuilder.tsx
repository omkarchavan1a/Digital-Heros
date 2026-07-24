import React, { useState } from 'react';
import { StatusReportData } from '../../types';
import { FileText, CheckCircle2, AlertTriangle, EyeOff, Printer, Copy, Check } from 'lucide-react';

interface ClientStatusReportBuilderProps {
  initialData: StatusReportData;
}

export const ClientStatusReportBuilder: React.FC<ClientStatusReportBuilderProps> = ({
  initialData,
}) => {
  const [reportData, setReportData] = useState<StatusReportData>(initialData);
  const [copied, setCopied] = useState(false);

  const setRAG = (field: 'overallRAG' | 'scheduleRAG' | 'budgetRAG' | 'scopeRAG', val: 'Green' | 'Amber' | 'Red') => {
    setReportData((prev) => ({ ...prev, [field]: val }));
  };

  const getRAGBadge = (val: 'Green' | 'Amber' | 'Red') => {
    switch (val) {
      case 'Green':
        return 'bg-emerald-600 text-white border-[#1A1A1A]';
      case 'Amber':
        return 'bg-amber-500 text-black border-[#1A1A1A]';
      case 'Red':
        return 'bg-red-600 text-white border-[#1A1A1A]';
    }
  };

  const handleCopyText = () => {
    const text = `WEEKLY CLIENT STATUS REPORT
Project: ${reportData.projectName}
Client: ${reportData.clientName}
Date: ${reportData.reportDate}
Overall Status: ${reportData.overallRAG} (Schedule: ${reportData.scheduleRAG}, Budget: ${reportData.budgetRAG}, Scope: ${reportData.scopeRAG})

EXECUTIVE SUMMARY:
${reportData.executiveSummary}

ACCOMPLISHMENTS THIS WEEK:
${reportData.accomplishmentsThisWeek.map((a) => `• ${a}`).join('\n')}

PLANNED NEXT WEEK:
${reportData.plannedNextWeek.map((p) => `• ${p}`).join('\n')}

KEY RISKS & MITIGATIONS:
${reportData.keyRisksAndBlockers.map((r) => `• Risk: ${r.risk} | Mitigation: ${r.mitigation} (${r.owner})`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF4E00]" />
              <span>Weekly Client Status Report Standard & Exclusions Rationale</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Exact template format used across Digital Heroes projects, including what is explicitly excluded and why.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-gray-800 text-white font-display font-bold text-xs uppercase border-2 border-[#1A1A1A] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white" />}
              {copied ? 'Copied Report' : 'Copy Text Format'}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF4E00] hover:bg-[#1A1A1A] text-white font-display font-bold text-xs uppercase border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Preview */}
        <div className="lg:col-span-2 bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-6">
          {/* Report Meta Header */}
          <div className="border-b-2 border-[#1A1A1A] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-[#FF4E00] tracking-wider">
                Digital Heroes Weekly Client Report
              </span>
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] uppercase mt-0.5">
                {reportData.projectName}
              </h2>
              <div className="text-xs font-mono text-[#555] mt-1">
                Client: <strong className="text-[#1A1A1A]">{reportData.clientName}</strong> &bull; Date: {reportData.reportDate}
              </div>
            </div>

            {/* RAG Controls */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#F2F1EF] p-2 border-2 border-[#1A1A1A] text-center">
                <div className="text-[10px] text-[#555] font-bold uppercase">Overall Status</div>
                <div className="mt-1 flex justify-center gap-1">
                  {(['Green', 'Amber', 'Red'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => setRAG('overallRAG', color)}
                      className={`px-2 py-0.5 text-[10px] font-bold border transition-all ${
                        reportData.overallRAG === color
                          ? getRAGBadge(color)
                          : 'opacity-40 hover:opacity-100 bg-white text-[#1A1A1A] border-[#1A1A1A]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#F2F1EF] p-2 border-2 border-[#1A1A1A] text-center">
                <div className="text-[10px] text-[#555] font-bold uppercase">Schedule</div>
                <div className="mt-1 flex justify-center gap-1">
                  {(['Green', 'Amber', 'Red'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => setRAG('scheduleRAG', color)}
                      className={`px-1.5 py-0.5 text-[10px] font-bold border transition-all ${
                        reportData.scheduleRAG === color
                          ? getRAGBadge(color)
                          : 'opacity-40 hover:opacity-100 bg-white text-[#1A1A1A] border-[#1A1A1A]'
                      }`}
                    >
                      {color[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-display font-bold text-[#1A1A1A] uppercase tracking-wider">
              Executive Summary
            </h4>
            <textarea
              value={reportData.executiveSummary}
              onChange={(e) =>
                setReportData((prev) => ({ ...prev, executiveSummary: e.target.value }))
              }
              rows={3}
              className="w-full bg-[#F2F1EF] border-2 border-[#1A1A1A] p-3 text-xs sm:text-sm text-[#1A1A1A] font-sans font-medium focus:outline-none"
            />
          </div>

          {/* Accomplishments & Next Week */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border-2 border-[#1A1A1A] p-4 space-y-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
              <h4 className="text-xs font-display font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Key Accomplishments This Week
              </h4>
              <ul className="space-y-1.5 text-xs text-[#1A1A1A] font-medium">
                {reportData.accomplishmentsThisWeek.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 space-y-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
              <h4 className="text-xs font-display font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#FF4E00]" />
                Planned Focus Next Week
              </h4>
              <ul className="space-y-1.5 text-xs text-[#1A1A1A] font-medium">
                {reportData.plannedNextWeek.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#FF4E00] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risks & Blockers */}
          <div className="space-y-3">
            <h4 className="text-xs font-display font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#FF4E00]" />
              Key Risks, Dependencies & Mitigations
            </h4>
            <div className="space-y-2">
              {reportData.keyRisksAndBlockers.map((r, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50 border-2 border-[#1A1A1A] p-3 text-xs flex flex-col sm:flex-row justify-between gap-2 shadow-[2px_2px_0px_0px_#1A1A1A]"
                >
                  <div>
                    <div className="font-bold text-amber-950">Risk: {r.risk}</div>
                    <div className="text-[#1A1A1A] font-medium mt-0.5">Mitigation: {r.mitigation}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-[#1A1A1A] text-white border border-[#1A1A1A] font-mono font-bold text-[10px] self-start sm:self-center whitespace-nowrap">
                    Owner: {r.owner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deliberately Excluded Section (Requirement c) */}
        <div className="bg-white border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4">
          <div className="border-b-2 border-[#1A1A1A] pb-3">
            <h4 className="text-xs font-display font-bold text-red-600 uppercase tracking-wider flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-red-600" />
              <span>Deliberately Excluded Items & PM Rationale</span>
            </h4>
            <p className="text-xs text-[#555] font-medium mt-1">
              To maintain executive clarity and protect commercial confidentiality, specific items are explicitly omitted from client status reports.
            </p>
          </div>

          <div className="space-y-3">
            {reportData.deliberatelyExcludedItems.map((ex, idx) => (
              <div
                key={idx}
                className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-3 text-xs space-y-1.5 shadow-[2px_2px_0px_0px_#1A1A1A]"
              >
                <div className="font-bold text-[#1A1A1A] flex items-center gap-1.5 font-display uppercase">
                  <span className="w-2 h-2 bg-red-600 border border-[#1A1A1A]" />
                  {ex.item}
                </div>
                <div className="text-[#1A1A1A] text-[11px] leading-relaxed pl-3 border-l-2 border-[#1A1A1A] font-medium">
                  <strong className="text-[#FF4E00] uppercase font-mono">PM Rationale:</strong> {ex.rationale}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
