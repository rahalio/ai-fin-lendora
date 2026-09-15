/**
 * ExecuteGetLendingMetrics — hand-maintained for action-only metrics endpoint.
 */

import type {
  GetLendingMetricsInput,
  GetLendingMetricsOutput,
} from "../dto/metric.dto";
import type {
  ExecutionContextService,
  IdGeneratorService,
} from "@lendora/services/_shared/index.js";
import type { MetricRepository } from "../ports";
import { ValidationError } from "../errors";

export class ExecuteGetLendingMetrics {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly metric: MetricRepository,
  ) {}

  async execute(input: GetLendingMetricsInput): Promise<GetLendingMetricsOutput> {
    const correlationId = this.idGenerator.appId();
    if (input === undefined || input === null) {
      throw new ValidationError("Input is required");
    }
    return (await this.metric.getLendingMetrics({
      ...input,
      orgId: this.context.getOrgId(),
      correlationId,
    } as any)) as GetLendingMetricsOutput;
  }
}
