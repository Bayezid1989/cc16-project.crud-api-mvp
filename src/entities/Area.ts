import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;

  @Field(() => [Mountain], { nullable: true })
  @OneToMany(() => Mountain, (mountain) => mountain.area, {
    nullable: true,
  })
  mountains: Mountain[];
}
