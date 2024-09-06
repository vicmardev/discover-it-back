'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Ticket extends Model {
		static associate(models) {}
	}
	Ticket.init(
		{
			IdTicket: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			NameTicket: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Severity: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			IdStatus: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			IdContract: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			IdClient: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			IdDataCenter: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			IdUser: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			IdEquipment: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			IdSupportOperators: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			IdLevelScalation: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			DescriptionTicket: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			OperativeSystem: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			PathEvidenceClient: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Ticket',
			tableName: 'Tickets',
			timestamps: true,
		}
	);
};
