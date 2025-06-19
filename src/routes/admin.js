import { Router, Router } from "express";
const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    res.json({
        msg: "signup router"
    });
});

adminRouter.post("/login", async (req, res) => {
    res.json({
        msg: "login route"
    });
});

adminRouter.post("/course", (req, res) => {
    res.json({
        msg: "admin"
    });
});

adminRouter.put("/courses", (req, res) => {
    res.json({
        msg: "admin"
    });
});

adminRouter.get("/courses/bulk", (req, res) => {
    res.json({
        msg: "admin"
    });
});

export { adminRouter };