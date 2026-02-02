import { DataTypes } from "sequelize";
import sequelize from "../../src/config/sequelize";

export const GroupOfStudyModel = sequelize.define("GropOfStudyModel",{
    idGroupOfStudy: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, idFacilitador: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, nameStudy: {
        type: DataTypes.STRING(150),
        allowNull: false,
    }, description: {
        type: DataTypes.STRING(200),
        allowNull: false,
    }, DayOfWeek: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }, StartTime: {
        type: DataTypes.TIME,
        allowNull: false,
    }, EndTime: {
        type: DataTypes.TIME,
        allowNull: false,
    }, TypeGroup: {
        type: DataTypes.ENUM('ESDE', 'MEDIUNICO', 'EVANGELIZACAO', 'CIEDE'),
        defaultValue: 'Outros',
        allowNull: false,
    }, Requirements: {
        type: DataTypes.TEXT,
    }, 
}, {
    tableName: 'GroupOfStudy',
    timestamps: true
})