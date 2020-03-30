import { RewriteFrames } from "@sentry/integrations";
import * as Sentry from "@sentry/node";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import depthLimit from "graphql-depth-limit";

import CollectionAPI from "./datasources/collection";
import EventAPI from "./datasources/event";
import KeywordAPI from "./datasources/keyword";
import LandingPageAPI from "./datasources/landingPage";
import OrganizationAPI from "./datasources/organization";
import PlaceAPI from "./datasources/place";
import schema from "./schema";

const OK = "OK";
const SERVER_IS_NOT_READY = "SERVER_IS_NOT_READY";

dotenv.config();

Sentry.init({
  dsn: process.env.GRAPHQL_PROXY_SENTRY_DSN,
  environment: process.env.GRAPHQL_PROXY_SENTRY_ENVIRONMENT,
  integrations: [
    // used for rewriting SourceMaps from js to ts
    // check that sourcemaps are enabled in tsconfig.js
    // read the docs https://docs.sentry.io/platforms/node/typescript/
    new RewriteFrames({
      root: process.cwd()
    })
  ]
});

const apolloServerSentryPlugin = {
  // For plugin definition see the docs: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
  requestDidStart() {
    return {
      didEncounterErrors(rc) {
        Sentry.withScope(scope => {
          scope.setTags({
            graphql: rc.operation.operation || "parse_err",
            graphqlName: rc.operationName || rc.request.operationName
          });

          rc.errors.forEach(error => {
            if (error.path || error.name !== "GraphQLError") {
              scope.setExtras({
                path: error.path
              });
              Sentry.captureException(error);
            } else {
              scope.setExtras({});
              Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`);
            }
          });
        });
      }
    };
  }
} as ApolloServerPlugin;

const dataSources = () => ({
  collectionAPI: new CollectionAPI(),
  eventAPI: new EventAPI(),
  keywordAPI: new KeywordAPI(),
  landingPageAPI: new LandingPageAPI(),
  organizationAPI: new OrganizationAPI(),
  placeAPI: new PlaceAPI()
});

(async () => {
  const server = new ApolloServer({
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      return { token };
    },
    dataSources,
    debug:
      process.env.GRAPHQL_PROXY_DEBUG === "debug" ||
      process.env.GRAPHQL_PROXY_ENV !== "production",
    engine: {
      apiKey: process.env.GRAPHQL_PROXY_ENGINE_API_KEY
    },
    formatError: err => {
      return err;
    },
    plugins: [apolloServerSentryPlugin],
    schema,

    validationRules: [depthLimit(10)]
  });

  let serverIsReady = false;

  const signalReady = () => {
    serverIsReady = true;
  };

  const checkIsServerReady = response => {
    if (serverIsReady) {
      response.send(OK);
    } else {
      response.status(500).send(SERVER_IS_NOT_READY);
    }
  };

  const app = express();

  app.use(cors());

  app.get("/healthz", (request, response) => {
    checkIsServerReady(response);
  });

  app.get("/readiness", (request, response) => {
    checkIsServerReady(response);
  });

  server.applyMiddleware({ app, path: "/proxy/graphql" });

  const port = process.env.GRAPHQL_PROXY_PORT || 4000;

  app.listen({ port }, () => {
    signalReady();

    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
})();
