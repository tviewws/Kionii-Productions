import { visionTool } from "@sanity/vision";
import { defineConfig, defineSingleton } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "kionii",
  title: "Kionii Productions",
  projectId: "sw2k0b84",
  dataset: "production",
  plugins: [structureTool({ structure }), visionTool()],
  document: {
    singletons: [
      defineSingleton({
        id: "homepageSettings",
        documentId: "homepageSettings",
        schemaType: "siteSettings",
      }),
    ],
  },
  schema: { types: schemaTypes },
});
