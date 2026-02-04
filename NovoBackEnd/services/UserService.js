import appError from "../errors/AppError.js";
import { UserRepository } from "../repository/UserRepository.js";
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
    throw appError("Nome de usuário é obrigatório", 400)
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

  const userResult = await UserRepository.findById(idUser)

  if(!userResult) throw appError("Usuario não encontrado. Verifique os dados e tente novamente.", 404)

  const passwordMatch = await bcrypt.compare(currentPassword, userResult.password)

  if(!passwordMatch) throw appError("Senha atual incorreta", 400)

  if(newPassword !== confirmedPassword) throw appError("A nova senha digitada não coincide com a confirmada. Tente novamente!", 400)

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  const affectedRows = await UserRepository.update(idUser, {
    password: hashedPassword
  })

  if(affectedRows.length === 0) {
    throw appError("Não foi possível alterar a senha", 400)
  }

  return {
    message: "Sucesso ao alterar o email de usuário",
    succes: true,
    affectedRows: affectedRows
  }
}

export async function updateUserForgotPasswordService(idUser, email, newPassword) {
  if (!email || !newPassword) {
    throw appError("Email e nova senha de redefinição são obrigatórios", 400);
  }

  const userResult = await UserRepository.findByEmail(email);

  if (!userResult) throw appError("Nenhum usuário encontrado.", 404);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const affectedRows = await UserRepository.update(idUser, {
    password: hashedPassword,
  });

  if (affectedRows.length === 0) {
    throw appError("Não foi possível atualizar a senha.", 400);
  }

  return {
    message: "Sucesso ao atualizar senha esquecida!",
    success: true,
    affectedRows: affectedRows,
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
