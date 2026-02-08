import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const FacilitatorModel = sequelize.define(
  "FacilitatorModel",
  {
    idFacilitadores: {
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
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    espiritaSinceTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("ESDE", "CIEDE", "MEDIUNIDADE"),
      allowNull: false,
    },
    memberSinceWhen: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "facilitadores",
    timestamps: false,
  }
);
