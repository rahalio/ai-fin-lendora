/**
 * DynamoDB Utilities
 *
 * Table name resolvers and shared helpers for DynamoDB repository adapters.
 * Entity-specific key building is done via each adapter's private buildPK/buildSK.
 */

export { sanitizeItem } from "./dynamodb-key-helpers.js";

/**
 * Get the core DynamoDB table name from environment variables
 *
 * @returns The core table name (e.g., "lendora-core-dev")
 * @throws Error if TABLE_NAME or DYNAMODB_CORE_TABLE_NAME environment variable is not set
 */
export function getCoreTableName(): string {
  const tableName = process.env.TABLE_NAME || process.env.DYNAMODB_CORE_TABLE_NAME;
  if (!tableName) {
    return "lendora-core-sandbox";
  }
  return tableName;
}

/**
 * Get the base DynamoDB table name from environment variables
 *
 * @returns The base table name (e.g., "lendora-base-dev")
 */
export function getBaseTableName(): string {
  const tableName = process.env.BASE_TABLE_NAME || process.env.DYNAMODB_BASE_TABLE_NAME;
  if (!tableName) {
    return "lendora-base-sandbox";
  }
  return tableName;
}

/**
 * Get the analytics DynamoDB table name from environment variables
 *
 * @returns The analytics table name (e.g., "lendora-analytics-dev")
 */
export function getAnalyticsTableName(): string {
  const tableName = process.env.ANALYTICS_TABLE_NAME || process.env.DYNAMODB_ANALYTICS_TABLE_NAME;
  if (!tableName) {
    return "lendora-analytics-sandbox";
  }
  return tableName;
}

/**
 * Get the realtime DynamoDB table name from environment variables
 *
 * @returns The realtime table name (e.g., "lendora-app-realtime-dev")
 */
export function getRealtimeTableName(): string {
  const tableName =
    process.env.REALTIME_TABLE_NAME || process.env.DYNAMODB_REALTIME_TABLE_NAME;
  if (!tableName) {
    return "lendora-realtime-sandbox";
  }
  return tableName;
}
