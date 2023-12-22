// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

import { graphql, config } from "@keystone-6/core";
import { Context } from ".keystone/types";

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from "@keystone-6/core/fields";

// the document field is a more complicated field, so it has it's own package
import { document } from "@keystone-6/fields-document";
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from ".keystone/types";

import CaseSchema from "./schemas/case";
import CommunicationSchema from "./schemas/communication";
import ContactSchema from "./schemas/contact";
import EngagementSchema from "./schemas/engagement";
import FileSchema from "./schemas/file";
import UserSchema from "./schemas/user";

export const lists: Lists = {
  User: list(UserSchema),

  Post: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our Post list
    fields: {
      title: text({ validation: { isRequired: true } }),

      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      content: document({
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
      }),

      // with this field, you can set a User as the author for a Post
      author: relationship({
        // we could have used 'User', but then the relationship would only be 1-way
        ref: "User.posts",

        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true,
        },

        // a Post can only have one author
        //   this is the default, but we show it here for verbosity
        many: false,
      }),

      // with this field, you can add some Tags to Posts
      tags: relationship({
        // we could have used 'Tag', but then the relationship would only be 1-way
        ref: "Tag.posts",

        // a Post can have many Tags, not just one
        many: true,

        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] },
        },
      }),
    },
  }),

  // this last list is our Tag list, it only has a name field for now
  Tag: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
    ui: {
      isHidden: true,
    },

    // this is the fields for our Tag list
    fields: {
      name: text(),
      // this can be helpful to find out all the Posts associated with a Tag
      posts: relationship({ ref: "Post.tags", many: true }),
    },
  }),

  File: list(FileSchema),
  Contact: list(ContactSchema),
  Communication: list(CommunicationSchema),
  Case: list(CaseSchema),
  Engagement: list(EngagementSchema),
};

export const extendGraphqlSchema = graphql.extend((base) => {
  const Statistics = graphql.object<{ authorId: string }>()({
    name: "Statistics",
    fields: {
      draft: graphql.field({
        type: graphql.Int,
        resolve({ authorId }, args, context: Context) {
          return context.query.Post.count({
            where: {
              // status: { equals: "draft" },
            },
          });
        },
      }),
      published: graphql.field({
        type: graphql.Int,
        resolve({ authorId }, args, context: Context) {
          return context.query.Post.count({
            where: {
              // status: { equals: "published" },
            },
          });
        },
      }),
      latest: graphql.field({
        type: base.object("Post"),
        async resolve({ authorId }, args, context: Context) {
          const [post] = await context.db.Post.findMany({
            take: 1,
            orderBy: { publishDate: "desc" },
          });
          return post;
        },
      }),
    },
  });

  return {
    query: {
      groupedPosts: graphql.field({
        type: Statistics,
        // args: { id: graphql.arg({ type: graphql.nonNull(graphql.ID) }) },
        resolve(source, {}, context: Context) {
          return { authorId: "2" };
        },
      }),
    },
  };
});
