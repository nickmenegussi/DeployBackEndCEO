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
    link: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateEvent: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    User_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "calendarevents",
    timestamps: false,
  }
);
