# RAAVA PRODUCT PACKAGE
## CEO Review Document -- April 3, 2026

**Produced by:** VP Product (Diana), Design Lead (Leo), Startup Advisor (Kai), CTO (Marcus), VP Engineering (Rafael)

**Status:** Ready for CEO go/no-go decisions

**Reading time:** ~20 minutes

---

# DELIVERABLE 1: USER PERSONAS

*Owners: Kai + Diana*

## Persona 1: Carlos Mendez -- "The Operator"

| Attribute | Detail |
|---|---|
| **Title** | Head of Operations |
| **Company** | 30-person logistics SaaS startup |
| **Technical level** | Low-to-medium. Uses Zapier, comfortable with spreadsheets, has never opened a terminal |
| **Current tools** | HubSpot, Google Sheets, Slack, Zapier, Notion |
| **Why AI agents** | Drowning in repetitive ops work: updating CRM records, chasing invoices, sending follow-ups. Hired a part-time VA but the cost and training time don't scale |
| **What he cares about** | Cost predictability ("what's my monthly bill?"), reliability ("does it actually do the task?"), and speed to value ("can I see results today?") |
| **What confuses him** | Adapters, tokens, models, containers, SOUL.md, provisioning templates -- all of it. He wants to pick a role and go |
| **eMerge evaluation** | Will watch the demo, ask "how much?" and "can it do [specific thing]?", then decide in 48 hours. Needs to see the onboarding wizard and a task completing live |

**Carlos is our primary target.** The product must be built for him. If Carlos can't complete onboarding without help, we've failed.

---

## Persona 2: Vanessa Liu -- "The Founder-CEO"

| Attribute | Detail |
|---|---|
| **Title** | CEO & Co-Founder |
| **Company** | 8-person seed-stage B2B SaaS |
| **Technical level** | Medium. Was a PM at Stripe, understands APIs conceptually, won't write code |
| **Current tools** | Linear, Slack, Notion, Gmail, QuickBooks |
| **Why AI agents** | Wants to "hire" for roles she can't afford yet -- an SDR, a data analyst, a customer support person. Thinks in headcount, not infrastructure |
| **What she cares about** | Output quality ("is this as good as a human?"), team management ("can I see what my AI team is doing?"), cost vs. human FTE ("is this cheaper than a contractor?") |
| **What confuses her** | Why she'd need to configure anything. Expects it to work like hiring on Upwork: pick a role, describe the job, let them work |
| **eMerge evaluation** | Will stop at the booth if the tagline resonates, stay for 3 minutes if the demo is compelling, exchange info if she sees her use case. Will trial within a week if follow-up is good |

**Vanessa is our word-of-mouth engine.** If she loves it, she tells 10 other founders.

---

## Persona 3: Derek Okafor -- "The Technical Buyer"

| Attribute | Detail |
|---|---|
| **Title** | VP Engineering |
| **Company** | 80-person Series B fintech |
| **Technical level** | High. Writes code, manages infra, evaluates vendors |
| **Current tools** | GitHub Copilot, custom internal scripts, AWS, Terraform, PagerDuty |
| **Why AI agents** | Wants to automate internal tooling, CI triage, incident response summaries, and ops runbooks. Has budget, needs justification for his CTO |
| **What he cares about** | Security ("where do my API keys go?"), tenant isolation ("is my data separated?"), audit trail ("can I see what it did and why?"), and integration depth ("can it connect to my stack?") |
| **What confuses him** | Nothing confuses him -- he's evaluating trust. He wants to see the architecture, the credential vault, the audit log. He'll ask about SOC 2 |
| **eMerge evaluation** | Won't be sold by the wizard. Wants to see the Team Member Detail page, the audit log, the credential storage mechanism. Will ask pointed questions. Converts through a 30-minute technical deep-dive call post-event |

**Derek is our enterprise bridge.** If we earn his trust, he brings budget.

---

## Persona 4: Mia Torres -- "The Agency Owner"

| Attribute | Detail |
|---|---|
| **Title** | Founder, Digital Marketing Agency |
| **Company** | 12-person agency, 25+ clients |
| **Technical level** | Low. Uses Canva, HubSpot, Hootsuite. Delegates anything technical |
| **Current tools** | Canva, HubSpot, Hootsuite, Google Analytics, ChatGPT (copy/paste workflow) |
| **Why AI agents** | Wants AI team members that can draft social copy, pull analytics reports, and handle client email follow-ups across multiple client accounts |
| **What she cares about** | Multi-client management ("can I have separate agents per client?"), output quality for client-facing work, and simple billing she can pass through to clients |
| **What confuses her** | Anything that looks like DevOps. She wants a "team" page, not a "fleet dashboard" |
| **eMerge evaluation** | Drawn by the "AI team" framing. Will trial if she can see a Marketing Coordinator agent draft real social copy in the demo. Converts if she can show ROI to one client |

---

# DELIVERABLE 2: VALUE PROPOSITION

*Owner: Kai*

## One-Line Pitch (9 words)

**"Hire AI team members that actually get work done."**

## Elevator Pitch (30 seconds)

> Raava lets you hire AI team members the same way you'd hire people. Pick a role -- Sales Assistant, Data Analyst, Customer Support -- and your new team member shows up pre-trained with the right tools and skills. They follow up on leads, pull reports, answer tickets. You manage them from a simple dashboard, just like a real team. They cost a fraction of a human hire, work 24/7, and never need PTO. Right now you're managing 30 Zapier automations and a VA. What if you had a team instead?

## eMerge Booth Tagline

**"Your AI Team. Hired in 60 Seconds."**

Alternate (if we want differentiation emphasis): **"Not another chatbot. An actual teammate."**

## 3 Key Differentiators

| vs. Hiring Humans | vs. Other AI Tools (ChatGPT, Copilot, custom agents) | vs. Zapier/Make/n8n |
|---|---|---|
| 10-50x cheaper per task | Pre-configured roles, not blank prompts | Agents think, not just trigger |
| Available 24/7, no onboarding lag | Persistent memory + context across tasks | Handle ambiguity, not just if/then |
| Scales instantly -- hire 5 more in 5 minutes | Real tool integration (CRM, email, APIs), not copy-paste | Self-correct and escalate when stuck |

## Pricing Framing

**"Think in headcount, not tokens."**

We do NOT lead with per-token pricing at eMerge. The conversation framework:

- **At the booth:** "A Sales Assistant costs roughly $200-400/month depending on usage. That's less than one day of a human SDR."
- **In follow-up:** Provide detailed usage breakdown. Per-role estimated monthly cost based on typical workload.
- **Never say:** "It depends on your token usage." Carlos and Vanessa don't know what tokens are.
- **For Derek:** We can show the Billing page with per-model, per-agent cost breakdowns. He'll appreciate the transparency.

