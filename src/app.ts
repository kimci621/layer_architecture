//контроллеры
import { UsersController } from "./controllers/users/users.controller.js";
//зависимости
import express, { Express } from "express";
import { Server } from "http";
//обработчики
import { ExeptionFilter } from "./errors/exeption.filter.js";
//интерфейсы
import { ILogger } from "./interface/logger.interdace.js";

export class App {
  //свойства
  app: Express;
  port: number;
  server: Server;
  //Вместо того чтобы явно указывать класс как тип, создаем интерфейс и передаем его, dependency injection
  logger: ILogger;

  UsersController: UsersController;
  ExeptionFilter: ExeptionFilter;

  //App принимает при создании логгер, контреллеры и возможно кастомный порт
  constructor(
    logger: ILogger,
    UsersController: UsersController,
    ExeptionFilter: ExeptionFilter,
    port?: number
  ) {
    //app теперь express
    this.app = express();
    this.port = port ? port : 8000;
    this.logger = logger;
    this.UsersController = UsersController;
    this.ExeptionFilter = ExeptionFilter;
  }
  //useRoutes будет слушать url /users, middleware принимает url и функцию с req, res, next
  //т.е. теперь express будет слушать и отвечать на /users
  useRoutes() {
    this.app.use("/users", this.UsersController.router);
  }

  useExeptionFilter() {
    this.app.use(this.ExeptionFilter.catch.bind(this.ExeptionFilter));
  }

  async init() {
    //роуты
    this.useRoutes();
    //exeption filter, обработчики
    this.useExeptionFilter();
    //запуск сервера
    this.server = this.app.listen(this.port);
    //логируем запуск сервера
    this.logger.info(`Сервер запущен на http://localhost:${this.port}`);
  }
}
