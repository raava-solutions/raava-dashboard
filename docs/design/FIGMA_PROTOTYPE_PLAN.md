# Figma Prototype Plan -- Full Interactive Prototype
## Diana (VP Product) + Leo (Design Lead)

**Date:** April 3, 2026
**Status:** Ready for Management Review, then CEO Review
**Figma File:** `J1ht22xd1fMhT57kO0xkj5`
**Existing Screens:** 3 of 24 built (Onboarding Step 2, My Team, Home Dashboard)
**Target:** Complete clickable prototype for eMerge Americas demo (April 22)

---

## PART 1: COMPLETE SCREEN INVENTORY

### Screens Already Built (3)

| # | Screen | Figma Frame ID | Status | Notes |
|---|---|---|---|---|
| 1 | Onboarding Step 2 -- Hire Your First Team Member (Role Cards) | `4:2` | DONE | 6 role cards in 2x3 grid, step indicator, selected state on Sales Assistant |
| 2 | My Team (Card Grid) | `17:2` | DONE | 3 team member cards (Alex, Jordan, Sam), filter tabs, Hire button, sidebar nav |
| 3 | Home Dashboard | `24:2` | DONE | Welcome banner, team status strip, active work, spend card, recent tasks |

### Screens To Build (21)

**Auth Flow (1 screen)**

| # | Screen | Description | Spec Reference |
|---|---|---|---|
| 4 | Login / API Key Entry | Clean centered card. Email + password for SaaS mode. "Connect with FleetOS" toggle reveals API key field. Raava star mark above. Brand gradient bg. | Product Spec: N/A (new) |

**Onboarding Flow (4 screens -- 1 done, 3 remaining)**

| # | Screen | Description | Spec Reference |
|---|---|---|---|
| 5 | Onboarding Step 1 -- Create Your Company | Centered card. Fields: Company name, Your name, Your role (dropdown). Star mark above. Brand gradient subtle bg. "Next" button. | Product Spec, Section 13, Step 1 |
| 6 | Onboarding Step 3 -- Credentials & Setup | Header: "Set up Sales Assistant's tools." Per-credential cards with masked input, show/hide, validation status, help link. Security messaging with lock icon. "Skip for now" option. | Product Spec, Section 13, Step 3 |
| 7 | Onboarding Step 4 -- Name & Launch | Name input (pre-filled "Alex"), icon picker grid, first task textarea (pre-filled), large gradient "Hire Alex" button. | Product Spec, Section 13, Step 4 |
| 8 | Onboarding Success State | "[Alex] is on your team! They're starting on their first task now." Confetti/celebration animation freeze-frame. "Go to My Team" button. Star spinning resolved. | Product Spec, Section 13, Post-launch |

**Main App -- Core Screens (12 screens -- 2 done, 10 remaining)**

| # | Screen | Description | Spec Reference |
|---|---|---|---|
| 9 | Inbox -- Review Requests Tab | Sidebar + header. Tab bar: Review Requests (active), Notifications, Escalations. List of review request cards with Approve/Reject/Comment actions. | Product Spec, Section 2 |
| 10 | Inbox -- Notifications Tab | Same chrome, Notifications tab active. Task completions, status changes. Swipe-to-archive indicators. | Product Spec, Section 2 |
| 11 | Team Member Detail -- Overview Tab | Profile header (name, role, avatar, status, "Hired March 28"). Current task card. Performance stats grid (tasks completed, success rate, avg time). Weekly cost with trend. Skills list. | Product Spec, Section 4 |
| 12 | Team Member Detail -- Tasks Tab | Same header. Tab bar with Tasks active. Filtered task list for this team member. Status badges. | Product Spec, Section 4 |
| 13 | Team Member Detail -- Work History Tab | Tab bar with Work History active. Chronological list of work sessions: task name, duration, outcome badge, cost. Expandable transcript preview. | Product Spec, Section 4 |
| 14 | Team Member Detail -- Personality Tab | Tab bar with Personality active. Rich text editor showing SOUL.md content in human-friendly language. Help text above. | Product Spec, Section 4 |
| 15 | Tasks List | Sidebar + header. Filter bar (status, team member, project). Task list with status badges (To Do, In Progress, Done, Needs Review, Stuck). "New Task" button. Search bar. | Product Spec, Section 5 |
| 16 | Task Detail | Task header with title, status badge, assigned team member, project. Description body (Markdown). Activity stream. Work sessions list (expandable). Action buttons. | Product Spec, Section 6 |
| 17 | New Task Dialog | Modal overlay. Fields: Title, Description (rich text), Assign to (team member dropdown with avatars), Project (dropdown), Priority. "Create Task" gradient button. | Product Spec, Section 5 (implied) |
| 18 | Projects List | Sidebar + header. Project cards/rows with team member count badge, task summary ("12 tasks, 8 done"), status. "New Project" button. | Product Spec, Section 7 |

