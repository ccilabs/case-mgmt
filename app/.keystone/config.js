"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// schemas/standardFields.ts
var import_fields_document, import_fields, NoteField, AttachmentField;
var init_standardFields = __esm({
  "schemas/standardFields.ts"() {
    "use strict";
    import_fields_document = require("@keystone-6/fields-document");
    import_fields = require("@keystone-6/core/fields");
    NoteField = (0, import_fields_document.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    });
    AttachmentField = (0, import_fields.relationship)({
      ref: "File",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["document", "name", "createdAt"],
        // inlineEdit: { fields: ["name", "document"] },
        inlineCreate: { fields: ["document", "name"] },
        linkToItem: true,
        inlineConnect: false,
        hideCreate: false
      }
    });
  }
});

// custom-fields/conditional/index.tsx
function feedback({
  isIndexed,
  dependency,
  ...config4
}) {
  return (meta) => (0, import_types.fieldType)({
    kind: "scalar",
    mode: "optional",
    scalar: "String",
    index: isIndexed === true ? "index" : isIndexed || void 0
  })({
    ...config4,
    input: {
      create: {
        arg: import_core.graphql.arg({ type: import_core.graphql.String }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(value, context) {
          return value;
        }
      },
      update: { arg: import_core.graphql.arg({ type: import_core.graphql.String }) },
      orderBy: { arg: import_core.graphql.arg({ type: import_types.orderDirectionEnum }) }
    },
    output: import_core.graphql.field({
      type: import_core.graphql.String,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resolve({ value, item }, args, context, info) {
        return value;
      }
    }),
    views: "./custom-fields/conditional/views",
    getAdminMeta() {
      return {
        dependency
      };
    }
  });
}
var import_types, import_core;
var init_conditional = __esm({
  "custom-fields/conditional/index.tsx"() {
    "use strict";
    import_types = require("@keystone-6/core/types");
    import_core = require("@keystone-6/core");
  }
});

// schemas/case.ts
var import_access, import_fields2, import_core2, case_default;
var init_case = __esm({
  "schemas/case.ts"() {
    "use strict";
    import_access = require("@keystone-6/core/access");
    import_fields2 = require("@keystone-6/core/fields");
    import_core2 = require("@keystone-6/core");
    init_standardFields();
    init_conditional();
    case_default = {
      access: import_access.allowAll,
      fields: {
        // primitive GraphQL type
        isActive: (0, import_fields2.virtual)({
          field: import_core2.graphql.field({
            type: import_core2.graphql.Boolean,
            resolve(item) {
              return item.case_number;
            }
          })
        }),
        status: (0, import_fields2.select)({
          options: [
            { label: "Open", value: "open" },
            { label: "Closed", value: "closed" }
          ]
        }),
        case_number: (0, import_fields2.integer)({
          defaultValue: { kind: "autoincrement" },
          validation: {
            isRequired: true
          }
        }),
        geographic_area: (0, import_fields2.select)({
          options: [{ label: "Vancouver Island", value: "VancouverIsland" }]
        }),
        issues: (0, import_fields2.multiselect)({
          options: [
            { label: "youth transitioning", value: "YouthTransitioning" },
            { label: "funding", value: "Funding" }
          ]
        }),
        rating: (0, import_fields2.integer)(),
        feedback: feedback({
          dependency: {
            field: "rating",
            minimumValue: 3
          },
          ui: {
            description: "Additional feedback as to the rating"
          }
        }),
        action_taken_date: (0, import_fields2.calendarDay)({}),
        date_closed: (0, import_fields2.timestamp)({}),
        attachments: AttachmentField,
        notes: NoteField
      }
    };
  }
});

// schemas/communication.ts
var import_access2, import_core3, import_fields3, communication_default;
var init_communication = __esm({
  "schemas/communication.ts"() {
    "use strict";
    import_access2 = require("@keystone-6/core/access");
    import_core3 = require("@keystone-6/core");
    import_fields3 = require("@keystone-6/core/fields");
    init_standardFields();
    communication_default = {
      access: import_access2.allowAll,
      fields: {
        contact: (0, import_fields3.relationship)({
          ref: "Contact.communications",
          ui: {
            displayMode: "select",
            labelField: "first_name",
            hideCreate: false,
            searchFields: ["last_name", "first_name"]
          }
        }),
        individual: (0, import_fields3.relationship)({
          ref: "Contact"
        }),
        ...(0, import_core3.group)({
          label: "Communication Details",
          description: "Further information about the communication",
          fields: {
            communication_date: (0, import_fields3.calendarDay)({}),
            communication_type: (0, import_fields3.select)({
              type: "enum",
              options: [
                { label: "phone call", value: "PhoneCall" },
                { label: "email", value: "Email" }
              ]
            })
          }
        }),
        // cases: relationship({ ref: "Case.case_number", many: true }),
        notes: NoteField
      }
    };
  }
});

// schemas/contact.ts
var import_access3, import_fields4, contact_default;
var init_contact = __esm({
  "schemas/contact.ts"() {
    "use strict";
    import_access3 = require("@keystone-6/core/access");
    import_fields4 = require("@keystone-6/core/fields");
    init_standardFields();
    contact_default = {
      access: import_access3.allowAll,
      // this is the fields for our User list
      fields: {
        category: (0, import_fields4.multiselect)({
          type: "enum",
          options: [
            { label: "person with disability", value: "PersonDisability" },
            { label: "family (mother, father, sibling, other)", value: "Family" },
            { label: "service provider", value: "ServiceProvider" }
          ],
          defaultValue: []
        }),
        category_other: (0, import_fields4.text)({ validation: { isRequired: false } }),
        last_name: (0, import_fields4.text)({ validation: { isRequired: false } }),
        first_name: (0, import_fields4.text)({ validation: { isRequired: false } }),
        email: (0, import_fields4.text)({
          validation: { isRequired: false }
          // by adding isIndexed: 'unique', we're saying that no user can have the same
          // email as another user - this may or may not be a good idea for your project
          //   isIndexed: "unique",
        }),
        phone: (0, import_fields4.text)({ validation: { isRequired: false } }),
        indigenous_person: (0, import_fields4.select)({
          type: "enum",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        }),
        attachments: AttachmentField,
        createdAt: (0, import_fields4.timestamp)({
          // this sets the timestamp to Date.now() when the user is first created
          defaultValue: { kind: "now" }
        }),
        // cases: relationship({ ref: "Case.case_number", many: true }),
        communications: (0, import_fields4.relationship)({
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
            removeMode: "none"
          }
        })
      }
    };
  }
});

