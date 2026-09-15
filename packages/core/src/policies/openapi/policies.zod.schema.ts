import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createPolicyPack_Body = z
  .object({
    productId: z.string(),
    productLine: z.enum(['personal', 'sme']),
    maxDti: z.number().optional(),
    maxAmount: z.number().optional(),
    excludedSegments: z.array(z.string()).optional(),
    version: z.string(),
  })
  .passthrough();
const updatePolicyPack_Body = z
  .object({
    maxDti: z.number(),
    maxAmount: z.number(),
    excludedSegments: z.array(z.string()),
  })
  .partial()
  .passthrough();
const simulatePolicyVeto_Body = z
  .object({
    sampleScore: z.number(),
    dti: z.number(),
    amount: z.number(),
    segment: z.string(),
  })
  .passthrough();
const createReasonCode_Body = z
  .object({
    code: z.string(),
    underwriterWording: z.string(),
    customerWording: z.string(),
    decisionPaths: z.array(z.enum(['decline', 'refer'])).optional(),
  })
  .passthrough();
const updateReasonCode_Body = z
  .object({
    underwriterWording: z.string(),
    customerWording: z.string(),
    decisionPaths: z.array(z.enum(['decline', 'refer'])),
  })
  .partial()
  .passthrough();
const ProductLine = z.enum(['personal', 'sme']);
const PolicyPackStatus = z.enum([
  'draft',
  'pending_approval',
  'active',
  'retired',
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
const PolicyPackId = z.string();
const TenantId = z.string();
const PolicyPack = z
  .object({
    id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    productId: z.string(),
    productLine: z.enum(['personal', 'sme']),
    maxDti: z.number().optional(),
    maxAmount: z.number().optional(),
    excludedSegments: z.array(z.string()).optional(),
    version: z.string(),
    status: z.enum(['draft', 'pending_approval', 'active', 'retired']),
    dualApprovalRequired: z.boolean().optional(),
    approverIds: z.array(z.string()).optional(),
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
const PolicyPackListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              productId: z.string(),
              productLine: z.enum(['personal', 'sme']),
              maxDti: z.number().optional(),
              maxAmount: z.number().optional(),
              excludedSegments: z.array(z.string()).optional(),
              version: z.string(),
              status: z.enum([
                'draft',
                'pending_approval',
                'active',
                'retired',
              ]),
              dualApprovalRequired: z.boolean().optional(),
              approverIds: z.array(z.string()).optional(),
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
const PolicyPackCreate = z
  .object({
    productId: z.string(),
    productLine: z.enum(['personal', 'sme']),
    maxDti: z.number().optional(),
    maxAmount: z.number().optional(),
    excludedSegments: z.array(z.string()).optional(),
    version: z.string(),
  })
  .passthrough();
const PolicyPackResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        productId: z.string(),
        productLine: z.enum(['personal', 'sme']),
        maxDti: z.number().optional(),
        maxAmount: z.number().optional(),
        excludedSegments: z.array(z.string()).optional(),
        version: z.string(),
        status: z.enum(['draft', 'pending_approval', 'active', 'retired']),
        dualApprovalRequired: z.boolean().optional(),
        approverIds: z.array(z.string()).optional(),
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
const PolicyPackUpdate = z
  .object({
    maxDti: z.number(),
    maxAmount: z.number(),
    excludedSegments: z.array(z.string()),
  })
  .partial()
  .passthrough();
const PolicyVetoSimulationRequest = z
  .object({
    sampleScore: z.number(),
    dti: z.number(),
    amount: z.number(),
    segment: z.string(),
  })
  .passthrough();
const PolicyVetoSimulationResult = z
  .object({
    vetoed: z.boolean(),
    outcome: z.enum(['pass', 'decline', 'refer']),
    hits: z.array(z.string()),
  })
  .passthrough();
const PolicyVetoSimulationResponse = z
  .object({
    data: z
      .object({
        vetoed: z.boolean(),
        outcome: z.enum(['pass', 'decline', 'refer']),
        hits: z.array(z.string()),
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
const ReasonCodeId = z.string();
const ReasonCode = z
  .object({
    id: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    code: z.string(),
    underwriterWording: z.string(),
    customerWording: z.string(),
    decisionPaths: z.array(z.enum(['decline', 'refer'])).optional(),
    status: z.enum(['draft', 'published', 'retired']),
    taxonomyVersion: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ReasonCodeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              code: z.string(),
              underwriterWording: z.string(),
              customerWording: z.string(),
              decisionPaths: z.array(z.enum(['decline', 'refer'])).optional(),
              status: z.enum(['draft', 'published', 'retired']),
              taxonomyVersion: z.string().optional(),
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
const ReasonCodeCreate = z
  .object({
    code: z.string(),
    underwriterWording: z.string(),
    customerWording: z.string(),
    decisionPaths: z.array(z.enum(['decline', 'refer'])).optional(),
  })
  .passthrough();
const ReasonCodeResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        code: z.string(),
        underwriterWording: z.string(),
        customerWording: z.string(),
        decisionPaths: z.array(z.enum(['decline', 'refer'])).optional(),
        status: z.enum(['draft', 'published', 'retired']),
        taxonomyVersion: z.string().optional(),
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
const ReasonCodeUpdate = z
  .object({
    underwriterWording: z.string(),
    customerWording: z.string(),
    decisionPaths: z.array(z.enum(['decline', 'refer'])),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createPolicyPack_Body,
  updatePolicyPack_Body,
  simulatePolicyVeto_Body,
  createReasonCode_Body,
  updateReasonCode_Body,
  ProductLine,
  PolicyPackStatus,
  Problem,
  PolicyPackId,
  TenantId,
  PolicyPack,
  ResponseMeta,
  PolicyPackListResponse,
  PolicyPackCreate,
  PolicyPackResponse,
  PolicyPackUpdate,
  PolicyVetoSimulationRequest,
  PolicyVetoSimulationResult,
  PolicyVetoSimulationResponse,
  ReasonCodeId,
  ReasonCode,
  ReasonCodeListResponse,
  ReasonCodeCreate,
  ReasonCodeResponse,
  ReasonCodeUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/policies',
    alias: 'listPolicyPacks',
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
        name: 'productLine',
        type: 'Query',
        schema: z.enum(['personal', 'sme']).optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['draft', 'pending_approval', 'active', 'retired'])
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
                  id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  productId: z.string(),
                  productLine: z.enum(['personal', 'sme']),
                  maxDti: z.number().optional(),
                  maxAmount: z.number().optional(),
                  excludedSegments: z.array(z.string()).optional(),
                  version: z.string(),
                  status: z.enum([
                    'draft',
                    'pending_approval',
                    'active',
                    'retired',
                  ]),
                  dualApprovalRequired: z.boolean().optional(),
                  approverIds: z.array(z.string()).optional(),
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
    path: '/v1/policies',
    alias: 'createPolicyPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPolicyPack_Body,
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
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            productId: z.string(),
            productLine: z.enum(['personal', 'sme']),
            maxDti: z.number().optional(),
            maxAmount: z.number().optional(),
            excludedSegments: z.array(z.string()).optional(),
            version: z.string(),
            status: z.enum(['draft', 'pending_approval', 'active', 'retired']),
            dualApprovalRequired: z.boolean().optional(),
            approverIds: z.array(z.string()).optional(),
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
    path: '/v1/policies/:policyPackId',
    alias: 'getPolicyPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyPackId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            productId: z.string(),
            productLine: z.enum(['personal', 'sme']),
            maxDti: z.number().optional(),
            maxAmount: z.number().optional(),
            excludedSegments: z.array(z.string()).optional(),
            version: z.string(),
            status: z.enum(['draft', 'pending_approval', 'active', 'retired']),
            dualApprovalRequired: z.boolean().optional(),
            approverIds: z.array(z.string()).optional(),
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
    path: '/v1/policies/:policyPackId',
    alias: 'updatePolicyPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updatePolicyPack_Body,
      },
      {
        name: 'policyPackId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            productId: z.string(),
            productLine: z.enum(['personal', 'sme']),
            maxDti: z.number().optional(),
            maxAmount: z.number().optional(),
            excludedSegments: z.array(z.string()).optional(),
            version: z.string(),
            status: z.enum(['draft', 'pending_approval', 'active', 'retired']),
            dualApprovalRequired: z.boolean().optional(),
            approverIds: z.array(z.string()).optional(),
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
    path: '/v1/policies/:policyPackId/approve',
    alias: 'approvePolicyPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyPackId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            productId: z.string(),
            productLine: z.enum(['personal', 'sme']),
            maxDti: z.number().optional(),
            maxAmount: z.number().optional(),
            excludedSegments: z.array(z.string()).optional(),
            version: z.string(),
            status: z.enum(['draft', 'pending_approval', 'active', 'retired']),
            dualApprovalRequired: z.boolean().optional(),
            approverIds: z.array(z.string()).optional(),
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
    path: '/v1/policies/:policyPackId/rollback',
    alias: 'rollbackPolicyPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyPackId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            productId: z.string(),
            productLine: z.enum(['personal', 'sme']),
            maxDti: z.number().optional(),
            maxAmount: z.number().optional(),
            excludedSegments: z.array(z.string()).optional(),
            version: z.string(),
            status: z.enum(['draft', 'pending_approval', 'active', 'retired']),
            dualApprovalRequired: z.boolean().optional(),
            approverIds: z.array(z.string()).optional(),
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
    path: '/v1/policies/:policyPackId/simulate',
    alias: 'simulatePolicyVeto',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: simulatePolicyVeto_Body,
      },
      {
        name: 'policyPackId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            vetoed: z.boolean(),
            outcome: z.enum(['pass', 'decline', 'refer']),
            hits: z.array(z.string()),
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
    path: '/v1/policies/:policyPackId/submit-approval',
    alias: 'submitPolicyPackApproval',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyPackId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            productId: z.string(),
            productLine: z.enum(['personal', 'sme']),
            maxDti: z.number().optional(),
            maxAmount: z.number().optional(),
            excludedSegments: z.array(z.string()).optional(),
            version: z.string(),
            status: z.enum(['draft', 'pending_approval', 'active', 'retired']),
            dualApprovalRequired: z.boolean().optional(),
            approverIds: z.array(z.string()).optional(),
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
    path: '/v1/reason-codes',
    alias: 'listReasonCodes',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  code: z.string(),
                  underwriterWording: z.string(),
                  customerWording: z.string(),
                  decisionPaths: z
                    .array(z.enum(['decline', 'refer']))
                    .optional(),
                  status: z.enum(['draft', 'published', 'retired']),
                  taxonomyVersion: z.string().optional(),
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
    path: '/v1/reason-codes',
    alias: 'createReasonCode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createReasonCode_Body,
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
            id: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            code: z.string(),
            underwriterWording: z.string(),
            customerWording: z.string(),
            decisionPaths: z.array(z.enum(['decline', 'refer'])).optional(),
            status: z.enum(['draft', 'published', 'retired']),
            taxonomyVersion: z.string().optional(),
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
    path: '/v1/reason-codes/:reasonCodeId',
    alias: 'getReasonCode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reasonCodeId',
        type: 'Path',
        schema: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            code: z.string(),
            underwriterWording: z.string(),
            customerWording: z.string(),
            decisionPaths: z.array(z.enum(['decline', 'refer'])).optional(),
            status: z.enum(['draft', 'published', 'retired']),
            taxonomyVersion: z.string().optional(),
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
    path: '/v1/reason-codes/:reasonCodeId',
    alias: 'updateReasonCode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateReasonCode_Body,
      },
      {
        name: 'reasonCodeId',
        type: 'Path',
        schema: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            code: z.string(),
            underwriterWording: z.string(),
            customerWording: z.string(),
            decisionPaths: z.array(z.enum(['decline', 'refer'])).optional(),
            status: z.enum(['draft', 'published', 'retired']),
            taxonomyVersion: z.string().optional(),
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
    path: '/v1/reason-codes/:reasonCodeId/publish',
    alias: 'publishReasonCode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reasonCodeId',
        type: 'Path',
        schema: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^rsn_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            code: z.string(),
            underwriterWording: z.string(),
            customerWording: z.string(),
            decisionPaths: z.array(z.enum(['decline', 'refer'])).optional(),
            status: z.enum(['draft', 'published', 'retired']),
            taxonomyVersion: z.string().optional(),
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
