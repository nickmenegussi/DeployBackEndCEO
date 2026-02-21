import { Router } from "express";
import {
  getCommentsByPostIdController,
  updateCommentController,
  deleteCommentController,
  createCommentController,
} from "../controller/CommentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import validate from "../middleware/validateMiddleware.js";
import { createCommentSchema } from "../validations/ForumValidation.js";

const router = Router();

router.get("/comments/:postId", authMiddleware, getCommentsByPostIdController);
router.post("/comments/:postId", authMiddleware, validate(createCommentSchema), createCommentController);
router.patch("/comments/:idComments", authMiddleware, updateCommentController);
router.delete("/comments/:idComments", authMiddleware, deleteCommentController);

export default router;
