import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const FacilitatorModel = sequelize.define(
  "FacilitatorModel",
  {
    idFacilitador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    User_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    apelido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    espiritaSinceTime: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("ESDE", "CIEDE", "MEDIUNIDADE", "EVANGELIZACAO"),
      allowNull: false,
    },
    memberSinceWhen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "facilitadores",
    timestamps: true,
  }
);
