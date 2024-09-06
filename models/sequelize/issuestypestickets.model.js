'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class IssuesTypesTickets extends Model {
		static associate(models) {}
	}
	IssuesTypesTickets.init(
		{
			IdIssuesTypesTickets: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Status: {
				type: DataTypes.TINYINT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'IssuesTypesTickets',
			tableName: 'IssuesTypesTickets',
			timestamps: true,
		}
	);
};
