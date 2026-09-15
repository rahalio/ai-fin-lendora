/**
 * Integration event type catalog — Lendora.
 */

import { z } from 'zod';

export const IntegrationEventTypes = {
  IDENTITY_API_KEY_CREATED: 'identity.api-key.created',
  IDENTITY_API_KEY_REVOKED: 'identity.api-key.revoked',
  IDENTITY_USER_CREATED: 'identity.user.created',
  IDENTITY_USER_DISABLED: 'identity.user.disabled',
  APPLICATION_CREATED: 'application.created',
  APPLICATION_SCORED: 'application.scored',
  APPLICATION_DECIDED: 'application.decided',
  APPLICATION_REFERRED: 'application.referred',
  APPLICATION_OVERRIDDEN: 'application.overridden',
  APPLICATION_BOOKED: 'application.booked',
  EARLY_WARNING_RAISED: 'early-warning.raised',
  MODEL_PROMOTED: 'model.promoted',
  POLICY_PACK_PUBLISHED: 'policy.pack.published',
} as const;

export type IntegrationEventType =
  (typeof IntegrationEventTypes)[keyof typeof IntegrationEventTypes];

export const ApiKeyCreatedPayloadSchema = z.object({
  keyId: z.string().min(1),
  tenantId: z.string().min(1),
});

export type ApiKeyCreatedPayload = z.infer<typeof ApiKeyCreatedPayloadSchema>;

export const ApplicationDecidedPayloadSchema = z.object({
  applicationId: z.string().min(1),
  decisionId: z.string().min(1),
  outcome: z.enum(['accept', 'refer', 'decline']),
  tenantId: z.string().min(1),
});

export type ApplicationDecidedPayload = z.infer<typeof ApplicationDecidedPayloadSchema>;
