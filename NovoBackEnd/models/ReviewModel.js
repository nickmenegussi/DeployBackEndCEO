import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const ReviewModel = sequelize.define(
  "ReviewModel",
  {
    idReviewSociety: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descriptionReview: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ratingReview: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "reviewsociety",
    timestamps: true,
    createdAt: "create_at",
    updatedAt: false,
  }
);
