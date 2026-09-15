/**
 * Early Warnings Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/early-warnings.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AlertSeverity = components["schemas"]["AlertSeverity"];
export type AlertStatus = components["schemas"]["AlertStatus"];
export type EarlyWarningAlert = components["schemas"]["EarlyWarningAlert"];
export type EarlyWarningAlertId = components["schemas"]["EarlyWarningAlertId"];
export type EarlyWarning = operations["listEarlyWarnings"]["responses"]["200"]["content"]["application/json"]["data"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListEarlyWarningsParams = NonNullable<operations["listEarlyWarnings"]["parameters"]["query"]>;
export type GetEarlyWarningParams = operations["getEarlyWarning"]["parameters"]["path"];
export type AcknowledgeEarlyWarningParams = operations["acknowledgeEarlyWarning"]["parameters"]["path"];
export type EscalateEarlyWarningParams = operations["escalateEarlyWarning"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListEarlyWarningsResponse = operations["listEarlyWarnings"]["responses"]["200"]["content"]["application/json"];
export type GetEarlyWarningResponse = operations["getEarlyWarning"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgeEarlyWarningResponse = operations["acknowledgeEarlyWarning"]["responses"]["200"]["content"]["application/json"];
export type EscalateEarlyWarningResponse = operations["escalateEarlyWarning"]["responses"]["200"]["content"]["application/json"];


