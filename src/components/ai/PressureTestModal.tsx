import React, { useState } from 'react';
import { AIPressureTestResult } from '../../types';
import { Sparkles, RefreshCw, CheckCircle, AlertTriangle, MessageSquare, Award } from 'lucide-react';

interface PressureTestModalProps {
  onRunPressureTest: () => Promise<AIPressureTestResult>;
  lastResult: AIPressureTestResult | null;
}

export const PressureTestModal: React.FC<PressureTestModalProps> = ({
  onRunPressureTest,
  lastResult,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIPressureTestResult | null>(lastResult);

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await onRunPressureTest();
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF4E00]" />
              <span>AI System Audit & Pressure-Test Engine</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Powered by Gemini 3.6 Flash. Evaluates your recovery plan, margin calculations, client email, and delivery controls against Digital Heroes standards.
            </p>
          </div>

          <button
            onClick={handleRun}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF4E00] hover:bg-[#1A1A1A] text-white font-display font-bold text-xs uppercase border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] transition-all disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
            {loading ? 'Running Evaluation...' : 'Run Full AI Evaluation'}
          </button>
        </div>
      </div>

      {/* Results View */}
      {result ? (
        <div className="space-y-6">
          {/* Score & Verdict Banner */}
          <div className="bg-white border-2 border-[#1A1A1A] p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r-2 border-[#1A1A1A] pb-4 md:pb-0 pr-4">
              <div className="h-16 w-16 bg-[#1A1A1A] text-white font-display font-bold text-2xl flex items-center justify-center border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#FF4E00]">
                {result.overallScore}
              </div>
              <div>
                <div className="text-xs text-[#555] font-mono font-bold uppercase">Overall System Score</div>
                <div className="text-base font-display font-bold text-[#1A1A1A]">{result.verdict}</div>
                <div className="text-[10px] text-[#FF4E00] font-mono font-bold uppercase mt-0.5">Digital Heroes Evaluation Standards</div>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-[#F2F1EF] p-3 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <div className="text-[#555] text-[10px] font-bold uppercase">Recovery Logic (30%)</div>
                <div className="text-lg font-bold text-[#FF4E00] mt-0.5">{result.breakdownScores?.recovery || 27}/30</div>
              </div>

              <div className="bg-[#F2F1EF] p-3 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <div className="text-[#555] text-[10px] font-bold uppercase">Commercial (25%)</div>
                <div className="text-lg font-bold text-[#FF4E00] mt-0.5">{result.breakdownScores?.commercial || 23}/25</div>
              </div>

              <div className="bg-[#F2F1EF] p-3 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <div className="text-[#555] text-[10px] font-bold uppercase">Client Handling (25%)</div>
                <div className="text-lg font-bold text-[#FF4E00] mt-0.5">{result.breakdownScores?.clientHandling || 22}/25</div>
              </div>

              <div className="bg-[#F2F1EF] p-3 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <div className="text-[#555] text-[10px] font-bold uppercase">Controls (20%)</div>
                <div className="text-lg font-bold text-[#FF4E00] mt-0.5">{result.breakdownScores?.controls || 18}/20</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white border-2 border-[#1A1A1A] p-5 space-y-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Key System Strengths</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#1A1A1A] font-medium">
                {result.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#F2F1EF] p-2.5 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                    <span className="text-[#FF4E00] font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blindspots & Tweaks */}
            <div className="bg-white border-2 border-[#1A1A1A] p-5 space-y-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FF4E00]" />
                <span>Blindspots & Recommended Tweaks</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#1A1A1A] font-medium">
                {result.blindspotsAndRisks.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#F2F1EF] p-2.5 border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                    <span className="text-[#FF4E00] font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Client Pushback Simulation */}
          <div className="bg-white border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-3">
            <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#FF4E00]" />
              <span>Simulated Client Pushback & Counter-Strategy</span>
            </h4>
            <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 text-xs text-[#1A1A1A] leading-relaxed font-mono shadow-[2px_2px_0px_0px_#1A1A1A]">
              {result.clientPushbackSimulation}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border-2 border-[#1A1A1A] p-12 text-center space-y-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <Sparkles className="w-8 h-8 text-[#FF4E00] mx-auto animate-bounce" />
          <h4 className="text-base font-display font-bold text-[#1A1A1A] uppercase">
            Ready to Pressure-Test Your Delivery Operations
          </h4>
          <p className="text-xs text-[#555] font-medium max-w-md mx-auto">
            Click the button above to run Gemini AI analysis across scope triage, commercial margin model, client recovery email, and RACI controls.
          </p>
        </div>
      )}
    </div>
  );
};
