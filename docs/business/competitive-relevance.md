# Competitive Analysis: Relevance AI vs. Raava

**Prepared for:** CEO (competitive intelligence)
**Date:** April 4, 2026
**Produced by:** Intel Team (Kai), VP Product (Diana)

---

## What Relevance AI Does

Relevance AI is a San Francisco- and Sydney-based AI agent platform ($37M total funding including a $24M Series B led by Bessemer Venture Partners in May 2025, $2.9M revenue as of 2024, ~23 employees) that positions as the "home of the AI Workforce." The platform is a low/no-code builder for creating AI "Workers" — autonomous agents with defined roles, skills, knowledge bases, and escalation rules. Its core differentiator is **multi-agent orchestration through Workforces** — visual canvases where multiple specialized agents coordinate on complex, multi-step workflows with defined handoffs. Relevance offers 2,000+ native integrations, SOC 2 Type II certification, GDPR compliance, and multi-region data residency (US, EU, AU). Their pricing splits into Actions (what agents do) and Vendor Credits (LLM costs at zero markup), with plans from free to $349/month Business tier plus custom Enterprise. Notable customers include Canva, Autodesk, KPMG, Databricks, and Freshworks. Uses configurable LLMs including bringing your own API keys.

## What Raava Does Differently (The Pitch)

Relevance AI gives you a canvas to wire agents together. Raava gives you an organization. Relevance's Workforces are visual workflows where agents hand off tasks in sequence — sophisticated, but still fundamentally a pipeline with AI nodes. Raava's team members exist in isolated infrastructure with persistent identities, real credential access, and an org hierarchy that mirrors how companies actually work. Relevance agents share a platform. Raava agents each have their own vault, their own container, and their own place in the org chart. The difference is between orchestrating automations and managing a workforce.

---

## Head-to-Head Comparison

| Dimension | Relevance AI | Raava | Advantage |
|---|---|---|---|
| **Positioning** | "AI Workforce" / no-code agent builder platform | AI workforce platform — team members you hire, manage, and scale | **Draw** — both use workforce framing. Relevance is further along in marketing it |
| **Agent architecture** | Workers with roles, skills, knowledge bases + Workforces for multi-agent orchestration | 4-tier (Solo, Pod, Swarm, Org) with cross-agent coordination, escalation, and org hierarchy | **Raava** — Relevance's orchestration is pipeline-based; Raava's is organization-based with true hierarchy |
| **Multi-agent coordination** | Visual canvas — drag agents into Workforces with defined handoffs and triggers | Org chart model — agents report to each other, escalate, delegate, and coordinate through tiers | **Raava** — Relevance chains agents sequentially; Raava models organizational dynamics |
| **Agent builder** | No-code builder + marketplace templates + "Invent" (natural language agent generation) | Role cards + SOUL.md personality per agent, deep identity and behavior configuration | **Draw** — Relevance is more accessible for non-technical users; Raava offers deeper identity control |
| **Integrations** | 2,000+ native integrations via built-in tool library | Hermes skills + credential vault (deep integration via real credentials) | **Relevance** — larger catalog, though Raava's credential-based approach is deeper per integration |
| **Tool system** | 9,000+ pre-built tools in the tool library (actions agents can perform) | Hermes skills — configurable per agent with credential isolation | **Relevance** — the tool library is massive and covers most common business actions |
| **Infrastructure** | Multi-tenant with logical data separation; Enterprise gets dedicated services + custom VPCs | Dedicated containers per agent with Fleet API provisioning, full tenant isolation | **Raava** — true infrastructure isolation per agent vs. logical separation in shared environment |
| **Credential security** | Encrypted API keys, self-managed, stored in platform | 1Password vault per agent, credential isolation, audit trail, tenant separation | **Raava** — vault-based per-agent credential management is architecturally superior |
| **Compliance** | SOC 2 Type II, GDPR, multi-region data residency (US/EU/AU), TLS 1.2+, AES-256 | Architecture supports compliance but no independent certification yet | **Relevance** — certifications are a hard enterprise gate |
| **Data residency** | User-selectable at signup: US (N. Virginia), EU (London), AU (Sydney) | Not yet configurable — single deployment | **Relevance** — multi-region is table stakes for global enterprise buyers |
| **Human escalation** | Built-in escalation paths with configurable confidence thresholds per workflow | Escalation chains through org hierarchy — agents escalate to managers/humans | **Draw** — both handle escalation, Relevance is more granular per-workflow, Raava is more organizational |
| **Knowledge management** | RAG system with document upload, URL indexing, and connected data sources | Brain/context per agent, company knowledge base | **Draw** — both implement RAG; Relevance's is more documented |
| **Pricing** | Free tier, $19-$349/mo, Actions + Vendor Credits split, BYOK option | $99-$1,999/mo tiered by team size | **Relevance** — lower entry, transparent LLM cost pass-through, BYOK eliminates vendor credit cost |
| **Enterprise customers** | Canva, Autodesk, KPMG, Databricks, Freshworks, Rakuten, Confluent | Pre-launch — no enterprise customers yet | **Relevance** — logo-tier enterprise customers validate the platform |
| **Target market** | Sales and GTM teams primarily, expanding to ops/support/research | SMB operators (10-100 employees) who need organizational AI leverage | **Relevance** — more focused GTM with proven sales use case; Raava targets broader ops |
| **Maturity** | Live product, $2.9M revenue, enterprise logos, growing | Pre-launch, building toward eMerge Americas demo (April 22) | **Relevance** — live, funded, with enterprise validation |

