import { ReserveModel } from "../models/ReserveModel.js";
import { BookModel } from "../models/LibraryModel.js";
import { UserModel } from "../models/UserModel.js";

export const ReserveRepository = {
  findAll() {
    return ReserveModel.findAll();
  },

  findByUser(User_idUser) {
    return ReserveModel.findAll({
      where: { User_idUser },
      include: [
        {
          model: BookModel,
          as: "book",
        },
        {
          model: UserModel,
          as: "user",
        },
      ],
    });
  },

  findById(idReserved) {
    return ReserveModel.findByPk(idReserved);
  },

  create(data) {
    return ReserveModel.create(data);
  },

  delete(idReserved, User_idUser) {
    return ReserveModel.destroy({
      where: {
        idReserved,
        User_idUser,
      },
    });
  },

  findReceiptInfo(idReserved) {
    return ReserveModel.findByPk(idReserved, {
      include: [
        { model: UserModel, as: "user", attributes: ["nameUser", "email"] },
        { model: BookModel, as: "book", attributes: ["nameBook", "authorBook", "image"] },
      ],
    });
  },
};
