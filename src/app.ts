import { UsersController } from "./controllers/users/users.controller.js";
import express, { Express } from "express";
import { userRouter } from "./routes/userRouter.js";
import { Server } from "http";
import { LogService } from "./log/log.service.js";

export class App {
  //свойства
  app: Express;
  port: number;
  server: Server;
  logger: LogService;
  UsersController: UsersController;
  //App принимает при создании логгер, контреллеры и возможно кастомный порт 
  constructor(
    logger: LogService,
    UsersController: UsersController,
    port?: number
  ) {
    //app теперь express 
    this.app = express();
    this.port = port ? port : 8000;
    this.logger = logger;
    this.UsersController = UsersController;
  }
  //useRoutes будет слушать url /users, middleware принимает url и функцию с req, res, next
  //т.е. теперь express будет слушать и отвечать на /users 
  useRoutes() {
    this.app.use("/users", this.UsersController.router);
  }

  async init() {
    //запуск отслеживания "/users"
    this.useRoutes();
    //запуск сервера на порту this._port
    this.server = this.app.listen(this.port);
    //логируем запуск
    this.logger.info(`Сервер запущен на http:localhost:${this.port}`);
  }
}