// schemas/engagement.ts
var import_access4, import_fields5, engagement_default;
var init_engagement = __esm({
  "schemas/engagement.ts"() {
    "use strict";
    import_access4 = require("@keystone-6/core/access");
    import_fields5 = require("@keystone-6/core/fields");
    init_standardFields();
    engagement_default = {
      access: import_access4.allowAll,
      fields: {
        activity: (0, import_fields5.select)({
          type: "enum",
          options: [
            { label: "meeting", value: "Meeting" },
            { label: "presentation", value: "Presentation" }
          ]
        }),
        location: (0, import_fields5.text)({
          validation: {
            isRequired: true
          }
        }),
        issues: (0, import_fields5.multiselect)({
          options: [
            { label: "youth transitioning", value: "YouthTransitioning" },
            { label: "funding", value: "Funding" },
            { label: "mental health", value: "MentalHealth" }
          ]
        }),
        notes: NoteField,
        attachments: AttachmentField
      }
    };
  }
});

// schemas/file.ts
var import_access5, import_fields6, file_default;
var init_file = __esm({
  "schemas/file.ts"() {
    "use strict";
    import_access5 = require("@keystone-6/core/access");
    import_fields6 = require("@keystone-6/core/fields");
    file_default = {
      access: import_access5.allowAll,
      fields: {
        name: (0, import_fields6.text)({
          validation: {
            isRequired: false
          }
        }),
        altText: (0, import_fields6.text)(),
        document: (0, import_fields6.file)({ storage: "s3_storage" }),
        createdAt: (0, import_fields6.timestamp)({
          defaultValue: { kind: "now" }
        })
      }
    };
  }
});

// schemas/user.ts
var import_access6, import_fields7, user_default;
var init_user = __esm({
  "schemas/user.ts"() {
    "use strict";
    import_access6 = require("@keystone-6/core/access");
    import_fields7 = require("@keystone-6/core/fields");
    user_default = {
      // WARNING
      //   for this starter project, anyone can create, query, update and delete anything
      //   if you want to prevent random people on the internet from accessing your data,
      //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
      access: import_access6.allowAll,
      // this is the fields for our User list
      fields: {
        authId: (0, import_fields7.text)({ isIndexed: "unique" }),
        // by adding isRequired, we enforce that every User should have a name
        //   if no name is provided, an error will be displayed
        name: (0, import_fields7.text)({ validation: { isRequired: true } }),
        email: (0, import_fields7.text)({
          validation: { isRequired: true },
          // by adding isIndexed: 'unique', we're saying that no user can have the same
          // email as another user - this may or may not be a good idea for your project
          isIndexed: "unique"
        }),
        // we can use this field to see what Posts this User has authored
        //   more on that in the Post list below
        // posts: relationship({ ref: "Post.author", many: true }),
        createdAt: (0, import_fields7.timestamp)({
          // this sets the timestamp to Date.now() when the user is first created
          defaultValue: { kind: "now" }
        })
      }
    };
  }
});

