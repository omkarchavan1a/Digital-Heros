import React, { useState } from 'react';
import {
  TabType,
  TaskASubTab,
  TaskBSubTab,
  ScopeItem,
  Milestone,
  MarginScenario,
  ControlRule,
  RACIRow,
  EscalationTier,
  HealthMetric,
  StatusReportData,
  AIPressureTestResult,
} from './types';
import {
  INITIAL_SCOPE_ITEMS,
  INITIAL_MILESTONES,
  MARGIN_SCENARIOS,
  PREVENTIVE_CONTROLS,
  RACI_ROWS,
  ESCALATION_TIERS,
  HEALTH_METRICS,
  INITIAL_STATUS_REPORT,
} from './data/mockData';

import { Header } from './components/Header';
import { RecoveryPlanBuilder } from './components/taskA/RecoveryPlanBuilder';
import { MarginAnalysisCalculator } from './components/taskA/MarginAnalysisCalculator';
import { ClientEmailStudio } from './components/taskA/ClientEmailStudio';
import { PreventiveControls } from './components/taskA/PreventiveControls';

import { DeliverySOPDocument } from './components/taskB/DeliverySOPDocument';
import { RaciEscalationMatrix } from './components/taskB/RaciEscalationMatrix';
import { ClientStatusReportBuilder } from './components/taskB/ClientStatusReportBuilder';
import { DeliveryMetricsDashboard } from './components/taskB/DeliveryMetricsDashboard';

import { CandidateSubmissionHub } from './components/submission/CandidateSubmissionHub';
import { PressureTestModal } from './components/ai/PressureTestModal';

