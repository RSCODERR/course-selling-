import { Router } from "express";
const courseRouter = Router();

courseRouter.post("/purchase", (req, res) => {
    res.json({
        msg: "purchased"
    });
});

courseRouter.get("/preview", (req, res) => {
    res.json({
        msg: "courses"
    });
});

export { courseRouter };