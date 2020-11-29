import { Field, Float, InputType, Int } from "type-graphql";

@InputType()
export class MountainInput {
  @Field()
  name: string;

  @Field(() => Int)
  elevation: number;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => Int, { nullable: true })
  areaId?: number;
}

@InputType()
export class MountainUpdateInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  elevation?: number;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Int, { nullable: true })
  areaId?: number;
}