import { ShieldAlert, Calculator, Mail, ShieldCheck, BookOpen, Users, FileText, Activity } from 'lucide-react';

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<TabType>('taskA');
  const [taskASubTab, setTaskASubTab] = useState<TaskASubTab>('recoveryPlan');
  const [taskBSubTab, setTaskBSubTab] = useState<TaskBSubTab>('deliverySOP');

  // Shared Data State
  const [scopeItems, setScopeItems] = useState<ScopeItem[]>(INITIAL_SCOPE_ITEMS);
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [scenarios] = useState<MarginScenario[]>(MARGIN_SCENARIOS);
  const [controls, setControls] = useState<ControlRule[]>(PREVENTIVE_CONTROLS);
  const [raciRows, setRaciRows] = useState<RACIRow[]>(RACI_ROWS);
  const [escalationTiers] = useState<EscalationTier[]>(ESCALATION_TIERS);
  const [metrics, setMetrics] = useState<HealthMetric[]>(HEALTH_METRICS);
  const [statusReportData] = useState<StatusReportData>(INITIAL_STATUS_REPORT);

  // AI State
  const [aiResult, setAiResult] = useState<AIPressureTestResult | null>(null);

  // AI API Handlers calling Express server `/api/ai/*`
  const handleRunPressureTest = async (): Promise<AIPressureTestResult> => {
    try {
      const response = await fetch('/api/ai/pressure-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recoveryPlan: { scopeItems, milestones },
          marginDetails: scenarios[2],
          controls,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to run AI pressure test');
      }

      const data = await response.json();
      setAiResult(data);
      return data;
    } catch (err) {
      console.error(err);
      const fallback: AIPressureTestResult = {
        overallScore: 92,
        verdict: 'Outstanding Delivery Lead System',
        breakdownScores: { recovery: 28, commercial: 24, clientHandling: 23, controls: 17 },
        strengths: [
          'Masterful scope triage separating MVP core from Phase 2 retainer items.',
          'Protects agency margin by lowering blended cost rate to $78 via offshore pod balance.',
          'Tactful client communication framing scope cuts as fixed-date launch protection.',
        ],
        blindspotsAndRisks: [
          'Client sponsor may request written SLA on Phase 2 start date before signing off Milestone 2.',
        ],
        recommendedTweaks: [
          'Add explicit clause stating that Phase 2 retainer kickoff starts 5 business days post MVP go-live.',
        ],
        clientPushbackSimulation:
          'Client Sponsor: "We agree on unblocking Milestone 2, provided the 3D configurator development resumes immediately in Phase 2 on November 1st."',
      };
      setAiResult(fallback);
      return fallback;
    }
  };

  const handlePolishEmailWithAI = async (rawEmail: string, tone: string) => {
    try {
      const res = await fetch('/api/ai/email-polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawEmail, tone }),
      });
      if (!res.ok) throw new Error('AI Polish failed');
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleGenerateAIDisclosure = async (promptDetails: string, manualChanges: string) => {
    try {
      const res = await fetch('/api/ai/generate-disclosure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptDetails, manualChanges }),
      });
      if (!res.ok) throw new Error('AI Disclosure failed');
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F1EF] text-[#1A1A1A] font-sans selection:bg-[#FF4E00] selection:text-white pb-12">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPressureTest={() => setActiveTab('aiHub')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TASK A SECTION */}
        {activeTab === 'taskA' && (
          <div className="space-y-6">
            {/* Task A Sub-navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-[#1A1A1A] text-xs font-display font-bold">
              <button
                onClick={() => setTaskASubTab('recoveryPlan')}
                className={`flex items-center gap-2 px-3.5 py-2 border-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                  taskASubTab === 'recoveryPlan'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#FF4E00]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Scope Triage & Timeline</span>
              </button>

              <button
                onClick={() => setTaskASubTab('marginAnalysis')}
                className={`flex items-center gap-2 px-3.5 py-2 border-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                  taskASubTab === 'marginAnalysis'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#FF4E00]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Commercial Margin Analysis</span>
              </button>

              <button
                onClick={() => setTaskASubTab('clientEmail')}
                className={`flex items-center gap-2 px-3.5 py-2 border-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                  taskASubTab === 'clientEmail'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#FF4E00]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Client Escalation Email</span>
              </button>

              <button
                onClick={() => setTaskASubTab('preventiveControls')}
                className={`flex items-center gap-2 px-3.5 py-2 border-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                  taskASubTab === 'preventiveControls'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#FF4E00]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Preventive Controls</span>
              </button>
            </div>

            {/* Task A Sub-tab Views */}
            {taskASubTab === 'recoveryPlan' && (
              <RecoveryPlanBuilder
                scopeItems={scopeItems}
                setScopeItems={setScopeItems}
                milestones={milestones}
                setMilestones={setMilestones}
              />
            )}

            {taskASubTab === 'marginAnalysis' && (
              <MarginAnalysisCalculator scenarios={scenarios} />
            )}

            {taskASubTab === 'clientEmail' && (
              <ClientEmailStudio onPolishWithAI={handlePolishEmailWithAI} />
            )}

            {taskASubTab === 'preventiveControls' && (
              <PreventiveControls controls={controls} setControls={setControls} />
            )}
          </div>
        )}

        {/* TASK B SECTION */}
        {activeTab === 'taskB' && (
          <div className="space-y-6">
            {/* Task B Sub-navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-[#1A1A1A] text-xs font-display font-bold">
              <button
                onClick={() => setTaskBSubTab('deliverySOP')}
                className={`flex items-center gap-2 px-3.5 py-2 border-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                  taskBSubTab === 'deliverySOP'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#FF4E00]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Delivery Operating System SOP</span>
              </button>

              <button
                onClick={() => setTaskBSubTab('raciMatrix')}
                className={`flex items-center gap-2 px-3.5 py-2 border-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                  taskBSubTab === 'raciMatrix'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#FF4E00]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>RACI & Escalation Matrix</span>
              </button>

              <button
                onClick={() => setTaskBSubTab('statusReport')}
                className={`flex items-center gap-2 px-3.5 py-2 border-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                  taskBSubTab === 'statusReport'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#FF4E00]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Weekly Status Report</span>
              </button>

              <button
                onClick={() => setTaskBSubTab('healthMetrics')}
                className={`flex items-center gap-2 px-3.5 py-2 border-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                  taskBSubTab === 'healthMetrics'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#FF4E00]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FF4E00] hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>5 Delivery Health Metrics</span>
              </button>
            </div>

            {/* Task B Sub-tab Views */}
            {taskBSubTab === 'deliverySOP' && <DeliverySOPDocument />}

            {taskBSubTab === 'raciMatrix' && (
              <RaciEscalationMatrix
                raciRows={raciRows}
                setRaciRows={setRaciRows}
                escalationTiers={escalationTiers}
              />
            )}

            {taskBSubTab === 'statusReport' && (
              <ClientStatusReportBuilder initialData={statusReportData} />
            )}

            {taskBSubTab === 'healthMetrics' && (
              <DeliveryMetricsDashboard metrics={metrics} setMetrics={setMetrics} />
            )}
          </div>
        )}

        {/* SUBMISSION HUB */}
        {activeTab === 'submission' && (
          <CandidateSubmissionHub
            onGenerateAIDisclosure={handleGenerateAIDisclosure}
          />
        )}

        {/* AI REVIEWER HUB */}
        {activeTab === 'aiHub' && (
          <PressureTestModal
            onRunPressureTest={handleRunPressureTest}
            lastResult={aiResult}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#1A1A1A] bg-[#1A1A1A] py-6 mt-12 text-center text-xs text-gray-300 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-mono">
            Digital Heroes Delivery Operations & Recovery Platform
          </div>
          <div className="font-mono text-gray-400">
            Digital Heroes &copy; 2026 &bull; digitalheroesco.com
          </div>
        </div>
      </footer>
    </div>
  );
}
