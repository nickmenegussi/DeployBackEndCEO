import { UserModel } from "../models/UserModel";
import { UserRepository } from "../repository/UserRepository";
const bcrypt = require("bcrypt");

export async function register(data) {
  const { nameUser, email, password, image_profile } = data;

  if (!nameUser || !email || !password)
    throw new Error("Preencha todos os campos obrigatórios!");

  const exisits = await UserRepository.findByEmail(email);

  if (exisits) throw new Error("Usuário já cadastrado!");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserRepository.create({
    nameUser,
    email,
    password: hashedPassword,
    image_profile: image_profile || null,
  });

  return {
    idUser: user.idUser,
    nameUser: user.nameUser,
    email: user.email,
    image_profile: user.image_profile,
  };
}
