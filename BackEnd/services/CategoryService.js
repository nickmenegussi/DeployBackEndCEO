import { CategoryRepository } from "../repository/CategoryRepository.js";
import appError from "../errors/AppError.js";

export async function getCategoriesService() {
  const rows = await CategoryRepository.findAll();

  return {
    message: "Sucesso ao exibir categorias de tópicos",
    success: true,
    data: rows,
  };
}

export async function getTopicByCategoryService(nameCategory) {
  // Simplification consistent with project structure
  const rows = await CategoryRepository.findTopicsByCategoryRaw(nameCategory);

  if (rows.length === 0) {
    throw appError("Nenhum tópico encontrado para essa categoria.", 404);
  }

  return {
    message: "Sucesso ao exibir tópico por categoria",
    success: true,
    data: rows,
  };
}

export async function createCategoryService(nameCategory, User_idUser) {
  if (!User_idUser || !nameCategory) {
    throw appError("Dados incompletos!", 400);
  }

  const existing = await CategoryRepository.findByNameAndUser(nameCategory, User_idUser);

  if (existing) {
    throw appError("Categoria já existe", 409);
  }

  const result = await CategoryRepository.create({ nameCategory, User_idUser });

  return {
    message: "Categoria criada com sucesso",
    success: true,
    data: {
      idCategory: result.idCategory,
      nameCategory,
      User_idUser,
    },
  };
}
