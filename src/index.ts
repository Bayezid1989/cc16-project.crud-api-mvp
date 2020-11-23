import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
// import { User } from "./entity/User"; //Not using this.
// import { Mountain } from "./entity/Mountain";
// import { graphql } from "graphql";
import { MountainResolver } from "./resolvers/MountainResolver";
// import { typeDefs } from "./schema"; // Not using this.
// import { resolvers } from "./resolvers"; // Not using this.
import { AreaResolver } from "./resolvers/AreaResolver";

(async () => {
  const app = express();

  await createConnection().catch((error) => console.log(error));

  //Default code
  // .then(async connection => {
  //     console.log("Inserting a new user into the database...");
  //     const user = new User();
  //     user.firstName = "Timber";
  //     user.lastName = "Saw";
  //     user.age = 25;
  //     await connection.manager.save(user);
  //     console.log("Saved a new user with id: " + user.id);
  //     console.log("Loading users from the database...");
  //     const users = await connection.manager.find(User);
  //     console.log("Loaded users: ", users);
  //     console.log("Here you can setup and run express/koa/any other framework.");
  // }).catch(error => console.log(error));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MountainResolver, AreaResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  //   const apolloServer = new ApolloServer({ typeDefs, resolvers });
  // apolloServer.applyMiddleware({ app });

  app.use(express.static("../public"));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log("express server started.");
  });
})();

// const mountain = new Mountain();
//   mountain.name = "Timber";
//   mountain.elevation = 1111;
//   mountain.coordinates = "dummy";
//   mountain.areaId = 1;
//   await Mountain.save(mountain);
