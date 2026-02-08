import { ReviewModel } from "../models/ReviewModel.js";
import { UserModel } from "../models/UserModel.js";

export const ReviewSocietyRepository = {
  findAll(sortOrder = "DESC") {
    return ReviewModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["nameUser", "image_profile"],
        },
      ],
      order: [["create_at", sortOrder]],
    });
  },

  findById(idReviewSociety) {
    return ReviewModel.findByPk(idReviewSociety);
  },

  findByUserAndContent(userId, descriptionReview, ratingReview) {
    return ReviewModel.findOne({
      where: {
        userId,
        descriptionReview,
        ratingReview,
      },
    });
  },

  create(data) {
    return ReviewModel.create(data);
  },

  update(idReviewSociety, userId, data) {
    return ReviewModel.update(data, {
      where: {
        idReviewSociety,
        userId,
      },
    });
  },

  delete(idReviewSociety, userId) {
    return ReviewModel.destroy({
      where: {
        idReviewSociety,
        userId,
      },
    });
  },
};