**Main App -- Secondary Screens (6 screens)**

| # | Screen | Description | Spec Reference |
|---|---|---|---|
| 19 | Project Detail (with Goals Tab) | Project header. Tabs: Tasks, Team, Goals, Workspace. Tasks tab as default showing filtered task list. | Product Spec, Section 8 |
| 20 | Routines List | Sidebar + header. Routine cards with human-readable schedule ("Every weekday at 9am"), assigned team member, status. | Product Spec, Section 9 |
| 21 | Routine Detail | Routine header with schedule, team member, status. History section ("Ran 14 times this month, 13 successful"). Run history list. | Product Spec, Section 10 |
| 22 | Billing Page | Spend overview cards (total this month, trend, projected). "By Team Member" bar chart. "By Role" aggregate. Spending limits section. Transaction log. | Product Spec, Section 11 |
| 23 | Settings Page | Tabs or sections: Company Profile, Team Defaults, Integrations (credential status), Advanced (collapsed). | Product Spec, Section 12 |

**State Screens (3 screens)**

| # | Screen | Description | Spec Reference |
|---|---|---|---|
| 24 | Empty State -- My Team (0 members) | My Team page layout but center content is empty state: illustration, "Your team is empty. Hire your first team member." + Hire button. | Product Spec, Empty States |
| 25 | Empty State -- Tasks (0 tasks) | Tasks page layout with empty state: "No tasks yet. Create a task or hire a team member to get started." | Product Spec, Empty States |
| 26 | Error State -- Team Member Needs Attention | Team Member Detail variant: red status indicators, error banner at top, "Needs Attention" badge, error description card, "Retry" and "View Log" actions. | Product Spec, Error States |

**TOTAL: 26 screens (3 done, 23 to build)**

---

## PART 2: USER JOURNEY PROTOTYPE FLOWS

Each journey defines the click paths that connect screens into the interactive prototype. Hotspot regions are specified.

### Journey 1: First-Time User (THE DEMO FLOW -- Highest Priority)

This is the exact flow from the eMerge 3-minute demo script.

```
Login (4)
  [Click "Get Started" or "Login"]
    |
    v
Onboarding Step 1 (5) -- Create Your Company
  [Fill fields, click "Next"]
    |
    v
Onboarding Step 2 (1) -- EXISTING -- Hire First Team Member
  [Click "Sales Assistant" card, click "Next"]
    |
    v
Onboarding Step 3 (6) -- Credentials & Setup
  [Click "Skip for now", click "Next"]
    |
    v
Onboarding Step 4 (7) -- Name & Launch
  [Click "Hire Alex"]
    |
    v
Success State (8)
  [Click "Go to My Team"]
    |
    v
Home Dashboard (3) -- EXISTING
  [Click "My Team" in sidebar]
    |
    v
My Team (2) -- EXISTING -- (now shows Alex as new member)
  [Click Alex's card]
    |
    v
Team Member Detail -- Overview (11)
```

**Prototype connections needed:** 9 screen transitions, 8 hotspot regions

### Journey 2: Daily Check-In

```
Home Dashboard (3) -- EXISTING
  [Click active work item "Following up on 3 leads"]
    |
    v
Task Detail (16) -- shows the lead follow-up task
  [Click "Back" or breadcrumb]
    |
    v
Home Dashboard (3)
  [Click team member name "Alex" in active work]
    |
    v
Team Member Detail -- Overview (11)
  [Click "Tasks" tab]
    |
    v
Team Member Detail -- Tasks (12)
  [Click "Work History" tab]
    |
    v
Team Member Detail -- Work History (13)
```

