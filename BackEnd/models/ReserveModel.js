import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const ReserveModel = sequelize.define(
  "ReserveModel",
  {
    idReserved: {
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    reserveDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "expired", "cancelled"),
      defaultValue: "active",
    },
  },
  {
    tableName: "reserves",
    timestamps: true,
    createdAt: "date_at_create",
    updatedAt: false,
  }
);
