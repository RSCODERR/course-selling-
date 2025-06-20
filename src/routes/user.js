import { Router } from "express";
const userRouter = Router();
import { signupUser, loginUser } from "../controllers/user.controller.js";

userRouter.post("/signup", signupUser);

userRouter.post("/login", loginUser);

export { userRouter };