/**
 * Audits Mutation Hooks
 *
 * React Query hooks for mutating audits data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { auditsService } from "../audits.service";
// TODO: Import types
// import type { ... } from "../audits.api-types";

/**
 * Hook to create decision audit
 *
 * Automatically invalidates audits queries on success.
 */
export function useCreateAudit() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return auditsService.createAudit(data);
    },
    {
      invalidateQueries: [["audits", "Audit"]],
    }
  );
}
