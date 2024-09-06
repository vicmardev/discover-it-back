'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InterfacesChassis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InterfacesChassis.init({
    IdComponent: DataTypes.INTEGER,
    IdChasis: DataTypes.INTEGER,
    InterfaceName: DataTypes.STRING,
    PhysicalStatus: DataTypes.STRING,
    LogicalStatus: DataTypes.STRING,
    IpAddress: DataTypes.STRING,
    Vlan: DataTypes.STRING,
    Duplex: DataTypes.STRING,
    Speed: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InterfacesChassis',
  });
  return InterfacesChassis;
};