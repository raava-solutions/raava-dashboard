# QA + Security Gate Report: PR #5 (integration/raava-mvp)

**Reviewers:** Vivian Zheng (QA Lead), Ezra Nakamura (Security Engineer)
**Date:** 2026-04-03
**Branch:** `integration/raava-mvp` (4 commits, 15 files, +1635 / -83 lines)
**Gate Status:** This gate was skipped by Sprint Manager James. This report retroactively applies it.

---

## Summary

PR #5 introduces the Raava/FleetOS MVP experience: a role-card onboarding wizard, a home dashboard, sidebar rewrite, and a terminology pass across 10+ pages to swap "Agent/Issue" language for "Team Member/Task" in fleetos mode. The implementation is well-structured, cleanly separated from the existing Paperclip code paths, and has no blocking security issues.

---

## VIVIAN ZHENG -- QA Review

### 1. Code Review (File-by-File)

#### `ui/src/components/RaavaOnboardingWizard.tsx` (1024 lines, new file)
- **PASS WITH NOTES**
- Clean 4-step wizard with proper state management, error handling, and loading states.
- Each API call (`companiesApi.create`, `agentsApi.create`, `projectsApi.create`, `issuesApi.create`) is wrapped in try/catch with user-facing error messages.
- Query cache invalidation is correctly applied after each mutation.
- P2: `eslint-disable-line react-hooks/exhaustive-deps` on line 451 -- the effect depends on `selectedRoleId` but reads `selectedRole` (derived). This works but is a code smell. The comment should explain *why* the exhaustive deps rule is disabled.
- P2: All `helpUrl` values are hardcoded to `"#"` with `onClick={(e) => e.preventDefault()}`. These are dead links. Fine for MVP if the intent is to add them later, but should be documented.
- P2: The wizard does not set the Dashboard breadcrumb to "Home" when in fleetos mode (it inherits whatever the previous page set). Minor UX inconsistency.

#### `ui/src/hooks/useIsRaava.ts` (16 lines, new file)
- **PASS**
- Reads from the cached `health` query (60s stale time), so no extra network requests.
- Returns `false` during loading or on error, which is the safe default (fall back to Paperclip mode).

#### `ui/src/pages/RaavaHome.tsx` (385 lines, new file)
- **PASS WITH NOTES**
- P1: Hardcoded `userName = "Carlos"` on line 177. The TODO comment acknowledges this, but this will ship to eMerge Americas with a hardcoded name. This should either pull from the session or show a generic greeting ("Good morning." without a name).
- P1: Hardcoded `$127.40` spend amount and `+12%` delta (lines ~282-290). This is mock billing data with no TODO marker indicating it's fake. A user may confuse this for real data. At minimum, add a visual indicator or replace with a "Coming soon" placeholder.
- P2: `MOCK_RECENT_TASKS` array (lines 87-93) renders fake tasks ("Update CRM contact records from CSV" etc.) that don't exist in the database. Same issue: users may think these are real.
- The FleetOS containers query handles `undefined` gracefully via `containers ?? []` throughout.

#### `ui/src/components/Sidebar.tsx` (net +53 lines)
- **PASS**
- Clean conditional rendering with `showFleet` boolean.
- Good: `lastKnownFleetosRef` pattern prevents sidebar flicker during transient health query failures.
- Note: The Raava sidebar drops `PluginSlotOutlet` (sidebar plugins) and `SidebarAgents`/`SidebarProjects` components. This is intentional simplification for Raava mode, but any plugins registered for sidebar slots will silently not render.

#### `ui/src/App.tsx` (net +23 lines)
- **PASS**
- `OnboardingWizardSwitch` correctly checks `deploymentMode` and renders the appropriate wizard.
- The health query has `retry: false` -- if the single attempt fails, it falls back to Paperclip wizard (safe behavior).

#### `ui/src/pages/Dashboard.tsx` (net +13 lines)
- **PASS WITH NOTES**
- The fleetos mode check renders `<RaavaHome />` before the loading check. This means: if the health query resolves to fleetos mode but the dashboard data is still loading, we skip the loading state and go straight to RaavaHome. RaavaHome has its own loading state via the containers query, so this is acceptable.
- However, the `selectedCompanyId` guard at the top returns an empty state before the fleetos check. If a user in fleetos mode hasn't selected a company yet, they see the generic "Create or select a company" message, not the Raava-branded empty state. The fleetos-specific message ("Welcome to Raava...") only appears when `isFleetosMode && !selectedCompanyId` -- which is correctly handled (line 175-184). **This is actually fine.**

