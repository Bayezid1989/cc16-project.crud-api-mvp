import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  RelationId,
  Column,
} from "typeorm";
import { Area } from "./Area";

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

  @Field()
  @Column()
  coordinates: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  area: string;

  //   @Field(() => Area, { nullable: true })
  //   @ManyToOne(() => Area, { nullable: true })
  //   area: Area;
  //   @RelationId((mountain: Mountain) => mountain.area)
  //   areaId: number;
}
