import { Request, Response, NextFunction } from "express";
//интерфейс для использования error middleware
export interface IExeptionFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
