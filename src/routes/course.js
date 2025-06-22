import { Router } from "express";
import { userMiddleware } from "../middlewares/user";
import { previewCourse, purchaseCourse, userPurchases } from "../controllers/purchase.controllers";
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, purchaseCourse);

courseRouter.get("/preview", previewCourse);

courseRouter.get("/purchases", userMiddleware, userPurchases);

export { courseRouter };