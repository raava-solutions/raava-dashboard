# HANDOFF.md — Raava Dashboard Cold-Start Document

**Last Updated:** April 5, 2026
**Author:** James Whitfield, Sprint Manager
**Purpose:** A new team member or session with zero context should be able to read this one file and understand everything needed to continue work on the Raava Dashboard.

---

## Project Overview

### What is Raava Dashboard?

Raava Dashboard is a **client-facing AI workforce management platform**. It presents AI agents (running in LXD containers) as "team members" that a non-technical business operator can hire, manage, and monitor — the same way they'd manage human employees.

The codebase is a **fork of Paperclip** (an internal agent orchestration tool). Paperclip's full control plane — 100+ API endpoints, 24 routers, 14 database tables — is repurposed as the backend. The Raava frontend is a conditional layer that activates when `PAPERCLIP_DEPLOYMENT_MODE=fleetos` is set, replacing Paperclip's developer-oriented UI with a business-friendly experience.

### What is FleetOS?

FleetOS is the **backend API** that manages Hermes agents running inside LXD virtual machines. It handles:
- Agent provisioning and lifecycle management
- Container health monitoring
- Credential vault integration (1Password/op run)
- Task assignment and execution
- Cost/billing tracking

FleetOS runs at `http://localhost:8400` and is proxied server-side through the Paperclip backend. **It is never exposed directly to the browser.** The adapter layer is invisible to end users.

### Relationship

```
[Browser] → [Raava Dashboard UI] → [Paperclip Server (port 3100)]
                                         ↓ (server-side proxy)
                                    [FleetOS API (port 8400)]
                                         ↓
                                    [LXD Containers / Hermes Agents]
```

---

## Current State (as of April 5, 2026)

### What's Built and Merged

| PR | Description | Status |
|----|-------------|--------|
| #1 | FleetOS Docker stack (RAA-285) | Merged to master |
| #2 | FleetOS auth integration (RAA-287) | Merged to master |
| #3 | Fleet views — agent list, detail (RAA-292) | Merged to master |
| #4 | Auth bug fixes — cookie decode, error handling (RAA-323/326) | Merged to master |
| #5 | Raava MVP — onboarding wizard, sidebar, home, terminology, brand (RAA-337-341) | Merged to master |
| #6 | Raava Frontend v2 — all pages match Figma (feature branch) | On `feature/raava-frontend-v2` |

**PR #6 (feature/raava-frontend-v2)** contains the complete frontend with:
- RaavaHome dashboard
- RaavaOnboardingWizard (role-card based)
- Raava Sidebar
- RaavaTeamMemberDetail (6 tabs)
- RaavaTasks + RaavaTaskDetail
- RaavaInbox
- Terminology pass (~90% coverage)
- Brand pass (CSS variables, gradients, Syne + Plus Jakarta Sans fonts)
- 2 rounds of CodeRabbit fixes applied

### What's Deployed

- **Cloudflare Tunnel:** The dashboard is accessible via Cloudflare tunnel (check tunnel config for current URL)
- **Local:** `http://localhost:3100` with `PAPERCLIP_DEPLOYMENT_MODE=fleetos`

### What's in Figma

- **File:** https://www.figma.com/design/J1ht22xd1fMhT57kO0xkj5
- **Screens:** 37 total (24 in main prototype + 13 supplementary)
- **Connections:** 169 prototype connections
- **Status:** Signed off by Diana (VP Product) + Leo (Design Lead) — see `docs/design/DESIGN_SIGNOFF.md`

### What's in Linear

- **Team:** Raava Solutions
- **Ticket Range:** RAA-285 through RAA-343
- **Done:** RAA-285, RAA-287, RAA-292, RAA-323, RAA-326, RAA-337, RAA-338, RAA-339, RAA-340, RAA-341, RAA-342
- **Open:** RAA-343 (API gap report — produced but needs verification)

---

## Architecture

### Codebase Location

