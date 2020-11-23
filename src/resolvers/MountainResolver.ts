import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field,
} from "type-graphql";
import { MoreThan } from "typeorm";
import { Mountain } from "../entity/Mountain";
import { Area } from "../entity/Area";

@InputType()
class MountainInput {
  @Field()
  name: string;

  @Field(() => Int)
  elevation: number;

  @Field()
  coordinates: string;

  @Field(() => Int, { nullable: true })
  areaId: number;
}

@InputType()
class MountainUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  elevation?: number;

  @Field({ nullable: true })
  coordinates?: string;

  @Field({ nullable: true })
  area: string;
}

@Resolver()
export class MountainResolver {
  @Mutation(() => Mountain)
  async createMountain(
    @Arg("input", () => MountainInput) input: MountainInput
  ) {
    const mountain = await Mountain.create(input).save();
    return mountain;
  }

  @Mutation(() => Boolean)
  async updateMountain(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MountainUpdateInput) input: MountainUpdateInput
  ) {
    await Mountain.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMountain(@Arg("id", () => Int) id: number) {
    const mountain = await Mountain.findOne({ where: { id: id } });
    if (!mountain) throw new Error("Mountain not found!!");
    // await Mountain.delete({ id });
    await mountain.remove();
    return true;
  }

  @Query(() => [Mountain])
  async mountains() {
    return Mountain.find({
      order: {
        id: "ASC",
      },
    });
    // const mountain = await Mountain.createQueryBuilder("mountains")
    //   .leftJoinAndSelect(Area, "area", "area.id = mountain.areaId")
    //   .getRawMany();
    // return mountain;
  }

  @Query(() => Mountain)
  async mountainByName(@Arg("name") name: string) {
    // return Mountain.findOne({ relations: ["area"], where: { name: name } });
    return Mountain.findOne({ where: { name: name } });
  }

  @Query(() => [Mountain])
  async mountainsByArea(@Arg("area") area: string) {
    return Mountain.find({ where: { area: area } });
  }

  @Query(() => [Mountain])
  async mountainsByElevationMoreThan(@Arg("elevation") elevation: number) {
    return Mountain.find({ where: { elevation: MoreThan(elevation) } });
  }
}
