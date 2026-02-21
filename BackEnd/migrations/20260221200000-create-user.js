'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            idUser: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nameUser: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            image_profile: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            status_permission: {
                type: Sequelize.ENUM('SuperAdmin', 'Admin', 'User'),
                allowNull: false,
                defaultValue: 'User',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    }
};