```
/home/master/raava-dashboard
```

### Branch Strategy

```
feature/* branches → Pull Request → Code Review (CodeRabbit + manual) → Merge to master
```

Current active branch: `feature/raava-frontend-v2`

### Key Frontend Files

| File | Purpose |
|------|---------|
| `ui/src/components/RaavaOnboardingWizard.tsx` | 4-step role-card onboarding wizard |
| `ui/src/pages/RaavaHome.tsx` | Dashboard with spend widget, team status, recent tasks |
| `ui/src/pages/RaavaTasks.tsx` | Task list page |
| `ui/src/pages/RaavaTaskDetail.tsx` | Individual task detail |
| `ui/src/pages/RaavaInbox.tsx` | Notification inbox |
| `ui/src/components/Sidebar.tsx` | Conditional Raava/Paperclip sidebar |
| `ui/src/hooks/useIsRaava.ts` | Hook that checks deployment mode |
| `ui/src/App.tsx` | Route definitions, conditional page rendering |
| `ui/src/pages/Agents.tsx` | "My Team" page (fleetos mode) |
| `ui/src/pages/AgentDetail.tsx` | "Team Member Detail" page (fleetos mode) |

### How FleetOS Mode Works

The `useIsRaava()` hook reads the deployment mode from the server config. When `PAPERCLIP_DEPLOYMENT_MODE=fleetos`:

1. The sidebar renders Raava branding, navigation labels ("My Team", "Tasks", "Billing")
2. Routes swap Paperclip pages for Raava equivalents
3. Terminology transforms apply (Agent → Team Member, Issue → Task, etc.)
4. The onboarding wizard appears for first-time setup
5. CSS variables override to Raava brand colors/fonts

When the mode is anything else, the standard Paperclip UI renders unchanged.

### FleetOS API Proxy

The Paperclip server acts as a proxy to FleetOS. API calls from the browser go to `/api/fleetos/*` on port 3100, and the server forwards them to `http://localhost:8400`. This keeps the FleetOS API completely hidden from the browser — no CORS, no credential exposure, no direct access.

---

## How to Run Locally

### Prerequisites

- **Node.js:** 20+ (required)
- **pnpm:** 9.15.4 (exact version in `packageManager` field)
- **PostgreSQL:** Local instance or use embedded-postgres (auto-starts)

### Environment Variables

Create a `.env` file in the repo root:

```env
PORT=3100
SERVE_UI=true
PAPERCLIP_DEPLOYMENT_MODE=fleetos
FLEETOS_API_URL=http://localhost:8400
```

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | Yes | Server port (default 3100) |
| `SERVE_UI` | Yes | Set `true` to serve the UI from the server |
| `PAPERCLIP_DEPLOYMENT_MODE` | Yes | Set `fleetos` for Raava mode |
| `FLEETOS_API_URL` | Yes | FleetOS backend URL |
| `DATABASE_URL` | No | PostgreSQL connection string (embedded-postgres used if absent) |

### Start Command

```bash
# Install dependencies
pnpm install

# Run database migrations
pnpm db:migrate

# Start development server (watches for changes)
pnpm dev

# Or start without watch mode
pnpm dev:once
```

The dashboard will be available at `http://localhost:3100`.

### Login

The auth flow uses FleetOS session tokens. For local development, ensure the FleetOS API is running at the configured URL and has valid session data. The login page is at `/auth/login`.

---

## How to Deploy

### Cloudflare Tunnel (Current)

The current deployment uses a Cloudflare tunnel pointing to `localhost:3100`. The tunnel is configured on the host machine. To check or restart:

```bash
# Check tunnel status
cloudflared tunnel list

# Run the tunnel
cloudflared tunnel run raava-dashboard
```

### Docker Compose (Production Stack)

```bash
cd docker/
docker compose -f docker-compose.production.yml up -d
```

The production stack includes: Paperclip server, PostgreSQL, and Nginx reverse proxy. Configuration files are in `docker/`.

