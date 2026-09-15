/**
 * Referrals Domain Facade
 *
 * High-level API for referrals domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { referralsService } from "./referrals.service";
// TODO: Import types
// import type { ... } from "./referrals.api-types";

/**
 * Referrals Facade
 *
 * High-level API for referrals operations.
 * Components should use this facade instead of services directly.
 */
export const referralsFacade = {
  /**
   * List Refer Tasks
   */
  async getReferTask(...args: Parameters<typeof referralsService.getReferTask>): Promise<any> {
    return referralsService.getReferTask(...args);
  }

  /**
   * Get Refer Task
   */
  async getReferTask(...args: Parameters<typeof referralsService.getReferTask>): Promise<any> {
    return referralsService.getReferTask(...args);
  }

  /**
   * Claim Refer Task
   */
  async getClaim(...args: Parameters<typeof referralsService.getClaim>): Promise<any> {
    return referralsService.getClaim(...args);
  }

  /**
   * Create Override
   */
  async createOverride(...args: Parameters<typeof referralsService.createOverride>): Promise<any> {
    return referralsService.createOverride(...args);
  }
};
