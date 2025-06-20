import "dotenv/config"
import express from "express";
const app = express();
import { userRouter } from "./routes/user.js";
import { courseRouter } from "./routes/course.js";
import { adminRouter } from "./routes/admin.js";
import { connectDB } from "./database/db.js";

import "./models/user.js";
import "./models/admin.js";
import "./models/course.js";
import "./models/purchase.js";

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter);


connectDB()
    .then(() => {
        app.listen(process.env.port, () => {
            console.log(`listening on port ${process.env.port}`);
        });
    })
    .catch((err) => {
        console.log("DB connection failed!!", err);
    })
