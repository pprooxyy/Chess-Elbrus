"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Friends", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      friend_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Friends");
  },
};
