import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const AlertStatus = z.enum(['open', 'acknowledged', 'escalated', 'closed']);
const AlertSeverity = z.enum(['low', 'medium', 'high']);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const EarlyWarningAlertId = z.string();
const TenantId = z.string();
const EarlyWarningAlert = z
  .object({
    id: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    accountId: z.string(),
    applicationId: z.string().optional(),
    signal: z.string(),
    severity: z.enum(['low', 'medium', 'high']),
    status: z.enum(['open', 'acknowledged', 'escalated', 'closed']),
    vintageWindow: z.string(),
    expectedRisk: z.number().optional(),
    actualRisk: z.number().optional(),
    acknowledgedAt: z.string().datetime({ offset: true }).optional(),
    escalatedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const EarlyWarningAlertListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              accountId: z.string(),
              applicationId: z.string().optional(),
              signal: z.string(),
              severity: z.enum(['low', 'medium', 'high']),
              status: z.enum(['open', 'acknowledged', 'escalated', 'closed']),
              vintageWindow: z.string(),
              expectedRisk: z.number().optional(),
              actualRisk: z.number().optional(),
              acknowledgedAt: z.string().datetime({ offset: true }).optional(),
              escalatedAt: z.string().datetime({ offset: true }).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const EarlyWarningAlertResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        accountId: z.string(),
        applicationId: z.string().optional(),
        signal: z.string(),
        severity: z.enum(['low', 'medium', 'high']),
        status: z.enum(['open', 'acknowledged', 'escalated', 'closed']),
        vintageWindow: z.string(),
        expectedRisk: z.number().optional(),
        actualRisk: z.number().optional(),
        acknowledgedAt: z.string().datetime({ offset: true }).optional(),
        escalatedAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  AlertStatus,
  AlertSeverity,
  Problem,
  EarlyWarningAlertId,
  TenantId,
  EarlyWarningAlert,
  ResponseMeta,
  EarlyWarningAlertListResponse,
  EarlyWarningAlertResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/early-warnings',
    alias: 'listEarlyWarnings',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['open', 'acknowledged', 'escalated', 'closed'])
          .optional(),
      },
      {
        name: 'severity',
        type: 'Query',
        schema: z.enum(['low', 'medium', 'high']).optional(),
      },
      {
        name: 'vintageWindow',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  accountId: z.string(),
                  applicationId: z.string().optional(),
                  signal: z.string(),
                  severity: z.enum(['low', 'medium', 'high']),
                  status: z.enum([
                    'open',
                    'acknowledged',
                    'escalated',
                    'closed',
                  ]),
                  vintageWindow: z.string(),
                  expectedRisk: z.number().optional(),
                  actualRisk: z.number().optional(),
                  acknowledgedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  escalatedAt: z.string().datetime({ offset: true }).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/early-warnings/:alertId',
    alias: 'getEarlyWarning',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            accountId: z.string(),
            applicationId: z.string().optional(),
            signal: z.string(),
            severity: z.enum(['low', 'medium', 'high']),
            status: z.enum(['open', 'acknowledged', 'escalated', 'closed']),
            vintageWindow: z.string(),
            expectedRisk: z.number().optional(),
            actualRisk: z.number().optional(),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
            escalatedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/early-warnings/:alertId/acknowledge',
    alias: 'acknowledgeEarlyWarning',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            accountId: z.string(),
            applicationId: z.string().optional(),
            signal: z.string(),
            severity: z.enum(['low', 'medium', 'high']),
            status: z.enum(['open', 'acknowledged', 'escalated', 'closed']),
            vintageWindow: z.string(),
            expectedRisk: z.number().optional(),
            actualRisk: z.number().optional(),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
            escalatedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/early-warnings/:alertId/escalate',
    alias: 'escalateEarlyWarning',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ews_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            accountId: z.string(),
            applicationId: z.string().optional(),
            signal: z.string(),
            severity: z.enum(['low', 'medium', 'high']),
            status: z.enum(['open', 'acknowledged', 'escalated', 'closed']),
            vintageWindow: z.string(),
            expectedRisk: z.number().optional(),
            actualRisk: z.number().optional(),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
            escalatedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
