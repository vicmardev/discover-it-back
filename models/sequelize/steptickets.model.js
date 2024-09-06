'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class stepTickets extends Model {
		static associate(models) {}
	}
	stepTickets.init(
		{
			IdStepTicket: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Phase: {
				Type: DataTypes.INTEGER,
				allowNull: false,
			},
			Description: {
				Type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				Type: DataTypes.TINYINT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'stepTickets',
			tableName: 'stepTickets',
			timestamps: false,
		}
	);
};
