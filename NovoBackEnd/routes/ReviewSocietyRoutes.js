import { Router } from "express";
import {
  getAllReviewSocietyController,
  createReviewSocietyController,
  // updateReviewSocietyController, // Need to implement if not there
  deleteReviewSocietyController,
} from "../controller/ReviewSocietyController.js";
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/reviewSociety", authMiddleware, verifyPermission(["SuperAdmin", "Admin", "User"]), getAllReviewSocietyController);
router.post("/reviewSociety/create", authMiddleware, verifyPermission(["SuperAdmin", "Admin", "User"]), createReviewSocietyController);
// router.put('/reviewSociety/:idReviewSociety/update', authMiddleware, verifyPermission(['SuperAdmin', 'Admin', 'User']), updateReviewSocietyController)
router.delete("/reviewSociety/:idReviewSociety/delete", authMiddleware, verifyPermission(["SuperAdmin", "Admin", "User"]), deleteReviewSocietyController);

export default router;