**Prototype connections needed:** 5 transitions, 5 hotspots

### Journey 3: Assign New Task

```
Home Dashboard (3) -- EXISTING
  [Click "Tasks" in sidebar]
    |
    v
Tasks List (15)
  [Click "New Task" button]
    |
    v
New Task Dialog (17) -- modal overlay on Tasks List
  [Fill form, click "Create Task"]
    |
    v
Task Detail (16) -- shows newly created task
  [Click back / "Tasks" in sidebar]
    |
    v
Tasks List (15) -- now shows new task in list
```

**Prototype connections needed:** 4 transitions, 4 hotspots

### Journey 4: Hire Another Team Member

```
My Team (2) -- EXISTING
  [Click "+ Hire" button]
    |
    v
Onboarding Step 2 (1) -- EXISTING (reused, no Step 1 needed)
  [Click "Data Analyst" card, click "Next"]
    |
    v
Onboarding Step 3 (6)
  [Enter credentials or skip, click "Next"]
    |
    v
Onboarding Step 4 (7) -- pre-filled "Sam" for Data Analyst
  [Click "Hire Sam"]
    |
    v
Success State (8)
  [Click "Go to My Team"]
    |
    v
My Team (2) -- variant showing 4 members now
```

**Prototype connections needed:** 5 transitions, 5 hotspots

### Journey 5: Check Billing

```
Home Dashboard (3) -- EXISTING
  [Click "Billing" in sidebar]
    |
    v
Billing Page (22)
  [Scroll to "By Team Member" breakdown]
  [Click "Spending Limits" section]
  [Adjust a limit, save]
    |
    v
Billing Page (22) -- updated state showing saved limit
```

**Prototype connections needed:** 2 transitions, 3 hotspots

### Journey 6: Browse Personality & Settings (Derek the Technical Buyer)

```
My Team (2) -- EXISTING
  [Click Alex's card]
    |
    v
Team Member Detail -- Overview (11)
  [Click "Personality" tab]
    |
    v
Team Member Detail -- Personality (14)
  [Click "Settings" tab -- not wired, shows this exists]
```

**Prototype connections needed:** 2 transitions, 2 hotspots

### Sidebar Navigation (Global)

Every main app screen must have clickable sidebar links:

| Sidebar Item | Navigates To |
|---|---|
| Home | Home Dashboard (3) |
| Inbox | Inbox -- Review Requests (9) |
| My Team | My Team (2) |
| Tasks | Tasks List (15) |
| Projects | Projects List (18) |
| Routines | Routines List (20) |
| Billing | Billing Page (22) |
| Settings | Settings Page (23) |

**This adds 8 hotspots per main app screen (14 screens with sidebar = 112 hotspot connections).**

---

## PART 3: PRIORITIZED BUILD ORDER

### Tier 1 -- CRITICAL PATH (Must have for eMerge demo)
**Screens 4-8, 11: 6 screens**

These complete Journey 1 (the demo flow) end-to-end. Without these, we cannot do the booth walkthrough.

| Priority | Screen | Why Critical | Estimated Effort |
|---|---|---|---|
| P0 | Onboarding Step 1 -- Create Company (5) | Demo starts here. First impression. | Low -- simple form card |
| P0 | Onboarding Step 3 -- Credentials (6) | Demo flow continuity. Shows security story. | Medium -- credential cards with states |
| P0 | Onboarding Step 4 -- Name & Launch (7) | "Hire Alex" button is the money shot. | Medium -- icon picker, textarea, gradient CTA |
| P0 | Onboarding Success State (8) | Emotional payoff. Celebrates the hire. | Low -- celebration screen with single CTA |
| P0 | Team Member Detail -- Overview (11) | Demo ends here. Shows the "teammate profile." | High -- dense information layout, stats grid |
| P1 | Login Page (4) | Clean entry point. Sets the tone. | Low -- simple centered card |

### Tier 2 -- HIGH VALUE (Completes daily-use journeys)
**Screens 15-17, 12-13, 9: 6 screens**

These complete Journeys 2 and 3 and make the app feel like a real product, not just a wizard.

