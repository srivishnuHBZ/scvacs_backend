'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class valid_passes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  valid_passes.init({
    Pass_Number: {
      primaryKey: true,
      type:DataTypes.INTEGER,
    },

    Pass_Type: DataTypes.STRING,
    Pass_Year: DataTypes.DATE,
    License_Plate_Number: DataTypes.STRING,
    Owner_Name: DataTypes.STRING,
    Student_ID: DataTypes.STRING,
    Address_No: DataTypes.STRING,
    Phone_No: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'valid_passes',
    timestamps:false,
  });
  return valid_passes;
};