**Recommendation:** Launch with simple per-role monthly tiers. Absorb token cost variance in the margin initially. Revisit when we have 20+ customers and usage data.

*Dissent (Marcus/CTO):* Token costs are variable and could eat margin on heavy users. Counter: at this stage, acquiring customers matters more than margin optimization. We cap usage per tier and add overage billing later.

---

# DELIVERABLE 3: PRODUCT SPEC

*Owners: Diana + Leo*

## Terminology Map (Global)

This mapping applies everywhere in the UI. Every instance of the Paperclip term is replaced.

| Paperclip Term | Raava Term | Notes |
|---|---|---|
| Agent | Team Member | Core noun change. "Agent" is technical jargon |
| Agents (page) | My Team | The team roster |
| Issue | Task | Business users think in tasks, not issues |
| Issues (page) | Tasks | |
| Run | Work Session | A run is when a team member works on a task |
| Adapter | Engine (hidden by default) | Technical config, power-user only |
| SOUL.md | Personality | What guides a team member's behavior |
| Company | Company (keep) | Already correct |
| Project | Project (keep) | Already correct |
| Routine | Routine (keep) | CEO directive: keep "Routines" as the noun |
| Costs | Billing | Business framing |
| Dashboard | Home | Warmer, less enterprise |
| Approval | Review Request | Team member is asking for your review |
| Heartbeat | Status | Internal concept, never shown to user |
| Provision | Hire / Set Up | "Provisioning an agent" becomes "hiring a team member" |
| Template | Role | Pre-configured template becomes a role |
| Manifest | (hidden) | Internal FleetOS concept, never exposed |

---

## Page-by-Page Specification

### 1. HOME (repurposed Dashboard)

| Attribute | Detail |
|---|---|
| **Route** | `/` |
| **Repurposes** | `Dashboard.tsx` |
| **Paperclip term -> Raava** | Dashboard -> Home, Agents -> Team Members, Issues -> Tasks, Runs -> Work Sessions, Costs -> Spend |

**Sections:**
- **Welcome header** -- "Good morning, [Name]. Here's your team's status." (replaces generic dashboard header)
- **Team Status Strip** -- Horizontal card row: [X] Active, [X] Idle, [X] Need Attention. Each card is tappable, navigates to My Team with filter. Replaces the MetricCard grid
- **Spend This Week** -- Single card showing total spend in dollars, trend arrow, link to Billing. Replaces the cost metric card. No token counts. Dollars only
- **Active Work** -- Replaces "Active Agents Panel." Shows team members currently working: avatar, name, current task title, time elapsed. Each row links to task detail
- **Recent Tasks** -- Replaces recent issues list. Shows last 5 completed/updated tasks with status badges. Links to Tasks page
- **Activity Feed** -- Keep the activity stream (ActivityRow), but rename actions: "completed a run" -> "finished working on", "created an issue" -> "created a task"
- **Charts** -- Keep RunActivityChart and SuccessRateChart. Remove PriorityChart and IssueStatusChart (too developer-focused). Rename chart labels

**What changes vs. current Paperclip:**
- ADD: Welcome greeting with time-of-day awareness
- ADD: "Need Attention" count (team members in error state + tasks needing approval)
- REMOVE: Raw metric cards for "Total Agents" and "Open Issues" (replaced by Team Status Strip)
- RENAME: All terminology per mapping
- SIMPLIFY: Remove chart tab bar (show top 2 charts inline, not tabbed)

**Non-technical user experience:** Opens to a warm, scannable overview. No jargon visible. Immediate understanding of "who's working, what's happening, how much it costs."

---

### 2. INBOX (repurposed Inbox)

| Attribute | Detail |
|---|---|
| **Route** | `/inbox` |
| **Repurposes** | `Inbox.tsx` |
| **Paperclip term -> Raava** | Approval -> Review Request, Issue -> Task, Join Request -> (remove) |

**Sections:**
- **Review Requests** -- Team members asking for your approval before proceeding. Clear action buttons: Approve / Reject / Comment. This is the primary tab
- **Notifications** -- Task completions, errors, status changes. Swipe-to-archive stays (good UX)
- **Escalations** -- Tasks where a team member is stuck or errored. Requires human intervention

**What changes vs. current Paperclip:**
- REMOVE: Join Requests tab (irrelevant for business users managing AI teams)
- RENAME: "Approvals" -> "Review Requests"
- ADD: Escalations tab (filter for error-state items that need human input)
- SIMPLIFY: Remove developer-focused approval payload details. Show: "Team member [Name] wants to [action]. [Approve] [Reject]"

**Non-technical user experience:** Like an email inbox for your AI team. Things that need your attention, organized by urgency. Clear calls to action.

---

### 3. MY TEAM (repurposed Agents)

| Attribute | Detail |
|---|---|
| **Route** | `/team` |
| **Repurposes** | `Agents.tsx` |
| **Paperclip term -> Raava** | Agent -> Team Member, Adapter -> Engine (hidden), Status active/paused/error -> Working/Paused/Needs Attention |

**Sections:**
- **Team Roster** -- Card grid (not list). Each card shows:
  - Avatar/icon (from AgentIconPicker)
  - Name
  - Role badge (Sales Assistant, Ops Manager, etc.)
  - Status indicator (green dot = Working, gray = Idle, yellow = Paused, red = Needs Attention)
  - Current task (if working): truncated task title
  - This week's cost: "$XX.XX"
  - Last active: "2 hours ago"
- **Filter tabs** -- All | Working | Paused | Needs Attention (replaces all/active/paused/error)
- **"Hire" button** -- Top right, opens onboarding wizard. Replaces "+ Add Agent"
- **Org chart toggle** -- Keep the org tree view. Rename "reports" terminology to "reports to"

**What changes vs. current Paperclip:**
- CHANGE: List view -> Card grid as default (list as toggle option)
- ADD: Role badge on each card
- ADD: This week's cost per team member
- ADD: Current task preview on card
- REMOVE: Adapter type display (claude_local, hermes_local, etc.) from main view
- REMOVE: "Show terminated" toggle from default view (move to Settings > Advanced)
- RENAME: All status labels, action buttons

**Non-technical user experience:** Looks like a team directory. Each card is a person. You see who's working, what they're doing, and what they cost. No technical details visible unless you dig.

---

### 4. TEAM MEMBER DETAIL (repurposed AgentDetail)

