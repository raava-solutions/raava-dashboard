# RAAVA DASHBOARD -- DETAILED USER FLOWS

**Produced by:** Diana (VP Product) + Leo (Design Lead)
**Date:** April 3, 2026
**Status:** Ready for engineering handoff and Figma production
**Audience:** Frontend Pod, Backend Pod, QA Pod, CEO

---

## Table of Contents

1. [Flow 1: Adding a Team Member (Full "Hire" Flow)](#flow-1-adding-a-team-member-full-hire-flow)
2. [Flow 2: Adding a Tool to a Team Member](#flow-2-adding-a-tool-to-a-team-member)
3. [Flow 3: Updating/Removing a Tool](#flow-3-updatingremoving-a-tool)
4. [Flow 4: Updating a Team Member's Role/Personality](#flow-4-updating-a-team-members-rolepersonality)
5. [Estimated Figma Screens](#estimated-figma-screens)

---

# FLOW 1: ADDING A TEAM MEMBER (Full "Hire" Flow)

## Flow Diagram

```
ENTRY POINTS
  |
  |-- [A] "Hire" button (My Team page, top right)
  |-- [B] "Hire a Team Member" quick action (Home page)
  |-- [C] Onboarding Wizard Step 2 (first-time user)
  |-- [D] Empty state CTA (My Team, 0 members)
  |
  v
+========================+
| 1. ROLE SELECTION      |  Screen: HireWizard_RoleSelect
|    (Card Grid)         |
+========================+
  |
  | User clicks a role card
  v
+========================+
| 2. ROLE DETAIL /       |  Screen: HireWizard_RoleSelect (expanded state)
|    CONFIRMATION        |  (detail panel slides open below grid)
+========================+
  |
  | User clicks "Next" (confirming role)
  v
+========================+
| 3. CREDENTIAL SETUP    |  Screen: HireWizard_Credentials
|                        |
+========================+
  |
  | User enters creds OR clicks "Skip for now"
  v
+========================+
| 4. NAMING &            |  Screen: HireWizard_NameLaunch
|    PERSONALIZATION     |
+========================+
  |
  | User clicks "Hire [Name]"
  v
+========================+
| 5. PROVISIONING        |  Screen: HireWizard_Provisioning (loading overlay)
|    (Loading)           |
+========================+
  |
  | Success              | Failure
  v                      v
+===============+   +===============+
| 6. SUCCESS    |   | 6a. ERROR     |
|    STATE      |   |     STATE     |
+===============+   +===============+
  |                      |
  | User clicks CTA      | User clicks "Retry" or "Contact Support"
  v                      v
+========================+
| 7. POST-HIRE LANDING   |  Screen: MyTeam or TeamMemberDetail
+========================+
```

---

## Entry Point Details

### Entry A: "Hire" Button on My Team Page

- **Location:** Top-right of the My Team page header, next to the filter dropdown.
- **Appearance:** Brand gradient background button, white text, "Hire" with a plus icon to the left. `Plus Jakarta Sans 500, 14px`. Height: 40px. Border-radius: `radius-md` (8px).
- **Behavior:** Click opens the Hire Wizard as a full-screen modal overlay (not a page navigation). The URL does NOT change. The modal is layered over the current page with a semi-transparent backdrop (`rgba(0,0,0,0.5)`).
- **Keyboard:** Button is focusable. Enter/Space activates. Escape closes wizard from any step.

### Entry B: "Hire a Team Member" Quick Action on Home

- **Location:** Home page, below the Team Status Strip, as part of a "Quick Actions" row (not currently in the product spec -- this is an addendum).
- **Appearance:** Ghost button style, left-aligned, icon of a person with a plus badge. "Hire a Team Member" label. `Plus Jakarta Sans 500, 14px`, color: `--raava-blue`.
- **Behavior:** Opens the same Hire Wizard modal. Identical flow to Entry A.
- **Condition:** This quick action only appears if the user has fewer than 6 team members (i.e., there is at least one role still available to hire). If all 6 roles are occupied, this action is hidden.

### Entry C: First-Time Onboarding (Step 2)

- **Location:** The onboarding wizard that fires on first visit after account creation. Step 1 is "Create Your Company." Step 2 IS the Hire flow.
- **Difference from Entries A/B:** The wizard progress indicator shows 4 steps (`[1]--[2*]--[3]--[4]`). The back button on Step 2 goes to Step 1 (company setup), not to My Team. The overall wizard chrome is the onboarding wizard, not the standalone hire modal.
- **Behavior:** All role selection, credential, and naming screens are identical. The only difference is navigation context (back goes to Step 1, not to the previous page).

### Entry D: Empty State CTA on My Team

- **Location:** Center of the My Team page when 0 team members exist.
- **Appearance:**
  - Illustration: An abstract, friendly illustration of empty desk/chairs (Leo to design, consistent with Raava geometric style).
  - Heading: "Your team is empty" -- `Syne 800, 24px, --raava-ink`.
  - Subtext: "Hire your first AI team member. Pick a role, name them, and they'll start working in minutes." -- `Plus Jakarta Sans 400, 14px, --raava-gray`.
  - CTA button: Brand gradient background, "Hire Your First Team Member", white text, `Plus Jakarta Sans 500, 16px`. Height: 48px. Width: auto (padding 32px horizontal). Border-radius: `radius-md`.
- **Behavior:** Click opens the Hire Wizard modal, identical to Entry A.

---

## Step 1: Role Selection (Card Grid)

### Screen: `HireWizard_RoleSelect`

**Layout:**
- Full-screen modal overlay with white background (`--raava-card`).
- Top: Step indicator (4 dots/steps, step 2 active for onboarding; for standalone hire, show 3 steps: Role > Setup > Launch).
- Header: "Hire a new team member" -- `Syne 800, 24px, --raava-ink`, centered.
- Subheader: "Pick a role. You can customize everything later." -- `Plus Jakarta Sans 400, 14px, --raava-gray`, centered.
- Card grid: 2 rows x 3 columns, centered. Gap: `space-lg` (24px) between cards.
- Footer: "Back" (ghost button, left) and "Next" (primary button, right, disabled until a role is selected).

**Card Specifications (each role card):**

```
+--------------------------------------------------+
|                                                  |
|     [Role Icon -- 56px rounded square]           |
|     gradient-filled background per role          |
|                                                  |
|     Sales Assistant                              |
|     (Syne 800, 20px, --raava-ink)               |
|                                                  |
|     Follows up with leads, drafts               |
|     proposals, and keeps your CRM updated.      |
|     (Plus Jakarta Sans 400, 14px, --raava-gray) |
|                                                  |
|     [Gmail] [HubSpot] [Docs] +3                 |
|     (tool icons 24px, pill badges)              |
|                                                  |
+--------------------------------------------------+
```

- **Dimensions:** 300px wide x 220px tall (desktop). Full-width minus 32px margin on mobile.
- **Border:** `1px solid --raava-border (#E5E7EB)`, `radius-lg` (12px).
- **Background:** `--raava-card (#FFFFFF)`.
- **Padding:** `space-lg` (24px).

**Role-to-Icon Mapping:**

| Role | Icon | Accent Color | Tool Badges (visible on card) |
|---|---|---|---|
| Sales Assistant | Briefcase with upward arrow | `--raava-blue` (#224AE8) | Gmail, HubSpot, Docs (+3) |
| Operations Manager | Interlocking gears | `--raava-purple` (#716EFF) | Calendar, Sheets, Tasks (+3) |
| Customer Support | Headset | `--raava-teal` (#00BDB7) | Zendesk, Gmail, KB (+2) |
| Data Analyst | Bar chart with magnifying glass | Blue-Purple blend | SQL, Sheets, Charts (+2) |
| Marketing Coordinator | Megaphone with sparkles | Purple-Teal blend | Hootsuite, Analytics, Content (+2) |
| General Assistant | Raava star mark | Full gradient | Gmail, Docs, Research (+2) |

**Interaction States:**

| State | Visual Treatment |
|---|---|
| **Default** | White card, `1px solid --raava-border`. No shadow. |
| **Hover** | Border transitions to `1px solid rgba(34,74,232,0.4)`. Box shadow: `0 4px 16px rgba(34,74,232,0.12)`. Transform: `translateY(-2px)`. Cursor: pointer. Transition: 200ms ease. |
| **Selected** | Border: `2px solid` with brand gradient (shrinks card content by 1px to prevent layout jump, or use outline instead of border). Checkmark badge in top-right corner: 24px circle, gradient fill, white checkmark icon (2px stroke). `shadow-glow`. Scale: 1.0 (no scale-up -- we use the glow instead to avoid layout reflow). |
| **Disabled / Coming Soon** | Opacity: 0.5. "Coming Soon" pill badge overlaid on center of card (`--raava-gray` background, white text, `Plus Jakarta Sans 500, 12px`). No hover effect. Cursor: default. Click does nothing. No tooltip -- the pill badge is explanation enough. |

**Browsing Behavior:**

1. Cards are laid out in a static 2x3 grid. No scrolling within the grid (all 6 visible at once on desktop).
2. On tablet: 2x3 grid is preserved but cards shrink to fit.
3. On mobile: single-column stack, 6 cards vertically. "Next" button is sticky at bottom.
4. Hovering a card shows the hover state. Moving away restores default.
5. **Clicking a card SELECTS it.** This is a single action -- click selects. There is no separate "detail expansion then select" two-step. Selection is immediate.
6. When a card is selected, the expanded detail panel (see Step 2) slides open below the grid with a 300ms ease-out animation.
7. **Only one card can be selected at a time.** Clicking a different card deselects the previous one (checkmark fades out, border returns to default) and selects the new one. The detail panel content cross-fades to the new role's details.
8. **Clicking the already-selected card deselects it.** The checkmark fades, the detail panel slides closed (300ms ease-in), and the "Next" button returns to disabled state.
9. **Coming Soon roles:** If Marcus confirms that fewer than 6 roles have working Hermes skills by April 5, the unavailable roles show the "Coming Soon" disabled state. They remain in the grid to communicate the product's breadth, but they are not selectable. Example: if only Sales Assistant, Operations Manager, and General Assistant have working skills, the other three show "Coming Soon."

**Keyboard Navigation:**

- Tab cycles through cards in grid order (left-to-right, top-to-bottom).
- Enter/Space on a focused card selects it.
- Arrow keys move focus within the grid.
- Focus ring: `2px solid --raava-blue`, offset 2px.

**Validation:**

- "Next" button is disabled (`opacity: 0.5, cursor: not-allowed`) until a role is selected.
- No error message needed -- the disabled button is sufficient feedback.
- If user somehow navigates to Step 3 without a selection (direct URL manipulation), redirect back to Step 2.

---

## Step 2: Role Detail / Confirmation

### Screen: `HireWizard_RoleSelect` (expanded state -- same screen, not a new page)

**Trigger:** User clicks a role card in the grid above.

**Layout:** An expanded detail panel slides open between the card grid and the footer. The cards remain visible above. The page content shifts down to accommodate the panel. On mobile, the panel appears below the selected card and the user may need to scroll down.

**Animation:** Panel slides in from height 0 to auto height, 300ms ease-out. Content inside fades in with a 100ms delay after the panel starts opening.

**Panel Content:**

```
+---------------------------------------------------------------+
|                                                               |
|  [Role Icon 80px]    Sales Assistant                          |
|                      (Syne 800, 22px, --raava-ink)            |
|                                                               |
|                      Follows up with leads, drafts proposals, |
|                      and keeps your CRM updated.              |
|                      (Plus Jakarta Sans 400, 14px, --gray)    |
|                                                               |
|  ---- Divider (1px --raava-border) ----                       |
|                                                               |
|  HOW THEY WORK                                                |
|  (Plus Jakarta Sans 500, 12px, uppercase, --raava-gray,       |
|   letter-spacing 0.05em)                                      |
|                                                               |
|  Professional, proactive, follows up persistently but not     |
|  aggressively. Always updates CRM after every interaction.    |
|  Flags hot leads for your immediate attention.                |
|  (Plus Jakarta Sans 400, 14px, --raava-ink)                   |
|                                                               |
|  ---- Divider ----                                            |
|                                                               |
|  TOOLS & SKILLS                                               |
|  (section header, same style)                                 |
|                                                               |
|  [Gmail icon 20px] Email Send & Read                          |
|  [HubSpot icon 20px] CRM Read & Write                        |
|  [Docs icon 20px] Document Drafting                           |
|  [Calendar icon 20px] Calendar Read                           |
|  (Plus Jakarta Sans 400, 14px, --raava-ink, per line.         |
|   Icon + label rows, 8px gap between rows)                    |
|                                                               |
|  ---- Divider ----                                            |
|                                                               |
|  WHAT THEY'LL NEED FROM YOU                                   |
|                                                               |
|  [Lock icon 16px, --raava-gray] Gmail API Key                 |
|  [Lock icon 16px, --raava-gray] CRM API Key (HubSpot or      |
|                                  Salesforce)                  |
|  (Plus Jakarta Sans 400, 14px, --raava-gray)                  |
|                                                               |
|  These are set up in the next step.                           |
|  (Plus Jakarta Sans 400, 12px, --raava-gray, italic)          |
|                                                               |
|  ---- Divider ----                                            |
|                                                               |
|  EXAMPLE FIRST TASK                                           |
|                                                               |
|  "Review my recent leads and draft follow-up emails for       |
|   anyone who hasn't responded in 3+ days."                    |
|  (Plus Jakarta Sans 400, 14px, --raava-ink, italic,           |
|   left-border 3px --raava-blue, padding-left 12px --          |
|   blockquote style)                                           |
|                                                               |
+---------------------------------------------------------------+
```

**Per-Role Detail Content:**

| Role | "How They Work" | Tools & Skills | Credentials Needed |
|---|---|---|---|
| **Sales Assistant** | Professional, proactive, follows up persistently but not aggressively. Always updates CRM after every interaction. Flags hot leads for your immediate attention. | Email Send & Read, CRM Read & Write, Document Drafting, Calendar Read | Gmail API Key, CRM API Key (HubSpot or Salesforce) |
| **Operations Manager** | Detail-oriented and organized. Proactively identifies blockers and suggests solutions. Communicates status updates clearly. Prioritizes by impact and urgency. Escalates when something is stuck for more than 24 hours. | Task Management, Calendar Read & Write, Spreadsheet Read & Write, Email Send | Google Workspace API Key |
| **Customer Support** | Patient and empathetic. Always acknowledges the customer's frustration before solving the problem. Uses clear, simple language. Never makes promises that can't be kept. Escalates refunds, account access, and legal issues to humans. | Help Desk Read & Write, Email Send & Read, Knowledge Base Search | Zendesk/Freshdesk API Key, Email API Key |
| **Data Analyst** | Meticulous and methodical. Always shows their work -- includes the query, the data source, and methodology. Presents findings with context: what changed, why it matters, what to do about it. Flags data quality issues. Defaults to visualizations when they make the point clearer. | SQL Query, Spreadsheet Read & Write, Visualization Create, Report Draft | Database Connection String (read-only), Google Sheets API Key |
| **Marketing Coordinator** | Creative and brand-conscious. Writes in the company's voice. Drafts multiple options for every piece of content. References past performance when recommending what to post. Never publishes without human approval. Thinks in campaigns, not individual posts. | Social Media Post & Analytics, Content Draft, Analytics Read, Email Send | Hootsuite/Buffer API Key, Google Analytics API Key |
| **General Assistant** | Capable and resourceful. Adapts to whatever is needed. Asks clarifying questions when a task is ambiguous rather than guessing. Organized, thorough, and proactive about next steps. Communicates what they've done and what they recommend doing next. | Email Send & Read, Document Draft, Web Research, Spreadsheet Read | Gmail API Key (optional) |

**Premium Add-ons (Future):**

Below the Tools & Skills section, a placeholder area will be designed but NOT implemented for launch:

```
  PREMIUM CAPABILITIES (Coming Soon)
  [Lock icon] Advanced Analytics Pack
  [Lock icon] Multi-CRM Sync
  (grayed out, non-interactive, shown only if design has space)
```

Diana's note: Do NOT build this for v1. It is a design consideration so the layout can accommodate it later without a redesign. Leo should leave vertical space in the Figma comp.

**Changing Selection:**

- The user can click a different card at any time. The detail panel cross-fades to the new role's content (150ms fade-out, 150ms fade-in).
- The "Next" button remains enabled as long as any card is selected.
- The user does NOT need to "confirm" in the detail panel -- it is informational only. The selection is made by clicking the card.

**"Next" Button Behavior:**

- Enabled (full opacity, gradient background) when a role is selected.
- Click advances to Step 3 (Credential Setup).
- Transition: current screen slides left, Step 3 slides in from right. 300ms ease.

---

## Step 3: Credential Setup

### Screen: `HireWizard_Credentials`

**Layout:**
- Step indicator updated (step 3 active).
- Header: "Set up [Role Title]'s tools" -- `Syne 800, 24px, --raava-ink`, centered.
  - Example: "Set up Sales Assistant's tools"
- Subheader: "Your credentials are stored securely in a vault." -- `Plus Jakarta Sans 400, 14px, --raava-gray`, centered.
- Below subheader: small lock icon (16px, `--raava-gray`) followed by "Stored in a secure vault (1Password). Never visible in plaintext after setup." -- `Plus Jakarta Sans 400, 12px, --raava-gray`.
- Credential input cards: stacked vertically, one per required credential.
- Footer: "Back" (ghost button), "Skip for now" (text link, `--raava-gray`), "Next" (primary button).

**Credential Input Card Specification:**

```
+-------------------------------------------------------+
|  Gmail API Key                         [How to get?]  |
|  (Label: Plus Jakarta Sans 500, 14px, --raava-ink)    |
|  (Help link: Plus Jakarta Sans 400, 12px, --raava-blue|
|   underline on hover, opens in new tab)               |
|                                                       |
|  +-------------------------------------------+ [Eye]  |
|  | ****************************************  |  icon  |
|  +-------------------------------------------+        |
|  (Input: Plus Jakarta Sans 400, 14px.                 |
|   type="password" by default.                         |
|   Eye icon toggles show/hide.                         |
|   Border: 1px solid --raava-border.                   |
|   Border-radius: radius-md (8px).                     |
|   Height: 44px. Padding: 0 12px.)                     |
|                                                       |
|  [Status icon] Status message                         |
|  (Below input, 8px gap)                               |
+-------------------------------------------------------+
```

**Per-Role Credential Fields:**

| Role | Field 1 | Field 2 | Field 3 |
|---|---|---|---|
| **Sales Assistant** | Gmail API Key | CRM API Key -- with sub-selector: "Which CRM?" dropdown (HubSpot / Salesforce / Pipedrive) appearing before the API key field | -- |
| **Operations Manager** | Google Workspace API Key (covers Calendar, Sheets, Gmail) | -- | -- |
| **Customer Support** | Help Desk API Key -- with sub-selector: "Which help desk?" dropdown (Zendesk / Freshdesk / Intercom) | Email API Key (Gmail or SMTP) | -- |
| **Data Analyst** | Database Connection String (read-only) -- with helper text: "Format: postgresql://user:pass@host:port/dbname" | Google Sheets API Key | -- |
| **Marketing Coordinator** | Social Media API Key -- with sub-selector: "Which platform?" dropdown (Hootsuite / Buffer) | Google Analytics API Key | -- |
| **General Assistant** | Gmail API Key (marked "Optional" in label) | -- | -- |

**Credential fields are presented ALL AT ONCE, not sequentially.** All fields for the selected role are visible on the same screen, stacked vertically. If there are two credentials, both are visible. The user can fill them in any order.

**Sub-Selector Behavior (CRM, Help Desk, Social Media):**

When a credential has multiple provider options:

1. A dropdown appears ABOVE the API key input field.
2. Dropdown label: "Which CRM do you use?" / "Which help desk?" / "Which platform?"
3. Dropdown options are pill-style selectors (not a native `<select>`), horizontally laid out:
   ```
   Which CRM do you use?
   [ HubSpot ]  [ Salesforce ]  [ Pipedrive ]
   ```
4. Each pill: `Plus Jakarta Sans 500, 12px`, border `1px solid --raava-border`, `radius-sm` (6px), padding `8px 16px`. Selected: `--raava-blue` background, white text.
5. Selecting a provider updates the API key input label: "HubSpot API Key" / "Salesforce API Key".
6. The "How to get this key" help link updates to be provider-specific.

**Input Field Behavior:**

1. **Empty state:** Placeholder text: "Paste your API key here" -- `Plus Jakarta Sans 400, 14px, --raava-gray at 50% opacity`.
2. **Typing/pasting:** Characters appear masked (`*`) by default. The eye icon in the right side of the input toggles between masked and visible.
3. **Eye icon:** 20px, `--raava-gray`. Click toggles input type between `password` and `text`. Icon changes from eye-closed to eye-open. Tooltip: "Show" / "Hide".

**Validation Behavior:**

Validation fires on blur (user clicks/tabs away from the field) OR 1 second after the last keystroke (debounced). It does NOT fire on every keystroke.

| Validation State | Status Icon | Status Message | Input Border | Timing |
|---|---|---|---|---|
| **Empty** | Gray circle with dash | "Required" (or "Optional" for General Assistant's Gmail key) | `--raava-border` | Immediate |
| **Validating** | Spinning loader (16px) | "Checking..." | `--raava-blue` border | While API call is in flight |
| **Valid** | Green checkmark circle | "Connected successfully" | `--raava-success` border | After successful validation API call |
| **Invalid** | Red X circle | "This API key is invalid. Check that it has the right permissions." | `--raava-error` border | After failed validation API call |
| **Network Error** | Yellow warning triangle | "Couldn't verify this key right now. You can continue and we'll verify later." | `--raava-warning` border | After timeout or network failure |
| **Format Error** | Red X circle | "This doesn't look like a valid [provider] API key. Keys usually start with [prefix]." | `--raava-error` border | Client-side, before API call |

**"How to get this key" Behavior:**

- Click opens a right-side slide-out panel (not a new page, not a modal -- a side panel that pushes the form slightly left on desktop, or overlays on mobile).
- Panel content per credential:
  - 3-5 step numbered instructions with screenshots
  - Direct link to the provider's API key page (opens in new tab)
  - "Copy the key and paste it in the field on the left"
  - "Close" button at top of panel
- If the provider doesn't have a simple API key flow (e.g., OAuth is needed in the future), the panel shows: "This integration requires a one-click connection. [Connect with HubSpot] button." (Future -- not for v1. For v1, all integrations use API keys.)

**Skip Flow:**

- "Skip for now" is a text link below the credential cards, left-aligned in the footer area.
- Appearance: `Plus Jakarta Sans 400, 14px, --raava-blue`. Underline on hover.
- Clicking "Skip for now":
  - A subtle confirmation appears inline (not a modal): "Your team member will have limited capabilities without credentials. You can add them anytime in Settings." -- `Plus Jakarta Sans 400, 12px, --raava-gray`, with a yellow warning icon (16px).
  - Below the message: "Continue without credentials" (primary button, but smaller) and "Go back" (text link).
  - If confirmed, advance to Step 4. All credential fields are stored as "unconfigured."
- **Degraded experience per role when credentials are skipped:**

| Role | Without Credentials | What Still Works |
|---|---|---|
| Sales Assistant | Cannot send/read email or access CRM | Can draft documents, provide strategy advice (text-only tasks) |
| Operations Manager | Cannot access Calendar or Sheets | Can analyze task lists within Raava, provide recommendations |
| Customer Support | Cannot access help desk or email | Can draft response templates, analyze support patterns from provided text |
| Data Analyst | Cannot query databases or Sheets | Can analyze data pasted into tasks, create text-based reports |
| Marketing Coordinator | Cannot post to social or access analytics | Can draft content, create campaign plans (text-only) |
| General Assistant | Cannot send/read email | Can research, draft documents, analyze provided information |

**"Next" Button Behavior:**

- Enabled at all times (credentials are not required to proceed).
- If credentials are entered and validation is in progress, "Next" waits for validation to complete (button shows a small spinner next to the text).
- If validation fails, "Next" still works -- but a warning appears: "Some credentials couldn't be verified. Continue anyway?" with "Continue" and "Fix credentials" options.

**Backend Operations (during this step):**

- No backend operations happen during this step. Credentials are held in memory (frontend state) only.
- They are transmitted to the backend in Step 5 (Provisioning) as part of the hire request.
- Validation calls hit a dedicated endpoint: `POST /api/credentials/validate` with `{ provider: "hubspot", key: "..." }`. This endpoint tests the key against the provider's API (e.g., HubSpot's `/v3/objects/contacts?limit=1`) and returns `{ valid: boolean, error?: string }`.

---

## Step 4: Naming and Personalization

### Screen: `HireWizard_NameLaunch`

**Layout:**
- Step indicator updated (step 4 active, or step 3 for standalone hire wizard).
- Header: "Almost there! Name your new team member." -- `Syne 800, 24px, --raava-ink`, centered.
- Subheader: "Give them a name, pick an icon, and set their first task." -- `Plus Jakarta Sans 400, 14px, --raava-gray`, centered.
- Content area: centered, max-width 540px.
- Large "Hire [Name]" CTA button at bottom.

**Section 1: Name Input**

```
  Name your team member
  (Plus Jakarta Sans 500, 14px, --raava-ink)

  +-------------------------------------------+
  | Alex                                      |
  +-------------------------------------------+
  (Pre-filled. Input: Plus Jakarta Sans 400, 16px.
   Border: 1px solid --raava-border. Radius: radius-md.
   Height: 48px. Padding: 0 16px.)

  Suggested: Alex, Jamie, Riley, Morgan
  (Plus Jakarta Sans 400, 12px, --raava-gray.
   Each suggestion is a clickable text link that
   fills the input field.)
```

**Pre-filled Name Suggestions Per Role:**

| Role | Default (pre-filled) | Alternatives (shown below input) |
|---|---|---|
| Sales Assistant | Alex | Jamie, Riley, Morgan |
| Operations Manager | Jordan | Taylor, Cameron, Drew |
| Customer Support | Sam | Pat, Jamie, Chris |
| Data Analyst | Quinn | Avery, Blake, Sage |
| Marketing Coordinator | Harper | Reese, Parker, Devon |
| General Assistant | Casey | Robin, Sky, Ellis |

All names are gender-neutral by design.

**Validation:**
- Name is required. Minimum 1 character, maximum 30 characters.
- If empty on blur: input border turns `--raava-error`, message below: "Give your team member a name" -- `Plus Jakarta Sans 400, 12px, --raava-error`.
- If only whitespace: treated as empty.
- No profanity filter for v1 (low priority, add later).
- Duplicate names ARE allowed (two team members can be named "Alex").

**Section 2: Icon/Avatar Picker**

```
  Pick an icon
  (Plus Jakarta Sans 500, 14px, --raava-ink)

  [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
  [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
  (Grid of 16 icons. Each is a 44px x 44px rounded square
   with a 32px icon inside. Border: 1px solid --raava-border.
   Radius: radius-md.)
```

- This reuses the existing `AgentIconPicker` component.
- Icons are abstract/geometric (consistent with Raava brand): animals, shapes, objects. Not human faces.
- **Default selection:** The first icon is pre-selected based on role (each role has a designated default icon from the grid).
- **Interaction:** Click to select. Selected icon gets gradient border and `shadow-glow`. Only one can be selected.
- **No emoji option.** No initials option. The icon picker grid is the only choice for v1. Custom avatar upload is a v2 feature.

**Section 3: First Task**

```
  Their first task
  (Plus Jakarta Sans 500, 14px, --raava-ink)

  +-------------------------------------------------------+
  | Review my recent leads and draft follow-up emails     |
  | for anyone who hasn't responded in 3+ days            |
  +-------------------------------------------------------+
  (Textarea. Pre-filled per role. Plus Jakarta Sans 400, 14px.
   Border: 1px solid --raava-border. Radius: radius-md.
   Min-height: 80px. Max-height: 160px. Resize: vertical.
   Padding: 12px 16px.)

  You can edit this -- it's what they'll start working on.
  (Plus Jakarta Sans 400, 12px, --raava-gray, italic)
```

**Pre-filled First Tasks Per Role:**

| Role | Default First Task |
|---|---|
| Sales Assistant | "Review my recent leads and draft follow-up emails for anyone who hasn't responded in 3+ days" |
| Operations Manager | "Audit our current task list and identify any items that are overdue or unassigned" |
| Customer Support | "Review open support tickets and draft responses for the 5 most recent ones" |
| Data Analyst | "Pull this week's key metrics and create a summary report" |
| Marketing Coordinator | "Draft 3 social media posts for this week based on our latest product update" |
| General Assistant | "Organize my inbox and flag anything that needs my attention today" |

**What if they clear the first task and leave it empty?**

- The first task is OPTIONAL. If cleared, the textarea shows placeholder text: "Describe what you'd like them to work on first (optional)" -- `--raava-gray at 50% opacity`.
- If empty when "Hire [Name]" is clicked: the team member is hired but no task is created. The success state changes from "They're starting on their first task now" to "They're ready for their first task. Assign one from My Team."
- The "Hire [Name]" button is never disabled due to an empty first task.

**Section 4: Personality Editing**

- Personality is NOT editable at this point. It is pre-set from the role template.
- Below the first task, a collapsed section shows:
  ```
  Personality (pre-configured for this role)   [Edit later]
  (Plus Jakarta Sans 400, 12px, --raava-gray)
  ```
- "Edit later" is a text link that does nothing now but will navigate to the Personality tab on the Team Member Detail page post-hire. At this step, clicking it shows a tooltip: "You can customize their personality after hiring from the Team Member detail page."
- Rationale: Exposing the full personality editor during onboarding adds cognitive load. Carlos does not want to edit a SOUL.md during setup. This is a post-hire power-user action.

**Section 5: "Hire [Name]" CTA**

```
  +========================================+
  |  [Raava star, 20px, white]  Hire Alex  |
  +========================================+
```

- **Dimensions:** Full width of content area (max 540px), height 56px. Center-aligned text.
- **Background:** Brand gradient (`linear-gradient(90deg, #224AE8, #716EFF, #00BDB7)`).
- **Text:** "Hire [Name]" -- `Plus Jakarta Sans 600, 18px`, white. The name updates live as the user types in the name field.
- **Border-radius:** `radius-md` (8px).
- **Icon:** Raava star mark (white, 20px) to the left of the text.
- **Hover:** Slight brightness increase (filter: brightness(1.1)), scale: 1.02. Transition: 150ms ease.
- **Active (pressed):** Scale: 0.98. Transition: 100ms ease.
- **Disabled state:** Never disabled (name has a default, icon has a default, first task is optional).

---

## Step 5: Provisioning (Loading State)

### Screen: `HireWizard_Provisioning`

**Trigger:** User clicks "Hire [Name]."

**Layout:** The wizard content area transitions to a centered loading state. The step indicator, header, and all form fields fade out (200ms). The loading state fades in (200ms).

**Loading Display:**

```
  +-----------------------------------------------+
  |                                               |
  |          [Raava Star -- animated]             |
  |          (64px, brand gradient fill,          |
  |           rotating 360deg per 2 seconds,      |
  |           CSS animation, ease-in-out)         |
  |                                               |
  |          Hiring Alex...                       |
  |          (Syne 800, 22px, --raava-ink)        |
  |                                               |
  |          Setting up their workspace           |
  |          (Plus Jakarta Sans 400, 14px,        |
  |           --raava-gray. This text cycles.)    |
  |                                               |
  |          [Progress bar -- optional]           |
  |          (thin, 4px height, full width,       |
  |           gradient fill, animated)            |
  |                                               |
  +-----------------------------------------------+
```

**Progress Text Cycling:**

The subtitle text cycles through these messages every 3 seconds with a fade transition (200ms fade out, 200ms fade in):

1. "Setting up their workspace..." (0-3s)
2. "Installing their tools..." (3-6s)
3. "Configuring their personality..." (6-9s)
4. "Securing their credentials..." (9-12s)
5. "Starting their first task..." (12-15s)
6. "Almost ready..." (15s+, loops until completion)

**Progress Indicator:**

- A thin (4px) progress bar below the text. Brand gradient fill.
- The progress bar is NOT tied to real backend progress (that would require websocket updates and adds complexity). Instead, it uses a timed animation:
  - 0-30%: fast (first 3 seconds)
  - 30-70%: slow (next 10 seconds)
  - 70-90%: very slow (next 15 seconds)
  - 90-99%: holds (waiting for real completion signal)
  - 100%: snaps to full when the API returns success
- This is a perception hack. It feels like progress without requiring real-time backend status.

**Expected Duration:**

- **Typical:** 15-30 seconds.
- **Slow (first hire, cold infrastructure):** Up to 60 seconds.
- **Timeout:** 120 seconds. If no response after 120 seconds, transition to error state.

**What Happens on the Backend:**

This is the critical sequence. The frontend sends a single `POST /api/team-members/hire` request with payload:

```json
{
  "role": "sales-assistant",
  "name": "Alex",
  "icon": "briefcase-arrow",
  "firstTask": "Review my recent leads and draft follow-up emails...",
  "credentials": [
    { "provider": "gmail", "key": "AIza..." },
    { "provider": "hubspot", "key": "pat-na1-..." }
  ]
}
```

Backend sequence (FleetOS orchestration):

| Step | Operation | FleetOS/Hermes Action | Duration |
|---|---|---|---|
| 1 | Create team member record | SQLite insert: new agent record with name, role, icon, status=provisioning | <100ms |
| 2 | Store credentials in vault | `op item create` in 1Password. Store vault item IDs in agent record | 1-3s |
| 3 | Provision Hermes container | FleetOS creates isolated container from role template (`sales-assistant`). Docker container start | 5-15s |
| 4 | Install skills | Hermes skill pack installation (`hermes-email`, `hermes-crm`, `hermes-docs`) inside the container | 3-8s |
| 5 | Inject credentials | `op run` injects vault items as env vars into the running container | 1-2s |
| 6 | Write SOUL.md | Role default personality written into agent's SOUL.md inside the container | <500ms |
| 7 | Start agent | Hermes agent process starts, heartbeat begins, status -> active | 1-3s |
| 8 | Create first task | If firstTask provided: create issue record, assign to new agent, agent begins work | 1-2s |

**Total estimated: 12-35 seconds.**

The API returns:
```json
{
  "success": true,
  "teamMember": {
    "id": "tm_abc123",
    "name": "Alex",
    "role": "sales-assistant",
    "status": "active",
    "firstTaskId": "task_xyz789"
  }
}
```

**If Provisioning Fails:**

The API returns:
```json
{
  "success": false,
  "error": {
    "code": "PROVISION_FAILED",
    "message": "Could not start the team member's workspace. This is usually temporary.",
    "step": "container_start",
    "retryable": true
  }
}
```

---

## Step 6: Success State

### Screen: `HireWizard_Success`

**Trigger:** Backend returns `success: true`.

**Transition:** The loading spinner/progress bar fades out (200ms). A brief pause (300ms). Then the success state fades in with a subtle scale-up (from 0.95 to 1.0, 400ms ease-out).

**Celebration Animation:**

- **Confetti burst:** Lightweight confetti animation (CSS/canvas, 40-60 particles, brand colors only: blue, purple, teal, white). Fires once, settles in 2 seconds. Particles fall with gentle gravity and slight rotation. No sound effect.
- **Star pulse:** The Raava star mark (centered, 80px) pulses once from 1.0 to 1.2 scale and back, with a glow effect, over 600ms.

**Content:**

```
  +-----------------------------------------------+
  |                                               |
  |        [Raava Star, 80px, gradient,           |
  |         with glow pulse animation]            |
  |                                               |
  |        Alex is on your team!                  |
  |        (Syne 800, 28px, --raava-ink)          |
  |                                               |
  |        Starting their first task now...       |
  |        (Plus Jakarta Sans 400, 16px,          |
  |         --raava-gray)                         |
  |                                               |
  |  +--TASK PREVIEW CARD--------------------+    |
  |  | [in progress dot] First Task          |    |
  |  | "Review my recent leads and draft     |    |
  |  |  follow-up emails for anyone who      |    |
  |  |  hasn't responded in 3+ days"         |    |
  |  +---------------------------------------+    |
  |                                               |
  |  [ Go to My Team ]    [ Assign Another Task ] |
  |   (primary button)     (ghost button)         |
  |                                               |
  |  [ Hire Another Team Member ]                 |
  |   (text link, centered below buttons)         |
  |                                               |
  +-----------------------------------------------+
```

**Variations:**

- If no first task was provided: Subheader changes to "They're ready for their first task." Task preview card is replaced with: "Assign a task from My Team to get started." The "Assign Another Task" button changes to "Assign a Task" (primary).
- If credentials were skipped: An additional note appears below the task preview: "Note: Alex has limited capabilities without credentials. Add them in Settings anytime." -- `Plus Jakarta Sans 400, 12px, --raava-warning`, with a yellow warning icon.

**CTA Behavior:**

| Button | Action | Transition |
|---|---|---|
| "Go to My Team" | Closes wizard modal. Navigates to `/team`. | Wizard fades out (300ms). My Team page loads. |
| "Assign Another Task" | Closes wizard modal. Navigates to `/tasks/new?assignee=tm_abc123`. | Wizard fades out (300ms). Task creation page opens with the new team member pre-selected. |
| "Hire Another Team Member" | Resets wizard to Step 1 (role selection). Does NOT close the modal. | Success state fades out (200ms). Step 1 slides in. Previously hired role's card is now disabled with a "Hired" badge instead of "Coming Soon." |

**Does the task start automatically?**

Yes. If a first task was provided, the backend creates and assigns the task in Step 8 of the provisioning sequence. The agent begins working on it immediately upon starting. The task status is "In Progress" by the time the user sees the success state.

---

## Step 6a: Error State

### Screen: `HireWizard_Error`

**Trigger:** Backend returns `success: false`, OR the request times out after 120 seconds, OR a network error occurs.

**Layout:**

```
  +-----------------------------------------------+
  |                                               |
  |        [Warning triangle icon, 64px,          |
  |         --raava-error color]                  |
  |                                               |
  |        Something went wrong                   |
  |        (Syne 800, 24px, --raava-ink)          |
  |                                               |
  |        We couldn't finish setting up Alex.    |
  |        This is usually temporary.             |
  |        (Plus Jakarta Sans 400, 14px,          |
  |         --raava-gray)                         |
  |                                               |
  |        [ Try Again ]     [ Contact Support ]  |
  |        (primary button)  (ghost button)       |
  |                                               |
  |        Error details (for advanced users)  v  |
  |        (collapsible, Plus Jakarta Sans 400,   |
  |         12px, --raava-gray. Expands to show   |
  |         error code and step that failed.)     |
  |                                               |
  +-----------------------------------------------+
```

**Error Messages by Failure Type:**

| Failure | User Message | Technical Detail (collapsed) |
|---|---|---|
| Container provisioning failed | "We couldn't set up Alex's workspace. This is usually temporary." | "PROVISION_FAILED at step: container_start" |
| Skill installation failed | "We couldn't install Alex's tools. This is usually temporary." | "SKILL_INSTALL_FAILED at step: skill_installation" |
| Credential injection failed | "We couldn't connect Alex's credentials. Please check your API keys." | "CREDENTIAL_INJECT_FAILED at step: credential_injection" |
| Network timeout | "The connection timed out. Please check your internet and try again." | "TIMEOUT after 120000ms" |
| Unknown error | "Something unexpected happened. Our team has been notified." | Full error object stringified |

**"Try Again" Behavior:**

- Sends the same hire request again.
- Transitions back to the loading state (Step 5).
- If it fails a second time, the error state appears again with modified copy: "This is taking longer than expected. Try once more or contact support."
- After 3 failures: the "Try Again" button is hidden. Only "Contact Support" remains. Additional text: "We're having trouble setting up this team member. Please reach out to support and we'll get it resolved."

**"Contact Support" Behavior:**

- Opens a mailto link: `mailto:support@raava.io?subject=Hire%20Failed%20-%20[role]&body=Error:%20[errorCode]%20at%20step:%20[failedStep]`.
- Pre-fills the email subject and body with error details so the user does not have to explain.

---

## Step 7: Post-Hire Landing

### Where the User Ends Up

**If they click "Go to My Team":** Navigates to `/team`. The newly hired team member's card appears in the grid with a "Just Hired" badge.

**"Just Hired" Badge:**
- Small pill badge on the team member card: "New" -- `--raava-blue` background, white text, `Plus Jakarta Sans 500, 10px`, `radius-sm`.
- The badge persists for 24 hours (stored as `hiredAt` timestamp, compared client-side).
- The card may also have a subtle glow animation on its border (single pulse of `shadow-glow`, 2 seconds, then settles).

**If they click "Assign Another Task":** Navigates to `/tasks/new` with the team member pre-selected in the assignee dropdown. The task creation form is standard (from the Tasks page spec), with the assignee field locked to the just-hired member.

**First task visibility:**
- If a first task was provided, it appears on the team member's card in My Team: current task text truncated to 1 line.
- On the Team Member Detail page (`/team/tm_abc123`), the Overview tab shows the task in the "Current Task" card with an "In Progress" status badge and live elapsed time.
- The task also appears in the Tasks page (`/tasks`) with status "In Progress."

---

## Edge Cases Summary -- Flow 1

| Edge Case | Handling |
|---|---|
| User closes the wizard mid-flow (X button, Escape key, clicking backdrop) | Confirmation dialog: "Are you sure? Your progress will be lost." [Discard] [Keep editing]. No draft saving for v1. |
| User navigates away via browser (back button, URL change) | Same confirmation via `beforeunload` event: "You have unsaved changes." |
| User has 6 team members already (all roles filled) | "Hire" button still works. All role cards in the grid are selectable (a user can have multiple of the same role). No cap on team size for v1. |
| Two team members with the same role | Allowed. Cards in My Team differentiated by name, icon, and individual task/cost data. |
| Browser loses connection during provisioning | The loading state continues to show. After 120s timeout, error state appears with "Check your internet connection" message. If the hire actually succeeded server-side, the next time My Team loads, the member will appear. No duplicate creation -- backend uses idempotency key. |
| Credentials entered but validation failed | User can still proceed. Warning shown. Backend attempts credential injection anyway -- if the key is truly invalid, the agent's tools will fail gracefully, and the team member card will show a yellow "Needs Attention" status with "Credential issue" detail. |
| User enters credentials, goes back to Step 2, changes role | Credential fields reset (different role, different credentials). Frontend state for previous role's credentials is cleared. A subtle confirmation: "Changing roles will reset your credential setup." |
| Provisioning succeeds but first task fails to create | Success state still shows, but without the task preview card. Instead: "Alex is on your team! We had trouble starting the first task -- you can assign one from My Team." |
| User on slow connection (high latency) | All API calls have retry logic (1 retry with exponential backoff). Loading states are generous (no premature timeout). The progress bar animation is designed to be slow so it doesn't finish before the real operation completes. |
| Session expires during wizard | If auth token expires mid-flow, redirect to login. Post-login, do NOT restore wizard state (too complex for v1). User starts the hire flow over. |

---

# FLOW 2: ADDING A TOOL TO A TEAM MEMBER

## Flow Diagram

```
ENTRY POINTS
  |
  |-- [A] Team Member Detail > Settings tab > "Add Tool"
  |-- [B] Team Member Detail > Overview > Tools section > "+"
  |-- [C] Settings > Integrations > select team member
  |
  v
+========================+
| 1. TOOL BROWSER /      |  Screen: AddToolModal
|    SELECTOR            |
+========================+
  |
  | User selects a tool
  v
+========================+
| 2. TOOL CONFIGURATION  |  Screen: AddToolModal (config step)
|                        |
+========================+
  |
  | User clicks "Activate" / "Test Connection"
  v
+========================+
| 3. CONFIRMATION &      |  Screen: AddToolModal (confirm step)
|    ACTIVATION          |
+========================+
  |
  | Success              | Failure
  v                      v
+===============+   +===============+
| 4. POST-       |   | 3a. ERROR    |
|    ACTIVATION  |   |     STATE    |
+===============+   +===============+
```

---

## Entry Point Details

### Entry A: Team Member Detail > Settings Tab > "Add Tool"

- **Location:** `/team/:id`, Settings tab, within the "Tools & Integrations" section.
- **Appearance:** Ghost button with a plus icon: "+ Add Tool" -- `Plus Jakarta Sans 500, 14px, --raava-blue`.
- **Behavior:** Opens the Add Tool modal overlay.

### Entry B: Team Member Detail > Overview Tab > Tools Section > "+"

- **Location:** `/team/:id`, Overview tab, the "Skills & Tools" section that shows currently configured tools.
- **Appearance:** A small circular button (32px) with a "+" icon at the end of the tool icon row. `--raava-border` border, `--raava-gray` icon. Hover: `--raava-blue` border and icon.
- **Behavior:** Opens the Add Tool modal overlay.

### Entry C: Settings > Integrations > Select Team Member

- **Location:** `/settings`, Integrations section. Shows all configured integrations across all team members.
- **Appearance:** Each integration row shows: tool icon, tool name, connected team member(s), status. At the bottom: "+ Add Integration" button.
- **Behavior:** Clicking "+ Add Integration" opens a team member selector first (dropdown: "Add a tool to which team member?"), then opens the Add Tool modal for the selected member.

---

## Step 1: Tool Browser / Selector

### Screen: `AddToolModal` (selection step)

**Layout:**
- Modal overlay (600px wide, max-height 80vh, centered).
- Header: "Add a tool to [Team Member Name]" -- `Syne 800, 20px, --raava-ink`.
- Category tabs (horizontal, scrollable): All | Communication | CRM | Data | Content | Productivity
- Tool grid below tabs.
- Footer: "Cancel" (ghost) and "Next" (primary, disabled until selection).

**Category-to-Tool Mapping:**

| Category | Tools | Tool Icon | Description | What It Enables |
|---|---|---|---|---|
| **Communication** | Gmail | Gmail logo (20px) | "Send and read emails" | "Can send follow-ups, read incoming mail, draft responses" |
| | Slack | Slack logo | "Send and read Slack messages" | "Can post updates, monitor channels, respond to messages" |
| | Outlook | Outlook logo | "Send and read Outlook emails" | "Same as Gmail but for Microsoft ecosystems" |
| **CRM** | HubSpot | HubSpot logo | "Read and update CRM records" | "Can look up contacts, update deals, log activities" |
| | Salesforce | Salesforce logo | "Read and update Salesforce data" | "Can manage leads, opportunities, and accounts" |
| | Pipedrive | Pipedrive logo | "Read and update deals" | "Can manage pipeline, track deal progress" |
| **Data** | SQL (Read-Only) | Database icon | "Query databases" | "Can pull reports, run analytics queries, extract data" |
| | Google Sheets | Sheets logo | "Read and write spreadsheets" | "Can create reports, update trackers, pull data" |
| | Google Analytics | Analytics logo | "Read web analytics" | "Can pull traffic reports, track conversions, analyze trends" |
| **Content** | Google Docs | Docs logo | "Create and edit documents" | "Can draft proposals, write reports, edit content" |
| | Social Media (Hootsuite) | Hootsuite logo | "Schedule and manage social posts" | "Can draft posts, schedule content, track engagement" |
| | Social Media (Buffer) | Buffer logo | "Schedule and manage social posts" | "Same as Hootsuite, different platform" |
| **Productivity** | Google Calendar | Calendar logo | "Read and manage calendar events" | "Can check availability, schedule meetings, send invites" |
| | Zendesk | Zendesk logo | "Read and manage support tickets" | "Can read tickets, draft responses, update status" |
| | Freshdesk | Freshdesk logo | "Read and manage support tickets" | "Same as Zendesk, different platform" |

**Tool Card Specification:**

```
+-------------------------------------+
| [Tool Icon 32px]  Gmail             |
|                   Send and read     |
|                   emails            |
| (Plus Jakarta Sans 400, 13px,      |
|  --raava-gray)                     |
+-------------------------------------+
```

- **Dimensions:** Cards in a 2-column grid within the modal. Each card: full-width of column, height auto (approximately 72px).
- **Border:** `1px solid --raava-border`, `radius-md`.
- **Padding:** `space-md` (16px).
- **Hover:** Border `--raava-blue at 40%`, subtle shadow.
- **Selected:** `2px solid --raava-blue`, checkmark in top-right.
- **Already Configured:** If the team member already has this tool, the card shows a green checkmark badge: "Active" and is non-selectable. Opacity: 0.6. Tooltip: "Already configured for [Name]."

**Role-Based Tool Availability:**

All tools are available to all roles. There is no hard restriction on which tools a role can have. The role determines which tools are PRE-CONFIGURED during hiring, but any tool can be added post-hire. This is a deliberate decision -- if a Sales Assistant needs SQL access for a specific task, the user should be able to grant it.

However, tools that are unusual for a role show a subtle note:

```
[Tool Card]
  SQL (Read-Only)
  Query databases
  (Not typically used by Sales Assistants)   <-- --raava-gray, italic, 12px
```

This is informational, not blocking.

**Search:**

- A search input at the top of the tool grid: "Search tools..." placeholder.
- Filters the visible tools as the user types. Minimum 2 characters to start filtering.
- No results: "No tools match your search. [Browse all tools]" link.

---

## Step 2: Tool Configuration

### Screen: `AddToolModal` (configuration step)

**Trigger:** User selects a tool and clicks "Next."

**Layout:**
- Modal header updates to: "Set up [Tool Name] for [Team Member Name]" -- `Syne 800, 18px`.
- Back arrow in top-left to return to tool selection.
- Configuration form below.

**Configuration varies per tool.** Here are the specifications for each:

### Gmail / Email Configuration

```
  Connection Method
  [Gmail API Key]  [SMTP Settings]  [OAuth Connect]
  (pill selector, same pattern as CRM selector in hire flow)

  --- If Gmail API Key selected: ---

  Gmail API Key
  +-------------------------------------------+ [Eye]
  | ****************************************  |
  +-------------------------------------------+
  [How to get this key?]

  --- If SMTP selected: ---

  SMTP Server     [smtp.gmail.com        ]
  Port            [587                    ]
  Username        [user@gmail.com         ]
  Password        [**********            ] [Eye]
  Encryption      [TLS v] (dropdown)

  --- If OAuth selected (future): ---

  [Connect with Google]
  (branded Google OAuth button, opens popup)

  For v1: Only Gmail API Key is supported.
  SMTP and OAuth buttons show "Coming soon" tooltip.
```

### CRM Configuration (HubSpot / Salesforce / Pipedrive)

```
  Which CRM?
  [ HubSpot ]  [ Salesforce ]  [ Pipedrive ]

  [Provider] API Key
  +-------------------------------------------+ [Eye]
  |                                           |
  +-------------------------------------------+
  [How to get this key?]

  Advanced Settings (collapsed by default)
  v
    Default Pipeline:  [Sales Pipeline v] (dropdown, loaded after valid key)
    Default Stage:     [New Lead v]
    Sync Direction:    [Read & Write v] / [Read Only]
```

Advanced settings only appear after a valid API key is entered and the "Test Connection" succeeds (because we need to load pipeline names from the CRM).

### SQL Configuration

```
  Database Type
  [ PostgreSQL ]  [ MySQL ]  [ SQL Server ]

  Connection String
  +-------------------------------------------+
  | postgresql://user:pass@host:5432/dbname   |
  +-------------------------------------------+
  (type="text", NOT masked -- connection strings need to be visible for editing)
  Format: postgresql://user:pass@host:port/dbname

  [ ] Read-only access (checked by default, non-editable for v1)
  This team member can only query data, never modify it.

  [How to get a connection string?]
```

### Google Sheets / Docs / Calendar

```
  Google Workspace API Key
  +-------------------------------------------+ [Eye]
  |                                           |
  +-------------------------------------------+
  [How to get this key?]

  (Single credential covers Sheets, Docs, and Calendar)
```

### Zendesk / Freshdesk

```
  [Provider] API Key
  +-------------------------------------------+ [Eye]
  |                                           |
  +-------------------------------------------+
  [How to get this key?]

  Subdomain (Zendesk only)
  +-------------------------------------------+
  | yourcompany.zendesk.com                   |
  +-------------------------------------------+
```

### Hootsuite / Buffer

```
  [Provider] API Key
  +-------------------------------------------+ [Eye]
  |                                           |
  +-------------------------------------------+
  [How to get this key?]
```

### Google Analytics

```
  Google Analytics API Key
  +-------------------------------------------+ [Eye]
  |                                           |
  +-------------------------------------------+
  [How to get this key?]

  Property ID
  +-------------------------------------------+
  | UA-XXXXXXXXX-X or G-XXXXXXXXXX           |
  +-------------------------------------------+
```

**"Test Connection" Button:**

Present on all tool configurations. Appears below the credential fields.

```
  [ Test Connection ]
  (ghost button, --raava-blue text, 14px)
```

**Test Connection States:**

| State | Appearance | Behavior |
|---|---|---|
| **Idle** | "Test Connection" -- `--raava-blue` text, ghost button style | Clickable |
| **Testing** | "Testing..." with a small spinner (16px) replacing the text | Not clickable, cursor: wait |
| **Success** | Green checkmark + "Connection successful" -- `--raava-success` | Persists. Resets if credential fields change. |
| **Failure** | Red X + "Connection failed: [reason]" -- `--raava-error` | Shows specific error: "Invalid API key", "Network unreachable", "Permission denied", "Rate limited -- try again in 60 seconds" |

**Backend for Test Connection:**

`POST /api/credentials/test` with `{ tool: "hubspot", credentials: { key: "..." } }`.

Backend attempts a lightweight API call against the provider:
- Gmail: `GET /gmail/v1/users/me/profile`
- HubSpot: `GET /crm/v3/objects/contacts?limit=1`
- Zendesk: `GET /api/v2/users/me.json`
- PostgreSQL: `SELECT 1`
- Google Sheets: `GET /v4/spreadsheets` (with key)

Returns: `{ success: boolean, error?: string, details?: string }`

**Footer:**
- "Back" (ghost, returns to tool selection)
- "Activate" (primary button, enabled only when required fields are filled. Does NOT require successful test -- test is optional but recommended.)

---

## Step 3: Confirmation and Activation

### Screen: `AddToolModal` (confirmation step)

**Trigger:** User clicks "Activate."

**Layout:**

```
  Adding Gmail to Alex
  (Syne 800, 18px, --raava-ink)

  This will enable Alex to:
  - Send follow-up emails on your behalf
  - Read incoming emails to stay informed
  - Draft email responses for your review
  (Plus Jakarta Sans 400, 14px, --raava-ink.
   Bullet list, 8px gap between items.)

  +---------------------------------------------+
  | [Gmail icon 24px]  Gmail        [Activate]  |
  | Send and read emails            (primary    |
  |                                  button,    |
  |                                  small)     |
  +---------------------------------------------+
```

Wait -- for efficiency, we should combine the confirmation into the "Activate" button click on Step 2 rather than adding a separate screen. Revised approach:

**The "Activate" button on Step 2 IS the confirmation.** Clicking it:

1. Button text changes to "Activating..." with a spinner.
2. Backend request: `POST /api/team-members/:id/tools` with `{ tool: "gmail", credentials: { key: "..." }, config: { ... } }`.

**Backend Operations:**

| Step | Operation | Duration |
|---|---|---|
| 1 | Store credentials in 1Password vault | 1-3s |
| 2 | Install Hermes skill into running container (`hermes-email`) | 3-8s |
| 3 | Inject credentials as env vars via `op run` | 1-2s |
| 4 | Verify skill is responsive (health check) | 1-2s |
| 5 | Update agent record: add tool to configured tools list | <100ms |

**Total: 6-15 seconds.**

3. **Success State (inline in modal):**

```
  [Green checkmark, 48px, centered]

  Gmail is now active for Alex.
  (Syne 800, 18px, --raava-ink)

  Alex can now send and read emails.
  (Plus Jakarta Sans 400, 14px, --raava-gray)

  [ Done ]          [ Add Another Tool ]
  (primary button)  (ghost button)
```

"Done" closes the modal and refreshes the team member detail page. The new tool appears in the tools list with a green "Active" status dot.

"Add Another Tool" returns to Step 1 (tool browser). The just-added tool now shows as "Active" and is non-selectable.

4. **Error State (inline in modal):**

```
  [Red warning icon, 48px]

  Couldn't activate Gmail for Alex.
  (Syne 800, 18px, --raava-ink)

  [Error reason]: The API key doesn't have the required permissions.
  (Plus Jakarta Sans 400, 14px, --raava-gray)

  [ Try Again ]     [ Go Back ]
  (primary button)  (ghost -- returns to config step to edit credentials)
```

---

## Step 4: Post-Activation

**On Team Member Detail Page (Overview tab):**
- The Tools & Skills section now shows the new tool with:
  - Tool icon (20px)
  - Tool name
  - Status dot: green = Active
  - Added: "Just now" (timestamp)

**On Team Member Detail Page (Settings tab):**
- The Tools & Integrations section shows the full list including the new tool.
- Each tool row: icon, name, status, "Configure" button, "Remove" button (icon only, trash can).

**The team member can immediately use the new tool in tasks.** No restart required -- Hermes hot-loads skills.

---

## Edge Cases -- Flow 2

| Edge Case | Handling |
|---|---|
| Tool requires a credential that's already stored (same Gmail key used by another team member) | Each team member has their own credential in the vault (isolated). The user must re-enter the key. Future enhancement: "Use same Gmail key as [other member]?" |
| User adds a tool, then the team member is paused | Tool remains configured but unused. When the member is resumed, the tool is available. |
| Adding a tool while the team member is actively working on a task | Tool installation happens without interrupting the current task. The agent picks up the new tool for the NEXT task. |
| Credential becomes invalid after activation (e.g., user revokes API key in provider) | Next time the agent tries to use the tool, it fails. Status changes from "Active" (green) to "Error" (red) on the tool entry. Team member card shows "Needs Attention." |
| User tries to add the same tool twice | Card is non-selectable with "Active" badge. |

---

# FLOW 3: UPDATING/REMOVING A TOOL

## Flow Diagram

```
ENTRY POINT
  |
  | Team Member Detail > Settings tab > Tools list > click tool
  v
+========================+
| TOOL DETAIL PANEL      |  (slide-out or inline expansion)
| Shows: status, config, |
| last used, options     |
+========================+
  |
  |-- "Update Credentials" --> Credential update flow
  |-- "Reconfigure" --> Configuration update flow
  |-- "Disable" --> Disable confirmation
  |-- "Remove" --> Remove confirmation with impact preview
```

---

## Step 1: Navigate to Team Member's Tool List

**Location:** `/team/:id`, Settings tab, "Tools & Integrations" section.

**Tool List Display:**

```
  TOOLS & INTEGRATIONS
  (section header: Plus Jakarta Sans 500, 12px, uppercase, --raava-gray)

  +---------------------------------------------+
  | [Gmail 20px] Gmail           * Active       |
  | Connected since Mar 15       [Configure] v  |
  +---------------------------------------------+
  | [HubSpot 20px] HubSpot CRM  * Active       |
  | Connected since Mar 15       [Configure] v  |
  +---------------------------------------------+
  | [Docs 20px] Google Docs      * Active       |
  | Connected since Mar 15       [Configure] v  |
  +---------------------------------------------+

  [+ Add Tool]
```

Each tool row:
- Left: Tool icon (20px), tool name (`Plus Jakarta Sans 500, 14px, --raava-ink`).
- Center: "Connected since [date]" (`Plus Jakarta Sans 400, 12px, --raava-gray`).
- Right: Status dot (green=Active, red=Error, gray=Disabled), "Configure" dropdown chevron.
- Full row is clickable.

**Status Indicators:**

| Status | Dot Color | Label | Meaning |
|---|---|---|---|
| Active | `--raava-success` (green) | "Active" | Working correctly |
| Error | `--raava-error` (red) | "Error" | Credential invalid or tool unreachable |
| Disabled | `--raava-gray` | "Disabled" | Manually disabled by user, config preserved |

---

## Step 2: Click on an Existing Tool

**Behavior:** Clicking the tool row or the "Configure" chevron expands an inline detail panel below the row (accordion style, 300ms ease-out).

**Expanded Panel:**

```
  +---------------------------------------------+
  | [Gmail 20px] Gmail           * Active       |
  | Connected since Mar 15       [Configure] ^  |
  |---------------------------------------------|
  |                                             |
  | Status: Active                              |
  | Last used: 2 hours ago                      |
  | Tasks using this tool: 12                   |
  |                                             |
  | [ Update Credentials ]                      |
  |   (ghost button, --raava-blue)              |
  |                                             |
  | [ Reconfigure ]                             |
  |   (ghost button, --raava-blue)              |
  |                                             |
  | [ Disable ]              [ Remove ]         |
  |   (ghost button,          (ghost button,    |
  |    --raava-warning)        --raava-error)   |
  |                                             |
  +---------------------------------------------+
```

---

## Step 3: Update Credentials

**Trigger:** User clicks "Update Credentials."

**Layout:** Inline form replaces the action buttons in the expanded panel.

```
  Current credential: ****...****3kF7
  (last 4 characters shown, Plus Jakarta Sans 400, 13px, --raava-gray)

  New API Key
  +-------------------------------------------+ [Eye]
  |                                           |
  +-------------------------------------------+

  [ Test Connection ]

  [ Save ]     [ Cancel ]
```

**Behavior:**
- The current key value is shown masked with only last 4 characters visible. It is NEVER fully revealed (security requirement -- 1Password vault does not support reading back the full key via the dashboard).
- User enters the new key in the input field.
- "Test Connection" works identically to Flow 2 (same endpoint, same states).
- "Save" sends `PUT /api/team-members/:id/tools/:toolId/credentials` with the new key. Backend updates the 1Password vault item.
- Success: inline green checkmark + "Credentials updated" message. Panel collapses after 2 seconds.
- Failure: inline error message. "Save" button re-enables for retry.

---

## Step 4: Reconfigure

**Trigger:** User clicks "Reconfigure."

**Behavior:** Opens the same configuration form as Flow 2, Step 2, but pre-populated with current settings. For example, for HubSpot CRM:

```
  Default Pipeline:  [Sales Pipeline v]  (current selection shown)
  Default Stage:     [New Lead v]
  Sync Direction:    [Read & Write v]
```

Changes are saved via `PUT /api/team-members/:id/tools/:toolId/config`. No credential re-entry required.

---

## Step 5: Disable vs. Remove

### Disable

**What it does:** Keeps the tool configuration and credentials in the vault, but the Hermes skill is unloaded from the agent's container. The team member cannot use this tool until it is re-enabled.

**Use case:** Temporarily restricting a tool without losing the configuration. Example: "I don't want Alex sending emails this week while we revise our messaging."

**Flow:**

1. User clicks "Disable."
2. Inline confirmation replaces the button area:
   ```
   Disable Gmail for Alex?

   Alex won't be able to send or read emails until you re-enable this tool.
   Your credentials and settings will be preserved.

   [ Disable ]     [ Cancel ]
   (--raava-warning    (ghost)
    background,
    white text)
   ```
3. Click "Disable": `PUT /api/team-members/:id/tools/:toolId` with `{ status: "disabled" }`.
4. Backend: Hermes skill is unloaded from the container. Credential remains in vault.
5. Tool row updates: status dot -> gray, label -> "Disabled." A new "Enable" button appears in place of "Disable."
6. Re-enabling: Click "Enable" -> instant reactivation (skill reload, ~3 seconds). No credential re-entry.

### Remove

**What it does:** Deletes the tool configuration AND removes the credential from the 1Password vault. Full cleanup.

**Use case:** The user no longer wants this integration. They've switched providers, or the team member's role has changed.

**Flow:**

1. User clicks "Remove."
2. **Impact preview** appears first:
   ```
   Remove Gmail from Alex?

   IMPACT:
   - Alex will no longer be able to send or read emails
   - 3 active routines use this tool. They will fail after removal.
     * "Morning lead follow-up" (daily, 9am)
     * "Weekly pipeline report" (weekly, Monday)
     * "New lead notification" (on trigger)
   - Your Gmail API key for Alex will be permanently deleted

   This cannot be undone.

   [ Remove Gmail ]     [ Cancel ]
   (--raava-error           (ghost)
    background,
    white text)
   ```
3. The impact preview is populated by querying: `GET /api/team-members/:id/tools/:toolId/impact` which returns `{ routinesAffected: [...], tasksInProgress: [...], credentialId: "..." }`.
4. If there are tasks currently in progress that use this tool: additional warning: "Alex is currently working on a task that uses Gmail. Removing it now may cause the task to fail. [Remove Anyway] [Wait for task to finish]."
5. Click "Remove Gmail": `DELETE /api/team-members/:id/tools/:toolId`.
6. Backend:
   - Hermes skill is unloaded and removed from the container.
   - `op item delete` removes the credential from 1Password vault.
   - Agent record updated: tool removed from configured tools list.
   - Affected routines are NOT automatically disabled (they will fail on next run, and the failure will surface as a "Needs Attention" item).
7. Tool row disappears from the list with a slide-up animation (200ms).
8. If this was the team member's last tool, the tools section shows: "No tools configured. [+ Add Tool]."

---

## Edge Cases -- Flow 3

| Edge Case | Handling |
|---|---|
| User removes a tool that another tool depends on (e.g., Gmail for a CRM that sends via email) | No dependency checking in v1. The dependent tool will fail independently and show its own error. Future: dependency graph and warning. |
| User disables all tools for a team member | Team member can still work on text-only tasks (analysis, writing, recommendations). Status remains "Active" but tasks requiring tools will fail. |
| Credential update fails (vault error) | Inline error: "Couldn't update credentials. Please try again." Existing credential remains active (no data loss). |
| User tries to remove a tool during provisioning | Button disabled with tooltip: "Please wait until setup is complete." |

---

# FLOW 4: UPDATING A TEAM MEMBER'S ROLE/PERSONALITY

## Flow Diagram

```
ENTRY POINT
  |
  | Team Member Detail > Personality tab
  v
+========================+
| 1. VIEW PERSONALITY    |  Screen: TeamMemberDetail_Personality
|    (read mode)         |
+========================+
  |
  | User clicks "Edit"
  v
+========================+
| 2. EDIT PERSONALITY    |  Screen: TeamMemberDetail_Personality (edit mode)
|    (rich text editor)  |
+========================+
  |
  | User clicks "Save"
  v
+========================+
| 3. SAVE & BACKEND      |  (inline save, no separate screen)
|    UPDATE              |
+========================+
  |
  v
+========================+
| 4. ROLE CHANGE         |  Separate sub-flow (if applicable)
|    (if requested)      |
+========================+
```

---

## Step 1: View Personality

### Screen: `TeamMemberDetail_Personality` (read mode)

**Location:** `/team/:id`, Personality tab.

**Layout:**

```
  +---------------------------------------------------------------+
  |                                                               |
  |  Alex's Personality                              [ Edit ]     |
  |  (Syne 800, 20px, --raava-ink)         (ghost button, blue)  |
  |                                                               |
  |  This guides how Alex thinks, communicates,                   |
  |  and approaches tasks.                                        |
  |  (Plus Jakarta Sans 400, 13px, --raava-gray, italic)          |
  |                                                               |
  |  ---- Divider ----                                            |
  |                                                               |
  |  You are a professional, proactive sales assistant.           |
  |  You communicate clearly and warmly. You follow up            |
  |  persistently but not aggressively. You always update         |
  |  the CRM after every interaction. You flag hot leads          |
  |  for immediate human attention. You draft in a                |
  |  professional but conversational tone.                        |
  |                                                               |
  |  (Rendered Markdown. Plus Jakarta Sans 400, 15px,             |
  |   --raava-ink. Line-height: 1.7. Max-width: 640px.)          |
  |                                                               |
  |  ---- Divider ----                                            |
  |                                                               |
  |  Role: Sales Assistant                                        |
  |  Template version: v1.0 (original)                            |
  |  Last edited: Never                                           |
  |  (metadata, Plus Jakarta Sans 400, 12px, --raava-gray)        |
  |                                                               |
  +---------------------------------------------------------------+
```

---

## Step 2: Edit Personality

### Screen: `TeamMemberDetail_Personality` (edit mode)

**Trigger:** User clicks "Edit" button.

**Transition:** The rendered Markdown view fades out (150ms) and is replaced by the `MarkdownEditor` component (existing Paperclip component, reskinned).

**Layout:**

```
  +---------------------------------------------------------------+
  |                                                               |
  |  Editing Alex's Personality              [ Save ] [ Cancel ]  |
  |  (Syne 800, 20px, --raava-ink)          (primary)  (ghost)   |
  |                                                               |
  |  This guides how Alex thinks, communicates,                   |
  |  and approaches tasks.                                        |
  |                                                               |
  |  ---- Divider ----                                            |
  |                                                               |
  |  +------- Markdown Editor Toolbar -------+                    |
  |  | B | I | H1 | H2 | Bullet | Link | -- |                    |
  |  +---------------------------------------+                    |
  |  |                                       |                    |
  |  | You are a professional, proactive     |                    |
  |  | sales assistant. You communicate      |                    |
  |  | clearly and warmly. You follow up     |                    |
  |  | persistently but not aggressively.    |                    |
  |  | You always update the CRM after       |                    |
  |  | every interaction. You flag hot       |                    |
  |  | leads for immediate human attention.  |                    |
  |  | You draft in a professional but       |                    |
  |  | conversational tone.                  |                    |
  |  |                                       |                    |
  |  +---------------------------------------+                    |
  |  (min-height: 200px, max-height: 500px, resize: vertical)    |
  |                                                               |
  |  Tips for writing a good personality:                         |
  |  - Use "You are..." statements                               |
  |  - Be specific about behaviors ("always update the CRM")     |
  |  - Include what they should escalate to you                   |
  |  - Describe their communication style                         |
  |  (Plus Jakarta Sans 400, 12px, --raava-gray, italic.          |
  |   Collapsible section, collapsed by default.)                 |
  |                                                               |
  |  [ Reset to Default ]                                         |
  |  (text link, --raava-gray, 12px. Resets to role template.)    |
  |                                                               |
  +---------------------------------------------------------------+
```

**Editor Features:**
- Rich text toolbar: Bold, Italic, Heading 1, Heading 2, Bullet list, Link.
- Content is stored as Markdown (SOUL.md).
- Live preview: not side-by-side (too cramped). The editor itself renders basic formatting (bold shows as bold in the editor).
- Character/word count: bottom-right of editor. "234 words" -- `Plus Jakarta Sans 400, 12px, --raava-gray`.
- No character limit (personality can be as long as the user wants -- the LLM context window is the technical limit, but that's not exposed to the user).

**"Reset to Default" Behavior:**

1. Click "Reset to Default."
2. Confirmation: "Reset to the original Sales Assistant personality? Your custom changes will be lost." [Reset] [Keep my changes].
3. If confirmed: editor content is replaced with the role template's default personality text. The "Save" button becomes active.

**Unsaved Changes:**
- If the user clicks "Cancel" with unsaved changes: "You have unsaved changes. Discard them?" [Discard] [Keep editing].
- If the user navigates away (clicks another tab) with unsaved changes: same confirmation dialog.
- No auto-save. Explicit save only.

---

## Step 3: Save and Backend Update

**Trigger:** User clicks "Save."

**Behavior:**
1. "Save" button changes to "Saving..." with a small spinner. "Cancel" is disabled.
2. Request: `PUT /api/team-members/:id/personality` with `{ content: "..." (Markdown string) }`.
3. Backend:
   - Writes the new content to the agent's SOUL.md file inside the Hermes container.
   - Stores a version snapshot: `{ version: 2, content: "...", editedAt: "2026-04-03T14:30:00Z", editedBy: "user" }`.
   - The agent picks up the new SOUL.md on its next task (no restart required -- Hermes reloads SOUL.md per task).
4. Success: editor transitions back to read mode. A brief green flash on the save button (300ms): "Saved" with a checkmark. Then button returns to "Edit."
5. Failure: inline error: "Couldn't save changes. Please try again." Editor stays in edit mode. Content is preserved.

**Metadata Update:**
- "Last edited" updates to "Just now."
- "Template version" changes from "v1.0 (original)" to "v1.0 (customized)."

---

## Step 4: Role Change

### Can a Sales Assistant become an Operations Manager?

**For v1: No.** Role change is not supported. The user must hire a new team member with the desired role and (optionally) remove the old one.

**Rationale (Diana):** Role changes require re-provisioning the entire Hermes container with a different skill pack, different credentials, and different default personality. The complexity is high and the use case is rare. If the user wants an Ops Manager, they should hire one. The "team building" metaphor supports this -- in a real company, you don't reassign your sales rep to become your data analyst.

**What the user sees:**

On the Personality tab, below the editor:

```
  Role: Sales Assistant
  (non-editable, Plus Jakarta Sans 400, 14px, --raava-gray)

  Want a different role? Hire a new team member with the role you need.
  [Hire a Team Member]
  (text link, --raava-blue, 12px)
```

The role label is static. There is no "Change Role" button. There is no dropdown.

**Future (v2) consideration:** Role migration that preserves name, icon, and task history but swaps skills and personality. Requires a "migration wizard" (similar to the hire flow but with data preservation). Not scoped for launch.

### Personality Versioning

**For v1: Basic versioning only.**

- Each save creates a new version record (stored in the database).
- The personality tab shows "Last edited: [timestamp]" and a "History" link.
- "History" link opens a simple modal showing version list:
  ```
  Version History

  v3 - Apr 3, 2026 at 2:30 PM (current)
  v2 - Apr 2, 2026 at 9:15 AM
  v1 - Apr 1, 2026 at 3:00 PM (original)

  [Click any version to preview]
  ```
- Clicking a version shows a read-only preview of that version's content.
- "Restore this version" button below the preview: replaces the current content with the selected version (creates a new version, does not delete history).
- No diff view for v1 (too complex). Just full-text preview per version.

---

## Edge Cases -- Flow 4

| Edge Case | Handling |
|---|---|
| User writes personality instructions that conflict with the role's tools (e.g., "Never send emails" for a Sales Assistant with email configured) | No validation on personality content. The agent will follow the personality instructions, which may result in underutilization of tools. This is the user's choice. |
| User writes extremely long personality (10,000+ words) | No hard limit in UI. Backend truncates to the LLM's system prompt limit if necessary (logged, not surfaced to user). Future: soft warning at 2,000 words. |
| User writes personality in a language other than English | Supported. The agent's LLM can process instructions in multiple languages. No restriction. |
| User deletes all personality content and saves empty | Validation: "Personality can't be empty. Your team member needs instructions to work effectively." [Restore default] button offered. Save is blocked. |
| Two browser tabs open with the same personality editor | Last save wins. No real-time collaboration or locking for v1. |
| User edits personality while team member is working on a task | The edit is saved immediately but takes effect on the NEXT task. The current task continues with the old personality. |

---

# ESTIMATED FIGMA SCREENS

## Flow 1: Hire Flow

| Screen | Variants | Total |
|---|---|---|
| HireWizard_RoleSelect | Default, 1 card hovered, 1 card selected (with detail panel open), Coming Soon state, mobile layout | 5 |
| HireWizard_RoleSelect -- Detail Panel | 6 role variants (one per role, different content) | 6 |
| HireWizard_Credentials | Per-role variants (6 roles x different credential fields), field states (empty, validating, valid, invalid, network error), sub-selector states, "How to get" side panel, Skip confirmation | 14 |
| HireWizard_NameLaunch | Default (pre-filled), name being edited, icon picker interaction, first task being edited, first task empty, "Hire" button hover/active | 6 |
| HireWizard_Provisioning | Loading state with progress | 1 |
| HireWizard_Success | With first task, without first task, with skipped credentials warning | 3 |
| HireWizard_Error | Retryable error, non-retryable error (3 failures), network timeout | 3 |
| Post-Hire -- My Team with "New" badge | Card with badge | 1 |
| Empty State -- My Team | Zero team members | 1 |
| **Flow 1 Total** | | **40** |

## Flow 2: Add Tool

| Screen | Variants | Total |
|---|---|---|
| AddToolModal -- Tool Browser | Default grid, category filtered, search active, no results, tool already active | 5 |
| AddToolModal -- Tool Configuration | Per-tool config variants (Gmail, HubSpot, SQL, Sheets, Zendesk, Hootsuite, Analytics), test connection states, advanced settings expanded | 12 |
| AddToolModal -- Success | Standard success | 1 |
| AddToolModal -- Error | Activation error | 1 |
| **Flow 2 Total** | | **19** |

## Flow 3: Update/Remove Tool

| Screen | Variants | Total |
|---|---|---|
| Tool List (Settings tab section) | Active tools, mixed states (active/error/disabled), empty | 3 |
| Tool Expanded Panel | Active state with actions, error state, disabled state | 3 |
| Update Credentials inline form | Empty, valid, invalid, saving | 4 |
| Reconfigure inline form | Pre-populated, saving | 2 |
| Disable Confirmation | Inline confirmation | 1 |
| Remove Confirmation with Impact | No routines affected, routines affected, task in progress warning | 3 |
| **Flow 3 Total** | | **16** |

## Flow 4: Update Personality

| Screen | Variants | Total |
|---|---|---|
| Personality Tab -- Read Mode | Default, "customized" state | 2 |
| Personality Tab -- Edit Mode | Editor active, tips expanded, reset confirmation, unsaved changes warning | 4 |
| Personality Tab -- Save States | Saving, saved success, save error | 3 |
| Version History Modal | Version list, version preview, restore confirmation | 3 |
| Role Change -- Not Supported message | Static display | 1 |
| **Flow 4 Total** | | **13** |

---

## Grand Total: 88 Figma Screens

| Flow | Screens |
|---|---|
| Flow 1: Hire | 40 |
| Flow 2: Add Tool | 19 |
| Flow 3: Update/Remove Tool | 16 |
| Flow 4: Update Personality | 13 |
| **Total** | **88** |

**Leo's estimate:** At ~4-6 screens per day with variations, this is approximately 15-18 working days of Figma production. Recommendation: prioritize Flow 1 (the demo showpiece for eMerge) and deliver it in 5-6 days. Flows 2-4 can be delivered in a second batch.

**Diana's note:** Flow 1 is the non-negotiable for eMerge. Flows 2-4 need to be functional but can use simpler modal patterns initially and be polished post-launch.

---

## Backend API Endpoints Required

This is the complete list of API endpoints needed to support all four flows. Provided for Rafael and the Backend Pod.

| Endpoint | Method | Flow | Purpose |
|---|---|---|---|
| `/api/credentials/validate` | POST | Flow 1 (Step 3) | Validate a credential against a provider |
| `/api/credentials/test` | POST | Flow 2 (Step 2) | Test a credential connection (same as validate but named for the "Test Connection" context) |
| `/api/team-members/hire` | POST | Flow 1 (Step 5) | Full hire: create member, store creds, provision container, install skills, start agent |
| `/api/team-members/:id/tools` | POST | Flow 2 (Step 3) | Add a tool to an existing team member |
| `/api/team-members/:id/tools/:toolId` | PUT | Flow 3 (Disable/Enable) | Update tool status (disable/enable) |
| `/api/team-members/:id/tools/:toolId` | DELETE | Flow 3 (Remove) | Remove tool and delete credentials |
| `/api/team-members/:id/tools/:toolId/credentials` | PUT | Flow 3 (Update creds) | Update stored credentials |
| `/api/team-members/:id/tools/:toolId/config` | PUT | Flow 3 (Reconfigure) | Update tool configuration |
| `/api/team-members/:id/tools/:toolId/impact` | GET | Flow 3 (Remove) | Get impact preview (affected routines, tasks) |
| `/api/team-members/:id/personality` | PUT | Flow 4 (Save) | Update personality (SOUL.md) |
| `/api/team-members/:id/personality/history` | GET | Flow 4 (History) | Get version history list |
| `/api/team-members/:id/personality/history/:version` | GET | Flow 4 (History) | Get specific version content |
| `/api/team-members/:id/personality/restore` | POST | Flow 4 (Restore) | Restore a specific personality version |

---

*End of document. Ready for engineering handoff and Figma production.*
*Questions and feedback to Diana (Product) and Leo (Design).*
