# RAAVA ORGANIZATIONAL TAXONOMY
## Product Spec Addendum -- April 3, 2026

**Author:** Diana (VP Product)
**Status:** Ready for CEO review
**Relates to:** `RAAVA_PRODUCT_PACKAGE.md` (Deliverable 3: Product Spec)
**Supersedes:** "Org chart toggle" mention in My Team page spec (line 227 of Product Package)

---

## 1. THE PROBLEM

The current product spec treats all team members as a flat roster under "My Team." This works for Tier 1 (a single agent) and maybe early Tier 2 (a small pod), but it collapses the moment a user has 6+ team members with reporting relationships, specialized groups, or any kind of hierarchy.

The CEO's FigJam architecture defines four tiers:
- **Tier 1:** Solo Agent (User -> Agent)
- **Tier 2:** Pod (User -> Pod Manager -> Agent x3)
- **Tier 3:** Swarm (User -> Division Leader -> Pod Manager x3 -> Agent x9)
- **Tier 4:** Full Org (User -> CEO Agent -> C-Suite -> VPs -> Pod Managers -> Agents)

We need a noun system, a navigation structure, and a set of launch templates that make this hierarchy feel natural to business users -- not just technically correct.

---

## 2. ORGANIZATIONAL TAXONOMY

### The Nouns

| Tier | Container Noun | Leader Noun | Worker Noun | Total Agents (Typical) |
|---|---|---|---|---|
| 1 | *(none)* | *(none)* | Team Member | 1 |
| 2 | **Team** | Team Lead | Team Member | 3-5 |
| 3 | **Division** | Division Director | Team Leads + Team Members | 9-15 |
| 4 | **Organization** | Chief of Staff | Division Directors + Team Leads + Team Members | 15-50+ |

### Rationale for Each Noun

**Team (not Pod)**
"Pod" is internal product/engineering jargon. When Vanessa (our Founder-CEO persona) says "I hired a sales team," she means a team. When Carlos (our Operator persona) describes his org to his board, he says "team." The word "team" is universally understood, carries no technical connotation, and maps perfectly to how our personas already think.

"Pod" remains available as an internal/power-user concept and in our engineering documentation, but the UI says "Team."

*Dissent considered:* "Pod" is trendier and more distinctive. Counter: distinctiveness in nouns creates cognitive load. We want Raava to feel like hiring, not like learning a new vocabulary. Our differentiation comes from the product experience, not the terminology.

**Division (kept)**
At Tier 3, the user has multiple teams grouped under a higher-level leader. "Division" is the right word here. It is corporate -- deliberately so. A user at Tier 3 is running a serious operation. They are not an SMB dabbling with one agent. "Division" signals scale and organizational intent without being alienating. Alternatives considered:

- "Department" -- too HR/back-office. Implies cost center, not capability center.
- "Group" -- too generic. "My Groups" means nothing.
- "Squad" -- even more jargon than "Pod."
- "Division" -- clear hierarchy (teams roll up into divisions), professional, and maps to how mid-market companies actually describe their structure.

**Organization (the top-level container)**
At Tier 4, everything rolls up into one entity: the Organization. This is the user's entire AI workforce. "Organization" works because:

- It matches the nav item ("My Organization")
- It is the natural English word for the top-level entity
- It creates a clean hierarchy: Organization > Divisions > Teams > Team Members
- It is the word users already use when describing their company structure

**Leader Roles**

| Role | Tier | What They Do |
|---|---|---|
| Team Lead | 2 | Manages a single team. Coordinates work, delegates tasks to team members, reports up. Visible to user as "the one in charge of this team." |
| Division Director | 3 | Manages multiple teams. Coordinates across teams, resolves inter-team conflicts, allocates resources across teams. |
| Chief of Staff | 4 | The user's single point of contact for the entire organization. Translates user intent into divisional directives. The "CEO's right hand." |

Why not "Manager"? Because "Manager" is generic and overloaded. "Team Lead" is warmer and less hierarchical for Tier 2. "Director" signals the step up at Tier 3. "Chief of Staff" at Tier 4 is evocative -- it communicates that this agent runs the show on behalf of the user.

The user always remains the ultimate authority. They are the CEO of their AI org. Leader agents manage down; the user manages everything.

