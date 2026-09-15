/**
 * Audits Domain Facade
 *
 * High-level API for audits domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { auditsService } from "./audits.service";
// TODO: Import types
// import type { ... } from "./audits.api-types";

/**
 * Audits Facade
 *
 * High-level API for audits operations.
 * Components should use this facade instead of services directly.
 */
export const auditsFacade = {
  /**
   * List Decision Audits
   */
  async getAudit(...args: Parameters<typeof auditsService.getAudit>): Promise<any> {
    return auditsService.getAudit(...args);
  }

  /**
   * Create Decision Audit
   */
  async createAudit(...args: Parameters<typeof auditsService.createAudit>): Promise<any> {
    return auditsService.createAudit(...args);
  }

  /**
   * Get Decision Audit
   */
  async getAudit(...args: Parameters<typeof auditsService.getAudit>): Promise<any> {
    return auditsService.getAudit(...args);
  }

  /**
   * Get Decision Audit By Application
   */
  async getByApplication(...args: Parameters<typeof auditsService.getByApplication>): Promise<any> {
    return auditsService.getByApplication(...args);
  }
};
