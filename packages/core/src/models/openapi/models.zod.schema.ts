import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerChallengerModel_Body = z
  .object({
    name: z.string(),
    role: z.enum(['champion', 'challenger']),
    stabilityScore: z.number().optional(),
    discriminationScore: z.number().optional(),
  })
  .passthrough();
const updateCurrentLearningEnvelope_Body = z
  .object({
    maxLoosenPct: z.number(),
    bounds: z.object({}).partial().passthrough(),
    locked: z.boolean(),
  })
  .partial()
  .passthrough();
const ModelRole = z.enum(['champion', 'challenger']);
const ModelStatus = z.enum([
  'candidate',
  'production',
  'retired',
  'pending_promote',
]);
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
const ModelVersionId = z.string();
const TenantId = z.string();
const ModelVersion = z
  .object({
    id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    role: z.enum(['champion', 'challenger']),
    status: z.enum(['candidate', 'production', 'retired', 'pending_promote']),
    stabilityScore: z.number().optional(),
    discriminationScore: z.number().optional(),
    vintageMetrics: z.object({}).partial().passthrough().optional(),
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
const ModelVersionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              role: z.enum(['champion', 'challenger']),
              status: z.enum([
                'candidate',
                'production',
                'retired',
                'pending_promote',
              ]),
              stabilityScore: z.number().optional(),
              discriminationScore: z.number().optional(),
              vintageMetrics: z.object({}).partial().passthrough().optional(),
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
const ModelVersionCreate = z
  .object({
    name: z.string(),
    role: z.enum(['champion', 'challenger']),
    stabilityScore: z.number().optional(),
    discriminationScore: z.number().optional(),
  })
  .passthrough();
const ModelVersionResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        role: z.enum(['champion', 'challenger']),
        status: z.enum([
          'candidate',
          'production',
          'retired',
          'pending_promote',
        ]),
        stabilityScore: z.number().optional(),
        discriminationScore: z.number().optional(),
        vintageMetrics: z.object({}).partial().passthrough().optional(),
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
const LearningEnvelopeId = z.string();
const LearningEnvelope = z
  .object({
    id: z.string().regex(/^env_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    locked: z.boolean(),
    maxLoosenPct: z.number(),
    bounds: z.object({}).partial().passthrough().optional(),
    dualApprovalRequired: z.boolean().optional(),
    pendingApproverIds: z.array(z.string()).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LearningEnvelopeResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^env_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        locked: z.boolean(),
        maxLoosenPct: z.number(),
        bounds: z.object({}).partial().passthrough().optional(),
        dualApprovalRequired: z.boolean().optional(),
        pendingApproverIds: z.array(z.string()).optional(),
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
const LearningEnvelopeUpdate = z
  .object({
    maxLoosenPct: z.number(),
    bounds: z.object({}).partial().passthrough(),
    locked: z.boolean(),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  registerChallengerModel_Body,
  updateCurrentLearningEnvelope_Body,
  ModelRole,
  ModelStatus,
  Problem,
  ModelVersionId,
  TenantId,
  ModelVersion,
  ResponseMeta,
  ModelVersionListResponse,
  ModelVersionCreate,
  ModelVersionResponse,
  LearningEnvelopeId,
  LearningEnvelope,
  LearningEnvelopeResponse,
  LearningEnvelopeUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/learning-envelopes/current',
    alias: 'getCurrentLearningEnvelope',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^env_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            locked: z.boolean(),
            maxLoosenPct: z.number(),
            bounds: z.object({}).partial().passthrough().optional(),
            dualApprovalRequired: z.boolean().optional(),
            pendingApproverIds: z.array(z.string()).optional(),
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
    method: 'patch',
    path: '/v1/learning-envelopes/current',
    alias: 'updateCurrentLearningEnvelope',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateCurrentLearningEnvelope_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^env_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            locked: z.boolean(),
            maxLoosenPct: z.number(),
            bounds: z.object({}).partial().passthrough().optional(),
            dualApprovalRequired: z.boolean().optional(),
            pendingApproverIds: z.array(z.string()).optional(),
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
  },
  {
    method: 'get',
    path: '/v1/models',
    alias: 'listCreditModels',
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
        name: 'role',
        type: 'Query',
        schema: z.enum(['champion', 'challenger']).optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['candidate', 'production', 'retired', 'pending_promote'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  role: z.enum(['champion', 'challenger']),
                  status: z.enum([
                    'candidate',
                    'production',
                    'retired',
                    'pending_promote',
                  ]),
                  stabilityScore: z.number().optional(),
                  discriminationScore: z.number().optional(),
                  vintageMetrics: z
                    .object({})
                    .partial()
                    .passthrough()
                    .optional(),
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
    path: '/v1/models',
    alias: 'registerChallengerModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerChallengerModel_Body,
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
            id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            role: z.enum(['champion', 'challenger']),
            status: z.enum([
              'candidate',
              'production',
              'retired',
              'pending_promote',
            ]),
            stabilityScore: z.number().optional(),
            discriminationScore: z.number().optional(),
            vintageMetrics: z.object({}).partial().passthrough().optional(),
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
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/models/:modelVersionId',
    alias: 'getCreditModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'modelVersionId',
        type: 'Path',
        schema: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            role: z.enum(['champion', 'challenger']),
            status: z.enum([
              'candidate',
              'production',
              'retired',
              'pending_promote',
            ]),
            stabilityScore: z.number().optional(),
            discriminationScore: z.number().optional(),
            vintageMetrics: z.object({}).partial().passthrough().optional(),
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
    path: '/v1/models/:modelVersionId/approve-promote',
    alias: 'approvePromoteModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'modelVersionId',
        type: 'Path',
        schema: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            role: z.enum(['champion', 'challenger']),
            status: z.enum([
              'candidate',
              'production',
              'retired',
              'pending_promote',
            ]),
            stabilityScore: z.number().optional(),
            discriminationScore: z.number().optional(),
            vintageMetrics: z.object({}).partial().passthrough().optional(),
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
    path: '/v1/models/:modelVersionId/propose-promote',
    alias: 'proposePromoteModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'modelVersionId',
        type: 'Path',
        schema: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            role: z.enum(['champion', 'challenger']),
            status: z.enum([
              'candidate',
              'production',
              'retired',
              'pending_promote',
            ]),
            stabilityScore: z.number().optional(),
            discriminationScore: z.number().optional(),
            vintageMetrics: z.object({}).partial().passthrough().optional(),
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
