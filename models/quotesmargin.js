'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuotesMargin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuotesMargin.init({
    PorcentageNumebr: DataTypes.FLOAT,
    Percentage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuotesMargin',
  });
  return QuotesMargin;
};