| Attribute | Detail |
|---|---|
| **Route** | `/team/:id` |
| **Repurposes** | `AgentDetail.tsx` |
| **Paperclip term -> Raava** | Agent -> Team Member, SOUL.md -> Personality, Adapter -> Engine, Run -> Work Session, Issue -> Task |

**Tabs:**
1. **Overview** (default)
   - Profile header: name, role, avatar, status badge, "Hired [date]"
   - Current task card (if working): task title, time elapsed, live status
   - Performance stats: Tasks completed this week, success rate, avg task time
   - This week's cost with trend
   - Skills/tools list: "Email, CRM, Document Drafting" (human-readable names for Hermes skills)

2. **Tasks** 
   - List of tasks assigned to this team member. Status badges. Links to task detail
   - Replaces the "Issues" tab in AgentDetail

3. **Work History**
   - Replaces "Runs" tab. Chronological list of work sessions
   - Each entry: task name, duration, outcome (completed/failed/escalated), cost
   - Expandable to see transcript (keep RunTranscriptView but label it "Work Log")

4. **Personality** (renamed from SOUL.md tab)
   - The team member's personality/instructions in a rich text editor
   - Pre-filled from role template. Editable by user
   - Help text: "This guides how your team member thinks, communicates, and approaches tasks"

5. **Settings** (power user)
   - Engine configuration (adapter settings) -- collapsed by default, expandable
   - API keys assigned to this team member
   - Permissions (approval settings)
   - Budget policy
   - "This section is for advanced configuration" label at top

