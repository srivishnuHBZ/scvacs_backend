'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      License_Plate_Number: {
        type: Sequelize.STRING
      },
      Valid_Pass: {
        type: Sequelize.STRING
      },
      License_Plate_State: {
        type: Sequelize.STRING
      },
      Color: {
        type: Sequelize.STRING
      },
      Make: {
        type: Sequelize.STRING
      },
      Model: {
        type: Sequelize.STRING
      },
      Confidence: {
        type: Sequelize.NUMBER
      },
      id: {
        type: Sequelize.NUMBER
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
    await queryInterface.dropTable('vehicles');
  }
};