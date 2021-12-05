import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors"
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import eventRoutes from "./routes/event.routes"


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet())
app.use(cors())
app.use("/", userRoutes)
app.use("/", authRoutes)
app.use("/", eventRoutes)

export default app;