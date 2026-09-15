/**
 * Audits Query Hooks
 *
 * React Query hooks for fetching audits data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { auditsService } from "../audits.service";

/**
 * Hook to list decision audits
 *
 * Query key: ["audits", "Audit", ]
 */
export function useAudit(params?: Record<string, any>) {
  return useTenantQuery(
    ["audits", "Audit", ],
    async (orgId: string, signal?: AbortSignal) => {
      return auditsService.getAudit(params, signal);
    }
  );
}

/**
 * Hook to get decision audit
 *
 * Query key: ["audits", "Audit", auditId]
 */
export function useAudit(auditId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["audits", "Audit", auditId],
    async (orgId: string, signal?: AbortSignal) => {
      return auditsService.getAudit(auditId, params, signal);
    },
    {
      enabled: !!auditId
    }
  );
}

/**
 * Hook to get decision audit by application
 *
 * Query key: ["audits", "ByApplication", applicationId]
 */
export function useByApplication(applicationId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["audits", "ByApplication", applicationId],
    async (orgId: string, signal?: AbortSignal) => {
      return auditsService.getByApplication(applicationId, params, signal);
    },
    {
      enabled: !!applicationId
    }
  );
}
