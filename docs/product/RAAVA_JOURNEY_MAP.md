# RAAVA DASHBOARD -- COMPLETE USER JOURNEY MAP
## Every Screen, Every Transition, Every Click

**Produced by:** Diana (VP Product) with Leo (Design Lead)
**Date:** April 3, 2026
**Purpose:** Defines every click path in the Figma prototype. Each hotspot in this document becomes a prototype link. Each transition becomes a Figma connection.
**Sample Data:** Mendez Logistics / Carlos Mendez / 5 team members (Alex, Jordan, Sam, Taylor, Riley)

---

## GLOBAL NAVIGATION REFERENCE

### Sidebar (Present on all main app screens)

| Position | Label | Icon | Destination | Screen # |
|---|---|---|---|---|
| 1 | Home | House | Home Dashboard | 3 |
| 2 | Inbox | Bell / Envelope | Inbox -- Review Requests | 9 |
| 3 | My Team | People | My Team (Card Grid) | 2 |
| 4 | Tasks | Checkmark list | Tasks List | 15 |
| 5 | Projects | Folder | Projects List | 18 |
| 6 | Routines | Clock / Repeat | Routines List | 20 |
| 7 | Billing | Dollar / Receipt | Billing Page | 22 |
| 8 | Settings | Gear | Settings Page | 23 |

**Sidebar behavior:**
- Active item: left border accent (3px, `--raava-blue`), background `--raava-hover`, text `--raava-blue`
- Inactive items: text `--raava-gray`, no background
- Sidebar is fixed on left, 240px wide, present on screens 2, 3, 9-23
- Sidebar is NOT present on onboarding/auth screens (4-8)
- Raava star mark + "Raava" wordmark at top of sidebar, clickable, navigates to Home (3)

### Top Bar (Present on all main app screens)

| Element | Position | Action |
|---|---|---|
| Page title | Left (after sidebar) | Static text, changes per page |
| Inbox badge | Right | Shows unread count (e.g., "3"), click navigates to Inbox (9) |
| User avatar + name | Far right | Click opens profile dropdown (not prototyped -- static) |

### Breadcrumbs (Present on detail pages)

| Page | Breadcrumb | Click behavior |
|---|---|---|
| Team Member Detail | My Team > [Name] | "My Team" navigates to My Team (2) |
| Task Detail | Tasks > [Task Title] | "Tasks" navigates to Tasks List (15) |
| Project Detail | Projects > [Project Name] | "Projects" navigates to Projects List (18) |
| Routine Detail | Routines > [Routine Name] | "Routines" navigates to Routines List (20) |

### Back Navigation (Global Pattern)

Every detail page supports two back-navigation methods:
1. **Breadcrumb click** -- click the parent in the breadcrumb trail
2. **Browser back / Back arrow** -- top-left back arrow icon on detail pages navigates to the previous screen in history

---

## JOURNEY 1: FIRST-TIME USER (The eMerge Demo)

**Description:** A new user opens the app for the first time, creates a company, hires their first AI team member, and explores the dashboard. This is the primary demo flow for the eMerge Americas booth.

**Duration:** ~3 minutes
**Starting state:** No account, no company, no team members
**Ending state:** 1 team member (Alex, Sales Assistant), 1 task in progress

---

### Step 1.1: Login

**Screen:** Login / API Key Entry (Screen 4)
**Sidebar:** None (auth screen)
**Header/Breadcrumb:** None
**URL:** `/login`

**What the user sees:**
- Raava star mark centered above a white card
- Brand gradient background (subtle)
- Card contains: Email input, Password input, "Get Started" gradient button
- Below form: "Connect with FleetOS" text link (reveals API key field if clicked)
- "Raava" wordmark below star mark

**Data shown:** None (empty form)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.1a | "Get Started" button | Click (form validates) | Onboarding Step 1 (Screen 5) |
| H1.1b | "Connect with FleetOS" link | Click | Reveals API key input field (state change, same screen) |

**Empty state:** This IS the empty/first-time state. No returning user variant for this screen (returning users go directly to Home after login).

---

### Step 1.2: Onboarding Step 1 -- Create Your Company

**Screen:** Onboarding Step 1 (Screen 5)
**Sidebar:** None (onboarding wizard)
**Header/Breadcrumb:** Step indicator: [1*]--[2]--[3]--[4] (Step 1 active)
**URL:** `/onboarding/step-1`

**What the user sees:**
- Raava star mark above card
- Brand gradient background (subtle)
- Step indicator showing step 1 highlighted
- Centered card with heading: "Create Your Company"
- Fields: Company name (text input), Your name (text input), Your role (dropdown: CEO, Head of Ops, VP Sales, VP Engineering, Other)
- "Next" gradient button at bottom right of card

**Data shown (pre-demo fill for eMerge):**
- Company name: "Mendez Logistics"
- Your name: "Carlos Mendez"
- Your role: "Head of Ops"

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.2a | "Next" button | Click (form validates) | Onboarding Step 2 (Screen 1) |

**Back navigation:** None (first step, no back button)

---

### Step 1.3: Onboarding Step 2 -- Hire Your First Team Member

**Screen:** Onboarding Step 2 -- Role Cards (Screen 1, EXISTING)
**Sidebar:** None (onboarding wizard)
**Header/Breadcrumb:** Step indicator: [1]--[2*]--[3]--[4] (Step 2 active)
**URL:** `/onboarding/step-2`

**What the user sees:**
- Step indicator showing step 2 highlighted
- Heading: "Hire your first team member"
- Subheading: "Pick a role. You can customize everything later."
- 2x3 grid of role cards:
  - Row 1: Sales Assistant | Operations Manager | Customer Support
  - Row 2: Data Analyst | Marketing Coordinator | General Assistant
- Each card shows: icon, role name (bold), description (small), tool badges at bottom
- "Back" text link (left) and "Next" gradient button (right) at footer

**Data shown:** All 6 role cards with descriptions and tool badges per product spec.

**Card interaction states:**
- Default: white card, `--raava-border`, `shadow-md`
- Hover: gradient border appears, `shadow-glow`
- Selected: solid gradient border, checkmark top-right, expanded detail below grid showing full skill list

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.3a | "Sales Assistant" card | Click | Card enters selected state (state change, same screen) |
| H1.3b | "Operations Manager" card | Click | Card enters selected state |
| H1.3c | "Customer Support" card | Click | Card enters selected state |
| H1.3d | "Data Analyst" card | Click | Card enters selected state |
| H1.3e | "Marketing Coordinator" card | Click | Card enters selected state |
| H1.3f | "General Assistant" card | Click | Card enters selected state |
| H1.3g | "Next" button (after card selected) | Click | Onboarding Step 3 (Screen 6) |
| H1.3h | "Back" link | Click | Onboarding Step 1 (Screen 5) |

**Demo path:** Click "Sales Assistant" card, then click "Next"

---

### Step 1.4: Onboarding Step 3 -- Credentials & Setup

**Screen:** Onboarding Step 3 (Screen 6)
**Sidebar:** None (onboarding wizard)
**Header/Breadcrumb:** Step indicator: [1]--[2]--[3*]--[4] (Step 3 active)
**URL:** `/onboarding/step-3`

**What the user sees:**
- Step indicator showing step 3 highlighted
- Heading: "Set up Sales Assistant's tools"
- Subheading: "Your credentials are stored securely in a vault."
- Two credential cards stacked vertically:
  1. Gmail API Key -- masked input, Show/Hide toggle, validation status icon (gray circle = unconfigured), "How to get this key?" help link
  2. CRM API Key (HubSpot) -- same pattern, empty state
- Lock icon + security message: "These are stored in a 1Password vault and never visible in plaintext after setup."
- "Skip for now -- add credentials later" text link
- "Back" link (left) and "Next" gradient button (right)

**Data shown:** Empty credential fields (unconfigured state)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.4a | "Skip for now" link | Click | Onboarding Step 4 (Screen 7) |
| H1.4b | "Next" button | Click | Onboarding Step 4 (Screen 7) |
| H1.4c | "Back" link | Click | Onboarding Step 2 (Screen 1) |
| H1.4d | "How to get this key?" link (Gmail) | Click | Tooltip or external link (not prototyped -- static) |
| H1.4e | "How to get this key?" link (CRM) | Click | Tooltip or external link (not prototyped -- static) |
| H1.4f | Show/Hide toggle (Gmail) | Click | Toggles input mask (state change) |
| H1.4g | Show/Hide toggle (CRM) | Click | Toggles input mask (state change) |

**Demo path:** Click "Skip for now" (bypasses credential entry for booth demo)

---

### Step 1.5: Onboarding Step 4 -- Name & Launch

**Screen:** Onboarding Step 4 (Screen 7)
**Sidebar:** None (onboarding wizard)
**Header/Breadcrumb:** Step indicator: [1]--[2]--[3]--[4*] (Step 4 active)
**URL:** `/onboarding/step-4`

**What the user sees:**
- Step indicator showing step 4 highlighted
- Heading: "Almost there! Name your new team member."
- Name input: pre-filled "Alex"
- Icon picker: 6 icon/avatar options in a grid row
- First task textarea: pre-filled "Review my recent leads and draft follow-up emails for anyone who hasn't responded in 3+ days"
- Helper text below textarea: "You can edit this -- it's what they'll start working on"
- Large gradient "Hire Alex" button -- full width, Syne 800, `shadow-glow`, prominent. THE money shot.
- "Back" link above or to the left of the button

**Data shown:**
- Name: "Alex" (pre-filled)
- First task: Sales Assistant default task text (pre-filled, editable)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.5a | "Hire Alex" button | Click | Loading animation (star spinning) then Success State (Screen 8) |
| H1.5b | "Back" link | Click | Onboarding Step 3 (Screen 6) |
| H1.5c | Icon picker options | Click | Selects avatar (state change, same screen) |

**Demo path:** Leave defaults, click "Hire Alex"

**Transition animation:** Raava star spins (CSS rotation) during provisioning. Brief loading state (1-3 seconds in real app, instant in prototype).

---

### Step 1.6: Success State

**Screen:** Onboarding Success State (Screen 8)
**Sidebar:** None (onboarding wizard -- final screen)
**Header/Breadcrumb:** None (celebration screen)
**URL:** `/onboarding/success`

**What the user sees:**
- Large Raava star mark (static, representing completed spin)
- Heading (Syne 800): "Alex is on your team!"
- Subheading (Plus Jakarta Sans 400): "They're starting on their first task now."
- Confetti / celebration particles (static decoration in prototype)
- Two buttons:
  - "Go to My Team" -- gradient primary button
  - "Go to Home" -- ghost/secondary button