| Priority | Screen | Why High Value | Estimated Effort |
|---|---|---|---|
| P1 | Tasks List (15) | Core app screen. Shows task management works. | Medium -- list with filters, search |
| P1 | Task Detail (16) | Proves tasks have depth. Activity stream is compelling. | Medium-High -- multiple sections, activity |
| P1 | New Task Dialog (17) | Shows you can create work. Interactive. | Low-Medium -- modal form |
| P1 | Team Member Detail -- Tasks Tab (12) | Completes the team member profile story. | Low -- reuses task list pattern |
| P1 | Team Member Detail -- Work History (13) | "Work log" is compelling for trust. Shows audit trail. | Medium -- timeline with expandable entries |
| P1 | Inbox -- Review Requests (9) | Shows human-in-the-loop. Builds trust with Derek. | Medium -- action-oriented list |

### Tier 3 -- COMPLETE PICTURE (Full app feel)
**Screens 14, 10, 18-23: 8 screens**

These fill out the remaining navigation destinations so every sidebar link works.

| Priority | Screen | Why Needed | Estimated Effort |
|---|---|---|---|
| P2 | Team Member Detail -- Personality (14) | Differentiator. Shows agents have personality. | Low -- markdown editor, help text |
| P2 | Inbox -- Notifications Tab (10) | Completes inbox. Simple variant of screen 9. | Low -- variant of Review Requests |
| P2 | Projects List (18) | Fills sidebar destination. | Low -- simple list/card layout |
| P2 | Billing Page (22) | Answers "how much?" -- critical question at booth. | Medium-High -- charts, tables, spending limits |
| P2 | Routines List (20) | Fills sidebar destination. | Low -- card list with schedule |
| P2 | Project Detail (19) | Drilldown from Projects. | Medium -- tabbed layout |
| P2 | Routine Detail (21) | Drilldown from Routines. | Low-Medium -- header + history list |
| P2 | Settings Page (23) | Fills sidebar destination. Shows integrations. | Medium -- multi-section form |

### Tier 4 -- POLISH (States and edge cases)
**Screens 24-26: 3 screens**

| Priority | Screen | Why | Estimated Effort |
|---|---|---|---|
| P3 | Empty State -- My Team (24) | Shows what new users see. Good for storytelling. | Low -- variant of My Team |
| P3 | Empty State -- Tasks (25) | Completes empty state story. | Low -- variant of Tasks |
| P3 | Error State -- Team Member (26) | Shows error handling. Builds trust. | Low-Medium -- variant of Detail |

---

## PART 4: DESIGN POD DISPATCH PLAN

Work is broken into 8 parallel design pods. Each pod gets 2-3 screens that share layout patterns, reducing context-switching. Pods can run simultaneously without conflicts because no two pods modify the same Figma frames.

---

### Design Pod Alpha -- "The Wizard Bookends"
**Screens:** Login (4), Onboarding Step 1 (5), Onboarding Success State (8)
**Priority:** P0 / Tier 1
**Estimated Effort:** 3-4 hours

**Brief:**
- All three screens are centered card layouts on a brand gradient background. Same visual pattern, different content.
- Login: Email/password fields, "Get Started" gradient button, Raava star mark centered above, "Connect with FleetOS" text link below form.
- Step 1: Company name, Your name, Your role (dropdown) fields. Step indicator showing step 1 active (reuse pattern from existing Step 2 frame `4:2` -- specifically the Step Indicator group `6:2`).
- Success State: Large star mark (spinning in final prototype), "[Alex] is on your team!" display text (Syne 800), subtitle "They're starting on their first task now." (Plus Jakarta Sans 400), "Go to My Team" gradient button. Light confetti/celebration particles as static decoration.
- **Reference:** Use the step indicator from `6:2`, button style from `11:5`, brand wordmark from `18:3`.
- **Design tokens:** All tokens from Product Spec Deliverable 5 (colors, typography, spacing, radii, shadows).

**Key Spec Sections:** Product Spec Section 13 (Steps 1 and 4 post-launch), Product Spec Deliverable 5 (full design system).

---

