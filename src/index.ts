import { App } from "./app";
import { LogService } from "./log/log.service";

async function start() {
  const app = new App(new LogService());
  await app.init();
}

start();
