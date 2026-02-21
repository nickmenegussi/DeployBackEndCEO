import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const OtpModel = sequelize.define(
  "OtpModel",
  {
    idOtp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING(255), // Aumentado para suportar o hash bcrypt
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'otp',
    timestamps: true, // Useful for tracking when it was created
  }
);
