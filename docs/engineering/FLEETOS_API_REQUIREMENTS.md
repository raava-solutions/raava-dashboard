# FleetOS API Requirements Brief -- Raava Dashboard

**From:** Rafael Chen, VP Engineering, Raava
**To:** FleetOS API Team Lead
**Date:** April 3, 2026
**Status:** Active -- please treat as the source of truth for Raava's API needs
**Context:** Raava Dashboard is a product built on top of FleetOS. This document specifies every API surface we depend on, what's missing, and when we need it.

---

## How to Read This Document

- **Section 1** catalogs every FleetOS endpoint the dashboard currently calls or will call. Use it to understand our integration surface.
- **Sections 2-4** describe new capabilities we need, grouped by priority tier with hard deadlines.
- **Section 5** defines interface contracts -- response shapes, error formats, auth conventions.
- **Section 6** is the timeline summary you can turn into sprint milestones.

Each item includes enough context to write a ticket directly. If anything is ambiguous, reach out to Rafael or Marcus (CTO).

---

## Section 1: Current FleetOS API Surface (What Raava Calls Today)

These endpoints are already integrated in the dashboard frontend via our proxy layer at `/api/fleetos/*`. The dashboard server holds the FleetOS API key server-side; the browser never sees it.

### 1.1 Authentication

| Method | Endpoint | Dashboard Usage | Status |
|--------|----------|----------------|--------|
| POST | `/fleetos/login` | Authenticate with FleetOS API key, receive tenant info | Works |
| POST | `/fleetos/logout` | End FleetOS session | Works |
| GET | `/fleetos/me` | Get current session tenant/company/user IDs | Works |

### 1.2 Container Lifecycle

| Method | Endpoint | Dashboard Usage | Status |
|--------|----------|----------------|--------|
| GET | `/fleetos/containers` | **My Team page**: list all containers to build the team roster grid. Each container = one team member. Health data merged in response. | Works |
| GET | `/fleetos/containers/:id` | **Team Member Detail**: single container with health metrics for the Overview tab (status, uptime, resource usage) | Works |
| GET | `/fleetos/containers/:id/health` | **Team Member Detail > Overview**: CPU, memory, disk percentages, agent status (idle/busy/error/offline), uptime, last heartbeat. Drives the status dot and performance stats. | Works |
| GET | `/fleetos/containers/:id/agent` | **Team Member Detail > Overview**: agent process info (PID, status, uptime, last error). Used for the "Working/Paused/Needs Attention" status logic. | Works |
| POST | `/fleetos/containers/:id/start` | **Team Member Detail > Settings**: resume a paused team member | Works |
| POST | `/fleetos/containers/:id/stop` | **Team Member Detail > Settings**: pause a team member | Works |
| POST | `/fleetos/containers/:id/restart` | **Team Member Detail > Settings**: restart a team member (used for error recovery) | Works |

### 1.3 Provisioning (Hire Flow)

| Method | Endpoint | Dashboard Usage | Status |
|--------|----------|----------------|--------|
| GET | `/fleetos/templates` | **Onboarding Wizard Step 2**: list available role templates (sales-assistant, ops-manager, etc.) to populate the role card grid | Works |
| GET | `/fleetos/templates/:name` | **Onboarding Wizard Step 2**: get template detail including field definitions, default resource allocations. Drives the expanded role detail panel. | Works |
| POST | `/fleetos/provision/validate` | **Onboarding Wizard Step 4**: dry-run validation before actual provisioning. Checks template, tenant, agent name, resources. Returns validation errors/warnings. | Works |
| POST | `/fleetos/provision` | **Onboarding Wizard Step 5**: start the actual provisioning job. This is the "Hire Alex" moment -- creates container, installs skills, starts agent. | Works |
| GET | `/fleetos/provision/:jobId` | **Onboarding Wizard Step 5**: poll provisioning job progress. Drives the loading animation and step-by-step progress indicators. | Works |

### 1.4 Summary of Current Integration Health

- **Container CRUD**: Solid. List, get, lifecycle actions all work.
- **Provisioning**: Functional end-to-end. Template listing, validation, job start, and progress polling all integrated.
- **Health/Metrics**: Basic health endpoint works. See Section 2 for enhancement needs.
- **Missing**: No label support, no batch operations, no group management, no container deletion endpoint exposed. These are covered in Sections 2-4.

---

