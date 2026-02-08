import { Router } from "express";
import {
  viewAllTopicController,
  viewOnlyTopicByIdController,
  createTopicController,
  updateTopicController,
  deleteTopicController,
} from "../controller/TopicController.js";
import authMiddleware from "../middleware/authMidleware.js";
// import upload from '../multerConfig/multer.js'

const router = Router();

router.get("/topic", authMiddleware, viewAllTopicController);
router.get("/topic/:topicId", authMiddleware, viewOnlyTopicByIdController);

router.post("/topic/create", authMiddleware, createTopicController);

router.patch("/topic/:topicId/title", authMiddleware, updateTopicController);
router.patch("/topic/:topicId/description", authMiddleware, updateTopicController);
router.patch("/topic/:topicId/image", authMiddleware, updateTopicController);

router.delete("/topic/:topicId/delete", authMiddleware, deleteTopicController);

export default router;
