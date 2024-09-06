'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = sequelize => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Country.hasMany(models.City, {foreignKey: 'IdCountry', as: 'Cities'});
		}
	}
	Country.init(
		{
			IdCountry: {
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			Name: DataTypes.STRING,
		},
		{
			timestamps: false,
			sequelize,
			modelName: 'Country',
		}
	);
	return Country;
};
