import { HttpError } from "./../../errors/http-error.js";
import { NextFunction, Request, Response } from "express";
import { LogService } from "./../../log/log.service.js";
import { BaseController } from "../base/base.controller.js";

export class UsersController extends BaseController {
  constructor(logger: LogService) {
    super(logger);
    //создание роутов, метод в базовом классе
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
    //next(new HttpError("Пользователь не авторизован!", 401));
    this.ok(res, "register");
  }
}
