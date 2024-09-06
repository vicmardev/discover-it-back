'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClientUser.init({
    IdUser: DataTypes.INTEGER,
    IdClient: DataTypes.INTEGER,
    NameUser: DataTypes.INTEGER,
    Rol: DataTypes.INTEGER,
    Area: DataTypes.INTEGER,
    Status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClientUser',
  });
  return ClientUser;
};