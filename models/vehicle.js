'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vehicle.belongsTo(models.valid_passes, {
        foreignKey: {
          name: 'Valid_Pass',
          // allowNull: false,
        },
        onDelete: 'CASCADE',
      });
    }
  }
  vehicle.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    License_Plate_Number: DataTypes.STRING,
    Valid_Pass: DataTypes.INTEGER,
    License_Plate_State: DataTypes.STRING,
    Color: DataTypes.STRING,
    Make: DataTypes.STRING,
    Model: DataTypes.STRING,
    Confidence: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'vehicle',
    timestamps: false,
    freezeTableName: true,
  });
  return vehicle;
};