# CEO Feedback Processing -- Round 1
## Diana (VP Product) + Leo (Design Lead)

**Date:** April 3, 2026
**Source:** CEO verbal review of Figma prototype (file `J1ht22xd1fMhT57kO0xkj5`)
**Status:** Categorized, fix instructions drafted, product specs outlined. Awaiting Diana sign-off before pod dispatch.

---

## FEEDBACK SUMMARY & CATEGORIZATION

| # | Feedback Item | Category | Owner | Priority | Timeline |
|---|---|---|---|---|---|
| 1 | Inconsistent navigation bar on screens 11-14 | Design Fix | Leo | P0-BLOCKING | Immediate -- pre-demo |
| 2 | Spacing and container sizing across screens | Design Fix | Leo | P1-HIGH | Immediate -- pre-demo |
| 3 | Button/filter styling inconsistency (Tasks vs Inbox) | Design Fix | Leo | P0-BLOCKING | Immediate -- pre-demo |
| 4 | Organization & hierarchy (who reports to whom) | Product Feature | Diana | P2-BACKLOG | Post-eMerge roadmap |
| 5 | Chat with agent/team member | Product Feature | Diana | P2-BACKLOG | Post-eMerge roadmap (spec now) |
| 6 | Reports destination | Product Feature | Diana | P2-BACKLOG | Clarify in current UX + post-eMerge |

**Demo-blocking items:** 1, 2, 3
**Backlog items:** 4, 5, 6

---

## SECTION 1: DESIGN FIXES (Leo owns, immediate)

### FIX-001: Navigation Bar Inconsistency on Team Member Detail Tabs

**Severity:** P0-BLOCKING -- CEO explicitly called this out. Inconsistency undermines polish.

**Affected Screens:**
- Screen 11: Team Member Detail -- Overview Tab
- Screen 12: Team Member Detail -- Tasks Tab
- Screen 13: Team Member Detail -- Work History Tab
- Screen 14: Team Member Detail -- Personality Tab

**Problem:**
The sidebar and/or top navigation bar on screens 11-14 looks visually different from the sidebar/nav pattern used on other main app screens (Home, My Team, Inbox, Tasks, etc.). This was produced by Design Pod Gamma, which built these four tabs as a group. The sidebar was supposed to be cloned from frame `18:2` (the My Team sidebar), per the consistency checklist in Part 6 of the Figma Prototype Plan. Either the clone drifted, or Gamma built a custom nav that diverges from the established pattern.

**What "correct" looks like (reference screens):**
- Screen 2 (My Team, frame `17:2`): This is the gold standard for sidebar styling. 8 nav items, consistent font, consistent active-state highlight, consistent width.
- Screen 3 (Home Dashboard, frame `24:2`): Same sidebar pattern.
- Screens 9-10 (Inbox): Same sidebar pattern.

**Fix instructions for Design Pod Gamma:**
1. Open screens 11, 12, 13, and 14 in Figma.
2. Delete the existing sidebar component on each screen.
3. Clone the sidebar from frame `18:2` (My Team screen) -- do NOT rebuild from scratch.
4. Ensure the sidebar active-state indicator highlights "My Team" on all four TM Detail screens (since TM Detail is a child of My Team).
5. Verify the page header (breadcrumb "My Team > Alex") matches the header typography and spacing pattern from other screens: Syne 800, 24px, left-aligned, with `space-lg` (24px) vertical gap to content.
6. Verify the tab bar (Overview | Tasks | Work History | Personality) is positioned consistently relative to the sidebar and header. Tab bar should align with the left edge of the content area, not the left edge of the viewport.
7. Run the Part 6 consistency checklist on all four screens before delivering.

**Verification criteria:**
- Screenshot all four TM Detail screens side-by-side with Home, My Team, and Inbox screens
- Sidebar must be pixel-identical across all screens
- Page header alignment and typography must match
- No visual "jump" when clicking between sidebar destinations in the prototype

---

### FIX-002: Spacing and Container Sizing Audit

**Severity:** P1-HIGH -- affects overall perceived quality across multiple screens.

