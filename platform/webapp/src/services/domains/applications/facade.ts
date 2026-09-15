/**
 * Applications Domain Facade
 *
 * High-level API for applications domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { applicationsService } from "./applications.service";
// TODO: Import types
// import type { ... } from "./applications.api-types";

/**
 * Applications Facade
 *
 * High-level API for applications operations.
 * Components should use this facade instead of services directly.
 */
export const applicationsFacade = {
  /**
   * List Applications
   */
  async getApplication(...args: Parameters<typeof applicationsService.getApplication>): Promise<any> {
    return applicationsService.getApplication(...args);
  }

  /**
   * Create Application
   */
  async createApplication(...args: Parameters<typeof applicationsService.createApplication>): Promise<any> {
    return applicationsService.createApplication(...args);
  }

  /**
   * Get Lending Metrics
   */
  async getMetric(...args: Parameters<typeof applicationsService.getMetric>): Promise<any> {
    return applicationsService.getMetric(...args);
  }

  /**
   * Get Application
   */
  async getApplication(...args: Parameters<typeof applicationsService.getApplication>): Promise<any> {
    return applicationsService.getApplication(...args);
  }

  /**
   * Get Application Feature Pack
   */
  async getFeaturePack(...args: Parameters<typeof applicationsService.getFeaturePack>): Promise<any> {
    return applicationsService.getFeaturePack(...args);
  }

  /**
   * Upsert Application Feature Pack
   */
  async getFeaturePack(...args: Parameters<typeof applicationsService.getFeaturePack>): Promise<any> {
    return applicationsService.getFeaturePack(...args);
  }

  /**
   * Get Application Decision
   */
  async getDecision(...args: Parameters<typeof applicationsService.getDecision>): Promise<any> {
    return applicationsService.getDecision(...args);
  }

  /**
   * Decide Application
   */
  async getDecision(...args: Parameters<typeof applicationsService.getDecision>): Promise<any> {
    return applicationsService.getDecision(...args);
  }
};
