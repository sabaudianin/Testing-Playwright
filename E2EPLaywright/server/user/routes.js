import express from "express";
import {
  userLogin,
  registerUser,
  getCurrentUser,
  updateUser,
} from "./controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/users/login", userLogin);

router.post("/users", registerUser);

router.get("/user", verifyJWT, getCurrentUser);

router.put("/user", verifyJWT, updateUser);

export default router;