// schema.ts
var import_core4, import_core5, lists, extendGraphqlSchema;
var init_schema = __esm({
  "schema.ts"() {
    "use strict";
    import_core4 = require("@keystone-6/core");
    import_core5 = require("@keystone-6/core");
    init_case();
    init_communication();
    init_contact();
    init_engagement();
    init_file();
    init_user();
    lists = {
      User: (0, import_core4.list)(user_default),
      // Post: list({
      //   // WARNING
      //   //   for this starter project, anyone can create, query, update and delete anything
      //   //   if you want to prevent random people on the internet from accessing your data,
      //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
      //   access: allowAll,
      //   // this is the fields for our Post list
      //   fields: {
      //     title: text({ validation: { isRequired: true } }),
      //     // the document field can be used for making rich editable content
      //     //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      //     content: document({
      //       formatting: true,
      //       layouts: [
      //         [1, 1],
      //         [1, 1, 1],
      //         [2, 1],
      //         [1, 2],
      //         [1, 2, 1],
      //       ],
      //       links: true,
      //       dividers: true,
      //     }),
      //     // with this field, you can set a User as the author for a Post
      //     author: relationship({
      //       // we could have used 'User', but then the relationship would only be 1-way
      //       ref: "User.posts",
      //       // this is some customisations for changing how this will look in the AdminUI
      //       ui: {
      //         displayMode: "cards",
      //         cardFields: ["name", "email"],
      //         inlineEdit: { fields: ["name", "email"] },
      //         linkToItem: true,
      //         inlineConnect: true,
      //       },
      //       // a Post can only have one author
      //       //   this is the default, but we show it here for verbosity
      //       many: false,
      //     }),
      //     // with this field, you can add some Tags to Posts
      //     tags: relationship({
      //       // we could have used 'Tag', but then the relationship would only be 1-way
      //       ref: "Tag.posts",
      //       // a Post can have many Tags, not just one
      //       many: true,
      //       // this is some customisations for changing how this will look in the AdminUI
      //       ui: {
      //         displayMode: "cards",
      //         cardFields: ["name"],
      //         inlineEdit: { fields: ["name"] },
      //         linkToItem: true,
      //         inlineConnect: true,
      //         inlineCreate: { fields: ["name"] },
      //       },
      //     }),
      //   },
      // }),
      // this last list is our Tag list, it only has a name field for now
      // Tag: list({
      //   // WARNING
      //   //   for this starter project, anyone can create, query, update and delete anything
      //   //   if you want to prevent random people on the internet from accessing your data,
      //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
      //   access: allowAll,
      //   // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
      //   ui: {
      //     isHidden: true,
      //   },
      //   // this is the fields for our Tag list
      //   fields: {
      //     name: text(),
      //     // this can be helpful to find out all the Posts associated with a Tag
      //     posts: relationship({ ref: "Post.tags", many: true }),
      //   },
      // }),
      File: (0, import_core4.list)(file_default),
      Contact: (0, import_core4.list)(contact_default),
      Communication: (0, import_core4.list)(communication_default),
      Case: (0, import_core4.list)(case_default),
      Engagement: (0, import_core4.list)(engagement_default)
    };
    extendGraphqlSchema = import_core5.graphql.extend((base) => {
      const Statistics = import_core5.graphql.object()({
        name: "Statistics",
        fields: {
          draft: import_core5.graphql.field({
            type: import_core5.graphql.Int,
            resolve({ authorId }, args, context) {
              return context.query.User.count({
                where: {
                  // status: { equals: "draft" },
                }
              });
            }
          }),
          published: import_core5.graphql.field({
            type: import_core5.graphql.Int,
            resolve({ authorId }, args, context) {
              return context.query.User.count({
                where: {
                  // status: { equals: "published" },
                }
              });
            }
          }),
          latest: import_core5.graphql.field({
            type: base.object("User"),
            async resolve({ authorId }, args, context) {
              const [post] = await context.db.User.findMany({
                take: 1,
                orderBy: { publishDate: "desc" }
              });
              return post;
            }
          })
        }
      });
      return {
        query: {
          groupedPosts: import_core5.graphql.field({
            type: Statistics,
            // args: { id: graphql.arg({ type: graphql.nonNull(graphql.ID) }) },
            resolve(source, {}, context) {
              return { authorId: "2" };
            }
          })
        }
      };
    });
  }
});