### GCP

GCP deployment infrastructure exists but requires auth setup. Not currently used for the eMerge demo.

---

## Document Index

### Product (`docs/product/`)

| Document | Description |
|----------|-------------|
| `RAAVA_PRODUCT_PACKAGE.md` | Complete product spec: personas, value prop, feature specs, onboarding wizard, 6 role definitions, GTM strategy |
| `RAAVA_PRICING_MODEL.md` | 3-tier pricing: Solo ($99), Pod ($299), Swarm ($799), Full Org (enterprise) |
| `RAAVA_EXECUTIVE_BRIEFING.md` | Investor/executive-facing overview of Raava platform and market position |
| `RAAVA_ORG_TAXONOMY.md` | 4-tier organizational structure: Solo → Pod → Swarm → Full Org |
| `RAAVA_USER_FLOWS.md` | 4 detailed user flows (88 screens): onboarding, team management, task management, billing |
| `RAAVA_JOURNEY_MAP.md` | 8 customer journeys with 320 hotspots covering the full user lifecycle |

### Design (`docs/design/`)

| Document | Description |
|----------|-------------|
| `AGENT_ROLE_CARDS_CONCEPT.md` | Role-card onboarding concept: 6 pre-configured agent personas with visual design specs |
| `DESIGN_SIGNOFF.md` | Diana + Leo's screen-by-screen sign-off of all 24 Figma prototype screens |
| `DESIGN_DISPATCH_BRIEF.md` | Complete design brief dispatched to the design pod: tokens, components, page specs |
| `FIGMA_PROTOTYPE_PLAN.md` | Figma prototype plan: screens, connections, interaction patterns, 5-phase build |
| `CEO_FEEDBACK_ROUND1.md` | Richard's feedback on Round 1 designs with resolution status |

### Competitive (`docs/competitive/`)

| Document | Description |
|----------|-------------|
| `COMPETITIVE_SINTRA.md` | Deep analysis of Sintra AI: pricing, positioning, strengths, vulnerabilities |
| `COMPETITIVE_DEEP_DIVE.md` | Comprehensive competitive landscape: Lindy (5,000+ integrations), Relevance (9,000+ tools), positioning strategy |

### Engineering (`docs/engineering/`)

| Document | Description |
|----------|-------------|
| `API_GAP_REPORT.md` | Gap analysis between current API endpoints and what the frontend needs |
| `FLEETOS_API_REQUIREMENTS.md` | Complete FleetOS API requirements: endpoints, data shapes, auth, error handling |

### QA (`docs/qa/`)

| Document | Description |
|----------|-------------|
| `QA_SECURITY_REPORT_PR5.md` | Security review findings for PR #5 (Raava MVP merge) |

---

## Key Decisions Made

These are settled. Do not re-litigate without CEO approval.

| Decision | Rationale |
|----------|-----------|
| **Paperclip fork, not build from scratch** | 100+ endpoints, 24 routers, 14 DB tables already exist. Building from scratch would take 6+ months. Fork gives us a working control plane in weeks. |
| **FleetOS hidden from users** | The adapter/provisioning layer is invisible. Users see "Team Members," not "LXD containers." Technical complexity is abstracted away entirely. |
| **Role-card onboarding (not adapter picker)** | Users choose a business role ("Sales Assistant"), not a technical adapter. The mapping to FleetOS agents happens behind the scenes. |
| **Terminology mapping** | Agent → Team Member, Issue → Task, Company → Organization, Workspace → Department, Cost → Billing, Routine → Standing Order |
| **4-tier architecture** | Solo (1 agent) → Pod (3-5 agents) → Swarm (6-15 agents) → Full Org (16+). Maps to pricing tiers. |
| **Pricing** | Solo: $99/mo, Pod: $299/mo, Swarm: $799/mo, Full Org: Custom enterprise |
| **eMerge Americas: April 22, 2026** | Hard deadline. Demo must be functional (not just a prototype) with real provisioning and at least one real task execution. |

