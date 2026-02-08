import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const LikeModel = sequelize.define(
  "LikeModel",
  {
    idLikes: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Post_idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    User_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "likes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ["Post_idPost", "User_idUser"],
      },
    ],
  }
);
