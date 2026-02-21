import { Router } from "express";
import {
  viewAllFavoritesByUserController,
  createFavoriteBookController,
} from "../controller/FavoriteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import validate from "../middleware/validateMiddleware.js";
import { createFavoriteSchema } from "../validations/MiscValidation.js";

const router = Router();

router.get("/favorite/user", authMiddleware, viewAllFavoritesByUserController);
router.post("/favorite/register", authMiddleware, validate(createFavoriteSchema), createFavoriteBookController);

export default router;