## Section 2: New Endpoints Needed -- P1 (Before eMerge, April 22)

These are required for the eMerge Americas demo and the first public version of Raava. Non-negotiable deadline: **April 18** (4 days buffer for integration testing).

### 2.1 Container Labels (Critical for Pod/Team Identification)

**Why:** The Raava Dashboard maps FleetOS containers to "team members" in a company. We need a way to tag containers with metadata so the dashboard can filter and group them. Currently `FleetContainer.labels` exists in the type but label write operations are not exposed.

| Method | Endpoint | Request Body | Response | Purpose |
|--------|----------|-------------|----------|---------|
| PATCH | `/fleetos/containers/:id/labels` | `{ labels: Record<string, string> }` | Updated `FleetContainer` | Set/update labels on a container. Dashboard will set: `raava.role`, `raava.company_id`, `raava.pod_id`, `raava.team_member_name` |
| GET | `/fleetos/containers?label=key:value` | Query param filter | `{ containers: FleetContainer[] }` | Filter container list by label. Dashboard needs to list only containers belonging to a specific company (`raava.company_id=xyz`). |

**Label Schema We Will Use:**

```
raava.company_id    = "comp_abc123"
raava.pod_id        = "pod_def456"       // future: grouping team members
raava.role          = "sales-assistant"
raava.team_member   = "Alex"
raava.tier          = "1" | "2" | "3"
```

**Acceptance Criteria:**
- Labels are persisted across container restarts
- Labels are included in the `GET /containers` and `GET /containers/:id` responses (already in the type, confirm populated)
- Label-based filtering supports multiple labels (AND logic): `?label=raava.company_id:abc&label=raava.role:sales-assistant`

### 2.2 Container Deletion

**Why:** When a user "fires" (terminates) a team member, the dashboard needs to clean up the container. Currently we can stop a container but not delete it.

| Method | Endpoint | Request Body | Response | Purpose |
|--------|----------|-------------|----------|---------|
| DELETE | `/fleetos/containers/:id` | -- | `{ ok: boolean, deleted_at: string }` | Permanently delete a container and its associated storage. Dashboard calls this when a team member is terminated and the user confirms permanent removal. |

