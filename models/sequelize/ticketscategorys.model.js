'use strict';
const {Model} = require('sequelize');
//const {DataTypes, Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TicketsCategorys extends Model {
		static associate(models) {}
	}
	TicketsCategorys.init(
		{
			IdTicketCategorys: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Status: {
				type: DataTypes.TINYINT,
				allowNull: false,
			},
			Description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'TicketsCategorys',
			tableName: 'TicketsCategorys',
			timestamps: true,
		}
	);
};
