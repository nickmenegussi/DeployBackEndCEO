import appError from "../errors/AppError.js";
import { FavoriteRepository } from "../repository/FavoriteRepository.js";
import favoriteResponseDTO from "../Dtos/favoriteResponseDTO.js";

export async function viewAllFavoritesByUserService(User_idUser) {
  const result = await FavoriteRepository.findByUser(User_idUser);

  if (!result || result.length === 0) {
    throw appError("Nenhum item favoritado encontrado.", 404);
  }

  return {
    success: true,
    message: "Sucesso ao exibir os itens favoritados.",
    data: result.map(favoriteResponseDTO),
  };
}

export async function createFavoriteBookService(User_idUser, Book_idLibrary) {
  if (!User_idUser || !Book_idLibrary) {
    throw appError("Preencha todos os campos obrigatórios", 400);
  }

  const existing = await FavoriteRepository.find(User_idUser, Book_idLibrary);

  if (existing) {
    throw appError("Esse item já está favoritado!", 400);
  }

  const result = await FavoriteRepository.create({
    User_idUser,
    Book_idLibrary,
  });

  return {
    message: "Livro Favoritado com sucesso.",
    success: true,
    data: result,
  };
}