### Design Pod Beta -- "The Wizard Core"
**Screens:** Onboarding Step 3 -- Credentials (6), Onboarding Step 4 -- Name & Launch (7)
**Priority:** P0 / Tier 1
**Estimated Effort:** 4-5 hours

**Brief:**
- Step 3: Header "Set up [Sales Assistant]'s tools". Two credential cards stacked vertically. Each card: label ("Gmail API Key"), masked input with show/hide toggle, validation status icon (gray circle = unconfigured), help link ("How to get this key?"). Lock icon + security message at bottom. "Skip for now" text link. Step indicator at step 3. Back/Next buttons.
- Step 4: Name input pre-filled with "Alex". Icon picker grid (6 options, reuse AgentIconPicker pattern from `20:5` avatar style). First task textarea pre-filled with Sales Assistant default. Large gradient "Hire Alex" button -- full width, prominent, this is the showstopper.
- **Reference:** Step indicator from `6:2`, navigation buttons from `11:2`, card style matching role cards in `8:3`.
- **Critical detail:** The "Hire Alex" button must feel like the biggest, most inviting element on any screen in the app. Brand gradient, Syne 800 text, shadow-glow, generous padding (16px 48px minimum).

**Key Spec Sections:** Product Spec Section 13 (Steps 3 and 4), Agent Role Cards Concept Section 6 (credential indication), Product Spec credential storage note.

---

### Design Pod Gamma -- "The Team Member Profile"
**Screens:** Team Member Detail -- Overview (11), Team Member Detail -- Tasks Tab (12), Team Member Detail -- Work History (13), Team Member Detail -- Personality (14)
**Priority:** P0-P1 / Tiers 1-3
**Estimated Effort:** 6-8 hours (most complex pod)

**Brief:**
- This is a single page with 4 tab states. Build the Overview tab first (P0), then Tasks, Work History, Personality.
- **Shared chrome:** Sidebar (clone from `18:2`), page header with breadcrumb "My Team > Alex", profile header card (avatar 80px from `20:5` pattern scaled up, name in Syne 800 24px, role badge from `20:9` pattern, status indicator from `20:12` pattern, "Hired March 28, 2026" caption). Tab bar: Overview | Tasks | Work History | Personality.
- **Overview tab:** Current task card (task title, time elapsed, live status dot). Performance stats as 2x2 grid of MetricCards: "Tasks Completed: 24", "Success Rate: 92%", "Avg Task Time: 18m", "This Week: $34.20". Skills/tools list as horizontal badge row (Email, CRM, Docs, Calendar -- reuse badge style from `9:7`).
- **Tasks tab:** Filtered IssuesList showing tasks assigned to Alex. Reuse the row pattern from Recent Tasks in Home Dashboard (`27:5` through `27:29`). Status badges: To Do (gray), In Progress (blue), Done (green), Needs Review (purple), Stuck (red).
- **Work History tab:** Chronological list entries. Each entry: task name, duration ("45 min"), outcome badge (Completed/green, Failed/red, Escalated/yellow), cost ("$2.40"). Expand arrow for transcript preview.
- **Personality tab:** Full-width Markdown editor area with pre-filled SOUL.md text: "You are a professional, proactive sales assistant..." Help text above: "This guides how your team member thinks, communicates, and approaches tasks."
- **Reference:** Sidebar from `18:2`, card styling from `20:3`, badge styling from `9:7`, task rows from `27:5`.

**Key Spec Sections:** Product Spec Section 4 (full Team Member Detail spec), Role Definitions (Sales Assistant SOUL.md).

---

### Design Pod Delta -- "Tasks & Actions"
**Screens:** Tasks List (15), Task Detail (16), New Task Dialog (17)
**Priority:** P1 / Tier 2
**Estimated Effort:** 5-6 hours

