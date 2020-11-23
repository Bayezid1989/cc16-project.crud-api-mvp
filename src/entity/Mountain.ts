import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  RelationId,
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  coordinates: string;

  @Field(() => Area, { nullable: true })
  @ManyToOne(() => Area, (area) => area.id, { nullable: true })
  area: Area;
  @RelationId((mountain: Mountain) => mountain.area)
  areaId: number;
}
