import { Router } from "express";
import { getTags } from "./controller.js";

const router = Router();

router.get("/", getTags);

export default router;
