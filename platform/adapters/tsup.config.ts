import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/**/index.ts"],
  format: ["esm"],
  dts: false,
  outDir: "dist",
  external: [
    "@aws-sdk/lib-dynamodb",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/client-s3",
    "@lendora/core",
    "@lendora/services",
  ],
  tsconfig: "./tsconfig.json",
});