**What changes vs. current Paperclip:**
- RESTRUCTURE: Move adapter config from prominent position to collapsed "Settings" tab
- ADD: Performance stats card (computed from existing run/issue data)
- ADD: Skills/tools display (human-readable)
- ADD: "Hired [date]" in profile header
- RENAME: Every tab label, every section header
- KEEP: RunTranscriptView (it's powerful, just rename the tab)
- KEEP: MarkdownEditor for Personality (it's good, just relabel)
- HIDE (not remove): API key management, adapter config, advanced permissions. These move to the Settings tab, collapsed

**Non-technical user experience:** Feels like a teammate's profile page. You see what they do, how they're performing, and what they cost. You can adjust their personality. The technical config is there if you need it, but it's not in your face.

---

### 5. TASKS (repurposed Issues)

| Attribute | Detail |
|---|---|
| **Route** | `/tasks` |
| **Repurposes** | `Issues.tsx` |
| **Paperclip term -> Raava** | Issue -> Task, assignee agent -> assigned team member |

**Sections:**
- **Task list** -- Keep IssuesList component, rename labels
- **Filters** -- By status (To Do, In Progress, Done, Needs Review), by team member, by project
- **"New Task" button** -- Opens task creation. Replaces "New Issue"
- **Search** -- Keep the existing search (it works well)

**What changes vs. current Paperclip:**
- RENAME: "Issues" -> "Tasks" globally
- RENAME: Status labels to business language (open -> To Do, in_progress -> In Progress, completed -> Done, needs_approval -> Needs Review, error -> Stuck)
- KEEP: The IssuesList component is solid. Rename, don't rebuild
- ADD: "Assigned to" filter showing team member names with avatars

**Non-technical user experience:** A task board. Create work, assign it to a team member, track progress. No developer jargon.

---

### 6. TASK DETAIL (repurposed IssueDetail)

| Attribute | Detail |
|---|---|
| **Route** | `/tasks/:id` |
| **Repurposes** | `IssueDetail.tsx` |
| **Paperclip term -> Raava** | Issue -> Task, Run -> Work Session, Agent -> Team Member |

**Sections:**
- **Task header** -- Title, status badge, assigned team member, project link, created date
- **Description** -- Rich text. Keep the MarkdownBody renderer
- **Activity stream** -- Comments, status changes, work session summaries. Keep existing activity rendering
- **Work sessions** -- List of work attempts. Each shows: duration, outcome, cost. Expandable for transcript
- **Actions** -- Reassign, change status, add comment, archive

**What changes vs. current Paperclip:**
- RENAME: All labels
- SIMPLIFY: Remove developer metadata (run IDs, token counts, adapter info) from default view
- KEEP: The core layout is good. Rename and simplify, don't rebuild

---

### 7. PROJECTS (keep, simplify)

| Attribute | Detail |
|---|---|
| **Route** | `/projects` |
| **Repurposes** | `Projects.tsx` |

**What changes:**
- RENAME: "Add Project" button text stays (already correct)
- ADD: Team member count per project card ("3 team members")
- ADD: Task summary per project ("12 tasks, 8 done")
- KEEP: Layout, EntityRow, StatusBadge -- all work fine

---

### 8. PROJECT DETAIL (keep, add Goals)

| Attribute | Detail |
|---|---|
| **Route** | `/projects/:id` |
| **Repurposes** | `ProjectDetail.tsx` |

**What changes:**
- ADD: Goals tab (GoalDetail already exists, wire it into ProjectDetail as a tab)
- RENAME: "Issues" tab -> "Tasks" tab
- RENAME: "Agents" tab -> "Team" tab
- KEEP: Workspace tab (useful for power users)

---

### 9. ROUTINES (keep the noun -- CEO directive)

| Attribute | Detail |
|---|---|
| **Route** | `/routines` |
| **Repurposes** | `Routines.tsx` |
| **Paperclip term -> Raava** | Concurrency Policy -> (simplify labels), Catch-up Policy -> (simplify labels) |

**What changes:**
- KEEP: "Routines" as page title and noun. CEO was explicit
- SIMPLIFY: Policy labels. "coalesce_if_active" -> "Finish current first". "always_enqueue" -> "Queue all". "skip_if_active" -> "Skip if busy"
- SIMPLIFY: "skip_missed" -> "Ignore missed". "enqueue_missed_with_cap" -> "Catch up"
- ADD: Human-readable schedule preview: "Every weekday at 9am" instead of raw cron
- RENAME: "Assignee" -> "Team Member"

**Non-technical user experience:** "These are recurring tasks your team does automatically." Feels like setting up a recurring meeting, not programming a cron job.

---

### 10. ROUTINE DETAIL (repurpose)

| Attribute | Detail |
|---|---|
| **Route** | `/routines/:id` |
| **Repurposes** | `RoutineDetail.tsx` |

**What changes:**
- SIMPLIFY: Same language changes as Routines page
- ADD: Run history summary: "Ran 14 times this month, 13 successful"
- RENAME: "Runs" -> "History"

---

### 11. BILLING (repurposed Costs)

| Attribute | Detail |
|---|---|
| **Route** | `/billing` |
| **Repurposes** | `Costs.tsx` |
| **Paperclip term -> Raava** | Costs -> Billing, Provider -> (simplify), Biller -> (hide), Budget Policy -> Spending Limit |

**Sections:**
- **Spend Overview** -- Total this month, trend vs. last month, projected month-end. Big numbers, clean cards
- **By Team Member** -- Bar chart or table: which team members cost the most? Replaces "by agent" breakdown
- **By Role** -- Aggregate: "Sales Assistants: $340, Data Analysts: $180"
- **Spending Limits** -- Replaces Budget Policies. Same functionality, business language. "Set a monthly limit for each team member"
- **Transaction Log** -- Keep FinanceTimelineCard. Rename "Finance Events" -> "Transactions"

**What changes vs. current Paperclip:**
- REMOVE: Provider/model breakdown from primary view (move to "Detailed Breakdown" expandable section for Derek)
- REMOVE: Token count displays from primary view (meaningless to Carlos/Vanessa)
- ADD: "By Role" aggregate view
- ADD: Projected month-end spend
- RENAME: Everything per mapping
- KEEP: Detailed data accessible for power users (collapsed section)

**Non-technical user experience:** "How much is my AI team costing me?" Answered immediately in dollars. No tokens, no provider names, no model IDs. Just money in, work out.

---

### 12. SETTINGS (repurposed CompanySettings)

| Attribute | Detail |
|---|---|
| **Route** | `/settings` |
| **Repurposes** | `CompanySettings.tsx` |

**Sections:**
- **Company Profile** -- Name, logo, description (keep existing)
- **Team Defaults** -- Default spending limit, default approval settings for new team members
- **Integrations** -- Connected services (CRM, email, etc.) with status indicators. This is where credentials are managed post-onboarding
- **Advanced** -- Instance settings, experimental settings, export/import. Collapsed, labeled "For advanced users"

**What changes:**
- ADD: Integrations section (new -- surfaces credential/vault status)
- ADD: Team Defaults section
- RESTRUCTURE: Move instance/experimental settings into collapsed "Advanced" section
- KEEP: Company profile editing (works well)

---

### 13. ONBOARDING WIZARD (repurposed -- the demo showpiece)

| Attribute | Detail |
|---|---|
| **Route** | Modal overlay (triggered from first visit, or "Hire" button) |
| **Repurposes** | `OnboardingWizard.tsx` + `FleetProvisionWizard.tsx` (merge concepts) |

This is the most important UX in the product. It must be flawless for eMerge.

---

#### STEP 1: CREATE YOUR COMPANY

**Layout:** Centered card, clean, minimal.

**Fields:**
- Company name (text input, required)
- Your name (text input, required)
- Your role (dropdown: CEO, Head of Ops, VP Sales, VP Engineering, Other)

**Footer:** "Next" button. No skip. This is required.

**Design note:** Raava star mark centered above the card. Brand gradient subtle in background. This is the first thing anyone sees.

---

#### STEP 2: HIRE YOUR FIRST TEAM MEMBER

**Layout:** Role card selector, 2x3 grid.

Each card contains:

| Role | Description | Included Tools | Required Credentials |
|---|---|---|---|
| **Sales Assistant** | Follows up with leads, drafts proposals, updates CRM | Email, CRM, Document Drafting | Gmail API key, CRM API key (HubSpot/Salesforce) |
| **Operations Manager** | Manages workflows, tracks tasks, coordinates team | Task Management, Calendar, Spreadsheets | Google Workspace API key |
| **Customer Support** | Answers tickets, drafts responses, escalates issues | Help Desk, Email, Knowledge Base | Zendesk/Freshdesk API key, Email API key |
| **Data Analyst** | Pulls reports, analyzes trends, builds dashboards | SQL, Spreadsheets, Visualization | Database connection string, Google Sheets API key |
| **Marketing Coordinator** | Drafts social copy, schedules posts, tracks campaigns | Social Media, Content, Analytics | Hootsuite/Buffer API key, Analytics API key |
| **General Assistant** | Flexible team member for any task you describe | Email, Documents, Research | Gmail API key (optional) |

**Card interaction:**
- Hover: subtle border glow (brand gradient)
- Selected: solid border, checkmark, expanded detail panel below the grid showing full skill list
- Single selection. Tap to select, tap again to deselect

**Design note:** Cards should feel like "hiring cards" -- like browsing candidates on a recruiting platform. Icon + role name prominent. Description secondary. Tools as small tag badges.

---

#### STEP 3: CREDENTIALS & SETUP

**Layout:** Focused form for the selected role's required credentials.

**Header:** "Set up [Role Name]'s tools"

**For each required credential:**
- Label: "Gmail API Key" (human-readable)
- Input field (password-masked, with show/hide toggle)
- Help link: "How to get this key" (links to doc or tooltip with instructions)
- Status indicator: unconfigured (gray), valid (green check), invalid (red X)

**Security messaging:**
- "Your credentials are stored in a secure vault (1Password) and are never visible in plaintext after setup."
- Small lock icon next to each field

**Skip option:**
- "Skip for now -- you can add credentials later in Settings"
- "Your team member will have limited capabilities without these credentials"
- This is important for the demo flow. Don't force real API keys during a booth walkthrough

**Validation:**
- If credentials are entered, attempt validation (API call to verify key works)
- Show immediate feedback: green check or red error with message

---

#### STEP 4: NAME & LAUNCH

**Layout:** Final step. Celebratory energy.

**Fields:**
- "Name your team member" (text input, pre-filled with suggestion based on role: "Alex" for Sales, "Jordan" for Ops, etc.)
- Icon picker (keep AgentIconPicker, it's good)
- "First task" (pre-filled based on role, editable):
  - Sales Assistant: "Review my recent leads and draft follow-up emails for anyone who hasn't responded in 3+ days"
  - Operations Manager: "Audit our current task list and identify any items that are overdue or unassigned"
  - Customer Support: "Review open support tickets and draft responses for the 5 most recent ones"
  - Data Analyst: "Pull this week's key metrics and create a summary report"
  - Marketing Coordinator: "Draft 3 social media posts for this week based on our latest product update"
  - General Assistant: "Organize my inbox and flag anything that needs my attention today"

**Launch button:** Large, brand gradient background, "Hire [Name]" text. This is the money shot for the demo.

**Post-launch:**
- Brief loading animation (Raava star spinning)
- Success state: "[Name] is on your team! They're starting on their first task now."
- "Go to My Team" button
- Confetti or subtle celebration animation (Leo's call on what's tasteful)

---

### ROLE DEFINITIONS

*Owners: Diana + Marcus*

#### 1. Sales Assistant

| Attribute | Detail |
|---|---|
| **Description** | Follows up with leads, drafts proposals, updates CRM records, and manages the sales pipeline |
| **Default Personality (SOUL.md)** | "You are a professional, proactive sales assistant. You communicate clearly and warmly. You follow up persistently but not aggressively. You always update the CRM after every interaction. You flag hot leads for immediate human attention. You draft in a professional but conversational tone." |
| **Skills/Tools** | `email_send`, `email_read`, `crm_read`, `crm_write`, `document_draft`, `calendar_read` |
| **Required Credentials** | Gmail API key (or SMTP creds), CRM API key (HubSpot, Salesforce, or Pipedrive) |
| **Example First Task** | "Review my recent leads and draft follow-up emails for anyone who hasn't responded in 3+ days" |
| **FleetOS Mapping** | Template: `sales-assistant`, Hermes skills: `hermes-email`, `hermes-crm`, `hermes-docs`. Provisioned as `hermes_local` adapter with pre-loaded skill pack |

#### 2. Operations Manager

| Attribute | Detail |
|---|---|
| **Description** | Manages workflows, tracks task status, coordinates between team members, and flags blockers |
| **Default Personality (SOUL.md)** | "You are a detail-oriented operations manager. You keep things organized and on track. You proactively identify blockers and suggest solutions. You communicate status updates clearly. You prioritize by impact and urgency. You escalate when something is stuck for more than 24 hours." |
| **Skills/Tools** | `task_manage`, `calendar_read`, `calendar_write`, `spreadsheet_read`, `spreadsheet_write`, `email_send` |
| **Required Credentials** | Google Workspace API key (Calendar, Sheets, Gmail) |
| **Example First Task** | "Audit our current task list and identify any items that are overdue or unassigned" |
| **FleetOS Mapping** | Template: `ops-manager`, Hermes skills: `hermes-tasks`, `hermes-calendar`, `hermes-sheets`, `hermes-email` |

#### 3. Customer Support

| Attribute | Detail |
|---|---|
| **Description** | Answers support tickets, drafts responses, categorizes issues, and escalates complex problems to humans |
| **Default Personality (SOUL.md)** | "You are a patient, empathetic customer support specialist. You always acknowledge the customer's frustration before solving the problem. You use clear, simple language. You never make promises you can't keep. You escalate anything involving refunds, account access, or legal issues to a human." |
| **Skills/Tools** | `helpdesk_read`, `helpdesk_write`, `email_send`, `email_read`, `knowledge_base_search` |
| **Required Credentials** | Zendesk/Freshdesk API key, Email API key |
| **Example First Task** | "Review open support tickets and draft responses for the 5 most recent ones" |
| **FleetOS Mapping** | Template: `customer-support`, Hermes skills: `hermes-helpdesk`, `hermes-email`, `hermes-kb` |

#### 4. Data Analyst

| Attribute | Detail |
|---|---|
| **Description** | Pulls data, generates reports, identifies trends, and presents findings in clear summaries |
| **Default Personality (SOUL.md)** | "You are a meticulous data analyst. You always show your work -- include the query, the data source, and your methodology. You present findings with context: what changed, why it matters, what to do about it. You flag data quality issues. You default to visualizations when they make the point clearer than text." |
| **Skills/Tools** | `sql_query`, `spreadsheet_read`, `spreadsheet_write`, `visualization_create`, `report_draft` |
| **Required Credentials** | Database connection string (read-only), Google Sheets API key |
| **Example First Task** | "Pull this week's key metrics and create a summary report" |
| **FleetOS Mapping** | Template: `data-analyst`, Hermes skills: `hermes-sql`, `hermes-sheets`, `hermes-viz` |

#### 5. Marketing Coordinator

| Attribute | Detail |
|---|---|
| **Description** | Drafts social media content, schedules posts, tracks campaign performance, and maintains brand voice |
| **Default Personality (SOUL.md)** | "You are a creative, brand-conscious marketing coordinator. You write in the company's voice. You draft multiple options for every piece of content. You're data-informed -- you reference past performance when recommending what to post. You never publish without human approval. You think in campaigns, not individual posts." |
| **Skills/Tools** | `social_media_post`, `social_media_analytics`, `content_draft`, `analytics_read`, `email_send` |
| **Required Credentials** | Hootsuite/Buffer API key, Google Analytics API key |
| **Example First Task** | "Draft 3 social media posts for this week based on our latest product update" |
| **FleetOS Mapping** | Template: `marketing-coordinator`, Hermes skills: `hermes-social`, `hermes-analytics`, `hermes-content` |

#### 6. General Assistant

| Attribute | Detail |
|---|---|
| **Description** | Flexible team member for research, writing, email management, and ad-hoc tasks |
| **Default Personality (SOUL.md)** | "You are a capable, resourceful general assistant. You adapt to whatever your manager needs. You ask clarifying questions when a task is ambiguous rather than guessing. You're organized, thorough, and proactive about next steps. You communicate what you've done and what you recommend doing next." |
| **Skills/Tools** | `email_send`, `email_read`, `document_draft`, `web_research`, `spreadsheet_read` |
| **Required Credentials** | Gmail API key (optional -- fully functional for research/writing without it) |
| **Example First Task** | "Organize my inbox and flag anything that needs my attention today" |
| **FleetOS Mapping** | Template: `general-assistant`, Hermes skills: `hermes-email`, `hermes-docs`, `hermes-research` |

---

### Credential Storage Architecture (Marcus)

All credentials flow through 1Password via `op run`:
1. User enters API key in wizard
2. Frontend sends to backend API (TLS-encrypted in transit)
3. Backend stores in 1Password vault via `op item create`
4. At runtime, `op run` injects credentials as environment variables into the Hermes container
5. Credentials are NEVER stored in SQLite, NEVER in plaintext on disk, NEVER in the Paperclip database
6. The dashboard stores only a reference (vault item ID) and a "configured" boolean

This directly addresses the P0 "secrets out of source" issue and Suki's (Security Advisor) top concern.

---

# DELIVERABLE 4: GTM STRATEGY

*Owner: Kai*

## eMerge Americas Booth Strategy

### The 3-Minute Demo Flow

This is the exact script for every booth visitor. Practiced, timed, never improvised.

**0:00-0:30 -- Hook**
> "Let me show you something. I'm going to hire an AI team member in 60 seconds."

Open the onboarding wizard. Already on Step 2 (company created pre-demo).

**0:30-1:30 -- The Wizard**
> "See these roles? Pick one -- Sales Assistant is popular."

Click Sales Assistant card. Show what tools it comes with. Skip credentials ("I'll skip for the demo -- in production, you'd paste your CRM API key here"). Name the team member. Hit "Hire Alex."

Show the launch animation. Wait for success state.

**1:30-2:30 -- The Dashboard**
> "Now Alex is on my team. I can see what they're working on, what they cost this week, and their full work history."

Navigate to My Team. Show the card. Click into Team Member Detail. Show the task in progress. Show the Personality tab. Show the Settings tab (briefly, for credibility).

**2:30-3:00 -- The Close**
> "That's it. You just saw someone go from zero to a working AI team member in under 2 minutes. No code, no configuration, no DevOps. What role would be most useful on your team?"

Hand them a card. Capture their email. They're in the follow-up pipeline.

### Target Attendee Profile

**Primary:** Non-technical founders and ops leaders at companies with 10-100 employees. They've tried ChatGPT, maybe tried automating with Zapier, but haven't crossed into "AI agents" territory because it looked too technical.

**Secondary:** Technical leaders evaluating AI platforms. They'll want the deep-dive follow-up call, not the booth demo.

**Avoid spending time on:** Enterprise buyers (too early for us), pure consumers (not our market), other AI startups (they'll just reverse-engineer).

### Follow-Up Process

| Timing | Action | Owner |
|---|---|---|
| At booth | Capture name, email, company, role of interest. Enter into CRM | Booth staff |
| Within 4 hours | Personalized email: "Great meeting you at eMerge. Here's a link to start your free trial. I pre-selected [role they liked]." | Automated via CRM |
| Day 2 | If no signup: "Quick question -- what's the one task you'd love to hand off to an AI team member?" | Sales |
| Day 5 | If signed up: "How's [team member name] doing? Here are 3 tasks other [role] users love." | Customer Success |
| Day 7 | If signed up but inactive: "I noticed [name] hasn't been given a task yet. Here's a 2-minute video on getting the most from your [role]." | Automated |
| Day 14 | Conversion call for active users. Upgrade/pricing discussion | Sales |

### Competitive Positioning

| Competitor | Their pitch | Our counter |
|---|---|---|
| **ChatGPT/Claude (raw)** | "Ask me anything" | "Raava doesn't wait to be asked. It works autonomously on assigned tasks, 24/7, with real tool integrations" |
| **Zapier/Make** | "Connect your apps" | "Zapier connects triggers. Raava thinks. It handles ambiguity, makes judgment calls, and escalates when it's unsure" |
| **Custom agent frameworks (CrewAI, AutoGen)** | "Build your own agent system" | "You could build it yourself in 3 months. Or hire a team member on Raava in 60 seconds. Which gets you revenue faster?" |
| **Lindy.ai / Relevance AI** | "AI agents for [X]" | "They give you single-purpose bots. Raava gives you a team. Roles, personality, tools, management -- all in one place" |

### Launch Messaging

**Tagline:** "Your AI Team. Hired in 60 Seconds."

**Key messages (in order of priority):**
1. It's a team, not a tool. You manage AI team members, not configure software.
2. Pre-configured roles mean zero setup time. Pick a role, name them, they're working.
3. Secure by default. Credentials in a vault, not a spreadsheet. Enterprise-grade from day one.
4. Transparent billing. Know exactly what each team member costs, just like headcount.

---

# DELIVERABLE 5: FIGMA DESIGN BRIEF

*Owner: Leo*

## Design System Tokens

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--raava-bg` | `#FCFCFC` | Page background |
| `--raava-ink` | `#111111` | Primary text |
| `--raava-blue` | `#224AE8` | Brand primary, links, primary buttons |
| `--raava-teal` | `#00BDB7` | Accent, success states, active indicators |
| `--raava-purple` | `#716EFF` | Accent secondary, highlights |
| `--raava-gray` | `#6B7280` | Secondary text, captions |
| `--raava-border` | `#E5E7EB` | Card borders, dividers |
| `--raava-card` | `#FFFFFF` | Card backgrounds |
| `--raava-hover` | `#F3F4F6` | Hover states, selected rows |
| `--raava-error` | `#EF4444` | Error states, "Needs Attention" |
| `--raava-warning` | `#F59E0B` | Warning states, "Paused" |
| `--raava-success` | `#10B981` | Success states, "Working" |
| `--raava-gradient` | `linear-gradient(90deg, #224AE8, #716EFF, #00BDB7)` | CTAs, hero elements, star mark |

### Typography

| Style | Font | Weight | Size | Usage |
|---|---|---|---|---|
| `display-lg` | Syne | 800 | 32px / 2rem | Page titles, hero numbers |
| `display-md` | Syne | 800 | 24px / 1.5rem | Section headers, card titles |
| `display-sm` | Syne | 800 | 18px / 1.125rem | Metric values |
| `body-lg` | Plus Jakarta Sans | 500 | 16px / 1rem | Emphasized body text, nav items |
| `body-md` | Plus Jakarta Sans | 400 | 14px / 0.875rem | Default body text |
| `body-sm` | Plus Jakarta Sans | 400 | 12px / 0.75rem | Captions, timestamps, secondary info |
| `label` | Plus Jakarta Sans | 500 | 12px / 0.75rem | Form labels, badge text |
| `code` | JetBrains Mono | 400 | 13px / 0.8125rem | Code blocks, API keys, technical values |

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `space-xs` | 4px | Tight internal padding |
| `space-sm` | 8px | Compact element spacing |
| `space-md` | 16px | Standard content gaps |
| `space-lg` | 24px | Section padding |
| `space-xl` | 32px | Card padding, major gaps |
| `space-2xl` | 48px | Page section spacing |
| `space-3xl` | 64px | Major section breaks |

### Radii

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 6px | Badges, tags |
| `radius-md` | 8px | Buttons, inputs |
| `radius-lg` | 12px | Cards |
| `radius-xl` | 16px | Modals, wizard panels |
| `radius-full` | 9999px | Avatars, circular elements |

### Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Buttons, subtle elevation |
| `shadow-md` | `0 2px 8px rgba(0,0,0,0.08)` | Cards |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Modals, dropdowns, wizard |
| `shadow-glow` | `0 0 20px rgba(34,74,232,0.15)` | Selected role cards, CTAs |

---

## Component Inventory

### KEEP (re-skin with Raava tokens)
- `EntityRow` -- used everywhere for list items. Re-skin colors, keep structure
- `StatusBadge` -- update colors and labels (Working/Paused/Needs Attention)
- `MetricCard` -- re-skin for Home page stats
- `PageTabBar` -- keep navigation pattern, update font to Syne for tab labels
- `EmptyState` -- update copy and illustrations
- `PageSkeleton` -- keep loading pattern, update colors
- `IssueRow` / `IssuesList` -- rename to TaskRow/TasksList, re-skin
- `ActivityRow` -- update terminology in action labels
- `RunTranscriptView` -- keep as-is (powerful component), relabel header
- `MarkdownEditor` -- keep for Personality editing, relabel
- `AgentIconPicker` -- keep for team member avatars
- `Button` -- update to brand gradient for primary, keep ghost/outline variants
- `Card` -- update border-radius to 12px, add shadow-md
- `Dialog/Modal` -- update to radius-xl, shadow-lg
- `Input/Select` -- update radius to radius-md, border to --raava-border

### NEW COMPONENTS (build for Raava)
- `RoleCard` -- onboarding wizard role selector. 180x200px card, icon top, name bold, description small, tool badges bottom. Selected state: gradient border + glow shadow
- `TeamMemberCard` -- My Team grid card. Avatar, name, role badge, status dot, current task, cost. 280x180px
- `CredentialInput` -- wizard Step 3. Label, masked input, show/hide toggle, validation status icon, help link
- `WelcomeHeader` -- Home page. Time-of-day greeting, company name, subtle gradient text
- `TeamStatusStrip` -- Home page. Horizontal card row with animated count-up numbers
- `SpendCard` -- Compact spend display: dollar amount, trend arrow, period label
- `PerformanceStats` -- Team member detail. Grid of stat cards: tasks completed, success rate, avg time, total cost

### REPLACE
- `ActiveAgentsPanel` -> `ActiveTeamPanel` (rename + add current task preview)
- Adapter-specific config UI -> collapsed "Engine Settings" (same components, wrapped in collapsible with "Advanced" label)

---

## Page-by-Page Wireframe Descriptions

### HOME

```
+------------------------------------------------------------------+
| [Star] Raava                          [Inbox 3] [Avatar]         |
+------------------------------------------------------------------+
| SIDEBAR        |  Good morning, Carlos.                          |
| Home  *active* |  Here's your team's status.                     |
| Inbox          |                                                  |
| My Team        |  [3 Active] [1 Idle] [1 Needs Attention]        |
| Tasks          |   ^green      ^gray    ^red                     |
| Projects       |                                                  |
| Routines       |  +-ACTIVE WORK--------------------------+       |
| Billing        |  | [Avatar] Alex    "Following up on..."  |      |
| Settings       |  |          Sales    12m elapsed           |      |
|                |  | [Avatar] Jordan  "Auditing task list"   |      |
|                |  |          Ops      3m elapsed             |      |
|                |  +----------------------------------------+       |
|                |                                                  |
|                |  +-SPEND THIS WEEK----+ +-RECENT TASKS---+       |
|                |  | $127.40   +12%     | | Task 1  Done   |       |
|                |  | vs last week       | | Task 2  Done   |       |
|                |  +--------------------+ | Task 3  In Prog|       |
|                |                         +----------------+       |
|                |                                                  |
|                |  +-ACTIVITY-------------------------------+      |
|                |  | Alex finished working on "Lead followup"|      |
|                |  | Jordan created task "Q2 audit"          |      |
|                |  +----------------------------------------+      |
+------------------------------------------------------------------+
```

### MY TEAM

```
+------------------------------------------------------------------+
| My Team                              [Filter: All v]  [+ Hire]   |
+------------------------------------------------------------------+
| [All] [Working] [Paused] [Needs Attention]                       |
|                                                                    |
| +--CARD-----------+ +--CARD-----------+ +--CARD-----------+      |
| | [Avatar]        | | [Avatar]        | | [Avatar]        |      |
| | Alex            | | Jordan          | | Sam             |      |
| | Sales Assistant | | Ops Manager     | | Data Analyst    |      |
| | * Working       | | * Idle          | | ! Needs Attn    |      |
| | "Following up   | | Last active     | | Error: DB conn  |      |
| |  on leads..."   | | 2 hours ago     | | failed          |      |
| | $34.20/wk       | | $28.10/wk       | | $12.00/wk       |      |
| +-----------------+ +-----------------+ +-----------------+      |
|                                                                    |
| +--CARD-----------+ +--CARD-----------+ +--CARD-----------+      |
| | [Avatar]        | | [Avatar]        | | [Avatar]        |      |
| | Taylor          | | Morgan          | | Casey           |      |
| | Cust. Support   | | Marketing Coord | | General Asst    |      |
| | * Working       | | * Paused        | | * Working       |      |
| | "Drafting ticket | | Paused by user  | | "Organizing     |      |
| |  responses"     | |                 | |  inbox"         |      |
| | $22.50/wk       | | $0.00/wk        | | $18.90/wk       |      |
| +-----------------+ +-----------------+ +-----------------+      |
+------------------------------------------------------------------+
```

### ONBOARDING WIZARD -- STEP 2

```
+------------------------------------------------------------------+
|                    [1]--[2*]--[3]--[4]                            |
|                                                                    |
|          Hire your first team member                               |
|          Pick a role. You can customize everything later.          |
|                                                                    |
| +--ROLE CARD------+ +--ROLE CARD------+ +--ROLE CARD------+      |
| | [Briefcase]     | | [Cog]           | | [Headset]       |      |
| | Sales           | | Operations      | | Customer        |      |
| | Assistant       | | Manager         | | Support         |      |
| |                 | |                 | |                 |      |
| | Email, CRM,     | | Tasks, Calendar,| | Help Desk,      |      |
| | Doc Drafting    | | Spreadsheets    | | Email, KB       |      |
| +-----------------+ +-----------------+ +-----------------+      |
|                                                                    |
| +--ROLE CARD------+ +--ROLE CARD------+ +--ROLE CARD------+      |
| | [Chart]         | | [Megaphone]     | | [Star]          |      |
| | Data            | | Marketing       | | General         |      |
| | Analyst         | | Coordinator     | | Assistant       |      |
| |                 | |                 | |                 |      |
| | SQL, Sheets,    | | Social Media,   | | Email, Docs,    |      |
| | Visualization   | | Content, Analyt | | Research        |      |
| +-----------------+ +-----------------+ +-----------------+      |
|                                                                    |
|                                          [Back]   [Next ->]       |
+------------------------------------------------------------------+
```

### ONBOARDING WIZARD -- STEP 3

```
+------------------------------------------------------------------+
|                    [1]--[2]--[3*]--[4]                            |
|                                                                    |
|          Set up Sales Assistant's tools                            |
|          Your credentials are stored securely in a vault.         |
|                                                                    |
|  +--CREDENTIAL CARD--------------------------------------+        |
|  | Gmail API Key                          [How to get?]  |        |
|  | [*****************************] [Show]  [ ] Valid     |        |
|  +-------------------------------------------------------+        |
|                                                                    |
|  +--CREDENTIAL CARD--------------------------------------+        |
|  | CRM API Key (HubSpot)                  [How to get?]  |        |
|  | [                                ] [Show]  [?] Empty  |        |
|  +-------------------------------------------------------+        |
|                                                                    |
|  [Lock icon] These are stored in a 1Password vault and             |
|  never visible in plaintext after setup.                           |
|                                                                    |
|  [Skip for now -- add credentials later]                           |
|                                                                    |
|                                          [Back]   [Next ->]       |
+------------------------------------------------------------------+
```

### ONBOARDING WIZARD -- STEP 4

```
+------------------------------------------------------------------+
|                    [1]--[2]--[3]--[4*]                            |
|                                                                    |
|          Almost there! Name your new team member.                  |
|                                                                    |
|  Name:  [ Alex                        ]                           |
|                                                                    |
|  Icon:  [  ] [  ] [  ] [  ] [  ] [  ]   <- icon picker grid     |
|                                                                    |
|  First task:                                                       |
|  +-------------------------------------------------------+        |
|  | Review my recent leads and draft follow-up emails     |        |
|  | for anyone who hasn't responded in 3+ days            |        |
|  +-------------------------------------------------------+        |
|  (You can edit this -- it's what they'll start working on)        |
|                                                                    |
|                                                                    |
|       +========================================+                   |
|       |  [Star gradient]  Hire Alex            |                   |
|       +========================================+                   |
|              ^ Big, gradient, unmissable                           |
+------------------------------------------------------------------+
```

---

## Key Interaction Patterns

### Hover States
- Cards: subtle border color shift to `--raava-blue` at 20% opacity, shadow elevation from `shadow-md` to `shadow-lg`
- Buttons: darken 10%, cursor pointer
- Role cards (wizard): gradient border appears, glow shadow
- Table rows: background shifts to `--raava-hover`

### Selected States
- Role cards: solid gradient border, checkmark in top-right, glow shadow (`shadow-glow`)
- Tab items: underline with brand gradient, text color shifts to `--raava-blue`
- Sidebar nav: left border accent (3px, `--raava-blue`), background `--raava-hover`

### Loading States
- Pages: `PageSkeleton` (keep existing, re-skin). Pulse animation on card placeholders
- Wizard launch: Raava star spinning (CSS rotation on the SVG star mark)
- Tasks in progress: subtle pulse on the status dot

### Empty States
- My Team (no members): "Your team is empty. Hire your first team member." [Hire] button
- Tasks (none): "No tasks yet. Create a task or hire a team member to get started."
- Inbox (nothing): "All caught up. Your team is handling things." (with a calm illustration)

### Error States
- Team member error: red status dot, "Needs Attention" badge, card border shifts to `--raava-error` at 20%
- Credential validation fail: red border on input, inline error message below: "This API key is invalid. Check that it has the right permissions."
- Task failed: red status badge, expandable error summary

---

## Mobile Considerations

**The eMerge demo will be on a laptop** (13" or 15" screen). This is the priority viewport.

However, the Home and My Team pages should be responsive for tablet (iPad) for walk-around demos:
- My Team: 2-column card grid on tablet, 1-column on phone
- Home: stack sections vertically on tablet
- Wizard: full-width card grid, 2x3 on laptop, 1x6 scroll on tablet
- Sidebar: collapsed to hamburger on tablet

**We are NOT building mobile-first.** Desktop is the priority. Tablet is nice-to-have for eMerge.

---

## The "Wow Moment"

**The single screen that makes investors say "I want that":**

**My Team page with 3-4 active team members.**

Why: It's the screen that sells the vision. You see a team. Each card is a person with a name, a role, a status, a current task, and a cost. It looks like a real team dashboard. It instantly communicates the value proposition: "I have a team of AI workers, and I can see exactly what they're doing and what they cost."

The onboarding wizard is the hook. The My Team page is the "aha" that keeps them.

**Design priority for this screen:** Make the cards beautiful. Make the status indicators lively. Make the "Working" state feel active (subtle animation on the status dot, live task preview). Make the cost visible but not alarming. This is the screenshot that goes in the pitch deck.

**Runner-up wow moment:** The wizard Step 4 "Hire Alex" button moment. The animation from pressing the button to seeing "Alex is on your team!" should feel like a hire, not a deployment. Celebratory, not technical.

---

# APPENDIX: MANAGEMENT TEAM SIGN-OFF

| Leader | Assessment | Key Concern |
|---|---|---|
| **Diana (VP Product)** | Approved. Spec is comprehensive, terminology mapping is complete. The wizard flow is the right showpiece. | The Hermes skill names (`hermes-email`, `hermes-crm`, etc.) may not exist yet. Marcus needs to confirm what's shippable by April 15 |
| **Leo (Design Lead)** | Approved. Design system is clean, wireframes are buildable. I need 3 days for Figma mockups once this is signed off. | Card grid for My Team is more complex than a list. Need to nail responsive behavior before committing to it as default |
| **Kai (Startup Advisor)** | Approved. Value prop is clear, GTM is actionable, personas are grounded. | Pricing framing is intentionally vague. We need real cost-per-role numbers from Marcus before eMerge or we'll fumble the pricing question at the booth |
| **Marcus (CTO)** | Approved with caveats. Architecture is sound. 1Password credential flow is correct. | Several Hermes skills referenced don't exist yet. We need to scope what's real vs. aspirational before building templates. I can confirm by April 5 |
| **Rafael (VP Engineering)** | Approved. The repurposing approach is correct -- rename and restructure, don't rebuild. Estimated 8-10 days of frontend work for a team of 2. | The credential validation in Step 3 requires backend endpoints that don't exist. Need to add API routes for key validation. 2-3 days of backend work |

## Open Decisions for CEO

1. **Pricing model:** Do we launch at eMerge with per-role monthly pricing, or keep it vague ("contact us")? Kai recommends per-role pricing. Marcus flags margin risk.

2. **Hermes skill scope:** Marcus can confirm which skills are real by April 5. Do we build wizard cards only for roles with working skills, or show all 6 roles and mark some as "coming soon"?

3. **Card grid vs. list default:** Leo wants cards (more visual). Rafael flags complexity cost. CEO call on default view.

4. **Demo data:** Do we build a demo company with pre-populated team members and task history, or do we run the wizard live at the booth? Kai recommends pre-populated (less risk), Diana recommends live wizard (more impressive).

---

*End of document. Awaiting CEO review and go/no-go decisions.*
