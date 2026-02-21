import { Router } from "express";
import {
  viewAllTopicController,
  viewOnlyTopicByIdController,
  createTopicController,
  updateTopicController,
  deleteTopicController,
} from "../controller/TopicController.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import upload from '../multerConfig/multer.js'

import validate from "../middleware/validateMiddleware.js";
import { createTopicSchema } from "../validations/ForumValidation.js";

const router = Router();

router.get("/topic", authMiddleware, viewAllTopicController);
router.get("/topic/:topicId", authMiddleware, viewOnlyTopicByIdController);

router.post("/topic/create", authMiddleware, validate(createTopicSchema), createTopicController);

router.patch("/topic/:topicId/title", authMiddleware, updateTopicController);
router.patch("/topic/:topicId/description", authMiddleware, updateTopicController);
router.patch("/topic/:topicId/image", authMiddleware, updateTopicController);

router.delete("/topic/:topicId/delete", authMiddleware, deleteTopicController);

export default router;
