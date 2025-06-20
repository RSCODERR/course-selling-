import { Router } from "express";
import { signupAdmin, loginAdmin } from "../controllers/admin.controller.js";
const adminRouter = Router();

adminRouter.post("/signup", signupAdmin);

adminRouter.post("/login", loginAdmin);

adminRouter.post("/course", (req, res) => {
    res.json({
        msg: "admin"
    });
});

adminRouter.put("/course", (req, res) => {
    res.json({
        msg: "admin"
    });
});

adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        msg: "admin"
    });
});

export { adminRouter };