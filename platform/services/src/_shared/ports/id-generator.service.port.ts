/**
 * IdGeneratorService Port — Lendora prefixes.
 */

import type { DomainCode } from '@lendora/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  appId(): string;
  polId(): string;
  refId(): string;
  ewsId(): string;
  mdlId(): string;
  audId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
