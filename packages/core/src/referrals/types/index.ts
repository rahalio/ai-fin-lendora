/**
 * Referrals Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/referrals.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Override = components["schemas"]["Override"];
export type OverrideCreate = components["schemas"]["OverrideCreate"];
export type OverrideId = components["schemas"]["OverrideId"];
export type ReferTask = components["schemas"]["ReferTask"];
export type ReferTaskId = components["schemas"]["ReferTaskId"];
export type ReferTaskStatus = components["schemas"]["ReferTaskStatus"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateOverrideRequestInput = NonNullable<operations["createOverride"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListReferTasksParams = NonNullable<operations["listReferTasks"]["parameters"]["query"]>;
export type GetReferTaskParams = operations["getReferTask"]["parameters"]["path"];
export type ClaimReferTaskParams = operations["claimReferTask"]["parameters"]["path"];
export type CreateOverrideParams = operations["createOverride"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListReferTasksResponse = operations["listReferTasks"]["responses"]["200"]["content"]["application/json"];
export type GetReferTaskResponse = operations["getReferTask"]["responses"]["200"]["content"]["application/json"];
export type ClaimReferTaskResponse = operations["claimReferTask"]["responses"]["200"]["content"]["application/json"];
export type CreateOverrideResponse = operations["createOverride"]["responses"]["201"]["content"]["application/json"];


