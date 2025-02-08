import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyJWTOptional } from "../middleware/verifyJWTOptional.js";
import articleController from "./controller.js";

const router = express.Router();

router.get("/feed", verifyJWT, articleController.feedArticles);

router.get("/", verifyJWTOptional, articleController.listArticles);

router.get("/:slug", articleController.getArticleWithSlug);

router.post("/", verifyJWT, articleController.createArticle);

router.delete("/:slug", verifyJWT, articleController.deleteArticle);

router.post("/:slug/favorite", verifyJWT, articleController.favoriteArticle);

router.delete(
  "/:slug/favorite",
  verifyJWT,
  articleController.unfavoriteArticle
);

router.put("/:slug", verifyJWT, articleController.updateArticle);

export default router;
