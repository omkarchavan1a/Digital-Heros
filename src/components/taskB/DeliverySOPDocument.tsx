import React, { useState } from 'react';
import {
  FileText,
  CheckSquare,
  Clock,
  Users,
  Compass,
  Zap,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const DeliverySOPDocument: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [onboardingChecklist, setOnboardingChecklist] = useState<{ [key: string]: boolean }>({
    chk1: true,
    chk2: true,
    chk3: false,
    chk4: false,
    chk5: false,
  });

  const stages = [
    {
      title: '01. Client Intake & SOW Handoff',
      timeframe: 'Day 1 - 2 Post-Contract',
      summary: 'Transitioning from Sales BD to Delivery with zero loss of client expectations or technical assumptions.',
      keyActions: [
        'Review signed SOW, Scope Boundaries, Commercial Budget, and Tech Stack commitments.',
        'Conduct internal Sales-to-Delivery Handoff Call (BD Rep + Lead PM + Tech Lead).',
        'Verify client credentials in Password Vault and provision Figma, GitHub, and Jira projects.',
        'Draft Client Welcome Pack containing Communication Guidelines, SLA Expectations, and Escalation Matrix.',
      ],
      deliverables: ['Delivery Handoff Briefing Note', 'Jira/GitHub Repo Setup', 'Client Onboarding Pack'],
      dayOneTip: 'Never send a kick-off invite until you have verified that all technical access credentials work.',
    },
    {
      title: '02. Project Kickoff & Baseline Setup',
      timeframe: 'Day 3 - 5 Post-Contract',
      summary: 'Aligning multi-timezone pods (EST, GMT, IST) and setting up sprint cadences.',
      keyActions: [
        'Convene Internal Pod Alignment Call (Dev Lead, Design Lead, Marketing Automation Lead).',
        'Host Client Kickoff Meeting (Review Milestones, RACI Matrix, Approval Turnaround Rules).',
        'Establish Sprint 1 Backlog & Critical Path Milestone Baseline in Delivery OS.',
        'Set up bi-weekly Client Pulse Survey link and automated status report triggers.',
      ],
      deliverables: ['Signed Kickoff Deck', 'Approved SOW Baseline Schedule', 'RACI Sign-off'],
      dayOneTip: 'Explicitly inform the client during kickoff that scope change requests always undergo formal cost/schedule impact review.',
    },
    {
      title: '03. Sprint Execution & Cadence',
      timeframe: 'Weekly Recurring (3 Timezones)',
      summary: 'Managing daily pod execution across EST, GMT, and IST while tracking budget burn rates.',
      keyActions: [
        'Asynchronous Standups in Slack at 08:00 AM local time for each pod.',
        'Bi-weekly Sprint Planning & Backlog Refinement with Tech Lead.',
        'Continuous Hours Burn Rate Tracking (Weekly audit of logged vs budgeted hours).',
        'Mid-Sprint Risk Check: Identify any blocker active for > 24 hours.',
      ],
      deliverables: ['Sprint Burndown Reports', 'Weekly Hours Audit Log', 'Bug Triage List'],
      dayOneTip: 'Cross-timezone pods rely on written documentation over meetings; enforce clear ticket acceptance criteria.',
    },
    {
      title: '04. Status Reporting & Milestone Sign-offs',
      timeframe: 'Every Friday at 16:00 EST',
      summary: 'Transparent, executive-ready client communication that protects project cash flow.',
      keyActions: [
        'Generate Weekly RAG Status Report using standardized Agency OS template.',
        'Review Unbilled Milestone Receivables to ensure completed work is promptly invoiced.',
        'Obtain formal Client Milestone Approval Certificates before proceeding to next phase.',
        'Address scope change requests via formal Change Orders (CO).',
      ],
      deliverables: ['Weekly Client Status Report', 'Milestone Approval Certificates', 'Change Orders'],
      dayOneTip: 'Never bury bad news in status reports. If schedule is slipping, highlight the mitigation plan in bold.',
    },
    {
      title: '05. QA, UAT, Launch & Closure',
      timeframe: 'Final 2 Weeks of Contract',
      summary: 'Rigorous quality assurance, client acceptance, production go-live, and retainer transition.',
      keyActions: [
        'Execute QA & Security Test Suite (Lighthouse score > 90, zero P1 bugs).',
        'Facilitate Client User Acceptance Testing (UAT) with structured bug reporting sheet.',
        'Deploy to Production Cloud Run infrastructure and verify DNS routing.',
        'Conduct Post-Mortem Retrospective & Transition Client to Ongoing Maintenance Retainer.',
      ],
      deliverables: ['UAT Sign-off Document', 'Production Deployment Checklist', 'Project Post-Mortem'],
      dayOneTip: 'Capture client testimonial and case study metrics immediately after successful go-live.',
    },
  ];

  const toggleCheck = (id: string) => {
    setOnboardingChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(onboardingChecklist).filter(Boolean).length;

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FF4E00]" />
              <span>Delivery Operating System SOP</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Standard operating procedure guiding project delivery leads across concurrent client projects in EST, GMT, and IST.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F2F1EF] px-3 py-1.5 border-2 border-[#1A1A1A] text-xs text-[#1A1A1A] font-mono font-bold uppercase shadow-[2px_2px_0px_0px_#1A1A1A]">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Digital Heroes Verified Standard</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stages Sidebar */}
        <div className="space-y-3">
          <h4 className="text-xs font-display font-bold text-[#1A1A1A] uppercase tracking-wider px-1">
            Delivery Lifecycle Stages
          </h4>

          <div className="space-y-2">
            {stages.map((stage, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`w-full text-left p-3.5 border-2 border-[#1A1A1A] transition-all flex items-center justify-between shadow-[2px_2px_0px_0px_#1A1A1A] ${
                  activeStage === idx
                    ? 'bg-[#1A1A1A] text-white font-bold'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#F2F1EF]'
                }`}
              >
                <div>
                  <div className="text-xs font-display uppercase">{stage.title}</div>
                  <div
                    className={`text-[11px] font-mono mt-0.5 ${
                      activeStage === idx ? 'text-[#FF4E00]' : 'text-[#555]'
                    }`}
                  >
                    {stage.timeframe}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 ${
                    activeStage === idx ? 'text-[#FF4E00]' : 'text-[#1A1A1A]'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Onboarding Checklist Widget */}
          <div className="bg-white border-2 border-[#1A1A1A] p-4 space-y-3 mt-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-2 font-display">
              <h4 className="text-xs font-bold text-[#1A1A1A] uppercase flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-[#FF4E00]" />
                Delivery Onboarding Checklist
              </h4>
              <span className="text-[10px] bg-[#1A1A1A] text-white font-mono font-bold px-2 py-0.5">
                {completedCount}/5 Done
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono font-medium">
              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A]">
                <input
                  type="checkbox"
                  checked={onboardingChecklist.chk1}
                  onChange={() => toggleCheck('chk1')}
                  className="accent-[#FF4E00]"
                />
                <span className={onboardingChecklist.chk1 ? 'line-through text-[#888]' : ''}>
                  Read SOW & Commercial Budget
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A]">
                <input
                  type="checkbox"
                  checked={onboardingChecklist.chk2}
                  onChange={() => toggleCheck('chk2')}
                  className="accent-[#FF4E00]"
                />
                <span className={onboardingChecklist.chk2 ? 'line-through text-[#888]' : ''}>
                  Confirm Multi-Timezone Pod Roster
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A]">
                <input
                  type="checkbox"
                  checked={onboardingChecklist.chk3}
                  onChange={() => toggleCheck('chk3')}
                  className="accent-[#FF4E00]"
                />
                <span className={onboardingChecklist.chk3 ? 'line-through text-[#888]' : ''}>
                  Setup RACI & Escalation Contacts
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A]">
                <input
                  type="checkbox"
                  checked={onboardingChecklist.chk4}
                  onChange={() => toggleCheck('chk4')}
                  className="accent-[#FF4E00]"
                />
                <span className={onboardingChecklist.chk4 ? 'line-through text-[#888]' : ''}>
                  Verify Client Portal & Figma Access
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A]">
                <input
                  type="checkbox"
                  checked={onboardingChecklist.chk5}
                  onChange={() => toggleCheck('chk5')}
                  className="accent-[#FF4E00]"
                />
                <span className={onboardingChecklist.chk5 ? 'line-through text-[#888]' : ''}>
                  Schedule Weekly Status Report Automation
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Detailed Stage Content */}
        <div className="lg:col-span-2 bg-white border-2 border-[#1A1A1A] p-6 space-y-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <div className="border-b-2 border-[#1A1A1A] pb-4">
            <div className="flex items-center gap-2 font-mono">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-[#1A1A1A] text-white uppercase border border-[#1A1A1A]">
                Stage {activeStage + 1}
              </span>
              <span className="text-xs text-[#FF4E00] font-bold">
                {stages[activeStage].timeframe}
              </span>
            </div>
            <h3 className="text-xl font-display font-bold text-[#1A1A1A] uppercase mt-2">
              {stages[activeStage].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1A1A] font-medium mt-2 leading-relaxed">
              {stages[activeStage].summary}
            </p>
          </div>

          {/* Key Actions List */}
          <div>
            <h4 className="text-xs font-display font-bold text-[#1A1A1A] uppercase tracking-wider mb-3">
              Standard Operating Actions
            </h4>
            <div className="space-y-2.5">
              {stages[activeStage].keyActions.map((action, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-[#F2F1EF] border-2 border-[#1A1A1A] p-3 text-xs sm:text-sm text-[#1A1A1A] font-medium shadow-[2px_2px_0px_0px_#1A1A1A]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FF4E00] shrink-0 mt-0.5" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables & Pro Tip Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 space-y-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
              <h5 className="text-xs font-display font-bold text-[#1A1A1A] uppercase tracking-wider">
                Required Stage Deliverables
              </h5>
              <ul className="space-y-1.5 text-xs text-[#1A1A1A] font-mono font-medium">
                {stages[activeStage].deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF4E00] border border-[#1A1A1A]" />
                    {del}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-[#1A1A1A] p-4 space-y-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
              <h5 className="text-xs font-display font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FF4E00]" />
                Senior PM Pro Tip
              </h5>
              <p className="text-xs text-[#1A1A1A] leading-relaxed italic font-medium">
                "{stages[activeStage].dayOneTip}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
