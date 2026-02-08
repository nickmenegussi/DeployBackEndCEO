import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const PostModel = sequelize.define(
  "PostModel",
  {
    idPost: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    User_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Topic_idTopic: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "post",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