**Brief:**
- **Tasks List:** Sidebar + "Tasks" page header with "New Task" gradient button (right-aligned, like Hire button pattern from `19:5`). Filter bar row: status dropdown (All, To Do, In Progress, Done, Needs Review, Stuck), team member dropdown (with avatar thumbnails), project dropdown. Search input right-aligned in filter bar. Task list below using row pattern from Home Dashboard recent tasks (`27:5`), but with additional columns: assigned team member avatar+name, project name, created date. 8-10 sample task rows.
- **Task Detail:** Breadcrumb "Tasks > Draft follow-up emails for leads". Header section: title (Syne 800 24px), status badge, assigned team member (avatar + name, clickable), project link, created date. Description body (Markdown rendered, 2-3 paragraphs of sample content). Activity stream below: timestamped entries showing comments, status changes, work session summaries. Work sessions section: 2 entries showing duration, outcome, cost, with expand arrow. Action bar: Reassign button, Status dropdown, "Add Comment" input.
- **New Task Dialog:** Modal overlay (radius-xl, shadow-lg). Title "New Task" with X close. Fields: Title input, Description (rich text area, 4 lines), Assign to (dropdown with team member avatars+names+roles), Project (dropdown), Priority (Low/Medium/High radio or dropdown). Footer: "Cancel" ghost button, "Create Task" gradient button.
- **Reference:** Row pattern from `27:5`, button from `19:5`, sidebar from `18:2`, badge styling from `27:9`.

**Key Spec Sections:** Product Spec Sections 5 and 6 (Tasks and Task Detail).

---

### Design Pod Epsilon -- "The Inbox"
**Screens:** Inbox -- Review Requests (9), Inbox -- Notifications (10)
**Priority:** P1-P2 / Tiers 2-3
**Estimated Effort:** 3-4 hours

**Brief:**
- **Shared chrome:** Sidebar, "Inbox" page header, tab bar with count badges: "Review Requests (2)", "Notifications (5)", "Escalations (1)".
- **Review Requests tab:** Card-based list. Each card: team member avatar+name+role on left, request description in center ("Alex wants to send follow-up emails to 3 leads. Review the drafts before sending."), Approve (green) / Reject (red outline) / Comment (gray outline) action buttons on right. Timestamp. Unread indicator (blue dot left edge).
- **Notifications tab:** Simpler list. Each row: icon (checkmark for completion, warning for error, arrow for status change), description text ("Alex finished working on 'Lead follow-up emails'"), timestamp, read/unread styling. Archive swipe indicator on right edge.
- **Escalations tab:** Not a separate screen -- show 1-2 escalation items as a section at the top of Review Requests, styled with warning/error colors. "Sam is stuck on 'Pull KPI metrics' -- database connection failed. [View Details] [Retry]"
- **Reference:** Sidebar from `18:2`, card styling from `20:3`, status dots from `20:12`.

**Key Spec Sections:** Product Spec Section 2 (Inbox).

---

### Design Pod Zeta -- "Billing & Settings"
**Screens:** Billing Page (22), Settings Page (23)
**Priority:** P2 / Tier 3
**Estimated Effort:** 5-6 hours

**Brief:**
- **Billing Page:** Sidebar + "Billing" header. Top row: 3 MetricCards -- "This Month: $487.20" (large, Syne 800), "vs. Last Month: $412.50 (+18%)", "Projected: $520". "By Team Member" section: horizontal bar chart showing spend per team member (Alex $142, Jordan $98, Taylor $89, Riley $72, Casey $52, Sam $34). "By Role" section: aggregate table (Sales Assistants: $142, Ops Managers: $98, etc.). "Spending Limits" section: per-member limit cards with current spend bar, limit input, save button. Transaction log at bottom (5 recent entries in timeline format).
- **Settings Page:** Sidebar + "Settings" header. Sections stacked vertically: (1) Company Profile -- name, logo upload area, description textarea. (2) Team Defaults -- default spending limit input, default approval toggle (require review before sending emails: on/off). (3) Integrations -- grid of integration cards (Gmail, HubSpot, Zendesk, Google Sheets, Slack) each with status dot (green=connected, gray=not configured), "Configure" button. (4) Advanced (collapsed by default) -- "For advanced users" label, expand arrow.
- **Reference:** MetricCard pattern from `25:6`/`26:23`, card styling from `20:3`, sidebar from `18:2`.

**Key Spec Sections:** Product Spec Sections 11 and 12 (Billing and Settings), Design tokens for charts.

---

### Design Pod Eta -- "Projects & Routines"
**Screens:** Projects List (18), Project Detail (19), Routines List (20), Routine Detail (21)
**Priority:** P2 / Tier 3
**Estimated Effort:** 4-5 hours

