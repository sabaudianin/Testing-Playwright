import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyJWTOptional } from "../middleware/verifyJWTOptional.js";
import {
  addCommentsToArticle,
  getCommentsFromArticle,
  deleteComment,
} from "./controller.js";

const router = Router();

router.post("/:slug/comments", verifyJWT, addCommentsToArticle);

router.get("/:slug/comments", verifyJWTOptional, getCommentsFromArticle);

router.delete("/:slug/comments/:id", verifyJWT, deleteComment);

export default router;
