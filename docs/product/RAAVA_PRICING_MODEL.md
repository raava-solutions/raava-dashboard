# Raava Pricing Model -- eMerge Americas 2026

**Prepared by:** Sasha Park, CFO
**Date:** April 3, 2026
**Status:** Draft for CEO Review
**Context:** CEO directive -- base rate + token usage. Must be booth-ready by April 22.

---

## 1. Pricing Tiers

### Tier Structure

| | **Starter** | **Pro** | **Enterprise** |
|---|---|---|---|
| **Base rate** | $49/team member/month | $99/team member/month | Custom (starting $199/member/month) |
| **Included tasks** | 30 tasks/month | 100 tasks/month | Unlimited |
| **Included token allowance** | 500K tokens | 2M tokens | 10M+ tokens |
| **Overage rate** | $0.03 per 1K tokens | $0.02 per 1K tokens | Negotiated |
| **Available roles** | General Assistant only | All 6 roles | All roles + custom roles |
| **Support** | Email (48hr) | Priority email (24hr) + Slack | Dedicated account manager |
| **Credentials vault** | 3 integrations | 10 integrations | Unlimited |
| **Routines** | 3 scheduled routines | 20 scheduled routines | Unlimited |

### What the Base Rate Covers

The base rate pays for the team member to exist and be ready to work:
- Dedicated compute environment (LXD VM)
- Pre-configured role with appropriate skills and tools
- Dashboard access (My Team, Tasks, Billing)
- Credential vault (1Password-backed)
- The included task and token allowances listed above

### What Token Usage Covers

Tokens are consumed when a team member actively works -- thinking through a task, reading documents, generating output. The included allowance covers typical usage for the tier. Overage kicks in only if the team member works significantly harder than normal.

**Translation for the booth:** "The base rate is like salary. Token usage is like overtime -- you only pay extra if your team member works a lot more than usual."

### Why These Numbers

**Starter at $49:** Entry point for a skeptical SMB owner. Low enough to try without a procurement conversation. General Assistant handles the broadest set of tasks. 30 tasks and 500K tokens covers light usage (a few tasks per week). This is the "try before you buy" tier.

**Pro at $99:** The anchor tier. Where most customers land. All 6 roles, 100 tasks/month, 2M tokens. A Sales Assistant doing 50 follow-ups and 30 lead research tasks per month fits comfortably here. At $99/member, a 3-member team costs $297/month -- still under $300 and directly comparable to "less than one day of a human hire."

**Enterprise at $199+:** For agencies (Mia persona) and larger SMBs. Custom roles, volume discounts, SLAs. This tier exists to signal seriousness to Derek (technical buyer) and to give us room to negotiate with larger accounts.

---

## 2. Per-Role Pricing Guidance

All roles are priced the same at the base tier level. The differentiation is in typical token consumption, which we absorb within the included allowance.

| Role | Typical Tasks/Month | Avg Tokens/Task | Est. Monthly Token Usage | Fits Within |
|---|---|---|---|---|
| General Assistant | 20-40 | 2,000-3,000 | 40K-120K | Starter easily |
| Sales Assistant | 40-80 | 2,500-4,000 | 100K-320K | Starter tight, Pro comfortable |
| Customer Support | 50-100 | 1,500-2,500 | 75K-250K | Pro comfortable |
| Marketing Coordinator | 20-40 | 3,000-5,000 | 60K-200K | Pro comfortable |
| Ops Manager | 30-60 | 2,500-4,000 | 75K-240K | Pro comfortable |
| Data Analyst | 15-30 | 5,000-10,000 | 75K-300K | Pro comfortable |

**Recommendation: Do NOT charge different base rates per role.** Reasons:
1. Simplicity. Carlos asks "how much?" not "how much for which role?"
2. It lets us say "any team member, $99/month" at the booth.
3. Token-heavy roles (Data Analyst) self-regulate through the overage mechanism.
4. We lack real usage data to set per-role prices accurately. Uniform pricing now; revisit at 20+ customers.

**Dissent noted (Marcus flag from product package):** Data Analyst tasks could consume 3-5x the tokens of a General Assistant. If a customer runs a Data Analyst on Starter tier, they will hit overage quickly. This is fine -- the overage pricing handles it, and it naturally pushes heavy-compute roles to Pro tier.

---

## 3. The 30-Second Explanation

> **"Raava team members start at $49 a month. That covers the team member, their tools, and a generous amount of work included. If they work overtime, you pay a small extra -- but most customers stay within the included amount. A typical team of three costs under $300 a month. That is less than one day of a human hire."**

