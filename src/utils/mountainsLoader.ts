import DataLoader from "dataloader";
import { RouteMountain } from "../entities/RouteMountain";
import { In } from "typeorm";
import { Mountain } from "../entities/Mountain";

const batchMountains = async (routeIds: number[]) => {
  const routeMountains = await RouteMountain.find({
    join: {
      alias: "routeMountain",
      innerJoinAndSelect: {
        mountain: "routeMountain.mountain",
      },
    },
    where: {
      routeId: In(routeIds),
    },
  });

  const routeIdToMountains: { [key: number]: Mountain[] } = {};

  /*
  {
    mountainId: 1,
    routeId: 1,
    __mountain__: {id: 1, name: "mountain1"}
  }
  */

  routeMountains.forEach((rm) => {
    if (rm.routeId in routeIdToMountains) {
      routeIdToMountains[rm.routeId].push((rm as any).__mountain__);
    } else {
      routeIdToMountains[rm.routeId] = [(rm as any).__mountain__];
    }
  });
  return routeIds.map((routeId) => routeIdToMountains[routeId]);
};

export const createMountainsLoader = () => new DataLoader(batchMountains);
