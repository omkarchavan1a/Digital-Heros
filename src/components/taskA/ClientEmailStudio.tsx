import React, { useState } from 'react';
import { Mail, Copy, Check, Sparkles, RefreshCw, AlertCircle, FileText } from 'lucide-react';

interface ClientEmailStudioProps {
  onPolishWithAI: (rawEmail: string, tone: string) => Promise<any>;
}

export const ClientEmailStudio: React.FC<ClientEmailStudioProps> = ({ onPolishWithAI }) => {
  const [clientName, setClientName] = useState('Apex Consumer Goods');
  const [stakeholderName, setStakeholderName] = useState('David Vance');
  const [projectName, setProjectName] = useState('E-commerce Platform Modernization');
  const [milestoneAmount, setMilestoneAmount] = useState('18,750');
  const [proposedLaunchDate, setProposedLaunchDate] = useState('Week 13 (October 24)');
  const [tone, setTone] = useState('Strategic & Partner-Centric');

  const [copied, setCopied] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);

  const defaultEmailTemplate = `Subject: Milestone 2 Review & Revised Launch Schedule — ${projectName}

Hi ${stakeholderName},

I hope you are having a productive week.

I am reaching out following our team's operational review of the ${projectName} build. As your delivery partner, our highest priority is ensuring we launch a high-converting, robust platform that meets your target go-live timeline of ${proposedLaunchDate} without compromising security or UX performance.

During our recent sprint audit, we identified that while core e-commerce capabilities (Stripe payments, catalog architecture, and order flows) are fully built, certain non-essential scope items—such as the custom 3D configurator module—have driven a 40% increase in developer build hours beyond our initial SOW baseline. 

To unblock progress and ensure we hit your critical launch date, we propose the following clear alignment path:

1. **Unblock Milestone 2 Sign-off ($${milestoneAmount}):** The core UI and payment flow deliverables for Milestone 2 are complete and ready for your sign-off. Reopening approval this week allows us to maintain full developer allocation on your account.
2. **Launch MVP Scope Focus:** We will lock the MVP build strictly to core checkout, catalog, and Klaviyo marketing webhooks, guaranteeing a flawless launch on ${proposedLaunchDate}.
3. **Phase 2 Retainer Transition:** We will transition the complex 3D configurator module into an immediate post-launch Phase 2 retainer sprint, allowing your team to gather live customer feedback before finalizing custom 3D visualizers.

I have set up a brief 15-minute alignment call for tomorrow at 10:00 AM EST to walk through the revised milestone roadmap and finalize Milestone 2 approval.

Thank you for your ongoing partnership, ${stakeholderName}. We look forward to bringing this launch over the finish line together.

Best regards,

Lead Delivery Manager
Digital Heroes Agency`;

  const [emailBody, setEmailBody] = useState(defaultEmailTemplate);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAiPolish = async () => {
    setIsPolishing(true);
    try {
      const res = await onPolishWithAI(emailBody, tone);
      if (res && res.polishedBody) {
        setEmailBody(res.polishedBody);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPolishing(false);
    }
  };

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#FF4E00]" />
              <span>Client Escalation Email Studio</span>
            </h3>
            <p className="text-xs text-[#555] font-medium mt-0.5">
              Re-opening milestone approvals politely without conceding account profitability or creating friction.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleAiPolish}
              disabled={isPolishing}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FF4E00] hover:bg-[#1A1A1A] text-white font-display font-bold text-xs uppercase border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] transition-all disabled:opacity-50"
            >
              {isPolishing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-white" />
              )}
              {isPolishing ? 'Polishing Email...' : 'Polish Email with Gemini AI'}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-gray-800 text-white font-display font-bold text-xs uppercase border-2 border-[#1A1A1A] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white" />}
              {copied ? 'Copied!' : 'Copy Draft'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Variable Controls & Tactics */}
        <div className="bg-white border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4">
          <h4 className="font-display font-bold text-xs text-[#1A1A1A] uppercase tracking-wider border-b-2 border-[#1A1A1A] pb-2">
            Email Parameters & Context
          </h4>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-[#555] font-bold block mb-1">Client Stakeholder Name:</label>
              <input
                type="text"
                value={stakeholderName}
                onChange={(e) => setStakeholderName(e.target.value)}
                className="w-full bg-[#F2F1EF] border-2 border-[#1A1A1A] p-2 text-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#555] font-bold block mb-1">Company / Account Name:</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#F2F1EF] border-2 border-[#1A1A1A] p-2 text-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#555] font-bold block mb-1">Blocked Milestone Amount ($):</label>
              <input
                type="text"
                value={milestoneAmount}
                onChange={(e) => setMilestoneAmount(e.target.value)}
                className="w-full bg-[#F2F1EF] border-2 border-[#1A1A1A] p-2 text-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#555] font-bold block mb-1">Proposed Revised Launch Date:</label>
              <input
                type="text"
                value={proposedLaunchDate}
                onChange={(e) => setProposedLaunchDate(e.target.value)}
                className="w-full bg-[#F2F1EF] border-2 border-[#1A1A1A] p-2 text-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#555] font-bold block mb-1">Communication Tone Profile:</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-[#F2F1EF] border-2 border-[#1A1A1A] p-2 text-[#1A1A1A] font-bold focus:outline-none"
              >
                <option value="Strategic & Partner-Centric">Strategic & Partner-Centric</option>
                <option value="Firm & Solution-Oriented">Firm & Solution-Oriented</option>
                <option value="Executive Diplomatic">Executive Diplomatic</option>
              </select>
            </div>
          </div>

          <div className="bg-[#F2F1EF] border-2 border-[#1A1A1A] p-3 text-xs space-y-2 mt-4 font-mono">
            <div className="font-bold text-[#FF4E00] uppercase">PM Diplomacy Tactics Used:</div>
            <ul className="space-y-1 text-[#1A1A1A] text-[11px] list-disc list-inside font-medium leading-normal">
              <li>Re-frames scope trim as a protective measure to guarantee the fixed launch date.</li>
              <li>Acknowledge past progress before introducing contractual milestone approval requirement.</li>
              <li>Converts unbilled custom scope into Phase 2 expansion revenue instead of discounting hours.</li>
            </ul>
          </div>
        </div>

        {/* Live Email Editor */}
        <div className="lg:col-span-2 bg-white border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-3 mb-4 font-mono">
              <span className="text-xs font-bold text-[#1A1A1A] uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF4E00]" />
                Live Email Editor & Preview
              </span>
              <span className="text-[11px] font-bold text-[#FF4E00] bg-[#1A1A1A] px-2 py-0.5 text-white">Tone: {tone}</span>
            </div>

            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              rows={18}
              className="w-full bg-[#F2F1EF] border-2 border-[#1A1A1A] p-4 text-xs sm:text-sm text-[#1A1A1A] font-mono leading-relaxed focus:outline-none resize-y"
            />
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[#1A1A1A] flex items-center justify-between text-xs font-mono">
            <span className="text-[#555]">Character count: {emailBody.length}</span>
            <span className="text-emerald-700 font-bold uppercase">Ready to send to client</span>
          </div>
        </div>
      </div>
    </div>
  );
};
