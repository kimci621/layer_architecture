import { Request, Response, NextFunction } from "express";
//интерфейс для создания роутов для use
export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: "get" | "post" | "delete" | "patch" | "put";
}
