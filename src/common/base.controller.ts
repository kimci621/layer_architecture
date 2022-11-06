import { LogService } from "./../log/log.service";
import { Router, Response } from "express";
import { IControllerRoute } from "../common/route.interface";
export { Router } from "express";

export abstract class BaseController {
  private readonly _router: Router;
  constructor(private logger: LogService) {
    this._router = Router();
  }
  //getters
  get router() {
    return this._router;
  }
  //http methods
  created(res: Response) {
    return res.sendStatus(201);
  }
  send<T>(res: Response, code: number, type: string, message: T) {
    res.type(type);
    return res.status(code).json(message);
  }
  ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, "application/json", message);
  }
  error404<T>(res: Response, message: T) {
    return this.send<T>(res, 404, "application/json", message);
  }
  error500<T>(res: Response, message: T) {
    return this.send<T>(res, 500, "application/json", message);
  }
  //methods
  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.info(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this._router[route.method](route.path, handler);
    }
  }
}
