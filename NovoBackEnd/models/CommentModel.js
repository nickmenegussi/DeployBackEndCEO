import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const CommentModel = sequelize.define(
  "CommentModel",
  {
    idComments: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    User_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Post_idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "comments",
    timestamps: true,
  }
);
