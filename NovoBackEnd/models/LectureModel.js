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
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    dateLecture: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    timeLecture: {
      type: DataTypes.TIME,
      allowNull: false,
    }, description: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    link_url: {
      type: DataTypes.STRING(255),
    },
    video_url: {
      type: DataTypes.TEXT,
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    yearOfPublication: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  { 
    tableName: 'lecture',
    timestamps: true,
  },
);
