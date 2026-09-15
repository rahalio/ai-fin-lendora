/**
 * Applications DDD Dependencies - Composition root (hand-fitted after Mode A).
 */

import {
  ApplicationRepositoryAdapter,
  DecisionRepositoryAdapter,
  FeaturePackRepositoryAdapter,
  MetricRepositoryAdapter,
} from "@lendora/adapters/applications";
import { getIdGeneratorService } from "@lendora/adapters";
import type { AdapterDynamoDBClient } from "@lendora/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteCreateApplication,
  ExecuteDecideApplication,
  ExecuteGetApplication,
  ExecuteGetApplicationDecision,
  ExecuteGetApplicationFeaturePack,
  ExecuteGetLendingMetrics,
  ExecuteListApplications,
  ExecuteUpsertApplicationFeaturePack,
} from "@lendora/services/applications/usecases";
import type {
  ApplicationRepository,
  DecisionRepository,
  FeaturePackRepository,
  MetricRepository,
} from "@lendora/services/applications/ports";

export interface ApplicationsDomainModule {
  repos: {
    applications: ApplicationRepository;
    decisions: DecisionRepository;
    featurePacks: FeaturePackRepository;
    metrics: MetricRepository;
  };
  useCases: {
    applications: {
      create: ExecuteCreateApplication;
      get: ExecuteGetApplication;
      list: ExecuteListApplications;
    };
    decisions: {
      get: ExecuteGetApplicationDecision;
      decide: ExecuteDecideApplication;
    };
    featurePacks: {
      get: ExecuteGetApplicationFeaturePack;
      upsert: ExecuteUpsertApplicationFeaturePack;
    };
    metrics: {
      get: ExecuteGetLendingMetrics;
    };
  };
}

export function buildApplicationsDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): ApplicationsDomainModule {
  const repos = {
    applications: new ApplicationRepositoryAdapter(dynamoClient),
    decisions: new DecisionRepositoryAdapter(dynamoClient),
    featurePacks: new FeaturePackRepositoryAdapter(dynamoClient),
    metrics: new MetricRepositoryAdapter(dynamoClient),
  };

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  const useCases = {
    applications: {
      create: new ExecuteCreateApplication(
        executionContext,
        idGenerator,
        repos.applications,
      ),
      get: new ExecuteGetApplication(
        executionContext,
        idGenerator,
        repos.applications,
      ),
      list: new ExecuteListApplications(
        executionContext,
        idGenerator,
        repos.applications,
      ),
    },
    decisions: {
      get: new ExecuteGetApplicationDecision(
        executionContext,
        idGenerator,
        repos.decisions,
      ),
      decide: new ExecuteDecideApplication(
        executionContext,
        idGenerator,
        repos.decisions,
      ),
    },
    featurePacks: {
      get: new ExecuteGetApplicationFeaturePack(
        executionContext,
        idGenerator,
        repos.featurePacks,
      ),
      upsert: new ExecuteUpsertApplicationFeaturePack(
        executionContext,
        idGenerator,
        repos.featurePacks,
      ),
    },
    metrics: {
      get: new ExecuteGetLendingMetrics(
        executionContext,
        idGenerator,
        repos.metrics,
      ),
    },
  };

  return { repos, useCases };
}
