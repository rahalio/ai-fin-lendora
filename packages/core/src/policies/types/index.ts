/**
 * Policies Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/policies.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type PolicyPack = components["schemas"]["PolicyPack"];
export type PolicyPackCreate = components["schemas"]["PolicyPackCreate"];
export type PolicyPackId = components["schemas"]["PolicyPackId"];
export type PolicyPackStatus = components["schemas"]["PolicyPackStatus"];
export type PolicyPackUpdate = components["schemas"]["PolicyPackUpdate"];
export type PolicyVetoSimulationResult = components["schemas"]["PolicyVetoSimulationResult"];
export type ProductLine = components["schemas"]["ProductLine"];
export type ReasonCode = components["schemas"]["ReasonCode"];
export type ReasonCodeCreate = components["schemas"]["ReasonCodeCreate"];
export type ReasonCodeId = components["schemas"]["ReasonCodeId"];
export type ReasonCodeUpdate = components["schemas"]["ReasonCodeUpdate"];
export type PolicyVetoSimulationRequest = components["schemas"]["PolicyVetoSimulationRequest"];
export type Policy = operations["listPolicyPacks"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePolicyPackRequestInput = NonNullable<operations["createPolicyPack"]["requestBody"]>["content"]["application/json"];
export type UpdatePolicyPackRequestInput = NonNullable<operations["updatePolicyPack"]["requestBody"]>["content"]["application/json"];
export type UpdatePolicyPackRequest = UpdatePolicyPackRequestInput;
export type SimulatePolicyVetoRequestInput = NonNullable<operations["simulatePolicyVeto"]["requestBody"]>["content"]["application/json"];
export type CreateReasonCodeRequestInput = NonNullable<operations["createReasonCode"]["requestBody"]>["content"]["application/json"];
export type UpdateReasonCodeRequestInput = NonNullable<operations["updateReasonCode"]["requestBody"]>["content"]["application/json"];
export type UpdateReasonCodeRequest = UpdateReasonCodeRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPolicyPacksParams = NonNullable<operations["listPolicyPacks"]["parameters"]["query"]>;
export type GetPolicyPackParams = operations["getPolicyPack"]["parameters"]["path"];
export type UpdatePolicyPackParams = operations["updatePolicyPack"]["parameters"]["path"];
export type SimulatePolicyVetoParams = operations["simulatePolicyVeto"]["parameters"]["path"];
export type SubmitPolicyPackApprovalParams = operations["submitPolicyPackApproval"]["parameters"]["path"];
export type ApprovePolicyPackParams = operations["approvePolicyPack"]["parameters"]["path"];
export type RollbackPolicyPackParams = operations["rollbackPolicyPack"]["parameters"]["path"];
export type ListReasonCodesParams = NonNullable<operations["listReasonCodes"]["parameters"]["query"]>;
export type GetReasonCodeParams = operations["getReasonCode"]["parameters"]["path"];
export type UpdateReasonCodeParams = operations["updateReasonCode"]["parameters"]["path"];
export type PublishReasonCodeParams = operations["publishReasonCode"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPolicyPacksResponse = operations["listPolicyPacks"]["responses"]["200"]["content"]["application/json"];
export type CreatePolicyPackResponse = operations["createPolicyPack"]["responses"]["201"]["content"]["application/json"];
export type GetPolicyPackResponse = operations["getPolicyPack"]["responses"]["200"]["content"]["application/json"];
export type UpdatePolicyPackResponse = operations["updatePolicyPack"]["responses"]["200"]["content"]["application/json"];
export type SimulatePolicyVetoResponse = operations["simulatePolicyVeto"]["responses"]["200"]["content"]["application/json"];
export type SubmitPolicyPackApprovalResponse = operations["submitPolicyPackApproval"]["responses"]["200"]["content"]["application/json"];
export type ApprovePolicyPackResponse = operations["approvePolicyPack"]["responses"]["200"]["content"]["application/json"];
export type RollbackPolicyPackResponse = operations["rollbackPolicyPack"]["responses"]["200"]["content"]["application/json"];
export type ListReasonCodesResponse = operations["listReasonCodes"]["responses"]["200"]["content"]["application/json"];
export type CreateReasonCodeResponse = operations["createReasonCode"]["responses"]["201"]["content"]["application/json"];
export type GetReasonCodeResponse = operations["getReasonCode"]["responses"]["200"]["content"]["application/json"];
export type UpdateReasonCodeResponse = operations["updateReasonCode"]["responses"]["200"]["content"]["application/json"];
export type PublishReasonCodeResponse = operations["publishReasonCode"]["responses"]["200"]["content"]["application/json"];