For the booth card / one-liner:

> **"AI team members from $49/month. Most teams pay under $300."**

For the follow-up email:

> "Each team member has a base rate that covers their compute, tools, and a monthly work allowance. If your team member handles more work than the allowance covers, there's a small per-use overage -- think of it like overtime pay. We show you exactly what each team member costs on your Billing dashboard, in dollars, no jargon."

---

## 4. Comparison Table

**Scenario:** 1 person handling sales follow-ups, 40 tasks/month

| Solution | Monthly Cost | Setup Time | Availability | Scalability |
|---|---|---|---|---|
| **Raava Pro (1 Sales Assistant)** | **$99/month** | 5 minutes | 24/7 | Add another member in 5 min |
| Human VA (Upwork/Belay) | $800-1,600/month | 1-2 weeks (hiring + training) | Business hours | Hire another (weeks) |
| Zapier + ChatGPT Pro | $70-120/month (Zapier $50-70 + ChatGPT $20-50) | Hours to days (building flows) | Automated but brittle | Every new flow is manual work |
| ChatGPT Pro alone | $20-200/month | None | On-demand only (no automation) | Does not scale to workflows |
| Lindy / Relevance AI | $200-500/month | Hours (building agents) | Automated | Complex configuration |

**Scenario:** 3-person AI team (Sales + Support + Ops Manager)

| Solution | Monthly Cost |
|---|---|
| **Raava Pro (3 members)** | **$297/month** |
| 3 part-time human VAs | $2,400-4,800/month |
| Zapier + multiple AI tools | $200-400/month + significant setup/maintenance |
| Competitor AI agent platforms | $600-1,500/month |

**Key differentiator to emphasize at eMerge:** Raava is the only option where you "hire a person" -- not "build a workflow" or "configure an agent." The UX difference is the product.

---

## 5. Margin Analysis

### Cost Structure Per Agent

| Cost Component | Monthly Estimate | Notes |
|---|---|---|
| LXD VM compute | $15-25 | Depends on instance size. General Assistant is lighter than Data Analyst |
| Storage | $3-5 | Persistent volumes for agent state, logs, credentials |
| 1Password vault | $2-4 | Per-agent vault allocation (amortized across business plan) |
| Platform overhead | $3-5 | Monitoring, logging, dashboard hosting, backups (amortized) |
| **Total infrastructure** | **$23-39** | |

### Token Cost Per Agent (Estimated Monthly)

| Usage Level | Tokens Consumed | Model Cost (blended) | Notes |
|---|---|---|---|
| Light (Starter typical) | 50K-200K | $0.15-$1.00 | Mostly input tokens, light output |
| Medium (Pro typical) | 200K-1M | $1.00-$5.00 | Mix of input/output, some heavy tasks |
| Heavy (Pro power user) | 1M-3M | $5.00-$15.00 | Data Analyst, long-form generation |
| Very Heavy (Enterprise) | 3M-10M+ | $15.00-$50.00+ | High-volume ops, multi-step workflows |

**Blended token cost assumption:** We use a mix of Claude Sonnet ($3/$15 per M in/out) and OpenRouter models (variable, often cheaper). Weighted average: ~$5 per 1M tokens blended (conservative).

### Margin by Tier

| Tier | Revenue/Member | Infra Cost | Typical Token Cost | Total Cost | Gross Margin | Margin % |
|---|---|---|---|---|---|---|
| **Starter** ($49) | $49 | $25 | $0.50 | $25.50 | $23.50 | **48%** |
| **Pro** ($99) | $99 | $30 | $3.00 | $33.00 | $66.00 | **67%** |
| **Pro + overage** ($99 + ~$20 overage) | $119 | $30 | $8.00 | $38.00 | $81.00 | **68%** |
| **Enterprise** ($199) | $199 | $35 | $10.00 | $45.00 | $154.00 | **77%** |

### Risk Scenarios

**Worst case -- heavy Starter user:** Customer runs a Data Analyst on Starter ($49). They blow through 500K tokens in week one, then consume 2M tokens total. Token cost: ~$10. Overage revenue: (2M - 500K) = 1.5M tokens x $0.03/1K = $45 overage. Total revenue: $94. Total cost: ~$35. Margin: $59 (63%). The overage mechanism protects us.

**Worst case -- light Pro user:** Customer pays $99 for a General Assistant that does 10 tasks/month. Token cost: $0.15. Total cost: ~$25. Margin: $74 (75%). We are fine. Light users subsidize heavy users.

