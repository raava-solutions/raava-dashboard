# DESIGN DISPATCH BRIEF
## Consolidated Single Source of Truth for All Design Pods

**Produced by:** Diana (VP Product)
**Date:** April 3, 2026
**Status:** APPROVED FOR DISPATCH (Leo sign-off April 3, 2026)
**Source Docs:** `FIGMA_PROTOTYPE_PLAN.md`, `RAAVA_USER_FLOWS.md`, `RAAVA_JOURNEY_MAP.md`
**Figma File:** `J1ht22xd1fMhT57kO0xkj5`
**Target:** Clickable prototype for eMerge Americas demo (April 22, 2026)

---

## CROSS-REFERENCE AUDIT: GAPS & INCONSISTENCIES

Before pod dispatch, the following must be resolved. Flagged for Leo and the Council.

### GAP 1: Billing Sample Data -- Casey vs. Riley (RESOLVED)
- The Journey Map Billing section (Step 2.9, Appendix B) lists **6 team members** in the billing breakdown, including "Casey" ($52.00). Casey does not appear anywhere else -- the canonical team member list is Alex, Jordan, Sam, Taylor, Riley (5 members).
- The Prototype Plan's sample data table (Appendix) also lists 5 members with no Casey.
- **RESOLVED BY LEO (April 3):** Casey IS the 6th team member -- a General Assistant hired after the initial five. Casey is added to the canonical team list. All pods must include Casey in their data. My Team grid becomes 2x3 (6 cards). Billing data uses 6 members with updated total of $487.20. See updated Sample Data section below.

### GAP 2: Journey Numbering Mismatch (NON-BLOCKING)
- Prototype Plan defines 6 journeys (1-6). Journey Map defines 8 journeys (1-8).
- Mapping: Prototype J1 = Map J1, Prototype J2 = Map J2 (partial), Prototype J3 = Map J2 (partial), Prototype J4 = Map J3, Prototype J5 = Map J7 (partial), Prototype J6 = Map J8 (partial).
- Journey Map Journeys 4 (Managing Tools), 5 (Routines), 6 (Projects) have no Prototype Plan journey equivalent because they involve modal/state changes on existing screens, not new screen-to-screen transitions.
- **Resolution:** Pods use the **Journey Map numbering** (1-8) as canonical. The Prototype Plan journey numbers are deprecated.

### GAP 3: Flow Spec Screens Beyond Prototype Scope (NON-BLOCKING)
- The User Flows document specs 88 screen variants across 4 flows. The prototype targets 26 base screens + ~15 state variants = ~41 frames.
- Screens in User Flows NOT in the 26-screen prototype:
  - `AddToolModal` (tool browser, tool config, success, error) -- 19 variants
  - `Tool Detail Panel` (expanded tool row in Settings tab) -- 10 variants
  - `Personality Version History Modal` -- 3 variants
  - `HireWizard_Provisioning` (loading overlay) -- 1 variant
  - `HireWizard_Error` (hire error state) -- 3 variants
- **Resolution:** These are modal overlays and inline state changes, not separate prototype screens. Pods should build the **base screens** per the 26-screen list. Modal states can be added as component variants in Figma where time permits, but are NOT required for the eMerge demo. P3 stretch goal.

### GAP 4: Team Member Detail "Settings" Tab (NON-BLOCKING)
- Referenced across all docs as "not prototyped -- static." All three docs are consistent on this. The tab label appears but clicking it does nothing. No work required.

### GAP 5: Success State Buttons (MINOR)
- Prototype Plan Success State (Screen 8) lists two buttons: "Go to My Team" + "Go to Home" (ghost).
- User Flows Success State lists three CTAs: "Go to My Team" + "Assign Another Task" + "Hire Another Team Member" (text link).
- Journey Map Success State lists two buttons matching the Prototype Plan.
- **Resolution:** Use the **Prototype Plan version** (2 buttons) for the prototype. The third CTA is a real-app feature, not needed for the 3-minute demo. Less clutter.

---

## GLOBAL DESIGN STANDARDS (All Pods)

Every pod must comply before delivering. Non-negotiable.

