import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "sw2k0b84",
    dataset: "production",
  },
  deployment: {
    appId: "fn7adxl29lnkl5w0d7ns6qs3",
  },
  typegen: {
    enabled: true,
    path: "../client/src/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "../client/src/generated/sanity.types.ts",
    overloadClientMethods: true,
  },
});
