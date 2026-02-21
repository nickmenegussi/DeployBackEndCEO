import { Router } from "express";
import {
  viewAllReservesController,
  viewReservesByUserController,
  reserveBookController,
  deleteReserveController,
} from "../controller/ReserveController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createReserveSchema } from "../validations/ReserveValidation.js";

const router = Router();

router.get("/reserves", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), viewAllReservesController);
router.get("/reserves/user", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), viewReservesByUserController);

router.post("/reserves/create", authMiddleware, validate(createReserveSchema), reserveBookController);

router.delete("/reserves/:ReserveId/delete", authMiddleware, deleteReserveController);

export default router;
