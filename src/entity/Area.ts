import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  RelationId,
} from "typeorm";
import { Mountain } from "./Mountain";

@ObjectType()
@Entity({ name: "area" })
export class Area extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  // @Field()
  // @Column()
  // country: string;

  // @Field(() => Mountain, { nullable: true })
  // @OneToMany(() => Mountain, (mountain) => mountain.area, {
  //   nullable: true,
  //   cascade: true,
  // })
  // mountains: Mountain[];
}
