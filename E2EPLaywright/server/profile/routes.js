import { Router } from "express";
import { getProfile, followUser, unFollowUser } from "./controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyJWTOptional } from "../middleware/verifyJWTOptional.js";

const router = Router();

router.get("/:username", verifyJWTOptional, getProfile);

router.post("/:username/follow", verifyJWT, followUser);

router.delete("/:username/follow", verifyJWT, unFollowUser);

export default router;
