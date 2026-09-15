/**
 * Referrals Domain Contracts
 *
 * Re-exports Zod schemas from @lendora/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @lendora/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @lendora/core/referrals for the source schemas
 */

import { referralsSchemas as coreReferralsSchemas } from "@lendora/core/referrals";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreReferralsSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const referralsSchemas = coreReferralsSchemas;
