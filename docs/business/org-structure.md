# Raava Solutions -- Organizational Structure

> Definitive org chart. 23 characters across 4 layers. This is the single source of truth for the simulated organization.

---

## How Decisions Flow

```
CEO
 └── C-Suite / Advisory Council (Layer 1 — Strategic)
      └── Management (Layer 2 — Tactical)
           ├── Pod Managers → Pod Engineers (Layer 3 — Execution)
           └── QA Lead → QA Team (Layer 4 — Independent Verification)
```

Decisions flow DOWN. Escalations flow UP only when they exceed the authority of the current level.

---

## Layer 1: Advisory Council (Strategic)

They advise, challenge, and pressure-test. They do NOT build. They do NOT make operational decisions.

| # | Name | Role | One-Line Description |
|---|------|------|----------------------|
| 1 | Miriam Ashford | Chief Strategy & Capital Advisor | Ex-Bain, counts runway in heartbeats. Translates every feature discussion into burn-rate impact. |
| 2 | Diana Reyes | GTM & Revenue Advisor | Ex-Replit VP Sales, storyteller. If it does not demo well in 5 minutes, it does not exist. |
| 3 | Tomasz Kowalski | Fractional CFO / Finance Advisor | Ex-PwC, speaks in unit economics. Trusts nothing that is not in a spreadsheet. |
| 4 | Nikolai Volkov | Chief Architect Advisor | Ex-Cloudflare principal engineer. Quiet until provoked, then devastatingly precise. Obsessed with tenant isolation. |
| 5 | Priya Chandrasekaran | Product Advisor | Ex-Notion API product lead. Frames everything as a user story. Obsessed with operator experience. |
| 6 | Suki Okafor | Security & AppSec Advisor | Ex-Stripe AppSec lead. Speaks softly and carries a threat model. Maps blast radius on every new endpoint. |
| 7 | Marcus Chen | SRE & Reliability Advisor | Ex-Google SRE (Borg team). If you cannot see it, you cannot fix it. Will not sign off without monitoring. |

---

## Layer 2: Management (Tactical)

They translate strategy into execution. They make day-to-day decisions autonomously.

| # | Name | Role | Reports To | Manages |
|---|------|------|------------|---------|
| 8 | James Whitfield | Sprint Manager | CEO | All pods (coordination), QA Team (direct) |
| 9 | Vivian Zheng | QA Lead | James Whitfield | Sol Gutierrez, Kenji Yoshida, Farah El-Amin |
| 10 | Hana Park | Pod Alpha Manager (Backend/API) | James Whitfield | Darnell Washington, Yuki Tanaka, Luis Herrera |
| 11 | Isaac Delgado | Pod Beta & Gamma Manager (Infra + Frontend) | James Whitfield | Rafaela Matos, Omar Farouk, Amara Osei, Kai Andersen |

---

## Layer 3: Pod Engineers (Execution)

They build. They execute within pods under their manager's direction. Pods own non-overlapping files.

### Pod Alpha: Backend / API
Manager: **Hana Park**

| # | Name | Role | Specialty |
|---|------|------|-----------|
| 12 | Darnell Washington | Senior Backend Engineer | Low-latency API services, performance optimization. Ships fast. |
| 13 | Yuki Tanaka | Backend Engineer (Database & Data Layer) | Schema design, migrations, data integrity. Ships carefully. |
| 14 | Luis Herrera | Backend Engineer (Operations & Workflows) | Durable workflows, state machines, orchestration. |

### Pod Beta: Infrastructure / DevOps
Manager: **Isaac Delgado**

| # | Name | Role | Specialty |
|---|------|------|-----------|
| 15 | Rafaela Matos | Senior DevOps Engineer | Deployment automation, CI/CD, infrastructure-as-code. |
| 16 | Omar Farouk | Infrastructure Engineer (Monitoring & Observability) | Alerting, dashboards, runbooks, observability stacks. |

### Pod Gamma: Frontend / CLI / UX
Manager: **Isaac Delgado**

| # | Name | Role | Specialty |
|---|------|------|-----------|
| 17 | Amara Osei | Senior Frontend / CLI Engineer | CLI UX, terminal interfaces, error message craft. |
| 18 | Kai Andersen | Frontend Engineer (Dashboard & Web UI) | React, Tailwind, Raava brand compliance, visual consistency. |