#### Terminology files (Agents.tsx, AgentDetail.tsx, IssueDetail.tsx, Issues.tsx, IssuesList.tsx, Costs.tsx, Routines.tsx)
- **PASS**
- All terminology swaps are consistent: Agent -> Team Member, Issues -> Tasks, Costs -> Billing.
- All `useEffect` dependency arrays correctly include `isRaava`.
- No broken conditional paths.

#### `ui/src/components/ui/button.tsx` (net +2 lines)
- **PASS**
- Adds `gradient` variant with the Raava brand gradient. Clean, no side effects on existing variants.

#### `ui/src/index.css` (net +38 lines)
- **PASS WITH NOTES**
- P1: `--radius-lg` changed from `0px` to `0.75rem` and `--radius-xl` from `0px` to `1rem`. This is a **global change** that affects all components using these CSS variables, not just Raava mode. Every card, dialog, and container in both Paperclip and Raava mode now has rounded corners. If Paperclip mode intentionally had sharp corners, this is a regression.
- P2: New utility classes `.raava-gradient-bg`, `.raava-gradient-text`, `.raava-card`, `.font-display`, `.raava-stat-number` are added but `.raava-card` and `.raava-stat-number` do not appear to be used in any of the changed files. Dead CSS.

### 2. Functional Testing

| Test | Result | Notes |
|------|--------|-------|
| Health endpoint (fleetos mode) | PASS | Returns `deploymentMode: "fleetos"` when `PAPERCLIP_DEPLOYMENT_MODE=fleetos` |
| Health endpoint (default mode) | PASS | Returns `deploymentMode: "local_trusted"` |
| Auth gate (fleetos, no session) | PASS | Returns `{"error":"Board access required"}` for unauthenticated API calls |
| FleetOS containers (FleetOS down) | PASS | Returns auth error (not an unhandled crash) |
| TypeScript compilation | PASS | `tsc --noEmit` passes with zero errors |

### 3. Edge Case Analysis

| Scenario | Behavior | Verdict |
|----------|----------|---------|
| FleetOS down when home page loads | RaavaHome renders with empty containers list (`containers ?? []`). Shows "Your team is idle." | PASS |
| Health query fails in useIsRaava | Returns `false`, all pages render in Paperclip mode | PASS (safe fallback) |
| Health query fails in Sidebar | `lastKnownFleetosRef` preserves last-known state; no flicker | PASS |
| Non-fleetos user hits Raava components | Not possible at component level -- RaavaHome only renders when Dashboard detects fleetos mode | PASS |
| Onboarding company creation fails | Error caught, displayed to user, wizard stays on Step 1 | PASS |
| Onboarding agent hire fails | Error caught, displayed to user, wizard stays on Step 4 | PASS |
| Skip credentials flow | Clears all credential values and advances to Step 4 | PASS |
| Back navigation after company created | Goes back to Step 1, but `createdCompanyId` is still set. If user changes company name and clicks Next again, it creates a **second** company | P2 -- minor |

---

## EZRA NAKAMURA -- Security Review

### 1. Auth Flow

- **PASS**
- Credentials are stored in React `useState` (component-local state). They are NOT persisted to localStorage or sessionStorage. State is cleared on wizard close (`reset()` function, line 461).
- No API keys or credentials are logged to `console` anywhere in the new code (verified: zero `console.log/warn/error` calls in all 3 new files).
- Credentials are sent to the server inside `adapterConfig.credentials` via the `agentsApi.create()` call. On the server side:
  - The `sanitizeRecord()` function in `redaction.ts` matches keys like `*api_key*`, `*password*`, `*credential*` via `SECRET_PAYLOAD_KEY_RE` regex and redacts them in logs and API responses.
  - Credentials stored in `adapterConfig` are redacted when the agent config is read back via the API.
- The credential skip flow (`handleStep3Skip`) properly clears all credential values to empty strings before advancing. No partial state leakage.
- React DevTools exposure: credentials exist in component state during the wizard session only. This is standard React behavior and acceptable -- the same is true of any form with sensitive inputs.

### 2. Input Validation

