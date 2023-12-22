import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  multiselect,
  file,
} from "@keystone-6/core/fields";

import { NoteField, AttachmentField } from "./standardFields";

export default {
  access: allowAll,

  // this is the fields for our User list
  fields: {
    category: multiselect({
      type: "enum",
      options: [
        { label: "person with disability", value: "PersonDisability" },
        { label: "family (mother, father, sibling, other)", value: "Family" },
        { label: "service provider", value: "ServiceProvider" },
      ],
      defaultValue: [],
    }),

    category_other: text({ validation: { isRequired: false } }),

    last_name: text({ validation: { isRequired: false } }),

    first_name: text({ validation: { isRequired: false } }),

    email: text({
      validation: { isRequired: false },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project
      //   isIndexed: "unique",
    }),

    phone: text({ validation: { isRequired: false } }),

    indigenous_person: select({
      type: "enum",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    }),

    attachments: AttachmentField,

    createdAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: "now" },
    }),

    // cases: relationship({ ref: "Case.case_number", many: true }),
    communications: relationship({
      ref: "Communication.contact",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["communication_date", "contact", "individual"],
        // inlineEdit: { fields: ["name", "document"] },
        //inlineCreate: { fields: ["document", "name"] },
        linkToItem: true,
        inlineConnect: false,
        hideCreate: false,
        removeMode: "none",
      },
    }),
  },
};
