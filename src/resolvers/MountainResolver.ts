import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field,
} from "type-graphql";
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

  @Field(() => Int, { nullable: true })
  areaId: number;
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
    await Mountain.delete({ id });
    return true;
  }

  @Query(() => [Mountain])
  async mountains() {
    return Mountain.find({ relations: ["area"] });
    // const mountain = await Mountain.createQueryBuilder("mountains")
    //   .leftJoinAndSelect(Area, "area", "area.id = mountain.areaId")
    //   .getRawMany();
    // return mountain;
  }
}
