/**
 * Models Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/models.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ModelRole = components["schemas"]["ModelRole"];
export type ModelStatus = components["schemas"]["ModelStatus"];
export type ModelVersion = components["schemas"]["ModelVersion"];
export type ModelVersionCreate = components["schemas"]["ModelVersionCreate"];
export type ModelVersionId = components["schemas"]["ModelVersionId"];
export type VModel = operations["listCreditModels"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterChallengerModelRequestInput = NonNullable<operations["registerChallengerModel"]["requestBody"]>["content"]["application/json"];
export type UpdateCurrentLearningEnvelopeRequestInput = NonNullable<operations["updateCurrentLearningEnvelope"]["requestBody"]>["content"]["application/json"];
export type UpdateCurrentLearningEnvelopeRequest = UpdateCurrentLearningEnvelopeRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCreditModelsParams = NonNullable<operations["listCreditModels"]["parameters"]["query"]>;
export type GetCreditModelParams = operations["getCreditModel"]["parameters"]["path"];
export type ProposePromoteModelParams = operations["proposePromoteModel"]["parameters"]["path"];
export type ApprovePromoteModelParams = operations["approvePromoteModel"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCreditModelsResponse = operations["listCreditModels"]["responses"]["200"]["content"]["application/json"];
export type RegisterChallengerModelResponse = operations["registerChallengerModel"]["responses"]["201"]["content"]["application/json"];
export type GetCreditModelResponse = operations["getCreditModel"]["responses"]["200"]["content"]["application/json"];
export type ProposePromoteModelResponse = operations["proposePromoteModel"]["responses"]["200"]["content"]["application/json"];
export type ApprovePromoteModelResponse = operations["approvePromoteModel"]["responses"]["200"]["content"]["application/json"];
export type GetCurrentLearningEnvelopeResponse = operations["getCurrentLearningEnvelope"]["responses"]["200"]["content"]["application/json"];
export type UpdateCurrentLearningEnvelopeResponse = operations["updateCurrentLearningEnvelope"]["responses"]["200"]["content"]["application/json"];


