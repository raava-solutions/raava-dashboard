# Agent Role Cards -- Concept & Design Reference

**Produced by:** Research Team
**Date:** April 3, 2026
**Audience:** Product (Diana), Design (Leo), Engineering (Rafael, Frontend Pod), CEO
**Status:** Ready for review

---

## Table of Contents

1. [What Are Agent Role Cards?](#1-what-are-agent-role-cards)
2. [Industry Landscape: Who Does This Well](#2-industry-landscape-who-does-this-well)
3. [Visual Design Exemplars](#3-visual-design-exemplars)
4. [Card Anatomy Best Practices](#4-card-anatomy-best-practices)
5. [How This Applies to Raava](#5-how-this-applies-to-raava)
6. [Recommended Raava Card Specification](#6-recommended-raava-card-specification)

---

## 1. What Are Agent Role Cards?

### Definition

An agent role card is a **pre-configured AI agent persona packaged as a selectable visual card**. It presents an AI agent's identity, capabilities, and purpose in a self-contained, scannable format -- enabling a user to understand what the agent does, trust it, and activate it in one or two interactions.

The concept sits at the intersection of three design traditions:

- **Trading card / character card** -- a constrained visual format that conveys identity, stats, and capabilities at a glance
- **Job listing / hiring card** -- a role-based frame that communicates what someone does, what they're good at, and what they need to get started
- **SaaS template gallery** -- a browsable collection of pre-built starting points, organized by use case

### How They Differ from Templates or Presets

| Concept | What It Is | What It Lacks |
|---|---|---|
| **Template** | A starting configuration. Technical, emphasizes settings and parameters | Identity. A template has no name, no personality, no visual presence. Users feel they're configuring software |
| **Preset** | A saved state or shortcut. Often buried in settings menus | Narrative. A preset is a toggle, not a character. No emotional engagement |
| **Agent Role Card** | A persona with identity, visual presence, defined capabilities, and behavioral personality | Nothing critical -- it wraps all of the above in a human-readable, emotionally resonant package |

The critical distinction: **templates are about configuration; role cards are about identity.** A template says "Email Follow-Up Workflow v2." A role card says "Alex, your Sales Assistant -- follows up with leads, drafts proposals, never lets a hot lead go cold."

### Why They Work for Non-Technical Users

1. **Recognition over recall.** Users browse and recognize roles rather than having to describe what they need from scratch. This is Hick's Law in action -- structured choices reduce decision time.

2. **The hiring metaphor.** Non-technical business owners (our Carlos persona) think in headcount. They don't think "I need to configure an email automation pipeline." They think "I need someone to follow up on leads." Role cards speak their language.

3. **Anthropomorphism builds trust.** Research from Frontiers in Computer Science (2025) shows that highly anthropomorphic AI avatars correlate with elevated empathy and trust, which improve user experience. Giving an agent a name, a role title, and visual identity activates social cognition -- users relate to the agent as a team member rather than a tool.

4. **Progressive disclosure.** The card surface shows only what matters for the selection decision (role, description, key skills). Technical details (credentials, configuration, personality tuning) are revealed only after selection. This prevents cognitive overload -- the pattern recommended by agentic design research (limit to 2-3 disclosure layers maximum).

5. **Bounded choice.** Six curated role cards are less intimidating than a blank "create your agent" form. Paradox of choice research shows that constrained, high-quality options outperform unlimited flexibility for conversion.

### The Psychology Behind the Card Metaphor

The card metaphor works because it activates a **familiar schema** -- what Jakob Nielsen calls "metaphor-driven affordance." The user's mental model maps immediately:

- **Card = Person.** We are conditioned by trading cards, baseball cards, Pokemon cards, and LinkedIn profiles to associate a card format with an individual's identity and capabilities.
- **Browsing cards = Hiring.** Scrolling through role cards feels like reviewing candidates, not configuring software. This reframes the user's cognitive task from "set up a tool" to "choose a teammate."
- **Selecting a card = Making a decision about a person.** This activates more careful, considered evaluation -- users feel the weight of the choice, which increases commitment and reduces churn.
- **The card constrains information.** Physical cards have edges. This forces information hierarchy -- the most important things must be visible, everything else is secondary. This constraint is a design gift.

The "team building" frame is particularly powerful for SMB owners. They already think in terms of "I need to hire for this role." The role card meets them exactly where their mental model already lives.

---

## 2. Industry Landscape: Who Does This Well

### Lindy.ai

**What they do:** No-code AI agent builder with 50+ pre-built agent templates. Covers sales, support, meetings, email, compliance, and contact center.

**How roles are presented:**
- Templates organized by use-case categories: Lead Outreacher, Customer Support, Compliance Workflows, Contact Center
- Each template has a clear role label and one-line description of what it does
- Users can "duplicate proven templates" and customize them
- 4,000+ integrations shown as connectable tools
- Drag-and-drop visual workflow builder for customization after selection

**What works:** Category-first organization makes browsing efficient. The "duplicate and customize" model lowers the barrier -- you're not building from scratch, you're modifying a working agent. The template names are action-oriented ("Lead Outreacher" not "Sales Template").

**What doesn't work:** Templates feel functional rather than personal. No strong visual identity per agent -- they read more like workflow templates than team members. Missing the anthropomorphic element.

**Relevance to Raava:** Good model for functional categorization. We should borrow the "start from a working template" confidence but add the human identity layer they lack.

---

### Relevance AI

**What they do:** Agent marketplace with 265+ community-created and staff-created agents. Emphasis on sales, marketing, operations, and research use cases.

**How roles are presented:**
- Grid-based card layout with consistent styling
- Each card shows: emoji/avatar at top, agent name, brief description, tool integration icons at bottom (Gmail, LinkedIn, Salesforce logos), rating (stars), clone count, price (free or $4.97-$36.99)
- Categories: Sales, Marketing, Content Creation, Operations, Research, HR & Talent
- Sorting by: recently updated, date created, name, price, clone count, rating

**Card anatomy (observed):**
```
[Emoji/Avatar]
[Agent Name]                    [Price]
[1-2 line description]
[Tool icons: Gmail, LinkedIn, Salesforce...]
[Rating: 4.2 stars] [573 clones]
```

**What works:** The clone count and rating provide social proof -- "573 other people use this." Tool integration icons immediately answer "does it connect to my stuff?" Pricing on the card enables instant cost evaluation. The marketplace model (community + staff agents) creates abundance and credibility.

**What doesn't work:** Emoji-based avatars feel lightweight for a premium product. The marketplace framing positions agents as downloadable utilities rather than team members. No personality or behavioral description visible on the card. Dense information layout can feel overwhelming with 265 results.

**Relevance to Raava:** The tool-icon badges are a pattern we should adopt -- Carlos immediately sees "it works with HubSpot." The rating/social-proof pattern is smart but premature for our launch. We should not use the marketplace frame -- our six curated roles are a "team you're hiring," not a "store you're browsing."

---

### CrewAI

**What they do:** Open-source framework for multi-agent orchestration. Agents are defined programmatically with role, goal, and backstory.

**How roles are defined:**
```yaml
researcher:
  role: >
    Senior Research Analyst
  goal: >
    Uncover cutting-edge developments in AI
  backstory: >
    You're a seasoned researcher with a knack for uncovering
    the latest developments in AI. Known for your ability
    to find the most relevant information and present it
    in a clear and concise manner.
```

Three core attributes per agent:
1. **Role** -- functional title defining expertise
2. **Goal** -- what drives decision-making
3. **Backstory** -- personality and context that shapes behavior

Optional attributes: tools, LLM config, execution limits, delegation permissions, code execution capabilities.

**What works:** The role/goal/backstory triad is elegant and maps directly to how people think about colleagues. "What's their role? What are they trying to achieve? What's their background?" This is the most thoughtful agent identity model in the industry.

**What doesn't work:** It's a developer framework, not a UI. No visual presentation. The YAML format is powerful but invisible to end users.

**Relevance to Raava:** CrewAI's role/goal/backstory model should directly inform our card content structure. Our cards should surface these three elements even if we call them different things: Role Title, What They Do, How They Work.

---

### Microsoft AutoGen / Agent Framework

**What they do:** Programming framework for multi-agent AI systems. Agents defined as AssistantAgent (AI worker) or UserProxyAgent (human proxy).

**How roles are defined:**
- Agents follow the Actor Model -- each is an independent entity with its own state
- Roles defined by: system message (persona), tools available, interaction model
- Emphasis on separation of concerns: Orchestrator manages flow, Specialists have narrow scope
- Role types: Manager (oversees distribution), Worker (executes tasks), Researcher (gathers information)

**What works:** The separation-of-concerns principle -- narrow, focused roles perform better than broad ones. The orchestrator/specialist pattern validates our "team of focused roles" approach over a single general-purpose agent.

**What doesn't work:** Entirely developer-facing. No visual identity layer. Role definitions are in code, not in a selectable UI.

**Relevance to Raava:** Validates our architectural decision to offer focused roles (Sales Assistant, not "General AI"). The research finding that "narrow scope reduces cognitive load on the LLM and allows it to perform better" is a selling point we can use: "Specialized team members outperform general-purpose AI."

---

### Bland.ai

**What they do:** AI phone agent platform for enterprises. Agents handle inbound/outbound calls.

**How roles are presented:**
- Agents defined through "conversational pathways" -- graph-based conversation design
- Each agent has: a role definition, background information, and target caller persona
- No visual card gallery -- agents are built through a flow builder
- "Pathways" system lets you define exact actions at every conversation node

**What works:** The instruction to include "the role the AI is playing, and who the human on the other side is" is a good practice -- context about the interaction partner makes agents smarter.

**What doesn't work:** No browsable role selection. Building-focused, not hiring-focused. Enterprise-oriented, not SMB-friendly.

**Relevance to Raava:** Limited direct UI relevance. The principle of defining both agent role AND interaction context (who they're talking to) is worth noting for our SOUL.md design.

---

### Botpress

**What they do:** AI chatbot platform with template gallery organized by industry and field.

**How roles are presented:**
- Templates grouped by field: Students, Telecommunications, Healthcare, etc.
- Each card shows: category heading, descriptive tagline, illustrative image, "Explore templates" CTA
- Robot illustrations paired with industry-specific imagery
- Color-coded graphics per category
- Only ~8 templates available (limited selection)

**What works:** Industry-specific illustrations immediately help users self-identify ("this is for my field"). The cartoon robot aesthetic is friendly and approachable.

**What doesn't work:** Too few templates. Category-level cards (not individual agents) add an extra navigation step. Robot illustrations feel generic. No detailed capabilities on the card surface.

**Relevance to Raava:** The industry-specific illustration approach is interesting but wrong for us -- our roles are functional (Sales, Support) not vertical (Healthcare, Telecom). The friendly illustration style is worth noting; Leo should consider whether our avatars lean illustrative or abstract.

---

### Voiceflow

**What they do:** No-code voice and chat agent builder with community template gallery.

**How roles are presented:**
- Card-based grid layout with robust filtering
- Each card shows: cover image, "Certified" badge, title, description, creator avatar + name, download count, "FREE" label, category tags
- Filtering by: use case, industry, category, creator type, product type
- Community + staff templates with pagination

**Card anatomy (observed):**
```
[Cover Image]
[Certified Badge]
[Template Title]
[Description]
[Creator Avatar] [Creator Name]
[Download Count]            [FREE / Price]
[Category Tags]
```

**What works:** The certification badge builds trust. Creator attribution adds social proof. Cover images make cards visually distinct and browsable. The multi-axis filtering (use case + industry + creator) enables both browsing and targeted search.

**What doesn't work:** Cover images vary wildly in quality (community submissions). The "template" framing is functional, not personal. No agent personality or behavioral description.

**Relevance to Raava:** The certification/quality badge concept is interesting -- we could use a "Raava Verified" badge on our curated roles. The cover image pattern is too heavy for our use case (we have 6 roles, not hundreds). Better to use consistent, designed avatars/icons.

---

### Taskade

**What they do:** AI workspace with custom agent teams. Agents are digital team members with roles, personalities, and collaborative capabilities.

**How roles are presented:**
- Agents assigned roles: Analyst, Researcher, Sales Assistant, Support Representative, Content Writer, Operations Manager, Project Coordinator
- Configuration includes: Name, Description, Persona, Tone of Voice
- Agent teams can be created and deployed as groups
- "Use Team" button for instant deployment

**What works:** The "agent team" framing is the closest to what Raava is doing. Roles map directly to business functions. The persona + tone configuration acknowledges that agents have personality, not just capability. Team deployment is a strong feature.

**What doesn't work:** Configuration-heavy interface. No visual card gallery for browsing roles. The agent creation flow feels like filling out a form, not hiring a person.

**Relevance to Raava:** Validates our role taxonomy (their roles overlap significantly with ours). The team-based deployment model is something to consider for v2 ("Hire a starter team" package). Their persona + tone attributes align with our SOUL.md approach.

---

### MindPal

**What they do:** AI workforce builder with marketplace of agent and workflow templates.

**How roles are presented:**
- Marketplace with community-created templates
- Visual builder for multi-agent workflows
- "Describe in plain English what job you want to automate" as alternative to browsing
- Agent templates categorized by function

**What works:** The "describe what you need" fallback is smart -- if someone doesn't find a pre-built role that fits, they can describe their need. The "AI workforce" language resonates with the hiring metaphor.

**What doesn't work:** Community marketplace means variable quality. Visual builder is powerful but complex for non-technical users.

**Relevance to Raava:** The "AI workforce" positioning validates our direction. The natural language fallback ("describe what you need") could be a v2 feature for custom role creation. For launch, our six curated roles are the right approach.

---

## 3. Visual Design Exemplars

### Dribbble / Behance Patterns Observed

Based on extensive search of design community platforms (300+ AI agent designs on Dribbble, Behance AI agent dashboard projects), the following visual patterns dominate high-quality agent card designs in 2025-2026:

**Pattern 1: Dark Glassmorphism Cards**
The dominant premium aesthetic. Semi-transparent card backgrounds with frosted glass effect, placed over ambient color gradients (deep purples, neon blues, teals). Subtle border glow on hover. This style is described as the "aesthetic that will define UI in 2026" -- it communicates reliability, innovation, and premium quality. Common in fintech, trading platforms, and high-end SaaS.

Key elements:
- Dark background (#0A-#1A range)
- Card with backdrop-blur and rgba fill
- Ambient gradient orbs behind cards (purple, blue, teal)
- Subtle colored rim (1px border with low-opacity brand color)
- Glow effect on hover (box-shadow with brand color)

**Pattern 2: Agent Profile Cards (The "Hire" Pattern)**
Cards designed to feel like professional profiles. Clean white or light cards with:
- Circular or rounded-square avatar/icon at top center
- Role title in bold (20-24px)
- One-line description beneath
- Skill tags as small rounded badges
- Action button at bottom ("Hire" / "Deploy" / "Start")
- Status indicator (Available / Busy / Offline)

This pattern is most aligned with the "hiring" metaphor. It borrows from LinkedIn profile cards and recruiting platform candidate cards.

**Pattern 3: Dashboard Team View**
Agent cards appearing in a team management dashboard context:
- Horizontal card row or 2x3/3x2 grid
- Each card shows: avatar, name, role, current status, last activity
- Status indicators: green dot (active), yellow (idle), red (needs attention)
- Click-to-expand reveals detail panel with full capability list and recent work history
- The overall layout feels like a team management tool (think Monday.com or Linear team view)

**Pattern 4: Gradient Accent Cards**
White/light cards where the brand gradient appears as an accent element rather than the full background:
- Gradient used for: left border stripe, top header bar, icon background, or hover state
- Clean, professional feel suitable for business SaaS
- Easier to maintain readability than full glassmorphism
- Works well in both light and dark modes

### The Most Visually Striking Examples

1. **Lucent HR -- AI-Powered Workforce Intelligence Platform (Behance):** Uses team member cards with clean avatars, role badges, and status indicators in a workforce management dashboard. Professional, clear, and human-centered.

2. **Fetch AI Agent Interface (Dribbble, by milkinside):** Dark theme with gradient accents, card-based agent selection with clear capability badges and action states.

3. **AI Agent Customer Service Dashboard (Behance):** Grid of agent cards showing active status, current conversation count, performance metrics, and quick-action buttons. Demonstrates how agent cards work in an operational context (not just selection).

4. **AI Agent Smart Dashboard designs (Dribbble):** Productivity-focused dashboards with agent cards showing task completion rates, availability status, and skill coverage visualization.

---

## 4. Card Anatomy Best Practices

### The Ideal Agent Role Card: Element Hierarchy

Based on research across platforms, design communities, and UX literature, the ideal agent role card follows this information hierarchy (top to bottom, most to least important):

```
LAYER 1 -- Identity (immediate recognition)
  - Visual icon or avatar
  - Role title

LAYER 2 -- Purpose (understand in 5 seconds)
  - One-line description of what this agent does

LAYER 3 -- Capabilities (quick assessment)
  - 3-5 skill/tool badges

LAYER 4 -- Action (clear next step)
  - Primary CTA button

LAYER 5 -- Detail (on demand)
  - Expanded panel with full details (personality, credentials, example tasks)
```

### Element-by-Element Guidance

**Icon/Avatar**
- Should be distinct per role -- users should identify the role from the icon alone
- Abstract/geometric icons (not photorealistic faces) for AI agents. Photorealistic faces trigger uncanny valley; abstract icons communicate "AI-powered" while remaining friendly
- Consistent style across all role cards -- same illustration weight, same color treatment
- Recommended: role-specific icon inside a gradient-filled rounded square or circle
- Size: 48-64px in card context, 80-96px in detail/expanded view

**Role Title**
- 2-4 words maximum. This is the primary text element
- Font: display/heading weight (bold/semibold, 18-22px)
- Examples: "Sales Assistant," "Data Analyst," "Customer Support" -- not "AI-Powered Automated Sales Lead Follow-Up System"

**Description**
- One sentence, max two lines. Action-oriented. Describes outcomes, not features
- Font: body weight (regular, 14-16px)
- Good: "Follows up with leads, drafts proposals, and keeps your CRM updated"
- Bad: "Utilizes advanced NLP to process email communications and integrate with CRM APIs"

**Skill/Tool Badges**
- Small rounded pills or icon+text tags
- Show 3-5 maximum on card surface; "and N more" for overflow
- Use recognizable tool logos where possible (Gmail, HubSpot, Slack icons)
- These answer the critical question: "Does it work with my tools?"

**Primary CTA**
- Single action button: "Hire" / "Select" / "Get Started"
- Prominent but not dominant -- the card's job is to inform, the button is secondary
- Appears on hover (desktop) or always visible (mobile)

**Status/Availability (post-hire context)**
- Dot indicator: green (active), yellow (idle), gray (offline), red (needs attention)
- Only shown on "My Team" page, not during role selection/hiring flow

### Dimensions and Proportions

- **Selection grid (onboarding wizard):** Cards in 2x3 or 3x2 grid. Each card approximately 280-320px wide by 200-240px tall. Enough space for icon + title + description + badges + CTA
- **My Team page (dashboard):** Cards can be wider (360-400px) with additional status and activity information
- **Mobile:** Single column, cards full-width minus margin (padding 16px each side). Stack vertically. Touch target minimum 44px for interactive elements
- **Aspect ratio:** Roughly 4:3 for selection cards (wider than tall). Vertical cards (3:4) feel more like "trading cards" but use space less efficiently in a grid

### Interaction States

| State | Visual Treatment | When |
|---|---|---|
| **Default** | Card with subtle border (1px, --border color), clean background | Browsing, no interaction |
| **Hover** | Border transitions to brand gradient, subtle shadow lift (4-8px), optional glow | Desktop cursor enters card area |
| **Selected** | Solid brand gradient border (2px), checkmark badge in top-right corner, slight scale-up (1.02x) | User has chosen this role |
| **Disabled** | Reduced opacity (0.5), "Coming Soon" overlay, no hover effect | Role not yet available |
| **Active (on My Team)** | Green status dot, last activity timestamp, subtle pulse on status dot | Team member is currently working |
| **Needs Attention** | Red/amber status dot, alert badge count, border highlight in warning color | Team member has an error or pending review |

### Mobile Considerations

- Cards must be full-width on mobile (not side-scrolling horizontal scroll)
- Touch targets minimum 44x44px (Apple HIG) / 48x48dp (Material)
- Reduce badge count to 3 maximum on mobile (space constraint)
- CTA button should be always visible (no hover-to-reveal on touch)
- Consider a list view alternative for mobile with: icon (40px), title, one-line description, and chevron for detail
- Swipe gestures are acceptable for card-level actions on My Team page (swipe to see quick actions)

---

## 5. How This Applies to Raava

### Our Specific Context

- **Target users:** Non-technical SMB owners and operators (Carlos, Vanessa, Mia). They think in headcount, not infrastructure
- **The experience must feel like hiring a person, not configuring software**
- **Six curated roles:** Sales Assistant, Operations Manager, Customer Support, Data Analyst, Marketing Coordinator, General Assistant
- **Each role has:** Pre-configured skills, personality (SOUL.md), required credentials, included tools
- **Two contexts for role cards:** (1) Onboarding wizard "Choose a Role" step, and (2) "Hire" flow from My Team page
- **Brand aesthetic:** Raava blue (#224AE8), teal (#00BDB7), purple (#716EFF), brand gradient, Syne display font, Plus Jakarta Sans body font

### What Our Research Tells Us

1. **The role/goal/backstory model (CrewAI) should inform our card content** even though we won't expose it in those terms. On the card: Role = Title, Goal = Description, Backstory = revealed in detail panel as "Personality."

2. **Tool badges are essential (Relevance AI pattern).** Carlos and Vanessa will immediately look for "does it work with HubSpot/Gmail/Slack?" Tool logos on the card answer this without requiring a click.

3. **The hiring metaphor must be literal, not just tonal.** The CTA should say "Hire" not "Select" or "Configure." The success state should say "Alex is on your team" not "Agent deployed."

4. **Progressive disclosure is critical (3 layers max).** Layer 1: Card surface (role, description, tools). Layer 2: Expanded detail (personality, example task, credentials needed). Layer 3: Post-hire configuration (advanced settings, custom instructions).

5. **Moderate anthropomorphism builds trust; excessive anthropomorphism backfires.** Abstract illustrated avatars (not photorealistic faces) hit the sweet spot. Name suggestion (not mandatory) adds personality without deception.

6. **Social proof is premature at launch but should be designed-in for later.** Reserve space on the card for "Popular" badges or usage counts when we have the data.

7. **Dark glassmorphism is the premium aesthetic of 2026** but our brand guidelines define a light theme. Recommendation: use light theme as default with brand gradient accents (Pattern 4 from our exemplars). Reserve dark glassmorphism for the marketing site and demo mode.

---

## 6. Recommended Raava Card Specification

### Card Layout: Front (Selection State)

```
+--------------------------------------------------+
|                                                  |
|         [Role Icon - 56px]                       |
|         gradient-filled rounded square           |
|                                                  |
|         Sales Assistant                          |
|         (Syne 800, 20px, --ink)                  |
|                                                  |
|  Follows up with leads, drafts proposals,        |
|  and keeps your CRM updated.                     |
|  (Plus Jakarta Sans 400, 14px, --gray)           |
|                                                  |
|  [Gmail icon] [HubSpot icon] [Docs icon] +3      |
|  (tool badges, 24px icons, rounded pill bg)      |
|                                                  |
|              [ Hire ]                            |
|  (gradient button, Plus Jakarta Sans 500, 14px)  |
|                                                  |
+--------------------------------------------------+
```

**Dimensions:** 300px wide x 220px tall (desktop), full-width x auto (mobile)
**Border:** 1px solid --border (#E5E7EB), 12px radius
**Background:** --card (#FFFFFF)
**Padding:** 24px
**Spacing:** 12px between elements

### Card Layout: Hover State

- Border transitions to: `1px solid rgba(34, 74, 232, 0.4)` (brand blue at 40%)
- Box shadow: `0 4px 16px rgba(34, 74, 232, 0.12)` (subtle blue glow)
- Transform: `translateY(-2px)` (slight lift)
- Transition: 200ms ease

### Card Layout: Selected State

- Border: `2px solid` with brand gradient
- Checkmark badge appears in top-right corner (20px circle, gradient fill, white check icon)
- Expanded detail panel slides open below the card grid

### Expanded Detail Panel (After Selection)

This panel appears below the card grid when a role is selected. It provides Layer 2 information.

```
+---------------------------------------------------------------+
|                                                               |
|  [Role Icon 80px]    Sales Assistant                          |
|                      Follows up with leads, drafts proposals, |
|                      and keeps your CRM updated.              |
|                                                               |
|  --- Divider ---                                              |
|                                                               |
|  HOW THEY WORK                                                |
|  Professional, proactive, follows up persistently but not     |
|  aggressively. Always updates CRM after every interaction.    |
|  Flags hot leads for your immediate attention.                |
|  (derived from SOUL.md, written in human-friendly language)   |
|                                                               |
|  --- Divider ---                                              |
|                                                               |
|  TOOLS & SKILLS                                               |
|  [Gmail] Email Send & Read                                    |
|  [HubSpot] CRM Read & Write                                  |
|  [Docs] Document Drafting                                     |
|  [Calendar] Calendar Read                                     |
|                                                               |
|  --- Divider ---                                              |
|                                                               |
|  WHAT THEY'LL NEED FROM YOU                                   |
|  [lock icon] Gmail API Key                                    |
|  [lock icon] CRM API Key (HubSpot or Salesforce)              |
|  (These are set up in the next step)                          |
|                                                               |
|  --- Divider ---                                              |
|                                                               |
|  EXAMPLE FIRST TASK                                           |
|  "Review my recent leads and draft follow-up emails for       |
|   anyone who hasn't responded in 3+ days."                    |
|                                                               |
+---------------------------------------------------------------+
```

### What Goes Where: Summary

| Element | Card Front | Detail Panel | Post-Hire (My Team) |
|---|---|---|---|
| Role icon | Yes (56px) | Yes (80px) | Yes (40px) |
| Role title | Yes (primary) | Yes (heading) | Yes (primary) |
| Description | Yes (2 lines) | Yes (full) | Abbreviated (1 line) |
| Tool badges | Yes (icons, max 5) | Yes (icons + labels) | Yes (icons only) |
| Personality summary | No | Yes | Accessible via settings |
| Required credentials | No | Yes (with lock icons) | Status indicator (configured/not) |
| Example first task | No | Yes | No (shown during hire flow) |
| Hire/Select CTA | Yes | No (already selected) | N/A |
| Status indicator | No | No | Yes (active/idle/error) |
| Current task | No | No | Yes |
| Last activity | No | No | Yes |
| Custom name | No | No | Yes (user-given name) |
| Spend this period | No | No | Yes (on detail page) |

### Credential/Tool Indication

Credentials should never feel intimidating on the card. The approach:

1. **On card surface:** Tool icons only. Gmail, HubSpot, Zendesk logos. No mention of "API keys" or "credentials." The icons answer "what does it connect to?" without raising "how hard is this to set up?"

2. **In detail panel:** "What they'll need from you" section. Use lock icons and human-readable labels: "Gmail API Key" not "SMTP credentials." Include a reassuring note: "These are set up in the next step."

3. **In credential setup step (wizard step 3):** Full credential entry form with help links, validation, and skip option. Security messaging: "Stored in a secure vault. Never visible in plaintext after setup."

4. **On My Team page:** Simple status dots next to tool icons. Green = configured. Gray = not yet set up. Clicking opens configuration modal.

### Visual Treatment: Making It Feel Premium and Human

**Color strategy:**
- Cards are white on light background, with brand gradient used sparingly for accents
- Each role gets a unique accent color drawn from the brand palette:
  - Sales Assistant: Brand Blue (#224AE8)
  - Operations Manager: Purple (#716EFF)
  - Customer Support: Teal (#00BDB7)
  - Data Analyst: Blend of Blue-Purple
  - Marketing Coordinator: Blend of Purple-Teal
  - General Assistant: Full gradient
- The accent color appears in: icon background, hover border tint, selected state gradient direction

**Icon treatment:**
- Custom illustrated icons per role, not generic stock icons
- Style: geometric, clean, friendly -- same design language as the Raava star mark
- Each icon sits inside a rounded square (8px radius) with a subtle gradient fill using the role's accent color
- Icons should be abstract representations of the role (e.g., envelope + chart for Sales, headset for Support, bar chart for Data Analyst) rather than human faces

**Typography:**
- Role title: Syne 800, 20px (matches brand display font)
- Description: Plus Jakarta Sans 400, 14px, --gray color
- Tool badges: Plus Jakarta Sans 500, 12px
- Section headers in detail panel: Plus Jakarta Sans 500, 12px, uppercase, --gray, letter-spacing 0.05em

**Micro-interactions:**
- Hover lift: 200ms ease, translateY(-2px)
- Selection: 300ms spring animation for border gradient appearance
- Checkmark: fade-in with slight scale from 0.8 to 1.0
- Detail panel: slide-down with 300ms ease-out
- Tool badges: subtle stagger animation on panel open (each badge appears 50ms after the previous)

**What makes it feel human, not software:**
- Language: "Hire" not "Deploy." "How they work" not "Configuration." "What they'll need from you" not "Required credentials"
- Suggested names: Each role comes with a friendly default name suggestion (Alex, Jordan, etc.) -- the user can change it
- The personality section uses first-person language derived from SOUL.md but rewritten for display: "Follows up persistently but not aggressively" rather than system prompt syntax
- The example first task is written as something a manager would say to a new hire: "Review my recent leads and draft follow-up emails..."
- Post-hire celebration: confetti/animation, "[Name] is on your team!" -- this is the emotional payoff that confirms the hiring metaphor

### Dark Mode Variant

When dark mode is implemented:
- Card background: #1A1A1A
- Card border: 1px solid rgba(255, 255, 255, 0.08)
- Hover: border transitions to brand color at 40% opacity, glow shadow intensifies
- Text: --ink inverts to #F5F5F5, --gray becomes #9CA3AF
- Icon gradient fills become more vibrant against dark background
- This is where the glassmorphism aesthetic shines -- consider backdrop-blur: 12px with rgba card fill for dark mode

---

## Appendix A: Competitive Feature Matrix

| Feature | Lindy | Relevance AI | CrewAI | Voiceflow | Taskade | MindPal | Botpress | **Raava (Recommended)** |
|---|---|---|---|---|---|---|---|---|
| Visual card gallery | Partial | Yes | No | Yes | No | Yes | Partial | **Yes** |
| Role-based identity | Template names | Agent names | Role/Goal/Backstory | Template titles | Role + Persona | Template names | Category names | **Title + Personality + Tools** |
| Tool/integration visibility | Listed | Icon badges | Code-level | Tags | Listed | Listed | No | **Icon badges on card** |
| Anthropomorphic elements | Minimal | Emoji avatars | None | Creator avatars | Name + Tone | Minimal | Robot illustrations | **Custom icons + Name + Personality** |
| Hiring metaphor | No (template) | No (marketplace) | No (code) | No (template) | Partial (team) | Partial (workforce) | No (template) | **Yes (explicit)** |
| Progressive disclosure | No | Basic (card->detail) | N/A | Basic (card->page) | Form-based | Basic | Category->list | **3-layer (card->panel->config)** |
| Social proof | No | Rating + clones | GitHub stars | Download count | No | No | No | **Designed-in, activated later** |
| Personality/behavior visible | No | No | Yes (code) | No | Yes (config) | No | No | **Yes (detail panel)** |
| Mobile optimized | Yes | Yes | N/A | Yes | Yes | Yes | Yes | **Yes (required)** |
| Price on card | No | Yes | N/A | Yes | N/A | No | No | **No (addressed in billing)** |

---

## Appendix B: Key Sources

**Platform Research:**
- Lindy.ai: https://www.lindy.ai/lindy-ai-agents
- Relevance AI Marketplace: https://marketplace.relevanceai.com/category/agent
- CrewAI Agent Docs: https://docs.crewai.com/en/concepts/agents
- Microsoft AutoGen: https://github.com/microsoft/autogen
- Voiceflow Templates: https://www.voiceflow.com/templates
- Botpress Gallery: https://botpress.com/browse-by-field
- Taskade AI Agents: https://help.taskade.com/en/articles/8958457-custom-ai-agents-the-intelligence-pillar
- MindPal Marketplace: https://mindpal.space/marketplace
- Bland.ai: https://www.bland.ai/

**Design & UX Research:**
- AI Agent Design Best Practices: https://hatchworks.com/blog/ai-agents/ai-agent-design-best-practices/
- Card UI Best Practices: https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-owners
- Progressive Disclosure for Agentic AI: https://agentic-design.ai/patterns/ui-ux-patterns/progressive-disclosure-patterns
- AI UX Progressive Disclosure: https://www.aiuxdesign.guide/patterns/progressive-disclosure
- Designing AI Agent Personas (Mindra): https://mindra.co/blog/designing-ai-agent-personas-system-prompts-enterprise
- Metaphor in UX Design (Nielsen): https://jakobnielsenphd.substack.com/p/metaphor
- Mental Models (Laws of UX): https://lawsofux.com/mental-model/
- AI Agent Onboarding UX: https://standardbeagle.com/ai-agent-onboarding/

**Psychology & Trust Research:**
- Anthropomorphism and Trust in Chatbot Avatars (Frontiers, 2025): https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2025.1531976/full
- Humanlike AI Design and Trust (arXiv): https://arxiv.org/html/2512.17898v1
- Treating AI Agents as Personas (UX Collective): https://uxdesign.cc/treating-ai-agents-as-personas-6ef0135bdcad

**Visual Design Trends:**
- Dark Glassmorphism 2026: https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f
- Glassmorphism Best Practices: https://uxpilot.ai/blogs/glassmorphism-ui
- Dribbble AI Agent Designs: https://dribbble.com/search/ai-agent
- Dribbble AI Agent UI: https://dribbble.com/tags/ai-agent-ui
- Figma AI Agent Design Template: https://www.figma.com/community/file/1451995163875477138/ai-agent-purpose-and-personality-design-template

---

*End of document. Questions and feedback to the Research Team.*
