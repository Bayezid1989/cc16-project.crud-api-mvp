import { RouteMountain } from "../entities/RouteMountain";
import { Arg, Int, Mutation, Resolver } from "type-graphql";

@Resolver()
export class RouteMountainResolver {
  @Mutation(() => Boolean)
  async addRouteMountain(
    @Arg("routeId", () => Int) routeId: number,
    @Arg("mountainId", () => Int) mountainId: number
  ) {
    const routeMountain = await RouteMountain.create({
      routeId,
      mountainId,
    }).save();
    return true;
  }
}
