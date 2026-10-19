import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "sw2k0b84",
    dataset: "production",
  },
  typegen: {
    enabled: true,
    path: "../client/src/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "../client/src/generated/sanity.types.ts",
    overloadClientMethods: true,
  },
});
