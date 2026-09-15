/**
 * EarlyWarnings Query Hooks
 *
 * React Query hooks for fetching early-warnings data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { early-warningsService } from "../early-warnings.service";

/**
 * Hook to list early warnings
 *
 * Query key: ["early-warnings", "EarlyWarning", ]
 */
export function useEarlyWarning(params?: Record<string, any>) {
  return useTenantQuery(
    ["early-warnings", "EarlyWarning", ],
    async (orgId: string, signal?: AbortSignal) => {
      return early-warningsService.getEarlyWarning(params, signal);
    }
  );
}

/**
 * Hook to get early warning
 *
 * Query key: ["early-warnings", "EarlyWarning", alertId]
 */
export function useEarlyWarning(alertId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["early-warnings", "EarlyWarning", alertId],
    async (orgId: string, signal?: AbortSignal) => {
      return early-warningsService.getEarlyWarning(alertId, params, signal);
    },
    {
      enabled: !!alertId
    }
  );
}
