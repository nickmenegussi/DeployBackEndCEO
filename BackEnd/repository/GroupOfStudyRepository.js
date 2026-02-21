import { FacilitadorModel } from "../models/FacilitadorModel.js";
import { GroupOfStudyModel } from "../models/GroupOfStudy.js";

export const GroupOfStudyRepository = {
  async findAll() {
    return await GroupOfStudyModel.findAll({
      order: [["CreatedAt", "DESC"]],
    });
  },
  async findById(idGroupOfStudy) {
    return await GroupOfStudyModel.findByPk(idGroupOfStudy);
  },

  async findByType(TypeGroup) {
    return await GroupOfStudyModel.findAll({
      where: { TypeGroup },
      // include faz o join do sql
      include: [
        {
          model: FacilitadorModel,
          attributes: ["apelido"],
        },
      ],
      order: [["CreatedAt", "DESC"]],
    });
  },

  async findByNameAndType(NameStudy, TypeGroup) {
    return await GroupOfStudyModel.findOne({
      where: { NameStudy, TypeGroup },
    });
  },

  async create(data) {
    return await GroupOfStudyModel.create(data);
  },

  async update(idGroupOfStudy, data) {
    return await GroupOfStudyModel.update(data, {
      where: {idGroupOfStudy },
    });
  },

  async delete(idGroupOfStudy) {
    return await GroupOfStudyModel.destroy({
      where: { idGroupOfStudy },
    });
  },
};
