'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Adress extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Adress.init(
		{
			IdAdress: DataTypes.INTEGER,
			City: DataTypes.STRING,
			Country: DataTypes.STRING,
			PostalCode: DataTypes.INTEGER,
			Delegation: DataTypes.STRING,
			Neighborhood: DataTypes.STRING,
			Street: DataTypes.STRING,
			BuildingNumber: DataTypes.STRING,
			InteriorNumber: DataTypes.STRING,
			updatedAt: DataTypes.DATE,
			createdAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Adress',
		}
	);
	return Adress;
};
