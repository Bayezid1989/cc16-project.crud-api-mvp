import { Ctx, Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { MyContext } from "../utils/MyContext";
import { Mountain } from "./Mountain";
import { RouteMountain } from "./RouteMountain";

@ObjectType()
@Entity({ name: "route" })
export class Route extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  level: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  estimated_hours: number;

  @OneToMany(() => RouteMountain, (rm) => rm.route)
  mountainConnection: Promise<RouteMountain[]>;

  @Field(() => [Mountain], { nullable: true })
  async mountains(@Ctx() { mountainsLoader }: MyContext): Promise<Mountain[]> {
    return mountainsLoader.load(this.id);
  }
}
