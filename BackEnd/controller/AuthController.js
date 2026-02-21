import { generateOtpService, loginService, verificationOtpService } from "../services/AuthService.js";

export async function loginController(req, res,next) {
  try {
    const {email, password} = req.body

    const result = await loginService(email, password)

    return res.status(200).json({
      success: true,
      message: "Login realizado com sucesso.",
      data: result,
    })
  } catch (error) {
    next(error);
  }
}

export async function generateOtpController(req, res, next) {
  try {
    const {email} = req.body

    const result = await generateOtpService(email)

    return res.status(200).json({
      success: true,
      ...result,
      data: email
    })
  } catch (error) {
    next(error)
  }
}

export async function verificationOtpController(req, res, next) {
  try {
    const {email, otp} = req.body

    const result = await verificationOtpService(email, otp)

    return res.status(200).json({
      ...result
    })
  } catch (error) {
    next(error)
  }
}
