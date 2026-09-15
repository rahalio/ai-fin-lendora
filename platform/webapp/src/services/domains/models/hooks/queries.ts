/**
 * Models Query Hooks
 *
 * React Query hooks for fetching models data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { modelsService } from "../models.service";

/**
 * Hook to list credit models
 *
 * Query key: ["models", "VModel", ]
 */
export function useVModel(params?: Record<string, any>) {
  return useTenantQuery(
    ["models", "VModel", ],
    async (orgId: string, signal?: AbortSignal) => {
      return modelsService.getVModel(params, signal);
    }
  );
}

/**
 * Hook to get credit model
 *
 * Query key: ["models", "VModel", modelVersionId]
 */
export function useVModel(modelVersionId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["models", "VModel", modelVersionId],
    async (orgId: string, signal?: AbortSignal) => {
      return modelsService.getVModel(modelVersionId, params, signal);
    },
    {
      enabled: !!modelVersionId
    }
  );
}

/**
 * Hook to get current learning envelope
 *
 * Query key: ["models", "Current", ]
 */
export function useCurrent(params?: Record<string, any>) {
  return useTenantQuery(
    ["models", "Current", ],
    async (orgId: string, signal?: AbortSignal) => {
      return modelsService.getCurrent(params, signal);
    }
  );
}
