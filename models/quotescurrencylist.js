'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuotesCurrencyList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuotesCurrencyList.init({
    CurrencyCode: DataTypes.STRING,
    CurrencyName: DataTypes.STRING,
    Status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuotesCurrencyList',
  });
  return QuotesCurrencyList;
};