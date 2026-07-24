import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, ExternalLink, Video, FileText, Copy, Check, Instagram, FolderCheck } from 'lucide-react';

interface CandidateSubmissionHubProps {
  onGenerateAIDisclosure: (promptDetails: string, manualChanges: string) => Promise<any>;
}

export const CandidateSubmissionHub: React.FC<CandidateSubmissionHubProps> = ({
  onGenerateAIDisclosure,
}) => {
  const [candidateName, setCandidateName] = useState('Delivery Lead');
  const [igHandle, setIgHandle] = useState('@delivery_handle');
  const [followingIG, setFollowingIG] = useState(true);

  // AI Usage statement state
  const [aiPromptDetails, setAiPromptDetails] = useState(
    'Used Gemini 3.6 Flash to pressure test margin scenarios, draft RACI templates across 3 timezones, and refine client email diplomacy.'
  );
  const [manualChanges, setManualChanges] = useState(
    'Recalibrated blended cost rates from $85 to $78 using offshore developer pod mix, restructured critical path milestones to lock Week 13 go-live, and added explicit PM rationale for excluded status report items.'
  );
  const [generatedStatement, setGeneratedStatement] = useState(
    'I utilized AI (Gemini 3.6 Flash) to brainstorm recovery scenario edge cases, draft initial RACI governance frameworks for multi-timezone agency pods, and refine tone options for sensitive client recovery emails. Following model generation, I heavily customized the commercial margin calculator to reflect actual blended hourly rates, adjusted the critical path schedule to prevent developer burnout across concurrent launches, and authored explicit PM rationales for excluded status report metrics to ensure strict executive relevance.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedStatement, setCopiedStatement] = useState(false);

  const handleGenerateAIStatement = async () => {
    setIsGenerating(true);
    try {
      const res = await onGenerateAIDisclosure(aiPromptDetails, manualChanges);
      if (res && res.aiDisclosureParagraph) {
        setGeneratedStatement(res.aiDisclosureParagraph);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyStatement = () => {
    navigator.clipboard.writeText(generatedStatement);
    setCopiedStatement(true);
    setTimeout(() => setCopiedStatement(false), 2000);
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <Send className="w-5 h-5 text-[#FF4E00]" />
              <span>Compliance & Documentation Hub</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-1">
              Verify system requirements: Drive sharing permissions, AI disclosure documentation, and system walkthrough recording script.
            </p>
          </div>

          <span className="px-3 py-1 bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] font-mono text-xs font-bold uppercase self-start sm:self-auto">
            Delivery Operations
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requirement 1: AI Disclosure Paragraph Generator */}
        <div className="bg-white border-2 border-[#1A1A1A] p-6 space-y-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <div className="border-b-2 border-[#1A1A1A] pb-3 flex items-center justify-between">
            <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF4E00]" />
              <span>1. AI Usage & Judgment Disclosure (Required)</span>
            </h4>
            <button
              onClick={handleGenerateAIStatement}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#FF4E00] hover:bg-[#1A1A1A] text-white font-display font-bold text-xs uppercase tracking-wider border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] transition-all disabled:opacity-50"
            >
              {isGenerating ? 'Drafting...' : 'Re-generate Paragraph'}
            </button>
          </div>

          <p className="text-xs text-[#555] italic font-medium">
            Brief Rule: <em>"Add one short paragraph telling us where you used AI and what you changed afterwards."</em>
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#1A1A1A] font-bold block mb-1 uppercase font-mono text-[11px]">Where AI was used:</label>
              <input
                type="text"
                value={aiPromptDetails}
                onChange={(e) => setAiPromptDetails(e.target.value)}
                className="w-full bg-[#F2F1EF] border-2 border-[#1A1A1A] p-2 text-[#1A1A1A] font-mono text-xs focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[#1A1A1A] font-bold block mb-1 uppercase font-mono text-[11px]">Human Judgment & Changes Made Afterwards:</label>
              <input
                type="text"
                value={manualChanges}
                onChange={(e) => setManualChanges(e.target.value)}
                className="w-full bg-[#F2F1EF] border-2 border-[#1A1A1A] p-2 text-[#1A1A1A] font-mono text-xs focus:outline-none focus:bg-white"
              />
            </div>

            <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 space-y-2 relative">
              <div className="flex justify-between items-center text-[10px] text-[#FF4E00] font-mono font-bold uppercase tracking-wider">
                <span>Final Disclosure Statement</span>
                <button
                  onClick={copyStatement}
                  className="flex items-center gap-1 text-[#1A1A1A] hover:text-[#FF4E00] font-bold uppercase"
                >
                  {copiedStatement ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  {copiedStatement ? 'Copied' : 'Copy Text'}
                </button>
              </div>
              <p className="text-xs text-[#1A1A1A] leading-relaxed font-serif italic">
                "{generatedStatement}"
              </p>
            </div>
          </div>
        </div>

        {/* Requirement 2: Loom Walkthrough Video Outline */}
        <div className="bg-white border-2 border-[#1A1A1A] p-6 space-y-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <div className="border-b-2 border-[#1A1A1A] pb-3">
            <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-600" />
              <span>2. Loom Video Pitch Script Outline (2-3 Minutes)</span>
            </h4>
            <p className="text-xs text-[#555] font-medium mt-1">
              Brief Rule: <em>"Walkthroughs are not optional... Two to three minutes is enough."</em>
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-3.5 space-y-1">
              <div className="font-mono font-bold text-[#FF4E00] text-xs uppercase">0:00 - 0:45 | Task A: Recovery Logic & Margin</div>
              <p className="text-[#1A1A1A] text-xs leading-relaxed">
                "Hi Digital Heroes Team. I inherited a project 40% over budget and 3 weeks late. I immediately executed scope triage: keeping core payments & catalog, trimming the 3D configurator into Phase 2, and recovering margin from 4% to 28% while unblocking Milestone 2 ($18.7k)."
              </p>
            </div>

            <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-3.5 space-y-1">
              <div className="font-mono font-bold text-emerald-700 text-xs uppercase">0:45 - 1:30 | Client Escalation Email Strategy</div>
              <p className="text-[#1A1A1A] text-xs leading-relaxed">
                "In my client email, I re-framed scope trimming not as a failure, but as a strategic shield protecting their hard go-live date. I re-opened milestone approvals without giving away free work."
              </p>
            </div>

            <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-3.5 space-y-1">
              <div className="font-mono font-bold text-violet-700 text-xs uppercase">1:30 - 2:30 | Task B: Agency OS, RACI & Metrics</div>
              <p className="text-[#1A1A1A] text-xs leading-relaxed">
                "For Task B, I built an Agency Delivery OS covering 5 concurrent projects across EST, GMT, and IST. I defined 5 health metrics (SPI, CPI, Utilization, Unbilled Risk, CSAT) with exact trigger thresholds, and detailed why internal dev rates are deliberately excluded from client reports."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Checklist & Channel */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 space-y-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
          <FolderCheck className="w-4 h-4 text-[#FF4E00]" />
          <span>3. Final Documentation Instructions & Verification</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* System Verification */}
          <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 space-y-3">
            <div className="font-display font-bold text-[#1A1A1A] text-sm uppercase">Documentation Setup</div>
            
            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-mono font-bold text-[#1A1A1A] uppercase block mb-1">Lead Name:</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-white border-2 border-[#1A1A1A] p-1.5 text-xs font-mono font-bold text-[#1A1A1A] focus:outline-none"
                  placeholder="Lead Name"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="w-4 h-4 accent-[#FF4E00]"
                />
                <span className="text-[#1A1A1A] font-medium">
                  Format: <code className="bg-white border border-[#1A1A1A] px-1 py-0.5 font-mono font-bold text-[#FF4E00]">DeliveryOps_{candidateName.replace(/\s+/g, '')}</code>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="w-4 h-4 accent-[#FF4E00]"
                />
                <span className="text-[#1A1A1A] font-medium">
                  Includes complete recovery plan and operating system documentation
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={true} readOnly className="w-4 h-4 accent-[#FF4E00]" />
                <span className="text-[#1A1A1A] font-medium">Includes Loom video walkthrough script</span>
              </div>
            </div>
          </div>

          {/* Instagram DM Submission */}
          <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 space-y-3">
            <div className="font-display font-bold text-[#1A1A1A] text-sm uppercase flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-600" />
                Instagram Channel
              </span>
              <a
                href="https://instagram.com/realshreyanshsingh"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono font-bold text-pink-600 hover:underline flex items-center gap-1"
              >
                @realshreyanshsingh <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono font-bold text-[#1A1A1A] uppercase block mb-1">Instagram Handle:</label>
                <input
                  type="text"
                  value={igHandle}
                  onChange={(e) => setIgHandle(e.target.value)}
                  className="w-full bg-white border-2 border-[#1A1A1A] p-1.5 text-xs font-mono font-bold text-[#1A1A1A] focus:outline-none"
                  placeholder="@delivery_handle"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A] text-xs font-medium">
                <input
                  type="checkbox"
                  checked={followingIG}
                  onChange={(e) => setFollowingIG(e.target.checked)}
                  className="w-4 h-4 accent-[#FF4E00]"
                />
                <span>Followed @realshreyanshsingh for updates</span>
              </label>

              <div className="bg-white p-3 border-2 border-[#1A1A1A] font-mono text-[11px] space-y-1">
                <div className="text-[#555] font-bold">// Delivery Operations DM format:</div>
                <div className="text-[#1A1A1A]">
                  Hi Shreyansh! Here is the Delivery Operations System overview:
                  <br />
                  Lead: {candidateName} ({igHandle})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

