import { Router } from "express";
import {
  generateOtpController,
  loginController,
  verificationOtpController,
  // viewOtpController, // We'll add this if needed, for now keeping existing
} from "../controller/AuthController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import { loginSchema, generateOtpSchema, verificationOtSchema } from "../validations/AuthValidation.js";

const router = Router();

router.post("/login/create", validate(loginSchema), loginController);
router.post("/otp/generate", validate(generateOtpSchema), generateOtpController);
router.post("/otp/verification", validate(verificationOtSchema), verificationOtpController);
// router.get('/otp/view', authMiddleware ,viewOtpController)

export default router;
