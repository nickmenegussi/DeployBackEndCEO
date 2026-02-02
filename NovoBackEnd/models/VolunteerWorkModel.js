import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const VolunteerWorkModel = sequelize.define(
  "VolunteerWorkModel",
  {
    idVolunteerWork: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameVolunteerWork: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateVolunteerWork: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    timeVolunteerWork: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    work_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "volunteerwork",
    timestamps: true,
  }
);
