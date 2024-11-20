'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('valid_passes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Pass_Number: {
        type: Sequelize.STRING
      },
      Pass_Type: {
        type: Sequelize.STRING
      },
      Pass_Year: {
        type: Sequelize.DATE
      },
      License_Plate_Number: {
        type: Sequelize.STRING
      },
      Owner_Name: {
        type: Sequelize.STRING
      },
      Student_ID: {
        type: Sequelize.STRING
      },
      Address_No: {
        type: Sequelize.STRING
      },
      Phone_No: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('valid_passes');
  }
};