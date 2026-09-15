/**
 * Shared API client — envelope-aware, Bearer + API-key auth.
 */

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || ""
);

const TOKEN_KEY = "lendora.accessToken";
const API_KEY_KEY = "lendora.apiKey";

export type Envelope<T> = {
  data: T;
  meta?: { correlationId?: string; requestId?: string; generatedAt?: string };
};

export type ListData<T> = {
  items: T[];
  nextCursor?: string;
};

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getApiKey(): string {
  return (
    localStorage.getItem(API_KEY_KEY) ||
    import.meta.env.VITE_API_KEY ||
    "lendora_demo_local_dev_key"
  );
}

export function setApiKey(key: string) {
  localStorage.setItem(API_KEY_KEY, key);
}

function idempotencyKey(): string {
  return `idem_${crypto.randomUUID().replace(/-/g, "").slice(0, 24)}`;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { idempotent?: boolean },
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-API-Key": getApiKey(),
    ...(init?.headers as Record<string, string> | undefined),
  };
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (init?.idempotent || (init?.method && init.method !== "GET")) {
    headers["Idempotency-Key"] = idempotencyKey();
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const lendoraApi = {
  health: () => apiFetch<{ status?: string; ok?: boolean }>("/health"),

  login: (email: string, password: string) =>
    apiFetch<
      Envelope<{
        accessToken: string;
        refreshToken?: string;
        operator?: { displayName?: string; email?: string; role?: string };
      }>
    >("/v0/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      idempotent: true,
    }),

  me: () =>
    apiFetch<
      Envelope<{
        operator: { displayName?: string; email?: string; role?: string };
        tenant?: { displayNameEn?: string };
      }>
    >("/v0/auth/me"),

  listUsers: () =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      "/v0/tenants/me/users",
    ),

  getMetrics: () =>
    apiFetch<Envelope<Record<string, unknown>>>("/v1/applications/metrics"),

  listApplications: (params?: Record<string, string>) => {
    const q = new URLSearchParams({ limit: "50", ...params });
    return apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/applications?${q}`,
    );
  },

  getApplication: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(`/v1/applications/${id}`),

  createApplication: (body: Record<string, unknown>) =>
    apiFetch<Envelope<Record<string, unknown>>>("/v1/applications", {
      method: "POST",
      body: JSON.stringify(body),
      idempotent: true,
    }),

  getDecision: (applicationId: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/applications/${applicationId}/decision`,
    ),

  decideApplication: (applicationId: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/applications/${applicationId}/decision`,
      { method: "POST", idempotent: true },
    ),

  getFeaturePack: (applicationId: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/applications/${applicationId}/feature-pack`,
    ),

  listPolicies: (params?: Record<string, string>) => {
    const q = new URLSearchParams({ limit: "50", ...params });
    return apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/policies?${q}`,
    );
  },

  createPolicy: (body: Record<string, unknown>) =>
    apiFetch<Envelope<Record<string, unknown>>>("/v1/policies", {
      method: "POST",
      body: JSON.stringify(body),
      idempotent: true,
    }),

  getPolicy: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(`/v1/policies/${id}`),

  simulatePolicy: (id: string, body: Record<string, unknown>) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/policies/${id}/simulate`,
      { method: "POST", body: JSON.stringify(body), idempotent: true },
    ),

  submitPolicyApproval: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/policies/${id}/submit-approval`,
      { method: "POST", idempotent: true },
    ),

  approvePolicy: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/policies/${id}/approve`,
      { method: "POST", idempotent: true },
    ),

  listReasonCodes: () =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      "/v1/reason-codes?limit=50",
    ),

  createReasonCode: (body: Record<string, unknown>) =>
    apiFetch<Envelope<Record<string, unknown>>>("/v1/reason-codes", {
      method: "POST",
      body: JSON.stringify(body),
      idempotent: true,
    }),

  publishReasonCode: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/reason-codes/${id}/publish`,
      { method: "POST", idempotent: true },
    ),

  listReferTasks: (params?: Record<string, string>) => {
    const q = new URLSearchParams({ limit: "50", ...params });
    return apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/refer-tasks?${q}`,
    );
  },

  getReferTask: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(`/v1/refer-tasks/${id}`),

  claimReferTask: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/refer-tasks/${id}/claim`,
      { method: "POST", idempotent: true },
    ),

  createOverride: (referTaskId: string, body: Record<string, unknown>) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/refer-tasks/${referTaskId}/overrides`,
      { method: "POST", body: JSON.stringify(body), idempotent: true },
    ),

  listEarlyWarnings: (params?: Record<string, string>) => {
    const q = new URLSearchParams({ limit: "50", ...params });
    return apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/early-warnings?${q}`,
    );
  },

  acknowledgeEarlyWarning: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/early-warnings/${id}/acknowledge`,
      { method: "POST", idempotent: true },
    ),

  escalateEarlyWarning: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/early-warnings/${id}/escalate`,
      { method: "POST", idempotent: true },
    ),

  listModels: () =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      "/v1/models?limit=50",
    ),

  registerModel: (body: Record<string, unknown>) =>
    apiFetch<Envelope<Record<string, unknown>>>("/v1/models", {
      method: "POST",
      body: JSON.stringify(body),
      idempotent: true,
    }),

  proposePromote: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/models/${id}/propose-promote`,
      { method: "POST", idempotent: true },
    ),

  approvePromote: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/models/${id}/approve-promote`,
      { method: "POST", idempotent: true },
    ),

  getLearningEnvelope: () =>
    apiFetch<Envelope<Record<string, unknown>>>(
      "/v1/learning-envelopes/current",
    ),

  updateLearningEnvelope: (body: Record<string, unknown>) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      "/v1/learning-envelopes/current",
      { method: "PATCH", body: JSON.stringify(body) },
    ),

  createAudit: (applicationId: string) =>
    apiFetch<Envelope<Record<string, unknown>>>("/v1/audits", {
      method: "POST",
      body: JSON.stringify({ applicationId }),
      idempotent: true,
    }),

  getAuditByApplication: (applicationId: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/audits/by-application/${applicationId}`,
    ),

  listAudits: () =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      "/v1/audits?limit=50",
    ),
};
