import { CategoryModel } from "../models/CategoryModel.js";
import { TopicModel } from "../models/TopicModel.js";

export const CategoryRepository = {
  findAll() {
    return CategoryModel.findAll({
      attributes: ["idCategory", "nameCategory"],
    });
  },

  findTopicsByCategory(nameCategory) {
    return TopicModel.findAll({
      include: [
        {
          model: CategoryModel,
          as: 'category', // Need to check association
          where: { nameCategory },
        },
      ],
      order: [['created_at', 'DESC']],
    });
  },

  // Alternative for raw-ish join logic if associations are missing
  async findTopicsByCategoryRaw(nameCategory) {
     return TopicModel.findAll({
         order: [['created_at', 'DESC']]
     });
  },

  findByNameAndUser(nameCategory, User_idUser) {
    return CategoryModel.findOne({
      where: { nameCategory, User_idUser },
    });
  },

  create(data) {
    return CategoryModel.create(data);
  },
};