**Affected Screens (audit all, fix as needed):**
- Screen 15 (Tasks List): **Explicitly called out** -- filter tabs are compressed/squished
- All other screens should be audited against the spacing scale

**Problem:**
Multiple screens feel "tight" -- insufficient padding inside containers, compressed vertical spacing between elements, and filter/tab elements that don't have enough breathing room. The design system specifies a spacing scale (`space-xs` through `space-3xl`: 4/8/16/24/32/48/64px) but it appears some screens are using tighter spacing than the scale dictates.

**Specific issue on Screen 15 (Tasks List):**
The filter tabs ("All, In Progress, Waiting on You, Completed") appear squished. These tabs likely have insufficient horizontal padding inside each tab and/or insufficient horizontal gap between tabs.

**What "correct" looks like:**
- Screens 18-19 (Inbox): The filter buttons for "Review Requests, Notifications, Escalations" are the CEO-approved gold standard for tab/filter spacing
- Inbox filter tabs appear to use: `space-md` (16px) horizontal padding inside each tab, `space-sm` (8px) gap between tabs, `space-md` (16px) vertical padding top/bottom

**Fix instructions for Design Pod (cross-pod audit):**
1. **Screen 15 priority fix:** Open Tasks List. Inspect the filter tab component. Increase horizontal padding to match Inbox filter tabs exactly. Measure the Inbox tabs and replicate the values pixel-for-pixel.
2. **Full audit pass:** Review every screen against the following spacing rules:
   - Card internal padding: `space-xl` (32px) minimum on all sides
   - Section gaps (between cards or content blocks): `space-lg` (24px) minimum
   - Filter/tab bar: `space-md` (16px) horizontal padding per tab, `space-sm` (8px) gap between tabs
   - Page content area: `space-xl` (32px) padding from sidebar edge and top header
   - List item vertical padding: `space-md` (16px) top and bottom per row
   - Button internal padding: `space-sm` (8px) vertical, `space-md` (16px) horizontal minimum
3. **Document findings:** For each screen where spacing is off, note the element, current value, and corrected value.

**Verification criteria:**
- Side-by-side comparison of Tasks List filter tabs and Inbox filter tabs must show identical spacing
- No element on any screen should have internal padding below `space-sm` (8px)
- Content area should never feel "edge-to-edge" -- breathing room is mandatory

---

### FIX-003: Button and Filter Styling Consistency

**Severity:** P0-BLOCKING -- CEO explicitly identified the quality gap between Inbox and Tasks screens.

**Affected Screens:**
- Screen 15 (Tasks List): filter tabs look bad
- Screen 16 (Task Detail): buttons look bad
- Screen 17 (New Task Dialog): buttons look bad
- The Send button (likely in Task Detail comment input or New Task Dialog) looks inconsistent

**Reference (gold standard):**
- Screens 9-10 (Inbox, Design Pod Epsilon): filter buttons between "Review Requests, Notifications, Escalations" look GOOD -- CEO explicitly approved this styling.

**Root cause analysis:**
Screens 15-17 were built by Design Pod Delta ("Tasks & Actions"). Screens 9-10 were built by Design Pod Epsilon ("The Inbox"). These two pods likely diverged on button/filter component styling. The fix is to standardize on Epsilon's implementation.

