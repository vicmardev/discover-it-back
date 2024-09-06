'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoricContracts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HistoricContracts.init({
    IdNewContract: DataTypes.INTEGER,
    IdContract: DataTypes.INTEGER,
    NewContract: DataTypes.STRING,
    DateRegister: DataTypes.STRING,
    Status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HistoricContracts',
  });
  return HistoricContracts;
};