import { Router } from "express";
import {
  generateOtpController,
  loginController,
  verificationOtpController,
  // viewOtpController, // We'll add this if needed, for now keeping existing
} from "../controller/AuthController.js";
import authMiddleware from "../middleware/authMidleware.js";

const router = Router();

router.post("/login/create", loginController);
router.post("/otp/generate", authMiddleware, generateOtpController);
router.post("/otp/verification", authMiddleware, verificationOtpController);
// router.get('/otp/view', authMiddleware ,viewOtpController)

export default router;