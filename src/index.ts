import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createRoutesLoader } from "./utils/routesLoader";
import { RouteMountainResolver } from "./resolvers/RouteMountainResolver";
import { MountainResolver } from "./resolvers/MountainResolver";
import { RouteResolver } from "./resolvers/RouteResolver";
import { AreaResolver } from "./resolvers/AreaResolver";
import { createMountainsLoader } from "./utils/mountainsLoader";

(async () => {
  const app = express();

  await createConnection().catch((error) => console.log(error));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        RouteMountainResolver,
        MountainResolver,
        RouteResolver,
        AreaResolver,
      ],
    }),
    context: ({ req, res }: any) => ({
      req,
      res,
      routesLoader: createRoutesLoader(),
      mountainsLoader: createMountainsLoader(),
    }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log("express server started.");
  });
})();