---

## 3 Key Differentiators the CEO Should Tell an Investor

**1. "Relevance orchestrates pipelines. Raava manages organizations."**
Relevance's Workforces are visual workflow canvases — you drag agents in, define handoffs, and set triggers. It's sophisticated automation but it's still a directed acyclic graph. Raava's architecture models how real organizations work: agents have managers, teams have structures, work escalates through tiers, and agents coordinate laterally across pods. When a 30-person company wants to replicate their org in AI, they need an org model, not a flowchart builder.

**2. "Their agents share a building. Ours each have their own office with their own safe."**
Relevance uses multi-tenant infrastructure with logical data separation — agents share the underlying platform and credentials are stored centrally. Raava provisions each agent in its own container with its own 1Password vault. For a CISO evaluating AI workforce platforms, the question is: "If one agent is compromised, what's the blast radius?" With Relevance, it's the tenant. With Raava, it's one container.

**3. "We built for the operator. They built for the sales team."**
Relevance's primary go-to-market is AI BDRs and sales automation — their homepage leads with "AI Agents for Sales & GTM Teams." This makes them strong in one vertical but limits their positioning. Raava is built for the Head of Ops who needs to deploy AI across functions — support, finance, HR, sales, and operations. Different buyer, broader TAM, higher strategic value per customer.

---

## 3 Honest Weaknesses Where Relevance AI Beats Raava Today

**1. Enterprise logos and market validation.**
Relevance has Canva, KPMG, Autodesk, and Databricks on their customer page. These aren't just logos — they're proof that enterprise procurement teams have evaluated, approved, and deployed the platform. Raava has zero customers. In enterprise sales, "who else uses this?" is the first question, and Raava currently has no answer.

**2. Multi-region data residency out of the box.**
Relevance offers user-selectable data residency at signup (US, EU, or AU). For any company subject to GDPR, data sovereignty laws, or internal data governance policies, this is a checkbox requirement. Raava currently operates from a single deployment, which limits the addressable enterprise market.

**3. Tool and integration breadth (9,000+ tools, 2,000+ integrations).**
Relevance's pre-built tool library gives agents immediate access to 9,000+ actions across 2,000+ integrated platforms. The "Invent" feature lets users describe a new tool in natural language and the platform builds it. Raava's Hermes skill catalog is growing but cannot match this breadth today. When a prospect evaluates both platforms, Relevance's agents can do more things on Day 1.

---

## Relevance AI Company Profile

| Metric | Value |
|--------|-------|
| **Founded** | 2020 |
| **Headquarters** | San Francisco, CA / Sydney, Australia |
| **Founders** | Daniel Vassilev, Jacky Koh |
| **Team Size** | ~23 (as of 2024) |
| **Total Funding** | $37M ($24M Series B led by Bessemer, May 2025) |
| **Other Investors** | King River Capital, Insight Partners, Peak XV |
| **Revenue** | $2.9M (2024) |
| **Registered Agents** | 40,000+ in January 2025 alone |
| **Enterprise Customers** | Canva, Autodesk, KPMG, Databricks, Freshworks, Rakuten, Confluent |
| **Integrations** | 2,000+ native + 9,000+ tools |
| **Compliance** | SOC 2 Type II, GDPR |
| **Data Residency** | US, EU, AU (user-selected at signup) |
| **Pricing** | Free / $19 Pro / $234 Team / $349 Business / Enterprise custom |
| **Target Market** | Sales/GTM teams primarily, expanding to enterprise ops |

---

## What Relevance AI Would Need to Match Raava's Architecture

1. **Build per-agent infrastructure isolation** — dedicated containers instead of logical separation in multi-tenant
2. **Implement vault-based credential management** — per-agent 1Password integration instead of centralized credential storage
3. **Create a true org hierarchy** — reporting structures, management tiers, team composition beyond visual canvas workflows
4. **Add persistent agent identity** — agents that maintain personality, memory, and relationships across all interactions, not just within Workforces
5. **Build a provisioning pipeline** — Fleet API-style automated infrastructure deployment per agent

