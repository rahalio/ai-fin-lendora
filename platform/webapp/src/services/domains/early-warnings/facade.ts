/**
 * EarlyWarnings Domain Facade
 *
 * High-level API for early-warnings domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { early-warningsService } from "./early-warnings.service";
// TODO: Import types
// import type { ... } from "./early-warnings.api-types";

/**
 * EarlyWarnings Facade
 *
 * High-level API for early-warnings operations.
 * Components should use this facade instead of services directly.
 */
export const early-warningsFacade = {
  /**
   * List Early Warnings
   */
  async getEarlyWarning(...args: Parameters<typeof early-warningsService.getEarlyWarning>): Promise<any> {
    return early-warningsService.getEarlyWarning(...args);
  }

  /**
   * Get Early Warning
   */
  async getEarlyWarning(...args: Parameters<typeof early-warningsService.getEarlyWarning>): Promise<any> {
    return early-warningsService.getEarlyWarning(...args);
  }

  /**
   * Acknowledge Early Warning
   */
  async getAcknowledge(...args: Parameters<typeof early-warningsService.getAcknowledge>): Promise<any> {
    return early-warningsService.getAcknowledge(...args);
  }

  /**
   * Escalate Early Warning
   */
  async getEscalate(...args: Parameters<typeof early-warningsService.getEscalate>): Promise<any> {
    return early-warningsService.getEscalate(...args);
  }
};
