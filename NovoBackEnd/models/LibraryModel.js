import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const BookModel = sequelize.define("Book", {
  idLibrary: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nameBook: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  authorBook: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
  },
  overviewBook: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  curiosityBook: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tagsBook: {
    type: DataTypes.ENUM("Obras Básicas", "Obras Complementares"),
    allowNull: false,
  },
  bookCategory: {
    type: DataTypes.ENUM("reserva", "emprestimo"),
    allowNull: false,
  },
  bookQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  date_aquisition: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status_Available: {
    type: DataTypes.ENUM(
      "disponível",
      "reservado",
      "emprestado",
      "indisponível",
    ),
    defaultValue: "disponível",
  },
},  {
    tableName: "Book",
    timestamps: false, // você não criou createdAt / updatedAt
  }
);
