import {Router} from "express"
import { generateOtpController, loginController, verificationOtpController } from "../controller/AuthController.js"

const router = Router()

router.post("/login/create", loginController)
router.post('/otp/create', generateOtpController)
router.post('/otp/verification', verificationOtpController)



export default router