// session.ts
async function getKeystoneContext() {
  if (_keystoneContext)
    return _keystoneContext;
  _keystoneContext = (0, import_context.getContext)(
    (await Promise.resolve().then(() => (init_keystone(), keystone_exports))).default,
    // We use the prisma client from the .myprisma folder in order to support multiple Prisma Clients in our examples
    // your project will only have one Prisma Client, so you can use the following instead:
    // await import('@primsa/client')
    await import("@prisma/client")
  );
  if (process.env.NODE_ENV !== "production") {
    globalThis._keystoneContext = _keystoneContext;
  }
  return _keystoneContext;
}
var import_crypto, import_context, import_next, import_keycloak, sessionSecret, _keystoneContext, nextAuthOptions, nextAuthSessionStrategy;
var init_session = __esm({
  "session.ts"() {
    "use strict";
    import_crypto = require("crypto");
    import_context = require("@keystone-6/core/context");
    import_next = require("next-auth/next");
    import_keycloak = __toESM(require("next-auth/providers/keycloak"));
    sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret && process.env.NODE_ENV !== "production") {
      sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
    }
    _keystoneContext = globalThis._keystoneContext;
    nextAuthOptions = {
      secret: sessionSecret,
      callbacks: {
        async signIn({ user }) {
          const sudoContext = (await getKeystoneContext()).sudo();
          const author = await sudoContext.query.User.findOne({
            where: { authId: user.id }
          });
          if (!author) {
            await sudoContext.query.User.createOne({
              data: {
                authId: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
          return true;
        },
        async session({
          session,
          token
        }) {
          return {
            ...session,
            keystone: {
              authId: token.sub
            }
          };
        }
      },
      providers: [
        // allow anyone with a GitHub account to sign up as an author
        (0, import_keycloak.default)({
          clientId: process.env.KEYCLOAK_ID,
          clientSecret: process.env.KEYCLOAK_SECRET,
          issuer: process.env.KEYCLOAK_ISSUER
        })
      ]
    };
    nextAuthSessionStrategy = {
      async get({ context }) {
        const { req, res } = context;
        const { headers } = req ?? {};
        if (!headers?.cookie || !res)
          return;
        const cookies = {};
        for (const part of headers.cookie.split(";")) {
          const [key, value] = part.trim().split("=");
          cookies[key] = decodeURIComponent(value);
        }
        const nextAuthSession = await (0, import_next.getServerSession)(
          { headers, cookies },
          res,
          nextAuthOptions
        );
        if (!nextAuthSession)
          return;
        const { authId } = nextAuthSession.keystone;
        if (!authId)
          return;
        const author = await context.sudo().db.User.findOne({
          where: { authId }
        });
        if (!author)
          return;
        return { id: author.id };
      },
      // we don't need these as next-auth handle start and end for us
      async start() {
      },
      async end() {
      }
    };
  }
});

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core6, keystone_default;
var init_keystone = __esm({
  "keystone.ts"() {
    import_core6 = require("@keystone-6/core");
    init_schema();
    init_session();
    keystone_default = (0, import_core6.config)({
      db: {
        provider: "postgresql",
        url: process.env.DATABASE_URL || ""
      },
      ui: {
        // the following api routes are required for nextauth.js
        publicPages: [
          "/api/auth/csrf",
          "/api/auth/signin",
          "/api/auth/callback",
          "/api/auth/session",
          "/api/auth/providers",
          "/api/auth/signout",
          "/api/auth/error",
          // each provider will need a separate callback and signin page listed here
          "/api/auth/signin/keycloak",
          "/api/auth/callback/keycloak"
        ],
        // adding page middleware ensures that users are redirected to the signin page if they are not signed in.
        pageMiddleware: async ({ wasAccessAllowed }) => {
          if (wasAccessAllowed)
            return;
          return {
            kind: "redirect",
            to: "/api/auth/signin"
          };
        }
      },
      lists,
      session: nextAuthSessionStrategy,
      extendGraphqlSchema,
      storage: {
        s3_storage: {
          kind: "s3",
          type: "file",
          bucketName: process.env.S3_BUCKET || "",
          endpoint: process.env.S3_ENDPOINT || "",
          region: process.env.S3_REGION || "",
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
          proxied: { baseUrl: "/files-proxy" },
          signed: { expiry: 5e3 },
          forcePathStyle: true
        }
      },
      server: {
        extendExpressApp: (app, commonContext) => {
          app.get("/api/contact", async (req, res) => {
            const context = await commonContext.withRequest(req, res);
            const contacts = await context.prisma.contact.groupBy({
              by: ["category"],
              _max: { email: true },
              _count: { email: true, id: true }
            });
            res.json(contacts);
          });
        }
      }
    });
  }
});
init_keystone();
//# sourceMappingURL=config.js.map
