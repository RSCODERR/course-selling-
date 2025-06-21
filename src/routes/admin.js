import { Router } from "express";
import { signupAdmin, loginAdmin } from "../controllers/admin.controller.js";
import { createCourse } from "../controllers/course.controller.js"
const adminRouter = Router();
import { adminMiddleware } from "../middlewares/admin.js";

adminRouter.post("/signup", signupAdmin);

adminRouter.post("/login", loginAdmin);

adminRouter.post("/course", adminMiddleware, createCourse);

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