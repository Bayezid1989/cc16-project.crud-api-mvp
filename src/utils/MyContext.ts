import { Request, Response } from "express";
import { createMountainsLoader } from "./mountainsLoader";
import { createRoutesLoader } from "./routesLoader";

export interface MyContext {
  req: Request;
  res: Response;
  routesLoader: ReturnType<typeof createRoutesLoader>;
  mountainsLoader: ReturnType<typeof createMountainsLoader>;
}
