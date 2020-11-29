import { Field, InputType } from "type-graphql";

@InputType()
export class AreaInput {
  @Field()
  name: string;

  @Field()
  country: string;
}

@InputType()
export class AreaUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  country?: string;
}