| Token | Value |
|---|---|
| Viewport | 1440x900 |
| Card radius | 12px (`radius-lg`) |
| Card shadow | `0 2px 8px rgba(0,0,0,0.08)` (`shadow-md`) |
| Card border | `1px solid #E5E7EB` (`--raava-border`) |
| Page background | `#FCFCFC` (`--raava-bg`) |
| Card background | `#FFFFFF` (`--raava-card`) |
| Primary button | Brand gradient fill (`linear-gradient(90deg, #224AE8, #716EFF, #00BDB7)`), white text, Syne 600 |
| Ghost button | No fill, `--raava-blue` (#224AE8) text |
| Status: Working | `#10B981` (`--raava-success`) |
| Status: Idle | `#6B7280` (`--raava-gray`) |
| Status: Needs Attention | `#EF4444` (`--raava-error`) |
| Status: Paused | `#F59E0B` (`--raava-warning`) |
| Heading font | Syne (800 weight for page titles, 600 for section headers) |
| Body font | Plus Jakarta Sans (400 body, 500 labels, 600 buttons) |
| Code font | JetBrains Mono |
| Spacing scale | 4 / 8 / 16 / 24 / 32 px |
| Sidebar width | 240px, fixed left |
| Sidebar active item | 3px left border `--raava-blue`, bg `--raava-hover`, text `--raava-blue` |

**Sidebar must be cloned from existing frame `18:2`, not rebuilt from scratch.**

---

## SAMPLE DATA (All Pods Must Use Consistently)

**Company:** Mendez Logistics
**User:** Carlos Mendez, Head of Operations

### Team Members

| Name | Role | Status | Current Task | Weekly Cost | Hired |
|---|---|---|---|---|---|
| Alex | Sales Assistant | Working (green) | Following up on 3 leads from yesterday | $34.20 | March 28 |
| Jordan | Operations Manager | Idle (gray) | (Last active 2h ago) | $28.10 | March 28 |
| Sam | Data Analyst | Needs Attention (red) | Error: DB connection failed | $12.00 | March 29 |
| Taylor | Customer Support | Working (green) | Drafting ticket responses | $22.50 | March 29 |
| Riley | Marketing Coordinator | Working (green) | Drafting social posts for product launch | $18.90 | March 30 |
| Casey | General Assistant | Working (green) | Organizing inbox | $18.90 | March 31 |

### Projects

| Name | Description | Tasks | Progress |
|---|---|---|---|
| Project Alpha | Logistics Optimization | 12 tasks, 8 done | 67% |
| Project Beta | Q2 Sales Push | 8 tasks, 3 done | 38% |
| Client Portal Redesign | -- | 5 tasks, 1 done | 20% |

### Routines

| Name | Schedule | Team Member | Status |
|---|---|---|---|
| Daily Lead Follow-Up | Every weekday at 9:00 AM | Alex | Active |
| Weekly KPI Report | Every Monday at 8:00 AM | Sam | Active |
| Nightly Ticket Summary | Every day at 6:00 PM | Taylor | Paused |

### Billing (This Month)

| Member | Spend | Limit |
|---|---|---|
| Alex | $142.00 | $300 |
| Jordan | $98.00 | $200 |
| Taylor | $89.00 | -- |
| Riley | $72.00 | -- |
| Casey | $52.00 | -- |
| Sam | $34.00 | -- |
| **Total** | **$487.20** | -- |

---

## POD DISPATCH SPECIFICATIONS

---

### DESIGN POD ALPHA -- "The Wizard Bookends"

**Screens:** Login (4), Onboarding Step 1 (5), Onboarding Success State (8)
**Priority:** P0 / Tier 1
**Estimated Hours:** 3-4
**Can Start:** Day 1 (no dependencies)

#### Screens to Build

**Screen 4: Login / API Key Entry**
- Centered white card on brand gradient background
- Raava star mark + wordmark centered above card
- Fields: Email input, Password input
- "Get Started" gradient button (full-width of card)
- Below form: "Connect with FleetOS" text link
- No sidebar, no header, no breadcrumbs

**Screen 5: Onboarding Step 1 -- Create Your Company**
- Same centered card layout as Login
- Step indicator: [1*]--[2]--[3]--[4] (step 1 active). Clone pattern from existing frame `6:2`.
- Heading: "Create Your Company" (Syne 800 24px)
- Fields: Company name (text), Your name (text), Your role (dropdown: CEO, Head of Ops, VP Sales, VP Engineering, Other)
- "Next" gradient button, bottom-right
- Pre-fill for demo: "Mendez Logistics" / "Carlos Mendez" / "Head of Ops"

**Screen 8: Onboarding Success State**
- Large Raava star mark (80px, static -- represents completed spin animation)
- "Alex is on your team!" (Syne 800 28px)
- "They're starting on their first task now." (Plus Jakarta Sans 400 16px, `--raava-gray`)
- Static confetti/celebration particles as decoration (brand colors: blue, purple, teal, white)
- "Go to My Team" gradient button (primary)
- "Go to Home" ghost button (secondary)
- No sidebar, no header

#### Key Interactions (from Flow Specs)

| Screen | Element | Interaction | Destination |
|---|---|---|---|
| Login (4) | "Get Started" button | Click | Onboarding Step 1 (5) |
| Login (4) | "Connect with FleetOS" link | Click | Reveals API key field (state change, same screen) |
| Step 1 (5) | "Next" button | Click | Onboarding Step 2 (1, EXISTING) |
| Success (8) | "Go to My Team" button | Click | My Team (2, EXISTING) |
| Success (8) | "Go to Home" button | Click | Home Dashboard (3, EXISTING) |

#### Hotspot Wiring

```
Login (4) --[Get Started]--> Step 1 (5) --[Next]--> Step 2 (1, EXISTING)
Success (8) --[Go to My Team]--> My Team (2, EXISTING)
Success (8) --[Go to Home]--> Home Dashboard (3, EXISTING)
```

Total prototype connections from this pod: 4

#### Reference Frames
- Step indicator: `6:2`
- Button style: `11:5`
- Brand wordmark: `18:3`
- Avatar style: `20:5`

---

### DESIGN POD BETA -- "The Wizard Core"

**Screens:** Onboarding Step 3 -- Credentials (6), Onboarding Step 4 -- Name & Launch (7)
**Priority:** P0 / Tier 1
**Estimated Hours:** 4-5
**Can Start:** Day 1 (no dependencies)

#### Screens to Build

**Screen 6: Onboarding Step 3 -- Credentials & Setup**
- Step indicator: [1]--[2]--[3*]--[4] (step 3 active)
- Heading: "Set up Sales Assistant's tools" (Syne 800 24px)
- Subheading: "Your credentials are stored securely in a vault." (Plus Jakarta Sans 400 14px)
- Two credential cards stacked vertically:
  1. Gmail API Key -- masked input, Show/Hide eye toggle, gray circle status icon (unconfigured), "How to get this key?" help link
  2. CRM API Key (HubSpot) -- same pattern
- Lock icon + security message: "Stored in a secure vault (1Password). Never visible in plaintext after setup."
- "Skip for now -- add credentials later" text link (`--raava-blue`)
- Footer: "Back" ghost button (left), "Next" gradient button (right)
- No sidebar

**Screen 7: Onboarding Step 4 -- Name & Launch**
- Step indicator: [1]--[2]--[3]--[4*] (step 4 active)
- Heading: "Almost there! Name your new team member." (Syne 800 24px)
- Name input: pre-filled "Alex", with suggestion pills below: "Jamie, Riley, Morgan"
- Icon picker: grid of 6-8 abstract icons (44x44px rounded squares). First icon pre-selected with gradient border. Clone avatar style from `20:5`.
- First task textarea: pre-filled "Review my recent leads and draft follow-up emails for anyone who hasn't responded in 3+ days"
- Helper text: "You can edit this -- it's what they'll start working on" (italic, `--raava-gray`)
- **"Hire Alex" button -- THE MONEY SHOT:** Full width (max 540px), height 56px. Brand gradient. Syne 600 18px white text. Raava star icon (white, 20px) left of text. `shadow-glow`. 16px 48px minimum padding. This must be the most inviting element in the entire prototype.
- "Back" link above the button
- No sidebar

#### Key Interactions (from Flow Specs)

| Screen | Element | Interaction | Destination |
|---|---|---|---|
| Step 3 (6) | "Skip for now" link | Click | Onboarding Step 4 (7) |
| Step 3 (6) | "Next" button | Click | Onboarding Step 4 (7) |
| Step 3 (6) | "Back" link | Click | Onboarding Step 2 (1, EXISTING) |
| Step 3 (6) | Show/Hide toggles | Click | Toggles input mask (state change) |
| Step 3 (6) | "How to get this key?" links | Static (not prototyped) | -- |
| Step 4 (7) | "Hire Alex" button | Click | Success State (8) -- built by Pod Alpha |
| Step 4 (7) | "Back" link | Click | Onboarding Step 3 (6) |
| Step 4 (7) | Icon picker options | Click | Selects avatar (state change) |

#### Hotspot Wiring

```
Step 2 (1, EXISTING) --[Next]--> Step 3 (6)
Step 3 (6) --[Skip/Next]--> Step 4 (7)
Step 3 (6) --[Back]--> Step 2 (1, EXISTING)
Step 4 (7) --[Hire Alex]--> Success (8, Pod Alpha)
Step 4 (7) --[Back]--> Step 3 (6)
```

Total prototype connections from this pod: 5 (plus 2 intra-pod links)

#### Reference Frames
- Step indicator: `6:2`
- Navigation buttons: `11:2`
- Card styling: `8:3` (role cards)

#### Critical Design Note
The "Hire Alex" button is the emotional climax of the demo. It must feel significant -- large, glowing, gradient, inviting. Do not make it look like a standard form submit. It should feel like pressing "Launch."

---

### DESIGN POD GAMMA -- "The Team Member Profile"

**Screens:** Team Member Detail -- Overview (11), Tasks Tab (12), Work History (13), Personality (14)
**Priority:** P0-P1 / Tiers 1-2
**Estimated Hours:** 6-8
**Can Start:** Day 1 (no dependencies)

#### Screens to Build

This is a single page with 4 tab states. Build Overview first (P0), then Tasks, Work History, Personality (P1).

**Shared Chrome (all 4 tabs):**
- Sidebar: clone from `18:2`. My Team is active.
- Breadcrumb: "My Team > Alex" ("My Team" is clickable, links to Screen 2)
- Profile header card: Avatar 80px (from `20:5` scaled), "Alex" (Syne 800 24px), "Sales Assistant" role badge (from `20:9`), green status dot "Working" (from `20:12`), "Hired March 28, 2026" caption
- Tab bar: Overview | Tasks | Work History | Personality | Settings
  - Active tab: underlined `--raava-blue`, bold
  - Settings tab: visible but NOT wired (static, shows tab exists)

**Screen 11: Overview Tab** (P0)
- Current task card: "Following up on 3 leads from yesterday" / live status dot (green, pulsing) / time elapsed
- Performance stats 2x2 grid of MetricCards:
  - Tasks Completed: 24
  - Success Rate: 92%
  - Avg Task Time: 18m
  - This Week: $34.20
- Skills/tools: horizontal badge row -- Email, CRM, Docs, Calendar (reuse badge style from `9:7`)

**Screen 12: Tasks Tab** (P1)
- Filtered task list for Alex (reuse row pattern from `27:5`):
  1. "Review my recent leads..." -- In Progress (blue badge)
  2. "Draft proposal for Acme Corp partnership" -- Done (green)
  3. "Update CRM with Q1 lead status" -- Done (green)
  4. "Follow up on 3 leads from yesterday" -- Done (green)
  5. "Send weekly pipeline summary to Carlos" -- To Do (gray)
- Status badges: To Do (gray), In Progress (blue), Done (green), Needs Review (purple), Stuck (red)

**Screen 13: Work History Tab** (P1)
- Chronological work session list:
  1. "Follow up on 3 leads from yesterday" / 45 min / Completed (green) / $2.40 / [expand arrow]
  2. "Update CRM with Q1 lead status" / 22 min / Completed (green) / $1.10 / [expand arrow]
  3. "Draft proposal for Acme Corp" / 1h 12min / Completed (green) / $4.80 / [expand arrow]
  4. "Review ticket escalations" / 8 min / Escalated (yellow) / $0.40 / [expand arrow]

**Screen 14: Personality Tab** (P2)
- Help text: "This guides how your team member thinks, communicates, and approaches tasks."
- Rich text editor/display area pre-filled with: "You are a professional, proactive sales assistant. You communicate clearly and warmly. You follow up persistently but not aggressively. You always update the CRM after every interaction. You flag hot leads for immediate human attention. You draft in a professional but conversational tone."
- Show as styled rendered text in prototype (not an active editor)

#### Key Interactions (from Flow Specs + Journey Map)

| Screen | Element | Interaction | Destination |
|---|---|---|---|
| All tabs | Breadcrumb: "My Team" | Click | My Team (2) |
| All tabs | Sidebar items (8) | Click | Respective pages |
| All tabs | Tabs (Overview/Tasks/History/Personality) | Click | Switch to that tab |
| Overview (11) | Current task card | Click | Task Detail (16) |
| Overview (11) | "Add Tool" / "+" button | Click | Tool browser (state change, not separate screen) |
| Tasks (12) | Any task row | Click | Task Detail (16) |
| Work History (13) | Expand arrow | Click | Transcript expansion (state change) |
| Work History (13) | Task name in row | Click | Task Detail (16) |

#### Hotspot Wiring

```
My Team (2) --[Click Alex card]--> Overview (11)
Overview (11) <--tabs--> Tasks (12) <--tabs--> Work History (13) <--tabs--> Personality (14)
Overview (11) --[Current task]--> Task Detail (16)
Overview (11) --[Breadcrumb: My Team]--> My Team (2)
Tasks (12) --[Task row]--> Task Detail (16)
Work History (13) --[Task name]--> Task Detail (16)
All 4 screens: sidebar wiring (8 destinations each)
```

Total prototype connections: ~48 (4 screens x 8 sidebar + tab navigation + breadcrumbs + content links)

#### Reference Frames
- Sidebar: `18:2`
- Card styling: `20:3`
- Badge styling: `9:7`
- Task rows: `27:5` through `27:29`
- Avatar: `20:5`
- Role badge: `20:9`
- Status dot: `20:12`

---

### DESIGN POD DELTA -- "Tasks & Actions"

**Screens:** Tasks List (15), Task Detail (16), New Task Dialog (17)
**Priority:** P1 / Tier 2
**Estimated Hours:** 5-6
**Can Start:** Day 1 (no dependencies)

#### Screens to Build

**Screen 15: Tasks List**
- Sidebar + "Tasks" page header + "New Task" gradient button (right-aligned, like Hire button pattern from `19:5`)
- Filter bar row: Status dropdown (All, To Do, In Progress, Done, Needs Review, Stuck), Team Member dropdown (with avatar thumbnails), Project dropdown, Search input (right-aligned)
- Task list (8-10 rows) using row pattern from `27:5` with columns: status badge, task title, assigned team member (avatar+name), project name, created date
- Sample tasks:
  1. "Following up on 3 leads from yesterday" -- Alex -- In Progress
  2. "Draft Q2 sales report" -- Alex -- Done
  3. "Pull KPI metrics" -- Sam -- Stuck (red)
  4. "Organize support ticket backlog" -- Taylor -- Done
  5. "Schedule social posts for April" -- Riley -- In Progress
  6. "Audit current task list" -- Jordan -- To Do
  7. "Draft ticket responses for VIP clients" -- Taylor -- Needs Review
  8. "Weekly pipeline summary for Carlos" -- Alex -- Needs Review

**Screen 16: Task Detail**
- Breadcrumb: "Tasks > [Task Title]"
- Header: task title (Syne 800 24px), status badge, Assigned: team member avatar + name (clickable), Project link, Created date
- Description body: Markdown-rendered, 2-3 paragraphs of sample content
- Activity stream: timestamped entries (comments, status changes, work session summaries)
- Work sessions section: 2 entries with duration, outcome, cost, expand arrow
- Action bar: "Reassign" button, Status dropdown, "Add Comment" input
- For "Needs Review" variant: add "Approve & Send" (green), "Request Changes" (yellow), "Reject" (red outline) buttons

**Screen 17: New Task Dialog**
- Modal overlay (radius-xl, shadow-lg) on top of Tasks List
- Semi-transparent backdrop (`rgba(0,0,0,0.5)`)
- Title: "New Task" with X close button
- Fields: Title input, Description (rich text area, 4 lines), Assign to (dropdown with team member avatars+names+roles), Project (dropdown), Priority (Low/Medium/High)
- Footer: "Cancel" ghost button, "Create Task" gradient button

#### Key Interactions

| Screen | Element | Interaction | Destination |
|---|---|---|---|
| Tasks List (15) | "New Task" button | Click | New Task Dialog (17) modal overlay |
| Tasks List (15) | Any task row | Click | Task Detail (16) |
| Tasks List (15) | Filter dropdowns | Click | State change (filtered list) |
| Tasks List (15) | Sidebar items (8) | Click | Respective pages |
| Task Detail (16) | Breadcrumb: "Tasks" | Click | Tasks List (15) |
| Task Detail (16) | Back arrow | Click | Tasks List (15) |
| Task Detail (16) | Assigned team member | Click | TM Detail -- Overview (11) |
| Task Detail (16) | "Approve & Send" | Click | Badge changes to Done (state change) |
| Task Detail (16) | Sidebar items (8) | Click | Respective pages |
| New Task Dialog (17) | "Create Task" button | Click | Task Detail (16) |
| New Task Dialog (17) | "Cancel" / X / backdrop | Click | Closes modal, returns to Tasks List (15) |

#### Hotspot Wiring

```
Home (3) --[Sidebar: Tasks]--> Tasks List (15)
Tasks List (15) --[New Task]--> New Task Dialog (17)
Tasks List (15) --[Task row]--> Task Detail (16)
New Task Dialog (17) --[Create Task]--> Task Detail (16)
New Task Dialog (17) --[Cancel/X]--> Tasks List (15)
Task Detail (16) --[Breadcrumb/Back]--> Tasks List (15)
Task Detail (16) --[Assigned member]--> TM Detail Overview (11)
```

Total prototype connections: ~30

#### Reference Frames
- Row pattern: `27:5`
- Button: `19:5`
- Sidebar: `18:2`
- Badge styling: `27:9`

---

### DESIGN POD EPSILON -- "The Inbox"

**Screens:** Inbox -- Review Requests (9), Inbox -- Notifications (10)
**Priority:** P1-P2 / Tiers 2-3
**Estimated Hours:** 3-4
**Can Start:** Day 1 (no dependencies)

#### Screens to Build

**Shared Chrome:**
- Sidebar (Inbox active), "Inbox" page header
- Tab bar with count badges: "Review Requests (2)" | "Notifications (5)" | "Escalations (1)"

**Screen 9: Inbox -- Review Requests**
- Card-based list. Each card:
  - Left: team member avatar + name + role
  - Center: request description ("Alex wants to send follow-up emails to 3 leads. Review the drafts before sending.")
  - Right: Approve (green) / Reject (red outline) / Comment (gray outline) action buttons
  - Timestamp, unread indicator (blue dot left edge)
- 2 review request cards
- Escalation section at top (1 item): "Sam is stuck on 'Pull KPI metrics' -- database connection failed. [View Details] [Retry]" styled with warning/error colors
- Empty state variant: "All caught up. Your team is handling things." with calm illustration

**Screen 10: Inbox -- Notifications**
- Simpler list. Each row:
  - Icon: checkmark (completion), warning (error), arrow (status change)
  - Description: "Alex finished working on 'Following up on 3 leads'" 
  - Timestamp
  - Read/unread styling
  - Archive swipe indicator (right edge)
- 5 notification rows (from Journey Map Step 2.8):
  1. "You approved Taylor's draft ticket responses" -- just now
  2. "Alex finished working on 'Following up on 3 leads'" -- 12m ago
  3. "Sam's database connection issue has been resolved" -- 15m ago
  4. "Taylor finished working on 'Organize support ticket backlog'" -- 1h ago
  5. "Jordan's status changed to Idle" -- 2h ago

#### Key Interactions

| Screen | Element | Interaction | Destination |
|---|---|---|---|
| Review Requests (9) | Tab: Notifications | Click | Notifications (10) |
| Review Requests (9) | Approve button | Click | State change (approved) |
| Review Requests (9) | Reject button | Click | State change (rejected) |
| Review Requests (9) | Card body | Click | Task Detail (16) |
| Review Requests (9) | Sidebar (8) | Click | Respective pages |
| Notifications (10) | Tab: Review Requests | Click | Review Requests (9) |
| Notifications (10) | Notification row | Click | Related detail page (TM Detail or Task Detail) |
| Notifications (10) | Sidebar (8) | Click | Respective pages |

#### Hotspot Wiring

```
Review Requests (9) <--tabs--> Notifications (10)
Review Requests (9) --[card body]--> Task Detail (16)
Notifications (10) --[row click]--> TM Detail (11) or Task Detail (16)
Both screens: sidebar wiring (8 destinations each)
```

Total prototype connections: ~22

#### Reference Frames
- Sidebar: `18:2`
- Card styling: `20:3`
- Status dots: `20:12`

---

### DESIGN POD ZETA -- "Billing & Settings"

**Screens:** Billing Page (22), Settings Page (23)
**Priority:** P2 / Tier 3
**Estimated Hours:** 5-6
**Can Start:** After Tier 1 done (lower priority, not blocked)

#### Screens to Build

**Screen 22: Billing Page**
- Sidebar (Billing active) + "Billing" header
- Top row: 3 MetricCards (from `25:6`/`26:23` pattern):
  - "This Month: $487.20" (large, Syne 800)
  - "vs. Last Month: $412.50 (+18%)" with trend arrow
  - "Projected: $520.00"
- "By Team Member" section: horizontal bar chart showing spend per member (Alex $142, Jordan $98, Taylor $89, Riley $72, Casey $52, Sam $34)
- "By Role" section: aggregate table
- "Spending Limits" section: per-member limit cards with current spend progress bar, limit input, "Save" button
  - Alex: $142 / $300 limit (bar at 47%)
  - Jordan: $98 / $200 limit (bar at 49%)
  - Others: no limit set ("Set Limit" button)
- Transaction log: 5 recent entries in timeline format

**Screen 23: Settings Page**
- Sidebar (Settings active) + "Settings" header
- Sections stacked vertically:
  1. **Company Profile:** Company name "Mendez Logistics" (editable), logo upload area, description textarea
  2. **Team Defaults:** Default spending limit input, "Require review before sending emails" toggle, "Require review before external API calls" toggle
  3. **Integrations:** Grid of integration cards (Gmail, HubSpot, Zendesk, Google Sheets, Slack) each with status dot (green=connected, gray=not configured) and "Configure" button
  4. **Advanced:** Collapsed by default, "For advanced users" label, expand arrow

#### Key Interactions

| Screen | Element | Interaction | Destination |
|---|---|---|---|
| Billing (22) | Team member name in chart | Click | TM Detail -- Overview (11) |
| Billing (22) | "Set Limit" button | Click | Opens limit input (state change) |
| Billing (22) | "Save" button (limit) | Click | Saves limit, shows confirmation (state change) |
| Billing (22) | Alert threshold toggle | Click | Enables alert (state change) |
| Billing (22) | Sidebar (8) | Click | Respective pages |
| Settings (23) | Integration "Configure" buttons | Click | Opens credential config (state change, not separate screen) |
| Settings (23) | "Advanced" expand arrow | Click | Expands section (state change) |
| Settings (23) | Sidebar (8) | Click | Respective pages |

#### Hotspot Wiring

```
Billing (22) --[member name]--> TM Detail Overview (11)
Both screens: sidebar wiring (8 destinations each)
```

Total prototype connections: ~18

#### Reference Frames
- MetricCard pattern: `25:6` / `26:23`
- Card styling: `20:3`
- Sidebar: `18:2`

#### Resolved Decision
**GAP 1 (Casey) -- RESOLVED.** Casey (General Assistant, $52.00 spend) is included. Build billing with 6 members. Total = $487.20.

---

### DESIGN POD ETA -- "Projects & Routines"

**Screens:** Projects List (18), Project Detail (19), Routines List (20), Routine Detail (21)
**Priority:** P2 / Tier 3
**Estimated Hours:** 4-5
**Can Start:** After Tier 1 done (lower priority, not blocked)

#### Screens to Build

**Screen 18: Projects List**
- Sidebar (Projects active) + "Projects" header + "New Project" gradient button
- Project cards/rows (3 entries):
  1. "Project Alpha" / Logistics Optimization / 3 team members badge / "12 tasks, 8 done" / progress bar 67%
  2. "Project Beta" / Q2 Sales Push / 2 team members badge / "8 tasks, 3 done" / progress bar 38%
  3. "Client Portal Redesign" / 1 team member badge / "5 tasks, 1 done" / progress bar 20%

**Screen 19: Project Detail (with tabs)**
- Breadcrumb: "Projects > Project Alpha"
- Header: "Project Alpha" (Syne 800 24px), "Logistics Optimization" description, "Active" badge
- Tab bar: Tasks* | Team | Goals | Workspace
- Tasks tab (default): filtered task list:
  1. "Optimize warehouse routing algorithm" -- Alex -- Done
  2. "Analyze delivery time data" -- Sam -- In Progress
  3. "Draft vendor communication templates" -- Jordan -- To Do
  4. "Pull Q1 logistics KPIs" -- Sam -- Done
  5. "Create daily shipping summary routine" -- Taylor -- Done
- "Add Task" button at bottom
- Team/Goals/Workspace tabs: visible labels only, content is stretch goal

**Screen 20: Routines List**
- Sidebar (Routines active) + "Routines" header + "New Routine" gradient button
- Routine cards (3 entries):
  1. "Daily Lead Follow-Up" / "Every weekday at 9:00 AM" / Alex avatar / Active (green) / "Last ran: yesterday, success"
  2. "Weekly KPI Report" / "Every Monday at 8:00 AM" / Sam avatar / Active (green) / "Last ran: 3 days ago, success"
  3. "Nightly Ticket Summary" / "Every day at 6:00 PM" / Taylor avatar / Paused (yellow) / "Paused by user"

**Screen 21: Routine Detail**
- Breadcrumb: "Routines > Daily Lead Follow-Up"
- Header: name (Syne 800 24px), "Every weekday at 9:00 AM" schedule, Alex avatar + name (clickable), "Active" badge, Pause/Resume toggle
- Summary: "Ran 14 times this month, 13 successful"
- Run history (6 entries):
  1. April 2, 2026 / 18 min / Completed (green) / $1.20
  2. April 1, 2026 / 22 min / Completed (green) / $1.50
  3. March 31, 2026 / 15 min / Completed (green) / $0.95
  4. March 28, 2026 / 35 min / Failed (red) / $0.80
  5. March 27, 2026 / 20 min / Completed (green) / $1.30
  6. March 26, 2026 / 19 min / Completed (green) / $1.15

#### Key Interactions

| Screen | Element | Interaction | Destination |
|---|---|---|---|
| Projects List (18) | "New Project" button | Click | New Project modal (state change) |
| Projects List (18) | Project row | Click | Project Detail (19) |
| Projects List (18) | Sidebar (8) | Click | Respective pages |
| Project Detail (19) | Task row | Click | Task Detail (16) |
| Project Detail (19) | "Add Task" button | Click | New Task Dialog (17) with project pre-selected |
| Project Detail (19) | Team member name in row | Click | TM Detail -- Overview (11) |
| Project Detail (19) | Breadcrumb: "Projects" | Click | Projects List (18) |
| Project Detail (19) | Sidebar (8) | Click | Respective pages |
| Routines List (20) | "New Routine" button | Click | New Routine modal (state change) |
| Routines List (20) | Routine card | Click | Routine Detail (21) |
| Routines List (20) | Sidebar (8) | Click | Respective pages |
| Routine Detail (21) | Pause/Resume toggle | Click | State change |
| Routine Detail (21) | Team member "Alex" | Click | TM Detail -- Overview (11) |
| Routine Detail (21) | Breadcrumb: "Routines" | Click | Routines List (20) |
| Routine Detail (21) | Sidebar (8) | Click | Respective pages |

#### Hotspot Wiring

```
Projects List (18) --[row]--> Project Detail (19) --[breadcrumb]--> Projects List (18)
Project Detail (19) --[task row]--> Task Detail (16)
Project Detail (19) --[Add Task]--> New Task Dialog (17)
Routines List (20) --[card]--> Routine Detail (21) --[breadcrumb]--> Routines List (20)
Routine Detail (21) --[Alex]--> TM Detail Overview (11)
All 4 screens: sidebar wiring (8 destinations each)
```

Total prototype connections: ~40

#### Reference Frames
- Row patterns: `27:5`
- Sidebar: `18:2`
- Badge styles: `27:9`
- Card: `20:3`

---

### DESIGN POD THETA -- "Edge States"

**Screens:** Empty State -- My Team (24), Empty State -- Tasks (25), Error State -- Team Member (26)
**Priority:** P3 / Tier 4
**Estimated Hours:** 2-3
**Can Start:** After Tiers 1-2 done (needs My Team, Tasks, TM Detail as base frames)

#### Screens to Build

**Screen 24: Empty State -- My Team (0 members)**
- Clone My Team frame (`17:2`)
- Remove all team member cards
- Replace card area with centered empty state:
  - Simple line illustration (abstract team/people, geometric Raava style)
  - "Your team is empty" (Syne 800 20px)
  - "Hire your first AI team member. Pick a role, name them, and they'll start working in minutes." (Plus Jakarta Sans 400 14px, `--raava-gray`)
  - "Hire Your First Team Member" gradient button (height 48px, padding 32px horizontal)
- Filter tabs show "All 0"

**Screen 25: Empty State -- Tasks (0 tasks)**
- Clone Tasks List layout
- Replace task list with centered empty state:
  - "No tasks yet" (Syne 800 20px)
  - "Create a task or hire a team member to get started." (Plus Jakarta Sans 400 14px)
  - "New Task" gradient button

**Screen 26: Error State -- Team Member Needs Attention (Sam)**
- Clone TM Detail -- Overview (11)
- Change profile header: Sam avatar, "Sam", "Data Analyst" badge, RED status dot "Needs Attention"
- Add error banner at top of content area: red-tinted card (#FEE2E2 bg, `--raava-error` left border 3px)
  - Warning icon
  - "Sam needs your attention" heading
  - "Database connection failed at 2:34 PM. The Data Analyst role requires a valid database connection string."
  - "Retry" gradient button + "View Error Log" text link
- Performance stats: grayed out or showing "--" values
- Skills/tools: SQL with warning icon, other tools normal

#### Key Interactions

| Screen | Element | Interaction | Destination |
|---|---|---|---|
| Empty My Team (24) | "Hire" button | Click | Onboarding Step 2 (1) |
| Empty My Team (24) | Sidebar (8) | Click | Respective pages |
| Empty Tasks (25) | "New Task" button | Click | New Task Dialog (17) |
| Empty Tasks (25) | Sidebar (8) | Click | Respective pages |
| Error TM (26) | "Retry" button | Click | Resolves to TM Detail -- Overview (11) with green status |
| Error TM (26) | "View Error Log" | Click | Expands error details (state change) |
| Error TM (26) | All tabs | Click | Same as TM Detail tab navigation |
| Error TM (26) | Breadcrumb: "My Team" | Click | My Team (2) |
| Error TM (26) | Sidebar (8) | Click | Respective pages |

#### Hotspot Wiring

```
My Team (2) --[filter: Needs Attention]--> filtered view --[Sam card]--> Error TM (26)
Error TM (26) --[Retry]--> TM Detail Overview (11) healthy state
Error TM (26) --[Breadcrumb]--> My Team (2)
Empty My Team (24) --[Hire]--> Onboarding Step 2 (1)
Empty Tasks (25) --[New Task]--> New Task Dialog (17)
All 3 screens: sidebar wiring
```

Total prototype connections: ~30

#### Reference Frames
- My Team: `17:2`
- TM Detail Overview: (built by Pod Gamma)
- Tasks List: (built by Pod Delta)

---

## POST-POD WIRING PASS (Day 5, second half)

After all pods deliver, a dedicated wiring session connects everything end-to-end.

### Wiring Priority Order

| Priority | Scope | Connections | Time Est |
|---|---|---|---|
| 1 | Demo flow: Login->Step 1->Step 2->Step 3->Step 4->Success->My Team->TM Detail | 7 | 15 min |
| 2 | Sidebar navigation: 8 items x 14 main app screens | 112 | 2 hours |
| 3 | Raava logo + Inbox badge: 14 screens each | 28 | 30 min |
| 4 | Tab navigation: TM Detail (12), Inbox (2), Project Detail (3) | 17 | 20 min |
| 5 | Breadcrumbs: all detail pages to parent | 5 | 10 min |
| 6 | Journey 2-8 specific paths | ~40 | 1 hour |
| 7 | Cross-links: active work rows, task rows, member names | ~30 | 1 hour |
| **Total** | | **~239** | **~5-6 hours** |

### Wiring Verification Checklist
- [ ] Journey 1 (demo flow): click through start to finish, every transition works
- [ ] Every sidebar link on every main app screen navigates correctly
- [ ] All tab bars cycle through their tabs correctly
- [ ] All breadcrumbs navigate to parent pages
- [ ] Set default flow to Journey 1 for Figma presentation mode
- [ ] Test on 1440x900 viewport

---

## EXECUTION TIMELINE

| Day | Pods Active | Screens Delivered | Cumulative | Milestone |
|---|---|---|---|---|
| Day 1 | Alpha + Beta + Gamma (start) | Login (4), Step 1 (5), Success (8), Step 3 (6), Step 4 (7) | 8 of 26 | Onboarding wizard complete |
| Day 2 | Gamma (finish) + Delta (start) | TM Detail x4 (11-14) + Tasks start | 12 of 26 | Journey 1 demo flow fully clickable |
| Day 3 | Delta (finish) + Epsilon | Tasks (15-17) + Inbox (9-10) | 17 of 26 | Journeys 2-3 clickable |
| Day 4 | Zeta + Eta | Billing (22), Settings (23), Projects (18-19), Routines (20-21) | 23 of 26 | All sidebar destinations active |
| Day 5 | Theta + Wiring Pass | States (24-26) + all hotspot wiring (~239 connections) | 26 of 26 | Full prototype clickable |

**Total: 5 design days. Buffer to April 22: 14 days for iteration, polish, and demo rehearsal.**

---

## EFFORT SUMMARY

| Pod | Screens | Priority | Hours | Day |
|---|---|---|---|---|
| Alpha | Login, Step 1, Success (3) | P0 | 3-4h | 1 |
| Beta | Step 3, Step 4 (2) | P0 | 4-5h | 1 |
| Gamma | TM Detail x4 tabs (4) | P0-P1 | 6-8h | 1-2 |
| Delta | Tasks List, Detail, Dialog (3) | P1 | 5-6h | 2-3 |
| Epsilon | Inbox x2 tabs (2) | P1-P2 | 3-4h | 3 |
| Zeta | Billing, Settings (2) | P2 | 5-6h | 4 |
| Eta | Projects x2, Routines x2 (4) | P2 | 4-5h | 4 |
| Theta | Empty x2, Error x1 (3) | P3 | 2-3h | 5 |
| Wiring | ~239 connections | P0 | 5-6h | 5 |
| **Total** | **23 screens + wiring** | | **37-47h** | **5 days** |

---

## DIANA'S SIGN-OFF

### Is this ready for design pod dispatch?

**Conditionally yes.** The three source documents are substantively aligned. The 26-screen prototype plan, 4 user flow specs (88 variants), and 8 journey maps (320 hotspots, 41 frames) cross-reference cleanly with the exceptions noted in the Gap Audit above.

### Blockers

1. **GAP 1 (Casey/Billing data) -- RESOLVED by Leo (April 3).** Casey added as 6th team member (General Assistant). All pods use 6-member data. My Team is 2x3 grid. Billing total = $487.20. No remaining blockers on this item.

2. **No other blockers.** All other gaps are non-blocking (journey numbering is editorial, flow spec screens beyond prototype scope are deferred, Settings tab is consistently marked static).

### Risks

- **Pod Gamma is the heaviest lift** (6-8 hours, 4 tab states). If it slips Day 1, it cascades to Day 2, compressing Delta's start. Mitigation: Gamma should focus exclusively on Overview (11) first to unblock the demo flow, then finish the other 3 tabs.
- **Wiring pass (Day 5) is 5-6 hours of repetitive work.** If screens slip into Day 5, wiring gets compressed. Mitigation: start wiring sidebar navigation as soon as any main app screen is delivered (Day 2), not all at once on Day 5.

### Recommendation

Dispatch Pods Alpha, Beta, Gamma, Delta, and Epsilon on Day 1. They have no dependencies and cover all P0 and P1 screens. Zeta and Eta start Day 4 (after Tier 1 is confirmed). Theta starts Day 5.

Leo reviews each pod's output against the Consistency Checklist before it's wired. No screen enters the prototype without Leo's sign-off on design token compliance.

This document is the single source of truth. If a pod has a question, the answer is here or in the three source documents referenced at the top. If it's not in any of those documents, escalate to me.

-- Diana, VP Product
April 3, 2026

---

## LEO'S DESIGN LEAD SIGN-OFF

**Reviewer:** Leo (Design Lead)
**Date:** April 3, 2026
**Status:** APPROVED FOR DISPATCH -- with notes below

---

### 1. Review Findings

**Screen Specs:** Diana's specs are dispatch-ready. Every screen has explicit layout descriptions, font weights, size callouts, color token references, and sample data. Pods can build without asking questions. The reference frame IDs are verified against the existing Figma structure (I confirmed `6:2` step indicator, `18:2` sidebar, `20:5` avatar, `20:3` card pattern, `27:5` task rows, `25:6`/`26:23` metric cards, `9:7` badges, `11:5` button, `18:3` brand mark, `19:5` hire button, `20:9` role badge, `20:12` status dot, `8:3` role cards, `11:2` nav buttons, `27:9` status badge all exist in the file).

**Hotspot Wiring Maps:** Complete for all 8 pods. Every screen lists source element, interaction type, and destination with frame references. The wiring priority order for the post-pod pass is well-structured. The connection estimate of ~239 is realistic.

**Design Consistency Concerns:**
- The existing My Team screen (frame `17:2`) currently shows 3 cards in a single row. With Casey added, we now need 6 cards in a 2x3 grid. This means the My Team screen itself needs updating -- it is NOT just a new-screen job. Pods building screens that link to My Team should be aware the frame content will change (though the frame ID stays `17:2`).
- The existing Home Dashboard (frame `24:2`) shows only 3 active work entries and a status strip of "3 Active / 1 Idle / 1 Needs Attention." With 6 members, this should update to "4 Active / 1 Idle / 1 Needs Attention" and add Casey's work entry. This is a pre-dispatch fix I will make before pods start building.
- Screen 1 (Onboarding Step 2, frame `4:2`) already has 6 role cards including General Assistant -- consistent with Casey's role. No changes needed there.

**One Gap Diana Missed:** The Task List sample data (Pod Delta, Screen 15) has 8 tasks but none assigned to Casey. Adding one: "Organize and tag last week's email threads -- Casey -- In Progress" as row 9 to maintain consistency. I will include this in the Pod Delta dispatch instructions below.

---

### 2. GAP 1 Resolution (Casey) -- CONFIRMED

Casey IS the 6th team member. Added after the initial five hires. Canonical data:

| Field | Value |
|---|---|
| Name | Casey |
| Role | General Assistant |
| Status | Working (green) |
| Current Task | Organizing inbox |
| Weekly Cost | $18.90/wk |
| Hired | March 31 |
| Monthly Spend | $52.00 |
| Spending Limit | -- (none set) |

All sample data tables in this brief have been updated to include Casey. The My Team grid is now 2x3 (6 cards). Billing total is $487.20.

---

### 3. Mandatory Design Guidelines for All Pods

These supplement the Global Design Standards table already in this document. Every pod must follow these without exception.

**Figma File Discipline:**
- Single file: `J1ht22xd1fMhT57kO0xkj5` (https://www.figma.com/design/J1ht22xd1fMhT57kO0xkj5)
- All screens at 1440x900
- 3 screens already built (frames `4:2`, `17:2`, `24:2`) -- reuse patterns from these, do not reinvent
- Color variables are already created in the file -- use them, do not hardcode hex values
- Name frames consistently: "Screen N -- [Name]" (e.g., "Screen 4 -- Login")

**Typography (load order matters):**
- Syne ExtraBold (800) for page titles, Syne SemiBold (600) for section headers and buttons
- Plus Jakarta Sans Regular (400) for body, Medium (500) for labels, SemiBold (600) for button text
- JetBrains Mono for any code/monospace contexts
- All three fonts must be loaded before building. If a font shows as missing, stop and report.

**Component Patterns:**
- Every card: 12px radius, shadow-md (`0 2px 8px rgba(0,0,0,0.08)`), 1px `#E5E7EB` border, white background
- Every primary CTA: gradient fill (`linear-gradient(90deg, #224AE8, #716EFF, #00BDB7)`), white text, Syne 600
- Every ghost button: no fill, `#224AE8` text
- Sidebar: 240px fixed left, clone from `18:2`. Star mark at top. Active item has 3px left border in `--raava-blue`
- Spacing: only use 4 / 8 / 16 / 24 / 32 px from the scale. No arbitrary spacing.
- Status colors: Working=#10B981, Idle=#6B7280, Needs Attention=#EF4444, Paused=#F59E0B

**Prototype Interactions:**
- All hotspots use "On click" trigger with "Navigate to" action
- Transition: "Smart animate" with 300ms ease-in-out for all page transitions
- Tab switches within a page: "Instant" transition (no animation)
- Modal overlays: "Open overlay" action with "Slide in from bottom" 200ms
- Modal close: "Close overlay" action

---

### 4. Dispatch Strategy

**The constraint:** We are building in a single Figma file. Dispatching 8 parallel agents into the same file causes merge conflicts and overwrites. The pods must go sequentially by tier.

**Tier 1 -- DISPATCH IMMEDIATELY (Pods Alpha + Beta merged, then Gamma)**

I am merging Pods Alpha and Beta into a single dispatch. Rationale:
- Alpha (3 screens, 3-4h) and Beta (2 screens, 4-5h) both build the onboarding wizard flow
- They share the same layout pattern (centered card, no sidebar, step indicator)
- They share reference frames (`6:2`, `11:2`, `11:5`)
- Building them together avoids handoff overhead and ensures visual consistency across the wizard
- Combined: 5 screens, 7-9 hours, one coherent pass

Dispatch order within Tier 1:
1. **Pod Alpha+Beta (merged):** Screens 4, 5, 6, 7, 8 -- the full onboarding wizard
2. **Pod Gamma:** Screens 11, 12, 13, 14 -- Team Member Detail (4 tab states)

Gamma starts after Alpha+Beta finishes (they are in the same file). Gamma's Overview tab (Screen 11) is the P0 -- build that first to unblock the demo flow.

**Tier 2 -- DISPATCH AFTER TIER 1 (Pod Delta, then Epsilon)**

3. **Pod Delta:** Screens 15, 16, 17 -- Tasks List, Task Detail, New Task Dialog
4. **Pod Epsilon:** Screens 9, 10 -- Inbox tabs

**Tier 3 -- DISPATCH AFTER TIER 2 (Pods Zeta and Eta merged)**

I am merging Pods Zeta and Eta. Rationale:
- Both are P2, scheduled for Day 4
- Both are "list + detail" patterns (Projects List/Detail, Routines List/Detail, Billing, Settings)
- Combined: 6 screens, 9-11 hours, but all follow established patterns by this point
- If time is tight, Billing (22) and Projects List (18) take priority over Settings (23) and Routine Detail (21)

5. **Pod Zeta+Eta (merged):** Screens 18, 19, 20, 21, 22, 23

**Tier 4 -- DISPATCH LAST (Pod Theta)**

6. **Pod Theta:** Screens 24, 25, 26 -- Edge states. Requires base frames from prior tiers.

**Revised Timeline:**

| Day | Dispatch | Screens | Cumulative |
|---|---|---|---|
| Day 1 | Alpha+Beta (merged) | 4, 5, 6, 7, 8 | 8 of 26 |
| Day 2 | Gamma | 11, 12, 13, 14 | 12 of 26 |
| Day 3 | Delta | 15, 16, 17 | 15 of 26 |
| Day 3 (overlap) | Epsilon | 9, 10 | 17 of 26 |
| Day 4 | Zeta+Eta (merged) | 18, 19, 20, 21, 22, 23 | 23 of 26 |
| Day 5 AM | Theta | 24, 25, 26 | 26 of 26 |
| Day 5 PM | Wiring pass | ~239 connections | COMPLETE |

Note: Day 3 shows overlap because Delta and Epsilon work on different screen areas. If sequential constraints apply, Epsilon slides to Day 4 morning and Zeta+Eta compresses.

**Result: 6 dispatches instead of 8. Two merges eliminate handoff overhead. Sequential by tier prevents Figma file conflicts.**

---

### 5. Pre-Dispatch Fixes Required

Before any pod starts, I need to update two existing frames:

1. **My Team (`17:2`):** Add 3 new team member cards (Taylor, Riley, Casey) to make the 2x3 grid. Update filter tab counts: "All 6", "Working 4", "Idle 0" (remove count), "Needs Attention 1".

2. **Home Dashboard (`24:2`):** Add Casey work entry ("Casey -- Organizing inbox -- 5m"). Update status strip: "4 Active / 1 Idle / 1 Needs Attention". Update spend card if needed.

These fixes take ~30 minutes and must complete before Tier 1 dispatch.

---

### 6. Design QA Gate

Every pod's output must pass the following before wiring:
- [ ] All frames named correctly ("Screen N -- [Name]")
- [ ] All frames exactly 1440x900
- [ ] Sidebar cloned from `18:2` (not rebuilt) on all main app screens
- [ ] Font usage matches spec (Syne for headings, Plus Jakarta Sans for body, correct weights)
- [ ] All colors use file variables, no hardcoded hex
- [ ] Card radius = 12px, shadow = shadow-md, border = 1px #E5E7EB
- [ ] Primary buttons use gradient fill
- [ ] Spacing uses only scale values (4/8/16/24/32)
- [ ] Sample data matches this brief exactly (names, numbers, statuses)
- [ ] Casey appears in all relevant data (team grids, billing charts, task assignments)

I will review each tier's output before the next tier dispatches.

---

### Sign-Off

This brief is approved for pod dispatch. All gaps are resolved. The design system is documented. The dispatch sequence is defined. The quality gate is established.

Pods Alpha+Beta (merged) are cleared for immediate dispatch -- instructions follow.

-- Leo, Design Lead
April 3, 2026
