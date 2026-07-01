import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

import { MasterDetailIcon } from "@sanity/icons";
import { InfoOutlineIcon } from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Information Page")
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType("information").documentId("information")),

      S.divider(),

      orderableDocumentListDeskItem({
        type: "project",
        title: "Projects",
        S,
        icon: MasterDetailIcon,
        context,
      }),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["information", "project", "serviceTag", "collaboratorTag", "media.tag"].includes(
            item.getId()!,
          ),
      ),
    ]);
