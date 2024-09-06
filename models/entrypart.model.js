'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntryParts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EntryParts.init({
    SerialNumber: DataTypes.STRING,
    IdPart: DataTypes.INTEGER,
    IdTicket: DataTypes.STRING,
    Available: DataTypes.STRING,
    DateEntry: DataTypes.DATE,
    User: DataTypes.STRING,
    NumInvoiceEntry: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EntryParts',
  });
  return EntryParts;
};