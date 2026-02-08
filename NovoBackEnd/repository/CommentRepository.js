import { CommentModel } from "../models/CommentModel.js";
import { UserModel } from "../models/UserModel.js";

export const CommentRepository = {
  findByPostId(Post_idPost) {
    return CommentModel.findAll({
      where: { Post_idPost },
      include: [{ model: UserModel, as: "user", attributes: ["idUser", "nameUser", "image_profile"] }],
      order: [["createdDate", "ASC"]],
    });
  },

  findById(idComments) {
    return CommentModel.findByPk(idComments);
  },

  findDuplicate(Post_idPost, User_idUser, message) {
    return CommentModel.findOne({
      where: { Post_idPost, User_idUser, message },
    });
  },

  create(data) {
    return CommentModel.create(data);
  },

  update(idComments, User_idUser, data) {
    return CommentModel.update(data, {
      where: { idComments, User_idUser },
    });
  },

  delete(idComments, User_idUser) {
    return CommentModel.destroy({
      where: { idComments, User_idUser },
    });
  },
};
