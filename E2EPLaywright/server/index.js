import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import apiRoutes from "./user/routes.js";
import articleRoutes from "./article/routes.js";
import tagRoutes from "./tag/routes.js";
import commentRoutes from "./comment/routes.js";
import profileRoutes from "./profile/routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(cookieParser());

app.use("/api", apiRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/articles", commentRoutes);

app.listen(5500, () => console.log("Server is running on PORT:5500"));
