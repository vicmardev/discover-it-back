'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = sequelize => {
	class City extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.City.belongsTo(models.Country, {foreignKey: 'IdCity', as: 'Country'});
		}
	}
	City.init(
		{
			IdCity: {
				primaryKey: true,
				type: DataTypes.INTEGER,
			},

			State: DataTypes.STRING,
			Clave: DataTypes.STRING,
			IdCountry: DataTypes.INTEGER,
		},
		{
			timestamps: false,
			sequelize,
			modelName: 'City',
		}
	);
	return City;
};