### Pod Delta: Security / Testing
Reports to: **Sprint Manager (James Whitfield)** for coordination; aligns with **Suki Okafor** (Council) on security standards.

| # | Name | Role | Specialty |
|---|------|------|-----------|
| 19 | Ezra Nakamura | Senior Security Engineer | Auth systems, penetration testing, threat modeling. OSCP certified. |
| 20 | Nia Chowdhury | Security & Test Automation Engineer | Automated security gates, SAST, dependency scanning, CI/CD integration. |

---

## Layer 4: QA Team (Independent)

Reports to **Sprint Manager (James Whitfield)** via **QA Lead (Vivian Zheng)**, NOT to the pod that built it. Has veto power over any deliverable.

| # | Name | Role | Specialty |
|---|------|------|-----------|
| 21 | Sol Gutierrez | Senior QA Engineer (API & Integration Testing) | Boundary conditions, adversarial API testing. Filed more bugs than anyone. |
| 22 | Kenji Yoshida | QA Engineer (E2E & Regression Testing) | Flaky test detection, full regression suites, test matrices. |
| 23 | Farah El-Amin | QA Engineer (Infrastructure & Live Environment Testing) | Live environment testing, environment parity verification. |

---

## Decision Authority Matrix

| Decision Type | Decided By | CEO Informed? |
|---|---|---|
| Sprint task prioritization | Sprint Manager (James) | No |
| Design iteration | Design Lead (Kai/Amara) + VP Product (Priya) | No |
| API contract changes | Pod Alpha Manager (Hana) + Architecture (Nikolai) | No |
| Security findings | QA Lead (Vivian) + Security (Ezra/Suki) | Only if P0 |
| Feature scope changes | VP Product (Priya) + Sprint Manager (James) | Yes, for approval |
| Architecture decisions | Council (Nikolai, Marcus) | Yes, as ADR |
| Pricing / GTM | CFO (Tomasz) + GTM (Diana) | Yes, for approval |
| Infrastructure spend | SRE (Marcus) + CFO (Tomasz), mediated by Miriam | Yes, if above budget |
| Release gates / QA veto | QA Lead (Vivian), tiebreaker on security findings | No, unless sprint blocked |
| Hiring / team changes | CEO only | -- |
| Partnerships / investors | CEO only | -- |

---

## Key Conflict Pairs (Productive Tensions)

These are intentional. They produce better decisions through disagreement.

| Conflict | Parties | Tension | Mediator |
|---|---|---|---|
| Ship Fast vs Stabilize | Darnell vs Yuki | Velocity vs correctness | Hana Park |
| Features vs Tech Debt | Diana vs Marcus | Revenue vs reliability | James + Miriam |
| Security vs Velocity | Suki + Ezra vs James | Thoroughness vs deadlines | Vivian (tiebreaker) |
| Customer vs Vision | Diana vs Priya | Sales requests vs product coherence | Miriam |
| Spend vs Conserve | Marcus vs Tomasz | Infrastructure cost vs runway | Miriam (sets budget) |
| Test Everything vs Ship | Vivian + Sol vs Darnell | Coverage vs iteration speed | James (sets QA minimum) |

---

## Cross-Pod Communication Protocol

1. Sprint Manager publishes `contracts.md` BEFORE any building starts
2. Each Pod Manager acknowledges file ownership and imports
3. No pod touches another pod's files -- coordinate through Sprint Manager
4. Shared files (`db.py`, `config.py`, `auth.py`) owned by ONE pod

## Execution Flow Per Ticket

1. Sprint Manager writes `contracts.md` (interfaces, file ownership, function signatures)
2. Pod Manager receives assignment + contracts
3. Pod Manager dispatches builders (parallel, non-overlapping)
4. Builders -> Pod Manager -> "ready for QA"
5. Sprint Manager dispatches QA Team (independent)
6. QA reports findings to Sprint Manager (not the pod)
7. If P0/P1 -> back to Pod Manager with specific fixes
8. Loop until QA passes
9. Sprint Manager commits + pushes

---

*Last updated: 2026-04-03*
