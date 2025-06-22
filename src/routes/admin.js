import { Router } from "express";
import { signupAdmin, loginAdmin } from "../controllers/admin.controller.js";
import { createCourse, editCourse, bulkViewer } from "../controllers/course.controller.js"
const adminRouter = Router();
import { adminMiddleware } from "../middlewares/admin.js";

adminRouter.post("/signup", signupAdmin);

adminRouter.post("/login", loginAdmin);

adminRouter.post("/course", adminMiddleware, createCourse);

adminRouter.put("/course", adminMiddleware, editCourse);

adminRouter.get("/course/bulk", adminMiddleware, bulkViewer);

export { adminRouter };