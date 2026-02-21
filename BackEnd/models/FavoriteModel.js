import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const FavoriteModel = sequelize.define(
  "FavoriteModel",
  {
    idFavorite: {
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
  },
  {
    tableName: "favorite",
    timestamps: true,
    createdAt: "date_at_create",
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ["User_idUser", "Book_idLibrary"],
      },
    ],
  }
);
