/**
 * Applications Query Hooks
 *
 * React Query hooks for fetching applications data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { applicationsService } from "../applications.service";

/**
 * Hook to list applications
 *
 * Query key: ["applications", "Application", ]
 */
export function useApplication(params?: Record<string, any>) {
  return useTenantQuery(
    ["applications", "Application", ],
    async (orgId: string, signal?: AbortSignal) => {
      return applicationsService.getApplication(params, signal);
    }
  );
}

/**
 * Hook to get lending metrics
 *
 * Query key: ["applications", "Metric", ]
 */
export function useMetric(params?: Record<string, any>) {
  return useTenantQuery(
    ["applications", "Metric", ],
    async (orgId: string, signal?: AbortSignal) => {
      return applicationsService.getMetric(params, signal);
    }
  );
}

/**
 * Hook to get application
 *
 * Query key: ["applications", "Application", applicationId]
 */
export function useApplication(applicationId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["applications", "Application", applicationId],
    async (orgId: string, signal?: AbortSignal) => {
      return applicationsService.getApplication(applicationId, params, signal);
    },
    {
      enabled: !!applicationId
    }
  );
}

/**
 * Hook to get application feature pack
 *
 * Query key: ["applications", "FeaturePack", applicationId]
 */
export function useFeaturePack(applicationId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["applications", "FeaturePack", applicationId],
    async (orgId: string, signal?: AbortSignal) => {
      return applicationsService.getFeaturePack(applicationId, params, signal);
    },
    {
      enabled: !!applicationId
    }
  );
}

/**
 * Hook to get application decision
 *
 * Query key: ["applications", "Decision", applicationId]
 */
export function useDecision(applicationId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["applications", "Decision", applicationId],
    async (orgId: string, signal?: AbortSignal) => {
      return applicationsService.getDecision(applicationId, params, signal);
    },
    {
      enabled: !!applicationId
    }
  );
}
