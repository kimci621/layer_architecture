import { Request, Response, NextFunction } from "express";
import { LogService } from "../log/log.service.js";
import { IExeptionFilter } from "../interface/exeption.interface.js";
//error middleware
export class ExeptionFilter implements IExeptionFilter {
  logger: LogService;
  constructor(logger: LogService) {
    this.logger = logger;
  }
  catch(err: Error, req: Request, res: Response, next: NextFunction) {
    this.logger.error(`${err.message}`);
    res.status(500).send({ err: err.message });
  }
}
