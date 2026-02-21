import { PostModel } from "../models/PostModel.js";
import { UserModel } from "../models/UserModel.js";
import { TopicModel } from "../models/TopicModel.js";
import { CategoryModel } from "../models/CategoryModel.js";
import { LikeModel } from "../models/LikeModel.js";
import { CommentModel } from "../models/CommentModel.js";
import { Sequelize } from "sequelize";

export const PostRepository = {
  findAll() {
    return PostModel.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE likes.Post_idPost = post.idPost)`),
            "likes_count",
          ],
          [
            Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.Post_idPost = post.idPost)`),
            "comments_count",
          ],
        ],
      },
      include: [
        { model: UserModel, as: "user", attributes: ["nameUser", "image_profile"] },
        {
          model: TopicModel,
          as: "topic",
          include: [{ model: CategoryModel, as: "category", attributes: ["nameCategory"] }],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  },

  findById(idPost) {
    return PostModel.findByPk(idPost, {
      attributes: {
        include: [
          [
            Sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE likes.Post_idPost = post.idPost)`),
            "likes_count",
          ],
          [
            Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.Post_idPost = post.idPost)`),
            "comments_count",
          ],
        ],
      },
      include: [{ model: UserModel, as: "user", attributes: ["nameUser", "image_profile"] }],
    });
  },

  create(data) {
    return PostModel.create(data);
  },

  update(idPost, User_idUser, data) {
    return PostModel.update(data, {
      where: { idPost, User_idUser },
    });
  },

  delete(idPost, User_idUser) {
    return PostModel.destroy({
      where: { idPost, User_idUser },
    });
  },
};
