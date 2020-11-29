import { Route } from "../entities/Route";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { RouteInput, RouteUpdateInput } from "./types/route-input";
import { MoreThan } from "typeorm";

@Resolver()
export class RouteResolver {
  @Mutation(() => Boolean)
  async createRoute(@Arg("input") input: RouteInput) {
    const route = await Route.create(input).save();
    return true;
  }

  @Mutation(() => Boolean)
  async updateRoute(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => RouteUpdateInput) input: RouteUpdateInput
  ) {
    await Route.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteRoute(@Arg("id", () => Int) id: number) {
    await Route.delete({ id: id });
    return true;
  }

  @Query(() => [Route])
  async routes() {
    return Route.find();
  }

  @Query(() => Route)
  async routeByName(@Arg("name") name: string) {
    return Route.findOne({ where: { name: name } });
  }

  @Query(() => [Route])
  async routesHigherLevelThan(@Arg("level") level: number) {
    return Route.find({ where: { level: MoreThan(level) } });
  }

  @Query(() => [Route])
  async routesLongerThan(@Arg("estimated_hours") estimated_hours: number) {
    return Route.find({
      where: { estimated_hours: MoreThan(estimated_hours) },
    });
  }
}
