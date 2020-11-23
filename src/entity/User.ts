// Not using this file.

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Mountain } from "./Mountain";
import { v4 as uuidv4 } from "uuid";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  //   @Field(() => [Mountain], { nullable: true })
  //   @Column()
  //   @ManyToMany(() => Mountain, (mountain) => mountain.id)
  //   @JoinTable()
  //   visited_mountains?: Mountain[];

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