**Data shown:** Team member name "Alex" in success message

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.6a | "Go to My Team" button | Click | My Team (Screen 2) -- shows Alex as only team member |
| H1.6b | "Go to Home" button | Click | Home Dashboard (Screen 3) -- shows 1 active team member |

**Demo path:** Click "Go to My Team" (shows the card grid immediately)

---

### Step 1.7: Home Dashboard (First-Time State)

**Screen:** Home Dashboard (Screen 3, EXISTING -- first-time variant)
**Sidebar:** Home is active (left border accent, `--raava-hover` bg)
**Header/Breadcrumb:** None (Home is top-level)
**URL:** `/`

**What the user sees:**
- Welcome header: "Good morning, Carlos. Here's your team's status."
- Team Status Strip: [1 Active] [0 Idle] [0 Need Attention]
- Active Work section: 1 row -- Alex / Sales Assistant / "Review my recent leads and draft follow-up emails..." / 2m elapsed
- Spend This Week: "$0.12" (just started), "+0%" trend
- Recent Tasks: 1 task ("Review my recent leads...") with "In Progress" badge
- Activity Feed: "Alex started working on 'Review my recent leads...'" with timestamp

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.7a | Sidebar: Home | Already active | -- |
| H1.7b | Sidebar: Inbox | Click | Inbox (Screen 9) |
| H1.7c | Sidebar: My Team | Click | My Team (Screen 2) |
| H1.7d | Sidebar: Tasks | Click | Tasks List (Screen 15) |
| H1.7e | Sidebar: Projects | Click | Projects List (Screen 18) |
| H1.7f | Sidebar: Routines | Click | Routines List (Screen 20) |
| H1.7g | Sidebar: Billing | Click | Billing Page (Screen 22) |
| H1.7h | Sidebar: Settings | Click | Settings Page (Screen 23) |
| H1.7i | Raava logo (sidebar top) | Click | Home Dashboard (Screen 3) |
| H1.7j | Inbox badge (top bar) | Click | Inbox (Screen 9) |
| H1.7k | "1 Active" status card | Click | My Team (Screen 2) filtered to "Working" |
| H1.7l | "0 Idle" status card | Click | My Team (Screen 2) filtered to "Paused" |
| H1.7m | "0 Need Attention" status card | Click | My Team (Screen 2) filtered to "Needs Attention" |
| H1.7n | Active Work row: Alex | Click (name/avatar) | Team Member Detail -- Overview (Screen 11) |
| H1.7o | Active Work row: task title | Click (task text) | Task Detail (Screen 16) |
| H1.7p | Spend This Week card | Click | Billing Page (Screen 22) |
| H1.7q | Recent Tasks: task row | Click | Task Detail (Screen 16) |

**Demo path:** Click "My Team" in sidebar, or click Alex's name in Active Work

---

### Step 1.8: My Team (First-Time State -- 1 Member)

**Screen:** My Team (Screen 2, EXISTING -- 1-member variant)
**Sidebar:** My Team is active
**Header/Breadcrumb:** "My Team" page title, "+ Hire" button right-aligned
**URL:** `/team`

**What the user sees:**
- Filter tabs: All (1) | Working (1) | Paused (0) | Needs Attention (0)
- 1 team member card:
  - Alex / Sales Assistant / green dot "Working" / "Review my recent leads and draft follow-up emails..." / $0.12/wk
- Empty space where more cards would go (implicit -- not an empty state since 1 member exists)
- "+ Hire" gradient button in top right

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.8a | Alex's card | Click | Team Member Detail -- Overview (Screen 11) |
| H1.8b | "+ Hire" button | Click | Onboarding Step 2 (Screen 1) -- reused for hiring additional members |
| H1.8c | Filter: All | Click | Shows all team members (current view) |
| H1.8d | Filter: Working | Click | Filters to working members only |
| H1.8e | Filter: Paused | Click | Filters to paused (empty in first-time state) |
| H1.8f | Filter: Needs Attention | Click | Filters to error state (empty in first-time state) |
| H1.8g-n | Sidebar items (all 8) | Click | Respective pages (same as H1.7a-h) |

**Demo path:** Click Alex's card

---

### Step 1.9: Team Member Detail -- Overview (Alex)

**Screen:** Team Member Detail -- Overview (Screen 11)
**Sidebar:** My Team is active (this is a sub-page of My Team)
**Header/Breadcrumb:** "My Team > Alex"
**URL:** `/team/alex`

**What the user sees:**
- Profile header: Alex avatar (80px), "Alex" (Syne 800 24px), "Sales Assistant" role badge, green status dot "Working", "Hired March 28, 2026" caption
- Tab bar: Overview* | Tasks | Work History | Personality | Settings
- Current task card: "Review my recent leads and draft follow-up emails for anyone who hasn't responded in 3+ days" / 2m elapsed / green pulsing status dot
- Performance stats 2x2 grid:
  - Tasks Completed: 24
  - Success Rate: 92%
  - Avg Task Time: 18m
  - This Week: $34.20
- Skills/tools: horizontal badge row -- Email, CRM, Docs, Calendar

**Data shown (populated state with sample data):** Stats reflect a mature team member for demo purposes, even if this is a "first hire" journey. The prototype uses pre-populated data to showcase the full experience.

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.9a | Breadcrumb: "My Team" | Click | My Team (Screen 2) |
| H1.9b | Tab: Overview | Already active | -- |
| H1.9c | Tab: Tasks | Click | Team Member Detail -- Tasks (Screen 12) |
| H1.9d | Tab: Work History | Click | Team Member Detail -- Work History (Screen 13) |
| H1.9e | Tab: Personality | Click | Team Member Detail -- Personality (Screen 14) |
| H1.9f | Tab: Settings | Click | (Not wired in prototype -- shows tab exists for credibility) |
| H1.9g | Current task card | Click | Task Detail (Screen 16) for this task |
| H1.9h-o | Sidebar items (all 8) | Click | Respective pages |

**Demo path:** Explore tabs (Tasks, Work History, Personality), then navigate back to Home via sidebar

---

### Step 1.10: Team Member Detail -- Tasks Tab (Alex)

**Screen:** Team Member Detail -- Tasks Tab (Screen 12)
**Sidebar:** My Team is active
**Header/Breadcrumb:** "My Team > Alex"
**URL:** `/team/alex/tasks`

**What the user sees:**
- Same profile header as Overview
- Tab bar: Overview | Tasks* | Work History | Personality | Settings
- Filtered task list showing tasks assigned to Alex:
  1. "Review my recent leads and draft follow-up emails..." -- In Progress (blue badge)
  2. "Draft proposal for Acme Corp partnership" -- Done (green badge)
  3. "Update CRM with Q1 lead status" -- Done (green badge)
  4. "Follow up on 3 leads from yesterday" -- Done (green badge)
  5. "Send weekly pipeline summary to Carlos" -- To Do (gray badge)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.10a | Tab: Overview | Click | Team Member Detail -- Overview (Screen 11) |
| H1.10b | Tab: Tasks | Already active | -- |
| H1.10c | Tab: Work History | Click | Team Member Detail -- Work History (Screen 13) |
| H1.10d | Tab: Personality | Click | Team Member Detail -- Personality (Screen 14) |
| H1.10e | Any task row | Click | Task Detail (Screen 16) for that task |
| H1.10f | Breadcrumb: "My Team" | Click | My Team (Screen 2) |
| H1.10g-n | Sidebar items (all 8) | Click | Respective pages |

---

### Step 1.11: Team Member Detail -- Work History Tab (Alex)

**Screen:** Team Member Detail -- Work History (Screen 13)
**Sidebar:** My Team is active
**Header/Breadcrumb:** "My Team > Alex"
**URL:** `/team/alex/history`

**What the user sees:**
- Same profile header
- Tab bar: Overview | Tasks | Work History* | Personality | Settings
- Chronological work session list:
  1. "Follow up on 3 leads from yesterday" / 45 min / Completed (green badge) / $2.40 / [expand arrow]
  2. "Update CRM with Q1 lead status" / 22 min / Completed (green badge) / $1.10 / [expand arrow]
  3. "Draft proposal for Acme Corp" / 1h 12min / Completed (green badge) / $4.80 / [expand arrow]
  4. "Review ticket escalations" / 8 min / Escalated (yellow badge) / $0.40 / [expand arrow]
- Each row has an expand arrow for transcript preview (expandable in prototype or static)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.11a | Tab: Overview | Click | Team Member Detail -- Overview (Screen 11) |
| H1.11b | Tab: Tasks | Click | Team Member Detail -- Tasks (Screen 12) |
| H1.11c | Tab: Work History | Already active | -- |
| H1.11d | Tab: Personality | Click | Team Member Detail -- Personality (Screen 14) |
| H1.11e | Expand arrow on any row | Click | Expands transcript preview (state change, same screen) |
| H1.11f | Task name in any row | Click | Task Detail (Screen 16) for that task |
| H1.11g | Breadcrumb: "My Team" | Click | My Team (Screen 2) |
| H1.11h-o | Sidebar items (all 8) | Click | Respective pages |

---

### Step 1.12: Team Member Detail -- Personality Tab (Alex)

**Screen:** Team Member Detail -- Personality (Screen 14)
**Sidebar:** My Team is active
**Header/Breadcrumb:** "My Team > Alex"
**URL:** `/team/alex/personality`

**What the user sees:**
- Same profile header
- Tab bar: Overview | Tasks | Work History | Personality* | Settings
- Help text: "This guides how your team member thinks, communicates, and approaches tasks."
- Rich text editor (MarkdownEditor) pre-filled with Alex's personality:
  > "You are a professional, proactive sales assistant. You communicate clearly and warmly. You follow up persistently but not aggressively. You always update the CRM after every interaction. You flag hot leads for immediate human attention. You draft in a professional but conversational tone."
- Editor is editable (in real app), shown as styled text in prototype

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.12a | Tab: Overview | Click | Team Member Detail -- Overview (Screen 11) |
| H1.12b | Tab: Tasks | Click | Team Member Detail -- Tasks (Screen 12) |
| H1.12c | Tab: Work History | Click | Team Member Detail -- Work History (Screen 13) |
| H1.12d | Tab: Personality | Already active | -- |
| H1.12e | Breadcrumb: "My Team" | Click | My Team (Screen 2) |
| H1.12f-m | Sidebar items (all 8) | Click | Respective pages |

---

