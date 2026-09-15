/**
 * Referrals Mutation Hooks
 *
 * React Query hooks for mutating referrals data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { referralsService } from "../referrals.service";
// TODO: Import types
// import type { ... } from "../referrals.api-types";

/**
 * Hook to claim refer task
 *
 * Automatically invalidates referrals queries on success.
 */
export function useGetClaim() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return referralsService.getClaim(data);
    },
    {
      invalidateQueries: [["referrals", "Claim"]],
    }
  );
}

/**
 * Hook to create override
 *
 * Automatically invalidates referrals queries on success.
 */
export function useCreateOverride() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return referralsService.createOverride(data);
    },
    {
      invalidateQueries: [["referrals", "Override"]],
    }
  );
}
