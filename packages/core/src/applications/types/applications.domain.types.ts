/**
 * Applications Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/applications.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Application = components["schemas"]["Application"];
export type ApplicationCreate = components["schemas"]["ApplicationCreate"];
export type ApplicationId = components["schemas"]["ApplicationId"];
export type ApplicationStatus = components["schemas"]["ApplicationStatus"];
export type CreditDecision = components["schemas"]["CreditDecision"];
export type CreditDecisionId = components["schemas"]["CreditDecisionId"];
export type DecisionOutcome = components["schemas"]["DecisionOutcome"];
export type FeaturePack = components["schemas"]["FeaturePack"];
export type FeaturePackId = components["schemas"]["FeaturePackId"];
export type FeaturePackUpsert = components["schemas"]["FeaturePackUpsert"];
export type FeatureProvenance = components["schemas"]["FeatureProvenance"];
export type LendingMetrics = components["schemas"]["LendingMetrics"];
export type ProductLine = components["schemas"]["ProductLine"];
export type TopFactor = components["schemas"]["TopFactor"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateApplicationRequestInput = NonNullable<operations["createApplication"]["requestBody"]>["content"]["application/json"];
export type UpsertApplicationFeaturePackRequestInput = NonNullable<operations["upsertApplicationFeaturePack"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListApplicationsParams = NonNullable<operations["listApplications"]["parameters"]["query"]>;
export type GetApplicationParams = operations["getApplication"]["parameters"]["path"];
export type GetApplicationFeaturePackParams = operations["getApplicationFeaturePack"]["parameters"]["path"];
export type UpsertApplicationFeaturePackParams = operations["upsertApplicationFeaturePack"]["parameters"]["path"];
export type GetApplicationDecisionParams = operations["getApplicationDecision"]["parameters"]["path"];
export type DecideApplicationParams = operations["decideApplication"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListApplicationsResponse = operations["listApplications"]["responses"]["200"]["content"]["application/json"];
export type CreateApplicationResponse = operations["createApplication"]["responses"]["201"]["content"]["application/json"];
export type GetLendingMetricsResponse = operations["getLendingMetrics"]["responses"]["200"]["content"]["application/json"];
export type GetApplicationResponse = operations["getApplication"]["responses"]["200"]["content"]["application/json"];
export type GetApplicationFeaturePackResponse = operations["getApplicationFeaturePack"]["responses"]["200"]["content"]["application/json"];
export type UpsertApplicationFeaturePackResponse = operations["upsertApplicationFeaturePack"]["responses"]["200"]["content"]["application/json"];
export type GetApplicationDecisionResponse = operations["getApplicationDecision"]["responses"]["200"]["content"]["application/json"];
export type DecideApplicationResponse = operations["decideApplication"]["responses"]["201"]["content"]["application/json"];


