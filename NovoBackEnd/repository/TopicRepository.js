import { TopicModel } from "../models/TopicModel.js";

export const TopicRepository = {
  findAll() {
    return TopicModel.findAll({
      order: [["created_at", "DESC"]],
    });
  },

  findById(idTopic) {
    return TopicModel.findByPk(idTopic);
  },

  findByTitleAndDescription(title, description) {
    return TopicModel.findOne({
      where: { title, description },
    });
  },

  create(data) {
    return TopicModel.create(data);
  },

  update(idTopic, User_idUser, data) {
    return TopicModel.update(data, {
      where: { idTopic, User_idUser },
    });
  },

  delete(idTopic, User_idUser) {
    return TopicModel.destroy({
      where: { idTopic, User_idUser },
    });
  },
};
