import { FavoriteModel } from "../models/FavoriteModel.js";
import { BookModel } from "../models/LibraryModel.js";
import { UserModel } from "../models/UserModel.js";

export const FavoriteRepository = {
  findByUser(User_idUser) {
    return FavoriteModel.findAll({
      where: { User_idUser },
      include: [
        { model: BookModel, as: "book" },
        { model: UserModel, as: "user" },
      ],
    });
  },

  find(User_idUser, Book_idLibrary) {
    return FavoriteModel.findOne({
      where: { User_idUser, Book_idLibrary },
    });
  },

  create(data) {
    return FavoriteModel.create(data);
  },
};
