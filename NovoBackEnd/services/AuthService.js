import { UserRepository } from "../repository/UserRepository.js";
import appError from "../errors/AppError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthRepository } from "../repository/AuthRepository.js";
import OtpGenerator from "otp-generator"
import sendOtpEmail from "./EmailService.js";

export async function loginService(email, password) {
  if (!email || !password) {
    throw appError("Preencha todos os campos de login!", 400)
  }

  const userResult = await UserRepository.findByEmail(email, true); // true para incluir password

  if (!userResult || !await bcrypt.compare(password, userResult.password))
    throw appError("Email ou senha inválidos", 401);

  const token = jwt.sign(
    { id: userResult.idUser, email: userResult.email, role: userResult.status_permission },
    process.env.JWT_SECRET || "senhaSuperSecreto",
    { expiresIn: "4days" },
  );

  return {
    user: {
      idUser: userResult.idUser,
      nameUser: userResult.nameUser,
      email: userResult.email,
      role: userResult.status_permission,
      image_profile: userResult.image_profile
    },
    token: token
  }
}

export async function generateOtpService(email) {
  if (!email) {
    throw appError("Preencha todos os campos", 400)
  }

  await AuthRepository.deleteExpiredOtps()

  const existsUser = await UserRepository.findByEmail(email)

  if (!existsUser) {
    // Retornamos sucesso mesmo se não existir para evitar enumeração de e-mails
    return {
      message: "Se o e-mail estiver cadastrado, você receberá um código de recuperação."
    }
  }

  const otp = OtpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })

  const hashedOtp = await bcrypt.hash(otp, 10)

  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + 5)

  await AuthRepository.generateOtp(email, hashedOtp, expiresAt)

  await sendOtpEmail(email, existsUser.nameUser, otp)

  return {
    message: "Se o e-mail estiver cadastrado, você receberá um código de recuperação."
  }
}

export async function verificationOtpService(email, otp) {
  if (!email || !otp) throw appError("Preencha todos os campos", 400)

  const otpInformation = await AuthRepository.findOtpByEmail(email)

  if (!otpInformation) throw appError("Código não encontrado ou e-mail inválido", 404)

  const isMatch = await bcrypt.compare(otp, otpInformation.otp)

  if (!isMatch) throw appError("Código inválido", 400)

  const currentTime = new Date()

  if (currentTime > new Date(otpInformation.expiresAt)) throw appError('Código expirado', 400)

  return {
    message: 'Código verificado com sucesso!',
    success: true
  }
}

// export async function verificationOtpService(email, otp) {

//   if(!email || !otp) throw appError("Preencha todos os campos", 400)

//   const otpInformation = await AuthRepository.findOtpByEmailAndOtp(email, otp)
//   const otpInformation = resultOtp
//   const currentTime = new Date()

//   if(currentTime > new Date(otpInformation.expiresAt)) throw appError('OTP expirado', 400)

//   return {
//     message: 'OTP verificado com sucesso!',
//     success: true
//   }
// }