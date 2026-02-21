import { CartModel } from "../models/CartModel.js";
import { UserModel } from "../models/UserModel.js";
import { BookModel } from "../models/LibraryModel.js";
import { LoanModel } from "../models/LoanModel.js";

export const CartRepository = {
  findAllByUser(idUser) {
    return CartModel.findAll({
      where: { User_idUser: idUser },
      include: [
        { model: BookModel, as: 'book' }
      ]
    });
  },

  findByUserAndLibrary(idUser, idLibrary) {
    return CartModel.findOne({
      where: { User_idUser: idUser, Book_idLibrary: idLibrary },
      include: [
        { model: UserModel, as: 'user' },
        { model: BookModel, as: 'book' }
      ]
    });
  },

  findById(idCart) {
    return CartModel.findByPk(idCart);
  },

  findByUserAndBook(idUser, idLibrary) {
    return CartModel.findOne({
      where: { User_idUser: idUser, Book_idLibrary: idLibrary }
    });
  },

  create(data) {
    return CartModel.create(data);
  },

  update(idCart, User_idUser, data) {
    return CartModel.update(data, { where: { idCart, User_idUser } });
  },

  updateByUserAndBook(idUser, idLibrary, data) {
    return CartModel.update(data, {
      where: { User_idUser: idUser, Book_idLibrary: idLibrary }
    });
  },

  delete(idCart, User_idUser) {
    return CartModel.destroy({ where: { idCart, User_idUser } });
  },

  async checkExistingLoan(User_idUser, Book_idLibrary) {
    return LoanModel.findOne({
      where: { User_idUser, Book_idLibrary }
    });
  }
};
