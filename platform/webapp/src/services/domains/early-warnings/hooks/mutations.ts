/**
 * EarlyWarnings Mutation Hooks
 *
 * React Query hooks for mutating early-warnings data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { early-warningsService } from "../early-warnings.service";
// TODO: Import types
// import type { ... } from "../early-warnings.api-types";

/**
 * Hook to acknowledge early warning
 *
 * Automatically invalidates early-warnings queries on success.
 */
export function useGetAcknowledge() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return early-warningsService.getAcknowledge(data);
    },
    {
      invalidateQueries: [["early-warnings", "Acknowledge"]],
    }
  );
}

/**
 * Hook to escalate early warning
 *
 * Automatically invalidates early-warnings queries on success.
 */
export function useGetEscalate() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return early-warningsService.getEscalate(data);
    },
    {
      invalidateQueries: [["early-warnings", "Escalate"]],
    }
  );
}
