import { document } from "@keystone-6/fields-document";
import { relationship } from "@keystone-6/core/fields";

export const NoteField = document({
  formatting: true,
  layouts: [
    [1, 1],
    [1, 1, 1],
    [2, 1],
    [1, 2],
    [1, 2, 1],
  ],
  links: true,
  dividers: true,
});

export const AttachmentField = relationship({
  ref: "File",
  many: true,
  ui: {
    displayMode: "cards",
    cardFields: ["document", "name", "createdAt"],
    // inlineEdit: { fields: ["name", "document"] },
    inlineCreate: { fields: ["document", "name"] },
    linkToItem: true,
    inlineConnect: false,
    hideCreate: false,
  },
});
