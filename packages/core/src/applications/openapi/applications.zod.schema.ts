import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createApplication_Body = z
  .object({
    productId: z.string(),
    productLine: z.enum(['personal', 'sme']),
    applicantRef: z.string(),
    amount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
    features: z.object({}).partial().passthrough().optional(),
  })
  .passthrough();
const upsertApplicationFeaturePack_Body = z
  .object({
    provenance: z.array(z.enum(['bureau', 'bank_transactions', 'alt_data'])),
    features: z.object({}).partial().passthrough().optional(),
    documentRefs: z.array(z.string()).optional(),
  })
  .passthrough();
const ApplicationStatus = z.enum([
  'received',
  'deciding',
  'decided',
  'booked',
  'withdrawn',
]);
const ProductLine = z.enum(['personal', 'sme']);
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
const ApplicationId = z.string();
const TenantId = z.string();
const Currency = z.string();
const FeaturePackId = z.string();
const CreditDecisionId = z.string();
const Application = z
  .object({
    id: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    productId: z.string(),
    productLine: z.enum(['personal', 'sme']),
    applicantRef: z.string(),
    amount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
    status: z.enum(['received', 'deciding', 'decided', 'booked', 'withdrawn']),
    featurePackId: z
      .string()
      .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    decisionId: z
      .string()
      .regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    receivedAt: z.string().datetime({ offset: true }).optional(),
    decidedAt: z.string().datetime({ offset: true }).optional(),
    slaDeadlineAt: z.string().datetime({ offset: true }).optional(),
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
const ApplicationListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              productId: z.string(),
              productLine: z.enum(['personal', 'sme']),
              applicantRef: z.string(),
              amount: z.number(),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/),
              status: z.enum([
                'received',
                'deciding',
                'decided',
                'booked',
                'withdrawn',
              ]),
              featurePackId: z
                .string()
                .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              decisionId: z
                .string()
                .regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              receivedAt: z.string().datetime({ offset: true }).optional(),
              decidedAt: z.string().datetime({ offset: true }).optional(),
              slaDeadlineAt: z.string().datetime({ offset: true }).optional(),
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
const ApplicationCreate = z
  .object({
    productId: z.string(),
    productLine: z.enum(['personal', 'sme']),
    applicantRef: z.string(),
    amount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
    features: z.object({}).partial().passthrough().optional(),
  })
  .passthrough();
const ApplicationResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        productId: z.string(),
        productLine: z.enum(['personal', 'sme']),
        applicantRef: z.string(),
        amount: z.number(),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
        status: z.enum([
          'received',
          'deciding',
          'decided',
          'booked',
          'withdrawn',
        ]),
        featurePackId: z
          .string()
          .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        decisionId: z
          .string()
          .regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        receivedAt: z.string().datetime({ offset: true }).optional(),
        decidedAt: z.string().datetime({ offset: true }).optional(),
        slaDeadlineAt: z.string().datetime({ offset: true }).optional(),
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
const LendingMetrics = z
  .object({
    straightThroughRate: z.number(),
    medianDecisionMs: z.number().int(),
    acceptCount: z.number().int(),
    referCount: z.number().int(),
    declineCount: z.number().int(),
    policyBlockCount: z.number().int().optional(),
    slaBreachCount: z.number().int(),
    windowStart: z.string().datetime({ offset: true }),
    windowEnd: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LendingMetricsResponse = z
  .object({
    data: z
      .object({
        straightThroughRate: z.number(),
        medianDecisionMs: z.number().int(),
        acceptCount: z.number().int(),
        referCount: z.number().int(),
        declineCount: z.number().int(),
        policyBlockCount: z.number().int().optional(),
        slaBreachCount: z.number().int(),
        windowStart: z.string().datetime({ offset: true }),
        windowEnd: z.string().datetime({ offset: true }),
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
const FeatureProvenance = z.enum(['bureau', 'bank_transactions', 'alt_data']);
const FeaturePack = z
  .object({
    id: z.string().regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/),
    applicationId: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    provenance: z.array(z.enum(['bureau', 'bank_transactions', 'alt_data'])),
    features: z.object({}).partial().passthrough().optional(),
    documentRefs: z.array(z.string()).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const FeaturePackResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/),
        applicationId: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        provenance: z.array(
          z.enum(['bureau', 'bank_transactions', 'alt_data'])
        ),
        features: z.object({}).partial().passthrough().optional(),
        documentRefs: z.array(z.string()).optional(),
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
const FeaturePackUpsert = z
  .object({
    provenance: z.array(z.enum(['bureau', 'bank_transactions', 'alt_data'])),
    features: z.object({}).partial().passthrough().optional(),
    documentRefs: z.array(z.string()).optional(),
  })
  .passthrough();
const DecisionOutcome = z.enum(['accept', 'refer', 'decline']);
const TopFactor = z
  .object({
    code: z.string(),
    direction: z.enum(['positive', 'negative', 'neutral']),
    weight: z.number(),
    label: z.string().optional(),
  })
  .passthrough();
const CreditDecision = z
  .object({
    id: z.string().regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/),
    applicationId: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    outcome: z.enum(['accept', 'refer', 'decline']),
    score: z.number().optional(),
    reasonCodes: z.array(z.string()),
    policyVersionId: z.string().optional(),
    modelVersionId: z.string().optional(),
    featurePackId: z
      .string()
      .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    topFactors: z
      .array(
        z
          .object({
            code: z.string(),
            direction: z.enum(['positive', 'negative', 'neutral']),
            weight: z.number(),
            label: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    policyVetoes: z.array(z.string()).optional(),
    decidedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CreditDecisionResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/),
        applicationId: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        outcome: z.enum(['accept', 'refer', 'decline']),
        score: z.number().optional(),
        reasonCodes: z.array(z.string()),
        policyVersionId: z.string().optional(),
        modelVersionId: z.string().optional(),
        featurePackId: z
          .string()
          .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        topFactors: z
          .array(
            z
              .object({
                code: z.string(),
                direction: z.enum(['positive', 'negative', 'neutral']),
                weight: z.number(),
                label: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
        policyVetoes: z.array(z.string()).optional(),
        decidedAt: z.string().datetime({ offset: true }).optional(),
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
  createApplication_Body,
  upsertApplicationFeaturePack_Body,
  ApplicationStatus,
  ProductLine,
  Problem,
  ApplicationId,
  TenantId,
  Currency,
  FeaturePackId,
  CreditDecisionId,
  Application,
  ResponseMeta,
  ApplicationListResponse,
  ApplicationCreate,
  ApplicationResponse,
  LendingMetrics,
  LendingMetricsResponse,
  FeatureProvenance,
  FeaturePack,
  FeaturePackResponse,
  FeaturePackUpsert,
  DecisionOutcome,
  TopFactor,
  CreditDecision,
  CreditDecisionResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/applications',
    alias: 'listApplications',
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
          .enum(['received', 'deciding', 'decided', 'booked', 'withdrawn'])
          .optional(),
      },
      {
        name: 'productLine',
        type: 'Query',
        schema: z.enum(['personal', 'sme']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  productId: z.string(),
                  productLine: z.enum(['personal', 'sme']),
                  applicantRef: z.string(),
                  amount: z.number(),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/),
                  status: z.enum([
                    'received',
                    'deciding',
                    'decided',
                    'booked',
                    'withdrawn',
                  ]),
                  featurePackId: z
                    .string()
                    .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  decisionId: z
                    .string()
                    .regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  receivedAt: z.string().datetime({ offset: true }).optional(),
                  decidedAt: z.string().datetime({ offset: true }).optional(),
                  slaDeadlineAt: z
                    .string()
                    .datetime({ offset: true })
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
    path: '/v1/applications',
    alias: 'createApplication',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createApplication_Body,
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
            id: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            productId: z.string(),
            productLine: z.enum(['personal', 'sme']),
            applicantRef: z.string(),
            amount: z.number(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
            status: z.enum([
              'received',
              'deciding',
              'decided',
              'booked',
              'withdrawn',
            ]),
            featurePackId: z
              .string()
              .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            decisionId: z
              .string()
              .regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            receivedAt: z.string().datetime({ offset: true }).optional(),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            slaDeadlineAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/applications/:applicationId',
    alias: 'getApplication',
    requestFormat: 'json',
    parameters: [
      {
        name: 'applicationId',
        type: 'Path',
        schema: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            productId: z.string(),
            productLine: z.enum(['personal', 'sme']),
            applicantRef: z.string(),
            amount: z.number(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
            status: z.enum([
              'received',
              'deciding',
              'decided',
              'booked',
              'withdrawn',
            ]),
            featurePackId: z
              .string()
              .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            decisionId: z
              .string()
              .regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            receivedAt: z.string().datetime({ offset: true }).optional(),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            slaDeadlineAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/applications/:applicationId/decision',
    alias: 'getApplicationDecision',
    requestFormat: 'json',
    parameters: [
      {
        name: 'applicationId',
        type: 'Path',
        schema: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/),
            applicationId: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            outcome: z.enum(['accept', 'refer', 'decline']),
            score: z.number().optional(),
            reasonCodes: z.array(z.string()),
            policyVersionId: z.string().optional(),
            modelVersionId: z.string().optional(),
            featurePackId: z
              .string()
              .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            topFactors: z
              .array(
                z
                  .object({
                    code: z.string(),
                    direction: z.enum(['positive', 'negative', 'neutral']),
                    weight: z.number(),
                    label: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            policyVetoes: z.array(z.string()).optional(),
            decidedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/applications/:applicationId/decision',
    alias: 'decideApplication',
    requestFormat: 'json',
    parameters: [
      {
        name: 'applicationId',
        type: 'Path',
        schema: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^cdn_[0-9A-HJKMNP-TV-Z]{26}$/),
            applicationId: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            outcome: z.enum(['accept', 'refer', 'decline']),
            score: z.number().optional(),
            reasonCodes: z.array(z.string()),
            policyVersionId: z.string().optional(),
            modelVersionId: z.string().optional(),
            featurePackId: z
              .string()
              .regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            topFactors: z
              .array(
                z
                  .object({
                    code: z.string(),
                    direction: z.enum(['positive', 'negative', 'neutral']),
                    weight: z.number(),
                    label: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            policyVetoes: z.array(z.string()).optional(),
            decidedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/applications/:applicationId/feature-pack',
    alias: 'getApplicationFeaturePack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'applicationId',
        type: 'Path',
        schema: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/),
            applicationId: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            provenance: z.array(
              z.enum(['bureau', 'bank_transactions', 'alt_data'])
            ),
            features: z.object({}).partial().passthrough().optional(),
            documentRefs: z.array(z.string()).optional(),
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
    method: 'put',
    path: '/v1/applications/:applicationId/feature-pack',
    alias: 'upsertApplicationFeaturePack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: upsertApplicationFeaturePack_Body,
      },
      {
        name: 'applicationId',
        type: 'Path',
        schema: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^ftp_[0-9A-HJKMNP-TV-Z]{26}$/),
            applicationId: z.string().regex(/^app_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            provenance: z.array(
              z.enum(['bureau', 'bank_transactions', 'alt_data'])
            ),
            features: z.object({}).partial().passthrough().optional(),
            documentRefs: z.array(z.string()).optional(),
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
    path: '/v1/applications/metrics',
    alias: 'getLendingMetrics',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            straightThroughRate: z.number(),
            medianDecisionMs: z.number().int(),
            acceptCount: z.number().int(),
            referCount: z.number().int(),
            declineCount: z.number().int(),
            policyBlockCount: z.number().int().optional(),
            slaBreachCount: z.number().int(),
            windowStart: z.string().datetime({ offset: true }),
            windowEnd: z.string().datetime({ offset: true }),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