### Step 1.13: Back to Home -- Task Completed

**Screen:** Home Dashboard (Screen 3) -- updated state
**Sidebar:** Home is active
**URL:** `/`

**What the user sees (changed from Step 1.7):**
- Activity Feed now shows: "Alex finished working on 'Review my recent leads and draft follow-up emails'" at top
- Recent Tasks: first task now shows "Done" badge (green)
- Active Work: Alex row now shows idle or a new task

**Hotspots:** Same as Step 1.7 (H1.7a through H1.7q)

---

### Step 1.14: Assign a Task via New Task Dialog

**Screen:** New Task Dialog (Screen 17) -- modal overlay on Tasks List (Screen 15) or Home
**Sidebar:** Tasks is active (if navigated from sidebar)
**Header/Breadcrumb:** Modal overlay -- underlying page breadcrumb visible but dimmed
**URL:** `/tasks` (with modal open)

**Path to get here:** Sidebar: Tasks -> Tasks List -> Click "New Task" button

**What the user sees:**
- Modal overlay (radius-xl, shadow-lg) with dimmed background
- Title: "New Task" with X close button
- Fields:
  - Title (text input): empty
  - Description (rich text area, 4 lines): empty
  - Assign to (dropdown with team member avatars + names + roles): shows Alex as only option in first-time state
  - Project (dropdown): empty / "No project"
  - Priority (Low / Medium / High): Medium selected by default
- Footer: "Cancel" ghost button, "Create Task" gradient button

**Data to fill (demo):**
- Title: "Send follow-up emails to warm leads"
- Assign to: Alex (Sales Assistant)
- Priority: High

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.14a | "Create Task" button | Click | Task Detail (Screen 16) for newly created task |
| H1.14b | "Cancel" button | Click | Closes modal, returns to Tasks List (Screen 15) |
| H1.14c | X close button | Click | Closes modal, returns to Tasks List (Screen 15) |
| H1.14d | Dimmed background | Click | Closes modal, returns to Tasks List (Screen 15) |

---

### Step 1.15: Tasks List

**Screen:** Tasks List (Screen 15)
**Sidebar:** Tasks is active
**Header/Breadcrumb:** "Tasks" page title, "New Task" gradient button right-aligned
**URL:** `/tasks`

**What the user sees (first-time state, after creating 1 task):**
- Filter bar: Status dropdown (All), Team Member dropdown (All), Project dropdown (All), Search input
- Task list with 2 rows (1 original + 1 just created):
  1. "Review my recent leads and draft follow-up emails..." -- Alex -- Done -- green badge
  2. "Send follow-up emails to warm leads" -- Alex -- In Progress -- blue badge

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.15a | "New Task" button | Click | New Task Dialog (Screen 17) opens as modal overlay |
| H1.15b | Any task row | Click | Task Detail (Screen 16) for that task |
| H1.15c | Status filter dropdown | Click | Filters list (state change) |
| H1.15d | Team Member filter dropdown | Click | Filters list (state change) |
| H1.15e | Project filter dropdown | Click | Filters list (state change) |
| H1.15f-m | Sidebar items (all 8) | Click | Respective pages |

---

### Step 1.16: Task Detail

**Screen:** Task Detail (Screen 16)
**Sidebar:** Tasks is active
**Header/Breadcrumb:** "Tasks > Send follow-up emails to warm leads"
**URL:** `/tasks/[id]`

**What the user sees:**
- Task header: "Send follow-up emails to warm leads" (Syne 800 24px), "In Progress" blue badge, Assigned: Alex avatar + "Alex" (clickable), Project: None, Created: Today
- Description body: (Markdown rendered) -- whatever was entered in the dialog
- Activity stream: "Task created by Carlos Mendez" with timestamp, "Alex started working on this task" with timestamp
- Work sessions section: 1 entry if in progress (showing current elapsed time)
- Action bar: "Reassign" button, Status dropdown, "Add Comment" text input

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.16a | Breadcrumb: "Tasks" | Click | Tasks List (Screen 15) |
| H1.16b | Assigned team member "Alex" | Click | Team Member Detail -- Overview (Screen 11) |
| H1.16c | "Reassign" button | Click | Dropdown to select different team member (state change) |
| H1.16d | Status dropdown | Click | Status options (state change) |
| H1.16e | Back arrow (top left) | Click | Tasks List (Screen 15) |
| H1.16f-m | Sidebar items (all 8) | Click | Respective pages |

---

### Step 1.17: Routines (Empty State)

**Screen:** Routines List (Screen 20)
**Sidebar:** Routines is active
**Header/Breadcrumb:** "Routines" page title, "New Routine" gradient button right-aligned
**URL:** `/routines`

**What the user sees (first-time, empty):**
- Empty state: centered illustration, "No routines yet" heading, "Set up recurring tasks for your team members. Like a standing meeting, but productive." description, "New Routine" gradient button

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.17a | "New Routine" button (either top-right or empty state CTA) | Click | New Routine form (not a separate screen in prototype -- could be modal or same page state change) |
| H1.17b-i | Sidebar items (all 8) | Click | Respective pages |

---

### Step 1.18: Billing (First Day)

**Screen:** Billing Page (Screen 22)
**Sidebar:** Billing is active
**Header/Breadcrumb:** "Billing" page title
**URL:** `/billing`

**What the user sees (first-time, minimal data):**
- Spend Overview: 3 MetricCards
  - "This Month: $0.12" (just started)
  - "vs. Last Month: --" (no prior month)
  - "Projected: $0.50"
- "By Team Member" section: single bar -- Alex $0.12
- "By Role" section: Sales Assistants: $0.12
- "Spending Limits" section: Alex -- no limit set, "Set Limit" button
- Transaction log: 1-2 entries (first task billing events)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.18a | Team member name "Alex" in breakdown | Click | Team Member Detail -- Overview (Screen 11) |
| H1.18b | "Set Limit" button | Click | Opens limit input (state change, same screen) |
| H1.18c-j | Sidebar items (all 8) | Click | Respective pages |

---

### Step 1.19: Settings

**Screen:** Settings Page (Screen 23)
**Sidebar:** Settings is active
**Header/Breadcrumb:** "Settings" page title
**URL:** `/settings`

**What the user sees:**
- Company Profile section: Company name "Mendez Logistics", logo upload area (empty), description textarea
- Team Defaults section: Default spending limit (empty), Default approval toggle (off)
- Integrations section: grid of integration cards -- Gmail (gray/not configured), HubSpot (gray/not configured), Zendesk (gray), Google Sheets (gray), Slack (gray). Each with "Configure" button
- Advanced section: collapsed, "For advanced users" label, expand arrow

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.19a | Integration "Configure" buttons | Click | Opens configuration form (state change, same screen) |
| H1.19b | "Advanced" expand arrow | Click | Expands advanced section (state change) |
| H1.19c-j | Sidebar items (all 8) | Click | Respective pages |

---

### Step 1.20: Inbox (Empty / First Notification)

**Screen:** Inbox -- Review Requests (Screen 9)
**Sidebar:** Inbox is active
**Header/Breadcrumb:** "Inbox" page title
**URL:** `/inbox`

**What the user sees (first-time):**
- Tab bar: Review Requests* (0) | Notifications (1) | Escalations (0)
- Review Requests tab: Empty state -- "All caught up. Your team is handling things." with calm illustration
- (Or, if Alex has completed work requiring review: 1 review request card)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H1.20a | Tab: Review Requests | Already active | -- |
| H1.20b | Tab: Notifications | Click | Inbox -- Notifications (Screen 10) |
| H1.20c | Tab: Escalations | Click | Escalations section (could be tab state change or section of Review Requests) |
| H1.20d | Review request card (if present): Approve button | Click | Approves action (state change) |
| H1.20e | Review request card (if present): Reject button | Click | Rejects action (state change) |
| H1.20f-m | Sidebar items (all 8) | Click | Respective pages |

---

### Journey 1 Summary: Complete Click Path

```
Login (4) --> [Get Started] --> Onboarding Step 1 (5) --> [Next] --> Onboarding Step 2 (1)
    --> [Select Sales Assistant, Next] --> Onboarding Step 3 (6) --> [Skip for now]
    --> Onboarding Step 4 (7) --> [Hire Alex] --> Success State (8)
    --> [Go to My Team] --> My Team (2) --> [Click Alex] --> Team Member Detail (11)
    --> [Tasks tab] --> TM Tasks (12) --> [Work History tab] --> TM Work History (13)
    --> [Personality tab] --> TM Personality (14)
    --> [Sidebar: Home] --> Home Dashboard (3) --> [Sidebar: Tasks] --> Tasks List (15)
    --> [New Task] --> New Task Dialog (17) --> [Create Task] --> Task Detail (16)
    --> [Sidebar: Routines] --> Routines List (20) --> [Sidebar: Billing] --> Billing (22)
    --> [Sidebar: Settings] --> Settings (23) --> [Sidebar: Inbox] --> Inbox (9)
```

**Total screens visited:** 18
**Total transitions:** 20
**Total unique hotspots:** ~130 (sidebar x14 screens + page-specific)

---

## JOURNEY 2: RETURNING USER (Daily Check-In)

**Description:** A returning user logs in to check on their team, handle an error, review completed work, and check spending. This represents the daily workflow of Carlos Mendez managing his AI team.

**Duration:** ~5 minutes
**Starting state:** Logged in, 5 team members, active tasks, some errors
**Ending state:** Error resolved, task approved, spending checked

---

### Step 2.1: Home Dashboard (Populated)

**Screen:** Home Dashboard (Screen 3, EXISTING -- populated variant)
**Sidebar:** Home is active
**URL:** `/`

**What the user sees:**
- Welcome header: "Good afternoon, Carlos. Here's your team's status."
- Team Status Strip: [3 Active] [1 Idle] [1 Needs Attention]
  - 3 Active card: green background tint
  - 1 Idle card: gray background tint
  - 1 Needs Attention card: red background tint, pulsing indicator
- Active Work section (3 rows):
  1. Alex / Sales Assistant / "Following up on 3 leads from yesterday" / 12m elapsed
  2. Taylor / Customer Support / "Drafting ticket responses" / 8m elapsed
  3. Riley / Marketing Coordinator / "Drafting social posts for product launch" / 22m elapsed
- Spend This Week: "$127.40" / "+12% vs last week" trend arrow up
- Recent Tasks (5 rows):
  1. "Follow up on 3 leads from yesterday" -- Alex -- In Progress
  2. "Draft Q2 sales report" -- Alex -- Done
  3. "Pull KPI metrics" -- Sam -- Stuck (red)
  4. "Organize support ticket backlog" -- Taylor -- Done
  5. "Schedule social posts for April" -- Riley -- In Progress
