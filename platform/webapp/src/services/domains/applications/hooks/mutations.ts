/**
 * Applications Mutation Hooks
 *
 * React Query hooks for mutating applications data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { applicationsService } from "../applications.service";
// TODO: Import types
// import type { ... } from "../applications.api-types";

/**
 * Hook to create application
 *
 * Automatically invalidates applications queries on success.
 */
export function useCreateApplication() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return applicationsService.createApplication(data);
    },
    {
      invalidateQueries: [["applications", "Application"]],
    }
  );
}

/**
 * Hook to upsert application feature pack
 *
 * Automatically invalidates applications queries on success.
 */
export function useGetFeaturePack() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return applicationsService.getFeaturePack(data);
    },
    {
      invalidateQueries: [["applications", "FeaturePack"]],
    }
  );
}

/**
 * Hook to decide application
 *
 * Automatically invalidates applications queries on success.
 */
export function useGetDecision() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return applicationsService.getDecision(data);
    },
    {
      invalidateQueries: [["applications", "Decision"]],
    }
  );
}
