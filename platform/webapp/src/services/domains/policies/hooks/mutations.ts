/**
 * Policies Mutation Hooks
 *
 * React Query hooks for mutating policies data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { policiesService } from "../policies.service";
// TODO: Import types
// import type { ... } from "../policies.api-types";

/**
 * Hook to create policy pack
 *
 * Automatically invalidates policies queries on success.
 */
export function useCreatePolicy() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policiesService.createPolicy(data);
    },
    {
      invalidateQueries: [["policies", "Policy"]],
    }
  );
}

/**
 * Hook to update policy pack
 *
 * Automatically invalidates policies queries on success.
 */
export function useUpdatePolicy() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policiesService.updatePolicy(data);
    },
    {
      invalidateQueries: [["policies", "Policy"]],
    }
  );
}

/**
 * Hook to simulate policy veto
 *
 * Automatically invalidates policies queries on success.
 */
export function useGetSimulate() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policiesService.getSimulate(data);
    },
    {
      invalidateQueries: [["policies", "Simulate"]],
    }
  );
}

/**
 * Hook to submit policy pack approval
 *
 * Automatically invalidates policies queries on success.
 */
export function useCreateSubmitApproval() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policiesService.createSubmitApproval(data);
    },
    {
      invalidateQueries: [["policies", "SubmitApproval"]],
    }
  );
}

/**
 * Hook to approve policy pack
 *
 * Automatically invalidates policies queries on success.
 */
export function useCreateApprove() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policiesService.createApprove(data);
    },
    {
      invalidateQueries: [["policies", "Approve"]],
    }
  );
}

/**
 * Hook to rollback policy pack
 *
 * Automatically invalidates policies queries on success.
 */
export function useGetRollback() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policiesService.getRollback(data);
    },
    {
      invalidateQueries: [["policies", "Rollback"]],
    }
  );
}

/**
 * Hook to create reason code
 *
 * Automatically invalidates policies queries on success.
 */
export function useCreateReasonCode() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policiesService.createReasonCode(data);
    },
    {
      invalidateQueries: [["policies", "ReasonCode"]],
    }
  );
}

/**
 * Hook to update reason code
 *
 * Automatically invalidates policies queries on success.
 */
export function useUpdateReasonCode() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policiesService.updateReasonCode(data);
    },
    {
      invalidateQueries: [["policies", "ReasonCode"]],
    }
  );
}

/**
 * Hook to publish reason code
 *
 * Automatically invalidates policies queries on success.
 */
export function useGetPublish() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policiesService.getPublish(data);
    },
    {
      invalidateQueries: [["policies", "Publish"]],
    }
  );
}
