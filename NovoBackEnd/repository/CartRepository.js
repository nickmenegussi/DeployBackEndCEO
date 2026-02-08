import { CartModel } from "../models/CartModel.js";

export const CartRepository = {
  findById(idCart) {
    return CartModel.findByPk(idCart);
  },

  delete(idCart) {
    return CartModel.destroy({
      where: { idCart },
    });
  },
};
