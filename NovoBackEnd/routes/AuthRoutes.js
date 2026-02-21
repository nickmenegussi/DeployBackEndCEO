import { Router } from "express";
import {
  generateOtpController,
  loginController,
  verificationOtpController,
  // viewOtpController, // We'll add this if needed, for now keeping existing
} from "../controller/AuthController.js";
import authMiddleware from "../middleware/authMidleware.js";
import validate from "../middleware/validateMiddleware.js";
import { loginSchema } from "../validations/AuthValidation.js";

const router = Router();

router.post("/login/create", validate(loginSchema), loginController);
router.post("/otp/generate", generateOtpController);
router.post("/otp/verification", verificationOtpController);
// router.get('/otp/view', authMiddleware ,viewOtpController)

export default router;