- Activity Feed:
  - "Alex started working on 'Following up on 3 leads from yesterday'" -- 12m ago
  - "Taylor finished working on 'Organize support ticket backlog'" -- 1h ago
  - "Sam encountered an error on 'Pull KPI metrics'" -- 2h ago
  - "Jordan created task 'Q2 vendor audit'" -- 3h ago

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H2.1a | "1 Needs Attention" status card | Click | My Team (Screen 2) filtered to "Needs Attention" |
| H2.1b | "3 Active" status card | Click | My Team (Screen 2) filtered to "Working" |
| H2.1c | "1 Idle" status card | Click | My Team (Screen 2) filtered to "Paused" |
| H2.1d | Active Work: Alex row (name) | Click | Team Member Detail -- Overview (Screen 11) for Alex |
| H2.1e | Active Work: Alex row (task) | Click | Task Detail (Screen 16) -- "Following up on 3 leads" |
| H2.1f | Active Work: Taylor row (name) | Click | Team Member Detail -- Overview (Screen 11) for Taylor |
| H2.1g | Active Work: Riley row (name) | Click | Team Member Detail -- Overview (Screen 11) for Riley |
| H2.1h | Recent Tasks: "Pull KPI metrics" (Stuck) | Click | Task Detail (Screen 16) -- stuck task |
| H2.1i | Spend This Week card | Click | Billing Page (Screen 22) |
| H2.1j | Activity Feed: error entry for Sam | Click | Team Member Detail -- Overview (Screen 11) for Sam |
| H2.1k-r | Sidebar items (all 8) | Click | Respective pages |

**Demo path:** Click "1 Needs Attention" to see the error

---

### Step 2.2: My Team -- Filtered to Needs Attention

**Screen:** My Team (Screen 2) -- filtered state
**Sidebar:** My Team is active
**URL:** `/team?filter=needs-attention`

**What the user sees:**
- Filter tabs: All (5) | Working (3) | Idle (1) | Needs Attention* (1)
- "Needs Attention" tab is active (underlined, `--raava-blue`)
- 1 card visible:
  - Sam / Data Analyst / red dot "Needs Attention" / "Error: DB connection failed" / $12.00/wk
  - Card has red-tinted border (`--raava-error` at 20%)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H2.2a | Sam's card | Click | Error State -- Team Member (Screen 26) |
| H2.2b | Filter: All | Click | Shows all 5 team members |
| H2.2c | Filter: Working | Click | Shows 3 working members (Alex, Taylor, Riley) |
| H2.2d | Filter: Idle | Click | Shows 1 idle member (Jordan) |
| H2.2e | Filter: Needs Attention | Already active | -- |
| H2.2f | "+ Hire" button | Click | Onboarding Step 2 (Screen 1) |
| H2.2g-n | Sidebar items (all 8) | Click | Respective pages |

**Demo path:** Click Sam's card

---

### Step 2.3: Team Member Detail -- Error State (Sam)

**Screen:** Error State -- Team Member Needs Attention (Screen 26)
**Sidebar:** My Team is active
**Header/Breadcrumb:** "My Team > Sam"
**URL:** `/team/sam`

**What the user sees:**
- Profile header: Sam avatar, "Sam" (Syne 800 24px), "Data Analyst" role badge, RED status dot "Needs Attention", "Hired March 28, 2026"
- Error banner at top of content area: red-tinted card with warning icon
  - Heading: "Sam needs your attention"
  - Description: "Database connection failed at 2:34 PM. The Data Analyst role requires a valid database connection string."
  - Buttons: "Retry" gradient button + "View Error Log" text link
- Tab bar: Overview* | Tasks | Work History | Personality | Settings
- Performance stats: grayed out or showing "--" values (inactive due to error)
- Skills/tools: SQL, Spreadsheets, Visualization (with warning icon on SQL indicating broken connection)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H2.3a | "Retry" button | Click | Triggers retry (state change -- shows loading, then resolves to Overview with green status) |
| H2.3b | "View Error Log" link | Click | Expands error details / transcript (state change) |
| H2.3c | Tab: Tasks | Click | Team Member Detail -- Tasks (Screen 12) for Sam |
| H2.3d | Tab: Work History | Click | Team Member Detail -- Work History (Screen 13) for Sam |
| H2.3e | Tab: Personality | Click | Team Member Detail -- Personality (Screen 14) for Sam |
| H2.3f | Tab: Settings | Click | Settings tab (where credentials can be reconfigured) |
| H2.3g | Breadcrumb: "My Team" | Click | My Team (Screen 2) |
| H2.3h-o | Sidebar items (all 8) | Click | Respective pages |

**Demo path:** Click "Retry" (resolves error), then navigate back to My Team

---

### Step 2.4: My Team -- All Members

**Screen:** My Team (Screen 2) -- All filter
**Sidebar:** My Team is active
**URL:** `/team`

**What the user sees:**
- Filter tabs: All* (5) | Working (3) | Idle (1) | Needs Attention (0) -- Sam is now resolved
- 5 team member cards in grid (2 rows):
  - Row 1: Alex (Working, green) | Jordan (Idle, gray) | Sam (Working, green -- resolved)
  - Row 2: Taylor (Working, green) | Riley (Working, green) | [empty slot or "+ Hire" card]

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H2.4a | Alex's card | Click | Team Member Detail -- Overview (Screen 11) for Alex |
| H2.4b | Jordan's card | Click | Team Member Detail -- Overview (Screen 11) for Jordan |
| H2.4c | Sam's card | Click | Team Member Detail -- Overview (Screen 11) for Sam (now healthy) |
| H2.4d | Taylor's card | Click | Team Member Detail -- Overview (Screen 11) for Taylor |
| H2.4e | Riley's card | Click | Team Member Detail -- Overview (Screen 11) for Riley |
| H2.4f | "+ Hire" button | Click | Onboarding Step 2 (Screen 1) |
| H2.4g-n | Sidebar items (all 8) | Click | Respective pages |

**Demo path:** Click Taylor's card to see a working team member

---

### Step 2.5: Team Member Detail -- Overview (Taylor, Working)

**Screen:** Team Member Detail -- Overview (Screen 11) -- Taylor variant
**Sidebar:** My Team is active
**Header/Breadcrumb:** "My Team > Taylor"
**URL:** `/team/taylor`

**What the user sees:**
- Profile header: Taylor avatar, "Taylor", "Customer Support" role badge, green dot "Working", "Hired March 28, 2026"
- Current task card: "Drafting ticket responses" / 8m elapsed / green pulsing dot
- Performance stats: Tasks Completed: 31, Success Rate: 96%, Avg Task Time: 12m, This Week: $22.50
- Skills/tools: Help Desk, Email, Knowledge Base

**Hotspots:** Same pattern as Step 1.9 (tab navigation, breadcrumb, sidebar, current task card click)

**Demo path:** Navigate to Tasks via sidebar

---

### Step 2.6: Tasks List -- Filter "Needs Review"

**Screen:** Tasks List (Screen 15) -- filtered
**Sidebar:** Tasks is active
**URL:** `/tasks?status=needs-review`

**What the user sees:**
- Filter bar: Status dropdown = "Needs Review", Team Member = All, Project = All
- Filtered task list:
  1. "Draft ticket responses for VIP clients" -- Taylor -- Needs Review (purple badge) -- "Taylor completed this and needs your review before sending"
  2. "Weekly pipeline summary for Carlos" -- Alex -- Needs Review (purple badge)
- "New Task" button in header

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H2.6a | Task row: "Draft ticket responses" | Click | Task Detail (Screen 16) |
| H2.6b | Task row: "Weekly pipeline summary" | Click | Task Detail (Screen 16) |
| H2.6c | "New Task" button | Click | New Task Dialog (Screen 17) |
| H2.6d | Status filter dropdown | Click | Changes filter (state change) |
| H2.6e-l | Sidebar items (all 8) | Click | Respective pages |

**Demo path:** Click "Draft ticket responses" to review

---

### Step 2.7: Task Detail -- Review & Approve

**Screen:** Task Detail (Screen 16) -- needs review state
**Sidebar:** Tasks is active
**Header/Breadcrumb:** "Tasks > Draft ticket responses for VIP clients"
**URL:** `/tasks/[id]`

**What the user sees:**
- Task header: "Draft ticket responses for VIP clients" / "Needs Review" purple badge / Assigned: Taylor / Project: Client Portal Redesign
- Description: "Review open VIP tickets and draft personalized responses maintaining our premium service tone."
- Activity stream:
  - "Taylor finished working on this task" -- 30m ago
  - "Taylor: I've drafted responses for 5 VIP tickets. Please review before I send." -- 30m ago
  - "Task created by Carlos Mendez" -- 2h ago
- Work sessions: 1 completed session -- 22 min, Completed, $1.80
- Review action bar: **"Approve & Send"** green button, **"Request Changes"** yellow button, **"Reject"** red outline button, comment input

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H2.7a | "Approve & Send" button | Click | Task status changes to "Done" (state change, badge turns green) |
| H2.7b | "Request Changes" button | Click | Opens comment field (state change) |
| H2.7c | "Reject" button | Click | Task status changes to "Rejected" (state change) |
| H2.7d | Assigned: "Taylor" | Click | Team Member Detail -- Overview (Screen 11) for Taylor |
| H2.7e | Breadcrumb: "Tasks" | Click | Tasks List (Screen 15) |
| H2.7f-m | Sidebar items (all 8) | Click | Respective pages |

**Demo path:** Click "Approve & Send"

---

### Step 2.8: Inbox -- See Approval Cleared

**Screen:** Inbox -- Notifications (Screen 10)
**Sidebar:** Inbox is active
**URL:** `/inbox`

**What the user sees:**
- Tab bar: Review Requests (1) | Notifications* (5) | Escalations (0)
- Notification list:
  1. [checkmark icon] "You approved Taylor's draft ticket responses" -- just now (read)
  2. [checkmark icon] "Alex finished working on 'Following up on 3 leads'" -- 12m ago
  3. [warning icon, resolved] "Sam's database connection issue has been resolved" -- 15m ago
  4. [checkmark icon] "Taylor finished working on 'Organize support ticket backlog'" -- 1h ago
  5. [arrow icon] "Jordan's status changed to Idle" -- 2h ago
