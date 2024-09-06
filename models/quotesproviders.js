'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class QuotesProviders extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	QuotesProviders.init(
		{
			IdProvider: DataTypes.INTEGER,
			Name: DataTypes.STRING,
			status: DataTypes.INTEGER,
			NameContact: DataTypes.STRING,
			PhoneContact: DataTypes.STRING,
			EmailContact: DataTypes.STRING,
			IdAdress: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'QuotesProviders',
		}
	);
	return QuotesProviders;
};
