import { Mountain } from "../entities/Mountain";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";
import { MountainInput, MountainUpdateInput } from "./types/mountain-input";
import { Area } from "../entities/Area";

@Resolver()
export class MountainResolver {
  @Mutation(() => Boolean)
  async createMountain(@Arg("input") input: MountainInput) {
    const mountain = await Mountain.create(input).save();
    if (input.areaId) {
      const area = await Area.findOne({
        relations: ["mountains"],
        where: { id: input.areaId },
      });
      area.mountains.length > 0
        ? area.mountains.push(mountain)
        : (area.mountains = [mountain]);
      Area.save(area);
    }
    return true;
  }

  @Mutation(() => Boolean)
  async updateMountain(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MountainUpdateInput) input: MountainUpdateInput
  ) {
    await Mountain.update({ id }, input);
    if (input.areaId) {
      const mountain = await Mountain.findOne({ where: { id: id } });
      const area = await Area.findOne({
        relations: ["mountains"],
        where: { id: input.areaId },
      });
      area.mountains.length > 0
        ? area.mountains.push(mountain)
        : (area.mountains = [mountain]);

      Area.save(area);
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMountain(@Arg("id", () => Int) id: number) {
    const mountain = await Mountain.findOne({ where: { id: id } });
    if (!mountain) throw new Error("Mountain not found!!");
    // await RouteMountain.delete({ mountainId }); <-- If no cascade in entity, this is necessary
    await mountain.remove();
    return true;
  }

  @Query(() => [Mountain])
  async mountains() {
    return Mountain.find({
      relations: ["area"],
      order: {
        id: "ASC",
      },
    });
  }

  @Query(() => Mountain)
  async mountainByName(@Arg("name") name: string) {
    return Mountain.findOne({ relations: ["area"], where: { name: name } });
  }

  @Query(() => [Mountain])
  async mountainsHigherThan(@Arg("elevation") elevation: number) {
    return Mountain.find({
      relations: ["area"],
      where: { elevation: MoreThan(elevation) },
    });
  }
}
