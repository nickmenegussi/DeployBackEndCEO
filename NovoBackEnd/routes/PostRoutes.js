import { Router } from "express";
import {
  getAllPostsController,
  createPostController,
  getPostByIdController,
  toggleLikeController,
  updatePostController, // Handles content/image update
  deletePostController,
} from "../controller/PostController.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import upload from "../multerConfig/multer.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createPostSchema, updatePostSchema } from "../validations/PostValidation.js";

const router = Router();

router.get("/postMessages", authMiddleware, getAllPostsController);
router.post("/postMessages", authMiddleware, validate(createPostSchema), createPostController);
router.get("/postMessages/:postId", authMiddleware, getPostByIdController);

router.post("/posts/:postId/like", authMiddleware, toggleLikeController);
router.put("/posts/:postId/content", authMiddleware, validate(updatePostSchema), updatePostController);
router.put("/posts/:postId/image", authMiddleware, updatePostController);
router.delete("/posts/:postId", authMiddleware, deletePostController);

export default router;
