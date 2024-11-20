'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vehicle_history.belongsTo(models.valid_passes, {
        foreignKey: {
          name: 'Pass_Number',
          // allowNull: false,
        },
        onDelete: 'CASCADE',
      });
    }
  }
  vehicle_history.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    Plate_Number: DataTypes.STRING,
    Lot_Number: DataTypes.STRING,
    Entry: DataTypes.STRING,
    Stamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'vehicle_history',
    timestamps: false,
    freezeTableName: true,
  });
  return vehicle_history;
};