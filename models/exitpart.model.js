'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExitParts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExitParts.init({
    SerialNumber: DataTypes.STRING,
    IdPart: DataTypes.INTEGER,
    IdTicket: DataTypes.STRING,
    Available: DataTypes.STRING,
    DateExit: DataTypes.DATE,
    User: DataTypes.STRING,
    NumInvoiceEntry: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExitParts',
  });
  return ExitParts;
};