import { Request, Response, NextFunction } from "express";
import { LogService } from "../log/log.service.js";
import { IExeptionFilter } from "../interface/exeption.interface.js";
import { HttpError } from "./http-error.js";
//error middleware
export class ExeptionFilter implements IExeptionFilter {
  logger: LogService;
  constructor(logger: LogService) {
    this.logger = logger;
  }
  catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HttpError) {
      this.logger.error(
        `[${err.context ? err.context : ""}], Ошибка: ${err.statusCode} - ${
          err.message
        }`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