- Archive swipe indicator on right edge of each row

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H2.8a | Tab: Review Requests | Click | Inbox -- Review Requests (Screen 9) |
| H2.8b | Tab: Notifications | Already active | -- |
| H2.8c | Any notification row | Click | Navigates to relevant detail (Task Detail or Team Member Detail) |
| H2.8d | Swipe/archive action | Click | Archives notification (state change) |
| H2.8e-l | Sidebar items (all 8) | Click | Respective pages |

**Demo path:** Navigate to Billing via sidebar

---

### Step 2.9: Billing -- Check Weekly Spend

**Screen:** Billing Page (Screen 22)
**Sidebar:** Billing is active
**URL:** `/billing`

**What the user sees (populated state):**
- Spend Overview: 3 MetricCards
  - "This Month: $487.20" (Syne 800, large)
  - "vs. Last Month: $412.50 (+18%)" with red up arrow
  - "Projected: $520.00"
- "By Team Member" horizontal bar chart:
  - Alex: $142.00 (longest bar)
  - Jordan: $98.00
  - Taylor: $89.00
  - Riley: $72.00
  - Casey: $52.00
  - Sam: $34.00
- "By Role" aggregate table:
  - Sales Assistants: $142
  - Operations Managers: $98
  - Customer Support: $89
  - Marketing Coordinators: $72
  - General Assistants: $52
  - Data Analysts: $34
- "Spending Limits" section: per-member limit cards with current spend bar, limit input, save button
  - Alex: $142 / $300 limit (bar at 47%)
  - Jordan: $98 / $200 limit (bar at 49%)
  - Others: no limit set ("Set Limit" button)
- Transaction log: 5 recent entries in timeline format

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H2.9a | Team member name in bar chart (any) | Click | Team Member Detail -- Overview (Screen 11) for that member |
| H2.9b | "Set Limit" button (any member) | Click | Opens limit input for that member (state change) |
| H2.9c | Limit "Save" button | Click | Saves limit, shows confirmation (state change) |
| H2.9d-k | Sidebar items (all 8) | Click | Respective pages |

---

### Journey 2 Summary: Complete Click Path

```
Home Dashboard (3) --> [Click "Needs Attention"] --> My Team filtered (2)
    --> [Click Sam] --> Error State (26) --> [Retry] --> TM Detail resolved (11)
    --> [Breadcrumb: My Team] --> My Team All (2) --> [Click Taylor] --> TM Detail (11)
    --> [Sidebar: Tasks] --> Tasks List (15) --> [Filter: Needs Review] --> filtered list
    --> [Click task] --> Task Detail (16) --> [Approve & Send]
    --> [Sidebar: Inbox] --> Inbox Notifications (10)
    --> [Sidebar: Billing] --> Billing (22) --> [Set Limit, Save]
```

**Total screens visited:** 9
**Total transitions:** 11

---

## JOURNEY 3: HIRING A SECOND TEAM MEMBER

**Description:** User hires an additional team member from the My Team page. The onboarding wizard is reused but skips Step 1 (company already exists).

**Starting state:** My Team with 1+ existing members
**Ending state:** My Team with 1 additional member

---

### Step 3.1: My Team -- Click Hire

**Screen:** My Team (Screen 2)
**Sidebar:** My Team is active
**URL:** `/team`

**What the user sees:** Current team members in card grid. "+ Hire" gradient button in top right.

**Hotspot:**
| # | Element | Action | Destination |
|---|---|---|---|
| H3.1a | "+ Hire" button | Click | Onboarding Step 2 (Screen 1) -- wizard launches at Step 2, skipping Step 1 |

---

### Step 3.2: Onboarding Step 2 -- Role Cards (Returning)

**Screen:** Onboarding Step 2 (Screen 1, EXISTING)
**Sidebar:** None (wizard overlay)
**Header/Breadcrumb:** Step indicator: [2*]--[3]--[4] (Step 1 removed, starts at 2)

**What the user sees:**
- Same 2x3 role card grid
- **Difference from first-time:** Roles already hired could show a subtle indicator (e.g., "1 hired" badge on Sales Assistant card, or a faded checkmark). Not blocked -- user can hire multiple of the same role.
- Role cards available: all 6

**Data shown:** Same role cards. If Alex (Sales Assistant) exists, the Sales Assistant card shows a subtle "1 on team" indicator.

**Hotspots:** Same as Journey 1 Step 1.3 (H1.3a-h), except "Back" link navigates to My Team (Screen 2) instead of Step 1.

**Demo path:** Select "Data Analyst" card, click "Next"

---

### Step 3.3: Onboarding Step 3 -- Credentials for Data Analyst

**Screen:** Onboarding Step 3 (Screen 6)
**Sidebar:** None (wizard)
**Header/Breadcrumb:** Step indicator: [2]--[3*]--[4]

**What the user sees:**
- Heading: "Set up Data Analyst's tools"
- Credential cards (different from Sales Assistant):
  1. Database Connection String -- masked input, Show/Hide, validation, "How to get this?" help link
  2. Google Sheets API Key -- masked input, Show/Hide, validation, help link
- Same security messaging, same "Skip for now" option

**Hotspots:** Same pattern as Journey 1 Step 1.4

**Demo path:** Click "Skip for now" or enter credentials and click "Next"

---

### Step 3.4: Onboarding Step 4 -- Name & Launch (Data Analyst)

**Screen:** Onboarding Step 4 (Screen 7)
**Sidebar:** None (wizard)
**Header/Breadcrumb:** Step indicator: [2]--[3]--[4*]

**What the user sees:**
- Name input pre-filled: "Sam" (Data Analyst default)
- Icon picker
- First task pre-filled: "Pull this week's key metrics and create a summary report"
- Large gradient "Hire Sam" button

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H3.4a | "Hire Sam" button | Click | Loading animation, then Success State (Screen 8) |
| H3.4b | "Back" link | Click | Onboarding Step 3 (Screen 6) |

---

### Step 3.5: Success State (Sam)

**Screen:** Onboarding Success State (Screen 8)
**Sidebar:** None

**What the user sees:**
- "Sam is on your team!" heading
- "They're starting on their first task now." subtitle
- Confetti decoration
- "Go to My Team" gradient button
- "Go to Home" ghost button

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H3.5a | "Go to My Team" button | Click | My Team (Screen 2) -- now shows additional member |
| H3.5b | "Go to Home" button | Click | Home Dashboard (Screen 3) |

---

### Step 3.6: My Team -- Updated with New Member

**Screen:** My Team (Screen 2)
**Sidebar:** My Team is active

**What the user sees:** Card grid now includes Sam (Data Analyst) with green "Working" status and first task in progress.

---

### Journey 3 Summary: Complete Click Path

```
My Team (2) --> [+ Hire] --> Onboarding Step 2 (1) --> [Select Data Analyst, Next]
    --> Onboarding Step 3 (6) --> [Skip / Next] --> Onboarding Step 4 (7)
    --> [Hire Sam] --> Success State (8) --> [Go to My Team] --> My Team (2)
```

**Total screens visited:** 6
**Total transitions:** 6

---

## JOURNEY 4: MANAGING TOOLS & INTEGRATIONS

**Description:** User adds a new tool to an existing team member, configures credentials, tests the connection, and manages existing tools.

**Starting state:** Team member exists with some tools configured
**Ending state:** New tool added and active

---

### Step 4.1: My Team -- Select Team Member

**Screen:** My Team (Screen 2)
**Sidebar:** My Team is active

**Hotspot:** Click Alex's card --> Team Member Detail -- Overview (Screen 11)

---

### Step 4.2: Team Member Detail -- Overview (Alex)

**Screen:** Team Member Detail -- Overview (Screen 11)
**Sidebar:** My Team is active
**Header/Breadcrumb:** "My Team > Alex"

**What the user sees:**
- Skills/tools section at bottom: Email (green dot), CRM (green dot), Docs (green dot), Calendar (gray dot -- not configured)
- "Add Tool" or "+" button at end of tools row

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H4.2a | "Add Tool" / "+" button | Click | Tool browser (modal or inline expansion -- state change) |
| H4.2b | Existing tool badge (e.g., "Email") | Click | Tool detail popover (shows status, credentials status, "Update" / "Remove" options) |
| H4.2c | Tab: Settings | Click | Settings tab where credentials are managed |

---

### Step 4.3: Tool Browser / Configuration

**Screen:** Team Member Detail -- Overview (Screen 11) with tool modal/popover
**Sidebar:** My Team is active

**What the user sees (in modal/popover):**
- Available tools grid: Calendar, Spreadsheets, Research, Social Media (tools not yet configured for this team member)
- Each tool shows: icon, name, description, "Add" button
- Selected tool shows credential configuration form (same pattern as onboarding Step 3)

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H4.3a | Tool card "Calendar" | Click | Shows configuration form for Calendar tool |
| H4.3b | Credential input + "Test Connection" button | Click | Validates credential (shows green check or red X) |
| H4.3c | "Activate" / "Save" button | Click | Adds tool, closes modal, returns to Overview with new tool in list |
| H4.3d | "Cancel" / X | Click | Closes modal, returns to Overview |

---

### Step 4.4: Updated Overview with New Tool

**Screen:** Team Member Detail -- Overview (Screen 11)

**What the user sees:** Tools section now shows: Email, CRM, Docs, Calendar (all green dots)

---

### Step 4.5: Managing Existing Tool

**Screen:** Team Member Detail -- Overview (Screen 11) -- tool popover

**What the user sees (clicking existing tool badge):**
- Tool name and status (Connected / green)
- Last used: "2 hours ago"
- Actions: "Update Credentials" button, "Disable" toggle, "Remove" red text link

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H4.5a | "Update Credentials" | Click | Shows credential form pre-filled (same as Step 4.3) |
| H4.5b | "Disable" toggle | Click | Disables tool (gray dot, state change) |
| H4.5c | "Remove" link | Click | Confirmation dialog, then removes tool from list |

---

### Journey 4 Summary: Complete Click Path

```
My Team (2) --> [Click Alex] --> TM Detail Overview (11) --> [Add Tool +]
    --> Tool Browser (modal) --> [Select Calendar] --> Configure credentials
    --> [Test Connection] --> [Activate] --> TM Detail Overview (11) updated
```

OR for managing:

```
TM Detail Overview (11) --> [Click "Email" badge] --> Tool popover
    --> [Update Credentials / Disable / Remove]
```

**Total screens visited:** 2 (My Team + Team Member Detail with modal states)
**Total transitions:** 5-6

---

## JOURNEY 5: ROUTINES (Recurring Work)

