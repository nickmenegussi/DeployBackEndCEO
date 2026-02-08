import { Router } from "express";
import {
  getCategoriesController,
  getTopicByCategoryController,
  createCategoryController,
} from "../controller/CategoryController.js";
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/category", authMiddleware, getCategoriesController);
router.get("/category/:nameCategory", getTopicByCategoryController);

router.post("/category", authMiddleware, createCategoryController);

export default router;
