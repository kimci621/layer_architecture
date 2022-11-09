import { LogService } from "../../log/log.service";
import { Router, Response } from "express";
import { IControllerRoute } from "../../interface/route.interface";
export { Router } from "express";
//абстрактный класс который будет использоваться для всех контроллеров
export abstract class BaseController {
  //Наследует тип Роутера из express
  protected readonly _router: Router;
  //конструктор принимает логгер
  constructor(protected logger: LogService) {
    //роутер из express
    this._router = Router();
  }
  //getters
  get router() {
    return this._router;
  }
  //http methods
  //Просто вернет в ответ статус запроса 201
  created(res: Response) {
    return res.sendStatus(201);
  }
  //Шаблон ответов вернет: запрос, тип запроса, код запроса и сообщение
  send<T>(res: Response, code: number, type: string, message: T) {
    res.type(type);
    return res.status(code).json(message);
  }
  //успешный ответ на основе метода send
  ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, "application/json", message);
  }
  //плохой ответ на основе метода send
  error404<T>(res: Response, message: T) {
    return this.send<T>(res, 404, "application/json", message);
  }
  //ошибочный ответ на основе метода send
  error500<T>(res: Response, message: T) {
    return this.send<T>(res, 500, "application/json", message);
  }
  //methods
  /*   
  interface IControllerRoute {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
  }
   Как будет создоваться новый запрос: bindRoutes([ { path: "/login", method: "post", func: this.login },])
   
   login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "login");
   }
  */
  protected bindRoutes(routes: IControllerRoute[]) {
    for (const item of routes) {
      this.logger.info(`[${item.method}] ${item.path}`);
      //привязали контекст к вызываемогу классу
      const handler = item.func.bind(this);
      //Router из Express
      this._router[item.method](item.path, handler);
    }
  }
}
