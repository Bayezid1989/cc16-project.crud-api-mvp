// Not using this file

import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getUser(id: Int!): User
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!): Boolean!
  }
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    # visited_mountains: Int!
  }
`;