**Estimated effort:** 12-18 months. Relevance's current architecture is fundamentally a multi-tenant SaaS platform with workflow orchestration. Moving to per-agent isolated infrastructure would require a ground-up rearchitecture of their deployment model. Their investor momentum and current growth make this pivot unlikely — they'll deepen the orchestration model rather than rebuild for isolation.

## What Raava Would Need to Neutralize Relevance AI's Advantages

1. **Land enterprise logos before or at eMerge** — even design partners or LOIs change the conversation
2. **Achieve SOC 2 Type II** — begin the audit process, target 6-9 months
3. **Implement multi-region deployment** — at minimum US + EU for GDPR compliance
4. **Expand Hermes skill catalog to 500+** — cover the most common business tools (CRM, email, calendar, project management, communication)
5. **Build a "tool builder"** — let users define custom Hermes skills through natural language (matching Relevance's Invent feature)
6. **Price a starter/pro tier** — a $29-49/month entry to compete with Relevance's free-to-$19 on-ramp

**Estimated effort:** 6-12 months of combined engineering, compliance, and product work. Multi-region and SOC 2 are the longest lead items.

---

## Architectural Comparison: Relevance Workforces vs. Raava Tiers

This is the core technical comparison and deserves a deeper look, because Relevance is the closest architectural peer to Raava.

### Relevance AI: Pipeline Orchestration

```
Trigger → Agent A → Handoff → Agent B → Handoff → Agent C → Output
              ↓ (confidence < threshold)
         Human Escalation
```

- Agents are nodes in a directed workflow
- Handoffs are explicit, defined at design time
- Each agent has a role but no persistent relationship to other agents
- Coordination is sequential (A → B → C), not lateral
- Human escalation is per-workflow, threshold-based

### Raava: Organizational Orchestration

```
         CEO/Manager Agent
         ├── Team Lead A
         │   ├── Worker A1
         │   └── Worker A2
         └── Team Lead B
             ├── Worker B1
             └── Worker B2
         
Escalation: Worker → Lead → Manager → Human
Lateral: Worker A1 ↔ Worker B1 (cross-pod coordination)
```

- Agents exist in an org hierarchy with persistent relationships
- Coordination is both vertical (escalation) and lateral (cross-pod)
- Agents maintain identity and context beyond individual workflows
- Each agent has isolated infrastructure (container + vault)
- Handoffs emerge from organizational dynamics, not just workflow design

### Why This Matters for Buyers

For a buyer automating a single process (e.g., inbound lead qualification → enrichment → routing), Relevance's pipeline model is simpler and faster to deploy. For a buyer deploying AI across an organization (support + sales + ops + finance), Raava's org model scales naturally — you add team members to the org rather than building new pipelines for each function.

**The strategic bet:** Relevance is betting that businesses think in workflows. Raava is betting that businesses think in headcount. Both are valid, but the headcount framing maps to how executives budget and is stickier for retention.

---

## Threat Assessment

**Threat Level: HIGH — Relevance AI is Raava's closest architectural peer and most direct competitor.**

Relevance is the only competitor that genuinely uses the "AI Workforce" framing and has multi-agent orchestration as a core feature. They have enterprise logos, compliance certifications, multi-region deployment, and a growing tool library. Their Bessemer-led $24M Series B gives them 18-24 months of runway to expand.

**However:** Relevance's architecture is orchestration, not organization. Their agents coordinate through designed pipelines, not through emergent organizational dynamics. They don't have per-agent infrastructure isolation, vault-based credential management, or true org hierarchy. For the enterprise buyer who needs "AI employees integrated into my org structure" rather than "AI workflows I design on a canvas," Raava is the stronger product.

**The positioning risk:** Both Raava and Relevance use "AI Workforce" language. If Relevance owns this positioning in the market before Raava launches, Raava will be perceived as the challenger. Getting to market with a compelling eMerge demo that shows the org model — not just the automation — is critical for claiming the positioning first.

**The timing:** Relevance has 18+ months head start, enterprise validation, and growing revenue. But they're focused on sales/GTM teams, leaving the broader ops buyer underserved. Raava's window is to own the "AI org chart" positioning before Relevance expands beyond sales into general enterprise ops — estimated 6-12 months before they make that move based on their current roadmap trajectory.

---

*Sources consulted: relevanceai.com, relevanceai.com/pricing, relevanceai.com/workforce, relevanceai.com/enterprise, relevanceai.com/docs/security, relevanceai.com/docs/get-started/introduction, TechCrunch Series B coverage, GetLatka revenue data, Crunchbase funding data, Tracxn company profile, aitoolscoop.com, salesforge.ai, selecthub.com, toolfountain.com, G2 reviews, AWS Marketplace listing.*
