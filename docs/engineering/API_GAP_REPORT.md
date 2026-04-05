# RAA-343: API Gap Report — Raava MVP Frontend

**Generated**: 2026-04-03
**Context**: eMerge Americas demo (April 22)
**Branch**: `integration/raava-mvp`
**PR**: https://github.com/raava-solutions/raava-dashboard/pull/5

---

## Summary

The Raava MVP frontend integrates 5 feature branches (RAA-337 through RAA-341). Several UI components use mocked or hardcoded data where backend APIs do not yet exist or are not wired up. This report catalogs every API dependency that needs backend work before the frontend is production-ready.

---

## P0 — Required for eMerge Demo

### 1. Credential Vault Storage

**File**: `ui/src/components/RaavaOnboardingWizard.tsx` (lines 548-552)
**Current behavior**: Credentials entered during onboarding (Gmail API key, CRM key, Google Workspace key, etc.) are passed in the `adapterConfig.credentials` field of the `agentsApi.create()` call. They're stored as plain JSON in the agent's adapter config in the database.
**Gap**: No secure credential vault exists. The onboarding wizard tells users "Your credentials are stored securely and are never visible to team members" (line 874), but credentials are stored as plaintext in the agent record.
**Required API**:
- `POST /api/credentials/store` — accept credential key/value pairs, encrypt at rest
- `GET /api/credentials/{agentId}` — return credential metadata (labels, masked values) without exposing secrets
- Integration with 1Password or similar vault (the FleetProvisionWizard already references `op -- 1Password integration` as a secrets mode option)

### 2. Credential Validation Endpoint

**File**: `ui/src/components/RaavaOnboardingWizard.tsx` (lines 76-226)
**Current behavior**: The wizard collects API keys for Gmail, CRM, Google Workspace, help desk, database, Google Sheets, social media, and analytics services. There is no validation that these keys are real or functional.
**Gap**: No server-side validation of third-party credentials before agent creation.
**Required API**:
- `POST /api/credentials/validate` — accept a credential type + value, test connectivity (e.g., make a test API call to Gmail), return success/failure

---

## P1 — Required for Production

### 3. Billing/Cost Data on RaavaHome Dashboard

**File**: `ui/src/pages/RaavaHome.tsx` (lines 297-320)
**Current behavior**: "Spend This Week" card displays hardcoded `$127.40` and `+12% vs last week`.
**Gap**: No API endpoint returns per-week billing aggregation for the fleetos tenant.
**Required API**:
- `GET /api/costs/summary?window=week` — return `{ totalCents, previousPeriodCents, changePercent }` for the current billing window
- Or extend the existing `costsApi` (used by the Costs page) with a fleetos-aware weekly summary

### 4. Recent Tasks on RaavaHome Dashboard

**File**: `ui/src/pages/RaavaHome.tsx` (lines 86-92, 338-385)
**Current behavior**: "Recent Tasks" section uses `MOCK_RECENT_TASKS` — 5 hardcoded task objects with fake titles, statuses, assignees, and timestamps.
**Gap**: The existing `issuesApi.list()` endpoint could serve this data, but the RaavaHome component does not call it. The mock data is used as a placeholder.
**Required work**:
- Wire RaavaHome to use `issuesApi.list(companyId)` (already available) with a recent-first sort and limit
- Map issue data to the task card format (title, status, assignee agent name, relative timestamp)
- This may be purely a frontend wiring task — verify the existing Issues API returns data in fleetos mode

### 5. User Name on RaavaHome Welcome Banner

**File**: `ui/src/pages/RaavaHome.tsx` (line 176)
**Current behavior**: Comment says `TODO: Pull user name from company context or auth session when available`. The greeting currently shows only "Good morning" without the user's name.
**Gap**: The FleetOS `/me` endpoint returns `{ tenantId, companyId, userId }` but not a user display name.
**Required API change**:
- Extend `GET /api/fleetos/me` to return `userName` or `displayName` field
- Or add a name field to the FleetOS session cookie

