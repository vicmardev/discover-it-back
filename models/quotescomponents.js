'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class QuotesComponents extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	QuotesComponents.init(
		{
			IdPartsCatalog: DataTypes.STRING,
			NameComponent: DataTypes.STRING,
			Description: DataTypes.STRING,
			IdProvider: DataTypes.INTEGER,
			UnitePrice: DataTypes.STRING,
			IdCurrency: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'QuotesComponents',
		}
	);
	return QuotesComponents;
};
