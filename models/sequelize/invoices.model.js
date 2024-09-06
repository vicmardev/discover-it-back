'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Invoices extends Model {
		static associate(models) {}
	}
	Invoices.init(
		{
			IdInvoice: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			NumInvoice: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			PathFilePediment: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			PathFileInvoice: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Client: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			NameReceptor: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			CommentsReceptor: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Invoices',
			tableName: 'Invoices',
			timestamps: true,
		}
	);
};
