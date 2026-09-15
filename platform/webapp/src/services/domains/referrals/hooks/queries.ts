/**
 * Referrals Query Hooks
 *
 * React Query hooks for fetching referrals data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { referralsService } from "../referrals.service";

/**
 * Hook to list refer tasks
 *
 * Query key: ["referrals", "ReferTask", ]
 */
export function useReferTask(params?: Record<string, any>) {
  return useTenantQuery(
    ["referrals", "ReferTask", ],
    async (orgId: string, signal?: AbortSignal) => {
      return referralsService.getReferTask(params, signal);
    }
  );
}

/**
 * Hook to get refer task
 *
 * Query key: ["referrals", "ReferTask", referTaskId]
 */
export function useReferTask(referTaskId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["referrals", "ReferTask", referTaskId],
    async (orgId: string, signal?: AbortSignal) => {
      return referralsService.getReferTask(referTaskId, params, signal);
    },
    {
      enabled: !!referTaskId
    }
  );
}
