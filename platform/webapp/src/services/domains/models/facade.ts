/**
 * Models Domain Facade
 *
 * High-level API for models domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { modelsService } from "./models.service";
// TODO: Import types
// import type { ... } from "./models.api-types";

/**
 * Models Facade
 *
 * High-level API for models operations.
 * Components should use this facade instead of services directly.
 */
export const modelsFacade = {
  /**
   * List Credit Models
   */
  async getVModel(...args: Parameters<typeof modelsService.getVModel>): Promise<any> {
    return modelsService.getVModel(...args);
  }

  /**
   * Register Challenger Model
   */
  async createVModel(...args: Parameters<typeof modelsService.createVModel>): Promise<any> {
    return modelsService.createVModel(...args);
  }

  /**
   * Get Credit Model
   */
  async getVModel(...args: Parameters<typeof modelsService.getVModel>): Promise<any> {
    return modelsService.getVModel(...args);
  }

  /**
   * Propose Promote Model
   */
  async getProposePromote(...args: Parameters<typeof modelsService.getProposePromote>): Promise<any> {
    return modelsService.getProposePromote(...args);
  }

  /**
   * Approve Promote Model
   */
  async createApprovePromote(...args: Parameters<typeof modelsService.createApprovePromote>): Promise<any> {
    return modelsService.createApprovePromote(...args);
  }

  /**
   * Get Current Learning Envelope
   */
  async getCurrent(...args: Parameters<typeof modelsService.getCurrent>): Promise<any> {
    return modelsService.getCurrent(...args);
  }

  /**
   * Update Current Learning Envelope
   */
  async updateCurrent(...args: Parameters<typeof modelsService.updateCurrent>): Promise<any> {
    return modelsService.updateCurrent(...args);
  }
};
