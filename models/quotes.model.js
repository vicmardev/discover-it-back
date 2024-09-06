'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Quotes.init({
    IdCustomer: DataTypes.INTEGER,
    IdQuote: DataTypes.INTEGER,
    Folio: DataTypes.STRING,
    Lead: DataTypes.STRING,
    Currency: DataTypes.STRING,
    SubTotal: DataTypes.FLOAT,
    IVA: DataTypes.FLOAT,
    Total: DataTypes.FLOAT,
    Status: DataTypes.STRING,
    Remark: DataTypes.STRING,
    UrlFile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Quotes',
  });
  return Quotes;
};