**Acceptance Criteria:**
- Deleting a running container should stop it first, then delete (or return a 409 requiring stop first -- either is fine, we'll handle both)
- Deletion is irreversible. Confirm the container's persistent volumes are cleaned up.
- Return 404 if container doesn't exist (not 500)

### 2.3 Health Endpoint Enhancements

**Why:** The current `FleetHealth` response covers resource metrics, but the dashboard needs richer status information for the "Needs Attention" and "Working" states displayed on team member cards.

**Current response shape (works):**
```json
{
  "cpu_percent": 12.5,
  "mem_percent": 45.0,
  "disk_percent": 30.2,
  "agent_status": "busy",
  "uptime_seconds": 86400,
  "uptime_display": "1d 0h",
  "last_heartbeat": "2026-04-03T10:30:00Z"
}
```

**Requested additions to the health response:**

```json
{
  "cpu_percent": 12.5,
  "mem_percent": 45.0,
  "disk_percent": 30.2,
  "agent_status": "busy",
  "uptime_seconds": 86400,
  "uptime_display": "1d 0h",
  "last_heartbeat": "2026-04-03T10:30:00Z",
  "current_task": {                          // NEW -- what the agent is working on
    "id": "task_xyz",
    "title": "Following up on leads",
    "started_at": "2026-04-03T10:15:00Z"
  } | null,
  "error_summary": {                         // NEW -- if agent_status is "error"
    "code": "SKILL_FAILURE",
    "message": "Gmail credential expired",
    "since": "2026-04-03T09:00:00Z"
  } | null,
  "skills_loaded": ["hermes-email", "hermes-crm"]  // NEW -- which skills are active
}
```

**Priority:** `current_task` is the most important -- it drives the "Working on: Following up on leads..." display on every team member card. If you can only ship one addition, ship that one.

### 2.4 Provisioning Template Labels

**Why:** When we provision a container through the hire wizard, the resulting container needs to have labels set automatically (from Section 2.1). The provisioning request should accept labels.

**Requested change to `POST /fleetos/provision`:**

Add `labels` field to the provision request body:

```json
{
  "template": "sales-assistant",
  "agent_name": "Alex",
  "agent_role": "sales-assistant",
  "labels": {                              // NEW
    "raava.company_id": "comp_abc123",
    "raava.role": "sales-assistant",
    "raava.team_member": "Alex"
  }
}
```

**Acceptance Criteria:**
- Labels are applied to the container during provisioning, before the job completes
- Labels appear in the provision job result and in subsequent `GET /containers/:id` calls

### 2.5 Credential Validation Proxy (If Not Already Handled)

**Why:** During the hire wizard (Step 3) and tool addition flow, the dashboard validates third-party API keys (Gmail, HubSpot, etc.). The dashboard backend handles this today via its own proxy routes (`/api/credentials/validate`), so this may not need FleetOS involvement. Flagging it here for awareness.

**Current approach:** Dashboard backend directly calls third-party APIs to validate keys. FleetOS is not in this path.

**Question for FleetOS team:** Do you want credential validation to go through FleetOS (since FleetOS manages the runtime environment), or is the current dashboard-direct approach acceptable? If FleetOS should own this, we'd need:

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| POST | `/fleetos/credentials/validate` | `{ provider: "hubspot", credentials: { key: "..." } }` | `{ valid: boolean, error?: string }` |

**Decision needed by:** April 10

---

## Section 3: New Endpoints Needed -- P2 (Post-eMerge, Before May 15)

These support Tier 2 features: multi-team-member operations, pod grouping, and the chat interface.

### 3.1 Batch Provisioning

**Why:** Tier 2 customers (Vanessa persona) will hire multiple team members during onboarding. Provisioning them one at a time creates a poor UX (3-5 sequential 30-second waits). We need a batch endpoint.

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| POST | `/fleetos/provision/batch` | `{ items: ProvisionRequest[], labels?: Record<string, string> }` | `{ batch_id: string, jobs: { id: string, template: string, agent_name: string }[] }` |
| GET | `/fleetos/provision/batch/:batchId` | -- | `{ batch_id: string, status: "running" \| "complete" \| "partial" \| "failed", jobs: ProvisionJob[] }` |

**Requirements:**
- Containers in a batch provision in parallel, not sequentially
- The batch status endpoint returns individual job statuses so the dashboard can show per-member progress
- Shared labels apply to all containers in the batch (company_id, pod_id)
- If one member fails, others still complete (partial success is OK)
- Maximum batch size: 10 containers per call

### 3.2 Container Group Management (Pod Operations)

**Why:** Raava groups team members into "pods" (via the `raava.pod_id` label). Users need to start/stop/delete all members of a pod in one action.

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| POST | `/fleetos/containers/group/start` | `{ label_filter: Record<string, string> }` | `{ affected: number, containers: FleetContainer[] }` |
| POST | `/fleetos/containers/group/stop` | `{ label_filter: Record<string, string> }` | `{ affected: number, containers: FleetContainer[] }` |
| POST | `/fleetos/containers/group/restart` | `{ label_filter: Record<string, string> }` | `{ affected: number, containers: FleetContainer[] }` |
| DELETE | `/fleetos/containers/group` | `{ label_filter: Record<string, string>, confirm: true }` | `{ affected: number, deleted: string[] }` |

**Requirements:**
- `label_filter` uses AND logic: `{ "raava.company_id": "abc", "raava.pod_id": "def" }` matches only containers with BOTH labels
- Group operations are atomic per-container but the group call itself is best-effort (some may fail; return individual results)
- `confirm: true` is required for group delete to prevent accidental mass deletion
- Maximum 50 containers per group operation

### 3.3 Label-Based Container Filtering (Enhanced)

**Why:** Beyond the simple label filter in Section 2.1, the dashboard needs richer querying for the My Team page filters and the billing breakdowns.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/fleetos/containers?label=raava.role:sales-assistant&status=running` | Combine label and status filters |
| GET | `/fleetos/containers/count?group_by=label:raava.role` | Get container counts grouped by role label (for billing page "By Role" breakdown) |
| GET | `/fleetos/containers/count?group_by=status&label=raava.company_id:abc` | Get container counts grouped by status for a specific company (for Home page "Team Status Strip") |

**The `/count` endpoint is important.** Without it, the dashboard must fetch all containers and count client-side, which doesn't scale.

### 3.4 Container Metrics History

**Why:** The Team Member Detail > Overview tab shows performance stats (tasks completed this week, success rate, cost). The dashboard currently computes these from Paperclip's internal DB, but container-level resource metrics over time would enable richer monitoring.

| Method | Endpoint | Request | Response |
|--------|----------|---------|----------|
| GET | `/fleetos/containers/:id/metrics?period=7d&interval=1h` | Query params: period (1d, 7d, 30d), interval (5m, 1h, 1d) | `{ data_points: { timestamp: string, cpu_percent: number, mem_percent: number }[] }` |

**Priority within P2:** Low. This is a nice-to-have. We can live without it for May 15 if the P2 items above take priority.

### 3.5 Agent-to-Agent Communication Channel

**Why:** The CEO has approved a Chat feature (post-eMerge). Additionally, the Operations Manager role coordinates between team members. FleetOS containers need a way to send messages to each other or to the dashboard.

**We don't need FleetOS to build a full messaging system.** What we need:

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| POST | `/fleetos/containers/:id/message` | `{ from: string, type: "user" \| "agent", content: string, metadata?: Record<string, unknown> }` | `{ message_id: string, delivered: boolean }` |
| GET | `/fleetos/containers/:id/messages?since=ISO_TIMESTAMP&limit=50` | Query params | `{ messages: { id: string, from: string, type: string, content: string, timestamp: string, metadata?: Record<string, unknown> }[] }` |

**Alternative:** If FleetOS prefers not to handle messaging, we can route all agent-to-agent and user-to-agent messages through Paperclip's backend. In that case, we need FleetOS to expose a way to deliver a message payload to a running agent process (like the existing `/wakeup` endpoint but with arbitrary content). Confirm which approach you prefer.

**Decision needed by:** April 25 (before we start building the Chat feature)

---

## Section 4: New Endpoints Needed -- P3 (Tier 3/4 Support, Before July 1)

These support enterprise features for the Derek persona (VP Eng at 80-person fintech).

### 4.1 Container Group Resource Quotas

**Why:** Enterprise customers need to set resource limits at the organization level ("my AI team can use at most 16 CPU cores and 32GB RAM total").

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| GET | `/fleetos/quotas/:tenant_id` | -- | `{ cpu_limit: string, mem_limit: string, disk_limit: string, container_limit: number, current_usage: { cpu: string, mem: string, disk: string, containers: number } }` |
| PUT | `/fleetos/quotas/:tenant_id` | `{ cpu_limit?: string, mem_limit?: string, disk_limit?: string, container_limit?: number }` | Updated quota object |

**Requirements:**
- Provisioning should fail with a clear error if it would exceed the tenant's quota
- The dashboard will display quota usage on the Billing page and block the "Hire" button when at capacity

### 4.2 Organization-Level Provisioning Templates

**Why:** Enterprise customers want custom role templates beyond the 6 defaults ("I want a Compliance Auditor role with specific tools and personality").

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| GET | `/fleetos/templates?scope=tenant` | -- | `{ templates: FleetTemplate[] }` (includes both global and tenant-specific) |
| POST | `/fleetos/templates` | `{ name: string, label: string, description?: string, base_template?: string, fields: FleetTemplateField[], default_memory?: string, default_cpu?: string, tenant_id: string }` | Created template |
| PUT | `/fleetos/templates/:name` | Partial update | Updated template |
| DELETE | `/fleetos/templates/:name` | -- | `{ ok: boolean }` |

**Requirements:**
- Tenant-scoped templates inherit from a base global template but can override fields, resources, and default values
- Tenant templates appear alongside global templates in the wizard (with a "Custom" badge)
- Deleting a template does not affect already-provisioned containers

### 4.3 Capacity Planning API

**Why:** The admin/billing page needs to answer "can I hire 3 more Data Analysts given current resource usage?"

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| POST | `/fleetos/capacity/check` | `{ template: string, count: number, tenant_id: string }` | `{ feasible: boolean, available: { cpu: string, mem: string, disk: string }, required: { cpu: string, mem: string, disk: string }, shortfall?: { cpu: string, mem: string, disk: string } }` |

### 4.4 Container Cloning

**Why:** When a team member is performing well, users want to "clone" them -- create a new container with the same configuration, personality, tools, and labels but a different name.

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| POST | `/fleetos/containers/:id/clone` | `{ new_name: string, labels?: Record<string, string> }` | `{ job_id: string, source_container_id: string }` (returns a provision job that can be polled) |

**Requirements:**
- Clones the container configuration, installed skills, and SOUL.md content
- Does NOT clone credentials (security requirement -- user must re-enter API keys)
- Does NOT clone task history or work sessions
- The clone gets a new container ID and can have different labels

### 4.5 Audit Log

**Why:** Derek (enterprise persona) needs to see every action taken on containers -- who provisioned, who stopped, who deleted, credential changes, etc.

| Method | Endpoint | Response |
|--------|----------|----------|
| GET | `/fleetos/audit-log?tenant_id=X&since=ISO&until=ISO&limit=100` | `{ events: { id: string, timestamp: string, actor: string, action: string, resource_type: string, resource_id: string, detail: Record<string, unknown> }[] }` |

---

## Section 5: Contracts and Interface Agreements

### 5.1 Authentication

**Resolved.** All requests from the Raava Dashboard to FleetOS go through our server-side proxy. The proxy injects the FleetOS API key via `Authorization: Bearer <key>` header. The browser never sees the key.

No changes needed here.

### 5.2 Response Envelope

**Current convention (works, please maintain):**

Single-resource responses return the resource directly:
```json
{ "id": "ctr_123", "name": "alex-sales", "status": "running", ... }
```

Collection responses wrap in a named key:
```json
{ "containers": [ ... ] }
{ "templates": [ ... ] }
```

**Request:** Please maintain this pattern for all new endpoints. Specifically:
- Collection endpoints return `{ <resource_name_plural>: [...] }`
- Single-resource endpoints return the resource object directly
- Never return a bare array at the top level (makes it harder to add pagination metadata later)

### 5.3 Pagination (Future-Proofing)

Current container counts are small (<50 per tenant), so pagination isn't needed yet. However, for P3 endpoints (audit log, metrics history), please support cursor-based pagination:

```json
{
  "events": [ ... ],
  "cursor": "eyJpZCI6MTIzfQ==",
  "has_more": true
}
```

Request format: `?cursor=<opaque_string>&limit=50`

### 5.4 Error Response Format

**Current convention (please standardize):**

```json
{
  "error": {
    "code": "CONTAINER_NOT_FOUND",
    "message": "Container ctr_123 does not exist",
    "detail": {}
  }
}
```

**Dashboard expectations:**
- Always return `error.code` (machine-readable, UPPER_SNAKE_CASE)
- Always return `error.message` (human-readable, suitable for display in some cases)
- HTTP status codes: 400 (validation), 401 (auth), 403 (permission), 404 (not found), 409 (conflict/state error), 429 (rate limit), 500 (server error)
- For provisioning failures, include `error.step` indicating which provisioning step failed (we display this in the error detail panel)

**Error codes we handle specifically:**

| Code | HTTP Status | Dashboard Behavior |
|------|------------|-------------------|
| `CONTAINER_NOT_FOUND` | 404 | Redirect to My Team with "team member not found" toast |
| `PROVISION_FAILED` | 500 | Show retry UI in wizard with step detail |
| `QUOTA_EXCEEDED` | 403 | Show "team is at capacity" message, link to billing |
| `TEMPLATE_NOT_FOUND` | 404 | Remove role card from wizard, show "unavailable" state |
| `INVALID_LABELS` | 400 | Validation error toast |
| `CONTAINER_ALREADY_RUNNING` | 409 | Ignore (idempotent start) |
| `CONTAINER_ALREADY_STOPPED` | 409 | Ignore (idempotent stop) |

### 5.5 WebSocket / SSE Requirements

**Not needed for P1 (eMerge).** The dashboard polls provision job status every 2 seconds during the hire flow. This is acceptable for launch.

**Needed for P2 (May 15):**

For the Chat feature and real-time container status updates, we will need one of:

**Option A (preferred): Server-Sent Events (SSE)**
```
GET /fleetos/containers/:id/events
Accept: text/event-stream

data: {"type":"status_change","status":"running","timestamp":"..."}
data: {"type":"health_update","cpu_percent":15.2,"timestamp":"..."}
data: {"type":"message","from":"user","content":"...","timestamp":"..."}
```

**Option B: WebSocket**
```
ws://fleetos/containers/:id/ws
```

**Our preference is SSE** -- simpler to proxy, works through our existing HTTP proxy layer, auto-reconnects. WebSocket is acceptable if SSE is not feasible on your infra.

**Events we need:**
- `status_change` -- container started/stopped/error
- `health_update` -- periodic health metrics (every 30s is fine)
- `message` -- incoming message from agent to dashboard (for Chat feature)
- `provision_progress` -- step completion during provisioning (replaces polling)

**Decision needed by:** April 25

### 5.6 Idempotency

**Request:** For all POST endpoints that create resources (provision, batch provision, clone), please support an `Idempotency-Key` header:

```
POST /fleetos/provision
Idempotency-Key: hire_alex_1712150000
```

If the same idempotency key is sent twice, return the result of the first call without creating a duplicate. This prevents double-hires when the user's browser retries on network timeout.

**We already handle this on our side** by generating an idempotency key in the wizard, but FleetOS enforcement would add a safety net.

---

## Section 6: Timeline Summary

### April 18 (P1 -- eMerge Demo Readiness)

| Item | Section | Effort Estimate (Our Side) | Blocking? |
|------|---------|---------------------------|-----------|
| Container label write (PATCH) | 2.1 | 1 day integration | YES -- demo needs company-scoped container lists |
| Container label filter (GET with query) | 2.1 | 1 day integration | YES -- My Team page must show only this company's members |
| Container deletion (DELETE) | 2.2 | 0.5 day integration | YES -- "fire team member" flow is in the demo script |
| Health response: `current_task` field | 2.3 | 0.5 day integration | YES -- team member cards show current task |
| Health response: `error_summary` field | 2.3 | 0.5 day integration | NICE-TO-HAVE for demo |
| Health response: `skills_loaded` field | 2.3 | Minimal | NICE-TO-HAVE |
| Provision request: `labels` field | 2.4 | 0.5 day integration | YES -- new hires must get company labels automatically |
| Credential validation ownership decision | 2.5 | 0 (decision only) | NEED ANSWER by April 10 |

**Total P1 work for FleetOS team (our estimate):** 3-5 days of API development + testing.

### May 15 (P2 -- Tier 2 Multi-Member Support)

| Item | Section | Priority Within P2 |
|------|---------|-------------------|
| Batch provisioning | 3.1 | HIGH -- directly impacts onboarding UX for multi-hire |
| Container group operations (start/stop/restart) | 3.2 | HIGH -- pod management is a Tier 2 feature |
| Group delete | 3.2 | MEDIUM -- needed but less frequent |
| Label-based count/aggregation endpoint | 3.3 | HIGH -- billing page "By Role" breakdown |
| Combined label + status filtering | 3.3 | MEDIUM -- Home page Team Status Strip |
| Container metrics history | 3.4 | LOW -- nice-to-have |
| Agent messaging (or confirm alternative) | 3.5 | HIGH -- blocks Chat feature |
| SSE or WebSocket event stream | 5.5 | HIGH -- blocks real-time updates and Chat |

**Total P2 work for FleetOS team (our estimate):** 10-15 days of API development + testing.

### July 1 (P3 -- Tier 3/4 Enterprise Features)

| Item | Section |
|------|---------|
| Tenant resource quotas | 4.1 |
| Custom provisioning templates (CRUD) | 4.2 |
| Capacity check endpoint | 4.3 |
| Container cloning | 4.4 |
| Audit log | 4.5 |

**Total P3 work for FleetOS team (our estimate):** 15-20 days of API development + testing.

---

## Open Questions (Decisions Needed from FleetOS)

| # | Question | Context | Decision Needed By |
|---|----------|---------|-------------------|
| 1 | **Credential validation ownership:** Should credential validation (testing third-party API keys) go through FleetOS, or is dashboard-direct acceptable? | Section 2.5 | April 10 |
| 2 | **Messaging approach:** Will FleetOS handle agent messaging natively, or should we route through Paperclip backend and use `/wakeup` for delivery? | Section 3.5 | April 25 |
| 3 | **Real-time transport:** SSE or WebSocket? | Section 5.5 | April 25 |
| 4 | **Label namespace:** Any restrictions on label key format? We plan to use `raava.*` prefix. Confirm this won't conflict with FleetOS internal labels. | Section 2.1 | April 10 |
| 5 | **Container deletion behavior:** Stop-then-delete automatically, or require stopped state? | Section 2.2 | April 10 |

---

## Contact

- **Rafael Chen** (VP Engineering) -- integration questions, priority negotiations, timeline issues
- **Marcus Webb** (CTO) -- architecture decisions, security requirements, credential flow
- **Diana Park** (VP Product) -- feature context, user flow clarifications, priority justification

---

*This document will be updated as decisions are made and new requirements emerge. Version history is tracked in git.*
