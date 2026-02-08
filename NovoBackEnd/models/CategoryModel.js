import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const CategoryModel = sequelize.define(
  "CategoryModel",
  {
    idCategory: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameCategory: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    User_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "category",
    timestamps: true,
    createdAt: "create_at",
    updatedAt: false,
  }
);