### Full Hierarchy (Tier 4 Example)

```
[User / CEO]
  |
  +-- Chief of Staff
        |
        +-- Sales Division (Division Director)
        |     +-- Outbound Team (Team Lead)
        |     |     +-- SDR Agent
        |     |     +-- SDR Agent
        |     |     +-- Email Specialist Agent
        |     +-- Analytics Team (Team Lead)
        |           +-- Data Analyst Agent
        |           +-- CRM Specialist Agent
        |
        +-- Operations Division (Division Director)
        |     +-- Support Team (Team Lead)
        |     |     +-- Support Agent
        |     |     +-- Support Agent
        |     +-- Ops Team (Team Lead)
        |           +-- Ops Coordinator Agent
        |           +-- General Assistant Agent
        |
        +-- Marketing Division (Division Director)
              +-- Content Team (Team Lead)
              |     +-- Content Writer Agent
              |     +-- Social Media Agent
              +-- Growth Team (Team Lead)
                    +-- Growth Analyst Agent
                    +-- Campaign Manager Agent
```

---

## 3. NAVIGATION STRUCTURE

### Current Sidebar
```
Home
Inbox
My Team          <-- flat roster, one level
Tasks
Projects
Routines
Billing
Settings
```

### Proposed Sidebar

**For Tier 1 users (1 agent, no hierarchy):**
```
Home
Inbox
My Team          <-- unchanged, shows the single team member
Tasks
Projects
Routines
Billing
Settings
```

No change. A user with one team member does not need organizational structure. Showing them "My Organization" with one lonely node in an org chart would feel empty and over-engineered. "My Team" is the right noun at this scale.

**For Tier 2+ users (any hierarchy, any manager agents):**
```
Home
Inbox
My Organization  <-- replaces "My Team"
  |-- Overview        (org chart / visual hierarchy)
  |-- Team Members    (flat roster, card grid -- the current My Team view)
  |-- Teams           (team management, create/edit/dissolve teams)
Tasks
Projects
Routines
Billing
Settings
```

### Navigation Upgrade Trigger

The sidebar switches from "My Team" to "My Organization" when any of these conditions is met:
1. The user creates a team (groups 2+ agents under a Team Lead)
2. The user hires a Team Lead role
3. The user's total agent count reaches 4+ (at which point we prompt: "You're building a real team. Want to organize them into a Team?")

This is a **one-way latch**. Once the user enters the "My Organization" paradigm, we don't revert even if they scale back down. The Team Members sub-page provides the flat view they had before, so nothing is lost.

### Sub-Page Specs

#### 3a. My Organization > Overview

| Attribute | Detail |
|---|---|
| **Route** | `/organization` |
| **Purpose** | Visual org chart showing reporting hierarchy |
| **What it replaces** | The "org chart toggle" currently spec'd inside My Team |

**Layout:**
- Interactive org chart rendered top-down (CEO/user at top, Chief of Staff below, divisions, teams, individual team members at leaves)
- Each node shows: avatar, name, role badge, status dot (Working/Idle/Needs Attention)
- Click any node to navigate to that team member's detail page
- Zoom/pan controls for large orgs (Tier 3-4)
- Collapse/expand branches

**Tier-Specific Rendering:**

