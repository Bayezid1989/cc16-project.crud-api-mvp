import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field,
} from "type-graphql";
import { Area } from "../entity/Area";

@InputType()
class AreaInput {
  @Field()
  name: string;
}

@InputType()
class AreaUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;
}

@Resolver()
export class AreaResolver {
  @Mutation(() => Area)
  async createArea(@Arg("input", () => AreaInput) input: AreaInput) {
    const mountain = await Area.create(input).save();
    return mountain;
  }

  @Mutation(() => Boolean)
  async updateArea(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => AreaUpdateInput) input: AreaUpdateInput
  ) {
    await Area.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteArea(@Arg("id", () => Int) id: number) {
    await Area.delete({ id });
    return true;
  }

  @Query(() => [Area])
  areas() {
    return Area.find();
  }
}
