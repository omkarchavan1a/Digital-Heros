import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI lazily/safely
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Route: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Route: Pressure-test recovery plan
  app.post('/api/ai/pressure-test', async (req, res) => {
    try {
      const { recoveryPlan, marginDetails, clientEmail, controls } = req.body;
      const ai = getGenAI();

      const prompt = `
You are a Partner and Delivery Director at an elite digital agency ("Digital Heroes").
A candidate Project Manager has submitted a recovery plan for a project that was 40% over budgeted hours and 3 weeks behind.

Candidate's Submitted Data:
- Recovery Scope Strategy: ${JSON.stringify(recoveryPlan || {}, null, 2)}
- Margin Analysis / Financial Strategy: ${JSON.stringify(marginDetails || {}, null, 2)}
- Proposed Client Communication Email: ${clientEmail || 'N/A'}
- Delivery Controls: ${JSON.stringify(controls || {}, null, 2)}

Provide a sharp, constructive, partner-level review with score (out of 100) across:
1. Recovery Logic & Scope Prioritization (30%)
2. Commercial Reasoning & Margin Preservation (25%)
3. Client Handling & Communication (25%)
4. Preventive Controls (20%)

Provide output in JSON format with keys:
- overallScore: number (0-100)
- verdict: "Outstanding Senior PM" | "Strong Operational Fit" | "Needs Commercial Polish" | "High Risk Strategy"
- breakdownScores: { recovery: number, commercial: number, clientHandling: number, controls: number }
- strengths: string[]
- blindspotsAndRisks: string[]
- recommendedTweaks: string[]
- clientPushbackSimulation: string (Predict what the client will reply to this email and how the PM should hold ground)
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '{}';
      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error('Error in /api/ai/pressure-test:', error);
      res.status(500).json({
        error: error.message || 'Failed to pressure test recovery plan',
        fallback: {
          overallScore: 88,
          verdict: 'Strong Operational Fit',
          breakdownScores: { recovery: 27, commercial: 22, clientHandling: 21, controls: 18 },
          strengths: [
            'Clear separation of must-have MVP vs renegotiable phase 2 scope',
            'Strong awareness of billable rate impact during staffing reallocation',
          ],
          blindspotsAndRisks: [
            'Client may challenge the re-estimation if initial specs were ambiguous',
          ],
          recommendedTweaks: [
            'Explicitly tie milestone 3 approval to immediate release of design assets',
          ],
          clientPushbackSimulation:
            'Client: "We understand the delay, but we cannot sacrifice Feature X before launch. Can we compromise on a phased rollout?"',
        },
      });
    }
  });

  // API Route: AI Email Polish
  app.post('/api/ai/email-polish', async (req, res) => {
    try {
      const { rawEmail, tone, clientContext } = req.body;
      const ai = getGenAI();

      const prompt = `
You are an expert agency Director helping a Project Manager write a sensitive recovery email to a client whose project is 40% over budget and 3 weeks behind, and has stopped approving milestones.

Current Raw Email Draft:
"${rawEmail}"

Desired Tone: ${tone || 'Strategic & Diplomatic'}
Client Context: ${clientContext || 'Retainer client with high standards, sensitive to schedule delays'}

Re-write this email to achieve:
1. Re-open milestone approvals politely without conceding account profitability.
2. Re-frame scope trims as strategic launch focus.
3. Establish firm dates and dependencies.

Return JSON with:
- polishedSubject: string
- polishedBody: string
- keyChangesMade: string[]
- diplomacyTacticsUsed: string[]
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '{}';
      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error('Error in /api/ai/email-polish:', error);
      res.status(500).json({ error: error.message || 'Failed to polish email' });
    }
  });

  // API Route: Generate AI Usage Disclosure
  app.post('/api/ai/generate-disclosure', async (req, res) => {
    try {
      const { promptDetails, manualChanges } = req.body;
      const ai = getGenAI();

      const prompt = `
Write a concise, transparent 1-paragraph statement required for the Digital Heroes interview task submission.
Rule requirement: "Add one short paragraph telling us where you used AI and what you changed afterwards."

Prompt Details / Concepts Explored: ${promptDetails || 'Used Gemini to pressure test margin calculations, draft RACI templates, and refine client recovery email tones.'}
Human Modifications & Judgment Applied: ${manualChanges || 'Adjusted the critical path timeline to align with 3 time-zone pod constraints, tweaked margin calculations for actual billable rates, and sharpened the escalation SLAs.'}

Format as a single well-crafted paragraph (70-120 words). Return JSON: { "aiDisclosureParagraph": string }
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error('Error generating disclosure:', error);
      res.status(500).json({
        aiDisclosureParagraph:
          'I utilized AI (Gemini 3.6) to brainstorm scenario edge cases for the project recovery plan and draft baseline RACI matrix structures across multi-timezone agency pods. After receiving initial model outputs, I heavily refined the margin analysis model to reflect actual billable hourly rates, restructured the critical path to account for cross-project staff reallocations, and personalized the client recovery email to ensure an assertive yet partner-centric tone.',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
