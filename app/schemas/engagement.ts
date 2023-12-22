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

  fields: {
    activity: select({
      type: "enum",
      options: [
        { label: "meeting", value: "Meeting" },
        { label: "presentation", value: "Presentation" },
      ],
    }),
    location: text({
      validation: {
        isRequired: true,
      },
    }),
    issues: multiselect({
      options: [
        { label: "youth transitioning", value: "YouthTransitioning" },
        { label: "funding", value: "Funding" },
        { label: "mental health", value: "MentalHealth" },
      ],
    }),
    notes: NoteField,
    attachments: AttachmentField,
  },
};
