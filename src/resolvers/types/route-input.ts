import { Field, InputType, Int } from "type-graphql";

@InputType()
export class RouteInput {
  @Field()
  name: string;

  @Field(() => Int)
  level: number;

  @Field(() => Int)
  estimated_hours: number;
}

@InputType()
export class RouteUpdateInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  level?: number;

  @Field(() => Int, { nullable: true })
  estimated_hours?: number;
}
