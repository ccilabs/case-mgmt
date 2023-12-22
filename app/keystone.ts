// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from "@keystone-6/core";

// to keep this file tidy, we define our schema in a different file
import { lists, extendGraphqlSchema } from "./schema";

import { type Session, nextAuthSessionStrategy } from "./session";
import type { TypeInfo } from ".keystone/types";

export default config<TypeInfo<Session>>({
  db: {
    provider: "postgresql",
    url: process.env.DATABASE_URL || "",
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
      "/api/auth/callback/keycloak",
    ],

    // adding page middleware ensures that users are redirected to the signin page if they are not signed in.
    pageMiddleware: async ({ wasAccessAllowed }) => {
      if (wasAccessAllowed) return;
      return {
        kind: "redirect",
        to: "/api/auth/signin",
      };
    },
  },
  lists,
  session: nextAuthSessionStrategy,
  extendGraphqlSchema,
  storage: {
    s3_storage: {
      kind: "s3",
      type: "file",
      bucketName: "default",
      region: "ca-west-1",
      accessKeyId: "dJcmQCXNine11C0kYl9n",
      secretAccessKey: "ulHeClzJRK6M5JP3DQisWOwQzbkcA4ulk3Tqr6CH",
      proxied: { baseUrl: "/images-proxy" },
      signed: { expiry: 5000 },
      endpoint: "http://192.168.1.72:9000/",
      forcePathStyle: true,
    },
  },
  server: {
    extendExpressApp: (app, commonContext) => {
      app.get("/api/contact", async (req, res) => {
        const context = await commonContext.withRequest(req, res);
        const contacts = await context.prisma.contact.groupBy({
          by: ["category"],
          _max: { email: true },
          _count: { email: true, id: true },
        });
        res.json(contacts);
      });
    },
  },
});
