import { Ctx, Field, Float, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { MyContext } from "../utils/MyContext";
import { Area } from "./Area";
import { Route } from "./Route";
import { RouteMountain } from "./RouteMountain";

@ObjectType()
@Entity({ name: "mountain" })
export class Mountain extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column("int")
  elevation: number;

  @Field(() => Float)
  @Column("float")
  latitude: number;

  @Field(() => Float)
  @Column("float")
  longitude: number;

  @Field(() => Area, { nullable: true })
  @ManyToOne(() => Area, (area) => area.mountains, {
    nullable: true,
    onDelete: "CASCADE",
  })
  area: Area;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  areaId: number;

  @OneToMany(() => RouteMountain, (rm) => rm.mountain)
  routeConnection: Promise<RouteMountain[]>;

  @Field(() => [Route], { nullable: true })
  async routes(@Ctx() { routesLoader }: MyContext): Promise<Route[]> {
    return routesLoader.load(this.id);
  }
}
