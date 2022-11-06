import express, { Express } from "express";
import { userRouter } from "./routes/userRouter";
import { Server } from "http";
import { LogService } from "./log/log.service";

export class App {
  private _app: Express;
  private _port: number;
  private _server: Server;
  private _logger: LogService;

  constructor(logger: LogService, port?: number) {
    this._app = express();
    this._port = port ? port : 8000;
    this._logger = logger;
  }

  private useRoutes() {
    this._app.use("/users", userRouter);
  }

  async init() {
    this.useRoutes();
    this._server = this._app.listen(this._port);
    this._logger.info(`Сервер запущен на http:localhost:${this._port}`);
  }
}
