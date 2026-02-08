import { LikeModel } from "../models/LikeModel.js";

export const LikeRepository = {
  find(Post_idPost, User_idUser) {
    return LikeModel.findOne({
      where: { Post_idPost, User_idUser },
    });
  },

  create(data) {
    return LikeModel.create(data);
  },

  delete(idLikes) {
    return LikeModel.destroy({
      where: { idLikes },
    });
  },
};
