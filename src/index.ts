import { ExeptionFilter } from "./errors/exeption.filter.js";
import { App } from "./app.js";
import { UsersController } from "./controllers/users/users.controller.js";
import { LogService } from "./log/log.service.js";

async function start() {
  let logger = new LogService();
  //создаем новый App и передаем контроллеры
  const app = new App(
    logger,
    new UsersController(logger),
    new ExeptionFilter(logger)
  );
  await app.init();
}
//запуск приложения
start();
