import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const LectureModel = sequelize.define(
  "LectureModel",
  {
    idLecture: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameLecture: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dateLecture: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timeLecture: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    link_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    video_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    yearOfPublication: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "lecture",
    timestamps: true,
  }
);
