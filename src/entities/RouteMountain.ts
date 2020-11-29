import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Route } from "./Route";
import { Mountain } from "./Mountain";

@Entity()
export class RouteMountain extends BaseEntity {
  @PrimaryColumn()
  routeId: number;

  @PrimaryColumn()
  mountainId: number;

  @ManyToOne(() => Route, (route) => route.mountainConnection, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "routeId" })
  route: Promise<Route>;

  @ManyToOne(() => Mountain, (mountain) => mountain.routeConnection, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "mountainId" })
  mountain: Promise<Mountain>;
}
