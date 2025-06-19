import "dotenv/config"
import express from "express";
const app = express();
import { userRouter } from "./routes/user.js";
import { courseRouter } from "./routes/course.js";
import { adminRouter } from "./routes/admin.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter);

app.listen(process.env.port, () => {
    console.log(`listening on port ${process.env.port}`);
});