**Brief:**
- **Projects List:** Sidebar + "Projects" header + "New Project" button. Card or row list. Each entry: project name (bold), team member count badge ("3 team members"), task summary ("12 tasks, 8 done"), progress bar. 3-4 sample projects.
- **Project Detail:** Breadcrumb "Projects > Project Alpha". Header: project name, description, status. Tab bar: Tasks | Team | Goals | Workspace. Tasks tab (default): filtered task list (reuse pattern from Tasks List pod). Show 4-5 tasks. Team tab content not needed for prototype -- just the tab label.
- **Routines List:** Sidebar + "Routines" header + "New Routine" button. Card list. Each card: routine name, human-readable schedule ("Every weekday at 9:00 AM"), assigned team member (avatar+name), status (Active/Paused), last run result ("Last ran: yesterday, success"). 3-4 sample routines.
- **Routine Detail:** Breadcrumb "Routines > Daily Lead Follow-Up". Header: name, schedule in natural language, team member, status badge. "Ran 14 times this month, 13 successful" summary stat. History list: 5-6 entries with date, duration, outcome badge, cost.
- **Reference:** Row patterns from `27:5`, sidebar from `18:2`, badge styles from `27:9`, card from `20:3`.

**Key Spec Sections:** Product Spec Sections 7-10 (Projects and Routines).

---

### Design Pod Theta -- "Edge States"
**Screens:** Empty State -- My Team (24), Empty State -- Tasks (25), Error State -- Team Member (26)
**Priority:** P3 / Tier 4
**Estimated Effort:** 2-3 hours

**Brief:**
- **Empty My Team:** Clone My Team frame (`17:2`). Remove all team member cards. Replace card area with centered empty state: simple line illustration (abstract team/people), "Your team is empty" (Syne 800 20px), "Hire your first team member to get started." (Plus Jakarta Sans 400 14px), "Hire" gradient button. Filter tabs show "All 0".
- **Empty Tasks:** Clone Tasks List layout. Replace task list with centered empty state: "No tasks yet" heading, "Create a task or hire a team member to get started." description, "New Task" gradient button.
- **Error Team Member Detail:** Clone Team Member Overview (11). Change status dot to red. Add error banner at top of content area: red-tinted card with warning icon, "Sam needs your attention" heading, "Database connection failed at 2:34 PM. The Data Analyst role requires a valid database connection string." description, "Retry" gradient button + "View Error Log" text link. Mute the performance stats (grayed out or show "--" values).
- **Reference:** My Team from `17:2`, empty state messaging from Product Spec.

**Key Spec Sections:** Product Spec, Key Interaction Patterns (Empty States, Error States).

---

## PART 5: EFFORT SUMMARY & TIMELINE

### Pod Effort Matrix

| Pod | Screens | Priority | Est. Hours | Can Start Day 1? | Dependencies |
|---|---|---|---|---|---|
| Alpha | Login, Step 1, Success | P0 | 3-4h | Yes | None |
| Beta | Step 3, Step 4 | P0 | 4-5h | Yes | None |
| Gamma | Team Member Detail (4 tabs) | P0-P1 | 6-8h | Yes | None |
| Delta | Tasks List, Task Detail, New Task | P1 | 5-6h | Yes | None |
| Epsilon | Inbox (2 tabs) | P1-P2 | 3-4h | Yes | None |
| Zeta | Billing, Settings | P2 | 5-6h | After Tier 1 done |  None (but lower priority) |
| Eta | Projects, Routines (4 screens) | P2 | 4-5h | After Tier 1 done | None (but lower priority) |
| Theta | Empty/Error States (3 screens) | P3 | 2-3h | After Tiers 1-2 done | Needs My Team, Tasks, Detail as base |

**Total estimated design effort:** 32-41 hours across all pods

### Recommended Execution Timeline

