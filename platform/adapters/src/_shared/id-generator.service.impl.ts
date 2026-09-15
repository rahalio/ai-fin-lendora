/**
 * ID Generator Service Implementation — Lendora prefixes.
 */

import type { DomainCode } from '@lendora/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@lendora/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@lendora/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  appId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.application);
  }
  polId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.policyPack);
  }
  refId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.referTask);
  }
  ewsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.earlyWarning);
  }
  mdlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.modelVersion);
  }
  audId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.decisionAudit);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
