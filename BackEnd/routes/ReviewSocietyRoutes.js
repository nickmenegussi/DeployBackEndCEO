import { Router } from "express";
import {
  getAllReviewSocietyController,
  createReviewSocietyController,
  // updateReviewSocietyController, // Need to implement if not there
  deleteReviewSocietyController,
} from "../controller/ReviewSocietyController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createReviewSocietySchema } from "../validations/MiscValidation.js";

const router = Router();

router.get("/reviewSociety", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), getAllReviewSocietyController);
router.post("/reviewSociety/create", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), validate(createReviewSocietySchema), createReviewSocietyController);
// router.put('/reviewSociety/:idReviewSociety/update', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), updateReviewSocietyController)
router.delete("/reviewSociety/:idReviewSociety/delete", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), deleteReviewSocietyController);

export default router;
