import {
  viewAllFavoritesByUserService,
  createFavoriteBookService,
} from "../services/FavoriteService.js";

export async function viewAllFavoritesByUserController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const result = await viewAllFavoritesByUserService(User_idUser);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createFavoriteBookController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const { Book_idLibrary } = req.body;
    const result = await createFavoriteBookService(User_idUser, Book_idLibrary);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
