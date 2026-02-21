import { LoanModel } from "../models/LoanModel.js";
import { BookModel } from "../models/LibraryModel.js";
import { UserModel } from "../models/UserModel.js";

export const LoanRepository = {
  findAll() {
    return LoanModel.findAll();
  },

  findByUser(User_idUser) {
    return LoanModel.findAll({
      where: { User_idUser },
      include: [
        { model: BookModel, as: "book" },
        { model: UserModel, as: "user" },
      ],
    });
  },

  findById(idLoans) {
    return LoanModel.findByPk(idLoans);
  },

  create(data) {
    return LoanModel.create(data);
  },

  update(idLoans, User_idUser, data) {
    return LoanModel.update(data, {
      where: { idLoans, User_idUser },
    });
  },

  delete(idLoans, User_idUser) {
    return LoanModel.destroy({
      where: { idLoans, User_idUser },
    });
  },

  findReceiptInfo(idLoans) {
    return LoanModel.findByPk(idLoans, {
      include: [
        { model: UserModel, as: "user", attributes: ["nameUser", "email"] },
        { model: BookModel, as: "book", attributes: ["nameBook", "authorBook", "image"] },
      ],
    });
  },
};
