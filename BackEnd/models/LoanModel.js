import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const LoanModel = sequelize.define(
  "LoanModel",
  {
    idLoans: {
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
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "returned", "overdue"),
      defaultValue: "active",
    },
  },
  {
    tableName: "loans",
    timestamps: true,
    createdAt: "date_at_create",
    updatedAt: false,
  }
);
