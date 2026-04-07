/**
 * Role-based provisioning preset configuration.
 *
 * Maps Raava agent roles (from AGENT_ROLES in packages/shared/src/constants.ts)
 * to FleetOS provisioning defaults including template, system prompt orientation,
 * and integration hints.
 */

export interface RolePreset {
  /** FleetOS template name */
  template: string;
  /** System prompt orientation for the role */
  systemPromptHint: string;
  /** Default integrations to enable */
  integrations: string[];
  /** Extra provisioning fields passed to FleetOS */
  extraFields?: Record<string, string>;
}

const DEFAULT_TEMPLATE = "hermes";
const DEFAULT_SECRETS_MODE = "op";

function roleExtraFields(role: string): Record<string, string> {
  return {
    system_prompt_role: role,
    secrets_mode: DEFAULT_SECRETS_MODE,
  };
}

/**
 * Presets keyed by the actual AGENT_ROLES values:
 * ceo, cto, cmo, cfo, engineer, designer, pm, qa, devops, researcher, general
 */
export const ROLE_PRESETS: Record<string, RolePreset> = {
  ceo: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "executive-leadership",
    integrations: ["crm", "email", "calendar", "bi-tools"],
    extraFields: roleExtraFields("ceo"),
  },
  cto: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "technical-leadership",
    integrations: ["code-review", "ci-cd", "monitoring", "architecture"],
    extraFields: roleExtraFields("cto"),
  },
  cmo: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "marketing-leadership",
    integrations: ["content-management", "social-media", "analytics", "email"],
    extraFields: roleExtraFields("cmo"),
  },
  cfo: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "finance-leadership",
    integrations: ["accounting", "bi-tools", "reporting", "budgeting"],
    extraFields: roleExtraFields("cfo"),
  },
  engineer: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "software-engineering",
    integrations: ["code-review", "ci-cd", "ticketing"],
    extraFields: roleExtraFields("engineer"),
  },
  designer: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "design",
    integrations: ["design-tools", "prototyping", "asset-management"],
    extraFields: roleExtraFields("designer"),
  },
  pm: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "product-management",
    integrations: ["ticketing", "roadmap", "analytics", "calendar"],
    extraFields: roleExtraFields("pm"),
  },
  qa: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "quality-assurance",
    integrations: ["testing", "ci-cd", "ticketing", "monitoring"],
    extraFields: roleExtraFields("qa"),
  },
  devops: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "devops-infrastructure",
    integrations: ["ci-cd", "monitoring", "cloud-infra", "logging"],
    extraFields: roleExtraFields("devops"),
  },
  researcher: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "research-analysis",
    integrations: ["data-warehouse", "bi-tools", "knowledge-base"],
    extraFields: roleExtraFields("researcher"),
  },
  general: {
    template: DEFAULT_TEMPLATE,
    systemPromptHint: "general-purpose",
    integrations: [],
    extraFields: roleExtraFields("general"),
  },
};

/**
 * Resolve the provisioning preset for a given agent role.
 * Falls back to the "general" preset if the role is not recognized.
 */
export function resolveRolePreset(role: string): RolePreset {
  const normalized = role.toLowerCase().trim();
  return ROLE_PRESETS[normalized] ?? ROLE_PRESETS.general;
}