---

## P2 — Important for Launch

### 6. Container Provisioning from Agent Creation

**File**: `ui/src/components/RaavaOnboardingWizard.tsx` (line 550)
**Current behavior**: When creating an agent via the onboarding wizard, `containerId` is set to an empty string `""`. The agent record is created in the database but no FleetOS container is provisioned.
**Gap**: The onboarding wizard does not trigger the `fleetosApi.startProvision()` flow. The existing FleetProvisionWizard (RAA-294) does have a full provision flow, but it's a separate page (`/fleet/provision`) not integrated into the onboarding wizard.
**Required work**:
- After agent creation in the wizard, call `fleetosApi.startProvision()` to spin up a container
- Update the agent's `containerId` with the provisioned container ID
- Show provision progress/status in the wizard's success screen
- Or: make this a background job triggered server-side when an agent is created with `adapterType: "hermes_fleetos"`

### 7. Team Member Status (Live Containers) on RaavaHome

**File**: `ui/src/pages/RaavaHome.tsx` (lines 143-293)
**Current behavior**: The "Your Team" section fetches real container data from `fleetosApi.listContainers()` and maps it to team member status cards. This is partially functional.
**Gap**: The mapping between Paperclip agents and FleetOS containers is by `containerId` on the agent record. Since the onboarding wizard sets `containerId: ""`, newly onboarded agents won't appear in the container list. The status cards will only show containers that were provisioned through the separate FleetProvisionWizard.
**Required work**: Depends on #6 above — once container provisioning is integrated into onboarding, this will work.

---

## P3 — Nice to Have

### 8. Login Page Brand Enhancement

**File**: `ui/src/pages/Auth.tsx`
**Current behavior**: Login page uses a `Sparkles` icon from lucide-react as the Raava logo. The "Sign In with API Key" button uses the default primary color, not the brand gradient.
**Gap**: Cosmetic only. The SVG star mark exists as `favicon.svg` but isn't used inline on the auth page. The `variant="gradient"` button exists but isn't applied to the sign-in button.
**Required work**: Frontend-only — import the star SVG and use `variant="gradient"` on the submit button.

### 9. "How to get this?" Help Links

**File**: `ui/src/components/RaavaOnboardingWizard.tsx` (lines 362-366)
**Current behavior**: Each credential field has a "How to get this?" link that calls `e.preventDefault()` — it doesn't navigate anywhere.
**Gap**: No help/documentation URLs for obtaining third-party API keys.
**Required work**: Create help docs or link to third-party documentation for each credential type.

---

## Existing APIs That Work

The following frontend features use existing Paperclip APIs that already function in fleetos mode:

| Feature | API | Status |
|---------|-----|--------|
| FleetOS login/logout | `/api/fleetos/login`, `/api/fleetos/logout`, `/api/fleetos/me` | Working |
| Health check | `/api/health` (returns `deploymentMode: "fleetos"`) | Working |
| Agent CRUD | `/api/companies/:id/agents` | Working |
| Issue CRUD | `/api/companies/:id/issues` | Working |
| Project CRUD | `/api/companies/:id/projects` | Working |
| Routine CRUD | `/api/companies/:id/routines` | Working |
| Cost/budget data | `/api/companies/:id/costs` | Working (Costs page) |
| Container list | `/api/fleetos/containers` | Working |
| Container lifecycle | `/api/fleetos/containers/:id/{start,stop,restart}` | Working |
| Container provisioning | `/api/fleetos/provision` | Working (separate wizard) |

---

## Recommendation

For the eMerge demo (April 22), the P0 credential items can be deferred if the demo script avoids entering real credentials. The P1 items (billing data, recent tasks) are the most visible gaps — hardcoded data will be obvious to anyone who looks closely. Wiring RaavaHome to the existing Issues API (#4) is likely a 1-2 hour frontend task and should be prioritized.