| Tier | What the Org Chart Shows |
|---|---|
| Tier 2 | User at top, Team Lead in middle, team members below. Simple 2-level tree. |
| Tier 3 | User at top, Division Director below, then Team Lead nodes, then team members. Collapsible branches per team. |
| Tier 4 | Full hierarchy. Chief of Staff directly under user. Divisions as major branches. Collapsible at every level. Default view: collapsed to Division/Team level (don't render every leaf agent by default for large orgs). |

**Empty state (new Tier 2 user):**
> "This is your organization. Right now it's just you and your team members. As you hire more, your org chart grows. Want to create your first Team?"
> [Create a Team] button

**Key interaction:** Drag-and-drop reassignment. User can drag a team member from one team to another. Confirmation dialog: "Move [Name] from [Team A] to [Team B]? They'll start reporting to [New Team Lead]." This is power-user functionality -- not required for launch but architecturally planned.

#### 3b. My Organization > Team Members

| Attribute | Detail |
|---|---|
| **Route** | `/organization/members` |
| **Purpose** | Flat roster of all team members across all teams |
| **What it replaces** | The current My Team card grid view |

This is essentially the current My Team page as specified in the Product Package, with one addition:
- **Team badge** on each card showing which team they belong to (or "Unassigned" if not in a team)
- **Filter by team** added to the filter tabs: All | Working | Paused | Needs Attention | [Team A] | [Team B] | ...

Everything else from the My Team spec carries forward: card grid layout, Hire button, status indicators, cost display.

#### 3c. My Organization > Teams

| Attribute | Detail |
|---|---|
| **Route** | `/organization/teams` |
| **Purpose** | Manage teams as units -- create, edit, dissolve, view team-level metrics |
| **New page** | No Paperclip equivalent |

**Layout:**
- Card grid of teams (consistent with the team member card grid pattern)
- Each team card shows:
  - Team name (e.g., "Sales Team")
  - Team Lead: avatar + name
  - Member count: "4 team members"
  - Status summary: "3 Working, 1 Idle"
  - This week's cost (aggregate for the team)
  - Current focus: most common project or top active task
- **"Create Team" button** -- top right, opens team creation flow
- **Filter tabs:** All | Active | Paused

**Team Detail Page** (`/organization/teams/:id`):
- Team header: name, description, Team Lead profile, created date
- Tabs:
  1. **Members** -- card grid of team members in this team. "Add Member" and "Remove Member" actions.
  2. **Tasks** -- tasks assigned to this team's members, aggregated
  3. **Performance** -- team-level metrics: tasks completed, success rate, total cost, cost trend
  4. **Settings** -- team spending limit, default approval settings, team-level personality overrides

---

## 4. CURATED POWER TEMPLATES

These are pre-built team configurations that ship at launch. The user selects a template and gets a fully composed team with reporting relationships, roles, and personalities pre-configured. They can rename agents, adjust personalities, and modify composition after creation.

### Template 1: Sales Team

| Attribute | Detail |
|---|---|
| **Name** | Sales Team |
| **Tagline** | "Close more deals with an AI-powered sales force" |
| **Description** | A complete outbound sales operation. The Sales Team Lead coordinates pipeline activity, the SDRs handle prospecting and follow-up, and the Data Analyst tracks conversion metrics and identifies opportunities. |
| **Tier** | 2 (Pod) |
| **Composition** | |

| Role | Agent Name (Default) | Reports To | Personality Summary |
|---|---|---|---|
| Sales Team Lead | Morgan | User | Manages pipeline strategy, delegates prospecting, reviews proposals before they go out, reports weekly pipeline summary to user |
| SDR (Outbound) | Alex | Morgan | Aggressive but professional prospector. Sends cold outreach, follows up on warm leads, books meetings |
| SDR (Inbound) | Jamie | Morgan | Handles inbound inquiries, qualifies leads, routes hot prospects to user for high-touch follow-up |
| Sales Data Analyst | Riley | Morgan | Tracks pipeline metrics, conversion rates, response rates. Produces weekly sales report. Flags anomalies |

| Metric | Value |
|---|---|
| **Total Agents** | 4 |
| **Estimated Monthly Cost** | $600-900 |
| **Required Credentials** | CRM API key (HubSpot/Salesforce/Pipedrive), Email API key (Gmail/Outlook), Calendar API key |
| **Best For** | Startups with 50+ leads/month who need systematic follow-up |
| **Use Case** | "I have leads coming in but nobody following up consistently. I need a sales machine that runs without me micromanaging every email." |

---

### Template 2: Customer Success Pod

| Attribute | Detail |
|---|---|
| **Name** | Customer Success Pod |
| **Tagline** | "Never lose a customer to slow support again" |
| **Description** | A customer-facing team that handles support tickets, manages account relationships, and surfaces churn risks. The CS Team Lead triages incoming requests and ensures quality across all customer touchpoints. |
| **Tier** | 2 (Pod) |
| **Composition** | |

| Role | Agent Name (Default) | Reports To | Personality Summary |
|---|---|---|---|
| CS Team Lead | Casey | User | Triages tickets by severity, assigns to specialists, reviews outgoing responses for tone and accuracy, escalates VIP issues to user |
| Support Specialist | Avery | Casey | Front-line ticket handler. Fast, empathetic, thorough. Resolves common issues independently, escalates edge cases |
| Support Specialist | Taylor | Casey | Same as Avery -- provides coverage and handles overflow. Can specialize in technical vs. billing issues |
| Account Manager | Jordan | Casey | Proactive account health monitoring. Sends check-in emails, flags usage drops, prepares renewal talking points |

| Metric | Value |
|---|---|
| **Total Agents** | 4 |
| **Estimated Monthly Cost** | $500-800 |
| **Required Credentials** | Help desk API key (Zendesk/Freshdesk/Intercom), Email API key, CRM API key (for account data) |
| **Best For** | SaaS companies with 50+ customers and growing ticket volume |
| **Use Case** | "Our support response times are slipping. We can't hire fast enough. I need a team that handles the volume and escalates what matters." |

---

### Template 3: Content & Marketing Team

| Attribute | Detail |
|---|---|
| **Name** | Content & Marketing Team |
| **Tagline** | "Consistent content without the agency retainer" |
| **Description** | A content production team that creates social posts, drafts blog content, tracks campaign performance, and maintains brand voice across channels. The Marketing Lead plans the editorial calendar and ensures quality. |
| **Tier** | 2 (Pod) |
| **Composition** | |

| Role | Agent Name (Default) | Reports To | Personality Summary |
|---|---|---|---|
| Marketing Team Lead | Blake | User | Plans weekly content calendar, assigns topics, reviews drafts for brand voice, reports on engagement metrics |
| Content Writer | Sage | Blake | Long-form content: blog posts, newsletters, case studies. Researches topics, produces drafts, incorporates feedback |
| Social Media Coordinator | Reese | Blake | Short-form: social posts, threads, captions. Maintains posting schedule, tracks engagement, suggests trending topics |
| Growth Analyst | Quinn | Blake | Tracks campaign performance across channels. Produces weekly analytics report. Identifies top-performing content for amplification |

| Metric | Value |
|---|---|
| **Total Agents** | 4 |
| **Estimated Monthly Cost** | $500-750 |
| **Required Credentials** | Social media API keys (Hootsuite/Buffer), Analytics API key (Google Analytics/Plausible), Email API key (for newsletter distribution) |
| **Best For** | Companies producing content with 1-2 human marketers who need leverage |
| **Use Case** | "I'm the only marketing person. I can't write 3 blog posts, 15 social posts, and a newsletter every week. I need a team." |

---

### Template 4: Operations Center

| Attribute | Detail |
|---|---|
| **Name** | Operations Center |
| **Tagline** | "Run your back office on autopilot" |
| **Description** | An operations team that handles task management, data tracking, process coordination, and general administrative work. The Ops Lead keeps everything running and flags anything that needs human attention. |
| **Tier** | 2 (Pod) |
| **Composition** | |

| Role | Agent Name (Default) | Reports To | Personality Summary |
|---|---|---|---|
| Ops Team Lead | Drew | User | Oversees operational workflows, prioritizes the team's queue, produces daily status summaries, escalates blockers |
| Data Analyst | Rowan | Drew | Pulls reports, cleans data, maintains dashboards. Produces weekly metrics summaries |
| Process Coordinator | Finley | Drew | Manages recurring workflows: invoice follow-ups, vendor communications, internal status updates. The glue that keeps operations moving |
| General Assistant | Hayden | Drew | Flexible utility player. Handles overflow, research tasks, ad-hoc requests. The team's Swiss army knife |

| Metric | Value |
|---|---|
| **Total Agents** | 4 |
| **Estimated Monthly Cost** | $400-650 |
| **Required Credentials** | Google Workspace API key (Calendar, Sheets, Gmail), Database connection (optional, for Data Analyst) |
| **Best For** | Ops-heavy companies where the founder or ops lead is drowning in coordination work |
| **Use Case** | "I spend 3 hours a day on operational busywork -- updating spreadsheets, chasing status updates, pulling reports. I need a team to own this." |

---

### Template 5: Full Revenue Engine (Tier 3 -- Division)

| Attribute | Detail |
|---|---|
| **Name** | Revenue Engine |
| **Tagline** | "Sales, marketing, and success -- one unified division" |
| **Description** | A complete revenue operation spanning three teams: Sales, Marketing, and Customer Success. The Revenue Director coordinates across teams, ensuring leads flow from marketing to sales to success without dropping. This is a Tier 3 template for users ready to run a full division. |
| **Tier** | 3 (Swarm / Division) |
| **Composition** | |

| Role | Agent Name (Default) | Reports To | Team |
|---|---|---|---|
| Revenue Division Director | Cameron | User | *(division-level)* |
| Sales Team Lead | Morgan | Cameron | Sales |
| SDR | Alex | Morgan | Sales |
| SDR | Jamie | Morgan | Sales |
| Marketing Team Lead | Blake | Cameron | Marketing |
| Content Writer | Sage | Blake | Marketing |
| Social Media Coordinator | Reese | Blake | Marketing |
| CS Team Lead | Casey | Cameron | Customer Success |
| Support Specialist | Avery | Casey | Customer Success |
| Account Manager | Jordan | Casey | Customer Success |

| Metric | Value |
|---|---|
| **Total Agents** | 10 |
| **Estimated Monthly Cost** | $1,500-2,200 |
| **Required Credentials** | CRM, Email, Help Desk, Social Media, Analytics API keys |
| **Best For** | Companies at $1M+ ARR who need to systematize their entire revenue operation |
| **Use Case** | "I want marketing generating leads, sales converting them, and success retaining them -- all coordinated, all reporting to me." |

---

### Template Principles

1. **Every template is a starting point.** Users can add, remove, or rename team members after creation. Templates reduce time-to-value, not user control.

2. **Gender-neutral names by default.** All default agent names are chosen to be gender-neutral (Morgan, Alex, Casey, etc.) to avoid projecting assumptions. Users rename freely.

3. **4 agents per team is the sweet spot.** Enough to demonstrate coordination value, small enough to not overwhelm. The Tier 3 template is the exception, designed for users who explicitly want scale.

4. **Estimated costs are ranges, not promises.** They depend on usage volume. We show the range on the template card and link to a cost estimator (future feature) for precision.

5. **Templates map to personas.** Sales Team -> Carlos (Operator). Customer Success Pod -> Vanessa (Founder-CEO managing her support). Content Team -> Mia (Agency Owner). Operations Center -> Carlos again. Revenue Engine -> Derek-adjacent (mid-market, budget, scale).

---

## 5. TIER UPGRADE FLOW

How a user naturally grows from Tier 1 to Tier 2 (and beyond).

### From Tier 1 to Tier 2: "Your First Team"

**Trigger:** User has 2-3 individual team members and hires a 4th, OR user clicks "Create a Team" from the Teams sub-page, OR user selects a team template from the template gallery.

**Flow (if triggered by growth):**
1. User hires their 4th team member (or hits a natural grouping point)
2. System shows a prompt (non-blocking, dismissible):
   > "You've got 4 team members now. Want to organize them into a Team? A Team Lead can coordinate their work so you don't have to manage each one individually."
   > [Create a Team] [Not now]
3. If "Create a Team":
   a. **Name your team** -- text input, suggested based on the roles present ("It looks like you have a Sales team")
   b. **Pick a Team Lead** -- either promote an existing team member ("Make Morgan the Team Lead") or hire a new one from the Team Lead role template
   c. **Assign members** -- checkboxes for existing team members. Pre-checked based on role affinity.
   d. **Confirm** -- summary card showing the team structure. "Create Team" button.
4. Sidebar transitions from "My Team" to "My Organization"
5. Org chart (Overview page) now renders the hierarchy

**Flow (if from template):**
1. User clicks "Create a Team" on the Teams page
2. **Choose approach:** "Start from a template" or "Build from scratch"
3. If template: show template gallery (the 5 templates above). Select one.
4. **Customize:** Pre-filled team with default names, roles, personalities. User can rename, remove, or add members before confirming.
5. **Credentials:** Aggregate credential requirements for the whole team. Show which are already configured and which are needed.
6. **Launch:** "Hire this team" button. All agents provision in parallel. Progress indicator.
7. Success state: "Your [Team Name] is ready! [Name] is the Team Lead. Here's what they're starting on."

### From Tier 2 to Tier 3: "Your First Division"

**Trigger:** User has 2+ teams, OR user selects a Tier 3 template, OR user manually creates a Division from the Teams page.

**Flow:**
1. Prompt (if triggered by growth):
   > "You're running multiple teams now. Want to group them into a Division with a Director who coordinates across teams?"
   > [Create a Division] [Not now]
2. **Name your division** -- text input
3. **Appoint a Division Director** -- hire a new Division Director agent or promote an existing Team Lead
4. **Assign teams** -- checkbox list of existing teams
5. **Confirm and launch**

### From Tier 3 to Tier 4: "The Full Organization"

This is a manual, intentional step. We do not auto-prompt for Tier 4. The user must explicitly choose to hire a Chief of Staff and structure their entire AI workforce as a full org.

**Available from:** Settings > Organization > "Enable Full Organization Mode"

**Flow:**
1. Hire a Chief of Staff agent
2. Assign existing divisions to report to the Chief of Staff
3. Chief of Staff becomes the user's primary interface for delegation (user can still direct-manage any team member, but the Chief of Staff coordinates the overall org)

---

## 6. WHAT EACH TIER USER SEES

### Tier 1: Solo Agent

| Element | What They See |
|---|---|
| **Sidebar** | "My Team" (no sub-pages) |
| **My Team page** | Single team member card, or a few cards in a flat grid. "Hire" button. |
| **Org chart** | Not shown. No hierarchy to display. |
| **Upgrade prompt** | At 3+ members: "Want to organize into a Team?" |

### Tier 2: Team

| Element | What They See |
|---|---|
| **Sidebar** | "My Organization" with sub-pages: Overview, Team Members, Teams |
| **Overview** | Simple 2-level org chart: Team Lead at top, members below. If multiple teams, side-by-side trees. |
| **Team Members** | Full flat roster with team badges |
| **Teams** | Card grid of their teams. Click into Team Detail for per-team management. |
| **Upgrade prompt** | At 2+ teams: "Want to create a Division?" |

### Tier 3: Division

| Element | What They See |
|---|---|
| **Sidebar** | "My Organization" with sub-pages: Overview, Team Members, Teams |
| **Overview** | Multi-level org chart: Division Director at top, Team Leads as branches, members as leaves. Collapsible. |
| **Team Members** | Flat roster with team AND division badges. Filter by division. |
| **Teams** | Card grid with division grouping header. |
| **New filter** | "By Division" filter on Team Members and Teams pages |

### Tier 4: Full Organization

| Element | What They See |
|---|---|
| **Sidebar** | "My Organization" with sub-pages: Overview, Team Members, Teams, Divisions |
| **Overview** | Full org chart. Chief of Staff at top. Collapsible at every level. Default collapsed to division level. |
| **Team Members** | Flat roster with division + team badges. Filter by division, team, or role. |
| **Teams** | Card grid grouped by division |
| **Divisions** | New sub-page: card grid of divisions. Each card shows Division Director, team count, member count, aggregate cost. Click into Division Detail for cross-team management. |

---

## 7. TERMINOLOGY MAP UPDATE

Additions to the global terminology map from the Product Package:

| New Raava Term | Definition | Used Where |
|---|---|---|
| **Team** | A group of 2-5 team members led by a Team Lead, working on a shared function (sales, support, etc.) | My Organization > Teams, Org Chart, Team creation flow |
| **Team Lead** | A team member with a management role -- coordinates the team's work, delegates tasks, reports up | Org chart, Team Detail, role templates |
| **Division** | A group of 2-4 teams led by a Division Director, representing a major business function | My Organization > Divisions (Tier 3+), Org Chart |
| **Division Director** | A senior management agent that coordinates across multiple teams | Org chart, Division Detail |
| **Organization** | The top-level container for a user's entire AI workforce | My Organization nav item, Overview page |
| **Chief of Staff** | The top-level management agent in a Tier 4 organization | Org chart root, Organization settings |

### What NOT to Expose in the UI

| Internal Term | Why It Stays Internal |
|---|---|
| Pod | Engineering/product jargon. "Team" is the user-facing equivalent. |
| Swarm | Technical architecture term. Users see "Division" instead. |
| Fleet | Legacy Paperclip term. Users see "Organization." |
| Tier 1/2/3/4 | Internal classification. Users don't need to know their "tier." They just see their org grow. |

---

## 8. BILLING IMPLICATIONS

Teams and Divisions are organizational concepts, not billing concepts. Billing remains per-team-member, as specified in the Product Package.

However, the Billing page gains new aggregation views:
- **By Team:** "Sales Team: $340/mo, Support Team: $280/mo"
- **By Division:** "Revenue Division: $1,100/mo" (Tier 3+ only)
- These supplement the existing "By Team Member" and "By Role" views

Spending limits can be set at the team level (applies to all members) or the individual level. Team-level limits are a Tier 2+ feature.

---

## 9. DATA MODEL SKETCH

This is not a schema -- it is a conceptual model for engineering to refine.

```
Organization (1 per user account)
  |-- has_many: Divisions (0..N)
  |     |-- has_one: Division Director (agent with role=division_director)
  |     |-- has_many: Teams
  |
  |-- has_many: Teams (0..N, can be in a Division or standalone)
  |     |-- has_one: Team Lead (agent with role=team_lead)
  |     |-- has_many: Team Members (agents)
  |     |-- belongs_to: Division (optional)
  |
  |-- has_one: Chief of Staff (optional, Tier 4 only)
  |
  |-- has_many: Team Members (all agents, regardless of team/division assignment)
```

Key constraint: Every agent belongs to exactly one Organization. An agent can belong to at most one Team. A Team can belong to at most one Division. This keeps the hierarchy clean and avoids matrix-org complexity that would confuse the UI.

Unassigned agents (not in any team) are valid. They show in the flat roster under "Unassigned" and in the org chart as direct reports to the user.

---

## 10. OPEN QUESTIONS FOR CEO

These are structured recommendations, not open-ended questions.

**Q1: Should the Tier 3 "Revenue Engine" template ship at launch, or only Tier 2 templates?**
- Recommendation: Ship all 5 templates at launch. The Revenue Engine serves as an aspirational "north star" in the template gallery. Even if most users start with Tier 2, seeing the Tier 3 option signals that Raava scales with them. Label it with a "Division" badge so users understand it is a larger commitment.

**Q2: Do we show the template gallery in the onboarding wizard (Step 2), or only in the "Create Team" flow?**
- Recommendation: The onboarding wizard stays as-is (single role selection for the first hire). Templates appear in the "Create Team" flow, which is discoverable from the Hire button dropdown and the Teams sub-page. Rationale: the first-hire experience should be simple. Team templates are a power move for users who have already completed onboarding and understand the product.

**Q3: Should "My Organization" be the nav label from day one (even for Tier 1 users with one agent)?**
- Recommendation: No. Show "My Team" for Tier 1 users and transition to "My Organization" when they create their first team. The transition should feel like a natural upgrade, not a confusing rename on day one. One team member is a team member, not an organization.

---

## 11. IMPLEMENTATION PRIORITY

| Priority | What | Why | Complexity |
|---|---|---|---|
| P0 | "My Organization" sidebar item with Overview, Team Members, Teams sub-pages | Core navigation for Tier 2+ | Medium -- new nav structure, new routes, but Team Members reuses existing My Team |
| P0 | Org chart visualization (Overview page) | This is the visual payoff of the hierarchy concept | Medium-High -- needs interactive tree rendering |
| P1 | Team creation flow (from scratch) | Users must be able to create teams manually | Medium |
| P1 | 4 Tier-2 templates (Sales, CS, Content, Ops) | Key differentiator at launch | Low -- templates are config, not code |
| P2 | Tier 3 template (Revenue Engine) | Aspirational, demonstrates scale | Low |
| P2 | Sidebar transition logic (My Team -> My Organization) | Polish, progressive disclosure | Low |
| P2 | Drag-and-drop reassignment on org chart | Power-user feature | High |
| P3 | Division management UI (Tier 3) | Most launch users will be Tier 1-2 | Medium |
| P3 | Chief of Staff / Tier 4 flow | Aspirational, post-launch | Medium |

---

*This addendum is ready for CEO review. All recommendations are Diana's (VP Product) based on the existing Product Package, the 4-tier architecture from FigJam, and the persona framework established by Kai. Engineering estimation should follow once the CEO approves the taxonomy and navigation structure.*
