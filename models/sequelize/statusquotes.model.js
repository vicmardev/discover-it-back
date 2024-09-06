'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class StatusQuotes extends Model {
		static associate(models) {}
	}
	StatusQuotes.init(
		{
			IdStatusQuotes: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'StatusQuotes',
			tableName: 'StatusQuotes',
			timestamps: true,
		}
	);
};
