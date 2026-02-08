import { Router } from "express";
import {
  viewCartAllController,
  viewCartByUserController,
  updateActionController,
  createCartController,
  confirmCartController,
  updateQuantityController,
  deleteCartController,
} from "../controller/CartController.js";
import authMiddleware from "../middleware/authMidleware.js";

const router = Router();

router.get("/cart/user/:idUser/library/:idLibrary", authMiddleware, viewCartByUserController);
router.get("/cart", authMiddleware, viewCartAllController);

router.post("/cart/register", authMiddleware, createCartController);
router.post("/cart/process-shopping", authMiddleware, confirmCartController);
router.patch("/cart/:id/action", authMiddleware, updateActionController);
router.patch("/cart/quantity", authMiddleware, updateQuantityController);

router.delete("/cart/:idCart", authMiddleware, deleteCartController);

export default router;
