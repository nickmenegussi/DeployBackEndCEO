import { NotificationModel } from "../models/NotificationModel.js";
import { UserModel } from "../models/UserModel.js";
import { Sequelize, Op } from "sequelize";

export const NotificationRepository = {
  findByUser(User_idUser) {
    return NotificationModel.findAll({
      where: { User_idUser },
      include: [{ model: UserModel, as: "user" }],
      order: [["created_at", "DESC"]],
    });
  },

  findAll() {
    return NotificationModel.findAll({
      include: [{ model: UserModel, as: "user" }],
      order: [["created_at", "DESC"]],
    });
  },

  findByIdAndUser(idNotifications, User_idUser) {
    return NotificationModel.findOne({
      where: { idNotifications, User_idUser },
    });
  },

  findDuplicate(expoPushToken, message, User_idUser) {
    return NotificationModel.findOne({
      where: {
        expoPushToken,
        message: { [Op.like]: message },
        User_idUser,
        created_at: { [Op.gt]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 5 MINUTE)") },
      },
    });
  },

  create(data) {
    return NotificationModel.create(data);
  },

  markAllAsRead(User_idUser) {
    return NotificationModel.update(
      { isRead: true },
      {
        where: { User_idUser, isRead: false },
      }
    );
  },

  update(idNotifications, User_idUser, data) {
    return NotificationModel.update(data, {
      where: { idNotifications, User_idUser },
    });
  },

  delete(idNotifications, User_idUser) {
    return NotificationModel.destroy({
      where: { idNotifications, User_idUser },
    });
  },
};
