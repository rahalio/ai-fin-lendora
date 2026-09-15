/**
 * MetricRepositoryDdb — sandbox metrics from in-memory application items.
 */

import type { MetricRepository } from "@lendora/services/applications";
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { getCoreTableName } from "../_shared/dynamodb-utils.js";
import { sanitizeItem } from "../_shared/dynamodb-key-helpers.js";
import { ulid } from "ulid";

export class MetricRepositoryDdb implements MetricRepository {
  private readonly TABLE_NAME: string;

  constructor(private readonly dynamoClient: AdapterDynamoDBClient) {
    this.TABLE_NAME = getCoreTableName();
  }

  private generateCorrelationId(): string {
    return `app_${ulid().toLowerCase()}`;
  }

  async getLendingMetrics(
    input: Parameters<MetricRepository["getLendingMetrics"]>[0],
  ): Promise<Awaited<ReturnType<MetricRepository["getLendingMetrics"]>>> {
    const inputExt = (input || {}) as Record<string, unknown>;
    const orgId = String(inputExt.orgId || "tnt_demo");
    const appsGsi = `ORG#${orgId}#APPLICATIONS`;
    const decisionsGsi = `ORG#${orgId}#CREDIT_DECISIONS`;

    const [appsResult, decisionsResult] = await Promise.all([
      this.dynamoClient.query({
        TableName: this.TABLE_NAME,
        IndexName: "GSI2",
        KeyConditionExpression: "#gsi2pk = :pk",
        ExpressionAttributeNames: { "#gsi2pk": "GSI2-PK" },
        ExpressionAttributeValues: { ":pk": appsGsi },
        Limit: 200,
      }),
      this.dynamoClient.query({
        TableName: this.TABLE_NAME,
        IndexName: "GSI2",
        KeyConditionExpression: "#gsi2pk = :pk",
        ExpressionAttributeNames: { "#gsi2pk": "GSI2-PK" },
        ExpressionAttributeValues: { ":pk": decisionsGsi },
        Limit: 200,
      }),
    ]);

    const apps = ((appsResult.Items || []) as Record<string, unknown>[]).map((i) =>
      sanitizeItem(i),
    );
    const decisions = ((decisionsResult.Items || []) as Record<string, unknown>[]).map(
      (i) => sanitizeItem(i),
    );

    let acceptCount = 0;
    let referCount = 0;
    let declineCount = 0;
    let policyBlockCount = 0;
    const durations: number[] = [];
    const now = Date.now();

    for (const decision of decisions) {
      const outcome = String(decision.outcome || "");
      if (outcome === "accept") acceptCount += 1;
      else if (outcome === "refer") referCount += 1;
      else if (outcome === "decline") declineCount += 1;
      if (Array.isArray(decision.policyVetoes) && (decision.policyVetoes as unknown[]).length) {
        policyBlockCount += 1;
      }
    }

    for (const app of apps) {
      if (app.receivedAt && app.decidedAt) {
        const ms =
          new Date(String(app.decidedAt)).getTime() -
          new Date(String(app.receivedAt)).getTime();
        if (Number.isFinite(ms) && ms >= 0) durations.push(ms);
      }
    }

    const decided = acceptCount + referCount + declineCount;
    const denom = decided || 1;
    durations.sort((a, b) => a - b);
    const medianDecisionMs =
      durations.length === 0
        ? 0
        : durations[Math.floor(durations.length / 2)] || 0;

    const data = {
      straightThroughRate: Number(((acceptCount + declineCount) / denom).toFixed(4)),
      medianDecisionMs,
      acceptCount,
      referCount,
      declineCount,
      policyBlockCount,
      slaBreachCount: 0,
      windowStart: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
      windowEnd: new Date(now).toISOString(),
    };

    return {
      data,
      meta: {
        correlationId:
          (inputExt.correlationId as string) || this.generateCorrelationId(),
        timestamp: new Date().toISOString(),
      },
    } as Awaited<ReturnType<MetricRepository["getLendingMetrics"]>>;
  }
}
