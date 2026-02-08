import { Router } from "express";
import {
  getAllPostsController,
  createPostController,
  getPostByIdController,
  toggleLikeController,
  updatePostController, // Handles content/image update
  deletePostController,
} from "../controller/PostController.js";
import authMiddleware from "../middleware/authMidleware.js";
// import upload from "../multerConfig/multer.js";

const router = Router();

router.get("/postMessages", authMiddleware, getAllPostsController);
router.post("/postMessages", authMiddleware, createPostController);
router.get("/postMessages/:postId", authMiddleware, getPostByIdController);

router.post("/posts/:postId/like", authMiddleware, toggleLikeController);
router.put("/posts/:postId/content", authMiddleware, updatePostController);
router.put("/posts/:postId/image", authMiddleware, updatePostController);
router.delete("/posts/:postId", authMiddleware, deletePostController);

export default router;
