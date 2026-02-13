import { FacilitadorModel } from "../models/FacilitadorModel.js";
import { UserModel } from "../models/UserModel.js";

export const FacilitatorRepository = {
  findAll() {
    return FacilitadorModel.findAll();
  },

  findById(User_idUser) {
    return FacilitadorModel.findOne({
      where: { User_idUser },
      include: [{ model: UserModel, as: 'user' }]
    });
  },

  findByCategory(category) {
    return FacilitadorModel.findAll({ where: { category } });
  },

  create(data) {
    return FacilitadorModel.create(data);
  },

  delete(idFacilitadores) {
    return FacilitadorModel.destroy({ where: { idFacilitadores } });
  }
};