- **PASS WITH NOTES**
- P2: Role card selection uses a hardcoded `ROLES` array with fixed `id` values (e.g., `"sales-assistant"`). Users cannot inject a malicious role name -- the role `name` sent to the server comes from the constant array, not from user input.
- Company name input: sent to `companiesApi.create({ name: companyName.trim() })`. The server's company creation route uses Zod validation. The UI renders company names via React's JSX (automatic XSS escaping). No `dangerouslySetInnerHTML` usage anywhere in the PR. **No XSS risk.**
- Credential inputs: rendered as `<Input type="password">` by default (masked). The toggle switches to `type="text"`. Values are trimmed client-side. Server-side redaction handles log sanitization. **No credential leak in error messages** -- error messages come from `err.message` which is the server's error string, not a reflection of input values.
- First task textarea: value is sent as `issue.title` and `issue.description` via `issuesApi.create()`. React's JSX escaping prevents XSS on render. Server-side Zod validation handles the API layer. **No injection risk.**
- Agent name input: same analysis as company name. **Safe.**

### 3. Terminology Hook (useIsRaava) Spoofing

- **PASS**
- `useIsRaava` reads `deploymentMode` from the health API response. The health endpoint's `deploymentMode` is set server-side from `process.env.PAPERCLIP_DEPLOYMENT_MODE` or the config file. It cannot be influenced by client-side requests.
- An attacker cannot spoof the health endpoint response to switch modes because:
  1. The health endpoint is a server-side read of config -- there's no mutation API.
  2. The response is served over the same origin, so MITM would require compromising the network layer.
- There is no meaningful security boundary between Raava and Paperclip modes -- the terminology is cosmetic. Both modes use the same underlying auth system, API routes, and data model. Mode switching does not grant or revoke any capabilities.

### 4. Brand/CSS

- **PASS**
- No CSS injection risk. All new CSS classes use static values (no `var()` references to user-controlled properties, no `url()` with dynamic content).
- Inline styles in components use hardcoded gradient strings -- no interpolation of user input into style values.
- The `gradient` button variant is safe -- it's a static class definition in `button.tsx`.

---

## Findings Summary

| # | Severity | Area | Finding | Recommendation |
|---|----------|------|---------|----------------|
| 1 | **P1** | QA | Hardcoded `userName = "Carlos"` in RaavaHome.tsx line 177 | Remove the name or pull from session. "Good morning." is better than "Good morning, Carlos." for all users at eMerge. |
| 2 | **P1** | QA | Hardcoded `$127.40` spend and `+12%` delta in RaavaHome.tsx appear as real billing data | Either connect to the billing API, show "Coming soon", or add a "(sample data)" label |
| 3 | **P1** | QA | `MOCK_RECENT_TASKS` renders 5 fake tasks as real on the home dashboard | Same as above -- label as sample data or remove |
| 4 | **P1** | QA | `--radius-lg` and `--radius-xl` changed globally from `0px` to `0.75rem`/`1rem` in index.css | Verify this is intentional for both modes. If Paperclip mode should keep sharp corners, scope the change to a `.raava` parent class |
| 5 | **P2** | QA | All credential `helpUrl` values are `"#"` (dead links) | Acceptable for MVP, but add a TODO comment in the ROLES constant |
| 6 | **P2** | QA | Back navigation from Step 2 to Step 1 doesn't reset `createdCompanyId` -- re-submitting Step 1 creates a duplicate company | Either disable the company name field on back-nav, or delete the created company when going back |
| 7 | **P2** | QA | `.raava-card` and `.raava-stat-number` CSS classes are unused | Remove dead CSS or document intended future use |
| 8 | **P2** | QA | Raava sidebar drops `PluginSlotOutlet` -- plugins silently disappear in fleetos mode | Document this as intentional or add plugin slots to Raava sidebar |
| 9 | **P2** | QA | `eslint-disable-line react-hooks/exhaustive-deps` without explanation (line 451) | Add a comment explaining the intentional omission |
| 10 | **P2** | Security | Credentials stored in React component state are visible via React DevTools during wizard session | Acceptable for web apps, but document in security considerations that sensitive values are in-memory during onboarding |

---

## Verdict

### Overall: PASS WITH NOTES

**Recommendation: Approve for merge with conditions.**

The code is well-structured, the security posture is solid, and there are no blocking issues. However, the four P1 items should be addressed before the eMerge Americas demo (April 22):

1. **Hardcoded "Carlos" name** -- will confuse every non-Carlos user at the demo
2. **Fake billing data without labels** -- will confuse users into thinking it's real
3. **Fake task list without labels** -- same problem
4. **Global radius change** -- may unintentionally alter Paperclip mode's visual style

**If the team commits to fixing P1 items in a follow-up before eMerge, this PR can merge now.**
**If there is no follow-up commitment, block on items 1-3 at minimum.**

The P2 items are genuine quality improvements but not blockers for merge.

---

*Report generated by QA Pod (Vivian Zheng) and Security Pod (Ezra Nakamura)*
*Gate applied retroactively per STANDARDS.md quality requirements*