**What the Inbox filter buttons look like (to be replicated):**
- Tab/filter container: horizontal row with subtle background or border-bottom track
- Individual tab: `body-lg` typography (Plus Jakarta Sans 500, 16px), `--raava-gray` (#6B7280) text for inactive, `--raava-blue` (#224AE8) text for active
- Active indicator: solid underline or background highlight in `--raava-blue` or brand gradient
- Tab padding: generous -- `space-md` (16px) horizontal, `space-sm` (8px) vertical
- Border radius on tab pills (if pill-style): `radius-md` (8px)
- Hover state: `--raava-hover` (#F3F4F6) background

**Fix instructions for Design Pod Delta:**

**Screen 15 (Tasks List) -- Filter Tabs:**
1. Delete the existing filter tab component.
2. Clone the filter tab component from Screen 9 (Inbox -- Review Requests tab).
3. Update the tab labels to: "All", "To Do", "In Progress", "Done", "Needs Review", "Stuck" (per product spec Section 5).
4. Ensure the active tab state matches the Inbox active tab state exactly.
5. Verify spacing matches FIX-002 guidelines.

**Screen 16 (Task Detail) -- Buttons:**
1. Audit all buttons on the Task Detail screen: Reassign, Status dropdown trigger, Add Comment submit button.
2. Primary action buttons must use: brand gradient fill, white text, Syne 600, `radius-md` (8px), `shadow-sm`, padding `space-sm` vertical / `space-md` horizontal.
3. Secondary/ghost buttons must use: transparent background, `--raava-blue` text, 1px `--raava-border` border, same radius and padding.
4. The "Add Comment" / "Send" button specifically: must match the primary button style (gradient fill), sized consistently with other primary buttons in the app.
5. Status dropdown trigger should look like a secondary button, not a bare text link.

**Screen 17 (New Task Dialog) -- Buttons:**
1. "Create Task" button: must be a primary gradient button, full-width at the bottom of the dialog, matching the "Hire Alex" button energy (though less dramatic -- standard primary, not hero-sized).
2. "Cancel" button: ghost style, left of Create Task.
3. Both buttons should have identical height and vertical alignment.
4. Dialog footer padding: `space-lg` (24px) from the last form field, `space-xl` (32px) from dialog edges.

**Verification criteria:**
- Extract every button on screens 15, 16, 17 and compare to Inbox buttons
- Primary buttons must be visually identical (gradient, typography, padding, radius, shadow)
- Secondary buttons must be visually identical (border, typography, padding, radius)
- Filter tabs must be visually identical to Inbox filter tabs
- No screen should have a "one-off" button style that exists nowhere else

---

## SECTION 2: PRODUCT FEATURES (Diana owns, backlog)

### FEATURE-001: Organization & Team Hierarchy

**Source:** CEO feedback item #4
**Priority:** P2-BACKLOG (not blocking demo, but CEO wants it on the roadmap)
**Sprint target:** Post-eMerge, Sprint N+2

**Context:**
- CEO liked Paperclip's org chart concept (who reports to whom)
- Wants to retain the concept of team hierarchy within Raava
- Has additional notes coming on "three styles of a team" -- we should wait for those before finalizing the spec
- The Org page was marked "hidden" in the original product spec -- CEO wants it back in some form

**Current state in the product:**
- The product spec (Section 3, My Team) already includes an "Org chart toggle" with "reports to" terminology
- The My Team card grid is the default view; the org tree is a secondary toggle
- However, no dedicated "Organization" page exists as a sidebar destination
- The original Paperclip Agents page had an org tree view, but it was de-emphasized in the Raava spec

**Diana's initial product recommendation:**

The org hierarchy feature should serve SMB users (Carlos, Vanessa), not enterprise. This means:

**Option A: Lightweight hierarchy within My Team (recommended for v1)**
- Keep the org chart toggle on My Team page (already specced)
- Add a simple "reports to" dropdown on Team Member Detail > Settings tab
- When toggled, My Team shows a tree view: CEO (human) at top, team members grouped by project or role
- No dedicated page -- it's a view mode, not a destination

**Option B: Dedicated Organization page (evaluate after CEO shares "three styles" notes)**
- New sidebar item: "Organization"
- Shows team structure, reporting lines, role groupings
- Could support the "three styles" concept once CEO elaborates
- More effort, more nav clutter, may be overkill for 5-10 AI team members

**Option C: Project-based hierarchy (simplest)**
- No explicit reporting hierarchy
- Team members are grouped by project
- Project page shows which team members are assigned
- Hierarchy is implicit, not explicit

**Recommendation:** Start with Option A for the next sprint. Wait for CEO's "three styles of a team" notes before committing to Option B. Option C is too simple -- the CEO explicitly wants reporting relationships.

**Action items:**
- [ ] Wait for CEO's "three styles of a team" notes
- [ ] Spec the "reports to" field and org tree view for My Team
- [ ] Add "Organization" as a candidate sidebar item for post-eMerge sprint planning
- [ ] Revisit after CEO input on the three styles concept

---

### FEATURE-002: Chat with Agent/Team Member

**Source:** CEO feedback item #5
**Priority:** P2-BACKLOG (significant feature gap -- needs spec before building)
**Sprint target:** Post-eMerge, Sprint N+1 or N+2

**Context:**
- CEO expected a chat interface -- talk to your AI team member like Slack
- No such feature exists in the current prototype or product spec
- This is a natural extension of the "team member as a person" metaphor
- If users think of team members as people, they will want to message them

**Diana's product analysis:**

This is a legitimate feature gap. The current UX only supports interacting with team members through tasks (create a task, wait for output). There's no way to have a quick conversation: "Hey Alex, what's the status of the Anderson deal?" or "Can you pull the Q1 numbers real quick?"

The chat interface would differentiate Raava further from Zapier/Make (which have no conversational interface) and from raw ChatGPT (which has no persistent agent identity or tool access).

**Where should chat live? Three options:**

**Option A: Tab in Team Member Detail (recommended for v1)**
- Add a 5th tab to TM Detail: Overview | Tasks | Work History | Personality | Chat
- Chat tab shows a conversational interface: message input at bottom, message history above
- Messages are sent to the team member's underlying agent (Hermes)
- The agent can respond conversationally AND take actions (e.g., "Pull the Q1 report" triggers tool use)
- Pros: Natural location (you're already on the team member's profile), low nav disruption, scoped to one team member
- Cons: Buried one click deep, not as discoverable as a top-level page

**Option B: Dedicated "Messages" or "Chat" sidebar item**
- New sidebar destination showing all recent conversations across all team members
- Like Slack -- a list of conversations, click into one to chat
- Pros: Highly discoverable, feels like a first-class feature, supports multi-team-member conversations
- Cons: More engineering effort, adds nav clutter, may be premature for v1

**Option C: Floating chat panel (Intercom-style)**
- Persistent chat bubble in bottom-right corner
- Click to open a panel, select a team member, start chatting
- Pros: Always available, doesn't require navigation
- Cons: Feels bolted-on, not native to the app's information architecture, harder to show history

**Recommendation:** Option A for v1 (Chat tab in TM Detail), with Option B as the v2 evolution if chat becomes a primary interaction mode. Option C is rejected -- it undermines the "real team" metaphor by making chat feel like a support widget.

**Interaction model for the Chat tab:**
- Message input bar at the bottom (like iMessage/Slack)
- Messages appear in chronological order, most recent at bottom
- Agent responses are styled differently from user messages (different background color, avatar on left)
- When the agent takes an action (e.g., queries CRM), show a "working" indicator followed by an action card: "I pulled the Q1 report from Salesforce. Here's the summary: [collapsed details]"
- Typing indicator when the agent is processing
- Chat history persists across sessions
- Quick-action suggestions above the input: "What are you working on?", "Pull this week's numbers", "Send a follow-up to [lead]"

**Backend implications (flag for Marcus/CTO):**
- Requires a real-time messaging channel to the Hermes agent
- May use existing Hermes conversational endpoint or need a new one
- Chat history needs persistence (database, not just in-memory)
- Tool-use within chat context (agent can execute skills mid-conversation)

**Action items:**
- [ ] Draft full product spec for Chat tab (Diana, this sprint)
- [ ] Marcus to confirm Hermes supports conversational mode alongside task execution
- [ ] Add Chat tab to Design Pod Gamma's scope for next sprint
- [ ] Determine if chat messages should appear in the Activity stream on Task Detail
- [ ] Define escalation model: if user asks something in chat that should be a task, how does it transition?

---

### FEATURE-003: Reports Destination

**Source:** CEO feedback item #6
**Priority:** P2-BACKLOG (needs clarification more than new build)
**Sprint target:** Clarify now, build if needed post-eMerge

**Context:**
- CEO sees Inbox/Notifications but no dedicated "Reports" destination
- Specific scenario: Data Analyst (Sam) pulls weekly metrics report -- where does it land?
- CEO is unsure if the current UX handles this or if there's a gap

**Diana's analysis:**

This may be a UX clarity problem more than a missing feature. Here's how reports currently flow:

1. CEO creates a task: "Pull this week's key metrics and create a summary report"
2. Sam (Data Analyst) works on the task (creates a Work Session)
3. The report output is part of the Work Session transcript / task output
4. The task status changes to "Done" or "Needs Review"
5. A notification appears in Inbox (Notifications tab)
6. Carlos can view the report by: Inbox notification -> Task Detail -> Work Session transcript

**The problem:** This works mechanically, but it's not obvious. Carlos has to navigate to a task and expand a work session to see the report. There's no "here is your report" moment. It feels buried.

**Three options:**

**Option A: Reports are task outputs, but surfaced better (recommended for v1)**
- When a task produces a "deliverable" (report, draft, analysis), surface it prominently on the Task Detail page -- not buried in the work session transcript
- Add a "Deliverables" section to Task Detail, above the activity stream
- Deliverables are rendered richly: formatted text, tables, charts (not raw markdown in a transcript)
- The Inbox notification for a completed report task includes a "View Report" direct link
- Pros: No new pages, leverages existing architecture, makes task outputs feel valuable
- Cons: Still tied to the task paradigm -- users have to think in tasks

**Option B: Dedicated Reports page**
- New sidebar item: "Reports"
- Aggregates all deliverable-type outputs from all team members
- Filterable by team member, date range, type
- Pros: Clear destination for "where are my reports?", feels comprehensive
- Cons: Engineering effort, partially duplicates Task list functionality, may be empty for non-analyst roles

**Option C: Reports appear in Inbox as a new tab**
- Add a 4th Inbox tab: "Review Requests | Notifications | Escalations | Reports"
- Reports tab shows completed deliverables from team members
- Pros: Low nav impact (extends existing Inbox), keeps reports in the "things that need my attention" mental model
- Cons: Inbox gets overloaded, not all reports need immediate attention

**Recommendation:** Option A for v1. Enhance Task Detail with a "Deliverables" section so report outputs are visually prominent, not buried in transcripts. Add a "View Report" link in Inbox notifications for report-type tasks. This addresses the CEO's concern without adding a new page.

Evaluate Option B for v2 if customers consistently ask "where are my reports?" after using the product.

**Action items:**
- [ ] Spec "Deliverables" section for Task Detail page (Diana, next sprint)
- [ ] Define which task types produce "deliverables" vs. just activity (e.g., "Pull weekly metrics" produces a report; "Follow up on leads" produces sent emails -- different output types)
- [ ] Update Inbox notification template for report-type tasks to include "View Report" link
- [ ] Add "Reports" to the post-eMerge feature evaluation list
- [ ] Validate with CEO: "When Sam finishes the weekly report, you'll get a notification in your Inbox that says 'Sam completed the weekly metrics report. [View Report].' Clicking that takes you directly to the formatted report on the task page. Does that match your expectation?"

---

## SECTION 3: PRIORITY ASSESSMENT -- WHAT BLOCKS THE DEMO

### Must fix before eMerge (April 22)

| Item | Type | Effort Est. | Blocks Demo? |
|---|---|---|---|
| FIX-001: Nav bar consistency on screens 11-14 | Design fix | 2-3 hours (Gamma rework) | YES -- CEO will show TM Detail in demo |
| FIX-002: Spacing audit + Tasks List filter fix | Design fix | 3-4 hours (cross-pod audit) | YES -- compressed UI looks unpolished |
| FIX-003: Button/filter styling on screens 15-17 | Design fix | 3-4 hours (Delta rework) | YES -- Tasks screens are in demo Journey 3 |

**Total estimated fix effort:** 8-11 hours of design work.

**Recommended approach:** One focused design fix sprint. Assign FIX-001 back to Pod Gamma, FIX-003 to Pod Delta. FIX-002 requires a cross-pod audit pass (Leo leads, touches every screen). Can be parallelized across 1-2 days.

### Can wait until post-eMerge

| Item | Type | Sprint Target | Notes |
|---|---|---|---|
| FEATURE-001: Org hierarchy | Product spec + design | Sprint N+2 | Waiting on CEO's "three styles" notes |
| FEATURE-002: Chat with TM | Product spec + design + backend | Sprint N+1 or N+2 | Spec can start now; build after eMerge |
| FEATURE-003: Reports destination | Product spec + design tweak | Sprint N+1 | Mostly a UX clarity fix (Deliverables section on Task Detail) |

### Not blocking, but should be validated with CEO before demo

The following assumption from FEATURE-003 should be confirmed with the CEO before the eMerge demo, since the demo script includes the Data Analyst scenario:

> "When Sam finishes the weekly report, you'll get a notification in your Inbox that says 'Sam completed the weekly metrics report. [View Report].' Clicking that takes you directly to the formatted report on the task page."

If the CEO's mental model differs from this, we need to know before April 22 -- even if we don't build a dedicated Reports page, the demo script needs to address "where do reports go?" convincingly.

---

## SECTION 4: CROSS-CUTTING OBSERVATIONS

### Design System Enforcement Gap

Three of the six CEO feedback items (nav consistency, spacing, button styling) are fundamentally about **inconsistency between pods**. The consistency checklist (Part 6 of the Figma Prototype Plan) exists but was not enforced rigorously enough. 

**Leo's recommendation:** After the fixes are applied, institute a **cross-pod consistency review** as a hard gate before any design work reaches the CEO. This is analogous to the QA gate for code. Every screen gets checked against a reference screen (Inbox, screens 9-10, is now the CEO-designated gold standard) before being marked done.

**Addition to the consistency checklist:**
- [ ] Filter/tab components cloned from Inbox (screens 9-10) reference, not rebuilt
- [ ] All buttons compared side-by-side with Inbox action buttons
- [ ] Sidebar pixel-identical to frame `18:2` on every screen (screenshot overlay test)

### The Inbox as Design Reference

The CEO explicitly called out the Inbox (screens 9-10, Design Pod Epsilon) as the quality bar. This is significant and should be documented:

**Convention:** Screens 9-10 (Inbox -- Review Requests and Notifications tabs) are the visual quality reference for the entire prototype. When in doubt about how a component should look, refer to the Inbox first. This applies to: filter tabs, action buttons, card layouts, list row styling, and spacing.

This convention should be logged in DECISIONS.md when the fixes are committed.

---

## SECTION 5: OPEN ITEMS REQUIRING CEO INPUT

These are not questions -- they are recommendations with context. The CEO decides.

### 1. Reports Clarification

**Situation:** CEO flagged that there's no obvious "Reports" destination. We analyzed three options.
**Recommendation:** Enhance Task Detail with a "Deliverables" section (Option A) rather than adding a new Reports page. This surfaces report outputs prominently without adding navigation complexity.
**What we need from the CEO:** Confirmation that this approach matches their expectation, OR direction to spec a dedicated Reports page.

### 2. Chat Feature Timing

**Situation:** Chat with team members is a legitimate feature gap. We've drafted a product concept.
**Recommendation:** Spec the feature now (this sprint), build it post-eMerge (Sprint N+1 or N+2). For the eMerge demo, lean on the task-based interaction model.
**What we need from the CEO:** Agreement on timing, and whether chat should be mentioned/teased in the demo script even though it won't be built yet.

### 3. "Three Styles of a Team" Notes

**Situation:** CEO mentioned having notes on "three styles of a team" that inform the org hierarchy feature.
**Action needed:** CEO to share these notes when ready. Diana will incorporate into the org hierarchy spec.
**No decision needed yet** -- just a flag that we're waiting on this input.

---

*Processed by Diana (VP Product) and Leo (Design Lead).*
*Design fixes are scoped and ready for pod dispatch pending Diana's sign-off.*
*Product features are specced at concept level and queued for backlog prioritization.*
*No pods dispatched from this document -- fix instructions only.*
