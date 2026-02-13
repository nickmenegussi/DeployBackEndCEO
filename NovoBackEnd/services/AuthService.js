import { UserRepository } from "../repository/UserRepository.js";
import appError from "../errors/AppError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthRepository } from "../repository/AuthRepository.js";
import OtpGenerator from "otp-generator"
import sendOtpEmail  from "./EmailService.js";

export async function loginService(email, password) {
  if(!email || !password){
    throw appError("Preencha todos os campos de login!", 400)
  }

  const userResult = await UserRepository.findByEmail(email);

  if (!userResult || !await bcrypt.compare(password, userResult.password)) 
    throw appError("Email ou senha inválidos", 401);

  const token = jwt.sign(
    { id: userResult.idUser, email: userResult.email, role: userResult.status_permission },
    process.env.JWT_SECRET || "senhaSuperSecreto",
    { expiresIn: "4days" },
  );

  return {
    user: userResult,
    token: token
    
  }
}

export async function generateOtpService(email) {
  if(!email){
    throw appError("Preencha todos os campos de cadastro", 400)
  }

  await AuthRepository.deleteExpiredOtps()

  const existsUser = await UserRepository.findByEmail(email)
  
  if(!existsUser) throw appError("Se o email estiver cadastrado, você receberá um código.", 200)

  const otp = OtpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })

  const hashedOtp = await bcrypt.hash(otp, 10)

  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + 5)
  // mudar para hashed otp
 await AuthRepository.generateOtp(email, otp, expiresAt)

 await sendOtpEmail(email, existsUser.nameUser, otp)

 return {
  message: "se o email estiver cadsatrado, você receberá um código."
 }
  
}

export async function verificationOtpService(email, otp) {

  if(!email || !otp) throw appError("Preencha todos os campos", 400)

  const resultOtp = await AuthRepository.findOtpByEmailAndOtp(email, otp)
  const otpInformation = resultOtp
  const currentTime = new Date()

  if(currentTime > new Date(otpInformation.expiresAt)) throw appError('OTP expirado', 400)

  return {
    message: 'OTP verificado com sucesso!',
    success: true
  }

}
