import { Router } from "express";
import {
  viewAllReservesController,
  viewReservesByUserController,
  reserveBookController,
  deleteReserveController,
} from "../controller/ReserveController.js";
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/reserves", authMiddleware, viewAllReservesController);
router.get("/reserves/user", authMiddleware, verifyPermission(["admin", "SuperAdmin", "User"]), viewReservesByUserController);

router.delete("/reserves/:ReserveId/delete", authMiddleware, deleteReserveController);

export default router;
