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

export default {
  access: allowAll,

  fields: {
    name: text({
      validation: {
        isRequired: false,
      },
    }),
    altText: text(),
    document: file({ storage: "s3_storage" }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
};
