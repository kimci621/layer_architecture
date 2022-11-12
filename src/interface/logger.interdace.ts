import { Logger } from "tslog";

export interface ILogger {
  _logger: Logger;
  info: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
}
