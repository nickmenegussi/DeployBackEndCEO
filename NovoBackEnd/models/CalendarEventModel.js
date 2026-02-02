import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const CalendarEventModel = sequelize.define(
  "CalendarEventModel",
  {
    idCalendarEvents: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start: {
      type: DataTypes.STRING(100), // Original uses strings for these in body, usually ISO or custom format
      allowNull: false,
    },
    end: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dateEvent: {
      type: DataTypes.DATEONLY, // Original name 'dateEvent'
      allowNull: false,
    },
    User_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "calendarevents",
    timestamps: true,
  }
);
