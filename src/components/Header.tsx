import React from 'react';
import { TabType } from '../types';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldAlert,
  Send,
  Layers,
  BarChart3,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenPressureTest: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPressureTest,
}) => {
  return (
    <header className="bg-[#1A1A1A] text-[#F2F1EF] sticky top-0 z-30 border-b-2 border-[#1A1A1A] shadow-[0_4px_0_0_#FF4E00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#FF4E00] text-black font-display font-bold text-xl flex items-center justify-center border-2 border-white shadow-[2px_2px_0px_0px_#FFFFFF]">
              DH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display font-bold tracking-tight text-white uppercase">
                  Digital Heroes
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-mono font-bold uppercase bg-[#FF4E00] text-black border border-white">
                  Delivery Management System
                </span>
              </div>
              <p className="text-xs text-gray-300 font-medium">
                Project Recovery Hub &bull; Agency Delivery Operating System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* AI Pressure Test Button */}
            <button
              onClick={onOpenPressureTest}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF4E00] hover:bg-white text-black font-display font-bold text-xs uppercase tracking-wider border-2 border-white shadow-[3px_3px_0px_0px_#FFFFFF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <Sparkles className="w-4 h-4 text-black" />
              AI Pressure Test
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 border-t border-[#333] pt-3 text-xs sm:text-sm font-display font-bold">
          <button
            onClick={() => setActiveTab('taskA')}
            className={`flex items-center gap-2 px-4 py-2 border-2 transition-all whitespace-nowrap ${
              activeTab === 'taskA'
                ? 'bg-[#F2F1EF] text-black border-white shadow-[3px_3px_0px_0px_#FF4E00]'
                : 'text-gray-300 border-transparent hover:text-white hover:bg-[#282828]'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-[#FF4E00]" />
            <span>PROJECT RECOVERY KIT</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-red-600 text-white font-mono uppercase">
              40% Overrun
            </span>
          </button>

          <button
            onClick={() => setActiveTab('taskB')}
            className={`flex items-center gap-2 px-4 py-2 border-2 transition-all whitespace-nowrap ${
              activeTab === 'taskB'
                ? 'bg-[#F2F1EF] text-black border-white shadow-[3px_3px_0px_0px_#FF4E00]'
                : 'text-gray-300 border-transparent hover:text-white hover:bg-[#282828]'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>DELIVERY OPERATING SYSTEM</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-emerald-600 text-white font-mono uppercase">
              Agency OS
            </span>
          </button>

          <button
            onClick={() => setActiveTab('submission')}
            className={`flex items-center gap-2 px-4 py-2 border-2 transition-all whitespace-nowrap ${
              activeTab === 'submission'
                ? 'bg-[#F2F1EF] text-black border-white shadow-[3px_3px_0px_0px_#FF4E00]'
                : 'text-gray-300 border-transparent hover:text-white hover:bg-[#282828]'
            }`}
          >
            <Send className="w-4 h-4 text-amber-400" />
            <span>DOCUMENTATION & COMPLIANCE HUB</span>
          </button>

          <button
            onClick={() => setActiveTab('aiHub')}
            className={`flex items-center gap-2 px-4 py-2 border-2 transition-all whitespace-nowrap ${
              activeTab === 'aiHub'
                ? 'bg-[#F2F1EF] text-black border-white shadow-[3px_3px_0px_0px_#FF4E00]'
                : 'text-gray-300 border-transparent hover:text-white hover:bg-[#282828]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-violet-400" />
            <span>AI ANALYSIS & SYSTEM AUDIT</span>
          </button>
        </div>
      </div>
    </header>
  );
};