---

## What's Next

### Remaining Frontend Work

| Pod | Work | Effort |
|-----|------|--------|
| Pod 6 | Org Chart page, Tools/Integrations page | 2-3 days |
| Pod 7 | Loading states, error states, empty states, transitions, polish | 2-3 days |

### Backend Integration (Critical Path)

| Work | Effort | Why It Matters |
|------|--------|----------------|
| Credential validation + vault storage API | 2-3 days | Onboarding wizard is the demo showpiece; fake credentials kill credibility |
| Real provisioning from wizard completion | 1-2 days | "Watch your team member come alive" is the money shot for eMerge |
| Spend/billing aggregation API | 1-2 days | Real numbers, even $0.03, beat hardcoded "$127.40" |
| Task list/detail API (verify Issue endpoints work) | 1 day | Shows agents doing actual work |
| Container health enhancement (status enum, uptime) | 1 day | Accurate team status strip on Home |

### Demo Prep

- Write and rehearse a 3-minute demo script
- 3 full dress rehearsals on actual demo hardware
- Mobile hotspot for conference WiFi backup
- Pre-provisioned "warm" agents as fallback
- Offline screenshots as last resort

### eMerge Readiness Score: 5.5 / 10

| Dimension | Score | Notes |
|-----------|-------|-------|
| Product definition | 9/10 | Complete: personas, pricing, flows, competitive positioning |
| Design | 8/10 | 24 screens signed off, prototype complete |
| Frontend UI | 7/10 | Core screens built and branded. Detail pages done on feature branch. |
| Backend integration | 3/10 | Auth works. Everything else mocked or untested E2E. |
| Demo reliability | 3/10 | Happy path only. No error handling. No rehearsal. |
| Content/marketing | 4/10 | Tagline and pitch exist. No booth materials. |

Two focused backend integration sessions move this to 7.5. A third for polish and rehearsal gets to 8.5+.

---

## Team and Contacts

| Role | Name | Notes |
|------|------|-------|
| **CEO** | Richard Cruz | Final approval on all direction changes |
| **Sprint Manager** | James Whitfield | Sprint planning, process, delivery |
| **VP Product** | Diana Park | Product spec, user flows, sign-off authority |
| **CTO** | Marcus Chen | Architecture, backend, technical decisions |
| **Startup Advisor** | Kai Nakamura | Strategic guidance, scope discipline |
| **QA Lead** | Vivian Torres | Testing, quality gates, demo readiness |
| **Design Lead** | Leo | Figma, visual design, brand compliance |

### Key URLs

| Resource | URL |
|----------|-----|
| Figma | https://www.figma.com/design/J1ht22xd1fMhT57kO0xkj5 |
| GitHub | https://github.com/raava-solutions/raava-dashboard (private) |
| Linear | Raava Solutions team workspace |
| FleetOS API (local) | http://localhost:8400 |
| Dashboard (local) | http://localhost:3100 |

---

## Known Issues and Tech Debt

1. **Hardcoded mock data** — Home dashboard has hardcoded task items and "$127.40" spend
2. **Terminology pass incomplete** — ~90% coverage; deep pages (activity log, run details, plugin screens) still show Paperclip language
3. **No credential vault integration** — Onboarding wizard accepts but doesn't store/validate credentials
4. **No E2E tests** — Manual QA only; no automated regression safety net
5. **No integration tests** — Frontend and backend have never completed a full user journey together
6. **6 open backend bugs** — Health endpoint 500, manifest 404, systemd config issue, Doctor false positives, terminal continuity, container_exec TaskGroup error (documented in April 4 journal)
7. **Brand pass edge cases** — Some components may show Paperclip styling in error/loading/empty states

---

*This document is the single source of truth for cold-starting on the Raava Dashboard project. If it contradicts another document, this one is more recent. Update it when the state changes.*