| Day | Pods Active | Screens Produced | Cumulative | Milestone |
|---|---|---|---|---|
| Day 1 | Alpha + Beta + Gamma (start) | 5 screens (Login, Step 1, Success, Step 3, Step 4) | 8 of 26 | Onboarding wizard complete end-to-end |
| Day 2 | Gamma (finish) + Delta (start) | 4 screens (TM Detail x4) + 1 start | 12 of 26 | Journey 1 fully clickable |
| Day 3 | Delta (finish) + Epsilon | 3 screens (Tasks, Detail, Dialog) + 2 (Inbox tabs) | 17 of 26 | Journeys 2 & 3 clickable |
| Day 4 | Zeta + Eta | 6 screens (Billing, Settings, Projects x2, Routines x2) | 23 of 26 | All sidebar destinations active |
| Day 5 | Theta + Prototype Wiring | 3 screens (states) + all hotspot connections | 26 of 26 | Full prototype clickable |

**Total: 5 design days to complete all 23 remaining screens + wiring.**

### Prototype Wiring (Day 5, second half)

After all screens are built, a dedicated wiring pass connects everything:
- Wire all 6 journeys (27 screen transitions total)
- Wire sidebar navigation on all 14 main app screens (112 hotspot connections)
- Wire tab navigation within tabbed screens (Inbox 3 tabs, Team Member Detail 4 tabs, Project Detail 4 tabs)
- Set default flow to Journey 1 for presentation mode
- Test full click-through: start to finish, every journey

---

## PART 6: CONSISTENCY CHECKLIST

Every pod must verify before delivering:

- [ ] Sidebar cloned from existing `18:2` frame (not rebuilt from scratch)
- [ ] Page header follows Syne 800 / 24px pattern from existing screens
- [ ] Card border radius: 12px (`radius-lg`)
- [ ] Card shadow: `shadow-md` (0 2px 8px rgba(0,0,0,0.08))
- [ ] Card border: 1px solid `--raava-border` (#E5E7EB)
- [ ] Button styling: primary = brand gradient fill, Syne 600 white text; secondary = ghost with --raava-blue text
- [ ] Status colors: Working = `--raava-success` (#10B981), Idle = `--raava-gray` (#6B7280), Needs Attention = `--raava-error` (#EF4444), Paused = `--raava-warning` (#F59E0B)
- [ ] Typography: headings in Syne, body in Plus Jakarta Sans, code in JetBrains Mono
- [ ] Viewport: 1440x900 (matches existing frames)
- [ ] Background: `--raava-bg` (#FCFCFC) for page, `--raava-card` (#FFFFFF) for cards
- [ ] Spacing follows 4/8/16/24/32 scale

---

## PART 7: REVIEW GATES

### Gate 1: Diana (VP Product) Review
Before any pod output reaches the CEO:
- Does the screen match the product spec?
- Is the terminology correct per the mapping table?
- Does the data shown tell a coherent story (consistent team members, realistic numbers)?
- Are all user journey transitions logically sound?

### Gate 2: Leo (Design Lead) Review
- Visual consistency with existing 3 screens
- Design token compliance
- Interaction states present (hover, selected, active)
- Responsive considerations noted

### Gate 3: Management Chain
Diana and Leo sign off, then Marcus (CTO) and Rafael (VP Engineering) confirm buildability. Only then does the prototype go to CEO.

---

## APPENDIX: SAMPLE DATA CONSISTENCY

All screens must use consistent sample data:

**Company:** "Mendez Logistics" (Carlos's company from persona)
**User:** Carlos Mendez, Head of Operations

**Team Members:**

| Name | Role | Status | Current Task | Weekly Cost |
|---|---|---|---|---|
| Alex | Sales Assistant | Working | Following up on 3 leads from yesterday | $34.20 |
| Jordan | Operations Manager | Idle | (Last active 2h ago) | $28.10 |
| Sam | Data Analyst | Needs Attention | Error: DB connection failed | $12.00 |
| Taylor | Customer Support | Working | Drafting ticket responses | $22.50 |
| Riley | Marketing Coordinator | Working | Drafting social posts for product launch | $18.90 |

**Projects:** Project Alpha (logistics optimization), Project Beta (Q2 sales push), Client Portal Redesign

**Recent Tasks:** Use task names from existing Home Dashboard frame (`27:5` through `27:29`).

---

*Produced by Diana (VP Product) and Leo (Design Lead). Ready for management review chain.*
*Pending: Management sign-off before CEO presentation and pod dispatch.*