**Description:** User creates a recurring routine, assigns it to a team member, and monitors its execution history.

**Starting state:** Routines page (empty or populated)
**Ending state:** Routine created, visible in list, can be paused/resumed

---

### Step 5.1: Routines List

**Screen:** Routines List (Screen 20)
**Sidebar:** Routines is active
**Header/Breadcrumb:** "Routines" page title, "New Routine" gradient button right-aligned
**URL:** `/routines`

**What the user sees (populated state):**
- Routine cards:
  1. "Daily Lead Follow-Up" / "Every weekday at 9:00 AM" / Alex (avatar) / Active (green badge) / "Last ran: yesterday, success"
  2. "Weekly KPI Report" / "Every Monday at 8:00 AM" / Sam (avatar) / Active (green badge) / "Last ran: 3 days ago, success"
  3. "Nightly Ticket Summary" / "Every day at 6:00 PM" / Taylor (avatar) / Paused (yellow badge) / "Paused by user"

**What the user sees (empty state):**
- Empty illustration, "No routines yet" heading, "Set up recurring tasks for your team members." description, "New Routine" button

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H5.1a | "New Routine" button | Click | New Routine form (modal overlay or separate state) |
| H5.1b | Routine card "Daily Lead Follow-Up" | Click | Routine Detail (Screen 21) |
| H5.1c | Routine card "Weekly KPI Report" | Click | Routine Detail (Screen 21) for that routine |
| H5.1d | Routine card "Nightly Ticket Summary" | Click | Routine Detail (Screen 21) for that routine |
| H5.1e-l | Sidebar items (all 8) | Click | Respective pages |

---

### Step 5.2: New Routine Form

**Screen:** Routines List (Screen 20) with New Routine modal overlay
**Sidebar:** Routines is active

**What the user sees (modal):**
- Title: "New Routine" with X close
- Fields:
  - Routine name (text input): empty
  - Schedule picker:
    - Preset options: "Every day", "Every weekday", "Every week", "Custom"
    - Time picker: hour/minute dropdown
    - Human-readable preview below: "Runs every weekday at 9:00 AM"
  - Assign to (dropdown with team member avatars + names): select from team
  - Task template (rich text area): describe what the routine does each run
- Footer: "Cancel" ghost button, "Create Routine" gradient button

**Data to fill (demo):**
- Name: "Morning Inbox Triage"
- Schedule: "Every weekday" at "8:00 AM" --> preview: "Runs every weekday at 8:00 AM"
- Assign to: Alex (Sales Assistant)
- Task template: "Review overnight emails, flag urgent items, draft quick responses to anything routine."

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H5.2a | "Create Routine" button | Click | Closes modal, Routines List (Screen 20) now shows new routine |
| H5.2b | "Cancel" / X | Click | Closes modal, returns to Routines List |
| H5.2c | Schedule preset buttons | Click | Updates schedule and preview text (state change) |

---

### Step 5.3: Routines List -- Updated

**Screen:** Routines List (Screen 20)

**What the user sees:** New routine "Morning Inbox Triage" appears in list with "Active" badge and "Never run" note.

---

### Step 5.4: Routine Detail

**Screen:** Routine Detail (Screen 21)
**Sidebar:** Routines is active
**Header/Breadcrumb:** "Routines > Daily Lead Follow-Up"
**URL:** `/routines/[id]`

**What the user sees:**
- Routine header:
  - Name: "Daily Lead Follow-Up" (Syne 800 24px)
  - Schedule: "Every weekday at 9:00 AM" (human-readable)
  - Team member: Alex (avatar + name, clickable)
  - Status badge: "Active" (green)
  - Pause/Resume toggle button
- Summary stat: "Ran 14 times this month, 13 successful"
- Run history list (5-6 entries):
  1. April 2, 2026 / 18 min / Completed (green) / $1.20
  2. April 1, 2026 / 22 min / Completed (green) / $1.50
  3. March 31, 2026 / 15 min / Completed (green) / $0.95
  4. March 28, 2026 / 35 min / Failed (red) / $0.80 -- [expand for error details]
  5. March 27, 2026 / 20 min / Completed (green) / $1.30
  6. March 26, 2026 / 19 min / Completed (green) / $1.15

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H5.4a | Pause/Resume toggle | Click | Toggles routine status (Active <-> Paused, state change) |
| H5.4b | Team member "Alex" | Click | Team Member Detail -- Overview (Screen 11) for Alex |
| H5.4c | Expand arrow on failed run | Click | Expands error details / transcript (state change) |
| H5.4d | Breadcrumb: "Routines" | Click | Routines List (Screen 20) |
| H5.4e | Back arrow | Click | Routines List (Screen 20) |
| H5.4f-m | Sidebar items (all 8) | Click | Respective pages |

---

### Journey 5 Summary: Complete Click Path

```
Sidebar: Routines --> Routines List (20) --> [New Routine] --> New Routine modal
    --> [Fill form, Create Routine] --> Routines List (20) updated
    --> [Click routine card] --> Routine Detail (21) --> [Pause/Resume toggle]
    --> [Breadcrumb: Routines] --> Routines List (20)
```

**Total screens visited:** 3 (Routines List + modal state + Routine Detail)
**Total transitions:** 5

---

## JOURNEY 6: PROJECTS & GOALS

**Description:** User creates and manages projects, views project tasks, and tracks goals.

**Starting state:** Projects page
**Ending state:** Project created with tasks and goals

---

### Step 6.1: Projects List

**Screen:** Projects List (Screen 18)
**Sidebar:** Projects is active
**Header/Breadcrumb:** "Projects" page title, "New Project" gradient button right-aligned
**URL:** `/projects`

**What the user sees (populated):**
- Project cards/rows:
  1. "Project Alpha" / Logistics Optimization / 3 team members badge / "12 tasks, 8 done" / progress bar (67%)
  2. "Project Beta" / Q2 Sales Push / 2 team members badge / "8 tasks, 3 done" / progress bar (38%)
  3. "Client Portal Redesign" / 1 team member badge / "5 tasks, 1 done" / progress bar (20%)

**What the user sees (empty):**
- Empty state: "No projects yet. Projects help you organize tasks and track progress." + "New Project" button

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H6.1a | "New Project" button | Click | New Project form (modal) |
| H6.1b | "Project Alpha" row/card | Click | Project Detail (Screen 19) |
| H6.1c | "Project Beta" row/card | Click | Project Detail (Screen 19) for that project |
| H6.1d | "Client Portal Redesign" | Click | Project Detail (Screen 19) for that project |
| H6.1e-l | Sidebar items (all 8) | Click | Respective pages |

---

### Step 6.2: New Project Form

**Screen:** Projects List (Screen 18) with modal overlay

**What the user sees (modal):**
- Title: "New Project" with X close
- Fields: Project name (text input), Description (textarea), Status (Active / Planning / Completed dropdown)
- Footer: "Cancel" ghost button, "Create Project" gradient button

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H6.2a | "Create Project" button | Click | Project Detail (Screen 19) for new project |
| H6.2b | "Cancel" / X | Click | Returns to Projects List (Screen 18) |

---

### Step 6.3: Project Detail

**Screen:** Project Detail (Screen 19)
**Sidebar:** Projects is active
**Header/Breadcrumb:** "Projects > Project Alpha"
**URL:** `/projects/[id]`

**What the user sees:**
- Project header: "Project Alpha" (Syne 800 24px), "Logistics Optimization" description, "Active" status badge
- Tab bar: Tasks* | Team | Goals | Workspace
- Tasks tab (default): filtered task list showing tasks in this project
  1. "Optimize warehouse routing algorithm" -- Alex -- Done
  2. "Analyze delivery time data" -- Sam -- In Progress
  3. "Draft vendor communication templates" -- Jordan -- To Do
  4. "Pull Q1 logistics KPIs" -- Sam -- Done
  5. "Create daily shipping summary routine" -- Taylor -- Done
- "Add Task" button at bottom of list

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H6.3a | Tab: Tasks | Already active | -- |
| H6.3b | Tab: Team | Click | Shows team members assigned to project (state change) |
| H6.3c | Tab: Goals | Click | Shows project goals (state change, see Step 6.4) |
| H6.3d | Tab: Workspace | Click | Shows project workspace / notes (state change) |
| H6.3e | Any task row | Click | Task Detail (Screen 16) for that task |
| H6.3f | "Add Task" button | Click | New Task Dialog (Screen 17) with project pre-selected |
| H6.3g | Team member name in task row | Click | Team Member Detail -- Overview (Screen 11) |
| H6.3h | Breadcrumb: "Projects" | Click | Projects List (Screen 18) |
| H6.3i-p | Sidebar items (all 8) | Click | Respective pages |

---

### Step 6.4: Project Detail -- Goals Tab

**Screen:** Project Detail (Screen 19) -- Goals tab
**Sidebar:** Projects is active
**Header/Breadcrumb:** "Projects > Project Alpha"

**What the user sees:**
- Tab bar: Tasks | Team | Goals* | Workspace
- Goals list:
  1. "Reduce delivery time by 15%" / Progress: 60% / Due: April 30
  2. "Cut shipping costs by $5K/month" / Progress: 35% / Due: May 15
  3. "Automate all routine vendor communications" / Progress: 80% / Due: April 15
- "Add Goal" button

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H6.4a | "Add Goal" button | Click | Goal creation form (inline or modal) |
| H6.4b | Goal row (any) | Click | Goal detail expansion (state change) showing linked tasks |
| H6.4c | Tab: Tasks | Click | Returns to Tasks tab (state change) |
| H6.4d | Breadcrumb: "Projects" | Click | Projects List (Screen 18) |

---

### Journey 6 Summary: Complete Click Path

```
Sidebar: Projects --> Projects List (18) --> [New Project] --> modal
    --> [Create Project] --> Project Detail (19) Tasks tab
    --> [Goals tab] --> Goals tab --> [Add Goal] --> goal created
    --> [Tasks tab] --> [Click task] --> Task Detail (16)
    --> [Breadcrumb: Tasks or Back] --> Project Detail (19)
```

**Total screens visited:** 4 (Projects List + modal + Project Detail + Task Detail)
**Total transitions:** 6

---

## JOURNEY 7: BILLING DEEP DIVE

**Description:** User reviews full billing data, examines per-member costs, adjusts spending limits, and sets alert thresholds.

**Starting state:** Any page
**Ending state:** Spending limits configured

---

### Step 7.1: Navigate to Billing

**Screen:** Any screen with sidebar
**Hotspot:** Sidebar: Billing --> Billing Page (Screen 22)

