export type TabType = 'taskA' | 'taskB' | 'submission' | 'aiHub';

export type TaskASubTab = 'recoveryPlan' | 'marginAnalysis' | 'clientEmail' | 'preventiveControls';
export type TaskBSubTab = 'deliverySOP' | 'raciMatrix' | 'statusReport' | 'healthMetrics';

export interface ScopeItem {
  id: string;
  featureName: string;
  originalEstimateHours: number;
  spentHours: number;
  remainingHours: number;
  category: 'core' | 'secondary' | 'niceToHave';
  action: 'ship' | 'cut' | 'renegotiate';
  owner: string;
  rationale: string;
}

export interface Milestone {
  id: string;
  title: string;
  originalDueDate: string;
  revisedDueDate: string;
  status: 'approved' | 'blocked' | 'in_progress' | 'pending';
  budgetedHours: number;
  actualHours: number;
  deliverables: string[];
}

export interface MarginScenario {
  id: string;
  name: string;
  description: string;
  totalHours: number;
  billableRateAvg: number;
  blendedCostRate: number;
  totalClientContract: number;
  actualLaborCost: number;
  grossMarginDollars: number;
  grossMarginPercent: number;
  clientRiskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  pros: string[];
  cons: string[];
}

export interface ControlRule {
  id: string;
  controlName: string;
  cadence: string;
  varianceThreshold: string;
  triggerSignal: string;
  escalationAction: string;
  owner: string;
}

export interface RACIRow {
  id: string;
  taskPhase: string;
  deliverable: string;
  devPod: 'R' | 'A' | 'C' | 'I' | '-';
  designPod: 'R' | 'A' | 'C' | 'I' | '-';
  marketingPod: 'R' | 'A' | 'C' | 'I' | '-';
  leadPM: 'R' | 'A' | 'C' | 'I' | '-';
  clientSponsor: 'R' | 'A' | 'C' | 'I' | '-';
  primaryTimezone: string;
}

export interface EscalationTier {
  tier: string;
  triggerCondition: string;
  pmAction: string;
  escalatesTo: string;
  slaResponseTime: string;
}

export interface HealthMetric {
  id: string;
  name: string;
  code: string;
  currentValue: number;
  unit: string;
  targetRange: string;
  warningThreshold: number;
  criticalThreshold: number;
  status: 'healthy' | 'warning' | 'critical';
  calculationFormula: string;
  actionWhenTriggered: string;
}

export interface StatusReportData {
  projectName: string;
  clientName: string;
  reportDate: string;
  overallRAG: 'Green' | 'Amber' | 'Red';
  scheduleRAG: 'Green' | 'Amber' | 'Red';
  budgetRAG: 'Green' | 'Amber' | 'Red';
  scopeRAG: 'Green' | 'Amber' | 'Red';
  executiveSummary: string;
  accomplishmentsThisWeek: string[];
  plannedNextWeek: string[];
  keyRisksAndBlockers: { risk: string; mitigation: string; owner: string }[];
  deliberatelyExcludedItems: { item: string; rationale: string }[];
}

export interface AIPressureTestResult {
  overallScore: number;
  verdict: string;
  breakdownScores: {
    recovery: number;
    commercial: number;
    clientHandling: number;
    controls: number;
  };
  strengths: string[];
  blindspotsAndRisks: string[];
  recommendedTweaks: string[];
  clientPushbackSimulation: string;
}
