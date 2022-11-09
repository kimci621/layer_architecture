import { Logger } from "tslog";
//логгер для терминала
export class LogService {
  _logger: Logger;
  //параметры логгера
  constructor() {
    this._logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: "hidden",
      displayFunctionName: false,
    });
  }
  //обычный текст
  info(...args: unknown[]) {
    this._logger.info(...args);
  }
  //текст ошибки
  error(...args: unknown[]) {
    this._logger.error(...args);
  }
  //текст препреждения
  warn(...args: unknown[]) {
    this._logger.warn(...args);
  }
}
