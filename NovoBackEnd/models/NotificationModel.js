import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const NotificationModel = sequelize.define(
  "NotificationModel",
  {
    idNotifications: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    User_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "notifications",
    timestamps: true,
  }
);
