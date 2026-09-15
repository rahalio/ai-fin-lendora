import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

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
const DecisionAuditId = z.string();
const TenantId = z.string();
const DecisionAudit = z
  .object({
    id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    applicationId: z.string(),
    decisionSnapshot: z.object({}).partial().passthrough().optional(),
    policySnapshot: z.object({}).partial().passthrough().optional(),
    modelSnapshot: z.object({}).partial().passthrough().optional(),
    featureSnapshot: z.object({}).partial().passthrough().optional(),
    integrityHash: z.string(),
    downloadUrl: z.string().url().optional(),
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
const DecisionAuditListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              applicationId: z.string(),
              decisionSnapshot: z.object({}).partial().passthrough().optional(),
              policySnapshot: z.object({}).partial().passthrough().optional(),
              modelSnapshot: z.object({}).partial().passthrough().optional(),
              featureSnapshot: z.object({}).partial().passthrough().optional(),
              integrityHash: z.string(),
              downloadUrl: z.string().url().optional(),
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
const DecisionAuditCreate = z
  .object({ applicationId: z.string() })
  .passthrough();
const DecisionAuditResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        applicationId: z.string(),
        decisionSnapshot: z.object({}).partial().passthrough().optional(),
        policySnapshot: z.object({}).partial().passthrough().optional(),
        modelSnapshot: z.object({}).partial().passthrough().optional(),
        featureSnapshot: z.object({}).partial().passthrough().optional(),
        integrityHash: z.string(),
        downloadUrl: z.string().url().optional(),
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
  Problem,
  DecisionAuditId,
  TenantId,
  DecisionAudit,
  ResponseMeta,
  DecisionAuditListResponse,
  DecisionAuditCreate,
  DecisionAuditResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/audits',
    alias: 'listDecisionAudits',
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
        name: 'applicationId',
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
                  id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  applicationId: z.string(),
                  decisionSnapshot: z
                    .object({})
                    .partial()
                    .passthrough()
                    .optional(),
                  policySnapshot: z
                    .object({})
                    .partial()
                    .passthrough()
                    .optional(),
                  modelSnapshot: z
                    .object({})
                    .partial()
                    .passthrough()
                    .optional(),
                  featureSnapshot: z
                    .object({})
                    .partial()
                    .passthrough()
                    .optional(),
                  integrityHash: z.string(),
                  downloadUrl: z.string().url().optional(),
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
    method: 'post',
    path: '/v1/audits',
    alias: 'createDecisionAudit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ applicationId: z.string() }).passthrough(),
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
            id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            applicationId: z.string(),
            decisionSnapshot: z.object({}).partial().passthrough().optional(),
            policySnapshot: z.object({}).partial().passthrough().optional(),
            modelSnapshot: z.object({}).partial().passthrough().optional(),
            featureSnapshot: z.object({}).partial().passthrough().optional(),
            integrityHash: z.string(),
            downloadUrl: z.string().url().optional(),
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
    path: '/v1/audits/:auditId',
    alias: 'getDecisionAudit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'auditId',
        type: 'Path',
        schema: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            applicationId: z.string(),
            decisionSnapshot: z.object({}).partial().passthrough().optional(),
            policySnapshot: z.object({}).partial().passthrough().optional(),
            modelSnapshot: z.object({}).partial().passthrough().optional(),
            featureSnapshot: z.object({}).partial().passthrough().optional(),
            integrityHash: z.string(),
            downloadUrl: z.string().url().optional(),
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
    method: 'get',
    path: '/v1/audits/by-application/:applicationId',
    alias: 'getDecisionAuditByApplication',
    requestFormat: 'json',
    parameters: [
      {
        name: 'applicationId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            applicationId: z.string(),
            decisionSnapshot: z.object({}).partial().passthrough().optional(),
            policySnapshot: z.object({}).partial().passthrough().optional(),
            modelSnapshot: z.object({}).partial().passthrough().optional(),
            featureSnapshot: z.object({}).partial().passthrough().optional(),
            integrityHash: z.string(),
            downloadUrl: z.string().url().optional(),
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
