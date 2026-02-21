import userResponseDTO from "../Dtos/UserResponseDTO.js";
import appError from "../errors/AppError.js";
import { UserRepository } from "../repository/UserRepository.js";
import { AuthRepository } from "../repository/AuthRepository.js";
import bcrypt from "bcrypt";

export async function getAllService() {
  const userResult = await UserRepository.findAll();

  if (userResult.length === 0) {
    throw appError("Sem dados", 400);
  }

  return {
    message: "Usuários encontrados com sucesso",
    data: userResult,
  };
}

export async function getByIdService(idUser, roleUser, dataUserLogged) {
  if (!idUser) {
    throw appError("Preencha todos os campos obrigatórios!", 400);
  }

  if (
    roleUser !== "Admin" &&
    roleUser !== "SuperAdmin" &&
    dataUserLogged !== idUser
  ) {
    throw appError("Você não tem permissão para acessar esse usuário", 401);
  }

  const existsUser = await UserRepository.findById(idUser);

  if (!existsUser) {
    throw appError("Usuário não encontrado!", 404);
  }

  return {
    message: "Sucesso ao exibir usuário",
    success: true,
    data: existsUser,
  };
}

export async function register(data) {
  const { nameUser, email, password, image_profile, status_permission } = data;

  if (!nameUser || !email || !password)
    throw new Error("Preencha todos os campos obrigatórios!");

  const exisits = await UserRepository.findByEmail(email, true);

  if (exisits) {
      // Mensagem genérica para evitar enumeração de usuários
      throw new Error("Erro ao processar o cadastro. Verifique os dados ou tente outro e-mail.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserRepository.create({
    nameUser,
    email,
    password: hashedPassword,
    status_permission: status_permission || 'User',
    image_profile: image_profile || null,
  });

  return {
    message: "Usuário cadastrado com sucesso",
    success: true,
    data: userResponseDTO(user)
  };
}

export async function updateNameUserService(idUser, nameUser) {
  if(!nameUser.trim()) {
    throw appError("Nome de usuário é obrigatório", 400)
  }

  const affectedRows = await UserRepository.update(idUser, {
    nameUser: nameUser
  })

  if(affectedRows.length === 0) {
    throw appError("Usuário não encontrado ou nome igual ao atual", 404)
  }

  return {
    message: "Sucesso ao alterar nome de usuário",
    succes: true,
    affectedRows: affectedRows
  }
}

export async function updateUserEmailService(idUser, emailUser) {
  if(!emailUser.trim()) {
    throw appError("Email de usuário é obrigatório", 400)
  }

  const affectedRows = await UserRepository.update(idUser, {
    email: emailUser
  })

  if(affectedRows.length === 0) {
    throw appError("Usuário não encontrado ou nome igual ao atual", 404)
  }

  return {
    message: "Sucesso ao alterar o email de usuário",
    succes: true,
    affectedRows: affectedRows
  }
}

export async function updateUserPasswordService(idUser, newPassword, currentPassword, confirmedPassword) {
  if(!idUser || !newPassword || !currentPassword || !confirmedPassword) {
    throw appError("Preencha todos os campos de cadastro", 400)
  }

  const userResult = await UserRepository.findById(idUser, true)

  if(!userResult) throw appError("Usuario não encontrado. Verifique os dados e tente novamente.", 404)

  const passwordMatch = await bcrypt.compare(currentPassword, userResult.password)

  if(!passwordMatch) throw appError("Senha atual incorreta", 400)

  if(newPassword !== confirmedPassword) throw appError("A nova senha digitada não coincide com a confirmada. Tente novamente!", 400)

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  const affectedRows = await UserRepository.update(idUser, {
    password: hashedPassword
  })

  if(affectedRows[0] === 0) {
    throw appError("Não foi possível alterar a senha", 400)
  }

  return {
    message: "Senha alterada com sucesso!",
    success: true,
  }
}

export async function updateUserForgotPasswordService(email, otp, newPassword, confirmedPassword) {
  if (!email || !otp || !newPassword || !confirmedPassword) {
    throw appError("Preencha todos os campos obrigatórios", 400);
  }

  if (newPassword !== confirmedPassword) {
    throw appError("As senhas não coincidem!", 400);
  }

  // 1. Verificar o OTP
  const otpInformation = await AuthRepository.findOtpByEmail(email);
  if (!otpInformation) throw appError("Código não encontrado para este e-mail", 404);

  const isMatch = await bcrypt.compare(otp, otpInformation.otp);
  if (!isMatch) throw appError("Código inválido", 400);

  const currentTime = new Date();
  if (currentTime > new Date(otpInformation.expiresAt)) throw appError("Código expirado", 400);

  // 2. Buscar o usuário pelo e-mail
  const userResult = await UserRepository.findByEmail(email, false);
  if (!userResult) throw appError("Usuário não encontrado.", 404);

  // 3. Atualizar a senha
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const affectedRows = await UserRepository.update(userResult.idUser, {
    password: hashedPassword,
  });

  if (affectedRows[0] === 0) {
    throw appError("Não foi possível atualizar a senha.", 400);
  }

  return {
    message: "Senha atualizada com sucesso!",
    success: true,
  };
}

export async function updateUserImageProfileService(idUser, imageFilename) {
  if (!idUser) {
    throw appError("Preencha todos os campos de cadastro", 400);
  }

  const existsUser = await UserRepository.findById(idUser);

  if (!existsUser)
    throw appError(
      "Usuario não encontrado. Verifique os dados e tente novamente.",
      404,
  );

  const affectedRows = await UserRepository.update(idUser, {
    image_profile: imageFilename || null,
  });

  if (affectedRows.length === 0) {
    throw appError(
      "Erro ao alterar foto de perfil. Por favor, tente novamente.",
      500,
    );
  }

  return {
    message: "Sucesso ao alterar foto de perfil.",
    success: true,
    data: { image_profile: imageFilename },
  };
}

export async function deleteService(idUser, roleUser, idUserLogged) {
  if (!idUser) {
    throw appError("Preencha todos os campos obrigatórios!", 400);
  }
  if (
    roleUser !== "Admin" &&
    roleUser !== "SuperAdmin" &&
    idUserLogged !== idUser
  ) {
    throw appError("Você não tem permissão para deletar esse usuário", 401);
  }

  const existsUser = await UserRepository.findById(idUser);

  if (!existsUser) {
    throw appError(
      "Usuário não encontrado, verifique os dados e tente novamente!",
      404,
    );
  }

  await UserRepository.delete(idUser);

  return {
    message: "Usuário deletado com sucesso!",
    success: true,
  };
}
