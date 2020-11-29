import DataLoader from "dataloader";
import { Route } from "../entities/Route";
import { RouteMountain } from "../entities/RouteMountain";
import { In } from "typeorm";

const batchRoutes = async (mountainIds: number[]) => {
  const routeMountains = await RouteMountain.find({
    join: {
      alias: "routeMountain",
      innerJoinAndSelect: {
        route: "routeMountain.route",
      },
    },
    where: {
      mountainId: In(mountainIds),
    },
  });

  const mountainIdToRoutes: { [key: number]: Route[] } = {};

  /*
  {
    routeId: 1,
    mountainId: 1,
    __route__: {id: 1, name: "route1"}
  }
  */

  routeMountains.forEach((rm) => {
    if (rm.mountainId in mountainIdToRoutes) {
      mountainIdToRoutes[rm.mountainId].push((rm as any).__route__);
    } else {
      mountainIdToRoutes[rm.mountainId] = [(rm as any).__route__];
    }
  });
  return mountainIds.map((mountainId) => mountainIdToRoutes[mountainId]);
};

export const createRoutesLoader = () => new DataLoader(batchRoutes);
