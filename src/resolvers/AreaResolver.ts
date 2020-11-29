import { Mountain } from "../entities/Mountain";
import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { Area } from "../entities/Area";
import { AreaInput, AreaUpdateInput } from "./types/area-input";

@Resolver()
export class AreaResolver {
  @Mutation(() => Boolean)
  async createArea(
    @Arg("input", () => AreaInput) input: AreaInput,
    @Arg("mountainIds", () => [Int], { nullable: true }) mountainIds: number[]
  ) {
    const area = await Area.create(input).save();
    if (mountainIds) {
      const mountains = await Promise.all(
        mountainIds.map(
          async (inputId) =>
            await Mountain.find({
              where: { id: inputId },
            })
        )
      );
      mountains.flat().forEach((mount) => (mount.areaId = area.id));
      Mountain.save(mountains.flat());
    }
    return true;
  }

  @Mutation(() => Boolean)
  async updateArea(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => AreaUpdateInput)
    input: AreaUpdateInput,
    @Arg("mountainIds", () => [Int], { nullable: true }) mountainIds: number[]
  ) {
    await Area.update({ id }, input);
    if (mountainIds) {
      const mountains = await Promise.all(
        mountainIds.map(
          async (inputId) =>
            await Mountain.find({
              where: { id: inputId },
            })
        )
      );
      mountains.flat().forEach((mount) => (mount.areaId = id));
      Mountain.save(mountains.flat());
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteArea(@Arg("id", () => Int) id: number) {
    await Area.delete({ id });
    return true;
  }

  @Query(() => [Area])
  areas() {
    return Area.find({
      relations: ["mountains"],
      order: {
        id: "ASC",
      },
    });
  }
}
