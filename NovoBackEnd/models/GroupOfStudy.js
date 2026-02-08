import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const GroupOfStudyModel = sequelize.define("GroupOfStudyModel", {
  idGroupOfStudy: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  IdFacilitador: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  NameStudy: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  DayOfWeek: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  StartTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  EndTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  TypeGroup: {
    type: DataTypes.ENUM("ESDE", "MEDIUNICO", "EVANGELIZACAO", "CIEDE", "OUTROS"),
    allowNull: true,
  },
  Requirements: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: "GroupOfstudy",
  timestamps: true,
  createdAt: "CreatedAt",
  updatedAt: false,
});