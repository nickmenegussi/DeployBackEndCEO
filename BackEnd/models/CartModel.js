import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const CartModel = sequelize.define(
  "CartModel",
  {
    idCart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    User_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Book_idLibrary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM("reservar", "emprestar"),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
    createdAt: "added_at",
    updatedAt: false,
  }
);
