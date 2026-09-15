import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  external: [
    "@lendora/core",
    "@lendora/services",
    "@lendora/adapters",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/lib-dynamodb",
    "@aws-sdk/credential-providers",
    "fastify",
    "undici",
  ],
});
