/**
 * Policies Query Hooks
 *
 * React Query hooks for fetching policies data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { policiesService } from "../policies.service";

/**
 * Hook to list policy packs
 *
 * Query key: ["policies", "Policy", ]
 */
export function usePolicy(params?: Record<string, any>) {
  return useTenantQuery(
    ["policies", "Policy", ],
    async (orgId: string, signal?: AbortSignal) => {
      return policiesService.getPolicy(params, signal);
    }
  );
}

/**
 * Hook to get policy pack
 *
 * Query key: ["policies", "Policy", policyPackId]
 */
export function usePolicy(policyPackId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["policies", "Policy", policyPackId],
    async (orgId: string, signal?: AbortSignal) => {
      return policiesService.getPolicy(policyPackId, params, signal);
    },
    {
      enabled: !!policyPackId
    }
  );
}

/**
 * Hook to list reason codes
 *
 * Query key: ["policies", "ReasonCode", ]
 */
export function useReasonCode(params?: Record<string, any>) {
  return useTenantQuery(
    ["policies", "ReasonCode", ],
    async (orgId: string, signal?: AbortSignal) => {
      return policiesService.getReasonCode(params, signal);
    }
  );
}

/**
 * Hook to get reason code
 *
 * Query key: ["policies", "ReasonCode", reasonCodeId]
 */
export function useReasonCode(reasonCodeId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["policies", "ReasonCode", reasonCodeId],
    async (orgId: string, signal?: AbortSignal) => {
      return policiesService.getReasonCode(reasonCodeId, params, signal);
    },
    {
      enabled: !!reasonCodeId
    }
  );
}
