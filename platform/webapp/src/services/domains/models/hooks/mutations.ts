/**
 * Models Mutation Hooks
 *
 * React Query hooks for mutating models data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { modelsService } from "../models.service";
// TODO: Import types
// import type { ... } from "../models.api-types";

/**
 * Hook to register challenger model
 *
 * Automatically invalidates models queries on success.
 */
export function useCreateVModel() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return modelsService.createVModel(data);
    },
    {
      invalidateQueries: [["models", "VModel"]],
    }
  );
}

/**
 * Hook to propose promote model
 *
 * Automatically invalidates models queries on success.
 */
export function useGetProposePromote() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return modelsService.getProposePromote(data);
    },
    {
      invalidateQueries: [["models", "ProposePromote"]],
    }
  );
}

/**
 * Hook to approve promote model
 *
 * Automatically invalidates models queries on success.
 */
export function useCreateApprovePromote() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return modelsService.createApprovePromote(data);
    },
    {
      invalidateQueries: [["models", "ApprovePromote"]],
    }
  );
}

/**
 * Hook to update current learning envelope
 *
 * Automatically invalidates models queries on success.
 */
export function useUpdateCurrent() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return modelsService.updateCurrent(data);
    },
    {
      invalidateQueries: [["models", "Current"]],
    }
  );
}