---

### Step 7.2: Billing Page -- Explore

**Screen:** Billing Page (Screen 22)
**Sidebar:** Billing is active
**Header/Breadcrumb:** "Billing" page title
**URL:** `/billing`

**What the user sees:** (Full populated state as described in Journey 2, Step 2.9)

**Detailed scroll experience:**
1. **Top section (above fold):** 3 MetricCards in a row -- This Month, vs. Last Month, Projected
2. **Middle section:** "By Team Member" bar chart, "By Role" aggregate table
3. **Spending Limits section:** per-member cards with:
   - Member name + avatar
   - Current spend bar (visual)
   - Current spend number
   - Limit input field
   - "Save" button
   - Alert threshold toggle: "Alert me when spending exceeds [X]% of limit"
4. **Bottom section:** Transaction log -- timeline of billing events

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H7.2a | Team member name in "By Team Member" chart | Click | Team Member Detail -- Overview (Screen 11) for that member |
| H7.2b | Spending limit input (any member) | Click/type | Editable field (state change) |
| H7.2c | "Save" button (any member) | Click | Saves limit, shows green check confirmation (state change) |
| H7.2d | Alert threshold toggle | Click | Enables alert, shows threshold input (state change) |
| H7.2e | Transaction log entry | Click | Expands details (state change) |
| H7.2f | "Detailed Breakdown" expandable (for Derek) | Click | Expands per-model, per-provider cost view (state change) |
| H7.2g-n | Sidebar items (all 8) | Click | Respective pages |

---

### Journey 7 Summary: Complete Click Path

```
Any screen --> [Sidebar: Billing] --> Billing (22)
    --> [Scroll to Spending Limits] --> [Set limit for Alex: $300]
    --> [Save] --> confirmation
    --> [Enable alert at 80%] --> alert configured
    --> [Click "Alex" in chart] --> TM Detail (11)
    --> [Back / Sidebar: Billing] --> Billing (22)
```

**Total screens visited:** 2
**Total transitions:** 3

---

## JOURNEY 8: SETTINGS & COMPANY MANAGEMENT

**Description:** User manages company profile, team defaults, integrations, and advanced settings.

**Starting state:** Any page
**Ending state:** Settings updated

---

### Step 8.1: Settings Page

**Screen:** Settings Page (Screen 23)
**Sidebar:** Settings is active
**Header/Breadcrumb:** "Settings" page title
**URL:** `/settings`

**What the user sees (sections stacked vertically):**

**Section 1: Company Profile**
- Company name: "Mendez Logistics" (editable input)
- Logo: upload area (drag/drop or click to upload), shows current logo or placeholder
- Description: textarea with company description

**Section 2: Team Defaults**
- Default spending limit: input field, "Apply to all new team members" note
- Default approval settings: toggle "Require review before sending emails" (on/off)
- Default approval settings: toggle "Require review before external API calls" (on/off)

**Section 3: Integrations**
- Grid of integration cards (3 per row):
  - Gmail: green dot "Connected", "Configure" button
  - HubSpot: green dot "Connected", "Configure" button
  - Zendesk: gray dot "Not configured", "Configure" button
  - Google Sheets: gray dot "Not configured", "Configure" button
  - Slack: gray dot "Not configured", "Configure" button
  - Database: green dot "Connected" (if Sam is set up), "Configure" button

**Section 4: Advanced (collapsed by default)**
- "For advanced users" label
- Expand arrow
- When expanded: Instance settings, Experimental features toggles, Export/Import data buttons

**Hotspots:**
| # | Element | Action | Destination |
|---|---|---|---|
| H8.1a | Company name input | Click/type | Editable (state change) |
| H8.1b | Logo upload area | Click | Opens file picker (not prototyped) |
| H8.1c | Spending limit input | Click/type | Editable (state change) |
| H8.1d | Approval toggles | Click | Toggle on/off (state change) |
| H8.1e | Integration "Configure" button (any) | Click | Opens credential configuration form (modal or inline expansion) |
| H8.1f | "Advanced" expand arrow | Click | Expands advanced section (state change) |
| H8.1g | "Save Changes" button (if present at bottom) | Click | Saves all changes, shows confirmation toast |
| H8.1h-o | Sidebar items (all 8) | Click | Respective pages |

---

### Journey 8 Summary: Complete Click Path

```
Any screen --> [Sidebar: Settings] --> Settings (23)
    --> [Edit company name] --> [Update approval toggle]
    --> [Click Configure on Zendesk] --> credential form modal
    --> [Enter key, test, save] --> integration now shows green dot
    --> [Click Advanced expand] --> see advanced options
    --> [Collapse] --> [Sidebar: Home] --> Home (3)
```

**Total screens visited:** 2
**Total transitions:** 2-3

---

## MASTER HOTSPOT INVENTORY

This is the complete count of all interactive elements across the prototype.

### Sidebar Navigation (Global)
- 8 sidebar items x 14 main app screens = **112 sidebar hotspot connections**
- Raava logo (top of sidebar) x 14 screens = **14 logo connections** (all go to Home)
- Inbox badge (top bar) x 14 screens = **14 inbox badge connections**

### Onboarding Flow (Screens 4-8)
| Screen | Hotspots |
|---|---|
| Login (4) | 2 (Get Started, FleetOS toggle) |
| Step 1 (5) | 1 (Next) |
| Step 2 (1) | 8 (6 role cards + Next + Back) |
| Step 3 (6) | 7 (2 inputs, 2 toggles, Skip, Next, Back) |
| Step 4 (7) | 3 (Hire button, Back, icon picker) |
| Success (8) | 2 (Go to My Team, Go to Home) |
| **Subtotal** | **23** |

### Main App Screens (Screens 2-3, 9-23)
| Screen | Page-Specific Hotspots | + Sidebar/Global | Total |
|---|---|---|---|
| Home Dashboard (3) | 11 (status cards, active work rows, spend, tasks, feed) | 10 | 21 |
| My Team (2) | 7 (5 member cards, Hire, filters) | 10 | 17 |
| Inbox - Reviews (9) | 5 (3 tabs, approve/reject buttons) | 10 | 15 |
| Inbox - Notifications (10) | 5 (3 tabs, notification rows, archive) | 10 | 15 |
| TM Detail - Overview (11) | 8 (5 tabs, breadcrumb, task card, tools) | 10 | 18 |
| TM Detail - Tasks (12) | 7 (5 tabs, breadcrumb, task rows) | 10 | 17 |
| TM Detail - History (13) | 7 (5 tabs, breadcrumb, expand arrows) | 10 | 17 |
| TM Detail - Personality (14) | 6 (5 tabs, breadcrumb) | 10 | 16 |
| Tasks List (15) | 5 (New Task, filters, task rows) | 10 | 15 |
| Task Detail (16) | 6 (breadcrumb, assignee link, actions, back) | 10 | 16 |
| New Task Dialog (17) | 4 (Create, Cancel, X, background dismiss) | 0 (modal) | 4 |
| Projects List (18) | 5 (New Project, project rows) | 10 | 15 |
| Project Detail (19) | 8 (4 tabs, task rows, Add Task, breadcrumb, team links) | 10 | 18 |
| Routines List (20) | 4 (New Routine, routine cards) | 10 | 14 |
| Routine Detail (21) | 6 (pause toggle, team member link, expand, breadcrumb, back) | 10 | 16 |
| Billing (22) | 6 (member links, limits, save, alert, expand) | 10 | 16 |
| Settings (23) | 7 (inputs, toggles, Configure buttons, Advanced expand) | 10 | 17 |
| **Subtotal** | **107** | **150** | **257** |

### State Screens (Screens 24-26)
| Screen | Hotspots |
|---|---|
| Empty My Team (24) | 11 (Hire button + sidebar) |
| Empty Tasks (25) | 11 (New Task button + sidebar) |
| Error TM Detail (26) | 18 (Retry, View Log, tabs, breadcrumb, sidebar) |
| **Subtotal** | **40** |

### GRAND TOTAL: ~320 hotspot connections

---

## STATE MATRIX: FIRST-TIME vs. RETURNING USER

| Screen | First-Time State | Returning User State |
|---|---|---|
| **Home Dashboard (3)** | 1 team member, 1 task, minimal spend, sparse activity feed | 5 team members, active work rows, $127.40 spend, rich activity feed |
| **My Team (2)** | 1 card (Alex), empty space | 5 cards in 2x3 grid, mixed statuses |
| **Inbox (9/10)** | Empty or 1 notification | 2 review requests, 5 notifications, 1 escalation |
| **TM Detail (11-14)** | Sparse stats (1 task completed, new member) | Rich stats (24 tasks, 92% success rate, $34.20/wk) |
| **Tasks List (15)** | 1-2 tasks | 10+ tasks across all statuses |
| **Projects List (18)** | Empty state ("No projects yet") | 3 projects with progress bars |
| **Routines List (20)** | Empty state ("No routines yet") | 3 routines with run history |
| **Billing (22)** | $0.12 total, 1 member, no limits | $487.20 total, 5 members, limits configured |
| **Settings (23)** | Company name filled, no integrations connected | Some integrations green, defaults configured |
| **Role Cards (1)** | All roles available, none hired | "1 on team" badges on hired roles |

---

## SCREEN TRANSITION MATRIX

Every possible transition in the app, organized by source screen.

### From Login (4)
| Action | Destination |
|---|---|
| Get Started (new user) | Onboarding Step 1 (5) |
| Login (returning user) | Home Dashboard (3) |

### From Onboarding Step 1 (5)
| Action | Destination |
|---|---|
| Next | Onboarding Step 2 (1) |

### From Onboarding Step 2 (1)
| Action | Destination |
|---|---|
| Next (card selected) | Onboarding Step 3 (6) |
| Back | Onboarding Step 1 (5) or My Team (2) if hiring additional |

### From Onboarding Step 3 (6)
| Action | Destination |
|---|---|
| Next / Skip for now | Onboarding Step 4 (7) |
| Back | Onboarding Step 2 (1) |

### From Onboarding Step 4 (7)
| Action | Destination |
|---|---|
| Hire [Name] | Success State (8) |
| Back | Onboarding Step 3 (6) |

### From Success State (8)
| Action | Destination |
|---|---|
| Go to My Team | My Team (2) |
| Go to Home | Home Dashboard (3) |

