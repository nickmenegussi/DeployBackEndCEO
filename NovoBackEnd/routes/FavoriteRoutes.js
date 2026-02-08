import { Router } from "express";
import {
  viewAllFavoritesByUserController,
  createFavoriteBookController,
} from "../controller/FavoriteController.js";
import authMiddleware from "../middleware/authMidleware.js";

const router = Router();

router.get("/favorite/user", authMiddleware, viewAllFavoritesByUserController);
router.post("/favorite/register", authMiddleware, createFavoriteBookController);

export default router;
