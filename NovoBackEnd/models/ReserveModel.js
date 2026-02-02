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
    Cart_idCart: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "reserves",
    timestamps: true,
  }
);
