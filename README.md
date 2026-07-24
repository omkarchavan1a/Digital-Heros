# Digital Heroes - Delivery Operating System & Project Recovery Suite

An agency delivery management platform and project recovery workspace engineered for Digital Heroes.

## Overview

This application provides a complete framework for agency operations, scope triage, commercial margin modeling, multi-timezone delivery governance, and AI-powered pressure testing.

### Key Modules

1. **Project Recovery Kit**
   - **Scope Triage & Timeline**: Re-negotiate over-budget deliverables, separate MVP core from retainer enhancements, and rebuild realistic milestone schedules.
   - **Commercial Margin Analysis**: Financial scenario modeling evaluating agency gross margins across absorb vs. re-negotiate operational strategies.
   - **Client Escalation Email Studio**: Interactive email draft generator with AI polish capabilities for firm, polite client re-negotiation.
   - **Preventive Delivery Controls**: Quantitative risk thresholds and variance triggers to catch scope creep before profit erosion.

2. **Delivery Operating System (Agency OS)**
   - **Delivery SOP Manual**: Standard operating procedures guiding delivery leads through intake, execution, QA, client review, and retrospective.
   - **RACI & Escalation Matrix**: Clear governance across 5 concurrent client projects in EST, GMT, and IST timezones with strict SLA response times.
   - **Weekly Status Report Builder**: Clean client update template standard with explicit exclusions rationale.
   - **5 Core Delivery Health Metrics**: Quantitative indicators tracking sprint velocity, gross margin, client sentiment, team utilization, and SLA compliance.

3. **Compliance & Documentation Hub**
   - Verification tools for documentation setup, AI disclosure statements, and system recording walkthrough scripts.

4. **AI Analysis & System Audit**
   - Gemini-powered evaluation engine (Gemini 3.6 Flash) that pressure-tests delivery plans, financial scenarios, email tone, and RACI governance.

## Technical Architecture

- **Frontend**: React 18 with TypeScript, Vite, Tailwind CSS (Neo-brutalist dark/light visual aesthetic), and Lucide React icons.
- **Backend**: Express server (`server.ts`) proxying server-side Google GenAI (Gemini 3.6 Flash) API requests safely.
- **State Management**: Reactive React state with modular component structure.

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Server will run on `http://localhost:3000`.
