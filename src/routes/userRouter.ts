import { Router } from "express";

const userRouter = Router();

userRouter.use((req, res, next) => {
  console.log("USERS обработчик, запрос был сделан в ", Date.now());
  next();
});

userRouter.get("/login", (req, res) => {
  res.send("login");
});

userRouter.get("/register", (req, res) => {
  res.send("register");
});

export { userRouter };