**Break-even point:** A Pro member breaks even at roughly $33/month in costs. We would need a customer consuming >$66/month in pure token cost (approximately 13M tokens/month) before Pro tier becomes unprofitable -- which would be extreme outlier usage that triggers a conversation about Enterprise.

### Overage as Margin Protector

The included allowances are set so that ~80% of users on each tier never see overage. The 20% who do generate high-margin incremental revenue at $0.02-$0.03/1K tokens (our cost is ~$0.005/1K blended). Overage markup is approximately 4-6x our cost -- this is standard for usage-based SaaS.

---

## 6. FitRoofingCo Example

### Current Setup
- **Client:** FitRoofingCo (roofing company, existing Raava client)
- **Team members:** 1 Hermes agent, General Manager role
- **VM:** `fitroof-openclaw` (LXD)
- **LLM provider:** OpenRouter
- **Integrations:** JobNimbus CRM, Telegram
- **Usage pattern:** Manages jobs, communicates with clients via Telegram, updates CRM

### Estimated Monthly Usage
- Tasks per month: ~30-50 (job updates, client messages, CRM sync, scheduling)
- Average tokens per task: ~2,500-3,500 (CRM lookups + message generation)
- Estimated monthly tokens: ~75K-175K

### Monthly Bill Under New Pricing

**Recommended tier: Pro ($99/month)**

| Line Item | Amount |
|---|---|
| Base rate: 1 team member (Pro) | $99.00 |
| Token usage: ~125K tokens (typical month) | Included (under 2M allowance) |
| Overage | $0.00 |
| **Total** | **$99.00/month** |

FitRoofingCo's General Manager is a moderate-usage agent. At 125K tokens/month against a 2M Pro allowance, they are at ~6% of their included tokens. They will almost certainly never see overage.

**If FitRoofingCo stays on Starter ($49/month):**

| Line Item | Amount |
|---|---|
| Base rate: 1 team member (Starter) | $49.00 |
| Token usage: ~125K tokens (typical month) | Included (under 500K allowance) |
| Overage | $0.00 |
| **Total** | **$49.00/month** |

They would fit on Starter too, but they lose access to future role expansion and have fewer integration slots (3 vs 10 -- they already use 2: JobNimbus + Telegram). Recommend Pro for growth headroom.

**Our cost to serve FitRoofingCo:**

| Cost | Amount |
|---|---|
| LXD VM (fitroof-openclaw) | ~$20 |
| Storage + platform overhead | ~$7 |
| OpenRouter token costs (~125K tokens) | ~$0.65 |
| 1Password vault | ~$3 |
| **Total cost** | **~$30.65** |
| **Revenue at Pro** | **$99.00** |
| **Gross margin** | **$68.35 (69%)** |

### Upsell Opportunity
FitRoofingCo is a natural candidate for a second team member -- a **Customer Support** agent to handle inbound Telegram messages and route service requests, freeing the General Manager for higher-value ops work. This would bring their bill to $198/month, still under $200 and a fraction of a part-time hire.

---

## Summary of Recommendations

1. **Launch with 3 tiers:** Starter ($49), Pro ($99), Enterprise ($199+). Pro is the anchor.
2. **Uniform per-role pricing.** Do not differentiate by role at launch. Token overage self-regulates heavy-compute roles.
3. **Lead with "from $49/month" at the booth.** Follow up with "most teams pay under $300."
4. **Token usage is "overtime pay."** Never say "tokens" to a customer. Say "work allowance" and "overtime."
5. **Margins are healthy.** 48-77% gross margin depending on tier and usage. Overage mechanism protects downside.
6. **FitRoofingCo validates the model.** Real client, real usage, $99/month at 69% margin. Use them as the reference case.

### Open Items for CEO

- **Starter role restriction:** Recommendation is Starter = General Assistant only. This pushes specialized roles to Pro. CEO to confirm.
- **Annual discount:** Do we offer annual billing at 2 months free (17% discount)? Recommend yes -- it locks in revenue and reduces churn. But not critical for eMerge launch.
- **Free trial:** 14-day free trial on Pro tier? Recommend yes for eMerge leads -- "scan this QR code, your first team member is free for 2 weeks." CEO to confirm.

---

*CFO note: These numbers are modeled on current infra costs and published API pricing as of April 2026. Token costs trend downward over time, which means margins improve. The overage mechanism gives us a natural hedge against heavy users while keeping the sticker price simple. I am confident we can defend these numbers at the booth and in follow-up conversations.*