### From Home Dashboard (3)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Status card (Active/Idle/Needs Attention) | My Team (2) with filter |
| Active Work: team member name | TM Detail - Overview (11) |
| Active Work: task title | Task Detail (16) |
| Spend This Week card | Billing (22) |
| Recent Tasks: task row | Task Detail (16) |
| Activity Feed: entry | Related detail page |
| Inbox badge | Inbox (9) |

### From My Team (2)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Team member card | TM Detail - Overview (11) |
| + Hire button | Onboarding Step 2 (1) |
| Filter tabs | Same page, filtered (state change) |

### From TM Detail - Overview (11)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Tab: Tasks | TM Detail - Tasks (12) |
| Tab: Work History | TM Detail - History (13) |
| Tab: Personality | TM Detail - Personality (14) |
| Tab: Settings | TM Detail - Settings (not prototyped -- static) |
| Current task card | Task Detail (16) |
| Breadcrumb: My Team | My Team (2) |
| Add Tool + | Tool browser modal (state change) |

### From TM Detail - Tasks (12)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Tab: Overview | TM Detail - Overview (11) |
| Tab: Work History | TM Detail - History (13) |
| Tab: Personality | TM Detail - Personality (14) |
| Task row | Task Detail (16) |
| Breadcrumb: My Team | My Team (2) |

### From TM Detail - Work History (13)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Tab: Overview | TM Detail - Overview (11) |
| Tab: Tasks | TM Detail - Tasks (12) |
| Tab: Personality | TM Detail - Personality (14) |
| Task name in history row | Task Detail (16) |
| Expand arrow | Transcript expansion (state change) |
| Breadcrumb: My Team | My Team (2) |

### From TM Detail - Personality (14)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Tab: Overview | TM Detail - Overview (11) |
| Tab: Tasks | TM Detail - Tasks (12) |
| Tab: Work History | TM Detail - History (13) |
| Breadcrumb: My Team | My Team (2) |

### From Tasks List (15)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| New Task button | New Task Dialog (17) modal |
| Task row | Task Detail (16) |
| Filters | Same page, filtered (state change) |

### From Task Detail (16)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Breadcrumb: Tasks | Tasks List (15) |
| Back arrow | Tasks List (15) |
| Assigned team member link | TM Detail - Overview (11) |
| Project link | Project Detail (19) |
| Approve / Reject / Request Changes | State change (badge/status update) |

### From New Task Dialog (17)
| Action | Destination |
|---|---|
| Create Task | Task Detail (16) |
| Cancel / X / Background click | Closes modal, returns to underlying page |

### From Inbox - Review Requests (9)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Tab: Notifications | Inbox - Notifications (10) |
| Approve button | Approves request (state change) |
| Reject button | Rejects request (state change) |
| Review request card body | Task Detail (16) for related task |

### From Inbox - Notifications (10)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Tab: Review Requests | Inbox - Review Requests (9) |
| Notification row | Related detail page (TM Detail or Task Detail) |

### From Projects List (18)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| New Project button | New Project modal (state change) |
| Project row/card | Project Detail (19) |

### From Project Detail (19)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Tab: Tasks/Team/Goals/Workspace | Tab state change |
| Task row (in Tasks tab) | Task Detail (16) |
| Team member (in Team tab) | TM Detail - Overview (11) |
| Add Task button | New Task Dialog (17) with project pre-selected |
| Breadcrumb: Projects | Projects List (18) |

### From Routines List (20)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| New Routine button | New Routine modal (state change) |
| Routine card | Routine Detail (21) |

### From Routine Detail (21)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Team member link | TM Detail - Overview (11) |
| Pause/Resume toggle | State change |
| Breadcrumb: Routines | Routines List (20) |
| Back arrow | Routines List (20) |

### From Billing (22)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Team member name in chart | TM Detail - Overview (11) |
| Set Limit / Save | State change |

### From Settings (23)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Configure integration button | Credential config modal (state change) |
| Advanced expand | State change |

### From Empty My Team (24)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Hire button | Onboarding Step 2 (1) |

### From Empty Tasks (25)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| New Task button | New Task Dialog (17) |

### From Error State TM (26)
| Action | Destination |
|---|---|
| Sidebar: any item | Respective page |
| Retry button | Resolves to TM Detail - Overview (11) with healthy state |
| View Error Log | Transcript expansion (state change) |
| All tabs | Same as TM Detail tabs |
| Breadcrumb: My Team | My Team (2) |

---

## PROTOTYPE WIRING PRIORITY ORDER

For the Figma prototype wiring pass, wire connections in this order:

### Priority 1: Demo Flow (Journey 1 Critical Path)
1. Login (4) --> Step 1 (5) --> Step 2 (1) --> Step 3 (6) --> Step 4 (7) --> Success (8) --> My Team (2) --> TM Detail (11)
2. Total: 7 connections

### Priority 2: Sidebar Navigation (All Screens)
3. Wire all 8 sidebar items on every main app screen (14 screens x 8 items = 112 connections)
4. Wire Raava logo to Home on every screen (14 connections)
5. Wire Inbox badge on every screen (14 connections)

### Priority 3: Tab Navigation
6. TM Detail tabs: Overview <-> Tasks <-> Work History <-> Personality (4 screens x 3 connections each = 12)
7. Inbox tabs: Review Requests <-> Notifications (2 connections)
8. Project Detail tabs: Tasks <-> Team <-> Goals <-> Workspace (3 connections)

### Priority 4: Breadcrumb Navigation
9. All detail pages: breadcrumb link to parent (5 connections)

### Priority 5: Remaining Journey Connections
10. Journey 2 paths: Home --> filtered My Team --> Error state --> resolve
11. Journey 3 paths: My Team --> Hire flow --> back
12. Journey 5 paths: Routines --> New Routine --> Detail
13. Journey 6 paths: Projects --> Detail --> Task Detail
14. Journey 7 paths: Billing deep dive connections

### Priority 6: Cross-Linking
15. Active Work rows on Home --> TM Detail and Task Detail
16. Task rows everywhere --> Task Detail
17. Team member names everywhere --> TM Detail

**Estimated total wiring work: ~320 connections**
**At ~1 minute per connection in Figma: ~5-6 hours of wiring**

---

## APPENDIX A: COMPLETE SCREEN LIST WITH STATES

| # | Screen Name | States Needed | Total Variants |
|---|---|---|---|
| 1 | Onboarding Step 2 (EXISTING) | Default, Sales Assistant selected, Data Analyst selected | 3 |
| 2 | My Team (EXISTING) | 1 member, 5 members, filtered Working, filtered Needs Attention | 4 |
| 3 | Home Dashboard (EXISTING) | First-time (1 member), Populated (5 members) | 2 |
| 4 | Login | Default, FleetOS toggle revealed | 2 |
| 5 | Onboarding Step 1 | Default (empty), Filled | 2 |
| 6 | Onboarding Step 3 | Sales Assistant creds, Data Analyst creds, Skipped | 3 |
| 7 | Onboarding Step 4 | Alex (Sales), Sam (Data Analyst) | 2 |
| 8 | Success State | Alex variant, Sam variant | 2 |
| 9 | Inbox - Review Requests | Empty, 2 requests | 2 |
| 10 | Inbox - Notifications | 5 notifications | 1 |
| 11 | TM Detail - Overview | Alex, Jordan, Sam, Taylor, Riley (5 variants) | 5 |
| 12 | TM Detail - Tasks | Per team member (can use 1 with dynamic data) | 1-5 |
| 13 | TM Detail - Work History | Per team member | 1-5 |
| 14 | TM Detail - Personality | Per team member | 1-5 |
| 15 | Tasks List | Empty, populated, filtered by status, filtered by member | 4 |
| 16 | Task Detail | In Progress, Needs Review, Done, Stuck | 4 |
| 17 | New Task Dialog | Empty (default) | 1 |
| 18 | Projects List | Empty, populated | 2 |
| 19 | Project Detail | Tasks tab, Team tab, Goals tab | 3 |
| 20 | Routines List | Empty, populated | 2 |
| 21 | Routine Detail | Active, Paused | 2 |
| 22 | Billing | First-time (minimal), Populated | 2 |
| 23 | Settings | Default, Advanced expanded | 2 |
| 24 | Empty My Team | Single state | 1 |
| 25 | Empty Tasks | Single state | 1 |
| 26 | Error TM Detail | Error state, Resolved (transitions to 11) | 2 |

**Minimum viable prototype variants:** 26 screens + ~15 additional state variants = ~41 Figma frames

---

## APPENDIX B: SAMPLE DATA REFERENCE (Consistent Across All Screens)

**Company:** Mendez Logistics
**User:** Carlos Mendez, Head of Operations

**Team Members:**

| Name | Role | Status | Current Task | Weekly Cost | Hired Date |
|---|---|---|---|---|---|
| Alex | Sales Assistant | Working (green) | Following up on 3 leads from yesterday | $34.20 | March 28, 2026 |
| Jordan | Operations Manager | Idle (gray) | (Last active 2h ago) | $28.10 | March 28, 2026 |
| Sam | Data Analyst | Needs Attention (red) | Error: DB connection failed | $12.00 | March 29, 2026 |
| Taylor | Customer Support | Working (green) | Drafting ticket responses | $22.50 | March 29, 2026 |
| Riley | Marketing Coordinator | Working (green) | Drafting social posts for product launch | $18.90 | March 30, 2026 |

**Projects:**
| Name | Description | Tasks | Progress |
|---|---|---|---|
| Project Alpha | Logistics Optimization | 12 tasks, 8 done | 67% |
| Project Beta | Q2 Sales Push | 8 tasks, 3 done | 38% |
| Client Portal Redesign | -- | 5 tasks, 1 done | 20% |

**Routines:**
| Name | Schedule | Team Member | Status |
|---|---|---|---|
| Daily Lead Follow-Up | Every weekday at 9:00 AM | Alex | Active |
| Weekly KPI Report | Every Monday at 8:00 AM | Sam | Active |
| Nightly Ticket Summary | Every day at 6:00 PM | Taylor | Paused |

**Billing (This Month):**
| Team Member | Spend | Limit |
|---|---|---|
| Alex | $142.00 | $300 |
| Jordan | $98.00 | $200 |
| Taylor | $89.00 | -- |
| Riley | $72.00 | -- |
| Casey | $52.00 | -- |
| Sam | $34.00 | -- |
| **Total** | **$487.20** | -- |

---

*Produced by Diana (VP Product) with Leo (Design Lead). This document defines every click path for the Figma prototype. Each hotspot listed here becomes a prototype connection. Each transition listed here becomes a Figma flow.*

*Ready for management review, then CEO sign-off, then prototype wiring.*
