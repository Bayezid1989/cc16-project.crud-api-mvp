// Not using this file

import { User } from "./entity/User";

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args;

      return await User.findOne({ where: { id: id } });
    },
  },
  Mutation: {
    addUser: async (_: any, args: any) => {
      const { firstName, lastName } = args;
      try {
        const user = User.create({
          firstName,
          lastName,
          //   visited_mountains,
        });

        await user.save();

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
