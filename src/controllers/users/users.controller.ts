import { NextFunction, Request, Response } from "express";
import { LogService } from "./../../log/log.service.js";
import { BaseController } from "../base/base.controller.js";

export class UsersController extends BaseController {
  constructor(logger: LogService) {
    super(logger);
    //создание роутов, метод базовом классе
    this.bindRoutes([
      { path: "/login", method: "post", func: this.login },
      { path: "/register", method: "post", func: this.register },
    ]);
  }
  //функции передаваемые в use, ok из базового класса 
  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "login");
  }
  //функции передаваемые в use, ok из базового класса 
  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }
}
