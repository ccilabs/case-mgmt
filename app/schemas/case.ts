import { allowAll } from "@keystone-6/core/access";
import {
  integer,
  timestamp,
  select,
  multiselect,
  calendarDay,
  virtual,
} from "@keystone-6/core/fields";

import { graphql, config } from "@keystone-6/core";

import { NoteField, AttachmentField } from "./standardFields";

import { feedback } from "../custom-fields/conditional";
import { text } from "../custom-fields/text-field";

export default {
  access: allowAll,

  fields: {
    // primitive GraphQL type
    isActive: virtual({
      field: graphql.field({
        type: graphql.Boolean,
        resolve(item) {
          return item.case_number;
        },
      }),
    }),
    status: select({
      options: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
    }),

    case_number: integer({
      defaultValue: { kind: "autoincrement" },
      validation: {
        isRequired: true,
      },
    }),
    geographic_area: select({
      options: [{ label: "Vancouver Island", value: "VancouverIsland" }],
    }),

    issues: multiselect({
      options: [
        { label: "youth transitioning", value: "YouthTransitioning" },
        { label: "funding", value: "Funding" },
      ],
    }),

    rating: integer(),

    feedback: feedback({
      dependency: {
        field: "rating",
        minimumValue: 3,
      },
      ui: {
        description: "Additional feedback as to the rating",
      },
    }),

    action_taken_date: calendarDay({}),

    date_closed: timestamp({}),

    attachments: AttachmentField,
    notes: NoteField,
  },
};
