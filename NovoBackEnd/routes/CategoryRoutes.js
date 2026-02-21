import { Router } from "express";
import {
  getCategoriesController,
  getTopicByCategoryController,
  createCategoryController,
} from "../controller/CategoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createCategorySchema } from "../validations/ForumValidation.js";

const router = Router();

router.get("/category", authMiddleware, getCategoriesController);
router.get("/category/:nameCategory", authMiddleware, getTopicByCategoryController);

router.post("/category", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), validate(createCategorySchema), createCategoryController);

export default router;
