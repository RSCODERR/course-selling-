import { Router } from "express";
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    res.json({
        msg: "signup router"
    });
});

userRouter.post("/login", async (req, res) => {
    res.json({
        msg: "login route"
    });
});

export { userRouter };