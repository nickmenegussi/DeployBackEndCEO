import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const UserModel = sequelize.define(
  "UserModel",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameUser: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image_profile: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status_permission: {
      type: DataTypes.ENUM("SuperAdmin", "admin", "User"),
      allowNull: false,
      defaultValue: "User",
    },
  },
  {
    tableName: "user",
    timestamps: true,
  }
);
