import { CogIcon } from "@sanity/icons/Cog";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Kionii content")
    .items([
      S.listItem()
        .id("homepageSettings")
        .title("Homepage Settings")
        .icon(CogIcon)
        .child(S.document().singleton("homepageSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
    ]);
