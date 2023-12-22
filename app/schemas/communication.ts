import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

import { group } from "@keystone-6/core";

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
  calendarDay,
} from "@keystone-6/core/fields";

import { NoteField } from "./standardFields";

export default {
  access: allowAll,

  fields: {
    contact: relationship({
      ref: "Contact.communications",
      ui: {
        displayMode: "select",
        labelField: "first_name",
        hideCreate: false,
        searchFields: ["last_name", "first_name"],
      },
    }),
    individual: relationship({
      ref: "Contact",
    }),
    ...group({
      label: "Communication Details",
      description: "Further information about the communication",
      fields: {
        communication_date: calendarDay({}),
        communication_type: select({
          type: "enum",
          options: [
            { label: "phone call", value: "PhoneCall" },
            { label: "email", value: "Email" },
          ],
        }),
      },
    }),

    // cases: relationship({ ref: "Case.case_number", many: true }),

    notes: NoteField,
  },
};
